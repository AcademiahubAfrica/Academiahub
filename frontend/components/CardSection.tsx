import { savedResearch } from "@/app/_types/saved";
import ResearchCard from "./ResearchCard";

interface CardSectionProps {
  displayData: savedResearch[];
}

const CardSection = ({ displayData }: CardSectionProps) => {
  return (
    <section className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
      {displayData.map((data) => (
        <ResearchCard key={data.id} data={data} />
      ))}
    </section>
  );
};

export default CardSection;
