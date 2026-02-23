"use client";
import { useSaved } from "@/app/_contexts/SavedContext";
import { savedResearch } from "@/app/_types/saved";
import toast from "react-hot-toast";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

interface BookMarkProps {
  data: savedResearch;
}

const BookMark = ({ data }: BookMarkProps) => {
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
          className=" cursor-pointer md:w-3.5! md:h-4.5! w-1.75! h-2.25!   text-primary"
          onClick={toggleSave}
        />
      ) : (
        <FaRegBookmark
          className=" cursor-pointer text-black/95 md:w-3.5! md:h-4.5! w-1.75! h-2.25!  "
          onClick={toggleSave}
        />
      )}
    </>
  );
};

export default BookMark;
