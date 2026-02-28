"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCreateConversation } from "@/lib/messaging/hooks";

interface MessageAuthorButtonProps {
  authorId: string;
  className?: string;
  label?: string;
}

export default function MessageAuthorButton({
  authorId,
  className,
  label = "Message",
}: MessageAuthorButtonProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const createConversation = useCreateConversation();

  // Hide while session is loading, when not logged in, or when viewing own profile
  if (status === "loading" || !session?.user?.id || authorId === session.user.id) {
    return null;
  }

  const handleClick = async () => {
    try {
      const conversation = await createConversation.mutateAsync(authorId);
      router.push(`/inbox?c=${conversation.id}`);
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
  };

  return (
    <Button
      className={className}
      onClick={handleClick}
      disabled={createConversation.isPending}
    >
      {createConversation.isPending ? (
        <>
          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
          {label}
        </>
      ) : (
        label
      )}
    </Button>
  );
}
