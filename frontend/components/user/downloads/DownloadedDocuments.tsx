import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";
import DownloadedList from "./DownloadedList";

const DownloadedDocuments = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <p className="text-center text-gray-500 py-8">
        Please sign in to view your downloads.
      </p>
    );
  }

  const userId = session.user.id;

  const downloadRecords = await prisma.downloadRecord.findMany({
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

  // Deduplicate — show each document once even if downloaded multiple times
  const seen = new Set<string>();
  const documents = downloadRecords
    .filter((r) => {
      if (seen.has(r.documentId)) return false;
      seen.add(r.documentId);
      return true;
    })
    .map((r) => r.document);

  let likedDocumentIds = new Set<string>();
  let savedDocumentIds = new Set<string>();

  if (documents.length > 0) {
    const documentIds = documents.map((d) => d.id);
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
    likedDocumentIds = new Set(likes.map((l) => l.documentId));
    savedDocumentIds = new Set(saves.map((s) => s.documentId));
  }

  return (
    <DownloadedList
      userId={userId}
      documents={documents}
      totalCount={documents.length}
      likedDocumentIds={likedDocumentIds}
      savedDocumentIds={savedDocumentIds}
    />
  );
};

export default DownloadedDocuments;
