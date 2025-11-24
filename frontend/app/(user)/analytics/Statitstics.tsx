import { AiOutlineCloudUpload } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { FiDownloadCloud } from "react-icons/fi";
import { IoBookOutline, IoTrendingDown, IoTrendingUp } from "react-icons/io5";

const stats = [
  {
    label: "Total Downloads",
    percentage: 15,
    value: 30,
    icon: <FiDownloadCloud />,
  },
  {
    label: "Total Uploads",
    percentage: -50,
    value: 4,
    icon: <AiOutlineCloudUpload />,
  },
  {
    label: "Total Saves",
    percentage: 15,
    value: 50,
    icon: <CiBookmark />,
  },
  {
    label: "Citations",
    percentage: 50,
    value: 6,
    icon: <IoBookOutline />,
  },
];
const Statitstics = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-8">
      {stats.map(({ label, percentage, value, icon }, index) => (
        <div className="rounded-[20px] p-4" key={index}>
          <p className="mb-[5px] font-medium">{label}</p>
          {percentage < 0 ? (
            <span className="flex sm:items-center gap-0.5">
              <IoTrendingDown size={12} className="text-red-500" />
              <small className="leading-[21px] text-red-500 font-normal">
                {percentage}% from last month{" "}
              </small>
            </span>
          ) : (
            <span className="flex sm:items-center gap-0.5">
              <IoTrendingUp size={12} className="text-green-500" />
              <small className="leading-[21px] text-green-500 font-normal">
                +{percentage}% from last month{" "}
              </small>
            </span>
          )}
          <div className="flex items-end justify-between">
            <h3 className="font-semibold text-2xl lg:text-4xl">{value}</h3>

            <span className="2xl:w-15 w-10 h-10 lg:w-12 lg:h-12 2xl:h-15 flex items-center justify-center border border-grey rounded-[10px]">
              {icon}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Statitstics;
