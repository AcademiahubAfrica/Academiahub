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
  sort?: string;
};

const VALID_CATEGORIES = new Set(["RESEARCH", "SEMINAR", "PROJECT", "ANALYSIS"]);

const SORT_OPTIONS: Record<string, Prisma.DocumentFindManyArgs["orderBy"]> = {
  recent: { createdAt: "desc" },
  oldest: { createdAt: "asc" },
  popular: [{ likes: "desc" }, { createdAt: "desc" }],
};

const PAGE_SIZE = 12;

const MainContent = async ({
  search = "",
  category = "",
  sort = "",
}: MainContentProps) => {
  const trimmedSearch = search.trim();
  const trimmedCategory = category.trim();
  const trimmedSort = sort.trim();

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  let documents: Awaited<ReturnType<typeof fetchFirstPage>> = [];
  let total = 0;
  let likedIds: string[] = [];
  let savedIds: string[] = [];

  try {
    [documents, total] = await Promise.all([
      fetchFirstPage(trimmedSearch, trimmedCategory, trimmedSort),
      countDocuments(trimmedSearch, trimmedCategory),
    ]);

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
      likedIds = likes.map((l) => l.documentId);
      savedIds = saves.map((s) => s.documentId);
    }
  } catch (error) {
    console.error("Failed to fetch documents:", error);
  }

  const hasMore = documents.length < total;

  return (
    <>
      <ResearchFilters />
      <div className="lg:px-6.25 mt-4">
        <div className="md:hidden w-full my-3">
          <SearchBar />
        </div>
        {trimmedSearch ? (
          <h4 className="text-lg mb-3 lg:mb-5.5 p-2.5  w-fit bg-white rounded-2xl font-medium leading-[130%]">
            {`Results for "${trimmedSearch}"`}
          </h4>
        ) : null}
        <FilterDocuments
          key={`${trimmedSearch}|${trimmedCategory}|${trimmedSort}`}
          userId={userId}
          initialDocuments={documents}
          initialLikedIds={likedIds}
          initialSavedIds={savedIds}
          initialHasMore={hasMore}
          pageSize={PAGE_SIZE}
          search={trimmedSearch}
          category={trimmedCategory}
          sort={trimmedSort}
        />
      </div>
    </>
  );
};

function buildWhere(search: string, category: string): Prisma.DocumentWhereInput {
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

  return where;
}

function fetchFirstPage(search: string, category: string, sort: string) {
  return prisma.document.findMany({
    where: buildWhere(search, category),
    include: {
      author: {
        select: { id: true, name: true, image: true },
      },
      _count: {
        select: { commentRecords: true },
      },
    },
    orderBy: SORT_OPTIONS[sort] ?? SORT_OPTIONS.recent,
    take: PAGE_SIZE,
  });
}

function countDocuments(search: string, category: string) {
  return prisma.document.count({ where: buildWhere(search, category) });
}

export default MainContent;
