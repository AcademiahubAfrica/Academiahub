import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
const ProfileCard = () => {
  return (
    <aside className="hidden md:block md:top-8 lg:w-1/3 bg-[#FAFAFA] self-start sticky top-24 text-center  rounded-[12px] pt-7 px-4.5">
      <h2 className="text-base lg:text-xl leading-6 font-medium mb-3">
        About Author
      </h2>

      <Avatar className="size-10  lg:size-22 mx-auto border! p-1 border-white! shadow-md">
        <AvatarImage src={""} />
        <AvatarFallback>
          <Skeleton className="size-10 lg:size-22" />
        </AvatarFallback>
      </Avatar>

      <div className="mt-2.5 mb-3.5">
        <p className="text-base font-normal leading-[130%]">Ochife Ogechukwu</p>
        <p className="text-xs text-grey font-normal leading-[130%]">
          University of Lagos.
        </p>
      </div>
      <p className="text-xs mb-6.5 font-normal leading-[130%]">
        Associate Professor specializing in Artificial intelligence and computer
        science
      </p>

      {/* stats */}
      <div className="px-4 py-2.5 mb-6.5 flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-xs font-normal leading-[130%]">100</p>
          <p className="text-xs font-normal leading-[130%]">Uploads</p>
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-normal leading-[130%]">100</p>
          <p className="text-xs font-normal leading-[130%]">Downloads</p>
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-normal leading-[130%]">1000</p>
          <p className="text-xs font-normal leading-[130%]">Likes</p>
        </div>
      </div>

      <div className="space-y-1">
        <Button className="w-full">Message Author</Button>
        <Button
          className="w-full border-primary hover:bg-primary/85 hover:text-white "
          variant={"outline"}
        >
          View Profile
        </Button>
      </div>
    </aside>
  );
};

export default ProfileCard;
