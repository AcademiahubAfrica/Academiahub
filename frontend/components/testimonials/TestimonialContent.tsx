import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { testimonialsData } from '../../app/data/testimonialsData';

const Testimonials = () => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-300 text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="w-full bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsData.map((testimonial) => (
            <section
              key={testimonial.id}
              className="flex flex-col gap-4 border border-[#D9D9D9] rounded-[12px] p-6 bg-white"
            >
              {/* User Info */}
              <div className="flex flex-row gap-[11px] items-center">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={testimonial.avatar}
                    fill
                    alt={`${testimonial.name}'s profile picture`}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-sans font-semibold text-[16px] leading-[25px]">
                    {testimonial.name}
                  </p>
                  {testimonial.role && (
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  )}
                </div>
              </div>

              {/* Testimonial Text */}
              <div>
                <p className="font-normal text-[14px] leading-[130%] text-[#121212] text-left">
                  {testimonial.testimonial}
                </p>
              </div>

              {/* Star Rating */}
              <div className="flex justify-end">
                {renderStars(testimonial.rating)}
              </div>
            </section>
          ))}
        </div>

        {/* Featured Testimonial Section */}
        <div className="mt-16">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-1 bg-gradient-to-r from-blue-900 via-yellow-400 to-blue-900 shadow-xl">
            <div className="bg-white rounded-3xl p-8 md:p-12">
              <p className="text-lg md:text-xl text-gray-900 leading-relaxed mb-6">
                &quot;AcademiaHub has transformed how we approach academic research at our institution. The platform&apos;s collaborative features and quality control have made it an indispensable tool for our entire department.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-700">
                  OC
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    Dr. Olawale Cole
                  </h3>
                  <p className="text-gray-600">Department Head, University of Ibadan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;