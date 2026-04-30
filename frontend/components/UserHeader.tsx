"use client";
import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiShareForwardLine } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaBars } from "react-icons/fa";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import NameSkeleton from "./NameSkeleton";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarContext";
import { getInitials } from "@/lib/messaging/utils";
import { useUnreadCount } from "@/lib/notifications/hooks";
import SearchBar from "./user/SearchBar";
import { MdSearch } from "react-icons/md";
import ShareDialog from "./user/dashboard/ShareDialog";
import toast from "react-hot-toast";

interface UserHeaderProps {
  userInfoToShare:
    | {
        id: string;
        image: string | null;
        name: string | null;
      }
    | undefined;
}
const UserHeader = ({ userInfoToShare }: UserHeaderProps) => {
  const { openMobileSidebar, setOpenMobileSidebar } = useSidebar();
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const { data: unreadCount } = useUnreadCount();

  const pathName = usePathname();

  const { data: session, status } = useSession();
  const user = session?.user;
  const userName = user?.name || "";
  const userImage = user?.image || undefined;
  const userInitials = getInitials(userName);
  console.log(user);

  // states and data for sharing profile
  const [showShareDialog, setShowShareDialog] = useState(false);
  const shareData = {
    title: `${userInfoToShare?.name} on Academia Hub Africa`,
    text: `Check out my academic profile on Academia Hub Africa. Connect with me and explore my latest research and publications.`,
    url: `https://academiahubafrica.org/profile/${userInfoToShare?.id}`,
  };

  async function onShare() {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile && navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          toast.error(`Error: ${err.message}`);
        }
      }
    } else {
      setShowShareDialog(true);
    }
  }

  return (
    <header className="sm:h-14 h-12 px-2  lg:h-18.5 w-full bg-white z-100   flex items-center justify-between xl:justify-end gap-3 ">
      <Image
        src={"/assets/images/logoIcon.png"}
        alt="logo"
        height={30}
        width={20}
        className="xl:hidden hidden md:block lg:hidden  cursor-pointer object-cover shrink-0"
      />

      {pathName === "/dashboard" && openSearchBar === true && (
        <div className="lg:hidden w-full max-md:hidden">
          <SearchBar />
        </div>
      )}

      <div className="hidden lg:block w-full">
        {pathName === "/dashboard" && <SearchBar />}
      </div>

      <div className="md:flex hidden pr-7.5   items-center justify-end   gap-4.5  w-1/2  ">
        {openSearchBar === false && (
          <div className="w-10 h-10 md:flex  lg:hidden items-center justify-center bg-gray-100 rounded-full hidden ">
            <MdSearch
              className="text-xl "
              onClick={() => setOpenSearchBar(true)}
            />
          </div>
        )}

        <div className="flex items-center gap-4.5 ">
          <Link
            href={"/notifications"}
            className="relative w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full"
          >
            <IoMdNotificationsOutline className="text-2xl lg:block" />
            {!!unreadCount && unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 flex items-center justify-center rounded-full bg-primary-500 text-white text-[10px] font-medium leading-none">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
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
            <h3 className="heading-3 text-base hidden lg:inline-block whitespace-nowrap">
              {userName}
            </h3>
          )}
        </div>

        <div
          className="w-10 h-10 hidden lg:flex items-center justify-center bg-gray-100 rounded-full"
          onClick={() => onShare()}
        >
          <RiShareForwardLine
            size={20}
            className="hidden cursor-pointer md:block"
          />
        </div>

        <ShareDialog
          setShowShareDialog={setShowShareDialog}
          showShareDialog={showShareDialog}
          shareData={shareData}
          type={"Profile"}
        >
          <div
            className="w-full h-75 md:h-90.75 relative flex items-center justify-center flex-col  text-white   border-0 p-0 "
            style={{
              backgroundImage: `url(${userInfoToShare?.image})`,
              backgroundPosition: " center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "150%",
            }}
          >
            <Image
              className="absolute bottom-2 z-20 left-2"
              src={"/assets/images/Aicon.png"}
              alt="logo icon"
              width={100}
              height={100}
            />
            {/* overlay */}
            <div className="absolute inset-0 pointer-none  bg-linear-to-b from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.2)] backdrop-blur-xs "></div>

            <div
              className="h-[80%] md:h-[62%] z-30 bg-linear-to-b from-[rgba(0, 0, 0, 1)] to-[rgba(255,255,255,1)] flex relative flex-col justify-end  rounded-t-2xl  w-[80%]"
              style={{
                backgroundImage: `url(${userInfoToShare?.image})`,
                backgroundPosition: " center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <h3 className="absolute bottom-4 left-4 capitalize! text-white z-50">
                {userInfoToShare?.name}
              </h3>
            </div>
          </div>
        </ShareDialog>
      </div>

      <Sheet open={openMobileSidebar} onOpenChange={setOpenMobileSidebar}>
        <div className="flex flex-1 md:hidden w-full px-1 items-center justify-between">
          <div className="flex items-center gap-1.25">
            {pathName === "/settings" ? (
              <h3 className="text-lg capitalize text-primary font-medium leading-6 tracking-normal">
                Settings
              </h3>
            ) : (
              <>
                <Link href={"/profile"}>
                  <Avatar>
                    <AvatarImage src={userImage} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                </Link>

                {status === "loading" ? (
                  <NameSkeleton />
                ) : (
                  <h3 className="heading-3 text-base whitespace-nowrap">
                    {userName}
                  </h3>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={"/notifications"}
              className="relative w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full"
            >
              <IoMdNotificationsOutline className="text-2xl" />
              {!!unreadCount && unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 flex items-center justify-center rounded-full bg-primary-500 text-white text-[10px] font-medium leading-none">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </Link>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full"
              >
                <FaBars className="text-xl" />
              </button>
            </SheetTrigger>
          </div>
        </div>

        <SheetContent side="left" className="pt-6 [&>button]:hidden">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default UserHeader;
