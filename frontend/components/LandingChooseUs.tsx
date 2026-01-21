import React from "react";
import Image from "next/image";
import { whyChooseUs } from "../app/data/whyChooseUs";
const ChooseUs = () => {
  return (
    <section className="flex flex-col items-center min-[1290px]:mt-30 max-md:mt-26 md:mt-18 mb-25 px-4">
      <header className="text-center  min-[1253px]:mb-5">
        <h1 className="max-[1253px]:font-medium max-[1253px]:text-[20px] leading-[130%] max-[1253px]:mb-4 min-[1253px]:mb-5 min-[1253px]:text-[32px] min-[1253px]:font-bold">
          Why Choose Us
        </h1>
        <h3 className="font-medium max-[1253px]:text-sm leading-[130%] min-[1253px]:text-[24px] ">
          Find materials across multiple schools and topics
        </h3>
      </header>

      <div className="cards-container flex flex-wrap items-center justify-center max-md:gap-8 md:gap-18 mt-3 max-w-334">
        {whyChooseUs.map((choose) => (
          <div
            key={choose.id}
            className="p-5 bg-[#E9EBF3] flex flex-col items-center gap-5 max-lg:w-75 lg:w-89 text-center pt-11 pb-9 rounded-[15px]"
          >
            <Image src={choose.imagePath} alt="icon" width={100} height={100} />
            <div>
              <h2 className="font-medium  text-[20px]  leading-[130%] mb-3   ">
                {choose.reason}
              </h2>
              <p className="font-normal text-sm  leading-[130%]">
                {choose.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChooseUs;
