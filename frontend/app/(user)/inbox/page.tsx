import { userPagesMetadata } from "@/app/data/Exports";
import InboxView from "@/components/user/inbox/InboxView";

export const metadata = userPagesMetadata.inbox;
const Page = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <InboxView />
    </div>
  );
};

export default Page;
