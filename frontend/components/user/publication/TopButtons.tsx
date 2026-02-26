"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const TopButtons = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-2 md:mb-3.5 lg:mb-4.5">
      <Button
        className="flex items-center text-black hover:bg-[#F5F5F5] hover:text-black/85 p-2.5 rounded-[12px] bg-white"
        onClick={() => router.back()}
      >
        <Image
          src={"/assets/images/user/back.svg"}
          alt="back"
          width={18}
          height={17}
        />
        Back
      </Button>

      <div className="w-fit hidden lg:block bg-white p-3">
        <Upload className="" />
      </div>
    </div>
  );
};

export default TopButtons;
