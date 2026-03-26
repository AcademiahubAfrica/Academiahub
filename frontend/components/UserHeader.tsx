"use client";
import { useState } from "react";
import { IoMdNotificationsOutline, IoMdSearch } from "react-icons/io";
import { RiShareForwardLine } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaBars, FaSearch } from "react-icons/fa";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import NameSkeleton from "./NameSkeleton";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarContext";
import { getInitials } from "@/lib/messaging/utils";
import SearchBar from "./user/SearchBar";
import { MdSearch } from "react-icons/md";
const UserHeader = () => {
	const { openMobileSidebar, setOpenMobileSidebar } = useSidebar();
	const [openSearchBar, setOpenSearchBar] = useState(false);

	const pathName = usePathname();

	const { data: session, status } = useSession();
	const user = session?.user;
	const userName = user?.name || "";
	const userImage = user?.image || undefined;
	const userInitials = getInitials(userName);

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
					<div className="lg:hidden w-full">
					<SearchBar />
						</div>
				) }
		

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
						className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full"
					>
						<IoMdNotificationsOutline className="text-2xl lg:block" />
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

				<Link
					href={"/dashboard"} //to be changed.
					className="w-10 h-10 hidden lg:flex items-center justify-center bg-gray-100 rounded-full"
				>
					<RiShareForwardLine
						size={20}
						className="hidden cursor-pointer md:block"
					/>
				</Link>
			</div>

			<Sheet open={openMobileSidebar} onOpenChange={setOpenMobileSidebar}>
				<div className="flex flex-1 md:hidden w-full px-1 items-center justify-between">
					<div className="flex items-center gap-1.25">
						{pathName === "/settings" ? (
							<h3 className="text-lg capitalize text-primary font-medium leading-[24px] tracking-normal">
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

					<div className="flex items-center gap-1.25">
						<Link
							href={"/notifications"}
							className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full"
						>
							<IoMdNotificationsOutline className="text-2xl" />
						</Link>
						<SheetTrigger>
							<FaBars className="text-xl" />
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
