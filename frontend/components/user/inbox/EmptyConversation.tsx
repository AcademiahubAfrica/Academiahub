import React from "react";

const EmptyConversation = () => {
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
};

export default EmptyConversation;
