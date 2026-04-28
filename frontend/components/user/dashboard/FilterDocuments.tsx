"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { $Enums } from "@prisma/client";
import ResearchCard from "./ResearchCard";

interface FilterDocumentsProp {
  userId?: string;
  documents: ({
    author: {
      id: string;
      image: string | null;
      name: string | null;
    };
    _count: {
      commentRecords: number;
    };
  } & {
    category: $Enums.Category;
    id: string;
    title: string;
    description: string;
    institution: string;
    year: string;
    fileUrl: string;
    fileKey: string;
    fileName: string;
    fileSize: number;
    downloads: number;
    likes: number;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
  })[];
  likedDocumentIds: Set<string>;
  savedDocumentIds: Set<string>;
}
const FilterDocuments = ({userId, documents, likedDocumentIds, savedDocumentIds}: FilterDocumentsProp) => {
   const searchParams = useSearchParams()
   const router = useRouter();
   const [hiddenIds, setHiddenIds] = useState<Set<string>>(() => new Set());

  const filterDocuments = () => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const filteredDocuments = documents.filter((doc) => {
      if (hiddenIds.has(doc.id)) return false;

      const categoryMatch =
        !category || category === "all" || doc.category === category;

      const searchMatch =
        !search || doc.title.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
    return filteredDocuments;
  };

  const filteredDocuments = filterDocuments();

  const handleDelete = (id: string) => {
    setHiddenIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    router.refresh();
  };

  return (
    <section className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
      {filteredDocuments.map((data) => (
        <ResearchCard
          key={data.id}
          data={data}
          isOwnDocument={data.authorId === userId}
          isLiked={likedDocumentIds.has(data.id)}
          isSaved={savedDocumentIds.has(data.id)}
          showSaveButton={data.author.id !== userId}
          onDelete={handleDelete}
        />
      ))}
    </section>
  );
};

export default FilterDocuments;
