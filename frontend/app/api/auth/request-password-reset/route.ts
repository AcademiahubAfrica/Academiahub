import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/prisma/connection";
import { sendPasswordResetEmail, getResetTokenExpiry } from "@/lib/email";

const RATE_LIMIT_SECONDS = 60;
const GENERIC_RESPONSE = {
  message:
    "If an account exists for this email, a password reset link has been sent.",
};

function generateResetToken(): { token: string; tokenHash: string } {
  const token = crypto.randomBytes(32).toString("base64url");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  return { token, tokenHash };
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
    }

    if (user.lastPasswordResetRequestAt) {
      const elapsedMs =
        Date.now() - user.lastPasswordResetRequestAt.getTime();
      if (elapsedMs < RATE_LIMIT_SECONDS * 1000) {
        return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
      }
    }

    const { token, tokenHash } = generateResetToken();

    await prisma.user.update({
      where: { email },
      data: {
        passwordResetTokenHash: tokenHash,
        passwordResetExpiry: getResetTokenExpiry(),
        lastPasswordResetRequestAt: new Date(),
      },
    });

    await sendPasswordResetEmail(email, token);

    return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
  } catch (error) {
    console.error("Request password reset error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
