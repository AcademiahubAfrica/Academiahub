"use client";

import { useSearchParams } from "next/navigation";
import { ResearchCardType } from "@/app/_types/documents";
import ResearchCard from "@/components/user/dashboard/ResearchCard";
import EmptySection from "../shared/EmptySection";

interface DownloadedListProps {
  userId: string;
  documents: ResearchCardType[];
  totalCount: number;
  likedDocumentIds: Set<string>;
  savedDocumentIds: Set<string>;
}

const DownloadedList = ({
  userId,
  documents,
  totalCount,
  likedDocumentIds,
  savedDocumentIds,
}: DownloadedListProps) => {
  const searchParams = useSearchParams();
  const search = (searchParams.get("search") ?? "").trim().toLowerCase();

  const filteredDocuments = search
    ? documents.filter((d) => {
        const title = d.title?.toLowerCase() ?? "";
        const author = d.author?.name?.toLowerCase() ?? "";
        return title.includes(search) || author.includes(search);
      })
    : documents;

  return (
    <>
      <div className="px-4 bg-white lg:px-12 lg:py-4 md:mb-4 mb-2 flex items-center justify-between">
        <h3 className="md:text-lg text-sm font-normal md:font-medium">
          Total Download: {totalCount}
        </h3>
      </div>

      <div className="lg:px-6.25">
        {filteredDocuments.length ? (
          <section className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
            {filteredDocuments.map((data) => (
              <ResearchCard
                isOwnDocument={userId === data.author.id}
                key={data.id}
                data={data}
                isLiked={likedDocumentIds.has(data.id as string)}
                isSaved={savedDocumentIds.has(data.id as string)}
                showSaveButton={data.author.id !== userId}
              />
            ))}
          </section>
        ) : (
          <EmptySection
            title="No downloads yet"
            text="Downloaded cards will appear here"
          />
        )}
      </div>
    </>
  );
};

export default DownloadedList;
