import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LuSchool } from "react-icons/lu";
import { RiGraduationCapLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { Profile, Bio } from "@/app/_types/author";
import { getInitials } from "@/lib/messaging/utils";

const ProfileSectionOther = ({ profile }: { profile: Profile }) => {
  const avatarSrc = profile.image || undefined;
  const initials = getInitials(profile.name || "");
  const bio = profile.bio as Bio | null;
  const location = bio
    ? [bio.state, bio.country].filter(Boolean).join(", ")
    : "";

  return (
    <div className="md:bg-white md:m-4 md:py-6 md:px-4 rounded-2xl">
      <div className="h-[77px] lg:h-[145px] relative bg-gradient-to-r from-primary/30 to-primary/10" />
      <div className="flex gap-4 flex-col md:flex-row">
        <Avatar className="border-[3px] hidden md:block border-white shadow-md h-10 w-10 lg:w-25 lg:h-25 -mt-5">
          <AvatarImage src={avatarSrc} alt={profile.name || "avatar"} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1 mt-2 lg:mt-6.5">
          <div className="flex items-center mb-2 justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="border-[3px] md:hidden border-white shadow-md h-10 w-10 ">
                <AvatarImage src={avatarSrc} alt={profile.name || "avatar"} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <h3>{profile.name}</h3>
            </div>
            <Button
              variant={"outline2"}
              className="max-w-[95px] text-sm leading-3.5 font-normal"
            >
              Message
            </Button>
          </div>

          {/* info */}
          <div className="flex md:items-center text-black flex-col md:flex-row  gap-4 lg:gap-8">
            {bio?.institution && (
              <div className="flex items-center gap-1">
                <LuSchool />
                <h5 className="text-xs md:text-sm leading-3.5 md:leading-4.5">
                  {bio.institution}
                </h5>
              </div>
            )}
            {bio?.department && (
              <div className="flex  items-center gap-1">
                <RiGraduationCapLine />
                <h5 className="text-xs md:text-sm leading-3.5 md:leading-4.5">
                  {bio.department}
                </h5>
              </div>
            )}
          </div>
          {location && (
            <div className="flex items-center text-black mt-4 mb-6.5 gap-1">
              <IoLocationOutline />
              <h5 className="text-xs md:text-sm leading-3.5 md:leading-4.5">
                {location}
              </h5>
            </div>
          )}

          {bio?.aboutMe && (
            <p className="text-xs md:text-sm leading-3.5 md:leading-4.5">
              {bio.aboutMe}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSectionOther;
