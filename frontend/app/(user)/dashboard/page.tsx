import { Suspense } from "react";
import { userPagesMetadata } from "@/app/data/Exports";
import Header from "@/components/user/dashboard/Header";
import ResearchPageSkeleton from "@/components/user/dashboard/ResearchPageSkeleton";
import MainContent from "@/components/user/dashboard/MainContent";
export const metadata = userPagesMetadata.dashboard;
const Page = () => {
  return (
    <div className="w-full">
      <Header />

      <Suspense fallback={<ResearchPageSkeleton />}>
        <MainContent />
      </Suspense>
    </div>
  );
};

export default Page;
