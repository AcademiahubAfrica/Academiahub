import Link from "next/link";
import { buttonVariants } from "../ui/button";

const Mission = () => {
  return (
    <section className="bg-[url('/assets/images/LandingPage/missionBg.png')] flex items-center flex-col justify-center h-100 md:h-160 bg-cover container bg-top relative">
      <div className="absolute pointer-events-none inset-0 bg-linear-to-b from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.5)]"></div>

      <div className="text-white max-w-[95%] lg:max-w-264 px-2 text-center z-10">
        <h5 className="text-sm  md:text-2xl md:font-medium">OUR MISSION</h5>

        <h3 className="text-2xl font-medium my-3 leading-7 md:my-5 md:font-semibold md:text-4xl lg:my-7 lg:text-5xl">
          Building the future of Research platforms{" "}
        </h3>
        <p className="text-sm leading-4.5 md:leading-8 md:text-2xl md:font-medium lg:mt-4">
          Academiahub was created to help students, researchers, academics and
          professionals discover knowledge, share research, and collaborate
          across institutions and contribute to a stronger academic ecosystem
          across Africa.
        </p>

        <div className="mt-8 md:mt-5 w-fit mx-auto">
          <Link
            className={`${buttonVariants({ variant: "default" })}   py-5 w-55 duration-150 ease-in-out transition-all max-md:w-full`}
            href={"/about-us"}
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Mission;
