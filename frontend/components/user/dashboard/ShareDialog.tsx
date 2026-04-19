"use client";
import { ResearchCardType } from "@/app/_types/documents";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getCategoryBackground, getCategoryOverlay } from "@/lib/categoryImage";
import { getInitials } from "@/lib/messaging/utils";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

interface ShareDialogProps {
  showShareDialog: boolean;
  setShowShareDialog: React.Dispatch<React.SetStateAction<boolean>>;
  data: ResearchCardType;
  shareData: { text: string; title: string; url: string };
}
type SocialPlatform = "x" | "facebook" | "linkedin" | "instagram";

const ShareDialog = ({
  showShareDialog,
  setShowShareDialog,
  data,
  shareData,
}: ShareDialogProps) => {
  function copyToClipboard() {
    try {
      navigator.clipboard.writeText(shareData.url);
      toast.success("text copied");
    } catch {
      toast.error("something went wrong");
    }
  }

  function getSocialIntent(platform: SocialPlatform) {
    const encodedText = encodeURIComponent(shareData.text);
    const encodedUrl = encodeURIComponent(shareData.url);

    const intents = {
      x: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&text=${encodedText}`,
      linkedin: `https://linkedin.com/sharing/share-offsite/?url=${encodedUrl}&shareActive&mini=true&text=${encodedText}`,
      instagram: `https://www.instagram.com/`,
    };

    const shareUrl = intents[platform];
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
      <DialogContent className="w-118.25 p-0 rounded-2xl text-white overflow-hidden">
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
                <div className="w-5 h-5 md:w-10 rounded-full border border-white md:h-10 relative">
                  <Image
                    className="rounded-full "
                    fill
                    src={data.author.image}
                    alt={`${data.author.name}'s profile picture`}
                  />
                </div>
              ) : (
                <div className="size-5 md:size-10 rounded-full bg-grey flex items-center justify-center text-[6px] md:text-xs font-medium">
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

        <div className="flex items-center text-black flex-col justify-center space-y-4 pb-8">
          <h5 className="text-black text-sm lg:text-lg font-medium leading-5">
            Share Your Project
          </h5>
          <div className="flex items-center gap-2">
            <Image
              alt="copy to clipboard"
              src={`/assets/images/user/copy.svg`}
              width={36}
              height={36}
              className="hover:scale-95 transition-all duration-150 cursor-pointer ease-in-out"
              onClick={copyToClipboard}
            />

            <Image
              alt="share to X"
              src={`/assets/images/user/x.svg`}
              width={36}
              height={36}
              className="hover:scale-95 transition-all duration-150 cursor-pointer ease-in-out"
              onClick={() => getSocialIntent("x")}
            />
            <Image
              alt="share to Linkedin"
              src={`/assets/images/user/linkedin.svg`}
              width={36}
              height={36}
              className="hover:scale-95 transition-all duration-150 cursor-pointer ease-in-out"
              onClick={() => getSocialIntent("linkedin")}
            />
            <Image
              alt="share to Instagram"
              src={`/assets/images/user/instagram.svg`}
              width={36}
              height={36}
              className="hover:scale-95 transition-all duration-150 cursor-pointer ease-in-out"
              onClick={() => getSocialIntent("instagram")}
            />
            <Image
              alt="share to facebook"
              src={`/assets/images/user/facebook.svg`}
              width={36}
              height={36}
              className="hover:scale-95 transition-all duration-150 cursor-pointer ease-in-out"
              onClick={() => getSocialIntent("facebook")}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
