"use client";
import { EllipsisVertical } from "lucide-react";
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
  handleShare: () => void;
  onDeleteRequest?: () => void;
}

const KebabIcon = ({
  isOwnDocument,
  documentId,
  handleShare,
  onDeleteRequest,
}: KebabProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical
          strokeWidth={1.5}
          size={18}
          className="cursor-pointer text-white z-20"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="start"
        sideOffset={5}
        className="p-0  w-24 md:w-27.5 lg:w-34"
      >
        <DropdownMenuItem
          onSelect={handleShare}
          className="border-grey border-b max-sm:text-xs h-7 md:h-10 flex justify-center items-center "
        >
          Share
        </DropdownMenuItem>

        {isOwnDocument ? (
          <DropdownMenuItem
            variant="destructive"
            onSelect={(e) => {
              e.preventDefault();
              onDeleteRequest?.();
            }}
            className="border-[#AEAEAE] border-b max-sm:text-xs h-7 md:h-10 flex justify-center items-center "
          >
            Delete
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            asChild
            className="border-[#AEAEAE] border-b max-sm:text-xs h-7 md:h-10 flex justify-center items-center "
          >
            <Link href={`/publication/${documentId}/report-issue`}>Report</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default KebabIcon;
