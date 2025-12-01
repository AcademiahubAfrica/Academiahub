import { notifications } from "@/app/data/notificationMockData";
import {
	AiOutlineHeart,
	AiOutlineMessage,
	AiOutlineSetting,
	AiOutlineUpload,
  AiOutlineUser,
} from "react-icons/ai";
import Image from "next/image";
import EmptySection from "@/components/EmptySection";

const page = () => {
	function DisplayNotificationIcon(typeOfNotification: string) {
		switch (typeOfNotification) {
			case "comment":
				return <AiOutlineMessage className="text-4xl text-green-400" />;
				break;

			case "upload":
				return <AiOutlineUpload className="text-4xl text-blue-700" />;
				break;
			case "reaction":
				return <AiOutlineHeart className="text-4xl text-red-700" />;
				break;
			case "settings":
				return <AiOutlineSetting className="text-4xl text-black" />;
				break;
			case "message":
				return <AiOutlineUser className="text-4xl text-yellow-300" />;
				break;
			default:
				break;
		}
	}
	return (
		<main className="px-2 lg:px-12 lg:py-4 mb-4 py-2 ">
			<header className="w-full bg-white py-7 px-2 mb-4 rounded-lg">
				<h1 className="font-medium text-2xl">Notifications</h1>
			</header>

      {
        notifications.length === 0 && <EmptySection
					title="No notification yet"
					text="When someone interacts with your content, you'll see it here"
				/>
      }

			<div>
				{notifications.map((n) => (
					<div
						key={n.id}
						className="rounded-xl border border-gray-300 p-3 mb-4 pb-6"
					>
						<div className="flex items-center justify-between">
							<div className="flex gap-4 mt-8 items-center max-w-[80%]">
								<div>{DisplayNotificationIcon(n.type)}</div>
								<div>
									<p className="font-semibold text-base mb-3">
										{n.notification}
									</p>
									<p className="text-sm text-gray-400 ">{n.time}</p>
								</div>
							</div>
							<span className="h-2 w-2 bg-primary-500 rounded-full"></span>
						</div>

						{n.post && (
							<div className="mt-8 md:ml-20 flex items-center gap-3">
								<Image
									className="w-12 h-12 rounded-lg"
									src={n.post.image}
									alt="The Image of a Post"
									width={200}
									height={200}
								/>
								<div>
									<p className="text-base mb-2">{n.post.title}</p>
									<p className="text-gray-600 font-semibold">{n.post.type}</p>
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</main>
	);
};

export default page;
