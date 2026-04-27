import { Resend } from "resend";
import { VerificationEmail } from "@/emails/verification-email";
import { PasswordResetEmail } from "@/emails/password-reset-email";

const resend = new Resend(process.env.RESEND_API_KEY);

const CODE_EXPIRY_MINUTES = 5;
export const RESET_TOKEN_EXPIRY_MINUTES = 30;

export async function sendVerificationEmail(email: string, code: string) {
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM || "noreply@yourdomain.com",
    to: email,
    subject: "Verify your email - AcademiaHub",
    react: VerificationEmail({ code, expiresInMinutes: CODE_EXPIRY_MINUTES }),
  });

  if (error) {
    throw new Error(`Failed to send verification email: ${error.message}`);
  }

  return data;
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const baseUrl =
    process.env.NEXTAUTH_URL?.replace(/\/+$/, "") || "http://localhost:3000";
  const resetUrl = `${baseUrl}/reset-password?token=${encodeURIComponent(token)}`;

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM || "noreply@yourdomain.com",
    to: email,
    subject: "Reset your password - AcademiaHub",
    react: PasswordResetEmail({ resetUrl }),
  });

  if (error) {
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }

  return data;
}

export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getCodeExpiry(): Date {
  return new Date(Date.now() + CODE_EXPIRY_MINUTES * 60 * 1000);
}

export function getResetTokenExpiry(): Date {
  return new Date(Date.now() + RESET_TOKEN_EXPIRY_MINUTES * 60 * 1000);
}
