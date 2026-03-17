import { GoHeart } from "react-icons/go";
import { IoCloudDownloadOutline, IoCloudUploadOutline } from "react-icons/io5";

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
        <IoCloudDownloadOutline className="text-green-500 text-sm md:text-xl" />
      ),
      label: "Downloads",
      count: stats?.downloads ?? 0,
    },
    {
      icon: <IoCloudUploadOutline className="text-primary text-sm md:text-xl" />,
      label: "Uploads",
      count: stats?.uploads ?? 0,
    },
    {
      icon: <GoHeart className="text-red-500 text-sm md:text-xl" />,
      label: "Likes",
      count: stats?.likes ?? 0,
    },
  ];

  return (
    <div className="flex justify-between mt-10 w-full max-w-214.5">
      {statsOptions.map(({ label, icon, count }) => (
        <div
          className="flex flex-col items-center justify-center gap-3 bg-[#F5F5F5] w-41.5 h-24.5 rounded-[10px]"
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
