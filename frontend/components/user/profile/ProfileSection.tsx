import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LuSchool } from "react-icons/lu";
import { RiGraduationCapLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import Stats from "./Stats";
const ProfileSection = () => {
  return (
    <>
      <div className="h-[77px] lg:h-[145px] blur-[5px] relative">
        <Image
          src="https://github.com/shadcn.png"
          alt={"profile background image"}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex gap-4 flex-col md:flex-row">
        <Avatar className="border-[3px] hidden md:block border-white h-10 w-10 lg:w-25 lg:h-25 -mt-5">
          <AvatarImage
            className=""
            src="https://github.com/shadcn.png"
            alt="@shadcn"
          />
          <AvatarFallback>OC</AvatarFallback>
        </Avatar>

        <div className="flex-1 mt-2 lg:mt-6.5">
          <div className="flex items-center mb-2 justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="border-[3px] md:hidden border-white h-10 w-10 ">
                <AvatarImage
                  className=""
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>OC</AvatarFallback>
              </Avatar>
              <h3> Ochife Ogechukwu</h3>
            </div>
            <Button variant={"outline2"}>Edit profile</Button>
          </div>

          {/* info */}
          <div className="flex md:items-center text-grey flex-col md:flex-row  gap-4">
            <div className="flex items-center gap-1">
              <LuSchool />
              <h5>University of Lagos</h5>
            </div>
            <div className="flex  items-center gap-1">
              <RiGraduationCapLine />
              <h5>Computer Science</h5>
            </div>
          </div>
          <div className="flex items-center text-grey mt-4 mb-6.5 gap-1">
            <IoLocationOutline />
            <h5>Lagos State, Nigeria</h5>
          </div>

          <p className="body-text">
            PhD candidate researching AI and Machine Learning applications in
            healthcare.
          </p>

          {/* stats */}
          <Stats />
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
