"use client";
import { GoKebabHorizontal } from "react-icons/go";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface KebabProps {
  isOwnDocument: boolean;
  documentId?: string;
}

const KebabIcon = ({ isOwnDocument, documentId }: KebabProps) => {
  const router = useRouter();
  function handleReport() {
    router.push(`/publication/${documentId}/report-issue`);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <GoKebabHorizontal className="-rotate-90 absolute max-sm:top-4 max-sm:left-2 max-lg:top-8 max-lg:left-4 lg:right-3.5! lg:top-8 cursor-pointer  text-white  z-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 rounded-none  w-27.5">
        <DropdownMenuItem className="border-[#AEAEAE]  border-b h-10 flex justify-center items-center rounded-none">
          Share
        </DropdownMenuItem>
        {!isOwnDocument && (
          <DropdownMenuItem
            onClick={() => handleReport()}
            className="border-[#AEAEAE] border-b h-10 flex justify-center items-center rounded-none"
          >
            Report
          </DropdownMenuItem>
        )}

        {isOwnDocument && (
          <DropdownMenuItem
            variant="destructive"
            className="border-[#AEAEAE] border-b h-10 flex justify-center items-center rounded-none"
          >
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default KebabIcon;
