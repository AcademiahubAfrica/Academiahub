"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchProps {
  text?: string;
}

const Search = ({ text = "saved" }: SearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(() => searchParams.get("search") ?? "");
  const [, startTransition] = useTransition();

  const commit = (next: string) => {
    if (next === (searchParams.get("search") ?? "")) return;
    const params = new URLSearchParams(searchParams.toString());
    if (next) {
      params.set("search", next);
    } else {
      params.delete("search");
    }
    const qs = params.toString();
    startTransition(() => {
      router.replace(qs ? `?${qs}` : "?");
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => commit(value), 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="h-40.75 hidden  w-full bg-linear-to-r from-[#E9EBF3]! via-[#FFFBE6]  md:flex items-center justify-center to-[#E9EBF3]">
      <div className="basis-[80%] gap-4 items-center  flex">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit(value);
          }}
          className="rounded-xl h-14 2xl:h-16.5"
          placeholder={`Search for ${text} publications`}
        />
        <Button
          onClick={() => commit(value)}
          className="md:h-14 basis-2/10 h-11"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Search;
