import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/prisma/connection";
import Sidebar from "../../components/Sidebar";
import UserHeader from "../../components/UserHeader";
import MobileSidebarSwipeZone from "../../components/MobileSidebarSwipeZone";
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

  // Check if profile is complete — redirect to onboarding if not
  const user = await prisma.user.findUnique({
    where: { id: userInfo.user.id },
    select: {
      name: true,
      Profile: {
        take: 1,
        select: {
          bio: true,
          user: {
            select: {
              id: true,
              image: true,
              name: true,
            },
          },
        },
      },
    },
  });

  const bio = user?.Profile[0]?.bio;
  const isProfileComplete =
    !!user?.name?.trim() &&
    !!bio?.institution?.trim() &&
    !!bio?.department?.trim() &&
    !!bio?.country?.trim() &&
    !!bio?.state?.trim();

  if (!isProfileComplete) {
    redirect("/onboarding");
  }
  const userInfoToShare = user?.Profile[0]?.user;
  console.log("user info to share :", userInfoToShare);
  return (
    <SidebarProvider>
      <MobileSidebarSwipeZone />
      <div className="h-screen w-full bg-[#FAFAFA] flex overflow-hidden">
        {/* DESKTOP SIDEBAR */}
        <div className="hidden relative md:block h-full">
          <Sidebar />
        </div>

        {/* RIGHT SIDE (HEADER + OUTLET) */}
        <div className="flex-1 flex flex-col h-full overflow-y-auto">
          <header className="sticky top-0 z-50 w-full backdrop-blur-lg">
            <UserHeader userInfoToShare={userInfoToShare} />
          </header>

          {/* OUTLET */}
          <main className="flex-1 min-h-0 px-2 lg:p-0 lg:pb-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
