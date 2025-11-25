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

export default function Home() {
  return (
    <div className="flex flex-col  items-center bg-linear-to-b from-[#E9EBF3] to-white bg-zinc-50 font-sans -mx-6 px-6 pt-10">
      {/* Hero Section */}
      <section className="hero-section justify-between min-[904px]:flex min-[904px]:items-center mx-auto min-[1300px]:w-full min-[1560px]:pl-[72px]">
        <div className="hero-text flex flex-col gap-5 max-[404px]:w-[282px] max-lg:mx-auto min-[904px]:w-[470px] min-[1300px]:w-[704px] min-[1560px]:w-[800px]">
          {/* Welcome Message */}
          <div className="flex gap-2 rounded-[40px] shadow-[0px_4px_4px] shadow-black/25 px-2 py-[9px] w-[187px] bg-white  h-[34px]">
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
          <h1 className="text-primary font-semibold text-[36px] min-[1300px]:text-[48px] leading-[130%]">
            Access and Share{" "}
            <span className="text-accent-normal">Approved</span> Publications
            with Ease
          </h1>
          <h4 className="text-[16px] min-[1300px]:text-[24px] font-medium leading-[130%]">
            Discover a vast library of quality academic publications and share
            your work with the community.{" "}
          </h4>
          {/* Buttons */}
          <div className="buttons flex max-[450px]:flex-col  gap-[29px]">
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
          <div>
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
            <p className="text-[14px] min-[1300px]:text-[16px] mt-2.5 leading-[130%] min-[1300px]:leading-[50px] text-primary font-normal">
              Be part of a Growing Academic Network
            </p>
          </div>
          {/* STATS */}
          <div className="stats flex gap-2.5 min-[904px]:gap-[27px] text-center">
            <div>
              <h1 className="max-[1300px]:font-semibold max-[1300px]:text-[36px] min-[1300px]:text-10 max-[1300px]:leading-[130%] min-[1300px]:leading-[21px] min-[1300px]:font-normal">
                500+
              </h1>
              <p className="max-[1300px]:text-[14px] min-[1300px]:text-[16px] leading-[130%] max-[1300px]:font-normal min-[1300px]:font-medium min-[1300px]:mt-2.5 ">
                Active Users
              </p>
            </div>
            <div>
              <h1 className="max-[1300px]:font-semibold max-[1300px]:text-[36px] min-[1300px]:text-10 max-[1300px]:leading-[130%]  min-[1300px]:leading-[21px] min-[1300px]:font-normal">
                1000+
              </h1>
              <p className="max-[1300px]:text-[14px] min-[1300px]:text-[16px] leading-[130%] max-[1300px]:font-normal min-[1300px]:font-medium min-[1300px]:mt-2.5  ">
                Projects available
              </p>
            </div>
            <div>
              <h1 className="max-[1300px]:font-semibold max-[1300px]:text-[36px] min-[1300px]:text-10 max-[1300px]:leading-[130%]  min-[1300px]:leading-[21px] min-[1300px]:font-normal">
                100+
              </h1>
              <p className="max-[1300px]:text-[14px] min-[1300px]:text-[16px] leading-[130%] min-[1300px]:mt-2.5 max-[1300px]:font-normal min-[1300px]:font-medium">
                Institutions
              </p>
            </div>
          </div>
        </div>
        <div>
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
              className="mt-16 sm:max-[904px]:w-[85%] w-[498px] max-[904px]mx-auto lg:max-[1560px]:w-[704px] lg:h-[651px] lg:-mt-10 lg:object-center min-[1560px]:w-full"
              src={"/assets/images/LandingPage/hero-img.png"}
              alt="Hero image"
              width={336}
              height={344}
            />
          </picture>
        </div>
      </section>
      <Explore />
      <ChooseUs />
      <HowItWorks />
      <LandingUserSay />
      <LandingAboutUs />
      <JoinUs />
    </div>
  );
}
