"use client";

import { useState } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import JoinUs from "@/components/landing/JoinUs";
import ExploreSkeleton from "@/components/explore/ExploreSkeleton";
import type { ResearchCardType } from "@/app/_types/documents";
import ResearchCard from "@/components/user/dashboard/ResearchCard";
import Link from "next/link";
import ExploreSearchSection from "./ExploreSearchSection";

interface ExploreDocument extends ResearchCardType {
  authorId: string;
  isLiked?: boolean;
  isSaved?: boolean;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface DocumentsPage {
  documents: ExploreDocument[];
  pagination: Pagination;
}

interface ExploreContentProps {
  userId?: string;
}

async function fetchDocuments(
  query: string,
  page: number,
  signal: AbortSignal
): Promise<DocumentsPage> {
  const params = new URLSearchParams({ page: String(page), limit: "12" });
  if (query) params.set("q", query);

  const res = await fetch(`/api/documents?${params}`, { signal });
  if (!res.ok) throw new Error("Failed to fetch documents");
  return res.json();
} 

export default function ExploreContent({ userId }: ExploreContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");


  const {
    data,
    isPending,
    isPlaceholderData,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["explore-documents", debouncedQuery],
    queryFn: ({ pageParam, signal }) =>
      fetchDocuments(debouncedQuery, pageParam, signal),
    initialPageParam: 1,
    getNextPageParam: ({ pagination }) =>
      pagination.page < pagination.totalPages ? pagination.page + 1 : undefined,
    placeholderData: keepPreviousData,
  });

  const documents = data?.pages.flatMap((page) => page.documents) ?? [];



  const handleClearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Search Section */}
     <ExploreSearchSection searchQuery={searchQuery} setSearchQuery={ setSearchQuery} setDebouncedQuery={setDebouncedQuery}/>

      {/* Publications Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl text-center font-medium text-black leading-6">
            Suggested Publications
          </h2>
         
        </div>

        {isPending ? (
          <ExploreSkeleton />
        ) : documents.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No publications found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
            <Button onClick={handleClearSearch} variant="outline" className="mt-4">
              Clear Search
            </Button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 ${
              documents.length === 2
                ? "sm:grid-cols-2 sm:justify-center"
                : "sm:grid-cols-2 lg:grid-cols-3"
            } gap-6 lg:gap-8`}
          >
            {documents.map((doc) => (
              <div
                key={doc.id}
                className={documents.length === 2 ? "sm:mx-auto sm:max-w-100" : ""}
              >
                <ResearchCard
                  data={doc}
                  isLiked={doc.isLiked ?? false}
                  isSaved={doc.isSaved ?? false}
                  isOwnDocument={doc.authorId === userId}
                  showSaveButton={doc.authorId !== userId}
                  loginRequired={!userId}
                />
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasNextPage && (
          <div className="text-center mt-12">
            <Link href={"/dashboard"}>
            <Button
              size="lg"
              className="px-8 bg-transparent border-primary hover:text-white hover:bg-primary text-primary border"
              disabled={isFetchingNextPage || isPlaceholderData}
              >
              Explore full library
            </Button>
              </Link>
          </div>
        )}
      </section>
      <JoinUs />
    </main>
  );
}
