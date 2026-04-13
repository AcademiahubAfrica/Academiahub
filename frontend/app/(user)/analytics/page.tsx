import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { userPagesMetadata } from "@/app/data/Exports";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAnalytics, isTimeRange } from "@/lib/analytics";
import Header from "@/components/user/analytics/Header";
import MyChart from "@/components/user/analytics/MyChart";
import Statistics from "@/components/user/analytics/Statistics";
import RecentActivities from "@/components/user/analytics/RecentActivities";
import AnalyticsSkeleton from "@/components/user/analytics/AnalyticsSkeleton";
import PageName from "@/components/user/shared/PageName";

export const metadata = userPagesMetadata.analytics;

const AnalyticsContent = async ({
  searchParams,
}: {
  searchParams: Promise<{ time?: string }>;
}) => {
  const [session, { time }] = await Promise.all([
    getServerSession(authOptions),
    searchParams,
  ]);
  const timeRange = isTimeRange(time) ? time : "yearly";
  const { stats, chartData, recentActivities } = await getAnalytics(
    session!.user.id,
    timeRange,
  );

  return (
    <>
      <Statistics stats={stats} />
      <div className="flex flex-col mt-2 md:mt-5  lg:flex-row lg:gap-2 lg:justify-between">
        <MyChart data={chartData} />
        <RecentActivities activities={recentActivities} />
      </div>
    </>
  );
};

const Page = ({
  searchParams,
}: {
  searchParams: Promise<{ time?: string }>;
}) => {
  return (
    <main className="mt-2 lg:px-4">
      <Header />
      <PageName />
      <Suspense fallback={<AnalyticsSkeleton />}>
        <AnalyticsContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
};

export default Page;
