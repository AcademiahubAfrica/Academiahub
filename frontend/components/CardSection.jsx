import ResearchCard from "./ResearchCard";
const CardSection = ({ displayData }) => {
  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {displayData.map((data) => (
        <ResearchCard key={data.id} data={data} />
      ))}
    </section>
  );
};

export default CardSection;
