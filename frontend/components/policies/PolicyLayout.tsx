"use client";

import Link from "next/link";
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

// lg+: articles scroll in their own box. Below lg: the page scrolls.
const isBoxScrolling = (main: HTMLElement) =>
  getComputedStyle(main).overflowY === "auto" &&
  main.scrollHeight > main.clientHeight + 1;

// Shared shell for the policy pages: header, section nav, scrolling articles.
const PolicyLayout = ({
  title,
  effectiveDate,
  navLabel,
  sections,
  children,
}: PolicyLayoutProps) => {
  const headerRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  // Keeps a clicked topic highlighted until the reader scrolls.
  const clickedIdRef = useRef<string | null>(null);

  // Track header height so jumps land below the sticky header.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const observer = new ResizeObserver(() =>
      setHeaderHeight(header.offsetHeight),
    );
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  // Scroll spy: highlight the last section scrolled past the top.
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (clickedIdRef.current) return;
      const boxed = isBoxScrolling(main);
      const top = boxed ? main.getBoundingClientRect().top : headerHeight;
      const threshold = top + ACTIVE_OFFSET;
      let current: string | null = null;

      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) current = id;
      }

      // At the bottom, highlight the last section even if it's short.
      const atBottom = boxed
        ? main.scrollTop + main.clientHeight >= main.scrollHeight - 2
        : window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2;
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
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    for (const type of userScrollEvents) {
      window.addEventListener(type, releaseClick, { passive: true });
    }
    return () => {
      main.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      for (const type of userScrollEvents) {
        window.removeEventListener(type, releaseClick);
      }
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sections, headerHeight]);

  // In box mode, scroll only the box; a hash jump would scroll the page too.
  const jumpTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    clickedIdRef.current = id;
    setActiveId(id);
    const main = mainRef.current;
    const el = document.getElementById(id);
    if (!main || !el || !isBoxScrolling(main)) return;
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

  return (
    <div
      className="min-h-screen bg-slate-50 font-sans p-4 md:p-8 text-slate-800"
      style={
        {
          "--policy-header-h": `${headerHeight}px`,
        } as React.CSSProperties
      }
    >
      {/* lg+: one screen tall. No overflow-hidden below lg (breaks sticky). */}
      <div className="mx-auto bg-white shadow-sm border border-slate-200 rounded-xl max-w-6xl lg:flex lg:flex-col lg:h-[calc(100dvh-4rem)] lg:overflow-hidden">
        {/* Header Section */}
        <header
          ref={headerRef}
          className="sticky top-0 z-20 lg:static lg:shrink-0 border-b border-slate-100 p-6 md:px-12 md:py-8 bg-white rounded-t-xl"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            AcademiaHub Africa
          </h1>
          <h2 className="text-lg md:text-xl font-semibold text-slate-700 mt-1">
            {title}
          </h2>
          <div className="mt-2 md:mt-4 text-sm text-slate-500 space-y-1">
            <p>Effective Date: {effectiveDate}</p>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row lg:flex-1 lg:min-h-0">
          {/* Section Navigation */}
          <aside className="lg:w-80 lg:shrink-0 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/50">
            <nav aria-label={navLabel} className="p-8 lg:px-8 lg:py-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
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
                        className={`block text-sm leading-snug py-1 pl-3 -ml-3 border-l-2 rounded-r transition-colors ${
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
            className="flex-1 min-w-0 p-8 md:p-12 space-y-10 [&_:is(p,li)]:leading-7 [&_:is(h2,h3)]:leading-snug bg-white lg:overflow-y-auto [&_section[id]]:scroll-mt-[calc(var(--policy-header-h)+1.5rem)]"
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default PolicyLayout;
