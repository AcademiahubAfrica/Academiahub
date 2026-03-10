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
})[]
}
const FilterDocuments = ({documents}: FilterDocumentsProp) => {
   const searchParams = useSearchParams()

   const filterDocuments = () => {
    const category = searchParams.get("category")
    
   const filteredDocuments = !category || category === 'all' ? documents :  documents.filter(d => category === d.category)

    return filteredDocuments
  }

  const filteredDocuments = filterDocuments()
  
  
  return (
    <section className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
          {filteredDocuments.map((data) => (
            <ResearchCard key={data.id} data={data}  />
          ))}
        </section>
  )
}

export default FilterDocuments