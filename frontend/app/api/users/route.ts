import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/connection";
import argon2 from "argon2";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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

/* NOTE: there is deliberately no PUT or DELETE handler here.
Account updates go through the session-scoped routes, which derive the
target user from `session.user.id` rather than the request body.
Account deletion is not implemented yet. When it is, it belongs on a
session-scoped route that takes no user ID from the caller.
*/

// Get all users
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        const currentUserId = session?.user?.id;
        
        const allUsers = await prisma.user.findMany({
            where: currentUserId ? { id: { not: currentUserId } } : {},
            select: {
                id: true,
                name: true,
                email: true,
                image: true
            }
        });
        return NextResponse.json(allUsers, {status: 200})
    } catch (_error) {
        return NextResponse.json(
            {message:"Something went wrong"},
            {status: 501}
        )
    }
}
