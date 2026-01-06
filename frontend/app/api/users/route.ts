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

// Delete user
export async function DELETE(req:NextRequest) {
    const { id } = await req.json();
    try {
        const deletedUser = await prisma.user.delete({
            where: { id }
        })
        return NextResponse.json(deletedUser, {status: 200})
    } catch (_error) {
        return NextResponse.json(
            {message:"Something went wrong"},
            {status: 501}
        )
    }
}

// Update user
export async function PUT(req:NextRequest) {
    const { id, ...body } = await req.json();
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { updatedAt: new Date(), ...body }
        })
        return NextResponse.json(updatedUser, {status: 200})
    } catch (_error) {
        return NextResponse.json(
            {message:"Something went wrong"},
            {status: 501}
        )
    }
}

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
