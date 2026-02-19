import { userPagesMetadata } from "@/app/data/Exports";
import ChatThread from "@/components/user/inbox/ChatThread";
import EmptySection from "@/components/user/notifications/EmptySection";

export const metadata = userPagesMetadata.inbox;
const Page = () => {
  return (
    <div className="">
      {/* <EmptySection
				title="No messages yet"
				text="Start a conversation with an author to learn more about their work!"
			/> */}

      {/* temporarily displaying this here, stephanie can move it when done with master layout */}
      <ChatThread />
    </div>
  );
};

export default Page;
