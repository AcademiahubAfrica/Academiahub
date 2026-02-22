import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MobileSearch = ({ placeholder }: { placeholder: string }) => {
  return (
    <div className=" gap-4 h-5.25 mb-4 items-center  flex md:hidden">
      <Input
        className="rounded placeholder:text-[10px] text-[10px]  h-full  "
        placeholder={placeholder}
      />
      <Button className=" basis-2/10 text-[7px] h-full">Search</Button>
    </div>
  );
};

export default MobileSearch;
