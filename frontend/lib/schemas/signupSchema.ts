import { z } from "zod";

/**
 * Server-side shape of a signup request.
 *
 * This is the allow-list for `POST /api/users`. Zod strips keys that are not
 * declared here, which is the point: the handler previously spread the raw
 * request body into `prisma.user.create`, so a client could set any writable
 * column on `User` — including `emailVerified`, which skips the whole email
 * verification gate.
 *
 * Note there is deliberately no `.toLowerCase()` on the email. Sign-in looks
 * the user up with an exact match, so normalising case here would strand
 * anyone who typed a capital letter. Normalising emails is worth doing, but it
 * has to happen across sign-in, password reset and verification at the same
 * time, plus a migration for existing rows.
 */
export const signupSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be at most 100 characters"),
  email: z
    .string({ error: "Email is required" })
    .trim()
    .max(254, "Email must be at most 254 characters")
    .pipe(z.email("Please enter a valid email address")),
  password: z
    .string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must be at most 128 characters"),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;
