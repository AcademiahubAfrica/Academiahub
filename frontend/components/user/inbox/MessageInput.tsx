"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Paperclip, Send } from "lucide-react";
import { useSendMessage, useTyping } from "@/lib/messaging/hooks";

interface MessageInputProps {
  conversationId: string;
  onSend?: (text: string) => void;
}

const MAX_LENGTH = 5000;
const COUNTER_THRESHOLD = 4500;
const SEND_COOLDOWN_MS = 300;

export default function MessageInput({
  conversationId,
  onSend,
}: MessageInputProps) {
  const [text, setText] = useState("");
  const [cooldown, setCooldown] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { send } = useSendMessage();
  const { startTyping, stopTyping } = useTyping(conversationId);

  // Auto-resize textarea
  const resizeTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }, []);

  useEffect(() => {
    resizeTextarea();
  }, [text, resizeTextarea]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length > MAX_LENGTH) return;
    setText(val);

    // Typing events
    startTyping();
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => stopTyping(), 3000);
  };

  const handleSend = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed || cooldown) return;

    setText("");
    stopTyping();
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);

    // STRIDE T14: 300ms cooldown
    setCooldown(true);
    cooldownTimerRef.current = setTimeout(() => setCooldown(false), SEND_COOLDOWN_MS);

    send(conversationId, trimmed);
    onSend?.(trimmed);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.focus();
    }
  }, [text, cooldown, conversationId, send, onSend, stopTyping]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const charsLeft = MAX_LENGTH - text.length;
  const showCounter = text.length >= COUNTER_THRESHOLD;
  const canSend = text.trim().length > 0 && !cooldown;

  return (
    <div className="px-4 pb-4 pt-2 bg-white border-t border-gray-100">
      {showCounter && (
        <div
          className={`text-xs mb-1 text-right ${
            charsLeft < 100 ? "text-red-500" : "text-muted-foreground"
          }`}
        >
          {charsLeft} characters remaining
        </div>
      )}

      <div className="flex items-end gap-2">
        {/* Input container */}
        <div className="flex-1 flex items-end gap-2 border border-gray-200 rounded-full px-4 py-2 bg-gray-50 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition-all">
          {/* Paperclip — non-functional placeholder per spec */}
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600 transition-colors shrink-0 mb-0.5"
            aria-label="Attach file"
            disabled
          >
            <Paperclip size={18} />
          </button>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 bg-transparent resize-none outline-none text-sm text-foreground placeholder:text-gray-400 max-h-30 leading-5 py-0.5"
            aria-label="Message"
          />
        </div>

        {/* Send button — STRIDE T14: disabled during cooldown */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-150
            ${
              canSend
                ? "bg-primary-500 text-white hover:bg-primary-600 active:scale-95"
                : "bg-primary-500 text-white opacity-50 pointer-events-none"
            }`}
          aria-label="Send message"
        >
          <Send size={15} className="-translate-x-px" />
        </button>
      </div>
    </div>
  );
}
