import { siteUrl } from "@/lib/jsonld/organisation";
import { Metadata } from "next";

export const rootLayoutMetaData: Metadata = {
  title: {
    default: "AcademiaHub | Africa’s Academic Collaboration Platform",
    template: "%s | AcademiaHub",
  },

  description:
    "AcademiaHub Africa is a comprehensive academic ecosystem that connects students, lecturers, and researchers across African universities. The platform integrates a knowledge marketplace, collaborative research tools, an academic social network, and career development opportunities to advance scholarship, innovation, and professional growth across the continent.",
  keywords: [
    "AcademiaHub",

    "monetize lecture notes Africa",
    "sell academic research Africa",
    "student research monetization platform",
    "paid academic notes marketplace Africa",
    "research revenue sharing platform",
    "academic content monetization ecosystem",

    // Research & Collaboration Tools
    "cross-institution research Africa",
    "pan-African academic collaboration",
    "virtual research labs Africa",
    "real-time academic collaboration tools",
    "university-verified research network",
    "collaborative research revenue model",
    "joint academic publishing platform",

    // Social & Networking Infrastructure
    "academic social network Africa",
    "student researcher networking Africa",
    "lecturer-student collaboration platform",
    "academic mentor matching Africa",
    "research reputation system Africa",
    "publication credibility scoring platform",

    // Industry & Career Bridges
    "academia to industry bridge Africa",
    "academic career pipeline Africa",
    "research-to-industry platform Africa",
    "student research career hub",
    "academic talent discovery Africa",

    // Verification & Discovery Systems
    "university-verified academic platform",
    "academic content rating system",
    "peer-review driven reputation platform",
    "AI academic discovery Africa",
    "personalized research discovery engine",

    // User Intent & Infrastructure
    "how African students monetize research",
    "platform for selling academic notes in Africa",
    "collaborative research tools for African universities",
    "secure academic marketplace for students",
    "pan-African digital research infrastructure",
    "AcademiaHub Africa ecosystem",
    "Academia Hub Africa marketplace",
    "AcademiaHub pan-African platform",
    "AcademiaHub Africa research network",
    "AcademiaHub academic economy",
    "AcademiaHub knowledge monetization",
    "AcademiaHub student earning platform",

    // Marketplace & Monetization Features
    "academic knowledge marketplace Africa",
    "African universities",
    "academic collaboration Africa",
    "research platform Africa",
    "students and lecturers network",
    "knowledge marketplace",
    "academic social network",
    "collaborative research tools",
    "higher education Africa",
    "researchers in Africa",
    "academic career development",
    "Skill development platform",
    "Professional courses online",
    "Academic networking platform",
    "Learning community Africa",
    "Student collaboration platform",
    "Career development platform",
    "Professional growth Africa",
    "Career learning platform",
    "Education in Africa",
    "Online learning tips",
    "Career growth for students",
    "Digital skills in Africa",
    "Education app",
    "Learning app for students",
    "Online courses app",
    "Study app Africa",
    "Educational mobile app",
    "Learning platform app",
    "Student learning app",
    "Professional learning app",
    "EdTech app Africa",
    "Professional growth platform",
    "Online career learning",
    "Career skills training",
    "Job readiness platform",
    "Professional upskilling",
    "Career mentorship platform",
    "Skill-based learning",
    "Career advancement tools",
    "Learning for professionals",
    "Study resources platform",
    "Student career platform",
    "Student mentorship platform",
    "University students platform",
    "STEM students learning hub",
    "African university students",
  ],
  category: "Education",

  applicationName: "AcademiaHub",

  creator: "AcademiaHub Team",
  publisher: "AcademiaHub Africa",

  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },

  authors: [
    {
      name: "Ogechukwu Ochife",
      url: "https://buildwithochife.vercel.app/",
    },
    {
      name: "Olumide Fatukesi",
      url: "https://www.linkedin.com/in/fatukesi-olumide",
    },
    {
      name: "Akinyemi Titilope",
      url: "https://x.com/Teee_ui",
    },
    {
      name: "Shokanla Oladotun",
      url: "https://www.linkedin.com/in/oladotun-shokanla",
    },
    {
      name: "Mustapha Mustapha",
      url: "https://www.mustaphamustapha.vercel.app/",
    },
    {
      name: "Obiemezie Ikenna Emmanuel",
      url: "https://www.linkedin.com/in/ikenna-obiemezie-68571619b",
    },
    {
      name: "Jucal Asitok",
      url: "https://www.jucalasitok.vercel.app",
    },
    {
      name: "Kaosara Odumuyiwa",
      url: "https://www.linkedin.com/in/kaosara-odumuyiwa-929b19318",
    },
    {
      name: "Stella Oyewole",
      url: "https://www.linkedin.com/in/stella-oyewole-359627302",
    },
    {
      name: "Ayinde Olawale Oluwasegun",
      url: "https://datascienceportfol.io/ayindeolawale5",
    },
    {
      name: "Aderinsola Babatunde",
      url: "http://linkedin.com/in/aderinsola-babatunde-84a6a4294",
    },
    {
      name: "Ikenna Uchenna Ezeani",
      url: "https://www.linkedin.com/in/ikenna-ezeani-670b00190",
    },
    {
      name: "Emenike Stephanie",
      url: "https://www.linkedin.com/in/stephanie-emenike-262355330/",
    },
    {
      name: "Albert Uchechukwu Vincent",
      url: "https://albert-vincent-uchechukwu.vercel.app/",
    },
    {
      name: "Oluwaseyi Olusegun Koku",
      url: "https://www.linkedin.com/in/oluwaseyi-koku",
    },
    {
      name: "Ogunbowale Barnabas Olaitan",
      url: "https://www.linkedin.com/in/barnabas-ogunbowale-6938252ab",
    },
    {
      name: "Omolehin Oluwaseyi Daniel",
      url: "http://linkedin.com/in/oluwaseyi-omolehin-0229a61a3",
    },
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "AcademiaHub | Africa’s Academic Collaboration Platform",
    description:
      "A unified academic ecosystem connecting students, lecturers, and researchers across Africa through research collaboration, knowledge exchange, and career development.",
    url: siteUrl,
    siteName: "AcademiaHub",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AcademiaHub | Africa’s Academic Collaboration Platform",
    description:
      "Connecting Africa’s students, lecturers, and researchers through collaborative research, knowledge sharing, and academic career development.",
    creator: "@Academiahub_A",
  },
};

