"use client";
import { useSaved } from "@/app/_contexts/SavedContext";
import toast from "react-hot-toast";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
const BookMark = ({ data }) => {
  const toastOptions = {
    duration: 4000,
    className:
      "border border-slate-200 shadow-lg rounded-xl p-4 bg-white text-slate-800 font-regular text-xs",
  };
  const { addToSaved, removeFromSaved, saved } = useSaved();

  const isSaved = saved.some((item) => item.id === data.id);
  const toggleSave = () => {
    if (isSaved) {
      removeFromSaved(data.id);
      toast.success(`${data.name} Project has been removed from saved`, {
        ...toastOptions,
        iconTheme: { primary: "#ef4444", secondary: "#fff" },
      });
    } else {
      addToSaved(data);
      toast.success(`${data.name} has been added to saved`, {
        ...toastOptions,
      });
    }
  };

  return (
    <>
      {isSaved ? (
        <FaBookmark
          className=" cursor-pointer w-3.5! h-4.5! md:text-lg  text-primary"
          onClick={toggleSave}
        />
      ) : (
        <FaRegBookmark
          className=" cursor-pointer text-black/95 w-3.5! h-4.5! md:text-lg "
          onClick={toggleSave}
        />
      )}
    </>
  );
};

export default BookMark;
