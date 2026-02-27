"use client";

import { useRef, useState, useEffect, useCallback } from "react";
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

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [unreadWhileScrolled, setUnreadWhileScrolled] = useState(0);

  // Flatten paginated history + real-time messages
  const history = data?.pages.flatMap((p) => p.messages) ?? [];
  const allMessages = [
    ...history,
    ...newMessages.map((m) => ({
      id: m.id,
      conversationId: m.conversationId,
      senderId: m.senderId,
      content: m.content,
      createdAt: m.createdAt,
    })),
  ];

  // Auto-scroll when at bottom + new message arrives
  useEffect(() => {
    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (newMessages.length > 0) {
      setUnreadWhileScrolled((c) => c + 1);
    }
  }, [newMessages.length, isAtBottom]);

  // Mark as read when at bottom and focused (STRIDE T8)
  useEffect(() => {
    if (!isAtBottom || allMessages.length === 0) return;
    const lastMsg = allMessages[allMessages.length - 1];
    markRead(conversationId, lastMsg.id);
  }, [isAtBottom, allMessages.length]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setUnreadWhileScrolled(0);
  }, []);

  const partner = conversation?.otherParticipant;

  return (
    <section className="flex flex-col h-full border border-grey rounded-tr-[15px]">
      <ChatHeader partner={partner} conversationId={conversationId} />

      <div className="relative flex-1 flex flex-col overflow-hidden">
        <MessageList
          messages={allMessages}
          onScrollStateChange={setIsAtBottom}
          onLoadMore={() => hasNextPage && fetchNextPage()}
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
