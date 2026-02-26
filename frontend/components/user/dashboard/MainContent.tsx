import ResearchFilters from "@/components/ResearchFilters";
import { mockData } from "@/app/data/exploreMockData";
import { serverFetch } from "@/lib/serverFetch";
import { Document } from "@/app/_types/documents";
import ResearchCard from "./ResearchCard";

interface DocumentResponse {
  documents: Document[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
const MainContent = async () => {
  const response = await serverFetch<DocumentResponse>(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/documents`,
  );
  console.log(response.documents[0].author);

  return (
    <>
      <ResearchFilters />
      <div className="lg:px-6.25 mt-4">
        <h4 className="text-lg mb-3 lg:mb-5.5 p-2.5  w-fit bg-white rounded-2xl font-medium leading-[130%]">
          Research of the week
        </h4>

        <section className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
          {response.documents.map((data) => (
            <ResearchCard key={data.id} data={data} />
          ))}
        </section>
      </div>
    </>
  );
};

export default MainContent;
