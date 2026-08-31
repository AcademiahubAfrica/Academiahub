import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";
import prisma from "@/prisma/connection";
import argon2 from "argon2";
import { decideGoogleSignIn } from "@/lib/auth/googleSignIn";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }
}

export const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
    name: "Email and Password",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
         const user = await prisma.user.findFirst({where:{email:credentials?.email}})
            if (!user) {
                throw new Error("No user found with the given email")
            }
            if (!credentials?.password) {
                throw new Error("Password is required")
            }
            if (!user.password) {
                throw new Error("This account uses OAuth. Please sign in with Google or GitHub")
            }
            const isValid = await argon2.verify(user.password, credentials.password);
            if (!isValid) throw new Error("Invalid email or password");

            // Check if email is verified
            if (!user.emailVerified) {
                throw new Error("EMAIL_NOT_VERIFIED")
            }

        try {
            return user
        } catch (_error) {
            throw new Error("Check your credentials")
        }
    }
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!
  })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google") return true;

      const email = user.email;
      if (!email) return false;

      const existingUser = await prisma.user.findFirst({
        where: { email },
        select: { id: true, password: true, emailVerified: true },
      });

      const decision = decideGoogleSignIn({
        googleEmailVerified: (profile as GoogleProfile | undefined)
          ?.email_verified,
        existingAccount: existingUser,
      });

      switch (decision.action) {
        case "refuse":
          return "/login?error=GoogleEmailUnverified";

        case "create":
          await prisma.user.create({
            data: {
              name: user.name!,
              email,
              image: user.image!,
              emailVerified: new Date(),
            },
          });
          return true;

        case "reclaim":
          await prisma.user.update({
            where: { id: existingUser!.id },
            data: {
              password: null,
              emailVerified: new Date(),
              verificationCode: null,
              codeExpiry: null,
              verificationAttempts: 0,
            },
          });
          return true;

        case "verify":
          await prisma.user.update({
            where: { id: existingUser!.id },
            data: { emailVerified: new Date() },
          });
          return true;

        case "allow":
          return true;
      }
    },
    async jwt({ token, user, trigger, session }) {
      if (
        trigger === "update" &&
        session &&
        typeof session === "object" &&
        "image" in session &&
        typeof session.image === "string"
      ) {
        token.picture = session.image;
      }
      
      if (user && token.email) {
        const dbUser = await prisma.user.findFirst({
          where: { email: token.email },
          select: { id: true },
        });
        if (dbUser) {
          token.sub = dbUser.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      return session
    },
}
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
