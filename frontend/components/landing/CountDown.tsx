"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MdOutlinePersonOutline } from "react-icons/md";
import Timer from "./useTimer";

const padZero = (num: number): string => num.toString().padStart(2, "0");

const CountDown = () => {
  const { timeLeft, isLaunched } = Timer();

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (isLaunched) {
    return null;
  }

  return (
    <main className="h-screen w-full bg-linear-to-r from-[#CFD9F5] to-white">
      <div className="flex flex-col gap-11 justify-center  h-full items-center px-4 py-12 max-w-6xl mx-auto">
        <h1 className="leading-[100%] tracking-normal mb-8  text-center text-5xl md:text-6xl lg:text-[96px] md:text-[120px]">
          Launching Soon
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
          <div
            className="flex flex-col gap-4 items-center p-2 md:p-6 "
            role="timer"
            aria-label="Days remaining"
          >
            <h2 className="leading-[100%]  backdrop-blur-sm p-2 md:p-4 shadow-xl tracking-widest text-6xl md:text-[72px] lg:text-[96px]    drop-shadow-md">
              {padZero(timeLeft.days)}
            </h2>
            <h3 className="leading-[100%] tracking-normal text-2xl md:text-3xl  uppercase">
              days
            </h3>
          </div>
          <div
            className="flex flex-col gap-4 items-center p-2 md:p-6  "
            aria-label="Hours remaining"
          >
            <h2 className="leading-[100%]  backdrop-blur-sm p-2 md:p-4 shadow-xl tracking-widest text-6xl md:text-[72px] lg:text-[96px]    drop-shadow-md">
              {padZero(timeLeft.hours)}
            </h2>
            <h3 className="leading-[100%] tracking-normal text-2xl md:text-3xl  uppercase">
              hours
            </h3>
          </div>
          <div
            className="flex flex-col gap-4 items-center p-2 md:p-6  "
            aria-label="Minutes remaining"
          >
            <h2 className="leading-[100%]  backdrop-blur-sm p-2 md:p-4 shadow-xl tracking-widest text-6xl md:text-[72px] lg:text-[96px]    drop-shadow-md">
              {padZero(timeLeft.minutes)}
            </h2>
            <h3 className="leading-[100%] tracking-normal text-2xl md:text-3xl  uppercase">
              minutes
            </h3>
          </div>
          <div
            className="flex flex-col gap-4 items-center p-2 md:p-6  "
            aria-label="Seconds remaining"
          >
            <h2 className="leading-[100%]  backdrop-blur-sm md:p-4  p-2 shadow-xl px-6 tracking-widest text-6xl md:text-[72px] lg:text-[96px]    drop-shadow-md">
              {padZero(timeLeft.seconds)}
            </h2>
            <h3 className="leading-[100%] tracking-normal text-2xl md:text-3xl  uppercase">
              seconds
            </h3>
          </div>
        </div>

        <p className="leading-[100%] tracking-normal text-2xl md:text-4xl text-center  ">
          We’ll let you know when we are Launching
        </p>

        <form
          onSubmit={handleNotify}
          className="w-full max-w-lg flex h-12.25 relative"
        >
          <Input
            name="email"
            type="email"
            placeholder="Enter your email address"
            className="h-full bg-white/70 backdrop-blur-sm rounded-2xl pl-12 pr-4 focus-visible:ring-0 rounded-r-none shadow-lg flex-1 border-0"
            required
          />
          <MdOutlinePersonOutline
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            size={20}
          />
          <Button
            type="submit"
            className="h-full rounded-2xl rounded-l-none px-8  shadow-lg  text-lg bg-primary hover:bg-primary/90"
          >
            Notify Me
          </Button>
        </form>
      </div>
    </main>
  );
};

export default CountDown;
