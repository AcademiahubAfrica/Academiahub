"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useRef, useCallback } from "react";
import ReportForm from "@/components/user/publication/ReportForm";

const BACKDROP_CLASS =
  "fixed inset-0 z-50 flex items-center justify-center p-10";
const OVERLAY_CLASS = "absolute inset-0 bg-slate-300/60 backdrop-blur-sm";

export default function ReportModal() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => router.back(), [router]);

  // Trap focus and handle Escape key
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handleClose]);

  return (
    <div className={BACKDROP_CLASS}>
      <div className={OVERLAY_CLASS} />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-title"
        aria-describedby="report-desc"
        tabIndex={-1}
        className="relative z-10 bg-white text-black rounded-xl shadow-lg min-w-[320px] max-w-133.75 flex justify-center outline-none"
      >
        <ReportForm documentId={id} onClose={handleClose} />
      </div>
    </div>
  );
}
