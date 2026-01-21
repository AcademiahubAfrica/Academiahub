import { userPages } from "@/components/LayoutWrapper";
import { siteUrl } from "@/lib/jsonld/organisation";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", ...userPages],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
