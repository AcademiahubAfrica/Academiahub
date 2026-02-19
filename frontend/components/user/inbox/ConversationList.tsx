"use client";
import { Input } from "@/components/ui/input";
import { useConversations } from "@/lib/messaging/hooks";
// import { error } from "console";
// import Error from "next/error";
import { FaSearch } from "react-icons/fa";

const ConversationList = () => {
	const { data, isLoading,isError  } = useConversations();

  // I'll fix and refine both the loading and error states soon.
  if (isLoading) {
    return(
      <div>Loading....</div>
    )
  }

  if (isError) {
    return (
      <div>Something went wrong <br /> retry</div>
    )
  }
  
	
	return (
		<div className="mt-10 lg:mt-5 p-5">
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

			<section className="mb-6">
				{data?.map((conversation) => (
					<div key={conversation.id}>{conversation.id}</div>
				))}
			</section>
		</div>
	);
};

export default ConversationList;