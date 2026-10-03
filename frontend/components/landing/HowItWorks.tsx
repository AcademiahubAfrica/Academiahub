// import { howItWorks } from "@/app/data/howItWorks";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";

const steps = [
  {
    heading: "Create your account",
    text: "Sign up for free with your university email and set up your academic profile in under two minutes.",
  },
  {
    heading: "Explore the library",
    text: "Browse thousands of publications by field, institution, or keyword. Save favourites to your personal shelf.",
  },
  {
    heading: "Connect & collaborate",
    text: "Connect with researchers by reaching out directly to authors of papers you love.",
  },
  {
    heading: "Publish your work",
    text: "Upload your own research and get instant visibility across the African academic community.",
  },
];
const HowItWorks = () => {
  return (
    <section className=" py-18 container flex flex-col lg:flex-row justify-between bg-linear-130 from-[#F2F2F2] from-65% to-primary/10">
      <div className="flex flex-col md:w-[90%] lg:w-full mx-auto lg:flex-row lg:basis-[52%] lg:-mt-6">
        <div className="space-y-2.5 md:space-y-4 lg:space-y-6 text-center lg:text-start mb-5.5 max-sm:max-w-[95%] max-md:max-w-[80%] max-md:px-4">
          <h4 className="uppercase font-medium text-xl md:text-2xl  text-black md:text-[#6B6B6B]">
            How It Works
          </h4>
          <h3 className="text-2xl leading-5 md:leading-14 font-semibold md:text-6xl">
            Discover, <span className="text-primary p-0 italic">Connect</span>{" "}
            and grow with ease.
          </h3>
          <p className="text-sm leading-4.5 md:text-2xl md:leading-7">
            Get started in minutes and access thousands of academic resources
            from various institutions.
          </p>

          <Link
            className={`${buttonVariants({ variant: "default" })}   py-5 hidden! md:flex w-55 duration-150 ease-in-out transition-all max-md:w-full`}
            href={"/signup"}
          >
            Get Started
          </Link>
        </div>
      </div>
      <div className="space-y-2 md:space-y-4 lg:space-y-8 lg:basis-[45%]  md:w-[90%] lg:w-full mx-auto ">
        {steps.map(({ heading, text }, index) => {
          const count = index + 1;
          return (
            <div className="flex gap-4 p-4" key={index}>
              <div className="size-10 md:size-12.5 shrink-0 rounded-full flex items-center justify-center bg-grey">
                <p className="text-base md:text-2xl">{count}</p>
              </div>

              <div className="md:max-w-100">
                <h4 className="text-lg md:text-2xl mb-1.75 md:mb-2.5 font-medium">
                  {heading}
                </h4>
                <p className="text-sm md:text-lg">{text}</p>
              </div>
            </div>
          );
        })}
        <div className="mt-4 block lg:hidden!">
          <Link
            className={`${buttonVariants({ variant: "default" })}   py-5 w-55 duration-150 ease-in-out transition-all max-md:w-full`}
            href={"/signup"}
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
