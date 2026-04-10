import Image from "next/image";

const ICON_MAP: Record<string, { src: string; alt: string }> = {
  comment: {
    src: "/assets/images/user/notification/message.svg",
    alt: "Comment notification",
  },
  like: {
    src: "/assets/images/user/notification/love.svg",
    alt: "Like notification",
  },
  message: {
    src: "/assets/images/user/notification/person.svg",
    alt: "Message notification",
  },
};

export default function NotificationIcon({ type }: { type: string }) {
  const icon = ICON_MAP[type];
  if (!icon) return null;

  return <Image fill alt={icon.alt} src={icon.src} />;
}
