import { notifications } from "@/app/data/notificationMockData";
import {
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineSetting,
  AiOutlineUpload,
  AiOutlineUser,
} from "react-icons/ai";
import Image from "next/image";
import EmptySection from "@/components/user/notifications/EmptySection";

function DisplayNotificationIcon(typeOfNotification: string) {
  switch (typeOfNotification) {
    case "comment":
      return (
        <AiOutlineMessage className="text-lg md:text-4xl text-green-400" />
      );
      break;

    case "upload":
      return <AiOutlineUpload className="text-lg md:text-4xl text-blue-700" />;
      break;
    case "reaction":
      return <AiOutlineHeart className="text-lg md:text-4xl text-red-700" />;
      break;
    case "settings":
      return <AiOutlineSetting className="text-lg md:text-4xl text-black" />;
      break;
    case "message":
      return <AiOutlineUser className="text-lg md:text-4xl text-yellow-300" />;
      break;
    default:
      break;
  }
}
const page = () => {
  return (
    <main className=" lg:px-6 m-2 lg:m-6 rounded lg:rounded-2xl bg-white lg:py-4 lg:mb-0 py-2 ">
      <header className="w-full md:bg-white py-2 md:py-7 px-2 mb-4 rounded-lg">
        <h1 className="font-medium max-sm:text-primary text-2xl">
          Notifications
        </h1>
      </header>

      {notifications.length === 0 && (
        <EmptySection
          title="No notification yet"
          text="When someone interacts with your content, you'll see it here"
        />
      )}

      <div className="bg-white">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="rounded-xl border-[0.3px] border-grey p-3 mb-4 pb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-4 mt-8 font-normal items-center max-w-[80%]">
                <div>{DisplayNotificationIcon(n.type)}</div>
                <div>
                  <p className="line-clamp-1 text-xs leading-3.5 md:leading-4.5 md:text-base mb-1 md:mb-3">
                    {n.notification}
                  </p>
                  <p className="text-[10px] leading-[130%] md:leading-4.5 md:text-sm text-grey ">
                    {n.time}
                  </p>
                </div>
              </div>
              <span className="h-2 w-2 bg-primary-500 rounded-full"></span>
            </div>

            {n.post && (
              <div className="mt-8 md:ml-20 flex items-center gap-3">
                <div className="relative md:w-15 md:h-15 w-10 h-10">
                  <Image
                    className=" rounded-lg"
                    src={n.post.image}
                    alt="The Image of a Post"
                    fill
                  />
                </div>
                <div className="text-xs leading-3.5 font-medium md:text-base">
                  <p className=" mb-2">{n.post.title}</p>
                  <p className="">{n.post.type}</p>
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
