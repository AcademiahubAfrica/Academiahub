import TopButtons from "@/components/user/publication/TopButtons";
import { Suspense } from "react";
import PublicationPageSkeleton from "@/components/user/publication/PublicationPageSkeleton";
import PublicationContent from "@/components/user/publication/PublicationContent";

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
