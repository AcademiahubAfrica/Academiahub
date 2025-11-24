"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { accountLinks } from "@/app/data/Exports";
import { AccountLinks } from "./SideLink";
const CollaspeSide = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className={"text-grey"}>Account</AccordionTrigger>
        <AccordionContent>
          {/* <ul className="mt-6.5 w-[210px] "> */}
          {/* <span className="flex justify-between mb-3 text-grey">
              <p>Account</p>
              <IoIosArrowDown />
            </span> */}
          {accountLinks.map(({ icon, label, link }) => (
            <AccountLinks icon={icon} label={label} link={link} key={label} />
          ))}
          {/* </ul> */}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CollaspeSide;
