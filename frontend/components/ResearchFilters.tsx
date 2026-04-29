"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const filterButtons = [
  { label: "All", value: "all", variant: "ghost2" as const },
  { label: "Research", value: "RESEARCH", variant: "outline2" as const },
  { label: "Seminar", value: "SEMINAR", variant: "outline2" as const },
  { label: "Final Year Project", value: "PROJECT", variant: "outline2" as const },
  { label: "Analysis", value: "ANALYSIS", variant: "outline2" as const },
];

const sortOptions = [
  { label: "Most recent", value: "recent" },
  { label: "Oldest", value: "oldest" },
  { label: "Most popular", value: "popular" },
];

const ResearchFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const pageName = pathname.split("/").pop();
  const filterBy = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sort") || "recent";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className=" mb-2 ">
      {/* page title */}
      <h2 className="md:hidden mt-2 mb-1.5 text-lg capitalize text-primary font-medium leading-6 tracking-normal">
        {pageName}
      </h2>

      <div className="flex lg:bg-white rounded-b-2xl   items-center lg:min-h-16 lg:px-9 min-h-7 justify-between ">
        {/* CATEGORY FILTER */}
        <div className="lg:flex items-center flex-wrap gap-7.75 hidden">
          {filterButtons.map(({ label, value, variant }) => (
            <Button
              key={value}
              variant={variant}
              onClick={() => updateParam("category", value)}
              className={`${filterBy === value ? "bg-primary text-white" : "border-grey "} `}
            >
              {label}
            </Button>
          ))}
        </div>
        {/* mobile */}
        <div className="lg:hidden">
          <Select
            value={filterBy}
            onValueChange={(value) => updateParam("category", value)}
          >
            <SelectTrigger className="w-36.25 max-sm:h-7! max-md:bg-primary-light capitalize cursor-pointer border border-input">
              <SelectValue placeholder="All" defaultValue={filterBy} />
            </SelectTrigger>

            <SelectContent>
              {filterButtons.map(({ label, value }) => (
                <SelectItem
                  key={value}
                  value={value}
                  className="cursor-pointer capitalize"
                >
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* SORT BY (Most recent, etc.) */}
        <div>
          <Select value={sortBy} onValueChange={(v) => updateParam("sort", v)}>
            <SelectTrigger className="w-36.25 max-sm:h-7! max-md:bg-primary-light cursor-pointer border border-input">
              <SelectValue placeholder="Most recent" defaultValue={sortBy} />
            </SelectTrigger>

            <SelectContent>
              {sortOptions.map(({ label, value }) => (
                <SelectItem
                  key={value}
                  value={value}
                  className="cursor-pointer capitalize"
                >
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ResearchFilters;
