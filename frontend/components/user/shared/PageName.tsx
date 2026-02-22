"use client";
import { usePathname } from "next/navigation";
const PageName = () => {
  const pathname = usePathname();
  const pageName = pathname.split("/").pop();
  return (
    <h2 className="md:hidden mb-1.5 text-lg capitalize text-primary font-medium leading-[24px] tracking-normal">
      {pageName}
    </h2>
  );
};

export default PageName;
