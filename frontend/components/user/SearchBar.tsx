"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlValue = searchParams.get("search") ?? "";
  const [value, setValue] = useState(urlValue);
  const [, startTransition] = useTransition();

  const commit = (next: string) => {
    if (next === (searchParams.get("search") ?? "")) return;
    const params = new URLSearchParams(searchParams.toString());
    if (next) params.set("search", next);
    else params.delete("search");
    const qs = params.toString();
    startTransition(() => {
      router.replace(qs ? `?${qs}` : "?");
    });
  };

  useEffect(() => {
    const id = setTimeout(() => commit(value), 400);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className=" flex items-center gap-5 w-full max-md:justify-between ">
      <div className="sm:w-4/5 max-sm:w-full border h-10 max-sm:h-7 flex items-center p-3 focus-within:border-2 focus-within:border-gray-600 rounded-lg max-sm:rounded-sm">
        <FaSearch className="text-gray-400" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit(value);
          }}
          placeholder="Search for Research papers, Seminars"
          className="border-none w-full max-sm:text-xs  text-sm focus-visible:ring-0"
        />
      </div>

      <Button
        onClick={() => commit(value)}
        className="h-10 max-sm:h-7 max-sm:text-xs max-sm:rounded-sm w-[20%]"
      >
        Search
      </Button>
    </div>
  );
}
