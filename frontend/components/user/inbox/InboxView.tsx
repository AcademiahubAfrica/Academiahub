"use client";
import React from "react";
import ConversationList from "./ConversationList";
import ChatThread from "./ChatThread";
import { useSearchParams } from "next/navigation";
import { useConversations } from "@/lib/messaging/hooks";
import ErrorState from "./ErrorState";
import ConversationListSkeleton from "./ConversationListSkeleton";
import ChatThreadSkeleton from "./ChatThreadSkeleton";
import EmptyConversation from "./EmptyConversation";
import EmptyChatThread from "./EmptyChatThread";


const InboxView = () => {
	const { data, isLoading, isError, error, refetch } = useConversations();
	const searchParams = useSearchParams();
	const conversationId = searchParams.get("c");

	

	const renderConversationList = () => {
		if (isError) return <ErrorState onRetry={refetch} error={error} />;
		if (isLoading) return <ConversationListSkeleton />;
		return <ConversationList conversations={data} />;
	};

	const renderChatThread = () => {
		if (isLoading) return <ChatThreadSkeleton />;
		if (!conversationId) return <EmptyChatThread />;
		return <ChatThread />;
	};

	if (!data || data?.length === 0) return <EmptyConversation />

	return (
		<>
			{/* Desktop screen */}
			<section className="hidden md:flex">
				<div className="w-87.5">{renderConversationList()}</div>
				<div className="flex-1">{renderChatThread()}</div>
			</section>

			{/* Mobile screen */}
			<section className="md:hidden h-full">
				{!conversationId ? renderConversationList() : renderChatThread()}
			</section>
		</>
	);
};

export default InboxView;
