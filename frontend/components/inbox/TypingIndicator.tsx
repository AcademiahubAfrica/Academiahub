"use client";

interface TypingIndicatorProps {
  conversationId: string;
  partnerName?: string;
}

function useRemoteTyping(conversationId: string): { isTyping: boolean } {
  // In real use: listens to socket typing events for this conversation
  return { isTyping: false };
}

export default function TypingIndicator({
  conversationId,
  partnerName,
}: TypingIndicatorProps) {
  const { isTyping } = useRemoteTyping(conversationId);

  if (!isTyping) return null;

  const label = partnerName ? `${partnerName} is typing` : "Typing";

  return (
    <div className="flex items-center gap-2 px-4 py-2" aria-live="polite" aria-label={label}>
      {/* Bubble */}
      <div className="bg-gray-100 rounded-2xl px-4 py-2 flex items-center gap-1.5">
        <span className="text-xs text-muted-foreground mr-1">{label}</span>
        {/* Animated dots */}
        <span className="flex gap-0.5 items-end h-3">
          <span
            className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: "0ms", animationDuration: "1s" }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: "160ms", animationDuration: "1s" }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: "320ms", animationDuration: "1s" }}
          />
        </span>
      </div>
    </div>
  );
}