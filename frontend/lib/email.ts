import { Resend } from "resend";
import { VerificationEmail } from "@/emails/verification-email";

const resend = new Resend(process.env.RESEND_API_KEY);

const CODE_EXPIRY_MINUTES = 5;

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

export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getCodeExpiry(): Date {
  return new Date(Date.now() + CODE_EXPIRY_MINUTES * 60 * 1000);
}
