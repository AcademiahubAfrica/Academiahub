import { ConversationListItem } from "@/app/_types/messaging";
import { FakeConversations } from "@/components/user/inbox/ConversationList";

export const getInitials = (name:string) => {
 return name?.slice(0, 2).toUpperCase()
}

export const formatRelativeTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const truncateText = (text: string, maxLen = 23) => {
  if (!text) return "";
  return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
}

export const isUnread = (conversation: FakeConversations | undefined, currentUserId: string): boolean => {
   const lastMessage = conversation?.lastMessage;

   if(!lastMessage) return false;

   if(lastMessage.senderId === currentUserId) return false

   if (conversation.lastReadMessageId !== lastMessage.id) return true;
  return false
}