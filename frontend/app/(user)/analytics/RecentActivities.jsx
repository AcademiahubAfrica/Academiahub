import { Button } from "@/components/ui/button";
import Activity from "./Activity";
const RecentActivities = () => {
  return (
    <div className="flex-1 ">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Activities</h3>
        <Button variant="link" className="text-black">
          View All
        </Button>
      </div>

      <Activity />
    </div>
  );
};

export default RecentActivities;
