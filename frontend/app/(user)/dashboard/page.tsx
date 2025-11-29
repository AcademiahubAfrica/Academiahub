import { mockData } from "@/app/data/exploreMockData";
import CardSection from "@/components/CardSection";
import Image from "next/image";
import logoIcon from "@/public/assets/images/Aicon.png";
import ResearchFilters from "@/components/ResearchFilters";
import { userPagesMetadata } from "@/app/data/Exports";
export const metadata = userPagesMetadata.dashboard;
const Page = () => {
  return (
    <div className="w-full">
      <div className="h-[163px] hidden  w-full bg-linear-to-r from-primary-500! lg:flex justify-between to-primary-900">
        <h2 className="hero-text mt-5.5 ml-[27px] text-transparent bg-clip-text bg-linear-to-r from-white to-[#999999]">
          Discover academic research and projects{" "}
        </h2>

        <Image
          src={logoIcon}
          width={120}
          height={120}
          alt="academia hub's logo icon"
        />
      </div>

      <ResearchFilters />

      <h4 className="text-lg font-medium leading-[130%]">
        Research of the week
      </h4>

      <CardSection displayData={mockData} />
    </div>
  );
};

export default Page;
