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
