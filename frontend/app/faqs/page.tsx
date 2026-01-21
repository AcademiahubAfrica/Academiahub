"use client";

import JoinUs from "@/components/JoinUs";
import LandingFaq from "@/components/LandingFaq";
import ContactSupport from "@/components/ContactSupport"; 


export default function FAQ() {

    return (
        <main className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Search Section */}
      <section className="bg-linear-to-br from-gray-300 via-yellow-200 to-gray-200 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Find answers to common questions about AcademiaHub</p>
          </div>
        </div>
      </section>  
    <LandingFaq hideHeader={true} />
    <ContactSupport />
      <JoinUs />
    </main>
    )
}