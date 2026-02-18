import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="px-2 md:px-9 border-b w-full flex-wrap border-grey py-2 md:py-10 flex items-center justify-between">
      <div className="flex items-center gap-1">
        <ChevronLeft className="md:hidden cursor-pointer mr-1" />
        <Avatar className=" h-10 w-10 md:w-15 md:h-15 ">
          <AvatarImage
            className=""
            src="https://github.com/shadcn.png"
            alt="xyz's profile picture"
          />
        </Avatar>
        <div className="md:space-y-3 space-y-1">
          <h2 className="text-[16px] md:text-xl leading-6">Xys&apos;s Name</h2>
          <p className="body-text max-sm:text-[10px] -tracking-normal leading-4.5 text-grey">
            Active 1 hour ago
          </p>
        </div>
      </div>

      <Button className="rounded-[12px] bg-linear-to-r text-sm from-primary-500 to-[#080F24]">
        View Profile
      </Button>
    </div>
  );
};

export default ChatHeader;
