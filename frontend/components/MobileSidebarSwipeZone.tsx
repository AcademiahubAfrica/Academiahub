"use client";
import { useEffect, useRef } from "react";
import { useSidebar } from "./SidebarContext";

const COMMIT_DX = 80;
const COMMIT_MAX_MS = 600;
const FLICK_DX = 30;
const FLICK_VELOCITY = 0.6;
const MAX_DY = 50;
const TOP_BAILOUT = 56;
const BOTTOM_BAILOUT = 80;

function shouldSkipTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  let el: Element | null = target;
  while (el) {
    if (el.hasAttribute("data-no-swipe-open")) return true;
    const tag = el.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
    if (el instanceof HTMLElement && el.isContentEditable) return true;
    const overflowX = window.getComputedStyle(el).overflowX;
    if (
      (overflowX === "auto" || overflowX === "scroll") &&
      el.scrollWidth > el.clientWidth
    ) {
      return true;
    }
    el = el.parentElement;
  }
  return false;
}

const MobileSidebarSwipeZone = () => {
  const { openMobileSidebar, setOpenMobileSidebar } = useSidebar();
  const openRef = useRef(openMobileSidebar);

  useEffect(() => {
    openRef.current = openMobileSidebar;
  }, [openMobileSidebar]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    let start: { x: number; y: number; t: number } | null = null;
    let cancelled = false;

    const onStart = (e: TouchEvent) => {
      if (openRef.current) return;
      const touch = e.touches[0];
      if (!touch) return;

      if (touch.clientY < TOP_BAILOUT) return;
      if (touch.clientY > window.innerHeight - BOTTOM_BAILOUT) return;
      if (shouldSkipTarget(e.target)) return;

      start = { x: touch.clientX, y: touch.clientY, t: Date.now() };
      cancelled = false;
    };

    const onMove = (e: TouchEvent) => {
      if (!start || cancelled) return;
      const touch = e.touches[0];
      if (!touch) return;
      const dy = Math.abs(touch.clientY - start.y);
      if (dy > MAX_DY) {
        cancelled = true;
      }
    };

    const onEnd = (e: TouchEvent) => {
      if (!start || cancelled) {
        start = null;
        cancelled = false;
        return;
      }
      const touch = e.changedTouches[0];
      if (!touch) {
        start = null;
        return;
      }
      const dx = touch.clientX - start.x;
      const dt = Date.now() - start.t;
      start = null;

      const committed = dx >= COMMIT_DX && dt <= COMMIT_MAX_MS;
      const flicked = dx >= FLICK_DX && dt > 0 && dx / dt >= FLICK_VELOCITY;

      if (committed || flicked) {
        setOpenMobileSidebar(true);
      }
    };

    const onCancel = () => {
      start = null;
      cancelled = false;
    };

    const opts: AddEventListenerOptions = { passive: true };
    window.addEventListener("touchstart", onStart, opts);
    window.addEventListener("touchmove", onMove, opts);
    window.addEventListener("touchend", onEnd, opts);
    window.addEventListener("touchcancel", onCancel, opts);

    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("touchcancel", onCancel);
    };
  }, [setOpenMobileSidebar]);

  return null;
};

export default MobileSidebarSwipeZone;
