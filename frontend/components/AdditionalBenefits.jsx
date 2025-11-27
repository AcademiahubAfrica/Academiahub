import React from 'react';
import { Zap, Lock, Globe, TrendingUp, FileText, MessageCircle } from 'lucide-react';

// Benefits data
const additionalBenefits = [
  {
    id: 1,
    icon: Zap,
    title: "Lightning Fast",
    description: "Access publications in seconds with our optimized platform infrastructure."
  },
  {
    id: 2,
    icon: Lock,
    title: "Secure & Private",
    description: "Your data is encrypted and protected with industry-standard security measures."
  },
  {
    id: 3,
    icon: Globe,
    title: "Multi-University Network",
    description: "Access content from over 100 institutions across multiple countries."
  },
  {
    id: 4,
    icon: TrendingUp,
    title: "Track Progress",
    description: "Monitor your research journey and downloads with detailed analytics."
  },
  {
    id: 5,
    icon: FileText,
    title: "Plagiarism Check",
    description: "All submissions go through rigorous plagiarism detection before approval."
  },
  {
    id: 6,
    icon: MessageCircle,
    title: "Discussion Forums",
    description: "Engage in meaningful conversations with researchers and peers."
  }
];

const AdditionalBenefits = () => {
  return (
    <section className="w-full bg-gradient-to-b from-gray-100 to-gray-200 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Additional Benefits
          </h1>
          <p className="text-base md:text-lg text-gray-700 font-medium">
            Even more reasons to choose AcademiaHub for your academic research needs
          </p>
        </header>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {additionalBenefits.map((benefit) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={benefit.id}
                className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {/* Icon Circle */}
                <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center mb-6">
                  <IconComponent className="w-10 h-10 text-gray-900" strokeWidth={2} />
                </div>

                {/* Content */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AdditionalBenefits;