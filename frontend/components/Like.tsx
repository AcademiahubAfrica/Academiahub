"use client";
import ClickSpark from "@/components/ClickSpark";
import { Heart } from "lucide-react";
import { useState, useTransition } from "react";

interface LikeProps {
  documentId: string;
  initialLiked: boolean;
  initialCount: number;
}

const Like = ({ documentId, initialLiked, initialCount }: LikeProps) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    if (isPending) return;

    const wasLiked = isLiked;
    // Optimistic update
    setIsLiked(!wasLiked);
    setLikeCount((prev) => (wasLiked ? prev - 1 : prev + 1));

    startTransition(async () => {
      try {
        const res = await fetch(`/api/documents/${documentId}/like`, {
          method: wasLiked ? "DELETE" : "POST",
        });

        if (!res.ok) {
          // Revert on failure
          setIsLiked(wasLiked);
          setLikeCount((prev) => (wasLiked ? prev + 1 : prev - 1));
        }
      } catch {
        // Revert on error
        setIsLiked(wasLiked);
        setLikeCount((prev) => (wasLiked ? prev + 1 : prev - 1));
      }
    });
  };

  return (
    <ClickSpark sparkColor="red">
      <div className="flex items-end gap-0.75" onClick={handleToggle}>
        <Heart
          className={`cursor-pointer w-2.25 h-2.25 md:w-3.5 md:h-3.5 lg:w-4.5 lg:h-4.5 transition-colors duration-200 ${
            isLiked ? "fill-[#fa2d37] text-[#fa2d37]" : ""
          }`}
        />
        <small className="text-[6.74px] md:text-sm">{likeCount}</small>
      </div>
    </ClickSpark>
  );
};

export default Like;
