"use client";
import React, { useEffect } from "react";
import ConversationList from "./ConversationList";
import ChatThread from "./ChatThread";
import { useSearchParams, useRouter } from "next/navigation";
import { useConversations } from "@/lib/messaging/hooks";
import ErrorState from "./ErrorState";
import EmptyConversation from "./EmptyConversation";
import EmptyChatThread from "./EmptyChatThread";

const InboxView = () => {
  const { data, isLoading, isError, error, refetch } = useConversations();
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("c");
  const router = useRouter();

  const selectedConversation = data?.find(
    (conversation) => conversation.id === conversationId
  );

  useEffect(() => {
    if (isError && error?.message?.includes("403")) {
      router.replace("/");
    }
  }, [isError, error, router]);

  if (isLoading) {
    return null;
  }
  if (isError) {
    return <ErrorState error={error} onRetry={refetch} />;
  }
  if (!data || data?.length === 0) return <EmptyConversation />;

  return (
    <>
      {/* Desktop screen */}
      <section className="hidden md:flex h-full overflow-hidden">
        <div className="w-87.5 h-full overflow-hidden">
          <ConversationList conversations={data} />
        </div>
        <div className="flex-1 h-full min-h-0">
          {!conversationId ? (
            <EmptyChatThread />
          ) : (
            <ChatThread
              conversationId={conversationId}
              conversation={selectedConversation}
            />
          )}
        </div>
      </section>

      {/* Mobile screen */}
      <section className="md:hidden h-full overflow-hidden">
        {!conversationId ? (
          <ConversationList conversations={data} />
        ) : (
          <ChatThread
            conversationId={conversationId}
            conversation={selectedConversation}
          />
        )}
      </section>
    </>
  );
};

export default InboxView;
