import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const Search = () => {
  return (
    <div className="h-[163px] hidden mt-5.5 w-full bg-linear-to-r from-[#E9EBF3]! via-[#FFFBE6]  lg:flex items-center justify-center to-[#E9EBF3]">
      <div className="basis-[70%] gap-4 items-center  flex">
        <Input
          className="rounded-[40px] h-14 2xl:h-16.5"
          placeholder="Search for saved publications"
        />
        <Button className="2xl:h-14 h-11">Search</Button>
      </div>
    </div>
  );
};

export default Search;
