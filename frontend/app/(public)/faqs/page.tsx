import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PageHero from "@/components/shared/PageHero";
import JoinUs from "@/components/landing/JoinUs";
import { faqData } from "@/app/data/faqData";
import { faqsMetadata } from "@/app/data/metadataExports";

export const metadata = faqsMetadata;

// The landing and support pages keep their own larger FAQ style (LandingFaq).
export default function FAQsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHero title="Frequently Asked Questions" subtitle="Find answers to common questions about AcademiaHub" />

      <section className="bg-[#FAFAFA] px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Accordion type="single" collapsible className="max-w-4xl mx-auto space-y-3">
          {faqData.map((faq) => (
            <AccordionItem key={faq.id} value={`faq-${faq.id}`} className="bg-white rounded-lg border border-gray-200 last:border-b px-4 md:px-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <AccordionTrigger className="py-3.5 text-sm md:text-base font-semibold text-gray-900 hover:no-underline items-center">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-sm md:text-base text-gray-700 leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-14 md:py-24">
        <div className="max-w-4xl mx-auto bg-[#DCDFEA] rounded-xl px-6 py-14 md:px-16 md:py-20 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">Still Have Questions?</h2>
          <p className="text-sm md:text-lg font-medium text-gray-800 mb-8 md:mb-10">Our support team is here to help you with any questions or concerns</p>
          <a href="mailto:support@mail.academiahubafrica.org" className="inline-block bg-white text-primary-500 font-medium text-sm md:text-base px-12 md:px-16 py-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
            Contact Support
          </a>
        </div>
      </section>

      <JoinUs />
    </main>
  );
}
