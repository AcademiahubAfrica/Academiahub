import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const Search = ({ text = "saved" }) => {
  return (
    <div className="h-40.75 hidden mt-5.5 w-full bg-linear-to-r from-[#E9EBF3]! via-[#FFFBE6]  lg:flex items-center justify-center to-[#E9EBF3]">
      <div className="basis-[80%] gap-4 items-center  flex">
        <Input
          className="rounded-xl h-14 2xl:h-16.5"
          placeholder={`Search for ${text} publications`}
        />
        <Button className="md:h-14 basis-2/10 h-11">Search</Button>
      </div>
    </div>
  );
};

export default Search;
