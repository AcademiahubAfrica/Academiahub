"use client";
import { Input } from "@/components/ui/input";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { RiShareForwardLine } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaBars } from "react-icons/fa";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Link from "next/link";
const UserHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="h-14 lg:h-[74px] bg-white z-40  flex items-center justify-between pl-4">
      <div className="relative h-12 basis-2/3 hidden md:block ">
        <IoSearchOutline className="absolute top-1/2 left-1 -translate-y-1/2" />
        <Input
          type={"search"}
          placeholder="search"
          className="h-full placeholder:pl-2 outline-none border-none focus:ring"
        />
      </div>
      <div className="flex items-center   gap-4.5">
        <Link href={"/notifications"}>
          <IoMdNotificationsOutline className="text-xl hidden lg:block" />
        </Link>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>OC</AvatarFallback>
        </Avatar>
        <h3 className="heading-3">Ochife Oge</h3>
        <RiShareForwardLine size={20} className="hidden md:block" />
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <FaBars className="lg:hidden text-xl" />
        </SheetTrigger>

        <SheetContent side="left" className="pt-6 [&>button]:hidden">
          {/* <SheetHeader className="border-b pb-4"></SheetHeader> */}
          <Sidebar />
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default UserHeader;
