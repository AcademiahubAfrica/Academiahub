import { savedResearch } from "@/app/_types/saved";
import ResearchCard from "./ResearchCard";

interface CardSectionProps {
  displayData: savedResearch[];
}

const CardSection = ({ displayData }: CardSectionProps) => {
  return (
    <section className="grid grid-cols-2 gap-4   md:grid-cols-3">
      {displayData.map((data) => (
        <ResearchCard key={data.id} data={data} />
      ))}
    </section>
  );
};

export default CardSection;