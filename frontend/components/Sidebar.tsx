"use client";
import Logo from "./Logo";
import { sideLinks } from "@/app/data/Exports";
import SideLink from "./SideLink";
import { Button } from "@/components/ui/button";
import CollaspeSide from "./CollaspeSide";
import { useSidebar } from "./SidebarContext";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Sidebar = () => {
  const { isExpanded, toggleSidebar } = useSidebar();
  return (
    <aside
      className={`h-screen fixed top-0 left-0 transition-all duration-300 w-fit md:w-12 xl:w-62.5 overflow-hidden hover:overflow-y-auto lg:border-r bg-white shadow-lg p-5  ${isExpanded ? "md:w-62.5 z-60" : "md:w-12"}`}
    >
      <Logo />

      <MdOutlineKeyboardArrowRight
        className="hidden text-3xl md:block xl:hidden absolute top-6 right-1 cursor-pointer transition-transform duration-300"
        onClick={toggleSidebar}
        style={{
          transform: isExpanded ? " rotate(180deg)" : " rotate(0deg)",
          transition: "transform 300ms ease",
        }}
      />
      <div className="flex flex-col justify-between h-full mt-3.75 lg:mt-8 xl:mt-3.75 pb-4">
        <div>
          <nav>
            <ul className="w-52.5 mt-7.5 lg:mt-0 ">
              {sideLinks.map(({ icon, label, link }) => {
                return (
                  <SideLink icon={icon} label={label} link={link} key={link} />
                );
              })}
            </ul>
            <CollaspeSide />
          </nav>
        </div>

        {isExpanded && (
          <div className="flex md:hidden lg:flex  flex-col mt-4 gap-2 pb-4">
            <h4 className="font-bold">Upgrade to Pro</h4>
            <small>Unlock unlimited upload and download</small>
            <Button className="bg-black hover:bg-black text-white hover:text-white">
              Upgrade Now
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
