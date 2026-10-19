"use client";

import Link from "next/link";
import { ChevronDown, TableOfContents } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

// `id` must match a <section id> in the policy content.
export type PolicySection = { id: string; title: string };

type PolicyLayoutProps = {
  title: string;
  effectiveDate: string;
  navLabel: string;
  sections: PolicySection[];
  children: ReactNode;
};

// How far below the top a heading must pass to count as the current section.
const ACTIVE_OFFSET = 96;
// Gap left above a heading after a nav jump.
const JUMP_GAP = 24;

// Shared shell for the policy pages: header, section nav, scrolling articles.
const PolicyLayout = ({
  title,
  effectiveDate,
  navLabel,
  sections,
  children,
}: PolicyLayoutProps) => {
  const mainRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  // Mobile only: whether the topic list is open.
  const [navOpen, setNavOpen] = useState(false);
  // Keeps a clicked topic highlighted until the reader scrolls.
  const clickedIdRef = useRef<string | null>(null);

  // Scroll spy: highlight the last section scrolled past the top of the box.
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (clickedIdRef.current) return;
      const threshold = main.getBoundingClientRect().top + ACTIVE_OFFSET;
      let current: string | null = null;

      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) current = id;
      }

      // At the bottom, highlight the last section even if it's short.
      const atBottom =
        main.scrollTop + main.clientHeight >= main.scrollHeight - 2;
      if (atBottom && sections.length > 0) {
        current = sections[sections.length - 1].id;
      }

      setActiveId(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Real input, not "scroll": a nav click's smooth scroll fires "scroll" too.
    const releaseClick = () => {
      if (!clickedIdRef.current) return;
      clickedIdRef.current = null;
      onScroll();
    };
    const userScrollEvents = ["wheel", "touchstart", "keydown"] as const;

    update();
    main.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    for (const type of userScrollEvents) {
      window.addEventListener(type, releaseClick, { passive: true });
    }
    return () => {
      main.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      for (const type of userScrollEvents) {
        window.removeEventListener(type, releaseClick);
      }
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sections]);

  // Scroll only the box; a hash jump would scroll the page too.
  const jumpTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    clickedIdRef.current = id;
    setActiveId(id);
    setNavOpen(false);
    const main = mainRef.current;
    const el = document.getElementById(id);
    if (!main || !el) return;
    event.preventDefault();
    main.scrollTo({
      top:
        el.getBoundingClientRect().top -
        main.getBoundingClientRect().top +
        main.scrollTop -
        JUMP_GAP,
      behavior: "smooth",
    });
    history.replaceState(null, "", `#${id}`);
  };

  const activeTitle = sections.find((s) => s.id === activeId)?.title;

  return (
    <div className="bg-slate-50 font-sans p-4 md:p-8 text-slate-800">
      {/* Fixed height so the articles scroll inside. Full height on lg+ so the
          side nav fits. */}
      <div className="mx-auto flex flex-col h-[70dvh] md:h-[75dvh] lg:h-[calc(100dvh-4rem)] overflow-hidden bg-white shadow-sm border border-slate-200 rounded-xl max-w-6xl">
        {/* Header Section */}
        <header className="shrink-0 border-b border-slate-100 p-5 md:px-12 md:py-8 bg-white">
          <h1 className="text-xl md:text-3xl font-bold text-slate-900">
            AcademiaHub Africa
          </h1>
          <h2 className="text-base md:text-xl font-semibold text-slate-700 mt-1">
            {title}
          </h2>
          <p className="mt-1 md:mt-4 text-sm text-slate-500">
            Effective Date: {effectiveDate}
          </p>
        </header>

        <div className="flex flex-col lg:flex-row flex-1 min-h-0">
          {/* Section Navigation: a dropdown on mobile, a side column on lg+ */}
          <aside className="relative shrink-0 lg:w-80 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/50">
            <button
              type="button"
              onClick={() => setNavOpen((open) => !open)}
              aria-expanded={navOpen}
              aria-controls="policy-nav"
              className="lg:hidden flex w-full items-center gap-3 px-5 py-3 text-left text-sm"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                <TableOfContents className="size-4" aria-hidden />
              </span>
              <span className="min-w-0 flex-1 truncate">
                {activeTitle ? (
                  <>
                    <span className="sr-only">{navLabel}: </span>
                    <span className="font-semibold text-blue-700">
                      {activeTitle}
                    </span>
                  </>
                ) : (
                  <span className="font-bold text-slate-500 uppercase tracking-widest text-xs">
                    {navLabel}
                  </span>
                )}
              </span>
              <ChevronDown
                className={`size-4 shrink-0 text-slate-500 transition-transform ${navOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>

            <nav
              id="policy-nav"
              aria-label={navLabel}
              className={`${navOpen ? "block" : "hidden"} lg:block absolute lg:static inset-x-0 top-full z-30 max-h-[60vh] lg:max-h-none overflow-y-auto lg:overflow-visible bg-white lg:bg-transparent border-b lg:border-0 border-slate-200 shadow-lg lg:shadow-none px-5 py-4 lg:px-8 lg:py-6`}
            >
              <p className="hidden lg:block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                {navLabel}
              </p>
              <ul className="space-y-0.5">
                {sections.map((section) => {
                  const isActive = section.id === activeId;
                  return (
                    <li key={section.id}>
                      <Link
                        href={`#${section.id}`}
                        onClick={(event) => jumpTo(event, section.id)}
                        aria-current={isActive ? "location" : undefined}
                        className={`block text-sm leading-snug py-1.5 lg:py-1 pl-3 -ml-3 border-l-2 rounded-r transition-colors ${
                          isActive
                            ? "border-blue-600 bg-blue-50 text-blue-700 font-semibold"
                            : "border-transparent text-slate-600 hover:text-blue-600 hover:bg-slate-100"
                        }`}
                      >
                        {section.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Main Content. Line heights target p/li/h2/h3 directly because
              globals.css sets leading-[100%] on every element. */}
          <main
            ref={mainRef}
            className="flex-1 min-w-0 min-h-0 overflow-y-auto p-5 md:p-12 space-y-10 [&_:is(p,li)]:leading-7 [&_:is(h2,h3)]:leading-snug bg-white"
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default PolicyLayout;
