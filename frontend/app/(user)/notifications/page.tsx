import { notifications } from "@/app/data/notificationMockData";
import {
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineSetting,
  AiOutlineUpload,
  AiOutlineUser,
} from "react-icons/ai";
import Image from "next/image";
import EmptySection from "@/components/user/shared/EmptySection";

function DisplayNotificationIcon(typeOfNotification: string) {
  switch (typeOfNotification) {
    case "comment":
      return (
        <Image
          fill
          alt="comment icon"
          src={"/assets/images/user/notification/message.svg"}
        />
      );
      break;

    case "upload":
      return (
        <Image
          fill
          alt="comment icon"
          src={"/assets/images/user/notification/upload.svg"}
        />
      );
      break;
    case "reaction":
      return (
        <Image
          fill
          alt="comment icon"
          src={"/assets/images/user/notification/love.svg"}
        />
      );
      break;
    case "settings":
      return (
        <Image
          fill
          alt="comment icon"
          src={"/assets/images/user/notification/settings.svg"}
        />
      );
      break;
    case "message":
      return (
        <Image
          fill
          alt="comment icon"
          src={"/assets/images/user/notification/person.svg"}
        />
      );
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
                <div className="relative h-5  w-5  shrink-0">
                  {DisplayNotificationIcon(n.type)}
                </div>
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
          </div>
        ))}
      </div>
    </main>
  );
};

export default page;
