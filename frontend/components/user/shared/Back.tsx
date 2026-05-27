"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Undo2 } from "lucide-react";

const Back = () => {
  const router = useRouter();
  return (
    <Button
      type="button"
      className="flex items-center text-black hover:bg-[#F5F5F5] hover:text-black/85 p-2.5 rounded-[12px] bg-white"
      onClick={() => router.back()}
    >
      <Undo2 size={18} strokeWidth={1.5} aria-hidden />
      Back
    </Button>
  );
};

export default Back;
