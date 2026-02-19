"use client"
import React from "react";
import ConversationList from "./ConversationList";
import ChatThread from "./ChatThread";
import { useSearchParams } from "next/navigation";
// import { useConversations } from "@/lib/messaging/hooks";

const InboxView = () => {
  // const {data} = useConversations()
	const searchParams = useSearchParams();
	const conversationId = searchParams.get("c");

 
	return (
		<>
			<section className="hidden md:flex">
				<div className="w-87.5">
					<ConversationList />
				</div>
				<div className="flex-1">
          {
            conversationId ? (
              	<ChatThread />
            ) :
             <div className="flex items-center justify-center h-full text-muted-foreground">
        Select a conversation to start messaging
      </div>
          }
				
				</div>
			</section>

      <section className="md:hidden h-full">
         {
          !conversationId ? (
            <ConversationList />
          ) : (
            <ChatThread />
          )
         }
      </section>
		</>
	);
};

export default InboxView;
