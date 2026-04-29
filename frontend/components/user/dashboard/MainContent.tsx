import ResearchFilters from "@/components/ResearchFilters";
import prisma from "@/prisma/connection";
import FilterDocuments from "./FilterDocuments";
import SearchBar from "../SearchBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { Prisma } from "@prisma/client";

type MainContentProps = {
  search?: string;
  category?: string;
};

const VALID_CATEGORIES = new Set(["RESEARCH", "SEMINAR", "PROJECT", "ANALYSIS"]);

const MainContent = async ({ search = "", category = "" }: MainContentProps) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  let documents: Awaited<ReturnType<typeof fetchDocuments>> = [];
  let likedDocumentIds: Set<string> = new Set();
  let savedDocumentIds: Set<string> = new Set();

  try {
    documents = await fetchDocuments(search.trim(), category.trim());

    if (userId && documents.length > 0) {
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
  } catch (error) {
    console.error("Failed to fetch documents:", error);
  }

  return (
    <>
      <ResearchFilters />
      <div className="lg:px-6.25 mt-4">
        <div className="md:hidden w-full my-3">
          <SearchBar />
        </div>
        <h4 className="text-lg mb-3 lg:mb-5.5 p-2.5  w-fit bg-white rounded-2xl font-medium leading-[130%]">
          {search ? `Results for "${search}"` : "Research of the week"}
        </h4>
        <FilterDocuments
          userId={userId}
          documents={documents}
          likedDocumentIds={likedDocumentIds}
          savedDocumentIds={savedDocumentIds}
        />
      </div>
    </>
  );
};

async function fetchDocuments(search: string, category: string) {
  const where: Prisma.DocumentWhereInput = {};

  if (category && VALID_CATEGORIES.has(category.toUpperCase())) {
    where.category = category.toUpperCase() as Prisma.DocumentWhereInput["category"];
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { institution: { contains: search, mode: "insensitive" } },
      { author: { is: { name: { contains: search, mode: "insensitive" } } } },
    ];
  }

  return prisma.document.findMany({
    where,
    include: {
      author: {
        select: { id: true, name: true, image: true },
      },
      _count: {
        select: { commentRecords: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: search ? 50 : 12,
  });
}

export default MainContent;
