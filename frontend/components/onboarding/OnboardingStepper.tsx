"use client";

import { useState } from "react";
import OnboardingInfoSlide from "./OnboardingInfoSlide";
import OnboardingProfileForm from "./OnboardingProfileForm";

const slides = [
  {
    subheading: "Access theses, research papers, and publications across institutions.",
    body: "Explore a wide range of theses, research papers, and scholarly publications from institutions across Africa. Find relevant content faster and stay informed in your field.",
    image: "/assets/images/signup-image.png",
  },
  {
    subheading: "Upload and share your work with ease",
    body: "Publish your research and make it accessible to students, researchers, and professionals. Contribute to a growing knowledge base and increase the visibility of your work.",
    image: "/assets/images/signup-image.png",
  },
  {
    subheading: "Choose your areas of interest",
    body: "Select topics that match your field so we can recommend relevant research, publications, and content tailored to you.",
    image: "/assets/images/signup-image.png",
  },
];

interface OnboardingStepperProps {
  userName: string;
}

export default function OnboardingStepper({ userName }: OnboardingStepperProps) {
  const [step, setStep] = useState(0);

  if (step === 3) {
    return (
      <OnboardingProfileForm userName={userName} />
    );
  }

  const slide = slides[step];

  return (
    <OnboardingInfoSlide
      step={step}
      subheading={slide.subheading}
      body={slide.body}
      image={slide.image}
      onNext={() => setStep(step + 1)}
      onBack={step === 1 ? () => setStep(0) : undefined}
    />
  );
}
