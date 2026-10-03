"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./CountUpSection.module.css";

const stats = [
  {
    text: "Publications",
    value: 100,
  },
  {
    text: "Users",
    value: 100,
  },
  {
    text: "Institutions",
    value: 10,
  },
];
const CountUpSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setHasEnteredView(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-primary-darker">
      <div className="container w-screen justify-between py-4! md:p-10! flex items-center text-center text-white  ">
        {stats.map(({ text, value }, index) => (
          <div
            className={`space-y-1 w-1/3 ${index === 2 ? "border-0" : "border-r-[0.3px] border-white/40"}`}
            key={index}
          >
            <h3
              className="text-[32px] font-medium md:font-semibold md:text-[48px] lg:font-bold text-6xl"
              aria-label={`${value}+ ${text}`}
            >
              <span
                className={`${styles.count} ${hasEnteredView ? styles.started : ""}`}
                style={{ "--count-target": value } as CSSProperties}
                aria-hidden="true"
              >
                {value}+
              </span>
            </h3>
            <p className="font-medium text-sm md:text-base">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CountUpSection;
