"use client";

import { useRouter, useParams } from "next/navigation";
import { useCallback } from "react";
import ReportForm from "@/components/user/publication/ReportForm";

export default function ReportPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const handleClose = useCallback(() => router.back(), [router]);

  return (
    <div className="w-full min-h-[80dvh] overflow-hidden flex justify-center items-center">
      <div className="relative z-10 bg-white text-black rounded-xl shadow-lg min-w-[320px] max-w-133.75 flex justify-center">
        <ReportForm documentId={id} onClose={handleClose} />
      </div>
    </div>
  );
}
