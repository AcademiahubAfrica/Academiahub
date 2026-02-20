'use client'
import React from 'react'
import { Avatar,AvatarFallback,AvatarImage } from '@/components/ui/avatar'
import { formatRelativeTime, getInitials, isUnread, truncateText } from '@/lib/messaging/utils'
import { ConversationListItem } from '@/app/_types/messaging'
import { usePresence } from '@/lib/messaging/hooks'
import { useState } from 'react'
import { FakeConversations } from './ConversationList'

interface ConversationItemProps {
  id: string,
  conversation: FakeConversations
}
const ConversationItem = ({id, conversation}:ConversationItemProps) => {
  const [isActive, setIsActive] = useState(true)
  const onlineUsers = usePresence();

if (onlineUsers.has(conversation?.otherParticipant.id || '')) {
  setIsActive(true)
}
 
  return (
    <div className='flex items-center p-5 bg-gray-100 rounded-lg'>
      {/* Avatar */}
      <div className='mr-2 relative'>
        <Avatar className='h-10 w-10'>
            <AvatarImage src={conversation.otherParticipant.image } />
            <AvatarFallback>{getInitials(conversation.otherParticipant.name )}</AvatarFallback>
          </Avatar>
          {
            isActive && <span className='absolute bg-green-500 w-3 h-3 bottom-0 right-0 rounded-full'></span>
          }
          
      </div>

      <div className='mr-7'>
        <h3 className='font-semibold text-base leading-5'>{conversation.otherParticipant.name}</h3>
        <div>
           <p className=' text-xs leading-[100%] max-md:hidden'>{truncateText(conversation.lastMessage.content, 23)}</p>
           <p className=' text-xs leading-[100%] md:hidden'>{truncateText(conversation.lastMessage.content, 30)}</p>
        </div>
       
      </div>
      {/* Timestamp */}
      <div className='flex flex-col gap-2 items-end'>
         <span className=' text-xs leading-3.5 text-muted-foreground'>{formatRelativeTime(conversation.createdAt)}</span>
         {/* I changed the type in isUnread to FakeConversatipn */}
         {
          isUnread(conversation, conversation.id) && <div className='bg-primary-500 w-2 h-2 rounded-full'></div>
         }
      </div>
     

    </div>
  )
}

export default ConversationItem