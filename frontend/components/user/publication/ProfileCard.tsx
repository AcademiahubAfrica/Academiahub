import { Profile } from "@/app/_types/author";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
const ProfileCard = ({ profile }: { profile: Profile }) => {
  return (
    <aside className="hidden md:block border  md:top-8 md:w-1/3 bg-[#FAFAFA] self-start sticky top-24 text-center  rounded-[12px] pt-7 px-4.5">
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
        <p className="text-base font-normal leading-[130%]">{profile.name}</p>
        <p className="text-xs text-grey font-normal leading-[130%]">
          University of Lagos.(hard coded for now)
        </p>
      </div>

      <p className="text-xs mb-6.5 font-normal leading-[130%]">
        {profile.bio ? profile.bio : "Author has not set a bio yet."}
      </p>

      {/* stats */}
      <div className="px-4 py-2.5 mb-6.5 flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-xs font-normal leading-[130%]">
            {profile.stats.uploads}
          </p>
          <p className="text-xs font-normal leading-[130%]">Uploads</p>
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-normal leading-[130%]">
            {profile.stats.downloads}
          </p>
          <p className="text-xs font-normal leading-[130%]">Downloads</p>
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-normal leading-[130%]">
            {profile.stats.likes}
          </p>
          <p className="text-xs font-normal leading-[130%]">Likes</p>
        </div>
      </div>

      <div className="space-y-1 mb-2 lg:mb-4">
        <Button className="w-full">Message Author</Button>
        <Button
          asChild
          className="w-full border-primary hover:bg-primary/85 hover:text-white "
          variant={"outline"}
        >
          <Link href={`/profile/${profile.id}`}>View Profile</Link>
        </Button>
      </div>
    </aside>
  );
};

export default ProfileCard;
