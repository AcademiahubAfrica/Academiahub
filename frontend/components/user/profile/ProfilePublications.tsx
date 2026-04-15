import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";
import PublicationsAndLikes from "./PublicationsAndLikes";

const ProfilePublications = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <p className="text-center text-gray-500 py-8">
        Please sign in to view your publications.
      </p>
    );
  }

  const [ownDocuments, likedDocuments] = await Promise.all([
    fetchOwnDocuments(userId),
    fetchLikedDocuments(userId),
  ]);

  const allDocumentIds = [
    ...ownDocuments.map((d) => d.id),
    ...likedDocuments.map((d) => d.id),
  ];

  const [likes, saves] = await Promise.all([
    prisma.like.findMany({
      where: { userId, documentId: { in: allDocumentIds } },
      select: { documentId: true },
    }),
    prisma.save.findMany({
      where: { userId, documentId: { in: allDocumentIds } },
      select: { documentId: true },
    }),
  ]);

  const likedDocumentIds = new Set(likes.map((l) => l.documentId));
  const savedDocumentIds = new Set(saves.map((s) => s.documentId));

  return (
    <PublicationsAndLikes
      userId={userId}
      ownDocuments={ownDocuments}
      likedDocuments={likedDocuments}
      likedDocumentIds={likedDocumentIds}
      savedDocumentIds={savedDocumentIds}
    />
  );
};

async function fetchOwnDocuments(userId: string) {
  return prisma.document.findMany({
    where: { authorId: userId },
    include: {
      author: { select: { id: true, name: true, image: true } },
      _count: { select: { commentRecords: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

async function fetchLikedDocuments(userId: string) {
  return prisma.document.findMany({
    where: { likeRecords: { some: { userId } } },
    include: {
      author: { select: { id: true, name: true, image: true } },
      _count: { select: { commentRecords: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default ProfilePublications;
