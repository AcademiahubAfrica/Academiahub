"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ResearchCardType } from "@/app/_types/documents";
import ResearchCard from "@/components/user/dashboard/ResearchCard";
import EmptySection from "../shared/EmptySection";

const filterOptions = [{ value: "publications" }, { value: "likes" }];

interface PublicationsAndLikesProps {
  userId: string;
  ownDocuments: ResearchCardType[];
  likedDocuments: ResearchCardType[];
  likedDocumentIds: Set<string>;
  savedDocumentIds: Set<string>;
}

const PublicationsAndLikes = ({
  userId,
  ownDocuments,
  likedDocuments,
  likedDocumentIds,
  savedDocumentIds,
}: PublicationsAndLikesProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(() => new Set());

  const filter = searchParams.get("show") || "publications";

  function updateParams(key: string, value: string): void {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  }

  const handleDelete = (id: string) => {
    setHiddenIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    router.refresh();
  };

  const sourceDocuments = filter === "publications" ? ownDocuments : likedDocuments;
  const documents = sourceDocuments.filter((d) => !hiddenIds.has(d.id as string));
  const emptyTitle =
    filter === "publications"
      ? "No publications yet"
      : "No liked publications yet";
  const emptyText =
    filter === "publications"
      ? "To see a publication, upload one."
      : "Publications you like will appear here";

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2 md:mx-4 mb-4">
        {filterOptions.map(({ value }, index) => (
          <button
            className={`${
              filter === value
                ? "text-primary border-b border-primary"
                : "text-black"
            } rounded-none p-2 capitalize`}
            onClick={() => updateParams("show", value)}
            key={index}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="lg:px-6.25">
        {documents.length ? (
          <section className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
            {documents.map((data) => (
              <ResearchCard
                key={data.id}
                isOwnDocument={filter.toLowerCase() !== "likes"}
                data={data}
                isLiked={likedDocumentIds.has(data.id as string)}
                isSaved={savedDocumentIds.has(data.id as string)}
                showSaveButton={data.author.id !== userId}
                onDelete={handleDelete}
              />
            ))}
          </section>
        ) : (
          <EmptySection title={emptyTitle} text={emptyText} />
        )}
      </div>
    </div>
  );
};

export default PublicationsAndLikes;
