"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
