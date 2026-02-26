import { Skeleton } from "@/components/ui/skeleton";

const ResearchPageSkeleton = () => {
  return (
    <div>
      {/* ===================== */}
      {/* ResearchFilters Skeleton */}
      {/* ===================== */}
      <div className="mb-2">
        {/* Mobile title */}
        <Skeleton className="h-6 w-32 md:hidden mt-2 mb-2" />

        <div className="flex lg:bg-white rounded-b-2xl items-center lg:min-h-16 lg:px-9 min-h-7 justify-between">
          {/* Desktop category buttons */}
          <div className="hidden lg:flex gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-24 rounded-md" />
            ))}
          </div>

          {/* Mobile select */}
          <Skeleton className="w-36 h-8 lg:hidden rounded-md" />

          {/* Sort select */}
          <Skeleton className="w-36 h-8 rounded-md" />
        </div>
      </div>

      {/* ===================== */}
      {/* Section Header */}
      {/* ===================== */}
      <div className="lg:px-6.25 mt-4">
        <Skeleton className="h-8 w-52 mb-5 rounded-2xl" />

        {/* ===================== */}
        {/* Card Grid */}
        {/* ===================== */}
        <section className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <article
              key={i}
              className="relative w-full bg-white px-1 py-1 lg:py-2.75 lg:px-3 border rounded-[15px] border-[#D9D9D9]"
            >
              {/* Upload icon circle */}
              <Skeleton className="absolute right-3 top-3 md:right-5 md:top-5 rounded-full md:w-11 md:h-11 w-6 h-6" />

              {/* Image */}
              <Skeleton className="rounded-t-[15px] h-[118.48px] sm:h-61.5 w-full" />

              {/* Content */}
              <div className="mt-4 space-y-4">
                {/* Title */}
                <Skeleton className="h-4 w-3/4" />

                {/* Author row */}
                <div className="flex items-center gap-2">
                  <Skeleton className="w-5 h-5 md:w-10 md:h-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-6">
                    <Skeleton className="h-4 w-10" />
                    <Skeleton className="h-4 w-10" />
                    <Skeleton className="h-4 w-10" />
                  </div>
                  <Skeleton className="h-5 w-5 rounded-md" />
                </div>

                {/* Button */}
                <Skeleton className="h-8 md:h-9 lg:h-11 w-full rounded-md" />
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ResearchPageSkeleton;
