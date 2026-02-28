import ResearchFilters from "@/components/ResearchFilters";
import prisma from "@/prisma/connection";
import ResearchCard from "./ResearchCard";

const MainContent = async () => {
  let documents: Awaited<ReturnType<typeof fetchDocuments>> = [];

  try {
    documents = await fetchDocuments();
  } catch (error) {
    console.error("Failed to fetch documents:", error);
  }

  return (
    <>
      <ResearchFilters />
      <div className="lg:px-6.25 mt-4">
        <h4 className="text-lg mb-3 lg:mb-5.5 p-2.5  w-fit bg-white rounded-2xl font-medium leading-[130%]">
          Research of the week
        </h4>

        <section className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
          {documents.map((data) => (
            <ResearchCard key={data.id} data={data} />
          ))}
        </section>
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
    },
    orderBy: { createdAt: "desc" },
    take: 12,
  });
}

export default MainContent;
