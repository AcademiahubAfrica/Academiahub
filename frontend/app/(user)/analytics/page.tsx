import { userPagesMetadata } from "@/app/data/Exports";
import Header from "@/components/user/analytics/Header";
import MyChart from "@/components/user/analytics/MyChart";
import Statitstics from "@/components/user/analytics/Statitstics";
import RecentActivities from "@/components/user/analytics/RecentActivities";
import PageName from "@/components/user/shared/PageName";

export const metadata = userPagesMetadata.analytics;
const page = () => {
  return (
    <main className="mt-2 lg:px-4">
      <Header />
      <PageName />
      <Statitstics />
      <div className="flex flex-col mt-2 md:mt-5  lg:flex-row lg:gap-2 lg:justify-between">
        <MyChart />
        <RecentActivities />
      </div>
    </main>
  );
};

export default page;
