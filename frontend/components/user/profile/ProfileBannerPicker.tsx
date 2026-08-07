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

const bannerObject = [
  {
    id: 1,
    image: "/assets/images/user/banner/normalSm.png",
    cover: "/assets/images/user/banner/normal.png",
  },
  {
    id: 2,
    image: "/assets/images/user/banner/building.png",
    cover: "/assets/images/user/banner/buildingComponent.png",
  },
  {
    id: 3,
    image: "/assets/images/user/banner/write.png",
    cover: "/assets/images/user/banner/writeComponent.png",
  },
  {
    id: 4,
    image: "/assets/images/user/banner/scale.png",
    cover: "/assets/images/user/banner/scaleComponent.png",
  },
  {
    id: 5,
    image: "/assets/images/user/banner/art.jpeg",
    cover: "/assets/images/user/banner/artComponent.png",
  },
  {
    id: 6,
    image: "/assets/images/user/banner/book.jpeg",
    cover: "/assets/images/user/banner/bookComponent.png",
  },
  {
    id: 7,
    image: "/assets/images/user/banner/stethoscope.png",
    cover: "/assets/images/user/banner/stethoscopeComponent.png",
  },
  {
    id: 8,
    image: "/assets/images/user/banner/laptop.png",
    cover: "/assets/images/user/banner/laptopComponent.png",
  },
  {
    id: 9,
    image: "/assets/images/user/banner/lab.png",
    cover: "/assets/images/user/banner/labComponent.png",
  },
];

const ProfileBannerPicker = ({ bannerId = 1 }: { bannerId: number }) => {
  const initialBanner =
    bannerObject.find((b) => b.id === bannerId) || bannerObject[0];

  const [cover, setCover] = useState(initialBanner.cover);

  const initialIndex = bannerObject.findIndex((b) => b.id === initialBanner.id);
  const [selectedIndex, setSelectedIndex] = useState(
    initialIndex !== -1 ? initialIndex : 0,
  );

  function handleSelect(index: number) {
    const selectedBanner = bannerObject[index];
    if (selectedBanner) {
      setCover(selectedBanner.cover);
    }

    // mutation goes here
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div
            className="group h-19.25 lg:h-36.25 relative rounded-t-xl cursor-pointer overflow-hidden bg-position-[calc(100%-1px)_center] bg-size-[100px_auto] lg:bg-size-[200px_auto]"
            style={{
              backgroundImage: `url(${cover})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-white text-sm font-medium tracking-wide bg-black/20 px-3 py-1.5 rounded-md backdrop-blur-xs">
                Change Banner
              </span>
            </div>
          </div>
        </AlertDialogTrigger>

        <AlertDialogContent
          data-size={"xl"}
          className="flex flex-col max-w-4xl max-h-[90vh] border-2 p-6"
        >
          <div className="shrink-0">
            <AlertDialogTitle className="text-xl lg:text-4xl mb-2 font-semibold leading-10">
              Select a banner
            </AlertDialogTitle>
            <AlertDialogDescription>
              Choose a banner from the template that fits your profile
            </AlertDialogDescription>
          </div>

          <div className="my-4 flex-1 overflow-y-auto no-scrollbar pr-2 grid grid-cols-2 md:grid-cols-3 gap-4">
            {bannerObject.map((banner, index) => {
              return (
                <div
                  className="flex w-full cursor-pointer items-center justify-center flex-col gap-2"
                  onClick={() => setSelectedIndex(index)}
                  key={banner.id}
                >
                  <div
                    className={`flex w-full items-center justify-center aspect-video h-32 md:h-40 rounded-2xl p-4 transition-all duration-200 ease-out active:scale-95 ${
                      selectedIndex === index
                        ? "border-4 border-primary-normal scale-98 shadow-md ring-2 ring-primary-normal/20"
                        : "border-4 border-transparent opacity-80 hover:opacity-100"
                    }`}
                    style={{
                      backgroundImage: `url(${banner.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <h5 className="text-sm font-medium">
                    {banner.image.includes("normal")
                      ? "Default"
                      : `Banner_0${banner.id - 1}`}
                  </h5>
                </div>
              );
            })}
          </div>

          <AlertDialogFooter className="shrink-0">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleSelect(selectedIndex)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProfileBannerPicker;
