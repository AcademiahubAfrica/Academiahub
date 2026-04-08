import { type ReactNode } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CiBookmark, CiSettings } from "react-icons/ci";
import { FiDownloadCloud } from "react-icons/fi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { MdOutlineExplore, MdOutlinePersonOutline } from "react-icons/md";
import { RiBarChart2Line } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";
import { BiSupport } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";

interface SideLink {
  icon: ReactNode;
  label: string;
  link: string;
}

interface AccountLink {
  icon: ReactNode;
  label: string;
  link?: string;
}

export const sideLinks: SideLink[] = [
  {
    icon: <MdOutlineExplore size={20} />,
    label: "Explore",
    link: "/dashboard",
  },
  {
    icon: <FiDownloadCloud size={20} />,
    label: "Downloads",
    link: "/downloads",
  },
  {
    icon: <CiBookmark size={20} />,
    label: "Saved",
    link: "/saved",
  },
  {
    icon: <RiBarChart2Line size={20} />,
    label: "Analytics",
    link: "/analytics",
  },
  {
    icon: <HiOutlineEnvelope size={20} />,
    label: "inbox",
    link: "/inbox",
  },
  {
    icon: <AiOutlineCloudUpload size={20} />,
    label: "upload",
    link: "/uploads",
  },
];

export const accountLinks: AccountLink[] = [
  {
    icon: <MdOutlinePersonOutline size={20} />,
    label: "Profile",
    link: "/profile",
  },
  {
    icon: <IoMdNotificationsOutline size={20} />,
    label: "Notification",
    link: "/notifications",
  },
  {
    icon: <CiSettings size={20} />,
    label: "Settings",
    link: "/settings",
  },
  {
    icon: <BiSupport size={20} />,
    label: "Help & Support",
    link: "/support",
  },
  {
    icon: <GoSignOut size={20} />,
    label: "Sign Out",
  },
];

// central metadata for (user) folder
export const userPagesMetadata: Record<
  string,
  { title: string; description: string }
> = {
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
