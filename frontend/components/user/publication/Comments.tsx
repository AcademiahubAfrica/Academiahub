import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
const Comments = () => {
  return (
    <div className="bg-white border border-[#D9D9D9] rounded-[15px] py-3.5 px-2.75 md:px-4.5">
      <h4 className="mb-2.5 text-sm lg:base font-medium lg:leading-5 leading-[130%]">
        Comments (3)
      </h4>

      <div className="flex items-center gap-1 md:gap-3.25 mb-3 md:-5 lg:mb-7">
        <Avatar className="size-7.5 md:size-10 ">
          <AvatarImage src={""} />
          <AvatarFallback>
            <Skeleton className="size-7.5 md:size-10" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-1 h-8.5 md:h-11.25 items-center gap-2">
          <Input
            id="title"
            className="bg-primary-light md:bg-[#FAFAFA] text-sm leading-3.5 tracking-normal placeholder:text-grey placeholder:text-sm placeholder:leading-3.5 placeholder:tracking-normal h-full border-none rounded-lg shadow-xs"
            placeholder="Add a comment..."
          />
          <Button className="h-full">Post</Button>
        </div>
      </div>

      <div
        className="space-y-2 h-[50vh]! lg:h-[60vh]! pb-5 max-sm:overflow-y-auto md:overflow-hidden  md:space-y-2.75 max-sm:[scrollbar-width:none] 
  max-sm:[&::-webkit-scrollbar]:display-none hover:overflow-auto"
      >
        {[1, 2, 3, 4, 5, 6, 7, 7, 8, 8].map((_, index) => (
          <div className="flex items-center gap-1 md:gap-3.25 " key={index}>
            <Avatar className="size-7.5 md:size-10 ">
              <AvatarImage src={""} />
              <AvatarFallback>
                <Skeleton className="size-7.5 md:size-10" />
              </AvatarFallback>
            </Avatar>
            <div className=" flex-1 space-y-0.5 ">
              <p className="font-semibold text-sm  leading-3.5 md:leading-4.5">
                Stephanie Akunna
              </p>
              <p className="font-normal text-xs md:text-sm leading-3.5 md:leading-4.5">
                I have been looking for this topic for a while thank you so
                much.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
