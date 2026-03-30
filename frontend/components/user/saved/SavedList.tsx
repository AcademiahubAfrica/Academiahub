"use client";

import { useState } from "react";
import { ResearchCardType } from "@/app/_types/documents";
import ResearchCard from "@/components/user/dashboard/ResearchCard";
import EmptySection from "@/components/user/notifications/EmptySection";

interface SavedListProps {
  initialDocuments: ResearchCardType[];
  likedDocumentIds: Set<string>;
}

const SavedList = ({ initialDocuments, likedDocumentIds }: SavedListProps) => {
  const [visibleIds, setVisibleIds] = useState(
    () => new Set(initialDocuments.map((d) => d.id)),
  );

  const visibleDocuments = initialDocuments.filter((d) => visibleIds.has(d.id));

  const handleToggle = (documentId: string) => (isSaved: boolean) => {
    setVisibleIds((prev) => {
      const next = new Set(prev);
      if (isSaved) {
        next.add(documentId);
      } else {
        next.delete(documentId);
      }
      return next;
    });
  };

  return (
    <div className="lg:px-6.25">
      {visibleDocuments.length ? (
        <section className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
          {visibleDocuments.map((data) => (
            <ResearchCard
              key={data.id}
              data={data}
              isLiked={likedDocumentIds.has(data.id as string)}
              isSaved={true}
              onSaveToggle={handleToggle(data.id as string)}
            />
          ))}
        </section>
      ) : (
        <EmptySection
          title="No saved publications yet"
          text="Materials you save will appear here for easy access"
          text="Materials you save will appear here for easy access"
        />
      )}
    </div>
  );
};

export default SavedList;
