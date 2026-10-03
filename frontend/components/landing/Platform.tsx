import { CircleCheck } from "lucide-react";

const Platform = () => {
  const platformBenefits = [
    "Peer-reviewed content",
    "Global academic network",
    "Secure and reliable platform",
    "Free access to resources",
  ];
  return (
    <section className="container">
      <h4 className="uppercase font-medium text-xl md:text-2xl  text-black md:text-[#6B6B6B] mb-5.5">
        PLATFORM
      </h4>

      <div className="flex items-center justify-center gap-4 lg:justify-between mb-9 text-center lg:text-start flex-col lg:flex-row">
        <div className="basis-[45%]">
          <h3 className="text-2xl leading-7 md:text-[46px] md:font-semibold md:leading-11 ">
            Everything you need, all in one workspace
          </h3>
        </div>
        <div className="basis-[45%] hidden md:block">
          <p className="text-[23px] font-medium text-[#6B6B6B] leading-6.5">
            Track your publications, monitor engagement manage collaborations
            and stay updated with academic activity through a clean and
            intuitive dashboard experience.
          </p>
        </div>
      </div>

      <div className="bg-primary text-white rounded-2xl py-11 px-8 flex items-center justify-between">
        <div className="basis-[40%]">
          <h4 className="mb-10 text-2xl leading-7 md:text-[46px] md:font-semibold md:leading-11 ">
            Join our growing community and get started now
          </h4>

          <ul className="space-y-2">
            {platformBenefits.map((item, index) => (
              <li className="flex items-center gap-1.5" key={index}>
                <CircleCheck size={16} aria-hidden />{" "}
                <p className="font-normal text-sm leading-[130%]">{item}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="basis-[55%] h-full"></div>
      </div>
    </section>
  );
};

export default Platform;
