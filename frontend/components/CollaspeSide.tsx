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
        <AccordionTrigger className="text-grey md:hidden lg:flex">
          Account
        </AccordionTrigger>

        <AccordionTrigger
          onClick={toggleSidebar}
          className={`hidden md:max-lg:flex ${isExpanded ? "text-grey" : "text-transparent"}`}
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
