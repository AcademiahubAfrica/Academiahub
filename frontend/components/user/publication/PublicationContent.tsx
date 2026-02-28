import prisma from "@/prisma/connection";
import { Profile } from "@/app/_types/author";
import MainDetails from "./MainDetails";
import ProfileCard from "./ProfileCard";
import PublicationDetails from "./PublicationDetails";
import Comments from "./Comments";

const PublicationContent = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const [document, comments] = await Promise.all([
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
  ]);

  if (!document) {
    throw new Error("Document not found");
  }

  const profile = await fetchProfile(document.author.id);

  return (
    <section className="flex relative flex-col md:flex-row gap-2">
      <MainDetails>
        <PublicationDetails details={document} />
        <Comments />
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
