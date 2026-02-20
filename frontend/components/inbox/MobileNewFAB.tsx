"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import NewConversationDialog from "@/components/inbox/NewConversationDialog";

interface MobileNewFABProps {
  onConversationCreated?: (conversationId: string) => void;
}

/**
 * Mobile-only — hidden on md+ screens.
 * Opens NewConversationDialog on tap.
 * Matches Figma: fixed bottom-right, h-12 w-12 rounded-full, bg-primary-500.
 */
export default function MobileNewFAB({
  onConversationCreated,
}: MobileNewFABProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      {/* FAB Button */}
      <button
        type="button"
        onClick={() => setDialogOpen(true)}
        className="md:hidden fixed bottom-6 right-4 z-30 h-12 w-12 rounded-full bg-primary-500 text-white shadow-lg flex items-center justify-center hover:bg-primary-600 active:scale-95 transition-all duration-150"
        aria-label="Start new conversation"
      >
        <Plus size={22} strokeWidth={2.5} />
      </button>

      <NewConversationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConversationCreated={(id) => {
          setDialogOpen(false);
          onConversationCreated?.(id);
        }}
      />
    </>
  );
}
