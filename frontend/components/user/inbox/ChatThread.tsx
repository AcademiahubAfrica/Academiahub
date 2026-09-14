"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import {
  useMessages,
  useNewMessages,
  useReadMark,
} from "@/lib/messaging/hooks";
import type { ConversationListItem } from "@/app/_types/messaging";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import ScrollToBottom from "./ScrollToBottom";

interface ChatThreadProps {
  conversationId: string;
  conversation: ConversationListItem | undefined;
}

export default function ChatThread({
  conversationId,
  conversation,
}: ChatThreadProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMessages(conversationId);
  const newMessages = useNewMessages(conversationId);
  const { markRead } = useReadMark();
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [unreadWhileScrolled, setUnreadWhileScrolled] = useState(0);

  // Flatten paginated history (API returns newest-first, so reverse to oldest-first)
  // then append real-time messages at the end.
  const allMessages = useMemo(() => {
    const history = (data?.pages.flatMap((p) => p.messages) ?? []).toReversed();
    const historyIds = new Set(history.map((m) => m.id));
    return [
      ...history,
      ...newMessages
        .filter((m) => !historyIds.has(m.id))
        .map((m) => ({
          id: m.id,
          conversationId: m.conversationId,
          senderId: m.senderId,
          content: m.content,
          createdAt: m.createdAt,
        })),
    ];
  }, [data?.pages, newMessages]);

  const lastMessageId = allMessages.length
    ? allMessages[allMessages.length - 1].id
    : null;

  // Track new-message arrivals during render (React's documented
  // "store info from previous renders" pattern) so the unread counter
  // updates without a cascading setState-in-effect.
  const [prevNewCount, setPrevNewCount] = useState(newMessages.length);
  if (prevNewCount !== newMessages.length) {
    const delta = newMessages.length - prevNewCount;
    setPrevNewCount(newMessages.length);
    if (delta > 0 && !isAtBottom) {
      setUnreadWhileScrolled((c) => c + delta);
    }
  }

  // Auto-scroll when at bottom + new message arrives
  useEffect(() => {
    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [newMessages.length, isAtBottom]);

  // Mark as read when at bottom — depend on last message id, not array length
  useEffect(() => {
    if (!isAtBottom || !lastMessageId) return;
    markRead(conversationId, lastMessageId);
  }, [isAtBottom, lastMessageId, conversationId, markRead]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setUnreadWhileScrolled(0);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  const partner = conversation?.otherParticipant;

  return (
    <section className="flex flex-col h-full border border-grey rounded-tr-[15px]">
      <ChatHeader partner={partner} />

      <div className="relative flex-1 flex flex-col overflow-hidden">
        <MessageList
          messages={allMessages}
          currentUserId={currentUserId}
          onScrollStateChange={setIsAtBottom}
          onLoadMore={handleLoadMore}
          isFetchingMore={isFetchingNextPage}
          messagesEndRef={messagesEndRef}
        />

        <ScrollToBottom
          isVisible={!isAtBottom}
          unreadCount={unreadWhileScrolled}
          onClick={scrollToBottom}
        />
      </div>

      <TypingIndicator
        conversationId={conversationId}
        partnerName={partner?.name ?? undefined}
      />
      <MessageInput conversationId={conversationId} />
    </section>
  );
}
