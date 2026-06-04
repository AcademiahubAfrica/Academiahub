"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsTruncated } from "@/lib/hooks/useIsTruncated";
import { cn } from "@/lib/utils";

export default function ExploreCardTitle({ title }: { title: string }) {
  const { ref, isTruncated } = useIsTruncated<HTMLHeadingElement>();

  const heading = (
    <h3
      ref={ref}
      tabIndex={isTruncated ? 0 : undefined}
      className={cn(
        "font-semibold text-lg text-gray-900 mb-4.5 line-clamp-2",
        isTruncated &&
          "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      {title}
    </h3>
  );

  if (!isTruncated) return heading;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{heading}</TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        {title}
      </TooltipContent>
    </Tooltip>
  );
}
