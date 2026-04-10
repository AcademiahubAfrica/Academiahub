"use client";

import { useEffect, useCallback, useRef } from "react";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSocket } from "@/app/_contexts/SocketContext";
import type { NotificationNewPayload } from "@/app/_types/messaging";

// ─── Types ────────────────────────────────────────────────────────────

export interface NotificationItem {
  id: string;
  type: string;
  message: string;
  link: string | null;
  actorId: string | null;
  documentId: string | null;
  read: boolean;
  createdAt: string;
}

interface NotificationsPage {
  notifications: NotificationItem[];
  nextCursor: string | null;
}

// ─── Fetch Helpers ────────────────────────────────────────────────────

async function fetchNotifications(
  cursor?: string,
  limit = 20
): Promise<NotificationsPage> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.set("cursor", cursor);

  const res = await fetch(`/api/notifications?${params}`);
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
}

async function fetchUnreadCount(): Promise<number> {
  const res = await fetch("/api/notifications/unread-count");
  if (!res.ok) throw new Error("Failed to fetch unread count");
  const data = await res.json();
  return data.count;
}

// ─── useNotifications ─────────────────────────────────────────────────

export function useNotifications() {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const query = useInfiniteQuery<NotificationsPage>({
    queryKey: ["notifications"],
    queryFn: ({ pageParam }) =>
      fetchNotifications(pageParam as string | undefined),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 30_000,
  });

  // Prepend new notifications from Socket.IO
  useEffect(() => {
    if (!socket) return;

    const onNewNotification = (payload: NotificationNewPayload) => {
      const newItem: NotificationItem = {
        id: payload.id,
        type: payload.type,
        message: payload.message,
        link: payload.link,
        actorId: payload.actorId,
        documentId: null,
        read: false,
        createdAt: payload.createdAt,
      };

      queryClient.setQueryData<{
        pages: NotificationsPage[];
        pageParams: (string | undefined)[];
      }>(["notifications"], (old) => {
        if (!old) return old;
        const firstPage = old.pages[0];
        return {
          ...old,
          pages: [
            {
              ...firstPage,
              notifications: [newItem, ...firstPage.notifications],
            },
            ...old.pages.slice(1),
          ],
        };
      });
    };

    socket.on("notification:new", onNewNotification);
    return () => {
      socket.off("notification:new", onNewNotification);
    };
  }, [socket, queryClient]);

  return query;
}

// ─── useUnreadCount ───────────────────────────────────────────────────

export function useUnreadCount() {
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const visibleRef = useRef(true);

  const query = useQuery<number>({
    queryKey: ["notifications", "unread-count"],
    queryFn: fetchUnreadCount,
    refetchInterval: () => (visibleRef.current ? 60_000 : false),
    refetchOnWindowFocus: true,
    staleTime: 30_000,
  });

  // Pause polling when tab is hidden
  useEffect(() => {
    const onVisibilityChange = () => {
      visibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  // Optimistic increment on socket event
  useEffect(() => {
    if (!socket) return;

    const onNewNotification = () => {
      queryClient.setQueryData<number>(
        ["notifications", "unread-count"],
        (old) => (old ?? 0) + 1
      );
    };

    socket.on("notification:new", onNewNotification);
    return () => {
      socket.off("notification:new", onNewNotification);
    };
  }, [socket, queryClient]);

  return query;
}

// ─── useMarkNotificationRead ──────────────────────────────────────────

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  const markRead = useCallback(
    async (notificationId: string) => {
      // Optimistic update: mark as read in cache
      queryClient.setQueryData<{
        pages: NotificationsPage[];
        pageParams: (string | undefined)[];
      }>(["notifications"], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            notifications: page.notifications.map((n) =>
              n.id === notificationId ? { ...n, read: true } : n
            ),
          })),
        };
      });

      // Optimistic decrement unread count
      queryClient.setQueryData<number>(
        ["notifications", "unread-count"],
        (old) => Math.max(0, (old ?? 1) - 1)
      );

      // Fire the API call
      await fetch(`/api/notifications/${notificationId}/read`, {
        method: "PATCH",
      });
    },
    [queryClient]
  );

  return { markRead };
}

// ─── useMarkAllRead ───────────────────────────────────────────────────

export function useMarkAllRead() {
  const queryClient = useQueryClient();

  const markAllRead = useCallback(async () => {
    // Optimistic: mark all as read in cache
    queryClient.setQueryData<{
      pages: NotificationsPage[];
      pageParams: (string | undefined)[];
    }>(["notifications"], (old) => {
      if (!old) return old;
      return {
        ...old,
        pages: old.pages.map((page) => ({
          ...page,
          notifications: page.notifications.map((n) => ({ ...n, read: true })),
        })),
      };
    });

    // Optimistic: set count to 0
    queryClient.setQueryData<number>(
      ["notifications", "unread-count"],
      0
    );

    await fetch("/api/notifications/read-all", { method: "PATCH" });
  }, [queryClient]);

  return { markAllRead };
}
