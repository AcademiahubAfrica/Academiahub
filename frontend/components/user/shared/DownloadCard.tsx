import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { getCategoryImage } from "@/lib/categoryImage";
import { getInitials } from "@/lib/messaging/utils";
import DownloadButton from "./DownloadButton";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const DownloadCard = ({
  data,
}: {
  data: {
    id: string;
    title: string;
    category: string;
    institution: string;
    department?: string;
    fileUrl: string;
    fileName: string;
    fileSize: number;
    downloads: number;
    createdAt: Date | string;
    author: { id: string; name: string | null; image: string | null };
  };
}) => {
  return (
    <article
      className="relative bg-white px-1 py-1 lg:py-3 lg:px-2 border rounded-[15px] border-[#D9D9D9] flex flex-col gap-0.5 md:gap-4.5"
      key={data.id}
    >
<div className="relative aspect-343/240 w-full">
        <Image
          className="rounded-t-[15px] object-cover"
          fill
          src={getCategoryImage(data.category)}
          alt="Publication image"
        />
      </div>
      {/* content */}
      <div className="flex flex-col gap-0.75 md:gap-2.5 w-full">
        <h3 className="font-medium text-[8px] capitalize md:text-lg leading-[130%]">
          {data.title}
        </h3>
        <div className="flex items-center md:gap-1.5 gap-0.5 mb-0.75 md:mb-2">
          <Avatar className="w-5 h-5 md:w-10 md:h-10">
            <AvatarImage src={data.author?.image || undefined} />
            <AvatarFallback className="text-[6px] md:text-xs text-white">
              {getInitials(data.author?.name || "")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-[8px] font-normal md:text-sm leading-[130%] mb-px md:mb-0.5">
              {data.author?.name}
            </p>
            <p className="text-grey text-[8px] md:text-sm leading-[130%]">
              {data.institution}
            </p>
          </div>
        </div>
        {/* description  */}
        <div className="md:space-y-1 space-y-px font-normal">
          {data.department && (
            <span className="flex items-center text-[8px] md:text-sm md:gap-2 gap-0.5">
              <small className="text-grey md:text-sm leading-[130%]">
                Department:
              </small>
              <small className="text-[8px] md:text-sm">
                {data.department}
              </small>
            </span>
          )}
          <span className="flex items-center text-[8px] md:text-sm! gap-2">
            <small className="text-grey md:text-sm leading-[130%]">
              Uploaded:
            </small>
            <small className="text-[8px] md:text-sm">
              {formatDate(data.createdAt)}
            </small>
          </span>
          <span className="flex items-center text-[8px] md:text-sm gap-2">
            <small className="text-grey md:text-sm leading-[130%]">
              Size:
            </small>
            <small className="text-[8px] md:text-sm">
              {formatFileSize(data.fileSize)}
            </small>
          </span>
        </div>
      </div>
      <div className="my-2">
        <DownloadButton
          documentId={data.id}
          fileUrl={data.fileUrl}
          fileName={data.fileName}
        />
      </div>
    </article>
  );
};

export default DownloadCard;
