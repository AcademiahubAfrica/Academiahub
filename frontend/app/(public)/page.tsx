import Explore from "../../components/landing/ExploreSection";
import HowItWorks from "@/components/landing/HowItWorks";
import LandingFaq from "@/components/landing/LandingFaq";
import Hero from "@/components/landing/Hero";
import CountUpSection from "@/components/landing/CountUpSection";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import Mission from "@/components/landing/Mission";
import MeetTheTeam from "@/components/landing/MeetTheTeam";
import JoinUs from "@/components/landing/JoinUs";
// import Platform from "@/components/landing/Platform";

export const revalidate = 300;

export default function Home() {
  return (
    <main className="flex flex-col items-center bg-[#F2F2F2]! font-sans">
      {/* new home page */}
      <Hero />
      <CountUpSection />
      <Explore limit={4} />
      <WhyChooseUs />
      <HowItWorks />
      {/* <Platform /> */}
      <Mission />
      <MeetTheTeam />
      <LandingFaq />
      <JoinUs />
    </main>
  );
}
