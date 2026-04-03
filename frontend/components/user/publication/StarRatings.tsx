"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const StarRatings = () => {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function onClickRating(rating: number): void {
    setRating(rating);
  }

  function onSubmit() {
    try {
      if (rating) {
        toast.success(`Review sent: ${rating} stars`);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setRating(0);
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
                className={`hover:cursor-pointer absoulte`}
              />
            </div>
          );
        })}
      </div>

      <Button disabled={!Boolean(rating)} onClick={onSubmit} className="w-full">
        Submit Rating
      </Button>
    </div>
  );
};

export default StarRatings;
