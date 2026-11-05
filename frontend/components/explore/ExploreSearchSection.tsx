"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect } from "react";
import type { Dispatch, KeyboardEvent, SetStateAction } from "react";

type ExploreSearchSectionProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setDebouncedQuery: Dispatch<SetStateAction<string>>;
};

const ExploreSearchSection = ({
  searchQuery,
  setSearchQuery,
  setDebouncedQuery,
}: ExploreSearchSectionProps) => {

   
      useEffect(() => {
        const timeout = setTimeout(() => {
          setDebouncedQuery(searchQuery.trim());
        }, 400);
    
        return () => clearTimeout(timeout);
      }, [searchQuery, setDebouncedQuery]);
    
      const handleSearch = () => {
    setDebouncedQuery(searchQuery.trim());
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
}
  return (
     <section className="bg-linear-to-r from-[#E9EBF3] via-[#FFFBE6] to-[#E9EBF3] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 ">
          <div className="text-center mb-8">
            <h1 className="text-xl md:text-4xl font-medium md:font-semibold md:leading-10 mb-4">
              Explore And Find What You Need
            </h1>
            <p className="text-sm leading-4.5 md:text-2xl md:leading-[100%] text-gray-600 max-w-3xl mx-auto">
              Search through thousands of publications by topic, university, or field of study
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto flex items-center gap-2 md:gap-3 bg-[#F2F2F2] rounded-md px-2 md:px-6 py-4 shadow">
            <div className="relative flex-1 ">
              <Search className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="Search for Projects, Schools...."
                value={searchQuery}
                onChange={(e) => {setSearchQuery(e.target.value)}}
                onKeyDown={handleKeyDown}
                className="w-full pl-8 md:pl-12 pr-4 py-6 text-base rounded-full border-gray-300 focus:border-blue-500 focus:ring-2 bg-white placeholder:text-sm placeholder:"
              />
            </div>
            <Button
              onClick={handleSearch}
              size="lg"
              className="px-4 md:px-8 py-3 md:py-6 rounded-full font-medium"
            >
              Search
            </Button>
          </div>
        </div>
      </section>
  )
}

export default ExploreSearchSection
