"use client";
import { useState } from "react";

export default function Description({ description }: { description: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isLongText = description.length > 350;
  const displayText = isExpanded ? description : description.slice(0, 350);

  return (
    <p className="text-xs md:text-sm font-normal lg:leading-4.5 leading-3.5">
      {displayText}

      {isLongText && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-1 font-bold  cursor-pointer"
        >
          {isExpanded ? "...show less" : "...read more"}
        </button>
      )}
    </p>
  );
}
