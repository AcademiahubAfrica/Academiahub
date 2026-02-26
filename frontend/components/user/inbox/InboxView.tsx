"use client";
import React from "react";
import ConversationList from "./ConversationList";
import ChatThread from "./ChatThread";
import { useSearchParams } from "next/navigation";
import { useConversations } from "@/lib/messaging/hooks";
import ErrorState from "./ErrorState";
import EmptyConversation from "./EmptyConversation";
import EmptyChatThread from "./EmptyChatThread";

const InboxView = () => {
  const { data, isLoading, isError, error, refetch } = useConversations();
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("c");


  if (isLoading) {
    return <p className="font-semibold text-gray-500 text-center"> Loading..</p>
  }
  if (isError) {
    return <ErrorState error={error} onRetry={refetch} />
  }
  if (!data || data?.length === 0) return <EmptyConversation />;

  return (
    <>
      {/* Desktop screen */}
      <section className="hidden md:flex">
       <div className="w-87.5"><ConversationList conversations={data} /></div>
+             <div className="flex-1">
+               {!conversationId ? <EmptyChatThread /> : <ChatThread />}
+             </div>
      </section>

      {/* Mobile screen */}
      <section className="md:hidden h-full">
       {!conversationId
               ? <ConversationList conversations={data} />
               : <ChatThread />}
      </section>
    </>
  );
};

export default InboxView;
