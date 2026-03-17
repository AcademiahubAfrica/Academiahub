"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PublicationCard from "../dashboard/PublicationCard";

const filterOptions = [
  {
    value: "publications",
  },
  {
    value: "likes",
  },
];
const PublicationsAndLikes = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const filter = searchParams.get("show") || "publications";

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

      {filter === "publications" ? <PublicationCard /> : <p className="text-center text-gray-500 py-8">No likes yet</p>}
    </div>
  );
};

export default PublicationsAndLikes;
