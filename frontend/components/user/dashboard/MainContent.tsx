import ResearchFilters from "@/components/ResearchFilters";
import prisma from "@/prisma/connection";
import FilterDocuments from "./FilterDocuments";
import SearchBar from "../SearchBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


const MainContent = async () => {

  let documents: Awaited<ReturnType<typeof fetchDocuments>> = [];
  let likedDocumentIds: Set<string> = new Set();
  let savedDocumentIds: Set<string> = new Set();
  let userId: string | undefined;

  try {
    const [docs, session] = await Promise.all([
      fetchDocuments(),
      getServerSession(authOptions),
    ]);
    documents = docs;
    userId = session?.user?.id;

    if (session?.user?.id) {
      const documentIds = documents.map((d) => d.id);
      const [likes, saves] = await Promise.all([
        prisma.like.findMany({
          where: {
            userId: session.user.id,
            documentId: { in: documentIds },
          },
          select: { documentId: true },
        }),
        prisma.save.findMany({
          where: {
            userId: session.user.id,
            documentId: { in: documentIds },
          },
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
        <h4 className="text-lg mb-3 lg:mb-5.5 p-2.5  w-fit bg-white rounded-2xl font-medium leading-[130%]"  >
          Research of the week
        </h4>
        <FilterDocuments userId={userId} documents={documents} likedDocumentIds={likedDocumentIds} savedDocumentIds={savedDocumentIds} />
      </div>
    </>
  );
};

async function fetchDocuments() {
  return prisma.document.findMany({
    include: {
      author: {
        select: { id: true, name: true, image: true },
      },
      _count: {
        select: { commentRecords: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 12,
  });
}

export default MainContent;
