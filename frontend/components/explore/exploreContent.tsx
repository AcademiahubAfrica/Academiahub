"use client";

import { useState, useEffect } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ViewDetailsButton from "@/components/ViewDetailsButton";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Loader2 } from "lucide-react";
import { getInitials } from "@/lib/messaging/utils";
import JoinUs from "@/components/landing/JoinUs";
import ExploreSkeleton from "@/components/explore/ExploreSkeleton";
import ExploreCardTitle from "@/components/explore/ExploreCardTitle";
import type { Document } from "@/app/_types/documents";
import { getCategoryImage } from "@/lib/categoryImage";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface DocumentsPage {
  documents: Document[];
  pagination: Pagination;
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

export default function ExploreContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const {
    data,
    isPending,
    isPlaceholderData,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
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

  const handleSearch = () => {
    setDebouncedQuery(searchQuery.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Search Section */}
      <section className="bg-linear-to-br from-gray-300 via-yellow-200 to-gray-200 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 ">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Explore And Find What You Need
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Search through thousands of publications by topic, university, or field of study
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto flex gap-3 bg-white/50 rounded-md px-6 py-4 shadow-sm">
            <div className="relative flex-1 ">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="Search for Projects, Schools...."
                value={searchQuery}
                onChange={(e) => {setSearchQuery(e.target.value)}}
                onKeyDown={handleKeyDown}
                className="w-full pl-12 pr-4 py-6 text-base rounded-full border-gray-300 focus:border-blue-500 focus:ring-2 bg-white"
              />
            </div>
            <Button
              onClick={handleSearch}
              size="lg"
              className="px-8 py-6 rounded-full font-medium"
            >
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Publications Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            {searchQuery
              ? `Search Results (${documents.length ?? 0})`
              : "All Publications"}
          </h2>
          <p className="text-gray-600 mt-2">
            {searchQuery
              ? `Showing results for "${searchQuery}"`
              : "Browse through our collection of academic publications"}
          </p>
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
              <article
                key={doc.id}
                className={`bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                  documents.length === 2 ? "sm:mx-auto" : ""
                }`}
                style={{
                  maxWidth: documents.length === 2 ? "400px" : "none",
                }}
              >
                {/* Publication Image */}
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={getCategoryImage(doc.category)}
                    alt={doc.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    loading="eager"
                  />
                </div>

                {/* Publication Content */}
                <div className="p-5">
                  <ExploreCardTitle title={doc.title} />

                  {/* Author Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-10 h-10 shrink-0">
                      <AvatarImage src={doc.author.image || undefined} />
                      <AvatarFallback>
                        {getInitials(doc.author.name || "")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate mb-0.5">
                        {doc.author.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {doc.institution}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <span className="font-medium">{doc.likes}</span> likes
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-medium">{doc.downloads}</span> downloads
                    </span>
                  </div>

                  {/* View Details Button */}
                  <ViewDetailsButton
                    documentId={doc.id}
                    className="w-full rounded-lg font-medium"
                  />
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasNextPage && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="px-8"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage || isPlaceholderData}
            >
              {isFetchingNextPage ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More Publications"
              )}
            </Button>
          </div>
        )}
      </section>
      <JoinUs />
    </main>
  );
}
