import parseMessageContent from "@/lib/messaging/urlSanitizer";
import { formatMessageTime } from "@/lib/utils";
function MessageBubble({ message }: { message: any }) {
  // i'm using any type at the moment but will change to appropriate type in day 2

  const content = parseMessageContent(message.message);
  return (
    <div
      className={`rounded-[15px] ${message.ownMessage ? "bg-primary ml-auto text-white" : "bg-primary-light-hover mr-auto text-black"} max-w-[70%] lg:max-w-[48%] p-4 mb-3.5`}
    >
      <h4 className="font-medium text-[10px] md:text-[16px] md:leading-5 leading-[130%] tracking-[0%] mb-2">
        {content.map((segment, index) =>
          segment.type === "link" ? (
            <a
              key={index}
              href={segment.value}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline  transition-colors duration-150 underline-offset-4 break-all ${message.ownMessage ? "hover:text-purple-200" : "hover:text-primary"}`}
            >
              {segment.value}
            </a>
          ) : (
            <span key={index}>{segment.value}</span>
          ),
        )}
      </h4>
      <p className="body-text font-normal max-sm:text-[8px]! leading-[130%] md:leading-4.5 tracking-[0%]">
        {formatMessageTime(message.date)}
      </p>
    </div>
  );
}

export default MessageBubble;
