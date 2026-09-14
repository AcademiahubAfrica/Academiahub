import { userPagesMetadata } from "@/app/data/Exports";
import InboxView from "@/components/user/inbox/InboxView";

export const metadata = userPagesMetadata.inbox;
const Page = () => {
  return (
    // data-private keeps session replay from recording anything inside:
    // private messages between members are not ours to send to a third party.
    <div data-private className="flex flex-col h-full overflow-hidden">
      <InboxView />
    </div>
  );
};

export default Page;
