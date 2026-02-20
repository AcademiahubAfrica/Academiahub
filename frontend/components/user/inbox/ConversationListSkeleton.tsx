import { Skeleton } from "@/components/ui/skeleton"

const ConversationListSkeleton = () => {
  return (
    <div className="p-5 space-y-4 mt-10 lg:mt-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full bg-gray-400" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-1/4 bg-gray-400" />
            <Skeleton className="h-4 w-3/4 bg-gray-400" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ConversationListSkeleton