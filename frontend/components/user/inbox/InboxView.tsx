"use client";
import { useEffect } from "react";
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

  useEffect(() => {
    if (isError && error?.message?.includes("403")) {
      router.replace("/");
    }
  }, [isError, error, router]);

  const renderChatThread = () => {
    if (!conversationId) return <EmptyChatThread />;

    const conversation = data?.find((c) => c.id === conversationId);
    if (!conversation) return <EmptyChatThread />;

    return (
      <ChatThread conversationId={conversationId} conversation={conversation} />
    );
  };

  if (isLoading) {
    return <p className="font-semibold text-gray-500 text-center">Loading..</p>;
  }

  if (isError) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (!data || data?.length === 0) return <EmptyConversation />;

  return (
    <>
      {/* Desktop screen */}
      <section className="hidden md:flex">
        <div className="w-87.5">
          <ConversationList conversations={data} />
        </div>
        <div className="flex-1">{renderChatThread()}</div>
      </section>

      {/* Mobile screen */}
      <section className="md:hidden h-full">
        {!conversationId ? (
          <ConversationList conversations={data} />
        ) : (
          renderChatThread()
        )}
      </section>
    </>
  );
};

export default InboxView;
