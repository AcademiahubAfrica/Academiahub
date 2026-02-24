import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
const Comments = () => {
  return (
    <div className="bg-white border border-[#D9D9D9] rounded-[15px] py-3.5 px-4.5">
      <h4 className="mb-2.5 text-sm lg:base font-medium lg:leading-5 leading-[130%]">
        Comments (3)
      </h4>

      <div className="flex items-center gap-2 lg:mb-7">
        <Avatar className="size-8 lg:size-10 mr-3.25">
          <AvatarImage src={""} />
          <AvatarFallback>
            <Skeleton className="size-8 lg:size-10" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-1 h-11.25 items-center gap-2">
          <Input
            id="title"
            className="bg-[#FAFAFA] text-sm leading-3.5 tracking-normal placeholder:text-grey placeholder:text-sm placeholder:leading-3.5 placeholder:tracking-normal h-full border-none rounded-lg shadow-xs"
            placeholder="Add a comment..."
          />
          <Button className="h-full">Post</Button>
        </div>
      </div>

      {[1, 2, 3].map((_, index) => (
        <div className="flex items-center gap-2 space-y-2.75" key={index}>
          <Avatar className="size-8 lg:size-10 mr-3.25">
            <AvatarImage src={""} />
            <AvatarFallback>
              <Skeleton className="size-8 lg:size-10" />
            </AvatarFallback>
          </Avatar>
          <div className=" flex-1  ">
            <p className="font-semibold lg:text-sm leading-4.5">
              Stephanie Akunna
            </p>
            <p className="regular lg:text-sm leading-4.5">
              I have been looking for this topic for a while thank you so much.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
