import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Explore from "../components/ExploreSection";
import { userImg } from "./data/userImgData";
import ChooseUs from "../components/LandingChooseUs";
import LandingUserSay from "../components/LandingUserSay";
import LandingAboutUs from "../components/LandingAboutUs";
import JoinUs from "@/components/JoinUs";
import HowItWorks from "@/components/HowItWorks";
import LandingFaq from "@/components/LandingFaq";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-linear-to-b from-[#E9EBF3] to-white bg-zinc-50 font-sans">
      {/* Hero Section */}
      <section className="hero-section w-full max-w-[1440px] px-6 pt-12 pb-6 min-[904px]:px-12 min-[1300px]:px-16 min-[1560px]:px-20">
        <div className="w-full flex justify-center">
          <div className="min-[904px]:flex min-[904px]:items-center min-[904px]:justify-between min-[904px]:gap-12">
            <div className="hero-text flex flex-col gap-6 max-[404px]:w-[282px] max-lg:mx-auto min-[904px]:w-[470px] min-[1300px]:w-[704px] min-[1560px]:w-[800px]">
              {/* Welcome Message */}
              <div className="flex items-center gap-2 rounded-[40px] shadow-[0px_4px_4px] shadow-black/25 px-4 py-2 w-fit bg-white h-[34px]">
                <Image
                  src={"/assets/images/star-icon.png"}
                  alt="star icon"
                  width={16}
                  height={16}
                />
                <p className="text-[12px] leading-[130%] bg-[linear-gradient(90deg,#1e3a8a_0%,#f8bd00_15%,#1e3a8a_36%)] bg-clip-text text-transparent">
                  Welcome to Academiahub
                </p>
              </div>

              {/* Hero text */}
              <h1 className="text-primary font-semibold text-[36px] min-[1300px]:text-[48px] leading-[130%] mt-2">
                Access and Share{" "}
                <span className="text-accent-normal">Approved</span>{" "}
                Publications with Ease
              </h1>

              <h4 className="text-[16px] min-[1300px]:text-[24px] font-medium leading-[150%] text-gray-700 -mt-2">
                Discover a vast library of quality academic publications and
                share your work with the community.
              </h4>

              {/* Buttons */}
              <div className="buttons flex max-[450px]:flex-col gap-6 mt-2">
                <Link href={"/"}>
                  <Button
                    variant="default"
                    size="lg"
                    className="w-[180px] h-14 bg-linear-to-r from-primary to-[#182e6e] shadow-[0_5px_4px] shadow-blue-normal-hover"
                  >
                    Start Exploring
                  </Button>
                </Link>
                <Link href={"/"}>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-[180px] h-14 border border-primary shadow-[0_5px_4px] shadow-[#E9EBF3]"
                  >
                    Share Publication
                  </Button>
                </Link>
              </div>

              {/* Images */}
              <div className="mt-4">
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

              {/* STATS */}
              <div className="stats flex gap-8 min-[904px]:gap-12 text-left mt-6">
                <div>
                  <h1 className="max-[1300px]:font-semibold max-md:text-2xl max-[1300px]:text-[36px] min-[1300px]:text-10 max-[1300px]:leading-[130%] min-[1300px]:leading-[21px] min-[1300px]:font-normal text-primary">
                    500+
                  </h1>
                  <p className="max-[1300px]:text-[14px] min-[1300px]:text-[16px] leading-[130%] max-[1300px]:font-normal min-[1300px]:font-medium min-[1300px]:mt-2.5 text-gray-700">
                    Active Users
                  </p>
                </div>
                <div>
                  <h1 className="max-md:text-2xl max-[1300px]:font-semibold max-[1300px]:text-[36px] min-[1300px]:text-10 max-[1300px]:leading-[130%] min-[1300px]:leading-[21px] min-[1300px]:font-normal text-primary">
                    1000+
                  </h1>
                  <p className="max-[1300px]:text-[14px] min-[1300px]:text-[16px] leading-[130%] max-[1300px]:font-normal min-[1300px]:font-medium min-[1300px]:mt-2.5 text-gray-700">
                    Projects available
                  </p>
                </div>
                <div>
                  <h1 className="max-md:text-2xl max-[1300px]:font-semibold max-[1300px]:text-[36px] min-[1300px]:text-10 max-[1300px]:leading-[130%] min-[1300px]:leading-[21px] min-[1300px]:font-normal text-primary">
                    100+
                  </h1>
                  <p className="max-[1300px]:text-[14px] min-[1300px]:text-[16px] leading-[130%] min-[1300px]:mt-2.5 max-[1300px]:font-normal min-[1300px]:font-medium text-gray-700">
                    Institutions
                  </p>
                </div>
              </div>
            </div>

            <div className="hero-image">
              <picture>
                <source
                  media="(min-width: 1024px)"
                  srcSet="/assets/images/LandingPage/desktop-hero-img.png"
                />
                <source
                  media="(min-width: 904px)"
                  srcSet="/assets/images/LandingPage/tablet-hero-img.png"
                />
                <Image
                  className="mt-12 min-[904px]:mt-0 w-full max-w-[370px] sm:max-w-[524px] sm:max-[904px]:w-[87%] max-[904px]:mx-auto min-[904px]:max-w-[500px] lg:max-w-[752px] lg:h-auto min-[1560px]:max-w-[850px]"
                  src={"/assets/images/LandingPage/hero-img.png"}
                  alt="Hero image"
                  width={704}
                  height={651}
                />
              </picture>
            </div>
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
