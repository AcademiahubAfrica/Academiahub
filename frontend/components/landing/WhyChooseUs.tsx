const reasons = [
  {
    id: "01",
    heading: "Community",
    text: "Connect with fellow students, share experiences, and collaborate on academic research projects.",
  },
  {
    id: "02",
    heading: "Top Rated Content",
    text: "Browse the highest-rated prublications and papers recommended by students and academic supervisors.",
  },
  {
    id: "03",
    heading: "Quality Assured",
    text: "All materials are verified for academic integrity and come from approved university submissions.",
  },
  {
    id: "04",
    heading: "Easy Upload",
    text: "Share your completed projects and seminar papers to help other students in their academic journey.",
  },
  {
    id: "05",
    heading: "Smart Search",
    text: "Find exactly what you need with our advanced search filters by subject, university, year, and topic.",
  },
  {
    id: "06",
    heading: "Instant Access",
    text: "Download high-quality academic materials instantly after creating your free student account.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-primary-darker py-20 text-white">
      <div className="container">
        <div className="flex flex-col max-w-166.25 mx-auto gap-2 items-center text-center mb-8 lg:mb-14">
          <h5 className="font-medium text-2xl hidden md:block">Features</h5>
          <h3 className="md:font-semibold md:text-[46px] text-xl font-medium my-2  ">
            Why Choose AcademehubAfrica
          </h3>
          <p className="text-sm md:text-xl font-medium">
            Search through thousands of publications by topic, university, or
            field of study
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-between">
          {reasons.map(({ id, heading, text }) => (
            <div
              className="2xl:min-h-76.25 md:min-h-65 basis-full md:basis-[48%] lg:basis-[32%]  flex flex-col justify-center p-2 rounded-xl  hover:bg-primary duration-150 ease-in-out transition-all"
              key={id}
            >
              <div className="flex md:flex-col max-sm:gap-4">
                <h4 className="text-3xl md:text-6xl md:leading-10 italic leading-8 md:mb-10">
                  {id}
                </h4>
                <div className="">
                  <h5 className="md:font-semibold text-xl font-medium leading-7 md:text-4xl mb-4 ">
                    {heading}
                  </h5>
                  <p className="text-sm leading-4.5 md:leading-7 md:text-xl">
                    {text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
