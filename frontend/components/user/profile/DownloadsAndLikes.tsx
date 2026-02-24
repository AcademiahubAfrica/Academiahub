"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DownloadCard from "../dashboard/DownloadCard";

const filterOptions = [
  {
    value: "downloads",
  },
  {
    value: "likes",
  },
];
const DownloadsAndLikes = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const filter = searchParams.get("show") || "downloads";

  function updateParams(key: string, value: string): void {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="mt-2 ">
      <div className="flex items-center gap-2 md:mx-4 mb-4  ">
        {filterOptions.map(({ value }, index) => (
          <button
            className={` ${
              filter === value
                ? "text-primary border-b border-primary"
                : "text-black"
            }    rounded-none p-2 capitalize`}
            onClick={() => updateParams("show", value)}
            key={index}
          >
            {value}
          </button>
        ))}
      </div>

      {filter === "downloads" ? <DownloadCard /> : ""}
    </div>
  );
};

export default DownloadsAndLikes;
