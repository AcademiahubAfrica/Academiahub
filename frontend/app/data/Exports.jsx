import { AiOutlineCloudUpload } from "react-icons/ai";
import { CiBookmark, CiSettings } from "react-icons/ci";
import { FiDownloadCloud } from "react-icons/fi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { MdOutlineExplore, MdOutlinePersonOutline } from "react-icons/md";
import { RiBarChart2Line } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";
import { BiSupport } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
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

export const accountLinks = [
  {
    icon: <MdOutlinePersonOutline />,
    label: "Profile",
    link: "/profile",
  },
  {
    icon: <IoMdNotificationsOutline />,
    label: "Notification",
    link: "/notifications",
  },
  {
    icon: <CiSettings />,
    label: "Settings",
    link: "/settings",
  },
  {
    icon: <BiSupport />,
    label: "Help & Support",
    link: "/support",
  },
  {
    icon: <GoSignOut />,
    label: "Sign Out",
  },
];

// central metadata for (user) folder
export const userPagesMetadata = {
  dashboard: {
    title: "Dashboard – User",
    description: "Overview of your activity.",
  },
  analytics: {
    title: "Analytics – User",
    description: "Performance metrics and insights.",
  },
  downloads: {
    title: "Downloads – User",
    description: "Your downloaded research and files.",
  },
  uploads: {
    title: "Uploads – User",
    description: "Upload research and academic materials.",
  },
  saved: {
    title: "Saved Items – User",
    description: "Your saved documents and materials.",
  },
  inbox: {
    title: "Inbox – User",
    description: "Messages and notifications.",
  },
  profile: {
    title: "Your Profile",
    description: "Manage your personal information.",
  },
  settings: {
    title: "Settings",
    description: "Customize your account preferences.",
  },
};
