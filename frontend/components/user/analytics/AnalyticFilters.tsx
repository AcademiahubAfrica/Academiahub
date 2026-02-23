"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
  { label: "Yearly", value: "yearly" },
  { label: "Monthly", value: "monthly" },
  { label: "Weekly", value: "weekly" },
  { label: "Daily", value: "daily" },
];

const AnalyticFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const filterBy = searchParams.get("time") || "yearly";
  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  }
  return (
    <Select
      value={filterBy}
      onValueChange={(value) => updateParam("time", value)}
    >
      <SelectTrigger className="w-36.25 max-sm:h-7! capitalize cursor-pointer border border-input">
        <SelectValue placeholder="Yearly" defaultValue={filterBy} />
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
  );
};

export default AnalyticFilters;
