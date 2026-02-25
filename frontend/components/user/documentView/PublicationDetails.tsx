import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
const PublicationDetails = () => {
  return (
    <div className="bg-white border lg:px-4 lg:pb-8.75 pt-6.25 border-[#D9D9D9] rounded-[15px] p-3">
      {/* profile pic and name */}

      <div className="flex gap-1 mb-2.75 items-center">
        <Avatar className="size-10 lg:size-15">
          <AvatarImage src={""} />
          <AvatarFallback>
            <Skeleton className="size-10 lg:size-15" />
          </AvatarFallback>
        </Avatar>

        <div className="flex gap-0.5 items-start">
          <div className="">
            <h2 className="text-lg lg:text-xl font-medium lg:leading-6 leading-[130%]">
              Ochife ogechukwu
            </h2>
            <p className="text-sm text-grey font-normal lg:leading-4.5 leading-[130%]">
              University of Lagos
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

      <div className="relative rounded-[12px] w-full lg:h-[239px] mb-5.5">
        <Image
          src={"/assets/images/LandingPage/exploreImg-1.png"}
          alt="name"
          fill
          className="object-cover object-center rounded-[12px]"
        />
      </div>

      <h2 className="text-lg lg:text-xl font-medium lg:leading-6 leading-[130%]">
        Analysis of Renewable Energy Solutions in Nigeria
      </h2>

      <div className="mt-3 mb-3.75">
        <h3 className="text-lg mb-3  font-medium lg:leading-5 leading-[130%]">
          Abstract
        </h3>
        <p className="text-sm  font-normal lg:leading-4.5 leading-[130%]">
          Technical analysis of integrating solar and wind power into existing
          electrical grids. Proposes solutions for load balancing and energy
          storage optimization.
        </p>
      </div>
      <div className="lg:px-5.25 py-3.25 flex items-center justify-between mb-6.25">
        <span className="flex items-center gap-0.25">
          <p className="text-sm  font-normal lg:leading-4.5 leading-[130%]">
            Year:
          </p>
          <p className="text-sm  font-normal lg:leading-4.5 leading-[130%]">
            2024
          </p>
        </span>
        <span className="flex items-center gap-0.25">
          <p className="text-sm  font-normal lg:leading-4.5 leading-[130%]">
            Size:
          </p>
          <p className="text-sm  font-normal lg:leading-4.5 leading-[130%]">
            2.5MB
          </p>
        </span>
        <span className="flex items-center gap-0.25">
          <p className="text-sm  font-normal lg:leading-4.5 leading-[130%]">
            Downloads:
          </p>
          <p className="text-sm  font-normal lg:leading-4.5 leading-[130%]">
            100
          </p>
        </span>
      </div>
      <div className="flex items-center  gap-5 lg:mb-5 justify-between">
        <Button className="basis-[48%]">Download Publication</Button>
        <Button
          className="basis-[48%] border-primary hover:bg-primary/85 hover:text-white "
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

        <p className="text-[6.74px] md:text-sm! text-regular  leading-4.5">
          1000 Likes
        </p>
      </div>
    </div>
  );
};

export default PublicationDetails;
