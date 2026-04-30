"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

interface ShareDialogProps {
  showShareDialog: boolean;
  setShowShareDialog: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  shareData: { text: string; title: string; url: string };
  type: "Publication" | "Profile";
}
type SocialPlatform = "x" | "facebook" | "linkedin" | "instagram";

const ShareDialog = ({
  showShareDialog,
  setShowShareDialog,
  children,
  shareData,
  type,
}: ShareDialogProps) => {
  function copyToClipboard() {
    try {
      navigator.clipboard.writeText(shareData.url);
      toast.success(`${type} URL copied`);
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
      instagram: `https://www.instagram.com://story-camera`,
    };

    const shareUrl = intents[platform];
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
      <DialogContent className="w-118.25 p-0 rounded-2xl text-white overflow-hidden">
        {children}

        <div className="flex items-center text-black flex-col justify-center space-y-4 pb-8">
          <h5 className="text-black text-sm lg:text-lg font-medium leading-5">
            Share Your {type}
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
