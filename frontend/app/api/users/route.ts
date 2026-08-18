import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/connection";
import argon2 from "argon2";
import { sendVerificationEmail, generateVerificationCode, getCodeExpiry } from "@/lib/email";
import { signupSchema } from "@/lib/schemas/signupSchema";

// Create user
export async function POST(req:NextRequest) {
    try {
        const json = await req.json().catch(() => null);
        if (json === null) {
            return NextResponse.json(
                { message: "Invalid request body" },
                { status: 400 }
            );
        }

        /* 
           Validate before doing any work. `signupSchema` is an allow-list —
           anything not declared on it is dropped, so the client cannot set
           columns like `emailVerified` on the new row. 
        */
        const parsed = signupSchema.safeParse(json);
        if (!parsed.success) {
            return NextResponse.json(
                { message: parsed.error.issues[0]?.message ?? "Invalid signup details" },
                { status: 400 }
            );
        }
        const { name, email, password } = parsed.data;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "A user with this email already exists" },
                { status: 409 }
            );
        }

        const hashedPassword = await argon2.hash(password);

        // Generate verification code
        const verificationCode = generateVerificationCode();
        const codeExpiry = getCodeExpiry();

        // Fields are listed explicitly — never spread a request body into a
        // Prisma write.
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                verificationCode,
                codeExpiry,
                lastCodeRequestAt: new Date(),
             },
        });

        // Send verification email
        await sendVerificationEmail(email, verificationCode);

        return NextResponse.json(
            { message: "User created. Please verify your email.", email: user.email },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            {message:"Something went wrong"},
            {status: 500}
        )
    }
}

/* NOTE: POST is deliberately the only handler on this route.

GET — enumerating the membership is not something the app needs. User
discovery goes through `GET /users/search` on the backend, which requires a
session, demands a 3-character query, caps results at 10 and honours
`showInSearch`. A route returning the whole user table has no caller.

PUT / DELETE — account updates go through the session-scoped routes, which
derive the target user from `session.user.id` rather than the request body.
Account deletion is not implemented yet. When it is, it belongs on a
session-scoped route that takes no user ID from the caller.
*/
