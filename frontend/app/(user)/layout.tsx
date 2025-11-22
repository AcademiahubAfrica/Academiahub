import Sidebar from "../components/Sidebar";
import UserHeader from "../components/UserHeader";
export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full max-w-[1440px] overflow-hidden! bg-gray-50 flex ">
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* RIGHT SIDE (HEADER + OUTLET) */}
      <div className="flex-1 flex flex-col md:ml-[250px] overflow-hidden!">
        <div className="md:fixed top-0 md:w-[calc(100%-250px)] ">
          <UserHeader />
        </div>

        {/* OUTLET (scrollable) */}
        <main className="flex-1 lg:ml-4 md:mt-14 p-2 pb-10  overflow-auto ">
          {children}
        </main>
      </div>
    </div>
  );
}
