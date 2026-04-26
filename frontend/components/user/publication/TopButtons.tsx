import { Upload } from "lucide-react";
import Back from "../shared/Back";

const TopButtons = () => {
  return (
    <div className="flex items-center justify-between mb-2 md:mb-3.5 lg:mb-4.5">
      <Back />

      <div className="w-fit hidden lg:block bg-white p-3">
        <Upload className="" />
      </div>
    </div>
  );
};

export default TopButtons;
