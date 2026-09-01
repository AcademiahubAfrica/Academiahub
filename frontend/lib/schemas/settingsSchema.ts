import { z } from "zod";
import { passwordPolicy } from "./passwordPolicy";
import { MAX_PASSWORD_LENGTH } from "@/lib/passwordRules";

export const passwordSchema = z
  .object({
    /* Not `passwordPolicy`: this is the password the account already has, and
       accounts predating the 12-character rule hold shorter ones. Judging it
       against today's rule would lock those users out of changing it, which is
       the opposite of what this endpoint is for. Length is capped only to stop
       an unbounded string reaching argon2. */
    currentPassword: z
      .string({ error: "Current password is required" })
      .min(1, "Current password is required")
      .max(MAX_PASSWORD_LENGTH),
    newPassword: passwordPolicy,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type PasswordSchemaType = z.infer<typeof passwordSchema>;

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be at most 100 characters"),
  institution: z
    .string()
    .max(200, "Institution must be at most 200 characters")
    .optional()
    .or(z.literal("")),
  department: z
    .string()
    .max(200, "Department must be at most 200 characters")
    .optional()
    .or(z.literal("")),
  state: z
    .string()
    .max(100, "State must be at most 100 characters")
    .optional()
    .or(z.literal("")),
  country: z
    .string()
    .max(100, "Country must be at most 100 characters")
    .optional()
    .or(z.literal("")),
  aboutMe: z
    .string()
    .max(500, "About must be at most 500 characters")
    .optional()
    .or(z.literal("")),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;

export const onboardingProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be at most 100 characters"),
  institution: z
    .string()
    .min(1, "Institution is required")
    .max(200, "Institution must be at most 200 characters"),
  department: z
    .string()
    .min(1, "Department is required")
    .max(200, "Department must be at most 200 characters"),
  state: z
    .string()
    .min(1, "State is required")
    .max(100, "State must be at most 100 characters"),
  country: z
    .string()
    .min(1, "Country is required")
    .max(100, "Country must be at most 100 characters"),
});

export type OnboardingProfileSchemaType = z.infer<
  typeof onboardingProfileSchema
>;