// Public pages: same title, description and canonical URL for search and social previews.
const page = (title: string, path: string, description: string): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title: `${title} | AcademiaHub`, description, url: `${siteUrl}${path}`, type: "website" },
});

export const exploreMetadata = page("Explore", "/explore", "Browse and discover research, resources, and collaborators across African universities on AcademiaHub.");
export const featuresMetadata = page("Features", "/features", "Learn about AcademiaHub's tools: collaborative research, knowledge marketplace, academic networking, and career development features.");
export const howItWorksMetadata = page("How it works", "/how-it-works", "Understand how AcademiaHub connects students, lecturers, and researchers to collaborate, learn, and grow across Africa.");
export const testimonialsMetadata = page("Testimonials", "/testimonials", "Hear from students, researchers, and educators who use AcademiaHub every day to discover, share, and collaborate on academic work.");
export const aboutUsMetadata = page("About us", "/about-us", "Learn about AcademiaHub, our mission to strengthen academic collaboration across Africa, and the team behind the platform.");
export const teamMetadata = page("Meet the team", "/team", "Meet the people building AcademiaHub and working to make learning, teaching, and academic resources more accessible across Africa.");
export const faqsMetadata = page("FAQs", "/faqs", "Find answers to common questions about AcademiaHub, how to use the platform, and account or content-related guidance.");
