// "use client"

import { Button } from "@/components/ui/button";
import { CiClock1 } from "react-icons/ci";

const array = [...Array(4)];
const Activity = () => {
  return (
    <>
      {array.map((_, index) => (
        <div
          className="p-2 md:p-4 flex items-center justify-between mb-1 "
          key={index}
        >
          <div className="space-y-2 ">
            <p className="body-text w-[80%]">
              Chidinma Okafor uploaded Smart Traffic Management System
            </p>
            <span className="flex items-center gap-1 text-grey text-sm">
              <CiClock1 />
              <small>10 minutes ago</small>
            </span>
          </div>
          <Button>View</Button>
        </div>
      ))}
    </>
  );
};

export default Activity;
