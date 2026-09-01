import { z } from "zod";
import { isValidDocumentUrl } from "@/lib/cloudinary/documentAsset";

/**
 * Server-side shape of a publication upload.
 *
 * The handler previously checked only that the required fields were non-empty,
 * so a title could be a hundred megabytes of text and still be written straight
 * to the database. Comments were already capped at 2,000 characters;
 * publications were simply missed.
 *
 * Zod strips undeclared keys, so this doubles as the allow-list for what may
 * reach `prisma.document.create`.
 */

export const MAX_DOCUMENT_BYTES = 10 * 1024 * 1024;

/** Lower-case as the client sends it; mapped to the Prisma enum on write. */
export const DOCUMENT_CATEGORIES = [
  "research",
  "seminar",
  "project",
  "analysis",
] as const;

export const documentSchema = z.object({
  title: z
    .string({ error: "Title is required" })
    .trim()
    .min(1, "Title is required")
    .max(300, "Title must be at most 300 characters"),
  description: z
    .string({ error: "Description is required" })
    .trim()
    .min(1, "Description is required")
    .max(5000, "Description must be at most 5000 characters"),
  category: z.enum(DOCUMENT_CATEGORIES, { error: "Invalid category" }),
  institution: z
    .string({ error: "Institution is required" })
    .trim()
    .min(1, "Institution is required")
    .max(200, "Institution must be at most 200 characters"),
  /* A string rather than a number, because that is what the column holds.
     Bounded to plausible years so the field cannot be used as free text. */
  year: z
    .string({ error: "Year is required" })
    .trim()
    .regex(/^(19|20)\d{2}$/, "Year must be a four-digit year"),
  fileUrl: z
    .string({ error: "File URL is required" })
    .max(2048)
    .refine(isValidDocumentUrl, "Invalid file URL"),
  fileName: z
    .string({ error: "File name is required" })
    .trim()
    .min(1, "File name is required")
    .max(255, "File name must be at most 255 characters"),
  fileSize: z
    .number({ error: "File size is required" })
    .int("File size must be a whole number")
    .positive("File size must be greater than zero")
    .max(MAX_DOCUMENT_BYTES, "File exceeds 10 MB limit"),
});

export type DocumentSchemaType = z.infer<typeof documentSchema>;
