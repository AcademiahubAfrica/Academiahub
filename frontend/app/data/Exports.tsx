import { type ReactNode } from "react";
import {
  Bell,
  Bookmark,
  ChartNoAxesColumn,
  CloudDownload,
  CloudUpload,
  Compass,
  FileText,
  Headset,
  LogOut,
  Mail,
  Settings,
  User,
} from "lucide-react";

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
    icon: <Compass size={20} strokeWidth={1.5} />,
    label: "Explore",
    link: "/dashboard",
  },
  {
    icon: <CloudDownload size={20} strokeWidth={1.5} />,
    label: "Downloads",
    link: "/downloads",
  },
  {
    icon: <Bookmark size={20} strokeWidth={1.5} />,
    label: "Saved",
    link: "/saved",
  },
  {
    icon: <ChartNoAxesColumn size={20} strokeWidth={1.5} />,
    label: "Analytics",
    link: "/analytics",
  },
  {
    icon: <Mail size={20} strokeWidth={1.5} />,
    label: "inbox",
    link: "/inbox",
  },
  {
    icon: <CloudUpload size={20} strokeWidth={1.5} />,
    label: "upload",
    link: "/uploads",
  },
];

export const accountLinks: AccountLink[] = [
  {
    icon: <User size={20} strokeWidth={1.5} />,
    label: "Profile",
    link: "/profile",
  },
  {
    icon: <Bell size={20} strokeWidth={1.5} />,
    label: "Notification",
    link: "/notifications",
  },
  {
    icon: <Settings size={20} strokeWidth={1.5} />,
    label: "Settings",
    link: "/settings",
  },
  {
    icon: <Headset size={20} strokeWidth={1.5} />,
    label: "Help & Support",
    link: "/support",
  },
  {
    icon: <LogOut size={20} strokeWidth={1.5} />,
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
    icon: FileText,
    title: "Publications",
    description: "Uploading, downloading, managing files",
    href: "/support/publications",
  },
  {
    icon: User,
    title: "Account & Profile",
    description: "Login, password reset, profile setup",
    href: "/support/account",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "App updates, messages, alerts",
    href: "/support/notifications",
  },
  {
    icon: Settings,
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
