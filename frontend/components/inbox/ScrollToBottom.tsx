"use client";

import { ChevronDown } from "lucide-react";

interface ScrollToBottomProps {
  isVisible: boolean;
  unreadCount?: number;
  onClick: () => void;
}

/**
 * Floating scroll-to-bottom button.
 *
 * Usage in MessageList / ChatThread:
 *   - Track whether user is at bottom with an IntersectionObserver or scroll listener.
 *   - Pass `isVisible={!isAtBottom}`.
 *   - Increment unreadCount when `useNewMessages` delivers messages while isVisible is true.
 *   - Reset unreadCount to 0 when user scrolls back to bottom.
 *   - `onClick` should call `messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })`.
 *
 * ChatThread must ensure read:mark is only emitted when isVisible is false
 * (i.e., user is at bottom). This component's `isVisible` prop conveys that scroll state.
 */
export default function ScrollToBottom({
  isVisible,
  unreadCount = 0,
  onClick,
}: ScrollToBottomProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10">
      <button
        type="button"
        onClick={onClick}
        className="relative h-9 w-9 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:shadow-xl active:scale-95 transition-all duration-150"
        aria-label="Scroll to latest messages"
      >
        <ChevronDown size={18} />

        {/* Unread badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 h-5 min-w-5 px-1 rounded-full bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center leading-none">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
