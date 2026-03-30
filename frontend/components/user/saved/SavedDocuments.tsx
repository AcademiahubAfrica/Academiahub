import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";
import SavedHeader from "./SavedHeader";
import SavedList from "./SavedList";

const SavedDocuments = async () => {
  const session = await getServerSession(authOptions);

  let savedDocuments: Awaited<ReturnType<typeof fetchSavedDocuments>> = [];
  let likedDocumentIds: Set<string> = new Set();

  if (session?.user?.id) {
    savedDocuments = await fetchSavedDocuments(session.user.id);

    if (savedDocuments.length > 0) {
      const likes = await prisma.like.findMany({
        where: {
          userId: session.user.id,
          documentId: { in: savedDocuments.map((d) => d.id) },
        },
        select: { documentId: true },
      });
      likedDocumentIds = new Set(likes.map((l) => l.documentId));
    }
  }

  return (
    <>
      <SavedHeader count={savedDocuments.length} />
      <SavedList
        initialDocuments={savedDocuments}
        likedDocumentIds={likedDocumentIds}
      />
    </>
  );
};

async function fetchSavedDocuments(userId: string) {
  const saves = await prisma.save.findMany({
    where: { userId },
    include: {
      document: {
        include: {
          author: { select: { id: true, name: true, image: true } },
          _count: { select: { commentRecords: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return saves.map((s) => s.document);
}

export default SavedDocuments;
