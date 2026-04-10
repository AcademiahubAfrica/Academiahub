"use client";

import { useEffect, useRef, useCallback } from "react";
import EmptySection from "@/components/user/shared/EmptySection";
import NotificationItem from "@/components/user/notifications/NotificationItem";
import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllRead,
} from "@/lib/notifications/hooks";
import { formatTimeAgo } from "@/lib/notifications/formatTime";

export default function NotificationsPage() {
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useNotifications();
  const { markRead } = useMarkNotificationRead();
  const { markAllRead } = useMarkAllRead();
  const sentinelRef = useRef<HTMLDivElement>(null);

  const notifications = data?.pages.flatMap((p) => p.notifications) ?? [];
  const hasUnread = notifications.some((n) => !n.read);

  // Infinite scroll via IntersectionObserver on a sentinel element
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <main className=" lg:px-6 m-2 lg:m-6 rounded lg:rounded-2xl bg-white lg:py-4 lg:mb-0 py-2 ">
      <header className="w-full md:bg-white py-2 md:py-7 px-2 mb-4 rounded-lg flex items-center justify-between">
        <h1 className="font-medium max-sm:text-primary text-2xl">
          Notifications
        </h1>
        {hasUnread && (
          <button
            onClick={markAllRead}
            className="text-sm text-primary-500 hover:underline cursor-pointer"
          >
            Mark all as read
          </button>
        )}
      </header>

      {!isLoading && notifications.length === 0 && (
        <EmptySection
          title="No notification yet"
          text="When someone interacts with your content, you'll see it here"
        />
      )}

      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
        </div>
      )}

      <div className="bg-white">
        {notifications.map((n) => (
          <NotificationItem
            key={n.id}
            id={n.id}
            type={n.type.toLowerCase()}
            message={n.message}
            time={formatTimeAgo(n.createdAt)}
            link={n.link}
            isUnread={!n.read}
            onMarkRead={markRead}
          />
        ))}

        {/* Sentinel for infinite scroll */}
        <div ref={sentinelRef} className="h-1" />

        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
          </div>
        )}
      </div>
    </main>
  );
}
