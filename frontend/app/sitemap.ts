import { siteUrl } from "@/lib/jsonld/organisation";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      priority: 1,
    },

    {
      url: `${siteUrl}/explore`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/features`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/testimonials`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/about-us`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/how-it-works`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/faqs`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/signup`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/login`,
      lastModified: new Date(),
    },
  ];
}
