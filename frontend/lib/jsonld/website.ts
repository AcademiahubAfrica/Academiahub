import { siteUrl } from "./organisation";

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "AcademiaHub",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
};
