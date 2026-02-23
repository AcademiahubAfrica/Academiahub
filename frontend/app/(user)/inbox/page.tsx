import { userPagesMetadata } from "@/app/data/Exports";
// import ChatThread from "@/components/user/inbox/ChatThread";
import InboxView from "@/components/user/inbox/InboxView";
import PageName from "@/components/user/shared/PageName";
// import EmptySection from "@/components/user/notifications/EmptySection";

export const metadata = userPagesMetadata.inbox;
const Page = () => {
  return (
    <div className="">
      <PageName />
      {/* <EmptySection
				title="No messages yet"
				text="Start a conversation with an author to learn more about their work!"
			/> */}

      {/* temporarily displaying this here, stephanie can move it when done with master layout */}
      <InboxView />
    </div>
  );
};

export default Page;
