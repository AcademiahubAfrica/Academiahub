import { Skeleton } from "@/components/ui/skeleton";

const PublicationPageSkeleton = () => {
  return (
    <section className="flex relative flex-col md:flex-row gap-2">
      {/* MAIN DETAILS */}
      <div className="lg:w-2/3 space-y-5.75">
        {/* ========================= */}
        {/* PublicationDetails Skeleton */}
        {/* ========================= */}
        <div className="bg-white border lg:px-4 lg:pb-8.75 pt-6.25 border-[#D9D9D9] rounded-[15px] p-3">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-2 items-center">
              <Skeleton className="size-10 lg:size-15 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-32 lg:h-5 lg:w-48" />
                <Skeleton className="h-3 w-24 lg:h-4 lg:w-40" />
              </div>
            </div>

            <Skeleton className="h-8 w-20 md:hidden" />
          </div>

          {/* Cover Image */}
          <Skeleton className="rounded-[12px] w-full h-[137px] md:h-[239px] mb-5" />

          {/* Title */}
          <Skeleton className="h-5 w-3/4 mb-4" />

          {/* Abstract */}
          <div className="space-y-2 mb-5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-between mb-6 px-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mb-5">
            <Skeleton className="h-10 w-1/2 rounded-md" />
            <Skeleton className="h-10 w-1/2 rounded-md" />
          </div>

          {/* Likes */}
          <Skeleton className="h-4 w-24" />
        </div>

        {/* ========================= */}
        {/* Comments Skeleton */}
        {/* ========================= */}
        <div className="bg-white border border-[#D9D9D9] rounded-[15px] py-3.5 px-2.75 md:px-4.5">
          <Skeleton className="h-4 w-32 mb-4" />

          {/* Comment Input */}
          <div className="flex items-center gap-3 mb-6">
            <Skeleton className="size-8 md:size-10 rounded-full" />
            <div className="flex-1 flex gap-2">
              <Skeleton className="h-10 flex-1 rounded-lg" />
              <Skeleton className="h-10 w-16 rounded-md" />
            </div>
          </div>

          {/* Comment List */}
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="size-8 md:size-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* ProfileCard Skeleton */}
      {/* ========================= */}
      <aside className="hidden md:block border md:w-1/3 bg-[#FAFAFA] self-start sticky top-24 text-center rounded-[12px] pt-7 px-4.5">
        {/* <Skeleton className="h-5 w-32 mx-auto mb-4" /> */}
        <h3 className="text-base lg:text-xl leading-6 font-medium mb-3">
          About Author
        </h3>
        <Skeleton className="size-22 rounded-full mx-auto mb-4" />

        <div className="space-y-2 mb-6">
          <Skeleton className="h-4 w-40 mx-auto" />
          <Skeleton className="h-3 w-32 mx-auto" />
        </div>

        <Skeleton className="h-3 w-3/4 mx-auto mb-6" />

        {/* Stats */}
        <div className="flex justify-between px-4 mb-6">
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-16" />
        </div>

        <div className="space-y-2 mb-6">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </aside>
    </section>
  );
};

export default PublicationPageSkeleton;
