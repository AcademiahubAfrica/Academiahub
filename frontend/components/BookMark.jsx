"use client";
import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
const BookMark = () => {
  const [isBookedMarked, setIsBookMarked] = useState(false);
  return (
    <>
      {isBookedMarked ? (
        <FaBookmark
          className="lg:absolute lg:bottom-10 cursor-pointer text-sm md:text-lg lg:right-4 text-primary"
          onClick={() => setIsBookMarked((prev) => !prev)}
        />
      ) : (
        <FaRegBookmark
          className="lg:absolute lg:bottom-10 cursor-pointer text-sm md:text-lg lg:right-4 "
          onClick={() => setIsBookMarked((prev) => !prev)}
        />
      )}
    </>
  );
};

export default BookMark;
