import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import argon2 from "argon2";
import prisma from "@/prisma/connection";
import { requestContext, securityLog } from "@/lib/logging/securityLog";
import { passwordPolicy } from "@/lib/schemas/passwordPolicy";

/* The upper/lower/special regex that used to live here is gone. It was one of
   three disagreeing rules, and it was the strict one — a user could sign up
   with a password this endpoint would then refuse to let them set again. */

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

    const password = passwordPolicy.safeParse(newPassword);
    if (!password.success) {
      return NextResponse.json(
        { message: password.error.issues[0]?.message ?? "Invalid password" },
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

    securityLog({
      event: "auth.password.reset.completed",
      outcome: "success",
      actor: { userId: user.id },
      request: requestContext(req.headers),
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
