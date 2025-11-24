import Logo from "@/app/components/Logo";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import { sideLinks } from "@/app/data/Exports";
import SideLink from "@/app/components/SideLink";

const Sidebar = () => {
  return (
    <aside className="h-screen fixed top-0 left-0 lg:w-[250px] overflow-hidden hover:overflow-y-auto lg:border-r bg-white shadow-lg p-5 flex flex-col items-center">
      <Logo />

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
      </nav>
    </aside>
  );
};

export default Sidebar;
