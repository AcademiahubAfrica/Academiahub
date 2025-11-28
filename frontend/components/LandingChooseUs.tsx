import React from "react";
import Image from "next/image";
import { whyChooseUs } from "../app/data/whyChooseUs";
const ChooseUs = () => {
  return (
    <section className="flex flex-col items-center min-[1290px]:mt-[175px] max-md:mt-[127px] md:mt-[73px] mb-[100px] px-4">
      <header className="text-center  min-[1253px]:mb-[19px]">
        <h1 className="max-[1253px]:font-medium max-[1253px]:text-[24px] leading-[130%] max-[1253px]:mb-4 min-[1253px]:mb-[19px] min-[1253px]:text-[32px] min-[1253px]:font-bold">
          Why Choose Us
        </h1>
        <h3 className="font-medium max-[1253px]:text-[18px] leading-[130%] min-[1253px]:text-[24px] ">
          Find materials across multiple schools and topics
        </h3>
      </header>

      <div className="cards-container flex flex-wrap items-center justify-center max-md:gap-[31px] md:gap-[70px] mt-3 max-w-[1337px]">
        {whyChooseUs.map((choose) => (
          <div
            key={choose.id}
            className="p-5 bg-[#E9EBF3] flex flex-col items-center gap-[19px] max-lg:w-[300px] lg:w-[355px] text-center pt-11 pb-[37px] rounded-[15px]"
          >
            <Image src={choose.imagePath} alt="icon" width={100} height={100} />
            <div>
              <h2 className="font-medium  text-[20px]  leading-[130%] mb-3   ">
                {choose.reason}
              </h2>
              <p className="font-normal text-[14px]  leading-[130%]">
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
