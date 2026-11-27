import Image from "next/image";
import { Star } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import JoinUs from "@/components/landing/JoinUs";
import { featuredTestimonial as featured, testimonials } from "@/app/data/testimonials";
import { testimonialsMetadata } from "@/app/data/metadataExports";

export const metadata = testimonialsMetadata;

// "Dr. Olawale Cole" -> "OC"
const initials = (name: string) =>
  name.replace(/^(Dr|Prof|Mr|Mrs|Ms)\.?\s+/i, "").split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHero title="What Our Users Say" subtitle="Hear from students, researchers, and educators who use AcademiaHub every day" />

      <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <ul className="max-w-6xl mx-auto bg-[#F7F7F8] rounded-2xl p-4 sm:p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {testimonials.map(({ id, name, avatar, rating, quote }) => (
            <li key={id}>
              <figure className="flex flex-col h-full bg-white rounded-xl border border-gray-100 p-5 md:p-6">
                <figcaption className="flex items-center gap-3 mb-4 text-sm font-semibold text-gray-900">
                  <Image src={avatar} alt="" width={48} height={48} className="size-11 rounded-full object-cover bg-gray-200" />
                  {name}
                </figcaption>
                <blockquote className="text-sm text-gray-700 leading-relaxed flex-1">{quote}</blockquote>
                <div className="flex justify-end gap-0.5 mt-6" role="img" aria-label={`Rated ${rating} out of 5`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} aria-hidden className={`size-4.5 ${n <= rating ? "fill-[#FACC15] text-[#FACC15]" : "text-gray-400"}`} />
                  ))}
                </div>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pt-4 pb-16 md:pb-24">
        {/* Gradient border: the outer layer shows through a 1.5px gap. */}
        <div className="max-w-2xl mx-auto rounded-3xl p-[1.5px] bg-linear-to-r from-primary-400 via-[#FACC15] to-primary-400">
          <figure className="rounded-[calc(1.5rem-1.5px)] bg-white px-6 py-7 md:px-8 md:py-8">
            <blockquote className="text-base md:text-lg text-gray-900 leading-relaxed">&ldquo;{featured.quote}&rdquo;</blockquote>
            <figcaption className="flex items-center gap-3 mt-6 text-sm md:text-base text-gray-900 leading-snug">
              <span className="size-12 shrink-0 rounded-full bg-primary-100 flex items-center justify-center text-sm font-semibold text-gray-800">{initials(featured.name)}</span>
              <span>{featured.name}<br />{featured.role}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <JoinUs />
    </main>
  );
}
