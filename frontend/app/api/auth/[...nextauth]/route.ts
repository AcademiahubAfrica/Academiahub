import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";
import prisma from "@/prisma/connection";
import argon2 from "argon2";
import { decideGoogleSignIn } from "@/lib/auth/googleSignIn";
import { requestContext, securityLog } from "@/lib/logging/securityLog";
import { isCheckDue, isSessionRetired } from "@/lib/auth/sessionVersion";

const LOGIN_ERRORS = {
  no_such_account: "No user found with the given email",
  password_missing: "Password is required",
  oauth_account: "This account uses OAuth. Please sign in with Google or GitHub",
  bad_password: "Invalid email or password",
  email_unverified: "EMAIL_NOT_VERIFIED",
} as const;

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

declare module "next-auth/jwt" {
  interface JWT {
    // The account's session version at the time this token was last checked.
    sv?: number;
    // When that check happened, in seconds. 
    svAt?: number;
  }
}

// Explicit rather than inherited: the default is 30 days with no idle expiry.
const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

export const authOptions:NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE_SECONDS,
  },
  providers: [
    CredentialsProvider({
    name: "Email and Password",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
        const email = credentials?.email;
        const request = requestContext(req?.headers);

        /* Records why the attempt was turned away and hands back the error to
           throw. The reason is for us; the message thrown to the caller is
           unchanged from before. */
        const loginFailure = (
          reason: keyof typeof LOGIN_ERRORS,
          userId?: string,
        ): Error => {
          securityLog({
            event: "auth.login.failure",
            outcome: "failure",
            actor: { userId, email },
            request,
            detail: { reason },
          });
          return new Error(LOGIN_ERRORS[reason]);
        };

         const user = await prisma.user.findFirst({where:{email:credentials?.email}})
            if (!user) {
                throw loginFailure("no_such_account")
            }
            if (!credentials?.password) {
                throw loginFailure("password_missing", user.id)
            }
            if (!user.password) {
                throw loginFailure("oauth_account", user.id)
            }
            const isValid = await argon2.verify(user.password, credentials.password);
            if (!isValid) throw loginFailure("bad_password", user.id);

            // Check if email is verified
            if (!user.emailVerified) {
                throw loginFailure("email_unverified", user.id)
            }

        securityLog({
          event: "auth.login.success",
          outcome: "success",
          actor: { userId: user.id, email },
          request,
        });
        return user
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
          securityLog({
            event: "auth.oauth.refused",
            outcome: "failure",
            actor: { userId: existingUser?.id, email },
            detail: { provider: "google", reason: "email_unverified_by_provider" },
          });
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
          /* Worth a record of its own: a password was removed from an account
             without its holder asking. If that holder was an impostor this is
             the moment the trap was disarmed, and if it was not, this is the
             line that explains why someone's password stopped working. */
          securityLog({
            event: "auth.oauth.account_reclaimed",
            outcome: "success",
            actor: { userId: existingUser!.id, email },
            detail: { provider: "google", clearedPassword: true },
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
      
      const now = Math.floor(Date.now() / 1000);

      if (user && token.email) {
        const dbUser = await prisma.user.findFirst({
          where: { email: token.email },
          select: { id: true, sessionVersion: true },
        });
        if (dbUser) {
          token.sub = dbUser.id;
          token.sv = dbUser.sessionVersion ?? 0;
          token.svAt = now;
        }
        return token;
      }

      /* Sessions are self-contained tokens, so there is nothing to delete when
         a password changes. Instead the account carries a version, and a token
         minted before the current one is refused.

         Checked on a timer rather than on every request: this callback runs on
         every session read, and a database round trip per request is a real
         cost. The trade is that a retired session keeps working for up to one
         interval. */
      if (token.sub && isCheckDue(token.svAt, now)) {
        const current = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { sessionVersion: true },
        });

        // Also covers a deleted account, whose token would otherwise outlive it.
        if (!current || isSessionRetired(token.sv, current.sessionVersion)) {
          // Empty token: no `sub`, so the session callback below assigns no id.
          return {};
        }

        token.svAt = now;
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
