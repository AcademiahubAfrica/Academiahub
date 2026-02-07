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

const CollapseSide = () => {
  const { isExpanded, toggleSidebar } = useSidebar();
  const [accordionValue, setAccordionValue] = useState<string>("");

  useEffect(() => {
    // Check if the screen is md (768px) or larger
    function checkScreenSize() {
      if (window.innerWidth >= 768) {
        setAccordionValue("item-1");
      }
    }

    checkScreenSize();
  }, []);

  // Sync accordion state with sidebar context
  useEffect(() => {
    setAccordionValue(isExpanded ? "item-1" : "");
  }, [isExpanded]);

  const handleValueChange = (value: string) => {
    setAccordionValue(value);
    // Update the sidebar context when accordion changes
    if (value === "item-1" && !isExpanded) {
      toggleSidebar();
    } else if (value === "" && isExpanded) {
      toggleSidebar();
    }
  };

  return (
    <Accordion
      type="single"
      collapsible
      value={accordionValue}
      onValueChange={handleValueChange}
      className="min-w-4"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-grey">
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

export default CollapseSide;