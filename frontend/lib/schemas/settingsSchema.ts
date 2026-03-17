import { z } from "zod";

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "password must be at least 8 characters long")
      .max(32, "password must be at most 32 characters long"),
    newPassword: z
      .string()
      .min(8, "password must be at least 8 characters long")
      .max(32, "password must be at most 32 characters long"),
    confirmPassword: z
      .string()
      .min(8, "password must be at least 8 characters long")
      .max(32, "password must be at most 32 characters long"),
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
