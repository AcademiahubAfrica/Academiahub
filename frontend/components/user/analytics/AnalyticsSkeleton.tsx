import { Skeleton } from "@/components/ui/skeleton";

const AnalyticsSkeleton = () => {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5 xl:gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-[20px] bg-white min-h-30 md:min-h-[170.5px] p-4"
          >
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>
      <div className="flex flex-col mt-2 md:mt-5 lg:flex-row lg:gap-2 lg:justify-between">
        <section className="md:px-4 py-2 md:py-4 bg-white rounded-[20px] lg:basis-[58%] w-[97%] min-h-70">
          <Skeleton className="h-5 w-32 mb-4" />
          <Skeleton className="h-55 w-full" />
        </section>
        <div className="flex-1 bg-white rounded-[20px] p-4 min-h-70">
          <Skeleton className="h-5 w-32 mb-4" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="py-3 space-y-2">
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AnalyticsSkeleton;
