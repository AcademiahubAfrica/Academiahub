interface EmptySectionProps {
  title: string;
  text: string;
}

const EmptySection = ({ title, text }: EmptySectionProps) => {
  return (
    <div className="flex flex-1 min-h-[50vh] flex-col   items-center justify-center text-center  gap-2">
      <h5>{title}</h5>
      <small className="text-grey">{text}</small>
    </div>
  );
};

export default EmptySection;