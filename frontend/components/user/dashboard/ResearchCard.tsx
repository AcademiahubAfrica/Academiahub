"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Download, MessageCircle } from "lucide-react";
import Like from "@/components/Like";
import { ResearchCardType } from "@/app/_types/documents";
import SaveButton from "@/components/SaveButton";
import {
  CATEGORY_GRADIENTS,
  CATEGORY_LABELS,
  getCategoryBackground,
  getCategoryOverlay,
} from "@/lib/categoryImage";
import { getInitials } from "@/lib/messaging/utils";
import Link from "next/link";
import KebabIcon from "../shared/KebabIcon";

import { memo, useState, useTransition } from "react";
import toast from "react-hot-toast";
import ShareDialog from "./ShareDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ResearchCardProps = {
  data: ResearchCardType;
  isLiked: boolean;
  isOwnDocument: boolean;
  isSaved: boolean;
  showSaveButton?: boolean;
  onSaveToggle?: (isSaved: boolean) => void;
  onDelete?: (id: string) => void;
  priority?: boolean;
};

const ResearchCard = ({
  data,
  isOwnDocument,
  isLiked,
  isSaved,
  showSaveButton = true,
  onSaveToggle,
  onDelete,
}: ResearchCardProps) => {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isDeleting, startDeleteTransition] = useTransition();

  const [startGradientColor, endGradientColor] =
    CATEGORY_GRADIENTS[data?.category];

  const shareData = {
    title: `New Research: ${data?.title}`,
    text: `Check out this latest publication by ${data?.author?.name} on Academia Hub Africa. It explores key insights into ${data?.title}.`,
    url: `https://academiahubafrica.org/publication/${data?.id}`,
  };

  async function onShare() {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile && navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          toast.error(`Error: ${err.message}`);
        }
      }
    } else {
      setShowShareDialog(true);
    }
  }

  function handleConfirmDelete(e: React.MouseEvent) {
    e.preventDefault();
    startDeleteTransition(async () => {
      try {
        const res = await fetch(`/api/documents/${data.id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          toast.error(body.error || "Failed to delete publication");
          return;
        }
        setConfirmOpen(false);
        toast.success("Publication deleted");
        onDelete?.(data.id as string);
      } catch {
        toast.error("Failed to delete publication");
      }
    });
  }

  return (
    <>
      <article
        className=" relative w-full bg-white  rounded-[15px] border-[#D9D9D9]"
        key={data.id}
      >
        {/* research category */}

        <div
          className="relative h-35 lg:h-47  px-2.25 rounded-t-[12px] border w-full "
          style={{
            backgroundImage: `url('/assets/images/Aicon.png'), linear-gradient(to bottom right, ${startGradientColor} 75%, ${endGradientColor})`,
            backgroundSize: "contain",

            backgroundPosition: "right",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute rounded-t-[12px] inset-0  bg-linear-to-r from-[rgba(0,0,0,0.1)]/80 to-[rgba(0,0,0,0.4)] pointer-events-none" />
          <div className="flex items-center my-4 justify-between">
            <span className="border-grey border bg-white p-1 md:p-1.5 rounded-sm flex items-center justify-center ">
              <small className="text-[8px] md:text-xs text-black">
                {" "}
                {CATEGORY_LABELS[data.category] || data.category}
              </small>
            </span>
            <KebabIcon
              isOwnDocument={isOwnDocument}
              documentId={data.id as string}
              handleShare={onShare}
              onDeleteRequest={() => setConfirmOpen(true)}
            />
          </div>
          <h3 className="text-sm  md:text-base leading-[100%] lg:leading-5 font-bold text-white line-clamp-4">
            {data.title}
          </h3>
        </div>
        {/* content */}
        <div className=" mt-3  w-full px-1  lg:px-3 ">
          <div className="flex items-center   gap-1.5 mb-3 ">
            {data.author.image ? (
              <div className="w-5 h-5 md:w-10 md:h-10 relative">
                <Avatar className="size-5 md:size-10">
                  <AvatarImage src={data.author.image} />
                  <AvatarFallback className="text-[8px] md:text-sm">
                    {getInitials(data.author.name || "")}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <div className="size-5! md:size-10! rounded-full! bg-grey flex items-center justify-center text-[6px] md:text-xs font-medium">
                {getInitials(data.author.name || "")}
              </div>
            )}
            <div>
              <p className="text-[8px] font-normal md:text-sm leading-[130%] mb-0.5">
                {data.author.name}
              </p>
              <p className="text-grey text-[8px] md:text-sm leading-[130%]">
                {data.institution}
              </p>
            </div>
          </div>
          {/* stats section */}
          <div
            className={`flex items-center  justify-between  mb-1.5  lg:gap-2.5  `}
          >
            <Like
              documentId={data.id as string}
              initialLiked={isLiked}
              initialCount={data.likes}
            />
            <div className="flex items-center gap-0.75">
              <MessageCircle
                strokeWidth={1.5}
                className="cursor-pointer text-black w-2.75 h-2.75 md:w-3.5 md:h-3.5 lg:w-4.5 lg:h-5"
              />
              <small className="text-[6.84px] md:text-sm">
                {data._count.commentRecords}
              </small>
            </div>
            <div className="flex items-center gap-0.75">
              <Download
                strokeWidth={1.5}
                className="cursor-pointer text-black w-2.75 h-2.75 md:w-3.5 md:h-3.5 lg:w-4.5 lg:h-5"
              />
              <small className="text-[6.84px] md:text-sm">
                {data?.downloads}
              </small>
            </div>

            {showSaveButton && (
              <SaveButton
                documentId={data.id as string}
                initialSaved={isSaved}
                onToggle={onSaveToggle}
              />
            )}
          </div>
          <Button
            asChild
            variant="default"
            size="lg"
            className="w-full md:h-9 lg:h-11 h-5.25 text-[7.7px] mt-0.75 mb-1.5 flex items-center justify-center  font-medium md:text-[16px] leading-[130%]"
          >
            <Link href={`/publication/${data.id}`}>View Details</Link>
          </Button>
        </div>
      </article>

      <ShareDialog
        setShowShareDialog={setShowShareDialog}
        showShareDialog={showShareDialog}
        shareData={shareData}
        type={"Publication"}
      >
        <div
          className="w-full h-75 md:h-87.5 flex items-center justify-center flex-col  text-white   border-0 p-0 "
          style={{
            backgroundImage: `url(${getCategoryBackground(data.category)})`,
            backgroundPosition: " left bottom",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div
            className="h-[80%] flex relative flex-col justify-end  rounded-t-2xl  w-[80%]"
            style={{
              backgroundImage: `url(${getCategoryOverlay(data.category)})`,
              backgroundPosition: "top right",
              backgroundRepeat: "no-repeat",
              backgroundSize: "140%",
              objectFit: "cover",
            }}
          >
            <h3 className="absolute top-4 right-4 capitalize! text-white z-50">
              {data?.category.toLocaleLowerCase() === "project"
                ? "Final Year Project"
                : data?.category}
            </h3>
            <div className="flex items-center   py-4 px-2 gap-1.5 mb-3 ">
              {data.author.image ? (
                <div className="w-5 h-5 md:w-10 shrink-0 rounded-full border border-white md:h-10 relative">
                  <Image
                    className="rounded-full "
                    fill
                    sizes="(min-width: 768px) 40px, 20px"
                    src={data.author.image}
                    alt={`${data.author.name}'s profile picture`}
                  />
                </div>
              ) : (
                <div className="size-5 md:size-10 shrink-0 rounded-full bg-grey flex items-center justify-center text-[6px] md:text-xs font-medium">
                  {getInitials(data.author.name || "")}
                </div>
              )}
              <div>
                <p className="text-[8px] line-clamp-1 font-medium md:text-sm  leading-[130%] mb-0.5">
                  {data.title}
                </p>
                <p className="text-grey text-[8px] md:text-xs leading-[130%]">
                  {data.author.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ShareDialog>

      <AlertDialog
        open={confirmOpen}
        onOpenChange={(open) => {
          if (!isDeleting) setConfirmOpen(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this publication?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes &ldquo;{data.title}&rdquo; along with its
              likes, saves, and comments. This can&rsquo;t be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isDeleting}
              onClick={handleConfirmDelete}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

/* 
Memoized so a growing, paginated grid re-renders only newly appended cards:
appended pages preserve existing element identities and every prop here is a
primitive or a stable ref, so unchanged cards bail out of re-render.
*/
export default memo(ResearchCard);
