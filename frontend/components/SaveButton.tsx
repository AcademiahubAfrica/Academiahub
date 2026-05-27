"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

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

  return (
    <Bookmark
      strokeWidth={1.5}
      fill={isSaved ? "#1e3a8a" : "none"}
      className="cursor-pointer text-primary w-2.75 h-2.75 md:w-3.5 md:h-3.5 lg:w-4.5 lg:h-5"
      onClick={handleToggle}
    />
  );
};

export default SaveButton;
