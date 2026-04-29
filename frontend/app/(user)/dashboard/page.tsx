import { Suspense } from "react";
import { userPagesMetadata } from "@/app/data/Exports";
import Header from "@/components/user/dashboard/Header";
import ResearchPageSkeleton from "@/components/user/dashboard/ResearchPageSkeleton";
import MainContent from "@/components/user/dashboard/MainContent";
export const metadata = userPagesMetadata.dashboard;

type DashboardSearchParams = {
  search?: string | string[];
  category?: string | string[];
};

const first = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) => {
  const params = await searchParams;
  const search = first(params.search) ?? "";
  const category = first(params.category) ?? "";

  return (
    <div className="w-full">
      <Header />

      <Suspense fallback={<ResearchPageSkeleton />}>
        <MainContent search={search} category={category} />
      </Suspense>
    </div>
  );
};

export default Page;
