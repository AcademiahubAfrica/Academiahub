import { Skeleton } from "@/components/ui/skeleton"

const ChatThreadSkeleton = () => {
  return (
     <div className="p-6 space-y-6 mt-10 lg:mt-5">
      <Skeleton className="h-6 w-40 bg-gray-400" />
      <Skeleton className="h-20 w-3/4 rounded-xl bg-gray-400" />
      <Skeleton className="h-20 w-2/3 rounded-xl bg-gray-400" />
      <Skeleton className="h-20 w-1/2 rounded-xl bg-gray-400" />
    </div>
  )
}

export default ChatThreadSkeleton