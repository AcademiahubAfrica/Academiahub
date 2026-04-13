"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  documentId: string;
  initialRating: number;
};

const StarRatings = ({ documentId, initialRating }: Props) => {
  const router = useRouter();
  const [rating, setRating] = useState(initialRating);
  const [tempRating, setTempRating] = useState(0);
  const [isPending, startTransition] = useTransition();

  function onClickRating(value: number): void {
    setRating(value);
  }

  async function onSubmit() {
    if (!rating) return;
    try {
      const res = await fetch(`/api/documents/${documentId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit review");
      }
      toast.success(`Review saved: ${rating} star${rating === 1 ? "" : "s"}`);
      startTransition(() => router.refresh());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  }

  async function onRemove() {
    try {
      const res = await fetch(`/api/documents/${documentId}/reviews`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to remove review");
      }
      toast.success("Review removed");
      setRating(0);
      startTransition(() => router.refresh());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1 justify-center">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          const full = tempRating
            ? tempRating >= ratingValue
            : rating >= ratingValue;
          return (
            <div
              className="relative w-8.75 h-8.75 lg:w-11.25 lg:h-11.25"
              key={index}
            >
              <Image
                onMouseEnter={() => setTempRating(ratingValue)}
                onMouseLeave={() => setTempRating(0)}
                onClick={() => onClickRating(ratingValue)}
                alt={`star ${ratingValue}`}
                src={`/assets/images/ratings/star${full ? "Full" : ""}${ratingValue}.svg`}
                fill
                className="hover:cursor-pointer"
              />
            </div>
          );
        })}
      </div>

      <Button
        disabled={!rating || isPending}
        onClick={onSubmit}
        className="w-full"
      >
        {isPending ? "Saving..." : initialRating > 0 ? "Update Rating" : "Submit Rating"}
      </Button>

      {initialRating > 0 && (
        <Button
          disabled={isPending}
          onClick={onRemove}
          variant="outline"
          className="w-full"
        >
          Remove Rating
        </Button>
      )}
    </div>
  );
};

export default StarRatings;
