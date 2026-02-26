import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Document } from "@/app/_types/documents";
import Description from "./Description";
import { formatToMB } from "@/lib/utils";
const PublicationDetails = ({ details }: { details: Document }) => {
  return (
    <div className="bg-white border lg:px-4 lg:pb-8.75 pt-6.25 border-[#D9D9D9] rounded-[15px] p-3">
      {/* profile pic and name */}

      <div className="flex items-start justify-between">
        <div className="flex gap-1.5 md:gap-1 mb-2.75 items-center">
          <Avatar className="size-10 p-1 max-sm:border border-white lg:size-15">
            <AvatarImage src={""} />
            <AvatarFallback>
              <Skeleton className="size-10 lg:size-15" />
            </AvatarFallback>
          </Avatar>

          <div className="flex gap-0.5 items-start">
            <div className="max-sm:space-y-1">
              <h2 className="text-sm lg:text-xl font-medium lg:leading-6 leading-4.5">
                {details.author.name}
              </h2>
              <p className="text-xs md:text-sm text-grey font-normal lg:leading-4.5 leading-3.5">
                {details.institution}
              </p>
            </div>
            <Image
              alt="trust badge"
              src={"/assets/images/user/trust.svg"}
              width={24}
              height={24}
            />
          </div>
        </div>

        {/* message button for mobile */}
        <Button className="md:hidden p-1">Message</Button>
      </div>

      <div className="relative rounded-[12px] w-full h-[137px] md:h-[239px] mb-4.25 lg:mb-5.5">
        <Image
          src={"/assets/images/LandingPage/exploreImg-1.png"}
          alt="name"
          fill
          className="object-cover object-center rounded-[12px]"
        />
      </div>

      <h2 className="text-sm lg:text-xl font-medium lg:leading-6 leading-4.5">
        {details.title}
      </h2>

      <div className="mt-3 mb-2.5 md:mb-3.75">
        <h3 className="text-sm lg:text-lg mb-3max-sm:text-grey  font-medium lg:leading-5 leading-4.5">
          Abstract
        </h3>
        <Description description={details?.description} />
      </div>
      <div className="lg:px-5.25 px-1.25 py-3.25 flex items-center justify-between mb-2.5 md:mb-6.25">
        <span className="flex text-[10px] font-normal lg:leading-4.5 leading-[130%] md:text-sm items-center gap-0.25">
          <p className="max-sm:tex-grey  ">Year:</p>
          <p className="">{details.year}</p>
        </span>
        <span className="flex text-[10px] font-normal lg:leading-4.5 leading-[130%] md:text-sm items-center gap-0.25">
          <p className="max-sm:tex-grey ">Size:</p>
          <p className="">{formatToMB(details.fileSize)}</p>
        </span>
        <span className="flex text-[10px] font-normal lg:leading-4.5 leading-[130%] md:text-sm items-center gap-0.25">
          <p className="max-sm:tex-grey ">Downloads:</p>
          <p className="">{details.downloads}</p>
        </span>
      </div>
      <div className="flex items-center  gap-2 md:gap-5 mb-3 lg:mb-5 justify-between">
        <Button className="basis-[48%] text-xs md:text-base">
          Download Publication
        </Button>
        <Button
          className="basis-[48%] border-primary hover:bg-primary/85 hover:text-white text-xs md:text-base"
          variant={"outline"}
        >
          Save for later
        </Button>
      </div>

      <div className="flex items-end gap-1">
        <Image
          alt="like count"
          src={"/assets/images/user/like.svg"}
          width={20}
          height={18}
        />

        <p className="text-sm! text-regular  leading-4.5">
          {details.likes} Likes
        </p>
      </div>
    </div>
  );
};

export default PublicationDetails;
