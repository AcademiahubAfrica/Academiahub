import "server-only";

import prisma from "@/prisma/connection";

export async function getDocumentUserState(
  userId: string | null | undefined,
  documentIds: string[],
) {
  if (!userId || documentIds.length === 0) {
    return { likedIds: new Set<string>(), savedIds: new Set<string>() };
  }

  const [likes, saves] = await Promise.all([
    prisma.like.findMany({
      where: { userId, documentId: { in: documentIds } },
      select: { documentId: true },
    }),
    prisma.save.findMany({
      where: { userId, documentId: { in: documentIds } },
      select: { documentId: true },
    }),
  ]);

  return {
    likedIds: new Set(likes.map(({ documentId }) => documentId)),
    savedIds: new Set(saves.map(({ documentId }) => documentId)),
  };
}
