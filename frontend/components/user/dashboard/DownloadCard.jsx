import { mockData } from "@/app/data/exploreMockData";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IoTrashOutline } from "react-icons/io5";
import { RxUpload } from "react-icons/rx";

const DownloadCard = () => {
  return (
    <section className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {mockData.map((data) => (
        <article
          className=" relative  px-1 py-1 lg::py-3 lg:px-2 border rounded-[15px] border-[#D9D9D9]  flex flex-col gap-2.5 md:gap-4.5"
          key={data.id}
        >
          <span className="absolute right-3 top-3 md:top-5 z-30 md:right-5 rounded-full md:w-11 w-5.75 md:h-11 h-5.75 cursor-pointer bg-white flex items-center justify-center">
            <RxUpload className="md:w-4 md:h-4  w-2.25 h-2.25 " />
          </span>
          <div className="relative h-[118.48px] sm:h-61.5 w-full">
            <Image
              className="rounded-t-[15px] object-cover  max-w-86.75"
              fill
              src={data.imagePath}
              alt="Publication image"
            />
          </div>
          {/* content */}
          <div className="flex flex-col gap-2.5 w-full">
            <h3 className="font-medium text-[8px] capitalize  md:text-lg leading-[130%]">
              {data.name}
            </h3>
            <div className="flex items-center  gap-1.5 mb-2">
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
            {/* description  */}
            <div className="space-y-1">
              <span className="flex items-center text-[8px] md:text-sm gap-2">
                <small className="text-grey md:text-sm  leading-[130%]">
                  Department:
                </small>
                <small className="text-[8px] md:text-sm">
                  Electrical Engineering
                </small>
              </span>
              <span className="flex items-center text-[8px] md:text-sm! gap-2">
                <small className="text-grey md:text-sm   leading-[130%]">
                  Downloaded:
                </small>
                <small className="text-[8px] md:text-sm">Oct 5, 2025</small>
              </span>
              <span className="flex items-center text-[8px] md:text-sm gap-2">
                <small className="text-grey md:text-sm  leading-[130%]">
                  Size:
                </small>
                <small className="text-[8px] md:text-sm">28 mb</small>
              </span>
            </div>
          </div>
          <div className="my-2 flex justify-between items-center">
            <Button
              variant="default"
              size="lg"
              className="basis-[60%] md:h-9 h-7 flex items-center justify-center text-sm font-medium md:text-[16px] leading-[130%]"
            >
              View Details
            </Button>

            <IoTrashOutline className="text-red-500" size={24} />
          </div>
        </article>
      ))}
    </section>
  );
};

export default DownloadCard;
