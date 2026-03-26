"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const StarRatings = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  function onClickRating(rating: number): void {
    setIsDisabled(false);
    setSelectedIndex(rating);
  }

  function onSubmit() {
    try {
      if (selectedIndex !== null) {
        toast.success(`Review sent: ${selectedIndex} stars`);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsDisabled(true);
      setSelectedIndex(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1 justify-center">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          const isActive =
            selectedIndex !== null && selectedIndex >= ratingValue;

          return (
            <Image
              key={index}
              onClick={() => onClickRating(ratingValue)}
              alt={`star ${ratingValue}`}
              src={`/assets/images/ratings/star${ratingValue}.svg`}
              height={44}
              width={44}
              className={`hover:cursor-pointer transition-all ${
                isActive
                  ? "border border-accent scale-110"
                  : "border-0 scale-100"
              } rounded-md`}
            />
          );
        })}
      </div>

      <Button disabled={isDisabled} onClick={onSubmit} className="w-full">
        Submit Rating
      </Button>
    </div>
  );
};

export default StarRatings;
