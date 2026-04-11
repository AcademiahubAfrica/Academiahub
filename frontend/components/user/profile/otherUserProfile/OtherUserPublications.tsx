"use client";

import { ResearchCardType } from "@/app/_types/documents";
import ResearchCard from "@/components/user/dashboard/ResearchCard";
import { useId } from "react";

interface OtherUserPublicationsProps {
  userId: string;
  documents: ResearchCardType[];
  likedDocumentIds: Set<string>;
  savedDocumentIds: Set<string>;
}

const OtherUserPublications = ({
  userId,
  documents,
  likedDocumentIds,
  savedDocumentIds,
}: OtherUserPublicationsProps) => {
  return (
    <section className="grid lg:px-6.25 grid-cols-2 gap-2 md:gap-4 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
      {documents.map((data) => (
        <ResearchCard
          key={data.id}
          data={data}
          isOwnDocument={false}
          isLiked={likedDocumentIds.has(data.id as string)}
          isSaved={savedDocumentIds.has(data.id as string)}
          showSaveButton={data.author.id !== userId}
        />
      ))}
    </section>
  );
};

export default OtherUserPublications;
