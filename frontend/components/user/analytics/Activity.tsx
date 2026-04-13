import Link from "next/link";
import { CiClock1 } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import type { RecentActivity } from "@/lib/analytics";

const Activity = ({ activities }: { activities: RecentActivity[] }) => {
  if (activities.length === 0) {
    return (
      <p className="text-grey text-xs md:text-sm p-2 md:p-4">
        No recent uploads in the last 24 hours.
      </p>
    );
  }

  return (
    <>
      {activities.map((activity) => (
        <div
          className="p-2 md:p-4 flex  items-center justify-between mb-1 "
          key={activity.id}
        >
          <div className="space-y-2 ">
            <p className="text-[10px] leading-[130%] md:text-sm line-clamp-2 w-[80%]">
              {activity.authorName} uploaded {activity.title}
            </p>
            <span className="flex items-center gap-1 text-grey text-[10px]! md:text-sm!">
              <CiClock1 />
              <small>{activity.timeAgo}</small>
            </span>
          </div>
          <Button asChild className="max-sm:text-xs">
            <Link href={`/publication/${activity.id}`}>View</Link>
          </Button>
        </div>
      ))}
    </>
  );
};

export default Activity;
