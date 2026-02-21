import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import UserHeader from "../../components/UserHeader";
import { SidebarProvider } from "@/components/SidebarContext";
export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfo = await getServerSession(authOptions);
  if (!userInfo?.user) {
    redirect("/");
  }
  return (
    <SidebarProvider>
      <div className="h-screen overflow-x-hidden w-screen  mx-auto bg-gray-50 flex max-sm:px-1">
        {/* DESKTOP SIDEBAR */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* RIGHT SIDE (HEADER + OUTLET) */}
        <div className="flex-1 flex flex-col md:ml-12 xl:ml-62.5">
          <div className="fixed top-0 md:w-[calc(100%-52px)] px-2 z-50  lg:w-full lg:sticky w-full  backdrop:blur-lg">
            <UserHeader />
          </div>

          {/* OUTLET (scrollable) */}
          <main className="flex-1 mt-4  lg:ml-4  lg:mt-0 p-2">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
