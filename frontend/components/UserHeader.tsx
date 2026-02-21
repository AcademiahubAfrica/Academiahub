"use client";

import { IoMdNotificationsOutline } from "react-icons/io";
import { RiShareForwardLine } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaBars } from "react-icons/fa";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import NameSkeleton from "./NameSkeleton";
import { usePathname } from "next/navigation";
import ChatHeader from "./user/inbox/ChatHeader";
const UserHeader = () => {
  const [open, setOpen] = useState(false);

  const pathName = usePathname();

  const { data: session, status } = useSession();
  const user = session?.user;
  const userName = user?.name || "";
  const userImage = user?.image || "https://github.com/shadcn.png";
  const userInitials = userName?.slice(0, 2).toUpperCase();

  return (
    <header className="sm:h-14 h-12 px-2  lg:h-18.5 w-full bg-white z-100   flex items-center justify-between lg:justify-end">
      <Image
        src={"/assets/images/logoIcon.png"}
        alt="logo"
        height={30}
        width={20}
        className="xl:hidden hidden md:block  cursor-pointer object-cover"
      />

      {/* <div className="relative h-12 basis-2/3 hidden md:block "></div> */}

      <div className="md:flex hidden pr-7.5   items-center   gap-4.5 xl:gap-2">
        <Link href={"/notifications"}>
          <IoMdNotificationsOutline className="text-xl hidden lg:block" />
        </Link>
        <Link href={"/profile"}>
          <Avatar>
            <AvatarImage src={userImage} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Link>

        {status === "loading" ? (
          <NameSkeleton />
        ) : (
          <h3 className="heading-3">{userName}</h3>
        )}

        <RiShareForwardLine
          size={20}
          className="hidden cursor-pointer md:block"
        />
      </div>

      {pathName === "/inbox" ? (
        <div className="md:hidden w-full">
          <ChatHeader />
        </div>
      ) : (
        <Sheet open={open} onOpenChange={setOpen}>
          <div className="flex md:hidden w-full flex-row-reverse px-1 items-center justify-between ">
            <div className="flex items-center gap-1.25">
              <Link href={"/notifications"}>
                <IoMdNotificationsOutline className="text-xl md:hidden " />
              </Link>
              <SheetTrigger>
                <FaBars className="lg:hidden text-xl" />
              </SheetTrigger>
            </div>

            <div className="flex md:hidden items-center gap-1.25">
              <Link href={"/profile"}>
                <Avatar>
                  <AvatarImage src={userImage} />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
              </Link>

              {status === "loading" ? (
                <NameSkeleton />
              ) : (
                <h3 className="heading-3">{userName}</h3>
              )}
            </div>
          </div>

          <SheetContent side="left" className="pt-6 [&>button]:hidden">
            <Sidebar />
          </SheetContent>
        </Sheet>
      )}
    </header>
  );
};

export default UserHeader;
