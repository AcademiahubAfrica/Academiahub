import Image from "next/image";
import Explore from "../../components/landing/ExploreSection";
import { userImg } from "../data/userImgData";
import ChooseUs from "../../components/landing/LandingChooseUs";
import LandingUserSay from "../../components/landing/LandingUserSay";
import LandingAboutUs from "../../components/landing/LandingAboutUs";
import JoinUs from "@/components/landing/JoinUs";
import HowItWorks from "@/components/landing/HowItWorks";
import LandingFaq from "@/components/landing/LandingFaq";
import HeroButtons from "@/components/landing/HeroButtons";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-linear-to-b from-[#E9EBF3] to-white bg-zinc-50 font-sans">
   <section className="hero-section w-full px-6 pt-12 pb-6 lg:pl-12 lg:pr-0 overflow-hidden">
  <div className="w-full flex flex-col lg:flex-row lg:items-center">

    {/* TEXT COLUMN */}
    <div className="hero-text flex flex-col gap-6 max-lg:mx-auto w-full lg:w-[45%] lg:flex-shrink-0 lg:pr-6">

      {/* Welcome Message */}
      <div className="flex items-center gap-2 rounded-[40px] shadow-[0px_4px_4px] shadow-black/25 px-4 py-2 w-fit bg-white h-8.5">
        <Image src="/assets/images/star-icon.png" alt="star icon" width={16} height={16} />
        <p className="text-[12px] leading-[130%] bg-[linear-gradient(90deg,#1e3a8a_0%,#f8bd00_15%,#1e3a8a_36%)] bg-clip-text text-transparent">
          Welcome to Academiahub
        </p>
      </div>

      {/* Hero Heading */}
      <h1 className="text-primary font-semibold text-[36px] min-[1300px]:text-[48px] leading-[130%] mt-2">
        Access and Share{" "}
        <span className="text-accent-normal">Approved</span>{" "}
        Publications with Ease
      </h1>

      <h4 className="text-[16px] min-[1300px]:text-[24px] font-medium leading-[150%] text-gray-700 -mt-2">
        Discover a vast library of quality academic publications and share
        your work with the community.
      </h4>

      <HeroButtons />

      {/* User Images */}
      <div className="mt-1">
        <div className="flex pl-10">
          {userImg.map((img) => (
            <Image
              className="-ml-10"
              key={img.id}
              src={img.imagePath}
              alt="users"
              width={60}
              height={60}
            />
          ))}
        </div>
        <p className="text-[14px] min-[1300px]:text-[16px] mt-3 leading-[130%] text-primary font-normal">
          Be part of a Growing Academic Network
        </p>
      </div>

      {/* Stats */}
      <div className="flex gap-4 min-[904px]:gap-12 text-left -mt-2">
        {[
          { value: "500+", label: "Active Users" },
          { value: "1000+", label: "Projects available" },
          { value: "100+", label: "Institutions" },
        ].map(({ value, label }) => (
          <div key={label}>
            <p className="font-semibold text-2xl md:text-[36px] min-[1300px]:text-[40px] leading-[130%]">
              {value}
            </p>
            <p className="text-sm min-[1300px]:text-[16px] leading-[130%] font-medium min-[1300px]:mt-2.5">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* IMAGE COLUMN — bleeds to right edge */}
    <div className="w-full lg:w-[55%] mt-12 lg:mt-0 flex items-center">
      <picture>
        <source
          media="(min-width: 1024px)"
          srcSet="/assets/images/LandingPage/desktop-hero-img.png"
        />
        <source
          media="(min-width: 640px)"
          srcSet="/assets/images/LandingPage/tablet-hero-img.png"
        />
        <Image
          className="w-full h-auto max-w-92.5 mx-auto sm:max-w-131 lg:max-w-none lg:mx-0 lg:w-full lg:rounded-l-2xl"
          src="/assets/images/LandingPage/hero-img.png"
          alt="Hero image"
          width={704}
          height={651}
        />
      </picture>
    </div>

  </div>
</section>
      <Explore limit={3} />
      <ChooseUs />
      <HowItWorks />
      <LandingUserSay />
      <LandingAboutUs />
      <LandingFaq />
      <JoinUs />
    </div>
  );
}
