"use client";
import { useSaved } from "@/app/_contexts/SavedContext";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
const BookMark = ({ data }) => {
  const { addToSaved, removeFromSaved, saved } = useSaved();

  const isSaved = saved.some((item) => item.id === data.id);
  const toggleSave = () => {
    if (isSaved) {
      removeFromSaved(data.id);
    } else {
      addToSaved(data);
    }
  };

  return (
    <>
      {isSaved ? (
        <FaBookmark
          className="lg:absolute lg:bottom-10 cursor-pointer text-sm md:text-lg lg:right-4 text-primary"
          onClick={toggleSave}
        />
      ) : (
        <FaRegBookmark
          className="lg:absolute lg:bottom-10 cursor-pointer text-sm md:text-lg lg:right-4 text-primary"
          onClick={toggleSave}
        />
      )}
    </>
  );
};

export default BookMark;
