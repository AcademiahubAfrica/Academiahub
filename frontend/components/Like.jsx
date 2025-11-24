"use client";
import ClickSpark from "@/components/ClickSpark";
import { Heart } from "lucide-react";
import { useState } from "react";
import { FcLike } from "react-icons/fc";
const Like = ({ data }) => {
  const [isLiked, setIsLiked] = useState(false);
  const likeCount = data.likes || 0;
  return (
    <ClickSpark sparkColor="red">
      {!isLiked ? (
        <div className="flex items-end gap-[3px]">
          <Heart
            className="cursor-pointer w-3.5 h-3.5 lg:w-[18px] lg:h-[18px]"
            onClick={() => setIsLiked((prev) => !prev)}
          />

          <small>{likeCount}</small>
        </div>
      ) : (
        <div className="flex items-end gap-[3px]">
          <FcLike
            className="cursor-pointer text-sm md:text-lg"
            onClick={() => setIsLiked((prev) => !prev)}
          />

          <small>{isLiked && likeCount + 1}</small>
        </div>
      )}
    </ClickSpark>
  );
};

export default Like;
