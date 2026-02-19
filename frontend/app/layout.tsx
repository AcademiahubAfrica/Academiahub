import { Geist, Geist_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import AppProvider from "./AppProvider";
import LayoutWrapper from "@/components/LayoutWrapper";
import { GoogleAnalytics } from "@next/third-parties/google";
import { websiteJsonLd } from "@/lib/jsonld/website";
import { organizationJsonLd } from "@/lib/jsonld/organisation";
import { rootLayoutMetaData } from "./data/metadataExports";
import { personsJsonLd } from "@/lib/jsonld/person";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
});

export const metadata = rootLayoutMetaData;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personsJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexSans.variable} antialiased`}
      >
        <AppProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        </AppProvider>
      </body>
    </html>
  );
}
