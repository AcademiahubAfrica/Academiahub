import prisma from "@/prisma/connection";
import { Profile } from "@/app/_types/author";
import MainDetails from "./MainDetails";
import ProfileCard from "./ProfileCard";
import PublicationDetails from "./PublicationDetails";
import Comments from "./Comments";
import CommentOrReview from "./CommentOrReview";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const PublicationContent = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const [document, comments, totalComments, session] = await Promise.all([
    prisma.document.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true, image: true } },
      },
    }),
    prisma.comment.findMany({
      where: { documentId: id },
      include: {
        user: { select: { id: true, name: true, image: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.comment.count({ where: { documentId: id } }),
    getServerSession(authOptions),
  ]);

  if (!document) {
    throw new Error("Document not found");
  }

  const [profile, existingLike] = await Promise.all([
    fetchProfile(document.author.id),
    session?.user?.id
      ? prisma.like.findUnique({
          where: { userId_documentId: { userId: session.user.id, documentId: id } },
          select: { id: true },
        })
      : null,
  ]);

  return (
    <section className="flex relative flex-col md:flex-row gap-2">
      <MainDetails>
        <PublicationDetails details={document} isLiked={!!existingLike} />
        <CommentOrReview
          comments={comments}
          id={id}
          totalcomments={totalComments}
        />
      </MainDetails>

      {/* side */}
      <ProfileCard profile={profile} />
    </section>
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

export default PublicationContent;
