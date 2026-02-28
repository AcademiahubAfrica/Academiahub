"use client";

import parseMessageContent from "@/lib/messaging/urlSanitizer";
import { formatMessageTime } from "@/lib/utils";
import type { Message } from "@/app/_types/messaging";
import { useSession } from "next-auth/react";

export default function MessageBubble({ message }: { message: Message }) {
  const { data: session } = useSession();
  const isOwn = message.senderId === session?.user?.id;
  const content = parseMessageContent(message.content);

  return (
    <div
      className={`rounded-[15px] ${isOwn ? "bg-primary ml-auto text-white" : "bg-primary-light-hover mr-auto text-black"} max-w-[70%] lg:max-w-[48%] p-4 mb-3.5`}
    >
      <h4 className="font-medium text-[10px] md:text-[16px] md:leading-5 leading-[130%] tracking-[0%] mb-2">
        {content.map((segment, index) =>
          segment.type === "link" ? (
            <a
              key={index}
              href={segment.value}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline transition-colors duration-150 underline-offset-4 break-all ${isOwn ? "hover:text-purple-200" : "hover:text-primary"}`}
            >
              {segment.value}
            </a>
          ) : (
            <span key={index}>{segment.value}</span>
          ),
        )}
      </h4>
      <p className="body-text font-normal max-sm:text-[8px]! leading-[130%] md:leading-4.5 tracking-[0%]">
        {formatMessageTime(message.createdAt)}
      </p>
    </div>
  );
}
