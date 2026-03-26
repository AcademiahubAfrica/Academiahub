import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaRegBookmark, FaRegComment } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import Like from "@/components/Like";
import { ResearchCardType } from "@/app/_types/documents";
import { getCategoryImage } from "@/lib/categoryImage";
import { getInitials } from "@/lib/messaging/utils";
import Link from "next/link";

type ResearchCardProps = {
  data: ResearchCardType;
  isLiked: boolean;
};

const ResearchCard = ({ data, isLiked }: ResearchCardProps) => {
  return (
    <article
      className=" relative w-full bg-white px-1 py-1 lg:py-2.75 lg:px-3 border rounded-[15px] border-[#D9D9D9]   "
      key={data.id}
    >
      <div className="relative aspect-343/240 w-full">
        <Image
          className="rounded-t-[15px] object-cover"
          fill
          src={getCategoryImage(data.category)}
          alt="Publication image"
        />
      </div>
      {/* content */}
      <div className=" mt-4  w-full">
        <h3 className="font-medium line-clamp-1 text-[8px]  md:text-lg leading-[130%]">
          {data.title}
        </h3>
        <div className="flex items-center  mt-4.5  gap-1.5 mb-4 ">
          {data.author.image ? (
            <div className="w-5 h-5 md:w-10 md:h-10 relative">
              <Image
                className="rounded-full "
                fill
                src={data.author.image}
                alt={`${data.author.name}'s profile picture`}
              />
            </div>
          ) : (
            <div className="size-5 md:size-10 rounded-full bg-grey flex items-center justify-center text-[6px] md:text-xs font-medium">
              {getInitials(data.author.name || "")}
            </div>
          )}
          <div>
            <p className="text-[8px] font-normal md:text-sm leading-[130%] mb-0.5">
              {data.author.name}
            </p>
            <p className="text-grey text-[8px] md:text-sm leading-[130%]">
              {data.institution}
            </p>
          </div>
        </div>
        {/* stats section */}
        <div className="flex items-center py-2 gap-2  mb-1.5 justify-between lg:justify-around lg:gap-12.5  pr-2">
          <div className="flex items-center gap-2 sm:gap-6 md:gap-12.5">
            <Like documentId={data.id as string} initialLiked={isLiked} initialCount={data.likes} />
            <div className="flex items-end gap-0.75">
              <FaRegComment className="cursor-pointer text-black w-2.25 h-2.25 md:w-3.5 md:h-3.5 lg:w-4.5 lg:h-5" />
              <small className="text-[6.74px] md:text-sm">
                {data._count.commentRecords}
              </small>
            </div>
            <div className="flex items-end gap-0.75">
              <MdOutlineFileDownload className="cursor-pointer text-black w-2.25 h-2.25 md:w-3.5 md:h-3.5 lg:w-4.5 lg:h-5" />
              <small className="text-[6.74px] md:text-sm">
                {data?.downloads}
              </small>
            </div>
          </div>
          <FaRegBookmark className=" cursor-pointer md:w-3.5! md:h-4.5! w-1.75! h-2.25!   text-primary" />
        </div>
      </div>
      <Button
        asChild
        variant="default"
        size="lg"
        className="w-full md:h-9 lg:h-11 h-5.25 text-[7.7px] mt-3 mb-1.5 flex items-center justify-center  font-medium md:text-[16px] leading-[130%]"
      >
        <Link href={`/publication/${data.id}`}>View Details</Link>
      </Button>
    </article>
  );
};

export default ResearchCard;
