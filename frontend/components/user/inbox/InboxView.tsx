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
import { FakeConversations } from "./ConversationList";
import { ConversationListItem } from "@/app/_types/messaging";

const InboxView = () => {
	const { data, isLoading, isError, error, refetch } = useConversations();
	const searchParams = useSearchParams();
	const conversationId = searchParams.get("c");
const fakeConversation: FakeConversations[] = [
		{
			id: '1234567',
			lastMessage:{
				id: '12345',
				senderId: '2345',
				content:  "I appreciate you coming to my house, Thank you very much"
			},
			createdAt: '2026-02-18T13:45:00.000Z',
		
			lastReadMessageId: '12345',
			otherParticipant: {
				id: '12345',
         image: '/LandingPage/users/user-1.png',
				 name: 'Chiamaka Nwosu',
			},
		},

		{
			id: '1243567',
			lastMessage:{
				id: '12355',
				senderId: '2745',
				content:  "I appreciate you leaving my house, Thank you very muc"
			},
			createdAt: '2026-01-18T13:45:00.000Z',
			
			lastReadMessageId: '12375',

			otherParticipant: {
				 id: '1234',
         image: '/LandingPage/users/user-2.png',
				 name: 'Godwin Onyeka',
			},
		}
	]  

	

	const renderConversationList = () => {
		if (isError) return <ErrorState onRetry={refetch} error={error} />;
		if (isLoading) return <ConversationListSkeleton />;
		if (fakeConversation.length === 0) return <EmptyConversation />;
		return <ConversationList fakeConversations={fakeConversation} />;
	};

	const renderChatThread = () => {
		if (isLoading) return <ChatThreadSkeleton />;
		if (!conversationId) return <EmptyChatThread />;
		return <ChatThread />;
	};

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
