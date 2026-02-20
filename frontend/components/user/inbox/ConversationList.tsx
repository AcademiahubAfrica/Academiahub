"use client";
import {  ConversationListItem } from "@/app/_types/messaging";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import ConversationItem from "./ConversationItem";


interface ConversationListProps {
  fakeConversations: FakeConversations[]
}

export interface FakeConversations{
		id: string,
		lastMessage: {
			id:  string,
			senderId: string
			content: string
		},
		createdAt: string,
		lastReadMessageId: string,
		otherParticipant: {
			id: string,
			image: string,
			name: string
		}

	}

const ConversationList = ({fakeConversations}: ConversationListProps) => {

	
	
  
	
	return (
		<div className="mt-10 lg:mt-5 p-5 max-md:max-w-97.5 md:max-w-87.5">
			<header className="">
				<h2 className="font-semibold text-lg leading-5 mb-7">Inbox</h2>
				<div className="relative mb-3">
					<FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 " />
					<Input className=" max-w-100 text-gray-400 border-2 rounded-xl pr-15" />
				</div>

				{/* Filter buttons  */}
				<div className="md:bg-gray-100 flex justify-between px-6 py-2 rounded-lg">
					<button className="bg-inherit rounded-full px-9 py-1 text-sm">
						All
					</button>
					<button className="bg-inherit rounded-2xl px-9 py-1 text-sm">
						Unread
					</button>
				</div>
			</header>

			<section className="mb-6 flex flex-col gap-4">
				{fakeConversations.map((conversation: FakeConversations) => (
			    <ConversationItem key={conversation.id} id={conversation.id} conversation={conversation} />
				))}
			</section>
		</div>
	);
};

export default ConversationList;