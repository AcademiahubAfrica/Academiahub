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
  { label: "all", variant: "ghost2" },
  { label: "engineering", variant: "outline2" },
  { label: "medicine", variant: "outline2" },
  { label: "agriculture", variant: "outline2" },
  { label: "art", variant: "outline2" },
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

  const filterBy = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sort") || "recent";

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center my-2 min-h-16 justify-between ">
      {/* CATEGORY FILTER */}
      <div className="lg:flex items-center flex-wrap gap-[31px] hidden">
        {filterButtons.map(({ label, variant }) => (
          <Button
            key={label}
            variant={variant}
            onClick={() => updateParam("category", label)}
            className={`${filterBy === label ? "bg-primary text-white" : ""}`}
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
          <SelectTrigger className="w-[145px] cursor-pointer border border-input">
            <SelectValue placeholder="All" defaultValue={filterBy} />
          </SelectTrigger>

          <SelectContent>
            {filterButtons.map(({ label }) => (
              <SelectItem key={label} value={label} className="cursor-pointer">
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* SORT BY (Most recent, etc.) */}
      <div>
        <Select value={sortBy} onValueChange={(v) => updateParam("sort", v)}>
          <SelectTrigger className="w-[145px] cursor-pointer border border-input">
            <SelectValue placeholder="Most recent" defaultValue={sortBy} />
          </SelectTrigger>

          <SelectContent>
            {sortOptions.map(({ label, value }) => (
              <SelectItem key={value} value={value} className="cursor-pointer">
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ResearchFilters;
