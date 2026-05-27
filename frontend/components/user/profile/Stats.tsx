import { CloudDownload, CloudUpload, Heart } from "lucide-react";

interface StatsProps {
  stats?: {
    uploads: number;
    downloads: number;
    likes: number;
    saves: number;
  };
}

const Stats = ({ stats }: StatsProps) => {
  const statsOptions = [
    {
      icon: (
        <CloudDownload
          strokeWidth={1.5}
          className="text-green-500 size-3.5 md:size-5"
        />
      ),
      label: "Downloads",
      count: stats?.downloads ?? 0,
    },
    {
      icon: (
        <CloudUpload
          strokeWidth={1.5}
          className="text-primary size-3.5 md:size-5"
        />
      ),
      label: "Uploads",
      count: stats?.uploads ?? 0,
    },
    {
      icon: (
        <Heart
          strokeWidth={1.5}
          className="text-red-500 size-3.5 md:size-5"
        />
      ),
      label: "Likes",
      count: stats?.likes ?? 0,
    },
  ];

  return (
    <div className=" gap-2 lg:gap-45 flex justify-between mt-10 max:w-[95vw] md:max-w-214.5  ">
      {statsOptions.map(({ label, icon, count }) => (
        <div
          className="flex flex-col items-center justify-center gap-3 sm:bg-[#F5F5F5] h-20  sm:w-34.75 sm:h-20.25   xl:w-41.5 xl:h-24.5 rounded-[10px]"
          key={label}
        >
          <div className="flex items-center gap-2">
            {icon}
            <h5 className="body-text">{label}</h5>
          </div>
          <h4 className="text-xl font-medium">{count}</h4>
        </div>
      ))}
    </div>
  );
};

export default Stats;
