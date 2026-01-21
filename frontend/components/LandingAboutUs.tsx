import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const LandingAboutUs = () => {
  return (
    <div className="bg-[#E9EBF3] w-full">
      <div className="w-full py-8 lg:py-12">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <header className="mb-2 lg:mb-12">
            <h1 className="font-medium text-xl lg:text-[32px] leading-[130%] text-center mb-2">
              About Us
            </h1>
            <h3 className=" text-sm lg:text-2xl leading-[130%] text-center">
              Built by Students for Students
            </h3>
          </header>
          <div className="flex flex-col lg:flex-row lg:gap-12 xl:gap-16 items-center justify-between">
            <div className="flex flex-col gap-5 mb-8 lg:mb-0 w-full lg:max-w-160.25">
              <p className="font-normal text-sm leading-[130%]">
                We are on a mission to make research easier, smarter and more
                rewarding. Our Platform connects academics across various
                institutions of learning and by providing access to approved
                projects and write-ups while giving you the opportunity to earn
                by sharing your work and inspiring the future.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-1.5">
                  <Image
                    src={"/assets/images/LandingPage/checked-icon.png"}
                    alt="check-icon"
                    width={24}
                    height={24}
                  />{" "}
                  <p className="font-normal text-sm leading-[130%]">
                    Peer-reviewed content
                  </p>
                </li>
                <li className="flex items-center gap-1.5">
                  <Image
                    src={"/assets/images/LandingPage/checked-icon.png"}
                    alt="check-icon"
                    width={24}
                    height={24}
                  />{" "}
                  <p className="font-normal text-sm leading-[130%]">
                    Global academic network
                  </p>
                </li>
                <li className="flex items-center gap-1.5">
                  <Image
                    src={"/assets/images/LandingPage/checked-icon.png"}
                    alt="check-icon"
                    width={24}
                    height={24}
                  />{" "}
                  <p className="font-normal text-sm leading-[130%]">
                    Secure and reliable platform
                  </p>
                </li>
                <li className="flex items-center gap-1.5">
                  <Image
                    src={"/assets/images/LandingPage/checked-icon.png"}
                    alt="check-icon"
                    width={24}
                    height={24}
                  />{" "}
                  <p className="font-normal text-sm leading-[130%]">
                    Free access to resources
                  </p>
                </li>
              </ul>
              <Link href={'/about-us'}>
                <Button variant={"default"} size={"lg"} className="w-68 h-11">
                  Learn More
                </Button>
              </Link>
              
            </div>
            <div className="w-full lg:w-auto flex justify-center lg:justify-end">
              <picture className="w-full px-4 sm:px-6 md:px-8 lg:px-0">
                <source
                  media="(min-width:768px)"
                  srcSet="/assets/images/LandingPage/tablet-about-img.png"
                />
                <Image
                  className="w-full lg:max-w-125 xl:max-w-155 h-auto rounded-2xl"
                  src={"/assets/images/LandingPage/about-img.png"}
                  alt="A man and woman laughing in front of their Educational Institution"
                  width={333}
                  height={196}
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingAboutUs;
