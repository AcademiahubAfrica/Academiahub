
import { Button } from "../ui/button";
import Link from "next/link";

const HeroButtons = () => {
  return (
    <div className="buttons flex flex-col md:flex-row gap-2">

      {/* Mobile Buttons */}
      <div className="flex flex-col gap-2 md:hidden w-full">
        <Button
          asChild
          variant="default"
          size="lg"
          className="w-full h-11 bg-linear-to-r from-primary"
        >
          <Link href="/signup">Join Now</Link>
        </Button>

        <Button
          asChild
          variant="secondary"
          size="lg"
          className="w-full h-11 border border-primary shadow-[0_5px_4px] shadow-[#E9EBF3]"
        >
          <Link href="/login">Log in</Link>
        </Button>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex w-full lg:w-105 gap-3">
        <Button
          asChild
          variant="default"
          size="lg"
          className="w-full h-11 lg:w-50 bg-linear-to-r from-primary"
        >
          <Link href="/signup">Join Now</Link>
        </Button>

        <Button
          asChild
          variant="secondary"
          size="lg"
          className="w-full lg:w-50 h-11 border border-primary shadow-[0_5px_4px] shadow-[#E9EBF3]"
        >
          <Link href="/explore">Start Exploring</Link>
        </Button>
      </div>

    </div>
  );
};

export default HeroButtons;
