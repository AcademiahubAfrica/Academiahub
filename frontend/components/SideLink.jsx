"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
const SideLink = ({ icon, label, link }) => {
  const pathName = usePathname();
  return (
    <li className="h-9  w-[200px] mx-auto flex items-center mb-2.5">
      <Link
        href={link}
        className={`${
          pathName === link ? "text-primary" : ""
        } flex items-center hover:text-primary transition duration-150 gap-2.5`}
      >
        {icon}
        <p className="capitalize">{label}</p>
      </Link>
    </li>
  );
};

export default SideLink;

export function AccountLinks({ link, label, icon }) {
  const pathName = usePathname();

  return (
    <li className="h-9  w-[200px] mx-auto flex items-center mb-2.5">
      {link ? (
        <Link
          href={link}
          className={`${
            pathName === link ? "text-primary" : ""
          } flex items-center hover:text-primary transition duration-150 gap-2.5`}
        >
          {icon}
          <p className="capitalize">{label}</p>
        </Link>
      ) : (
        <Button
          onClick={() => signOut({ callbackUrl: "/" })}
          className=" flex items-center hover:text-primary pl-0!  bg-transparent text-black hover:bg-transparent transition duration-150 gap-2.5"
        >
          {icon}
          {label}
        </Button>
      )}
    </li>
  );
}
