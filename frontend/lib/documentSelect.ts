import type { Prisma } from "@prisma/client";

/**
 * Fields returned for publication cards, shared by every list query so the
 * dashboard's first page and its paginated pages can't drift apart.
 *
 * Deliberately excludes the storage columns (`fileUrl`, `fileKey`, `fileName`,
 * `fileSize`). `/api/documents` is unauthenticated, and Cloudinary delivery
 * URLs are permanent and unsigned — returning one hands out the file itself.
 * Callers that legitimately need them go through the session-gated
 * `/api/documents/[id]`.
 */
export const DOCUMENT_CARD_SELECT = {
  id: true,
  title: true,
  description: true,
  category: true,
  institution: true,
  year: true,
  downloads: true,
  likes: true,
  authorId: true,
  createdAt: true,
  updatedAt: true,
  author: {
    select: { id: true, name: true, image: true },
  },
  _count: {
    select: { commentRecords: true },
  },
} satisfies Prisma.DocumentSelect;
