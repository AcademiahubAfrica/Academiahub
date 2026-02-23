const EmptySection = ({ title, text }) => {
  return (
    <div className="flex flex-1 min-h-[70vh] rounded-2xl bg-white flex-col   items-center justify-center text-center  gap-2">
      <h5>{title}</h5>
      <small className="text-grey">{text}</small>
    </div>
  );
};

export default EmptySection;
