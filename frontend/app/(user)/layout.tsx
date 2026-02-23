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
      <div className="h-screen w-full bg-[#FAFAFA] flex overflow-hidden">
        {/* DESKTOP SIDEBAR */}
        <div className="hidden md:block h-full">
          <Sidebar />
        </div>

        {/* RIGHT SIDE (HEADER + OUTLET) */}
        <div className="flex-1 flex flex-col h-full overflow-y-auto">
          <header className="sticky top-0 z-50 w-full backdrop-blur-lg">
            <UserHeader />
          </header>

          {/* OUTLET */}
          <main className="flex-1 px-2 lg:p-0 lg:pb-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
