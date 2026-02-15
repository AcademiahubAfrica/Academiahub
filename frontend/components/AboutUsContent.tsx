import Image from 'next/image';
import { BiTargetLock } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';

const AboutUs = () => {
  return (
    <div className="w-full bg-gray-50">
      <div className="w-full py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          {/* Our Story Section */}
          <section className="mb-20">
            <div className="flex flex-col lg:flex-row lg:gap-12 xl:gap-16 items-center justify-between">
              {/* Text Content */}
              <div className="flex flex-col gap-6 mb-8 lg:mb-0 w-full lg:max-w-[641px]">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Our Story
                </h2>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                  AcademiaHub was born from a simple observation: students across different universities were struggling to access quality research materials, while countless valuable academic projects remained locked away in institutional archives.
                </p>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                  Founded in 2025 by a group of graduate students, we set out to create a platform that would break down these barriers. What started as a small repository has grown into a thriving community of researchers, students, and academics from over 100 institutions worldwide.
                </p>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                  Today, we&apos;re proud to facilitate knowledge sharing, foster collaboration, and support the academic journeys of thousands of students every day.
                </p>
              </div>

              {/* Image */}
              <div className="w-full lg:w-auto flex justify-center lg:justify-end">
                <picture className="w-full px-4 sm:px-6 md:px-8 lg:px-0">
                  <source
                    media="(min-width:768px)"
                    srcSet="/assets/images/LandingPage/tablet-about-img.png"
                  />
                  <Image
                    className="w-full lg:max-w-[500px] xl:max-w-[620px] h-auto rounded-2xl"
                    src={"/assets/images/LandingPage/about-img.png"}
                    alt="A man and woman laughing in front of their Educational Institution"
                    width={327}
                    height={219}
                  />
                </picture>
              </div>
            </div>
          </section>

          {/* Mission and Vision Section */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Mission Card */}
              <div className="bg-blue-50 rounded-3xl p-8 lg:p-10">
                <div className="w-14 h-14 bg-blue-900 rounded-2xl flex items-center justify-center mb-6">
                  <BiTargetLock className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                  To democratize access to quality academic research by creating a platform where students can freely share, discover, and collaborate on scholarly work across institutions and borders.
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-yellow-50 rounded-3xl p-8 lg:p-10">
                <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6">
                  <AiOutlineEye className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                  To become the world&apos;s leading academic collaboration platform, fostering a global community of researchers and students who advance knowledge together through open sharing and peer collaboration.
                </p>
              </div>

            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;