"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePresence } from "@/lib/messaging/hooks";
import { getInitials } from "@/lib/messaging/utils";
import type { UserSummary } from "@/app/_types/messaging";

interface ChatHeaderProps {
  partner: UserSummary;
  conversationId: string;
}
export default function ChatHeader({
  partner,
  conversationId,
}: ChatHeaderProps) {
  const router = useRouter();
  const onlineUsers = usePresence();
  const isOnline = onlineUsers.has(partner?.id);

  return (
    <div className="px-2 md:px-9 border-b w-full flex-wrap border-grey py-2 md:py-10 flex items-center justify-between">
      <div className="flex items-center gap-1">
        <ChevronLeft
          className="md:hidden cursor-pointer mr-1"
          onClick={() => router.push("/inbox")}
        />
        <Avatar className="h-10 w-10 md:w-15 md:h-15">
          <AvatarImage
            src={partner?.image || ""}
            alt={`${partner?.name}'s avatar`}
          />
          <AvatarFallback>{getInitials(partner?.name || "")}</AvatarFallback>
        </Avatar>
        <div className="md:space-y-3 space-y-1">
          <h2 className="text-[16px] md:text-xl leading-6">{partner?.name}</h2>
          <p className="body-text max-sm:text-[10px] -tracking-normal leading-4.5 text-grey">
            {isOnline ? "Active now" : "Offline"}
          </p>
        </div>
      </div>

      <Button
        className="rounded-[12px] bg-linear-to-r text-sm from-primary-500 to-[#080F24]"
        onClick={() => router.push(`/profile/${partner?.id}`)}
      >
        View Profile
      </Button>
    </div>
  );
}
