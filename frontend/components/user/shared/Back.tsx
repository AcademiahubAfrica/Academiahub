"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Back = () => {
  const router = useRouter();
  return (
    <Button
      type="button"
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
  );
};

export default Back;
