import Image from "next/image";
import { getCategoryImage } from "@/lib/categoryImage";
import DownloadButton from "../shared/DownloadButton";
import { FaRegTrashAlt } from "react-icons/fa";
import DeletePublication from "../shared/DeletePublication";

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

interface DocumentData {
  id: string;
  title: string;
  category: string;
  institution: string;
  department?: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  createdAt: Date | string;
}

const OwnPublicationCard = ({
  documents = [],
}: {
  documents?: DocumentData[];
}) => {
  if (documents.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        To see a publication, upload one.
      </p>
    );
  }

  return (
    <section className="grid lg:px-6.25 grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
      {documents.map((data) => (
        <article
          className="relative bg-white px-1 py-1 lg:py-3 lg:px-2 border rounded-[15px] border-[#D9D9D9] flex flex-col gap-0.5 md:gap-4.5"
          key={data.id}
        >
          <div className="relative aspect-343/240 w-full">
            <Image
              className="rounded-t-[15px] object-cover"
              fill
              src={getCategoryImage(data.category || "")}
              alt="Publication image"
            />
          </div>
          {/* content */}
          <div className="flex flex-col gap-0.75 md:gap-2.5 w-full">
            <h3 className="font-medium text-[8px] line-clamp-1 capitalize md:text-lg leading-[130%]">
              {data.title}
            </h3>

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
          <div className="my-2 flex items-center justify-between">
            <DownloadButton
              documentId={data.id}
              fileUrl={data.fileUrl}
              fileName={data.fileName}
              className="basis-2/3"
            />
            <DeletePublication message="This action cannot be undone. This will permanently delete your Publication from our servers. Note that users who had downloaded copies prior, will still have access to their copies">
              <FaRegTrashAlt
                size={25}
                className="text-destructive cursor-pointer"
              />
            </DeletePublication>
          </div>
        </article>
      ))}
    </section>
  );
};

export default OwnPublicationCard;
