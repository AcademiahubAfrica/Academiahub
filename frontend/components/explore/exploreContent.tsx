"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockData } from "../\../app/data/exploreMockData";
import JoinUs from "@/components/JoinUs";

export default function ExploreContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPublications, setFilteredPublications] = useState(mockData);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredPublications(mockData);
      return;
    }

    const filtered = mockData.filter(
      (pub) =>
        pub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.institution.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPublications(filtered);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
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
            {searchQuery ? `Search Results (${filteredPublications.length})` : "All Publications"}
          </h2>
          <p className="text-gray-600 mt-2">
            {searchQuery
              ? `Showing results for "${searchQuery}"`
              : "Browse through our collection of academic publications"}
          </p>
        </div>

        {filteredPublications.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No publications found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setFilteredPublications(mockData);
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <div className={`grid grid-cols-1 ${
            filteredPublications.length === 2 
              ? "sm:grid-cols-2 sm:justify-center" 
              : "sm:grid-cols-2 lg:grid-cols-3"
          } gap-6 lg:gap-8`}>
            {filteredPublications.map((publication) => (
              <article
                key={publication.id}
                className={`bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                  filteredPublications.length === 2 ? "sm:mx-auto" : ""
                }`}
                style={{
                  maxWidth: filteredPublications.length === 2 ? "400px" : "none"
                }}
              >
                {/* Publication Image */}
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={publication.imagePath}
                    alt={publication.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Publication Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-gray-900 mb-4 line-clamp-2 min-h-14">
                    {publication.name}
                  </h3>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={publication.userPfp}
                        alt={publication.username}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate">
                        {publication.username}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {publication.institution}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  {publication.likes && (
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <span className="font-medium">{publication.likes}</span> likes
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="font-medium">{publication.comments}</span> comments
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="font-medium">{publication.downloads}</span> downloads
                      </span>
                    </div>
                  )}

                  {/* View Details Button */}
                  <Button className="w-full rounded-lg font-medium" size="lg">
                    View Details
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredPublications.length > 0 && (
          <div className="text-center mt-12">
            <Button size="lg" className="px-8 ">
              Load More Publications
            </Button>
          </div>
        )}
      </section>
      <JoinUs />
    </main>
  );
}