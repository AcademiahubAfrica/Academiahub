import { siteUrl } from "@/lib/jsonld/organisation";
import { MetadataRoute } from "next";

const paths = ["", "/explore", "/features", "/about-us", "/how-it-works", "/testimonials", "/faqs", "/signup", "/login"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date(), ...(path ? {} : { priority: 1 }) }));
}
