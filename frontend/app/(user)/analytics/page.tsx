import Header from "./Header";
import Statitstics from "./Statitstics";
import MyChart from "./MyChart";
import RecentActivities from "./RecentActivities";
const page = () => {
  return (
    <main>
      <Header />
      <Statitstics />
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <MyChart />
        <RecentActivities />
      </div>
    </main>
  );
};

export default page;
