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
import Image from "next/image";
import { useState } from "react";

const bannerObject = [
  {
    isDefault: true,
    image: "",
    bgColor: "#1E3A8A",
  },
  {
    image: "/assets/images/user/banner/building.png",
    bgColor: "#B9DBD8",
    isDefault: false,
  },
  {
    image: "/assets/images/user/banner/write.png",
    bgColor: "#3495DA",
    isDefault: false,
  },
  {
    image: "/assets/images/user/banner/scale.png",
    bgColor: "#FFD29E",
    isDefault: false,
  },
  {
    image: "/assets/images/user/banner/art.png",
    bgColor: "#F3FA18",
    isDefault: false,
  },
  {
    image: "/assets/images/user/banner/books.png",
    bgColor: "#FFF3B0",
    isDefault: false,
  },
  {
    image: "/assets/images/user/banner/stethoscope.png",
    bgColor: "#61A3A8",
    isDefault: false,
  },
  {
    image: "/assets/images/user/banner/laptop.png",
    bgColor: "#64A861",
    isDefault: false,
  },
  {
    image: "/assets/images/user/banner/testTube.png",
    bgColor: "#B9C2DB",
    isDefault: false,
  },
];

const ProfileBannerPicker = ({ bannerId = 0 }: { bannerId: number }) => {
  const [cover, setCover] = useState(bannerObject[bannerId]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  function handleSelect(index: number) {
    setCover(bannerObject[index]);
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div
            className="group h-19.25 lg:h-36.25 relative rounded-t-xl cursor-pointer overflow-hidden transition-colors bg-no-repeat bg-position-[calc(100%-16px)_center] bg-size-[100px_auto] lg:bg-size-[200px_auto]"
            style={{
              backgroundImage: `url(${cover.isDefault ? null : cover.image})`,
              backgroundColor: `${cover.bgColor}`,
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
          <div className="shrink-0 ">
            <AlertDialogTitle className="text-xl lg:text-4xl mb-2 font-semibold leading-10">
              Select a banner
            </AlertDialogTitle>
            <AlertDialogDescription>
              Choose a banner from the template that fits your profile
            </AlertDialogDescription>
          </div>

          <div className="my-4 flex-1 overflow-y-auto no-scrollbar pr-2 grid grid-cols-2  md:grid-cols-3 gap-4">
            {bannerObject.map((banner, index) => {
              const position = index + 1;

              return (
                <div
                  className="flex w-full cursor-pointer items-center justify-center flex-col gap-2 "
                  onClick={() => setSelectedIndex(index)}
                  key={position}
                >
                  <div
                    className={`flex w-full items-center justify-center aspect-video h-32 md:h-40 rounded-2xl p-4 transition-all duration-200 ease-out active:scale-95 ${
                      selectedIndex === index
                        ? "border-4 border-primary-normal scale-98 shadow-md ring-2 ring-primary-normal/20"
                        : "border-4 border-transparent opacity-80 hover:opacity-100"
                    }`}
                    style={{
                      backgroundColor: `${banner.bgColor}`,
                    }}
                  >
                    {!banner.isDefault && (
                      <Image
                        src={banner.image}
                        alt={`banner_0${position}`}
                        height={110}
                        width={150}
                        className="object-contain max-h-full"
                      />
                    )}
                  </div>
                  <h5 className="text-sm font-medium">
                    {banner.isDefault ? "Default" : `Banner_0${position}`}
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
