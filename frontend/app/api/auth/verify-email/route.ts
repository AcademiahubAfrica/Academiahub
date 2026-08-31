import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/connection";
import {
  MAX_VERIFICATION_ATTEMPTS,
  verificationCodeMatches,
} from "@/lib/email";
import { requestContext, securityLog } from "@/lib/logging/securityLog";

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { message: "Email and verification code are required" },
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

    if (!user.verificationCode || !user.codeExpiry) {
      return NextResponse.json(
        { message: "No verification code found. Please request a new code." },
        { status: 400 }
      );
    }

    if (new Date() > user.codeExpiry) {
      return NextResponse.json(
        { message: "Verification code has expired. Please request a new code." },
        { status: 400 }
      );
    }

    if (!verificationCodeMatches(String(code), user.verificationCode)) {
      // Count the wrong guess, and burn the code once the budget is spent.
      // Without this a script can walk the whole million-value space well
      // inside the code's five-minute lifetime.
      const attempts = (user.verificationAttempts ?? 0) + 1;
      const exhausted = attempts >= MAX_VERIFICATION_ATTEMPTS;

      await prisma.user.update({
        where: { email },
        data: exhausted
          ? {
              verificationCode: null,
              codeExpiry: null,
              verificationAttempts: 0,
            }
          : { verificationAttempts: attempts },
      });

      securityLog({
        event: exhausted
          ? "auth.email.verification.locked"
          : "auth.email.verification.failure",
        outcome: "failure",
        actor: { userId: user.id, email },
        request: requestContext(req.headers),
        detail: { attempts },
      });

      return NextResponse.json(
        {
          message: exhausted
            ? "Too many incorrect attempts. Please request a new code."
            : "Invalid verification code",
        },
        { status: 400 }
      );
    }

    // Mark email as verified and clear the verification code
    await prisma.user.update({
      where: { email },
      data: {
        emailVerified: new Date(),
        verificationCode: null,
        codeExpiry: null,
        verificationAttempts: 0,
      },
    });

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
