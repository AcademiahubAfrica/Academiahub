import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import argon2 from "argon2";
import prisma from "@/prisma/connection";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { message: "Reset token is required" },
        { status: 400 },
      );
    }

    if (!newPassword || typeof newPassword !== "string") {
      return NextResponse.json(
        { message: "New password is required" },
        { status: 400 },
      );
    }

    if (!PASSWORD_REGEX.test(newPassword)) {
      return NextResponse.json(
        {
          message:
            "Password must be at least 8 characters and include uppercase, lowercase, and a special character.",
        },
        { status: 400 },
      );
    }

    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await prisma.user.findFirst({
      where: { passwordResetTokenHash: tokenHash },
      select: { id: true, passwordResetExpiry: true },
    });

    if (
      !user ||
      !user.passwordResetExpiry ||
      user.passwordResetExpiry.getTime() < Date.now()
    ) {
      return NextResponse.json(
        { message: "This reset link is invalid or has expired." },
        { status: 400 },
      );
    }

    const hashedPassword = await argon2.hash(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetTokenHash: null,
        passwordResetExpiry: null,
        lastPasswordResetRequestAt: null,
      },
    });

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
