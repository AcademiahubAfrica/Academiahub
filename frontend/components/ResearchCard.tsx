import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import { RxUpload } from "react-icons/rx";
import { MdOutlineFileDownload } from "react-icons/md";
import { savedResearch } from "@/app/_types/saved";
import Like from "./Like";
import BookMark from "./BookMark";

type ResearchCardProps = {
  data: savedResearch;
};

const ResearchCard = ({ data }: ResearchCardProps) => {
  return (
    <article
      className=" relative w-full bg-white px-1 py-1 lg:py-2.75 lg:px-3 border rounded-[15px] border-[#D9D9D9]   "
      key={data.id}
    >
      <span className="absolute right-3 top-3 md:top-5 z-30 md:right-5 rounded-full md:w-11 w-5.75 md:h-11 h-5.75 cursor-pointer bg-white flex items-center justify-center">
        <RxUpload className="md:w-4 md:h-4  w-2.25 h-2.25 " />
      </span>
      <div className="relative h-[118.48px] sm:h-61.5 w-full">
        <Image
          className="rounded-t-[15px] object-cover  "
          fill
          src={data.imagePath}
          alt="Publication image"
        />
      </div>
      {/* content */}
      <div className=" mt-4  w-full">
        <h3 className="font-medium line-clamp-2 text-[8px]  md:text-lg leading-[130%]">
          {data.name}
        </h3>
        <div className="flex items-center  mt-4.5  gap-1.5 mb-4 ">
          <div className="w-5 h-5 md:w-10 md:h-10 relative">
            <Image
              className="rounded-full "
              fill
              src={data.userPfp}
              alt="user's profile picture"
            />
          </div>
          <div>
            <p className="text-[8px] font-normal md:text-sm leading-[130%] mb-0.5">
              {data.username}
            </p>
            <p className="text-grey text-[8px] md:text-sm leading-[130%]">
              {data.institution}
            </p>
          </div>
        </div>
        {/* stats section */}
        <div className="flex items-center py-2 gap-2  mb-1.5 justify-between lg:justify-around lg:gap-12.5  pr-2">
          <div className="flex items-center gap-2 sm:gap-6 md:gap-12.5">
            <Like data={data} />
            <div className="flex items-end gap-0.75">
              <FaRegComment className="cursor-pointer text-black w-2.25 h-2.25 md:w-3.5 md:h-3.5 lg:w-4.5 lg:h-5" />
              <small className="text-[6.74px] md:text-sm">
                {data?.comments}
              </small>
            </div>
            <div className="flex items-end gap-0.75">
              <MdOutlineFileDownload className="cursor-pointer text-black w-2.25 h-2.25 md:w-3.5 md:h-3.5 lg:w-4.5 lg:h-5" />
              <small className="text-[6.74px] md:text-sm">
                {data?.downloads}
              </small>
            </div>
          </div>
          <BookMark data={data} />
        </div>
      </div>
      <Button
        variant="default"
        size="lg"
        className="w-full md:h-9 lg:h-11 h-5.25 text-[7.7px] mt-3 mb-1.5 flex items-center justify-center  font-medium md:text-[16px] leading-[130%]"
      >
        View Details
      </Button>
    </article>
  );
};

export default ResearchCard;
