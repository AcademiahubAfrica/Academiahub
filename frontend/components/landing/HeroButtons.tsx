
import { Button } from "../ui/button";
import Link from "next/link";

const HeroButtons = () => {
  return (
    <div className="buttons flex flex-col md:flex-row gap-2">
      
      {/* Mobile Buttons */}
      <div className="flex flex-col gap-2 md:hidden w-full">
        <Link href="/signup">
          <Button
            variant="default"
            size="lg"
            className="w-full h-11 bg-linear-to-r from-primary"
          >
            Join for Free
          </Button>
        </Link>

        <Link href="/login">
          <Button
            variant="secondary"
            size="lg"
            className="w-full h-11 border border-primary shadow-[0_5px_4px] shadow-[#E9EBF3]"
          >
            Log in
          </Button>
        </Link>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex gap-2 w-full">
        <Link href="/explore" className="w-full">
          <Button
            variant="default"
            size="lg"
            className="w-full h-11 bg-linear-to-r from-primary"
          >
            Start Exploring
          </Button>
        </Link>

        <Link href="/dashboard" className="w-full">
          <Button
            variant="secondary"
            size="lg"
            className="w-full h-11 border border-primary shadow-[0_5px_4px] shadow-[#E9EBF3]"
          >
            Share Publication
          </Button>
        </Link>
      </div>

    </div>
  );
};

export default HeroButtons;
