"use client";
import { useRef } from "react";
import { useSidebar } from "./SidebarContext";

const COMMIT_DX = 60;
const COMMIT_MAX_MS = 500;
const FLICK_DX = 20;
const FLICK_VELOCITY = 0.5;
const CANCEL_DX = -8;

const MobileSidebarSwipeZone = () => {
  const { openMobileSidebar, setOpenMobileSidebar } = useSidebar();
  const start = useRef<{ x: number; y: number; t: number } | null>(null);
  const cancelled = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (openMobileSidebar) return;
    const touch = e.touches[0];
    start.current = { x: touch.clientX, y: touch.clientY, t: Date.now() };
    cancelled.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!start.current || cancelled.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - start.current.x;
    if (dx < CANCEL_DX) {
      cancelled.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!start.current || cancelled.current) {
      start.current = null;
      return;
    }
    const touch = e.changedTouches[0];
    const dx = touch.clientX - start.current.x;
    const dt = Date.now() - start.current.t;
    start.current = null;

    const committed = dx >= COMMIT_DX && dt <= COMMIT_MAX_MS;
    const flicked = dx >= FLICK_DX && dt > 0 && dx / dt >= FLICK_VELOCITY;

    if (committed || flicked) {
      setOpenMobileSidebar(true);
    }
  };

  return (
    <div
      aria-hidden
      className="fixed left-5 top-0 bottom-20 w-6 z-40 md:hidden"
      style={{ touchAction: "pan-y" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    />
  );
};

export default MobileSidebarSwipeZone;
