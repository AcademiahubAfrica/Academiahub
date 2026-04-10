import ProfileSectionOther from "./ProfileSectionOther";
import prisma from "@/prisma/connection";
import { Profile } from "@/app/_types/author";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import OtherUserPublications from "./OtherUserPublications";

const MainContent = async ({
  params,
  children,
}: {
  params: Promise<{ otherUserId: string }>;
  children: React.ReactNode;
}) => {
  const { otherUserId } = await params;

  const [profile, session, documents] = await Promise.all([
    fetchProfile(otherUserId),
    getServerSession(authOptions),
    prisma.document.findMany({
      where: { authorId: otherUserId },
      include: {
        author: { select: { id: true, name: true, image: true } },
        _count: { select: { commentRecords: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  let likedDocumentIds = new Set<string>();
  let savedDocumentIds = new Set<string>();

  if (session?.user?.id && documents.length > 0) {
    const documentIds = documents.map((d) => d.id);
    const [likes, saves] = await Promise.all([
      prisma.like.findMany({
        where: { userId: session.user.id, documentId: { in: documentIds } },
        select: { documentId: true },
      }),
      prisma.save.findMany({
        where: { userId: session.user.id, documentId: { in: documentIds } },
        select: { documentId: true },
      }),
    ]);
    likedDocumentIds = new Set(likes.map((l) => l.documentId));
    savedDocumentIds = new Set(saves.map((s) => s.documentId));
  }

  return (
    <>
      <ProfileSectionOther profile={profile} />
      {children}

      {documents.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No publications yet</p>
      ) : (
        <OtherUserPublications
          userId={session?.user?.id ?? ""}
          documents={documents}
          likedDocumentIds={likedDocumentIds}
          savedDocumentIds={savedDocumentIds}
        />
      )}
    </>
  );
};

async function fetchProfile(userId: string): Promise<Profile> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      image: true,
      Profile: {
        take: 1,
        select: { bio: true },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const [uploadCount, documents, savesReceived] = await Promise.all([
    prisma.document.count({ where: { authorId: userId } }),
    prisma.document.findMany({
      where: { authorId: userId },
      select: { downloads: true, likes: true },
    }),
    prisma.save.count({
      where: { document: { authorId: userId } },
    }),
  ]);

  const totalDownloads = documents.reduce((sum, doc) => sum + doc.downloads, 0);
  const totalLikes = documents.reduce((sum, doc) => sum + doc.likes, 0);

  return {
    id: user.id,
    name: user.name || "",
    image: user.image,
    bio: user.Profile[0]?.bio ?? null,
    stats: {
      uploads: uploadCount,
      downloads: totalDownloads,
      likes: totalLikes,
      saves: savesReceived,
    },
  };
}

export default MainContent;
