import { AiOutlineCloudUpload } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { FiDownloadCloud } from "react-icons/fi";
import { IoTrendingDown, IoTrendingUp } from "react-icons/io5";
import { MdPersonOutline } from "react-icons/md";
import type { AnalyticsStats } from "@/lib/analytics";

type Card = {
  label: string;
  value: number;
  percentage: number;
  icon: React.ReactNode;
};

const Statistics = ({ stats }: { stats: AnalyticsStats }) => {
  const cards: Card[] = [
    {
      label: "Total Downloads",
      value: stats.downloads.value,
      percentage: stats.downloads.percentageChange,
      icon: <FiDownloadCloud />,
    },
    {
      label: "Total Uploads",
      value: stats.uploads.value,
      percentage: stats.uploads.percentageChange,
      icon: <AiOutlineCloudUpload />,
    },
    {
      label: "Total Saves",
      value: stats.saves.value,
      percentage: stats.saves.percentageChange,
      icon: <CiBookmark />,
    },
    {
      label: "Profile Visits",
      value: stats.profileVisits.value,
      percentage: stats.profileVisits.percentageChange,
      icon: <MdPersonOutline size={24} />,
    },
  ];

  return (
    <div className="grid grid-cols-2  lg:grid-cols-4 gap-2 md:gap-5 xl:gap-8">
      {cards.map(({ label, percentage, value, icon }) => (
        <div
          className="rounded-[20px] bg-white min-h-30  md:min-h-[170.5px] flex flex-col justify-around  p-1 md:p-4"
          key={label}
        >
          {(() => {
            const negative = percentage < 0;
            const TrendIcon = negative ? IoTrendingDown : IoTrendingUp;
            const colorClass = negative ? "text-red-500" : "text-green-500";
            const display = negative ? `${percentage}%` : `+${percentage}%`;
            return (
              <div className="flex items-center justify-between md:flex-col md:items-start">
                <p className="mb-1.25 font-normal text-xs md:text-[16px] max-sm:text-grey  md:font-medium">
                  {label}
                </p>
                <span className="flex items-center gap-0.5">
                  <TrendIcon size={12} className={colorClass} />
                  <small className={`leading-5.25 ${colorClass} font-normal`}>
                    {display}{" "}
                    <span className="hidden md:inline">from last month</span>
                  </small>
                </span>
              </div>
            );
          })()}
          <div className="flex items-end justify-between">
            <h3 className="font-semibold text-2xl lg:text-4xl">{value}</h3>

            <span className="2xl:w-15 w-7.5 h-7.5 md:w-107.5 md:h-10 lg:w-12 lg:h-12 2xl:h-15 flex items-center justify-center border border-grey rounded-[10px]">
              {icon}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
