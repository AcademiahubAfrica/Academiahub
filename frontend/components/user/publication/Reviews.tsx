import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import StarRatings from "./StarRatings";
import type { ReviewAggregate } from "@/lib/reviews/aggregate";

type Props = {
  documentId: string;
  aggregate: ReviewAggregate;
  userRating: number | null;
  canReview: boolean;
};

const Reviews = ({ documentId, aggregate, userRating, canReview }: Props) => {
  const avgDisplay = aggregate.total > 0 ? aggregate.average.toFixed(1) : "0.0";
  const reviewLabel = `${aggregate.total} ${
    aggregate.total === 1 ? "review" : "reviews"
  }`;
  const maxCount = Math.max(
    aggregate.distribution[1],
    aggregate.distribution[2],
    aggregate.distribution[3],
    aggregate.distribution[4],
    aggregate.distribution[5],
    1
  );

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
                {avgDisplay}
              </h2>
              <Image
                alt="stars"
                src={"/assets/images/star.svg"}
                height={23}
                width={23}
              />
            </div>
            <Badge variant={"default"} className="px-3.5 py-1.5">
              {reviewLabel}
            </Badge>
          </div>

          <div className="space-y-1 basis-[40%] ">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = aggregate.distribution[star as 1 | 2 | 3 | 4 | 5];
              const value = (count / maxCount) * 100;
              return (
                <div className="flex gap-px items-center " key={star}>
                  <small className="text-[#6A6A6A]">{star}</small>
                  <Image
                    alt="stars"
                    src={"/assets/images/star.svg"}
                    height={9}
                    width={9}
                  />
                  <Progress
                    bg={`bg-linear-170 from-[#1E3A8A] from-50% to-80% to-[#F8BD00]`}
                    value={value}
                    className="h-1.5 "
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {canReview && (
        <div className="px-8 space-y-2.5">
          <h3 className="text-center ">Share your feedback for this course</h3>
          <StarRatings
            documentId={documentId}
            initialRating={userRating ?? 0}
          />
        </div>
      )}
    </div>
  );
};

export default Reviews;
