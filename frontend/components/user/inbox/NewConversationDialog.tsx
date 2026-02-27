"use client";

import { useState } from "react";
import { X } from "lucide-react";
import UserSearchInput from "@/components/user/inbox/UserSearchInput";
import { useCreateConversation } from "@/lib/messaging/hooks";
import type { UserSearchResult } from "@/app/_types/messaging";

interface NewConversationDialogProps {
  open: boolean;
  onClose: () => void;
  onConversationCreated?: (conversationId: string) => void;
}

export default function NewConversationDialog({
  open,
  onClose,
  onConversationCreated,
}: NewConversationDialogProps) {
  const { mutateAsync: create, isPending, error } = useCreateConversation();
  const [creating, setCreating] = useState(false);

  if (!open) return null;

  const handleSelect = async (user: UserSearchResult) => {
    if (creating) return;
    setCreating(true);
    try {
      const conv = await create(user.id);
      onConversationCreated?.(conv.id);
      onClose();
    } catch (e) {
      console.error("Failed to create conversation", e);
    } finally {
      setCreating(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 md:flex md:items-center md:justify-center"
        onClick={onClose}
      >
        {/* Panel — Sheet on mobile (slides from bottom), Dialog on desktop (centered) */}
        <div
          className="
            fixed bottom-0 left-0 right-0 z-50 
            bg-white rounded-t-2xl px-4 pt-5 pb-8 
            md:static md:rounded-2xl md:w-full md:max-w-md md:mx-auto md:shadow-2xl md:p-6
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Handle bar — mobile only */}
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5 md:hidden" />

          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-foreground">
              New Conversation
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          {/* Search */}
          <UserSearchInput onSelect={handleSelect} />

          {/* Loading overlay */}
          {(isPending || creating) && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="h-4 w-4 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
              Starting conversation…
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="mt-3 text-xs text-red-500 text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
