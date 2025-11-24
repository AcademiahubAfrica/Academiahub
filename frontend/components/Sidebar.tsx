import Logo from "./Logo";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import { sideLinks } from "@/app/data/Exports";
import SideLink from "./SideLink";
import { Button } from "@/components/ui/button";
import CollaspeSide from "./CollaspeSide";

const Sidebar = () => {
  return (
    <aside className="h-screen fixed top-0 left-0 lg:w-[250px] overflow-hidden hover:overflow-y-auto lg:border-r bg-white shadow-lg p-5 flex flex-col items-center">
      <Logo />

      <div className="flex flex-col justify-between h-full pb-4">
        <div>
          <div className="relative mt-7.5 mb-[15px] hidden lg:block h-8.5">
            <IoSearchOutline className="absolute top-1/2 left-1 -translate-y-1/2" />
            <Input
              type={"search"}
              placeholder="search"
              className="h-full placeholder:pl-2"
            />
          </div>
          <nav>
            <ul className="w-[210px] mt-7.5 lg:mt-0 ">
              {sideLinks.map(({ icon, label, link }) => {
                return (
                  <SideLink icon={icon} label={label} link={link} key={link} />
                );
              })}
            </ul>
            <CollaspeSide />
          </nav>
        </div>

        <div className="flex  flex-col mt-4 gap-2 pb-4">
          <h4 className="font-bold">Upgrade to Pro</h4>
          <small>Unlock unlimited upload and download</small>
          <Button className="bg-black hover:bg-black text-white hover:text-white">
            Upgrade Now
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
