import { userPagesMetadata } from "@/app/data/Exports";
import EmptySection from "@/components/user/notifications/EmptySection";

export const metadata = userPagesMetadata.inbox;
const Page = () => {
	return (
		<div className="mt-10">
			<EmptySection
				title="No messages yet"
				text="Start a conversation with an author to learn more about their work!"
			/>
		</div>
	);
};

export default Page;
