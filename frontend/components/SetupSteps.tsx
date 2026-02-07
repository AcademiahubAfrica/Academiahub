import React from 'react';
import Image from 'next/image';
import { FaCheck } from "react-icons/fa6";

// Setup steps data
const setupSteps = [
  {
    id: 1,
    stepNumber: "Step 1",
    title: "Create Your Account",
    description: "Sign up with your student email to join our academic community. Verification is quick and easy.",
    imagePath: "/assets/images/stepone.png",
    imageAlt: "Create account form",
    features: [
      "Use your institutional email address",
      "Verify your student status",
      "Complete your profile in minutes",
      "Get instant access to the platform"
    ],
    imagePosition: "right"
  },
  {
    id: 2,
    stepNumber: "Step 2",
    title: "Search & Explore",
    description: "Use our powerful search tools to find projects and papers relevant to your studies and access materials instantly.",
    imagePath: "/assets/images/steptwo.png",
    imageAlt: "Search and explore interface",
    features: [
      "Advanced filtering by subject and year",
      "Search by university or author",
      "Browse trending publications",
      "Save favorites for later"
    ],
    imagePosition: "left"
  },
  {
    id: 3,
    stepNumber: "Step 3",
    title: "Share Your Work",
    description: "Upload your completed projects to help other students and contribute to the academic community.",
    imagePath: "/assets/images/stepthree.png",
    imageAlt: "Share your work interface",
    features: [
      "Submit your research papers",
      "Projects undergo quality review",
      "Receive feedback from peers",
      "Build your academic portfolio"
    ],
    imagePosition: "right"
  }
];

const SetupSteps = () => {
  return (
    <section className="w-full bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900">
            Join thousands of students already benefiting from our platform
          </h1>
        </header>

        {/* Steps */}
        <div className="space-y-24">
          {setupSteps.map((step) => (
            <div
              key={step.id}
              className={`flex flex-col ${
                step.imagePosition === 'right' 
                  ? 'lg:flex-row' 
                  : 'lg:flex-row-reverse'
              } items-center justify-between gap-8 lg:gap-96 w-full`}
            >
              {/* Text Content */}
              <div className="flex-1 space-y-6">
                {/* Step Badge */}
                <div className="inline-block bg-linear-to-r from-blue-800 to-blue-900 text-white px-8 py-3 rounded-full text-lg font-semibold">
                  {step.stepNumber}
                </div>

                {/* Title and Description */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h2>
                  <p className="text-gray-700 text-base leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-3">
                  {step.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FaCheck 
                        className="w-6 h-6 text-white bg-blue-900 rounded-full p-1.5 shrink-0 mt-0.5" 
                      />
                      <span className="text-gray-800 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image Card */}
              <div className="flex-1 w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-xl border-b-4 border-blue-900 p-8 min-h-125 flex flex-col items-center justify-center">
                  <div className="relative w-full h-64 mb-6">
                    <Image
                      src={step.imagePath}
                      alt={step.imageAlt}
                      fill
                      className="object-contain"
                      priority={step.id === 1}
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {step.description.split('.')[0]}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SetupSteps;