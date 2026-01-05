import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/connection";
import { sendVerificationEmail, generateVerificationCode, getCodeExpiry } from "@/lib/email";

const RATE_LIMIT_SECONDS = 60;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { message: "Email is already verified" },
        { status: 400 }
      );
    }

    // Rate limiting using MongoDB
    if (user.lastCodeRequestAt) {
      const timeSinceLastRequest = Date.now() - user.lastCodeRequestAt.getTime();
      const remainingMs = RATE_LIMIT_SECONDS * 1000 - timeSinceLastRequest;

      if (remainingMs > 0) {
        const remainingSeconds = Math.ceil(remainingMs / 1000);
        return NextResponse.json(
          { message: `Please wait ${remainingSeconds} seconds before requesting a new code` },
          { status: 429 }
        );
      }
    }

    // Generate new verification code
    const verificationCode = generateVerificationCode();
    const codeExpiry = getCodeExpiry();

    // Update user with new code and rate limit timestamp
    await prisma.user.update({
      where: { email },
      data: {
        verificationCode,
        codeExpiry,
        lastCodeRequestAt: new Date(),
      },
    });

    // Send verification email
    await sendVerificationEmail(email, verificationCode);

    return NextResponse.json(
      { message: "Verification code sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resend code error:", error);
    return NextResponse.json(
      { message: "Failed to send verification code" },
      { status: 500 }
    );
  }
}
