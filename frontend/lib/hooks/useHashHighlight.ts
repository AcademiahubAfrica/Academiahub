import { useEffect } from "react";

// Hash targets must be present in the initial render — async-mounted targets won't be highlighted.
export const useHashHighlight = () => {
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });

        element.classList.add("highlight-target");

        setTimeout(() => {
          element.classList.remove("highlight-target");
        }, 2000);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);
};
