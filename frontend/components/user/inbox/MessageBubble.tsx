import { formatMessageTime } from "@/lib/utils";

function MessageBubble({ message }: { message: any }) {
  // i'm using any type at the moment but will change to appropriate type in day 2
  return (
    <div
      className={`rounded-[15px] ${message.ownMessage ? "bg-primary ml-auto text-white" : "bg-primary-light-hover mr-auto text-black"} max-w-[70%] lg:max-w-[48%] p-2 mb-3.5`}
    >
      <h4 className="font-medium text-[10px] md:text-[16px] md:leading-5 leading-[130%] tracking-[0%] mb-2">
        {message.message}
      </h4>
      <p className="body-text font-normal max-sm:text-[8px]! leading-[130%] md:leading-4.5 tracking-[0%]">
        {formatMessageTime(message.date)}
      </p>
    </div>
  );
}

export default MessageBubble;
