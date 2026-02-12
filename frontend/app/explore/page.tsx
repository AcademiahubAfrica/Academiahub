"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockData } from "../data/exploreMockData";
import JoinUs from "@/components/landing/JoinUs";

export default function ExplorePage() {
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

  // Card alignment logic
  const getCardAlignment = (index: number, totalCards: number) => {
    if (totalCards === 2) {
      // For 2 cards: center both cards
      return "sm:mx-auto";
    }
    
    if (totalCards === 3) {
      // For 3 cards: keep normal grid behavior
      return "";
    }
    
    // For other cases, use default grid
    return "";
  };

  return (
    <ExploreContent />     
  )
}

export default ExplorePage
