import Image from "next/image";
import HeroImg from "@/public/assets/images/LandingPage/heroImage.png";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Book, Search, Users } from "lucide-react";

const attributeMap = [
  {
    icon: <Book size={18} />,
    heading: "Publish",
    text: "Share your research",
  },
  {
    icon: <Search size={18} />,
    heading: "Discover",
    text: "Find quality content",
  },
  {
    icon: <Users size={18} />,
    heading: "Connect",
    text: "Build collaborations",
  },
];

const Hero = () => {
  return (
    <section className="bg-[#F2F2F2]">
      <div className="container  pt-10 md:py-15">
        <div className="flex items-center flex-col justify-between gap-6 lg:flex-row">
          {/* text section */}
          <div className=" lg:basis-[52%]">
            <h1 className="font-bold text-4xl md:text-[48px] 2xl:text-[77px] 2xl:leading-22.5  md:leading-12.5  leading-10 mb-5 lg:mb-10">
              Access and Share{" "}
              <span className="text-primary lg:inline-block italic">
                free publications
              </span>
            </h1>
            <p className="font-medium text-base leading-6 2xl:text-2xl mb-5 lg:mb-8">
              Discover a vast library of quality academic publications and share
              your work with the community.{" "}
            </p>
            <div className="flex flex-col md:flex-row items-center gap-2  md:gap-5 mb-5 lg:mb-8">
              <Link
                className={`${buttonVariants({ variant: "default" })} bg-black! px-10  py-5 hover:bg-primary! duration-150 ease-in-out transition-all max-md:w-full`}
                href={"/signup"}
              >
                Join Now
              </Link>
              <Link
                className={`${buttonVariants({ variant: "default" })} px-10  py-5 duration-150 ease-in-out transition-all max-md:w-full`}
                href={"/explore"}
              >
                Start Exploring
              </Link>
            </div>
            <div className="flex items-center justify-between mb-4  md:mb-6">
              {attributeMap.map(({ icon, heading, text }) => (
                <div
                  className="flex gap-1 items-center md:items-start "
                  key={heading}
                >
                  <span className="rounded-2xl size-7.5 lg:size-8 flex items-center justify-center bg-primary-light">
                    {icon}
                  </span>

                  <div className="md:space-y-2">
                    <p className="font-bold text-base">{heading}</p>
                    <small className="text-sm hidden md:inline">{text}</small>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm md:text-base text-primary md:font-medium">
              Be part of a Growing Academic Network
            </p>
          </div>
          {/* image */}
          <div className="w-[95%] lg:basis-[45%]">
            <Image
              className="w-full"
              src={HeroImg}
              alt="academiahub africa's hero image"
              width={415}
              height={435}
              sizes="(min-width: 1120px) 45vw, (min-width: 720px) 45vw, 100vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
