import TopButtons from "@/components/user/publication/TopButtons";
import { Suspense } from "react";
import PublicationPageSkeleton from "@/components/user/publication/PublicationPageSkeleton";
import PublicationContent from "@/components/user/publication/PublicationContent";
import { Metadata, ResolvingMetadata } from "next";
import prisma from "@/prisma/connection";
import { getCategoryImage } from "@/lib/categoryImage";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;

  const document = await prisma.document.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true, image: true } },
    },
  });

  if (!document) {
    return {
      title: "Document Not Found",
    };
  }
  const baseUrl = "https://academiahubafrica.org/";
  const previousImages = (await parent).openGraph?.images || [];
  const currentImageUrl = baseUrl + getCategoryImage(document?.category);
  const userName = document?.author?.name;
  return {
    title: {
      absolute: document.title,
    },
    description: `Read "${document.title}" by ${userName} on Academia Hub Africa.`,
    openGraph: {
      title: document.title,
      description: `Written by ${userName}`,
      images: [currentImageUrl, ...previousImages],
    },
    twitter: {
      card: "summary_large_image",
      title: document.title,
      description: "The React Framework for the Web",

      images: [currentImageUrl],
    },

    authors: [{ name: userName! }],
    publisher: userName,
    creator: userName,
  };
}

export default async function DocumentViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="m-1 md:m-2 lg:mx-4  lg:px-4">
      <TopButtons />
      <Suspense fallback={<PublicationPageSkeleton />}>
        <PublicationContent params={params} />
      </Suspense>
    </main>
  );
}
