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
				className="xl:hidden hidden md:block lg:hidden  cursor-pointer object-cover"
			/>
			<div className="lg:hidden w-full">
				{pathName === "/dashboard" && openSearchBar === true ? (
					<SearchBar />
				) : (
					""
				)}
			</div>

			<div className="hidden lg:block w-full">
				{pathName === "/dashboard" && <SearchBar />}
			</div>


			<div className="md:flex hidden pr-7.5   items-center justify-end   gap-4.5 xl:justify-around w-1/2  ">
				{openSearchBar === false && (
					<div className="w-10 h-10 md:flex  lg:hidden items-center justify-center bg-gray-100 rounded-full hidden ">
						<MdSearch
							className="text-xl "
							onClick={() => setOpenSearchBar(true)}
						/>
					</div>
				)}
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
					<h3 className="heading-3 text-xl hidden lg:inline-block">
						{userName}
					</h3>
				)}

				<Link
					href={"/dashboard"}
					className="w-10 h-10 hidden lg:flex items-center justify-center bg-gray-100 rounded-full"
				>
					<RiShareForwardLine
						size={20}
						className="hidden cursor-pointer md:block"
					/>
				</Link>
			</div>

			<Sheet open={openMobileSidebar} onOpenChange={setOpenMobileSidebar}>
				<div className="flex md:hidden w-full  flex-row-reverse px-1 items-center gap-7 justify-between ">
					<div className="flex items-center gap-1.25">
						<Link
							href={"/notifications"}
							className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full"
						>
							<IoMdNotificationsOutline className="text-2xl md:hidden " />
						</Link>
						<SheetTrigger>
							<FaBars className="lg:hidden text-xl" />
						</SheetTrigger>
					</div>

					<div className="flex md:hidden items-center gap-1.25">
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
									<h3 className="heading-3">{userName}</h3>
								)}
							</>
						)}
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
