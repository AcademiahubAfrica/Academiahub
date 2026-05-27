"use client";
import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { $Enums } from "@prisma/client";
import { Button } from "@/components/ui/button";
import ResearchCard from "./ResearchCard";

type DashboardDocument = {
  author: {
    id: string;
    image: string | null;
    name: string | null;
  };
  _count: {
    commentRecords: number;
  };
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
  createdAt: Date | string;
  updatedAt: Date | string;
  isLiked?: boolean;
  isSaved?: boolean;
};

interface FilterDocumentsProps {
  userId?: string;
  initialDocuments: DashboardDocument[];
  initialLikedIds: string[];
  initialSavedIds: string[];
  initialHasMore: boolean;
  pageSize: number;
  search: string;
  category: string;
  sort: string;
}

const FilterDocuments = ({
  userId,
  initialDocuments,
  initialLikedIds,
  initialSavedIds,
  initialHasMore,
  pageSize,
  search,
  category,
  sort,
}: FilterDocumentsProps) => {
  const router = useRouter();
  const [documents, setDocuments] = useState(initialDocuments);
  const [likedIds, setLikedIds] = useState(() => new Set(initialLikedIds));
  const [savedIds, setSavedIds] = useState(() => new Set(initialSavedIds));
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(() => new Set());
  const [isPending, startTransition] = useTransition();

  const visibleDocuments = useMemo(
    () => documents.filter((d) => !hiddenIds.has(d.id)),
    [documents, hiddenIds],
  );

  const handleDelete = (id: string) => {
    setHiddenIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    router.refresh();
  };

  const loadMore = () => {
    const nextPage = page + 1;
    startTransition(async () => {
      const params = new URLSearchParams({
        page: String(nextPage),
        limit: String(pageSize),
        sort: sort || "recent",
      });
      if (search) params.set("q", search);
      if (category) params.set("category", category);

      try {
        const res = await fetch(`/api/documents?${params}`);
        if (!res.ok) return;
        const data = (await res.json()) as {
          documents: DashboardDocument[];
          pagination: { page: number; totalPages: number };
        };

        setDocuments((prev) => [...prev, ...data.documents]);
        setLikedIds((prev) => {
          const next = new Set(prev);
          for (const d of data.documents) if (d.isLiked) next.add(d.id);
          return next;
        });
        setSavedIds((prev) => {
          const next = new Set(prev);
          for (const d of data.documents) if (d.isSaved) next.add(d.id);
          return next;
        });
        setPage(nextPage);
        setHasMore(data.pagination.page < data.pagination.totalPages);
      } catch (error) {
        console.error("Failed to load more documents:", error);
      }
    });
  };

  return (
    <>
      <section className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
        {visibleDocuments.map((data, index) => (
          <ResearchCard
            key={data.id}
            data={data}
            isOwnDocument={data.authorId === userId}
            isLiked={likedIds.has(data.id)}
            isSaved={savedIds.has(data.id)}
            showSaveButton={data.author.id !== userId}
            onDelete={handleDelete}
            priority={index === 0}
          />
        ))}
      </section>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            size="lg"
            className="px-8"
            onClick={loadMore}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              "Load more"
            )}
          </Button>
        </div>
      )}
    </>
  );
};

export default FilterDocuments;
