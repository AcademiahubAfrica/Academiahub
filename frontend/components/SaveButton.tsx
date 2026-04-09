"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

interface SaveButtonProps {
  documentId: string;
  initialSaved: boolean;
  variant?: "icon" | "button";
  onToggle?: (isSaved: boolean) => void;
}

const SaveButton = ({
  documentId,
  initialSaved,
  variant = "icon",
  onToggle,
}: SaveButtonProps) => {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    if (isPending) return;

    const wasSaved = isSaved;
    setIsSaved(!wasSaved);
    onToggle?.(!wasSaved);

    startTransition(async () => {
      try {
        const res = await fetch(`/api/documents/${documentId}/save`, {
          method: wasSaved ? "DELETE" : "POST",
        });

        if (!res.ok) {
          setIsSaved(wasSaved);
          onToggle?.(wasSaved);
        }
      } catch {
        setIsSaved(wasSaved);
        onToggle?.(wasSaved);
      }
    });
  };

  if (variant === "button") {
    return (
      <Button
        className=" border-primary h-7.5 md:h-11 hover:bg-primary/85 hover:text-white text-xs md:text-base"
        variant="outline"
        onClick={handleToggle}
        disabled={isPending}
      >
        {isSaved ? "Unsave" : "Save for later"}
      </Button>
    );
  }

  const Icon = isSaved ? FaBookmark : FaRegBookmark;

  return (
    <Icon
      className="cursor-pointer text-primary w-1.75 h-2.25 md:w-3.5 md:h-4.5"
      style={{ width: undefined, height: undefined }}
      onClick={handleToggle}
    />
  );
};

export default SaveButton;
