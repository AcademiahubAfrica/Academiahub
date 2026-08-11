"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  BANNER_LIST,
  DEFAULT_BANNER_KEY,
  isBannerKey,
  type BannerKey,
} from "@/lib/profileBanner";
import ProfileBanner from "./ProfileBanner";

const ProfileBannerPicker = ({ bannerKey }: { bannerKey: string | null }) => {
  // `committed` is what the profile shows; `draft` is the in-dialog selection.
  const [committed, setCommitted] = useState<BannerKey>(() =>
    isBannerKey(bannerKey) ? bannerKey : DEFAULT_BANNER_KEY,
  );
  const [draft, setDraft] = useState(committed);

  // Reset on open, so Cancel/Escape/outside-click all discard the draft.
  const handleOpenChange = (open: boolean) => {
    if (open) setDraft(committed);
  };

  const handleSelect = async () => {
    if (draft === committed) return;

    const previous = committed;
    setCommitted(draft);

    try {
      const res = await fetch("/api/user/banner", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bannerKey: draft }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setCommitted(previous);
      toast.error("Failed to update banner");
    }
  };

  return (
    <AlertDialog onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          aria-label="Change profile banner"
          className="group w-full cursor-pointer"
        >
          <ProfileBanner bannerKey={committed}>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200">
              <span className="text-white text-sm font-medium tracking-wide bg-black/20 px-3 py-1.5 rounded-md backdrop-blur-xs">
                Change Banner
              </span>
            </div>
          </ProfileBanner>
        </button>
      </AlertDialogTrigger>

      {/* data-size="xl" is undefined on purpose — it dodges the data-[size=*]:max-w-xs rules that would outrank max-w-4xl. */}
      <AlertDialogContent
        data-size={"xl"}
        className="flex flex-col w-[calc(100%-2rem)] max-w-4xl max-h-[90dvh] border-2"
      >
        <div className="shrink-0">
          <AlertDialogTitle className="text-xl lg:text-4xl mb-2 font-semibold leading-tight lg:leading-10">
            Select a banner
          </AlertDialogTitle>
          <AlertDialogDescription>
            Choose a banner from the template that fits your profile
          </AlertDialogDescription>
        </div>

        {/* px-1 keeps the focus ring clear of the horizontal clip edge. */}
        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-hide px-1">
          <fieldset>
            <legend className="sr-only">Profile banner</legend>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {BANNER_LIST.map((banner) => (
                <label
                  key={banner.key}
                  className="flex cursor-pointer items-center flex-col gap-2"
                >
                  {/* Native radios give arrow-key navigation and grouping for free. */}
                  <input
                    type="radio"
                    name="profile-banner"
                    value={banner.key}
                    checked={draft === banner.key}
                    onChange={() => setDraft(banner.key)}
                    className="sr-only peer"
                  />
                  <span
                    className={`w-full h-32 md:h-40 rounded-2xl bg-cover bg-center transition-all duration-200 ease-out peer-active:scale-95 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-normal peer-focus-visible:ring-offset-2 ${
                      draft === banner.key
                        ? "border-4 border-primary-normal scale-98 shadow-md ring-2 ring-primary-normal/20"
                        : "border-4 border-transparent opacity-80 hover:opacity-100"
                    }`}
                    style={{ backgroundImage: `url(${banner.thumb})` }}
                  />
                  <span className="text-sm font-medium">{banner.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <AlertDialogFooter className="shrink-0">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSelect}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProfileBannerPicker;
