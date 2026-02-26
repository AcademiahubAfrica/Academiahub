import { Button } from "@/components/ui/button";
import Activity from "./Activity";
const RecentActivities = () => {
  return (
    <div className="flex-1 bg-white rounded-[20px] p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[10px] md:text-lg font-semibold">
          Recent Activities
        </h3>
        <Button variant="link" className="text-black max-sm:tex-sm">
          View All
        </Button>
      </div>

      <Activity />
    </div>
  );
};

export default RecentActivities;
