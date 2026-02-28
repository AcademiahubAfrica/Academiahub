import ProfileSectionOther from "./ProfileSectionOther";
import prisma from "@/prisma/connection";
import { Profile } from "@/app/_types/author";
import DownloadCard from "../../shared/DownloadCard";

const MainContent = async ({
  params,
  children,
}: {
  params: Promise<{ otherUserId: string }>;
  children: React.ReactNode;
}) => {
  const { otherUserId } = await params;

  const profile = await fetchProfile(otherUserId);

  const documents = await prisma.document.findMany({
    where: { authorId: otherUserId },
    include: {
      author: { select: { id: true, name: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <ProfileSectionOther profile={profile} />
      {children}

      <section className="grid lg:px-6.25 grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
        {documents.map((data) => (
          <DownloadCard key={data.id} data={data} />
        ))}
      </section>
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
