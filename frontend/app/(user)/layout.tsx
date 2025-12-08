import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import UserHeader from "../../components/UserHeader";
export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const userInfo = await getServerSession(authOptions);
    if (!userInfo?.user) {
        redirect('/');
    }
  return (
    <div className="h-screen w-full max-w-[1440px] ! bg-gray-50 flex ">
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* RIGHT SIDE (HEADER + OUTLET) */}
      <div className="flex-1 flex flex-col md:ml-[250px]">
        <div className="md:fixed top-0 md:w-[calc(100%-250px)]  z-20 backdrop:blur-lg">
          <UserHeader />
        </div>

        {/* OUTLET (scrollable) */}
        <main className="flex-1 lg:ml-4 md:mt-14 p-2 pb-10">{children}</main>
      </div>
    </div>
  );
}
