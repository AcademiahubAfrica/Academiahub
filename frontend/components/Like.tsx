"use client";
import ClickSpark from "@/components/ClickSpark";
import { Heart } from "lucide-react";
import { useState } from "react";
import { FcLike } from "react-icons/fc";

interface LikeProps {
  data: {
    likes?: number;
  };
}

const Like = ({ data }: LikeProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const likeCount = data.likes || 0;
  
  return (
    <ClickSpark sparkColor="red">
      {!isLiked ? (
        <div className="flex items-end gap-0.75">
          <Heart
            className="cursor-pointer w-3.5 h-3.5 lg:w-4.5 lg:h-4.5"
            onClick={() => setIsLiked((prev) => !prev)}
          />

          <small>{likeCount}</small>
        </div>
      ) : (
        <div className="flex items-end gap-0.75">
          <FcLike
            className="cursor-pointer w-3.5 h-3.5 lg:w-4.5 lg:h-4.5"
            onClick={() => setIsLiked((prev) => !prev)}
          />

          <small>{isLiked && likeCount + 1}</small>
        </div>
      )}
    </ClickSpark>
  );
};

export default Like;