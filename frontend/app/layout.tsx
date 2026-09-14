import { Geist, Geist_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import AppProvider from "./AppProvider";
import Script from "next/script";
import { websiteJsonLd } from "@/lib/jsonld/website";
import { organizationJsonLd } from "@/lib/jsonld/organisation";
import { rootLayoutMetaData } from "./data/metadataExports";
import { personsJsonLd } from "@/lib/jsonld/person";
import { Toaster } from "react-hot-toast";
import LogRocketInit from "./_components/LogRocketInit";
import VercelAnalytics from "./_components/VercelAnalytics";
import { SENSITIVE_QUERY_PARAMS } from "@/lib/redactUrl";

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
    <html lang="en" data-scroll-behavior="smooth">
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
          <Toaster position="top-right" reverseOrder={false} />
          <LogRocketInit />
          {children}
        </AppProvider>
        <VercelAnalytics />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="lazyOnload"
            />
            {/* page_location is sent explicitly with sensitive query values
                redacted. By default gtag sends the full URL, which on the
                password reset page includes a working reset token. */}
            <Script id="ga-init" strategy="lazyOnload">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
var gaLocation = new URL(window.location.href);
${JSON.stringify(SENSITIVE_QUERY_PARAMS)}.forEach(function (name) {
  if (gaLocation.searchParams.has(name)) gaLocation.searchParams.set(name, 'redacted');
});
gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_location: gaLocation.toString() });`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
