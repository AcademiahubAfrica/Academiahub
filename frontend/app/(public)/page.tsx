import Image from "next/image";
import Explore from "../../components/landing/ExploreSection";
import ChooseUs from "../../components/landing/LandingChooseUs";
import LandingAboutUs from "../../components/landing/LandingAboutUs";
import JoinUs from "@/components/landing/JoinUs";
import HowItWorks from "@/components/landing/HowItWorks";
import LandingFaq from "@/components/landing/LandingFaq";
import HeroButtons from "@/components/landing/HeroButtons";
import HeroImg from "@/public/assets/images/LandingPage/desktop-hero-img.svg";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-white font-sans">
      <section className="hero-section w-full px-4 sm:px-6 pt-10 sm:pt-12 pb-6 lg:pl-12 lg:pr-0 overflow-hidden bg-linear-to-b from-[#E9EBF3] to-white">
        <div className="w-full flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-0">
          {/* TEXT COLUMN */}
          <div className="flex flex-col gap-5 sm:gap-6 w-full lg:w-1/2 xl:w-[45%] lg:shrink-0 lg:pr-8 max-lg:mx-auto">
            {/* Welcome Badge */}
            <div className="flex items-center gap-2 rounded-full shadow-sm shadow-black/25 px-4 py-1.5 w-fit bg-white">
              <Image
                src="/assets/images/star-icon.png"
                alt=""
                width={16}
                height={16}
                aria-hidden="true"
              />
              <p className="text-xs leading-snug bg-[linear-gradient(90deg,#1e3a8a_0%,#f8bd00_15%,#1e3a8a_36%)] bg-clip-text text-transparent whitespace-nowrap">
                Welcome to Academiahub
              </p>
            </div>

            {/* Hero Heading */}
            <h1 className="text-primary font-semibold text-3xl sm:text-4xl lg:text-[2.6rem] xl:text-[3rem] leading-tight mt-1">
              Access and Share{" "}
              <span className="text-accent-normal">Approved</span> Publications
              with Ease
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-medium leading-relaxed text-gray-700 -mt-1">
              Discover a vast library of quality academic publications and share
              your work with the community.
            </p>

            <HeroButtons />
          </div>

          {/* IMAGE COLUMN */}
          <div className="hidden lg:flex w-full lg:w-1/2 xl:w-[55%] items-center justify-end">
            <Image
              className="w-full h-auto lg:rounded-l-2xl"
              src={HeroImg}
              alt="Hero image"
              width={704}
              height={651}
              preload={true}
            />
          </div>
        </div>
      </section>

      <Explore limit={3} />
      <ChooseUs />
      <HowItWorks />
      <LandingAboutUs />
      <LandingFaq />
      <JoinUs />
    </div>
  );
}
