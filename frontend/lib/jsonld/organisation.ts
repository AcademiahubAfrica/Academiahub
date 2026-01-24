export const siteUrl = process.env.NEXTAUTH_URL as string;

console.log(siteUrl);
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${siteUrl}/#organization`,
  name: "AcademiaHub Africa",
  url: `${siteUrl}`,
  logo: `${siteUrl}/logo.png`,
  description:
    "AcademiaHub Africa is a comprehensive academic ecosystem connecting students, lecturers, and researchers across African universities.",
  areaServed: {
    "@type": "Continent",
    name: "Africa",
  },
};
