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

export const exploreMetadata: Metadata = {
  title: "Explore",
  description:
    "Browse and discover research, resources, and collaborators across African universities on AcademiaHub.",
  alternates: { canonical: "/explore" },
  openGraph: {
    title: "Explore | AcademiaHub",
    description:
      "Browse and discover research, resources, and collaborators across African universities on AcademiaHub.",
    url: `${siteUrl}/explore`,
    type: "website",
  },
};

export const featuresMetadata: Metadata = {
  title: "Features",
  description:
    "Learn about AcademiaHub's tools: collaborative research, knowledge marketplace, academic networking, and career development features.",
  alternates: { canonical: "/features" },
  openGraph: {
    title: "Features | AcademiaHub",
    description:
      "Learn about AcademiaHub's tools: collaborative research, knowledge marketplace, academic networking, and career development features.",
    url: `${siteUrl}/features`,
    type: "website",
  },
};

export const howItWorksMetadata: Metadata = {
  title: "How it works",
  description:
    "Understand how AcademiaHub connects students, lecturers, and researchers to collaborate, learn, and grow across Africa.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How it works | AcademiaHub",
    description:
      "Understand how AcademiaHub connects students, lecturers, and researchers to collaborate, learn, and grow across Africa.",
    url: `${siteUrl}/how-it-works`,
    type: "website",
  },
};

export const testimonialsMetadata: Metadata = {
  title: "Testimonials",
  description:
    "Read testimonials from students, lecturers, and researchers who have used AcademiaHub to collaborate and advance their work.",
  alternates: { canonical: "/testimonials" },
  openGraph: {
    title: "Testimonials | AcademiaHub",
    description:
      "Read testimonials from students, lecturers, and researchers who have used AcademiaHub to collaborate and advance their work.",
    url: `${siteUrl}/testimonials`,
    type: "website",
  },
};

export const aboutUsMetadata: Metadata = {
  title: "About us",
  description:
    "Learn about AcademiaHub, our mission to strengthen academic collaboration across Africa, and the team behind the platform.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About us | AcademiaHub",
    description:
      "Learn about AcademiaHub, our mission to strengthen academic collaboration across Africa, and the team behind the platform.",
    url: `${siteUrl}/about-us`,
    type: "website",
  },
};

export const faqsMetadata: Metadata = {
  title: "FAQs",
  description:
    "Find answers to common questions about AcademiaHub, how to use the platform, and account or content-related guidance.",
  alternates: { canonical: "/faqs" },
  openGraph: {
    title: "FAQs | AcademiaHub",
    description:
      "Find answers to common questions about AcademiaHub, how to use the platform, and account or content-related guidance.",
    url: `${siteUrl}/faqs`,
    type: "website",
  },
};
