"use client";

import { useRouter } from "next/navigation";
import NotificationIcon from "./NotificationIcon";

interface NotificationItemProps {
  id: string;
  type: string;
  message: string;
  time: string;
  link: string | null;
  isUnread: boolean;
  onMarkRead: (id: string) => void;
}

export default function NotificationItem({
  id,
  type,
  message,
  time,
  link,
  isUnread,
  onMarkRead,
}: NotificationItemProps) {
  const router = useRouter();

  function handleClick() {
    if (isUnread) {
      onMarkRead(id);
    }
    if (link) {
      router.push(link);
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`rounded-xl border-[0.3px] border-grey p-3 mb-4 pb-6 ${link ? "cursor-pointer" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-4 mt-8 font-normal items-center max-w-[80%]">
          <div className="relative h-5 w-5 shrink-0">
            <NotificationIcon type={type} />
          </div>
          <div>
            <p className="line-clamp-1 text-xs leading-3.5 md:leading-4.5 md:text-base mb-1 md:mb-3">
              {message}
            </p>
            <p className="text-[10px] leading-[130%] md:leading-4.5 md:text-sm text-grey">
              {time}
            </p>
          </div>
        </div>
        {isUnread && (
          <span className="h-2 w-2 bg-primary-500 rounded-full"></span>
        )}
      </div>
    </div>
  );
}
