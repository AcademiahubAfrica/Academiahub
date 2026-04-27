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

import { SlNote } from "react-icons/sl";
import { MdPersonOutline } from "react-icons/md";

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

// for support layout

export const supportHelpData = [
  {
    icon: SlNote,
    title: "Publications",
    description: "Uploading, downloading, managing files",
    href: "/support/publications",
  },
  {
    icon: MdPersonOutline,
    title: "Account & Profile",
    description: "Login, password reset, profile setup",
    href: "/support/account",
  },
  {
    icon: IoMdNotificationsOutline,
    title: "Notifications",
    description: "App updates, messages, alerts",
    href: "/support/notifications",
  },
  {
    icon: CiSettings,
    title: "Settings & Privacy",
    description: "Preferences, visibility, permissions",
    href: "/support/settings",
  },
];

export const publicationLinks = [
  {
    label: "Upload a publication",
    href: "/uploads",
  },
  {
    label: "Go to downloads",
    href: "/downloads",
  },
  {
    label: "Go to saves",
    href: "/saved",
  },
];

export const AccountProfileLinks = [
  {
    label: "Change your password",
    href: "/settings#changePassword",
  },
  {
    label: "Edit Profile",
    href: "/profile/edit",
  },
  {
    label: "Change profile picture",
    href: "/profile/edit#profilePicture",
  },
];

export const notificationsLinks = [
  {
    label: "Go to notifications",
    href: "/notifications",
  },
  {
    label: "Update notification settings",
    href: "/settings#notifications",
  },
];

export const settingsLinks = [
  {
    label: "Go to settings",
    href: "/settings",
  },
];
