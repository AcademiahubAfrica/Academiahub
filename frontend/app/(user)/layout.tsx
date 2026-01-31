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
      <div className="h-screen w-full max-w-360! mx-auto bg-gray-50 flex max-sm:px-1">
        {/* DESKTOP SIDEBAR */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* RIGHT SIDE (HEADER + OUTLET) */}
        <div className="flex-1 flex flex-col md:ml-12 lg:ml-62.5">
          <div className="md:fixed top-0 md:w-[calc(100%-58px)]  lg:w-[calc(100%-250px)]  z-20 backdrop:blur-lg">
            <UserHeader />
          </div>

          {/* OUTLET (scrollable) */}
          <main className="flex-1 lg:ml-4 md:mt-14 p-2 pb-10">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
