import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Tracks whether an element's content overflows its box (i.e. is visually
 * truncated by `truncate`, `line-clamp-*`, or `overflow: hidden`).
 *
 * Returns a callback ref to attach to the element and a boolean. The element
 * is re-measured on resize via a single `ResizeObserver`, so truncation stays
 * correct across breakpoints. The callback ref also re-attaches the observer if
 * the node remounts (e.g. when the element gets wrapped on truncation).
 */
export function useIsTruncated<T extends HTMLElement>() {
  const [isTruncated, setIsTruncated] = useState(false);
  const observerRef = useRef<ResizeObserver | null>(null);

  const measure = useCallback((node: T) => {
    setIsTruncated(
      node.scrollWidth > node.clientWidth ||
        node.scrollHeight > node.clientHeight,
    );
  }, []);

  const ref = useCallback(
    (node: T | null) => {
      observerRef.current?.disconnect();
      if (!node) return;
      measure(node);
      observerRef.current = new ResizeObserver(() => measure(node));
      observerRef.current.observe(node);
    },
    [measure],
  );

  useEffect(() => () => observerRef.current?.disconnect(), []);

  return { ref, isTruncated };
}
