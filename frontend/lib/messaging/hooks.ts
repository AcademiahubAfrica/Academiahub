"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useSocket } from "@/app/_contexts/SocketContext";
import {
  fetchConversations,
  createConversation,
  fetchMessages,
  searchUsers,
} from "@/lib/messaging/api";
import type {
  ConversationListItem,
  MessagePage,
  MessageNewPayload,
  TypingEventPayload,
  PresencePayload,
  UserSearchResult,
  Conversation,
} from "@/app/_types/messaging";

// ─── useConversations ──────────────────────────────────────────────────

export function useConversations() {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const query = useQuery<ConversationListItem[]>({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  });

  // Auto-invalidate when a new message arrives
  useEffect(() => {
    if (!socket) return;

    const onNewMessage = () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    };

    socket.on("message:new", onNewMessage);
    return () => {
      socket.off("message:new", onNewMessage);
    };
  }, [socket, queryClient]);

  return query;
}

// ─── useMessages ───────────────────────────────────────────────────────

export function useMessages(conversationId: string | null) {
  return useInfiniteQuery<MessagePage>({
    queryKey: ["messages", conversationId],
    queryFn: ({ pageParam }) =>
      fetchMessages(conversationId!, pageParam as string | undefined),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !!conversationId,
  });
}

// ─── useUserSearch ─────────────────────────────────────────────────────

export function useUserSearch(query: string) {
  return useQuery<UserSearchResult[]>({
    queryKey: ["userSearch", query],
    queryFn: () => searchUsers(query),
    enabled: query.length >= 3,
  });
}

// ─── useCreateConversation ─────────────────────────────────────────────

export function useCreateConversation() {
  const queryClient = useQueryClient();

  return useMutation<Conversation, Error, string>({
    mutationFn: (recipientId) => createConversation(recipientId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}

// ─── useSendMessage ────────────────────────────────────────────────────

export function useSendMessage() {
  const { socket } = useSocket();
  const lastSentRef = useRef(0);

  const send = useCallback(
    (conversationId: string, content: string) => {
      if (!socket) return;

      // 300ms debounce (STRIDE #4)
      const now = Date.now();
      if (now - lastSentRef.current < 300) return;
      lastSentRef.current = now;

      socket.emit("message:send", { conversationId, content });
    },
    [socket],
  );

  return { send };
}

// ─── useTyping ─────────────────────────────────────────────────────────

export function useTyping(conversationId: string | null) {
  const { socket } = useSocket();
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTypingRef = useRef(false);

  const startTyping = useCallback(() => {
    if (!socket || !conversationId || isTypingRef.current) return;

    isTypingRef.current = true;
    socket.emit("typing:start", { conversationId });

    // Auto-stop after 3 seconds
    stopTimerRef.current = setTimeout(() => {
      isTypingRef.current = false;
      socket.emit("typing:stop", { conversationId });
    }, 3000);
  }, [socket, conversationId]);

  const stopTyping = useCallback(() => {
    if (!socket || !conversationId || !isTypingRef.current) return;

    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    isTypingRef.current = false;
    socket.emit("typing:stop", { conversationId });
  }, [socket, conversationId]);

  // Clean up on conversation change or unmount
  useEffect(() => {
    return () => {
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
      isTypingRef.current = false;
    };
  }, [conversationId]);

  return { startTyping, stopTyping };
}

// ─── useRemoteTyping ───────────────────────────────────────────────────

export function useRemoteTyping(conversationId: string | null) {
  const { socket } = useSocket();
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!socket || !conversationId) return;

    const onTyping = (payload: TypingEventPayload) => {
      if (payload.conversationId !== conversationId) return;

      setIsTyping(payload.isTyping);

      // Auto-clear after 4 seconds if no stop event
      if (timerRef.current) clearTimeout(timerRef.current);
      if (payload.isTyping) {
        timerRef.current = setTimeout(() => setIsTyping(false), 4000);
      }
    };

    socket.on("typing", onTyping);
    return () => {
      socket.off("typing", onTyping);
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsTyping(false);
    };
  }, [socket, conversationId]);

  return isTyping;
}

// ─── usePresence ───────────────────────────────────────────────────────

export function usePresence() {
  const { socket } = useSocket();
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!socket) return;

    const onPresence = (payload: PresencePayload) => {
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        if (payload.status === "online") {
          next.add(payload.userId);
        } else {
          next.delete(payload.userId);
        }
        return next;
      });
    };

    socket.on("presence", onPresence);
    return () => {
      socket.off("presence", onPresence);
    };
  }, [socket]);

  return onlineUsers;
}

// ─── useNewMessages ────────────────────────────────────────────────────

export function useNewMessages(conversationId: string | null) {
  const { socket } = useSocket();
  const [messages, setMessages] = useState<MessageNewPayload[]>([]);
  const [prevConversationId, setPrevConversationId] = useState(conversationId);

  // STRIDE #7: Clear on conversation change (adjusting state during render)
  if (prevConversationId !== conversationId) {
    setPrevConversationId(conversationId);
    setMessages([]);
  }

  useEffect(() => {
    if (!socket || !conversationId) return;

    const onNewMessage = (payload: MessageNewPayload) => {
      if (payload.conversationId !== conversationId) return;
      setMessages((prev) =>
        prev.some((m) => m.id === payload.id) ? prev : [...prev, payload]
      );
    };

    socket.on("message:new", onNewMessage);
    return () => {
      socket.off("message:new", onNewMessage);
    };
  }, [socket, conversationId]);

  return messages;
}

// ─── useReadMark ───────────────────────────────────────────────────────

export function useReadMark() {
  const { socket } = useSocket();

  const markRead = useCallback(
    (conversationId: string, lastMsgId: string) => {
      // STRIDE #5: Only emit when tab is focused
      if (!socket || !document.hasFocus()) return;
      socket.emit("read:mark", { conversationId, lastMsgId });
    },
    [socket],
  );

  return { markRead };
}