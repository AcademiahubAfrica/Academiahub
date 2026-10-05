import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/prisma/connection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DOCUMENT_CARD_SELECT } from "@/lib/documentSelect";
import ResearchCard from "@/components/user/dashboard/ResearchCard";

interface ExploreSectionProps {
  limit?: number;
  showSearch?: boolean;
  showViewAllButton?: boolean;
}

const ExploreSection = async ({
  limit = 12,
  showViewAllButton = true,
}: ExploreSectionProps) => {
  const [session, documents] = await Promise.all([
    getServerSession(authOptions),
    prisma.document.findMany({
      select: DOCUMENT_CARD_SELECT,
      orderBy: { createdAt: "desc" },
      take: limit,
    }),
  ]);
  const userId = session?.user?.id;
  const documentIds = documents.map((document) => document.id);
  const [likes, saves] =
    userId && documentIds.length
      ? await Promise.all([
          prisma.like.findMany({
            where: { userId, documentId: { in: documentIds } },
            select: { documentId: true },
          }),
          prisma.save.findMany({
            where: { userId, documentId: { in: documentIds } },
            select: { documentId: true },
          }),
        ])
      : [[], []];
  const likedIds = new Set(likes.map((like) => like.documentId));
  const savedIds = new Set(saves.map((save) => save.documentId));

  return (
    <section className="relative isolate py-15">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden h-[98%] w-110 bg-[url('/assets/images/Aicon.png')] bg-cover bg-right bg-no-repeat opacity-10 brightness-0 hidden lg:block"
      />
      <div className="container relative z-10">
        <header className="text-center lg:text-start space-y-2 md:space-y-4 mb-2 md:mb-8 lg:mb-10">
          <h2 className="text-xl font-medium leading-6 md:font-semibold md:text-4xl md:leading-10 lg:text-[46px]">
            Explore our library and find what you need
          </h2>
          <p className="text-sm leading-4.5 md:font-medium md:leading-5 md:text-xl lg:text-2xl text-[#6B6B6B]">
            Search through thousands of publications by topic, university, or
            field of study
          </p>
        </header>

        <div className="flex flex-col gap-4 items-center">
          {documents.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No publications found
            </p>
          ) : (
            <div className="publication-list grid mx-auto lg:w-[95%] grid-cols-2 gap-2 md:gap-4 lg:grid-cols-3">
              {documents.map((doc, index) => (
                <div key={doc.id} className={index === 3 ? "lg:hidden" : ""}>
                  <ResearchCard
                    data={doc}
                    isLiked={likedIds.has(doc.id)}
                    isOwnDocument={doc.authorId === userId}
                    isSaved={savedIds.has(doc.id)}
                    showSaveButton={doc.authorId !== userId}
                    loginRequired={!userId}
                  />
                </div>
              ))}
            </div>
          )}
          {showViewAllButton && (
            <Button
              asChild
              size={"lg"}
              className="w-68 h-11 font-medium text-[16px] leading-[130%] mt-4"
            >
              <Link href={"/explore"}>Explore full library</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
