"use client";

import { useRef, useEffect, useCallback } from "react";
import { getMessageSeparator } from "@/lib/utils";
import type { Message } from "@/app/_types/messaging";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
  onScrollStateChange: (isAtBottom: boolean) => void;
  onLoadMore: () => void;
  isFetchingMore: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export default function MessageList({
  messages,
  onScrollStateChange,
  onLoadMore,
  isFetchingMore,
  messagesEndRef,
}: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Track scroll position → report isAtBottom
  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    onScrollStateChange(atBottom);
  }, [onScrollStateChange]);

  // IntersectionObserver for infinite scroll (sentinel at top)
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onLoadMore();
      },
      { threshold: 0.1 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [onLoadMore]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto bg-gray-50 p-4"
    >
      {/* Sentinel for loading older messages */}
      <div ref={sentinelRef} className="h-1" />
      {isFetchingMore && (
        <div className="flex justify-center py-2">
          <span className="h-4 w-4 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
        </div>
      )}

      {messages.map((message, index) => {
        const dateLabel = getMessageSeparator(message.createdAt);
        const prevDateLabel =
          index > 0 ? getMessageSeparator(messages[index - 1].createdAt) : null;
        const showSeparator = dateLabel !== prevDateLabel;

        return (
          <div key={message.id}>
            {showSeparator && (
              <div className="flex justify-center my-6">
                <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full uppercase font-semibold">
                  {dateLabel}
                </span>
              </div>
            )}
            <MessageBubble message={message} />
          </div>
        );
      })}

      <div ref={messagesEndRef} />
    </div>
  );
}
