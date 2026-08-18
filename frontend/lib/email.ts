import crypto from "crypto";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { VerificationEmail } from "@/emails/verification-email";
import { PasswordResetEmail } from "@/emails/password-reset-email";

const resend = new Resend(process.env.RESEND_API_KEY);

const CODE_EXPIRY_MINUTES = 5;
export const RESET_TOKEN_EXPIRY_MINUTES = 30;

// Wrong guesses allowed before a verification code is burned. 
export const MAX_VERIFICATION_ATTEMPTS = 5;

export async function sendVerificationEmail(email: string, code: string) {
  const html = await render(
    VerificationEmail({ code, expiresInMinutes: CODE_EXPIRY_MINUTES })
  );

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM || "noreply@yourdomain.com",
    to: email,
    subject: "Verify your email - AcademiaHub",
    html,
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

  const html = await render(PasswordResetEmail({ resetUrl }));

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM || "noreply@yourdomain.com",
    to: email,
    subject: "Reset your password - AcademiaHub",
    html,
  });

  if (error) {
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }

  return data;
}

/**
 * Six-digit verification code from a CSPRNG.
 *
 * `Math.random()` is not cryptographically secure — V8 implements it with
 * xorshift128+, whose internal state can be recovered from a modest run of
 * consecutive outputs. Someone who signs themselves up a few times to harvest
 * codes could then predict the code issued to somebody else.
 */
export function generateVerificationCode(): string {
  return crypto.randomInt(100000, 1000000).toString();
}

/**
 * Keyed digest of a verification code, for storage.
 *
 * This is an HMAC rather than a bare SHA-256 because the input has only a
 * million possible values. A plain digest of a six-digit code is reversible by
 * exhaustive search in milliseconds, so it would give almost no protection to
 * anyone who obtained a database dump. Keying it with a server-side secret
 * means the dump alone is not enough.
 *
 * Rotating NEXTAUTH_SECRET invalidates codes that are in flight. They live for
 * five minutes, so the cost is that a handful of users resend.
 */
export function hashVerificationCode(code: string): string {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is not set; cannot hash verification code");
  }
  return crypto.createHmac("sha256", secret).update(code).digest("hex");
}

/**
 * Compare a submitted code against the stored digest without leaking, through
 * timing, how much of it matched.
 *
 * Returns false rather than throwing when the stored value is not a digest of
 * the expected size — which is what a plaintext code left over from before
 * this change looks like.
 */
export function verificationCodeMatches(
  submittedCode: string,
  storedHash: string,
): boolean {
  const expected = Buffer.from(hashVerificationCode(submittedCode), "hex");
  let stored: Buffer;
  try {
    stored = Buffer.from(storedHash, "hex");
  } catch {
    return false;
  }
  if (stored.length !== expected.length) return false;
  return crypto.timingSafeEqual(stored, expected);

}

export function getCodeExpiry(): Date {
  return new Date(Date.now() + CODE_EXPIRY_MINUTES * 60 * 1000);
}

export function getResetTokenExpiry(): Date {
  return new Date(Date.now() + RESET_TOKEN_EXPIRY_MINUTES * 60 * 1000);
}
