"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ReactNode } from "react";
import { useSidebar } from "./SidebarContext";

interface SideLinkProps {
  icon: ReactNode;
  label: string;
  link: string;
}

const SideLink = ({ icon, label, link }: SideLinkProps) => {
  const { setOpenMobileSidebar } = useSidebar();
  const pathName = usePathname();
  return (
    <li
      className={`h-9  w-50 mx-auto flex items-center mb-2.5    hover:text-primary cursor-pointer`}
    >
      <Link
        onClick={() => setOpenMobileSidebar(false)}
        href={link}
        className={`${
          pathName === link ? "text-primary" : ""
        } flex items-center hover:text-primary transition w-full h-full  duration-150 gap-2.5`}
      >
        {icon}
        <p className="capitalize">{label}</p>
      </Link>
    </li>
  );
};

export default SideLink;

interface AccountLinksProps {
  icon: ReactNode;
  label: string;
  link?: string;
}

export function AccountLinks({ link, label, icon }: AccountLinksProps) {
  const { setOpenMobileSidebar } = useSidebar();
  const pathName = usePathname();

  return (
    <li className="h-9  w-50 mx-auto flex items-center hover:text-primary cursor-pointer mb-2.5">
      {link ? (
        <Link
          onClick={() => setOpenMobileSidebar(false)}
          href={link}
          className={`${
            pathName === link ? "text-primary" : ""
          } flex items-center hover:text-primary w-full h-full transition duration-150 gap-2.5 overflow-hidden`}
        >
          {icon}
          <p className="capitalize text-[16px] truncate">{label}</p>
        </Link>
      ) : (
        <Button
          onClick={() => signOut({ callbackUrl: "/" })}
          className=" flex items-center hover:text-primary pl-0!    bg-transparent text-black hover:bg-transparent transition duration-150 gap-2.5 overflow-hidden"
        >
          {icon}
          <p className="capitalize text-[16px] truncate">{label}</p>
        </Button>
      )}
    </li>
  );
}
