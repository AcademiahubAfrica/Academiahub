"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { accountLinks } from "@/app/data/Exports";
import { AccountLinks } from "./SideLink";
import { useSidebar } from "./SidebarContext";

const CollaspeSide = () => {
  const { isExpanded, toggleSidebar } = useSidebar();

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={"item-1"}
      className=" min-w-4 "
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-grey md:hidden xl:flex">
          Account
        </AccordionTrigger>

        <AccordionTrigger
          onClick={toggleSidebar}
          className={`hidden md:max-xl:flex  transition-all duration-150 text-grey ${isExpanded ? "opacity-100 ml-0 " : "opacity-80 -ml-4.5"}`}
        >
          Account
        </AccordionTrigger>
        <AccordionContent>
          {accountLinks.map(({ icon, label, link }) => (
            <AccountLinks icon={icon} label={label} link={link} key={label} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CollaspeSide;
