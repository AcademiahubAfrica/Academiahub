import { userPagesMetadata } from "@/app/data/Exports";
import Header from "@/components/user/analytics/Header";
import MyChart from "@/components/user/analytics/MyChart";
import Statitstics from "@/components/user/analytics/Statitstics";
import RecentActivities from "@/components/user/analytics/RecentActivities";

export const metadata = userPagesMetadata.analytics;
const page = () => {
  return (
    <main>
      <Header />
      <Statitstics />
      <div className="flex flex-col  lg:flex-row lg:justify-between">
        <MyChart />
        <RecentActivities />
      </div>
    </main>
  );
};

export default page;
