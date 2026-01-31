"use client";
import { useState, useEffect } from "react";
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
  const [defaultOpen, setDefaultOpen] = useState("");

  useEffect(() => {
    // Check if the screen is md (768px) or larger
    function checkScreenSize() {
      if (window.innerWidth >= 768) {
        setDefaultOpen("item-1");
      }
    }

    checkScreenSize();
  }, []);

  return (
    <Accordion
      key={defaultOpen} // Required to apply defaultValue after initial mount
      type="single"
      collapsible
      defaultValue={defaultOpen}
      className=" min-w-4"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger
          open={isExpanded}
          onClick={toggleSidebar}
          className={"text-grey"}
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
