import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import { HiOutlineUpload } from "react-icons/hi";
import { MdOutlineFileDownload } from "react-icons/md";
import Like from "./Like";
import BookMark from "./BookMark";
const ResearchCard = ({ data }) => {
  return (
    <article
      className=" relative  px-1 py-1 lg::py-3 lg:px-2 border rounded-[15px] border-[#D9D9D9]  flex flex-col gap-2.5 md:gap-[18px] "
      key={data.id}
    >
      <span className="absolute right-2 top-2 md:top-5 z-30 md:right-5 rounded-full md:w-11 w-5 md:h-11 h-5 cursor-pointer bg-white flex items-center justify-center">
        <HiOutlineUpload />
      </span>
      <div className="relative h-[118.48px] sm:h-[246px] w-full">
        <Image
          className="rounded-t-[15px] object-cover  max-w-[351px]"
          fill
          src={data.imagePath}
          alt="Publication image"
        />
      </div>
      {/* content */}
      <div className="flex flex-col gap-2.5 w-full">
        <h3 className="font-medium text-[8px]  md:text-lg leading-[130%]">
          {data.name}
        </h3>
        <div className="flex items-center  gap-1.5 mb-4 lg:mb-9">
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
        <div className="flex items-center gap-2 max-md:justify-between lg:gap-12.5 relative">
          <Like data={data} />
          <div className="flex items-end gap-[3px]">
            <FaRegComment className="cursor-pointer w-3.5 h-3.5 lg:w-[18px] lg:h-[18px]" />
            <small>{data?.comments}</small>
          </div>
          <div className="flex items-end gap-[3px]">
            <MdOutlineFileDownload className="cursor-pointer text-sm md:text-lg" />
            <small>{data?.downloads}</small>
          </div>
          <BookMark data={data} />
        </div>
      </div>
      <Button
        variant="default"
        size="lg"
        className="w-full md:h-9 h-7 flex items-center justify-center text-sm font-medium md:text-[16px] leading-[130%]"
      >
        View Details
      </Button>
    </article>
  );
};

export default ResearchCard;
