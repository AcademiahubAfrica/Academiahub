'use client'
import React from 'react'
import { useSearchParams } from "next/navigation";
import { $Enums } from '@/lib/generated/prisma';
import ResearchCard from './ResearchCard';

interface FilterDocumentsProp {
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
}
const FilterDocuments = ({documents, likedDocumentIds}: FilterDocumentsProp) => {
   const searchParams = useSearchParams()

   const filterDocuments = () => {
    const category = searchParams.get("category")
    const search = searchParams.get("search")

   const filteredDocuments =  documents.filter((doc) => {

  const categoryMatch =
    !category || category === "all" || doc.category === category

  const searchMatch =
    !search || doc.title.toLowerCase().includes(search.toLowerCase())

  return categoryMatch && searchMatch
})
    return filteredDocuments
  }

  const filteredDocuments = filterDocuments()
  
  
  return (
    <section className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
          {filteredDocuments.map((data) => (
            <ResearchCard key={data.id} data={data} isLiked={likedDocumentIds.has(data.id)} />
          ))}
        </section>
  )
}

export default FilterDocuments