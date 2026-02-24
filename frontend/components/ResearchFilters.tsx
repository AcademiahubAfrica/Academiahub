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
  { label: "all", variant: "ghost2" as const },
  { label: "engineering", variant: "outline2" as const },
  { label: "medicine", variant: "outline2" as const },
  { label: "agriculture", variant: "outline2" as const },
  { label: "art", variant: "outline2" as const },
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
      <h2 className="md:hidden mt-2 mb-1.5 text-lg capitalize text-primary font-medium leading-[24px] tracking-normal">
        {pageName}
      </h2>

      <div className="flex lg:bg-white rounded-b-2xl   items-center lg:min-h-16 lg:px-9 min-h-7 justify-between ">
        {/* CATEGORY FILTER */}
        <div className="lg:flex items-center flex-wrap gap-7.75 hidden">
          {filterButtons.map(({ label, variant }) => (
            <Button
              key={label}
              variant={variant}
              onClick={() => updateParam("category", label)}
              className={`${filterBy === label ? "bg-primary text-white" : "border-grey"} `}
            >
              {label.charAt(0).toUpperCase() + label.slice(1)}
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
              {filterButtons.map(({ label }) => (
                <SelectItem
                  key={label}
                  value={label}
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
