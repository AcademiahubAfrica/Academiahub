import { userPagesMetadata } from "@/app/data/Exports";
import InboxView from "@/components/user/inbox/InboxView";
import PageName from "@/components/user/shared/PageName";

export const metadata = userPagesMetadata.inbox;
const Page = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <PageName />
      <InboxView />
    </div>
  );
};

export default Page;
