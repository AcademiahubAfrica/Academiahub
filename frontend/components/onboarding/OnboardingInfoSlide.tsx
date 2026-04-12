"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

interface OnboardingInfoSlideProps {
  step: number;
  subheading: string;
  body: string;
  image: string;
  onNext: () => void;
  onBack?: () => void;
}

export default function OnboardingInfoSlide({
  step,
  subheading,
  body,
  image,
  onNext,
  onBack,
}: OnboardingInfoSlideProps) {
  const isLastInfoSlide = step === 2;

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Left content */}
      <div className="flex-1 flex flex-col p-6 sm:p-10 lg:pt-12 lg:pl-22.5 lg:pr-16 lg:pb-10 relative">
        {/* Watermark background */}
        <div className="absolute pointer-events-none w-63.25 h-91 bottom-0 -left-6.25">
          <Image
            src="/assets/images/onboarding/watermark-icon.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <div className="relative z-10 flex flex-col flex-1">
          {/* Logo */}
          <div className="mb-12">
            <Image
              src="/assets/images/onboarding/onboarding-logo.svg"
              alt="AcademiaHub — Knowledge, Collaboration and Growth."
              width={284}
              height={69}
              className="w-auto"
            />
          </div>

          {/* Content */}
          <div className="max-w-140.75">
            <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-6">
              Welcome to AcademiaHub
            </h1>

            {/* Progress bar */}
            <div className="mb-6.75 relative">
              {/* Numbered circles */}
              <div className="relative flex mb-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="absolute -translate-x-1/2"
                    style={{ left: `${((2 * i + 1) / 6) * 100}%` }}
                  >
                    {i <= step && (
                      <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                        {i + 1}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Track */}
              <div className="relative w-full h-0.5 bg-gray-300 mt-9">
                <div
                  className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
                  style={{ width: `${((step + 1) / 3) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="text-base lg:text-2xl font-semibold text-gray-900 mb-7.5">
              {subheading}
            </h2>
            <p className="text-sm lg:text-base font-medium text-gray-900 leading-relaxed mb-7.5">
              {body}
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-4.75">
              {onBack && (
                <Button
                  type="button"
                  variant="outline"
                  className="lg:w-68 lg:h-14 rounded-lg text-lg leading-5 font-medium"
                  onClick={onBack}
                >
                  Back
                </Button>
              )}
              <Button
                type="button"
                className="lg:w-68 lg:h-14 rounded-lg text-lg leading-5 font-medium"
                onClick={onNext}
              >
                {isLastInfoSlide ? "Continue to profile" : "Next"}
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-900 mt-auto relative z-10">
          &copy; 2026 Academia Hub Africa. All rights reserved.
        </p>
      </div>

      {/* Right image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src={image}
          alt="Onboarding"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
