"use client";
import { ConversationListItem } from "@/app/_types/messaging";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import ConversationItem from "./ConversationItem";
import { useState } from "react";
import { isUnread } from "@/lib/messaging/utils";

interface ConversationListProps {
	conversations?: ConversationListItem[];
}



const ConversationList = ({ conversations }: ConversationListProps) => {
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState<"all" | "unread">("all");

	const filteredConversations = conversations?.filter((conversation) => {
    
    if (filter === "unread") {
				// Change conversation.id to currentUserId
      return isUnread(conversation, conversation.id);
    }
    return true;
  })
  .filter((conversation) => {
    
    if (!search.trim()) return true;

    return conversation?.otherParticipant.name || ''
      .toLowerCase()
      .includes(search.toLowerCase());
  });

	return (
		<div className="mt-10 lg:mt-5 p-5 max-md:max-w-97.5 md:max-w-87.5">
			<header className="">
				<h2 className="font-semibold text-lg leading-5 mb-7">Inbox</h2>
				<div className="relative mb-3">
					<FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 " />
					<Input value={search} onChange={(e)=> setSearch(e.target.value)} className=" max-w-100 text-gray-400 border-2 rounded-xl pl-8" />
				</div>

				{/* Filter buttons  */}
				<div className="md:bg-gray-100 flex justify-between px-6 py-3 rounded-lg mb-5">
					<button
						onClick={() => setFilter("all")}
						className={` ${filter === "all" ? "bg-white shadow-[0_5px_3px] shadow-gray-500" : "bg-inherit"} transition-all duration-500 rounded-full w-22.25 py-1 text-sm`}
					>
						All
					</button>
					<button
						onClick={() => setFilter("unread")}
						className={` ${filter === "unread" ? "bg-white shadow-[0_5px_3px] shadow-gray-500" : "bg-inherit"} transition-all duration-500 rounded-full w-22.25 py-1 text-sm`}
					>
						Unread
					</button>
				</div>
			</header>

			<section className="mb-6 flex flex-col gap-4">
				{filteredConversations?.map((conversation) => (
						<ConversationItem
							key={conversation.id}
							id={conversation.id}
							conversation={conversation}
						/>
					))}
			</section>
		</div>
	);
};

export default ConversationList;
