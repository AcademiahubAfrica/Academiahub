import type { ReactNode } from "react";

type PageHeroProps = {
  title: string;
  subtitle: string;
  /** Extra content under the subtitle, e.g. the Explore search bar. */
  children?: ReactNode;
};

// Soft grey-blue banner with a warm cream glow in the centre, shared by the
// public info pages (About, How It Works, Testimonials, FAQs, ...).
const PageHero = ({ title, subtitle, children }: PageHeroProps) => {
  return (
    <section className="bg-[radial-gradient(ellipse_at_center,#FFFBE6_0%,#F3F1EC_35%,#E6E8F0_75%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-3">
          {title}
        </h1>
        <p className="text-base md:text-xl font-medium text-gray-700 max-w-3xl mx-auto">
          {subtitle}
        </p>
        {children}
      </div>
    </section>
  );
};

export default PageHero;
