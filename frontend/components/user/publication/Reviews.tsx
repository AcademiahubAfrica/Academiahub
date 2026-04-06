import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import StarRatings from "./StarRatings";

const Reviews = () => {
  return (
    <div className="">
      <div className=" py-4.5  mb-3">
        <div className="flex items-center justify-center  gap-4">
          <div className="">
            <div className="flex items-center gap-px">
              <h2
                className="font-extrabold tracking-normal text-transparent  bg-clip-text bg-[linear-gradient(110deg,var(--color-primary)_0%_30%,#8B7C45_40%,var(--color-primary)_100%)]
 text-[54px]"
              >
                4.5
              </h2>
              <Image
                alt="stars"
                src={"/assets/images/star.svg"}
                height={23}
                width={23}
              />
            </div>
            <Badge variant={"default"} className="px-3.5 py-1.5">
              5755 reviews
            </Badge>
          </div>

          <div className="space-y-1 basis-[40%] ">
            {[...Array(5)].map((_, index) => (
              <div className="flex gap-px items-center " key={index}>
                <small className="text-[#6A6A6A]">{5 - index}</small>
                <Image
                  alt="stars"
                  src={"/assets/images/star.svg"}
                  height={9}
                  width={9}
                />
                <Progress
                  bg={`bg-linear-170 from-[#1E3A8A] from-50% to-80% to-[#F8BD00]`}
                  value={70 / index++}
                  className="h-1.5 "
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 space-y-2.5">
        <h3 className="text-center ">Share your feedback for this course</h3>

        <StarRatings />
      </div>
    </div>
  );
};

export default Reviews;
