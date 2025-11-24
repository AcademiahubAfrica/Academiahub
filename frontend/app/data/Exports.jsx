import { AiOutlineCloudUpload } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { FiDownloadCloud } from "react-icons/fi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { MdOutlineExplore } from "react-icons/md";
import { RiBarChart2Line } from "react-icons/ri";

export const sideLinks = [
  {
    icon: <MdOutlineExplore />,
    label: "Explore",
    link: "/dashboard",
  },
  {
    icon: <FiDownloadCloud />,
    label: "Downloads",
    link: "/downloads",
  },
  {
    icon: <CiBookmark />,
    label: "Saved",
    link: "/saved",
  },
  {
    icon: <RiBarChart2Line />,
    label: "Analytics",
    link: "/analytics",
  },
  {
    icon: <HiOutlineEnvelope />,
    label: "inbox",
    link: "/inbox",
  },
  {
    icon: <AiOutlineCloudUpload />,
    label: "uploads",
    link: "/uploads",
  },
];
