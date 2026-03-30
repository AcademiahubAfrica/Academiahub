"use client";

import { useState } from "react";
import { ResearchCardType } from "@/app/_types/documents";
import SavedHeader from "./SavedHeader";
import SavedList from "./SavedList";

interface SavedContentProps {
  initialDocuments: ResearchCardType[];
  likedDocumentIds: Set<string>;
}

const SavedContent = ({
  initialDocuments,
  likedDocumentIds,
}: SavedContentProps) => {
  const [visibleIds, setVisibleIds] = useState(
    () => new Set(initialDocuments.map((d) => d.id))
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
    <>
      <SavedHeader count={visibleDocuments.length} />
      <SavedList
        documents={visibleDocuments}
        likedDocumentIds={likedDocumentIds}
        onSaveToggle={handleToggle}
      />
    </>
  );
};

export default SavedContent;
