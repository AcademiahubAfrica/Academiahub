import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { mockData } from "../app/data/exploreMockData";
import Link from "next/link";


interface ExploreSectionProps {
  limit?: number;
  showSearch?: boolean;
  showViewAllButton?: boolean;
}

const ExploreSection = ({ 
  limit, 
  showSearch = true, 
  showViewAllButton = true 
}: ExploreSectionProps) => {
  const displayData = limit ? mockData.slice(0, limit) : mockData;

  return (
    <section className="flex flex-col items-center min-[1290px]:mt-43.75">
      <header className="text-center mt-7.5 flex flex-col items-center gap-2">
        <h1 className="max-lg:font-medium max-lg:text-[20px]  leading-[130%] lg:font-bold lg:text-[32px]">
          Explore and Find What You Need
        </h1>
        <h3 className="max-lg:font-medium max-lg:text-sm max-lg:leading-[130%] lg:font-normal lg:text-[24px] ">
          Search through thousands of publications by topic, university or field
          of study
        </h3>
        
        {showSearch && (
          <div className="flex gap-[9.06px] items-stretch mt-9.5 mb-8 min-[1290px]:mb-15 min-[1290px]:w-318.75 min-[1290px]:justify-between">
            <input
              type="search"
              className="max-md:w-59 md:max-[1290px]:w-134 min-[1290px]:w-240  border-[#D9D9D9] border rounded-[40px] p-2.75 h-11 md:pt-5 pb-5"
              placeholder="Search for Projects, Schools...."
            />
            <Button
              variant="default"
              size="sm"
              className="h-11 md:w-37 md:h-14"
            >
              Search
            </Button>
          </div>
        )}
      </header>

      <div>
        <h3 className="font-medium text-[18px] leading-[130%] mb-5 md:pl-10 lg:pl-0 max-md:text-center">
          Suggested publications
        </h3>
        <div className="publication-list flex max-sm:flex-col sm:flex-row sm:flex-wrap items-center sm:justify-center gap-12.5">
          {displayData.map((data) => (
            <section
              className="max-[1290px]:w-76 min-[1290px]:w-91.7 py-3 px-2 rounded-[15px] border-[#D9D9D9] border flex flex-col max-[1290px]:gap-2.5 min-[1290px]:gap-4.5 "
              key={data.id}
            >
              <Image
                className="rounded-t-[15px] min-[1290px]:w-87"
                src={data.imagePath}
                width={290}
                height={246}
                alt="Publication image"
              />
              <div className="flex flex-col gap-2.5 w-74">
                <h4 className="font-medium  max-[1290px]:text-[16px] min-[1290px]:text-[18px] leading-[130%]">
                  {data.name}
                </h4>
                <div className="flex items-center gap-1.5">
                  <div>
                    <Image
                      className="rounded-full "
                      width={40}
                      height={40}
                      src={data.userPfp}
                      alt="user's profile picture"
                    />
                  </div>
                  <div>
                    <p className="text-sm leading-[130%]">
                      {data.username}
                    </p>
                    <p className="text-[#AEAEAE] text-[14px] leading-[130%]">
                      {data.institution}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                variant="default"
                size="lg"
                className="w-full font-medium text-[16px] leading-[130%]"
              >
                View Details
              </Button>
            </section>
          ))}
        </div>
      </div>
      
      {showViewAllButton && (
        <Link href="/explore">
          <Button
            variant={"outline2"}
            size={"lg"}
            className="w-68 border-primary text-primary h-11 font-medium text-[16px] leading-[130%] mt-9"
          >
            Explore full library
          </Button>
        </Link>
      )}
    </section>
  );
};

export default ExploreSection;