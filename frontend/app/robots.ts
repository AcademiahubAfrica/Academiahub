import { siteUrl } from "@/lib/jsonld/organisation";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/_next/",
        "/dashboard",
        "/analytics",
        "/downloads",
        "/uploads",
        "/saved",
        "/inbox",
        "/profile",
        "/settings",
        "/docs",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
