import { FcLikePlaceholder } from "react-icons/fc";
import { IoCloudDownloadOutline, IoCloudUploadOutline } from "react-icons/io5";

const statsOptions = [
  {
    icon: (
      <IoCloudDownloadOutline className="text-green-500 text-sm md:text-xl" />
    ),
    label: "Downloads",
    count: 6,
  },
  {
    icon: <IoCloudUploadOutline className="text-primary text-sm md:text-xl" />,
    label: "Uploads",
    count: 6,
  },
  {
    icon: <FcLikePlaceholder className="text-green-500 text-sm md:text-xl" />,
    label: "Likes",
    count: 6,
  },
];
const Stats = () => {
  return (
    <div className="flex items-center mt-10 justify-between md:w-[75%]">
      {statsOptions.map(({ label, icon, count }) => (
        <div className="flex flex-col items-center gap-4 " key={label}>
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
