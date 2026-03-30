const TotalSaved = ({ count }: { count: number }) => {
  return (
    <h3 className="md:text-lg text-sm font-normal md:font-medium">
      Total Saved: {count}
    </h3>
  );
};

export default TotalSaved;
