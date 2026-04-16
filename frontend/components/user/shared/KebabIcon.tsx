"use client";
import { memo } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface KebabProps {
  isOwnDocument: boolean;
  documentId?: string;
}

const KebabIcon = memo(function KebabIcon({
  isOwnDocument,
  documentId,
}: KebabProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <GoKebabHorizontal className="-rotate-90 absolute max-sm:top-4 max-sm:left-2 max-lg:top-8 max-lg:left-4 lg:top-8 lg:left-4 cursor-pointer  text-white  z-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="start"
        sideOffset={5}
        className="p-0 rounded-none w-22  md:w-27.5 "
      >
        <DropdownMenuItem className="border-[#AEAEAE]  border-b max-sm:text-xs h-7 md:h-10 flex justify-center items-center rounded-none">
          Share
        </DropdownMenuItem>
        {isOwnDocument ? (
          <DropdownMenuItem
            variant="destructive"
            className="border-[#AEAEAE] border-b max-sm:text-xs h-7 md:h-10 flex justify-center items-center rounded-none"
          >
            Delete
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            asChild
            className="border-[#AEAEAE] border-b max-sm:text-xs h-7 md:h-10 flex justify-center items-center rounded-none"
          >
            <Link href={`/publication/${documentId}/report-issue`}>Report</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default KebabIcon;
