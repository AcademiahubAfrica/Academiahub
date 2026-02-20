"use client";
import React from "react";
import ConversationList from "./ConversationList";
import ChatThread from "./ChatThread";
import { useSearchParams } from "next/navigation";
import { useConversations } from "@/lib/messaging/hooks";
import ErrorState from "./ErrorState";
import ConversationListSkeleton from "./ConversationListSkeleton";
import ChatThreadSkeleton from "./ChatThreadSkeleton";

const InboxView = () => {
	const { data, isLoading, isError, error, refetch } = useConversations();
	const searchParams = useSearchParams();
	const conversationId = searchParams.get("c");

	const renderConversationList = () => {
		if (isError) return <ErrorState onRetry={refetch} error={error} />;
		if (isLoading) return <ConversationListSkeleton />;
		if (!data || data.length === 0)
			return (
				<div className="flex justify-center items-center py-20 flex-col text-center">
					<h4 className="font-semibold text-lg leading-5 mb-2.5">
						No messages yet
					</h4>
					<p className="text-sm leading-4.5 text-gray-400">
						Start a conversation with an author to learn about their works
					</p>
				</div>
			);
		return <ConversationList conversations={data} />;
	};

	const renderChatThread = () => {
		
		if (isLoading) return <ChatThreadSkeleton />;
    if (!conversationId)
			return (
				<div className="flex items-center justify-center h-full text-muted-foreground">
					Select a conversation to start messaging
				</div>
			);
		return <ChatThread />;
	};

	return (
		<>
			<section className="hidden md:flex">
				<div className="w-87.5">{renderConversationList()}</div>
				<div className="flex-1">{renderChatThread()}</div>
			</section>

			<section className="md:hidden h-full">
				{!conversationId ? (
					<div className="mt-10">{renderConversationList()}</div>
				) : (
					<ChatThread />
				)}
			</section>
		</>
	);
};

export default InboxView;
