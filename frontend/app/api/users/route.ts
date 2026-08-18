import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/connection";
import argon2 from "argon2";
import { sendVerificationEmail, generateVerificationCode, getCodeExpiry } from "@/lib/email";

// Create user
export async function POST(req:NextRequest) {
    const { password, ...body } = await req.json();
    const hashedPassword = await argon2.hash(password);
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: body.email }
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "A user with this email already exists" },
                { status: 409 }
            );
        }

        // Generate verification code
        const verificationCode = generateVerificationCode();
        const codeExpiry = getCodeExpiry();

        const user = await prisma.user.create({
            data: {
                ...body,
                password: hashedPassword,
                verificationCode,
                codeExpiry,
                lastCodeRequestAt: new Date(),
             },
        });

        // Send verification email
        await sendVerificationEmail(body.email, verificationCode);

        return NextResponse.json(
            { message: "User created. Please verify your email.", email: user.email },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            {message:"Something went wrong"},
            {status: 501}
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
