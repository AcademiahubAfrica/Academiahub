import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * The messaging service is a separate origin, and the browser talks to it over
 * both HTTP and WebSocket. Derived from the same variable the client uses so
 * the two cannot drift.
 */
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const backendOrigins = backendUrl
  ? [backendUrl, backendUrl.replace(/^http/, "ws")]
  : [];

/**
 * Content Security Policy.
 *
 * Shipped as report-only for now: violations are reported to the browser
 * console but nothing is blocked. That is deliberate — a policy this broad in
 * reach will find legitimate requests nobody remembered, and discovering them
 * from a report is much cheaper than discovering them from a blank page.
 *
 * `script-src` carries `'unsafe-inline'`, which is the one directive that does
 * not yet earn its keep: Next.js emits inline hydration scripts, and allowing
 * those by blanket permission also allows an injected one. Fixing it properly
 * means per-request nonces, which in Next.js means middleware and giving up
 * static rendering — a real trade, and a separate decision. Everything else
 * here is already worth enforcing.
 */
const csp = [
  `default-src 'self'`,
  [
    `script-src 'self' 'unsafe-inline'`,
    // React Refresh compiles with eval; production builds do not.
    isDev ? `'unsafe-eval'` : "",
    `https://www.googletagmanager.com https://www.google-analytics.com`,
  ]
    .filter(Boolean)
    .join(" "),
  // Tailwind and next/font both emit inline style attributes.
  `style-src 'self' 'unsafe-inline'`,
  // `blob:` covers the local preview shown before an avatar upload completes.
  `img-src 'self' data: blob: https://res.cloudinary.com https://lh3.googleusercontent.com https://www.google-analytics.com https://www.googletagmanager.com`,
  `font-src 'self' data:`,
  [
    `connect-src 'self'`,
    ...backendOrigins,
    `https://api.cloudinary.com https://res.cloudinary.com`,
    `https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com`,
    `https://*.logrocket.io https://*.lr-ingest.io https://*.logr-ingest.com`,
  ].join(" "),
  `worker-src 'self' blob:`,
  `frame-src 'self'`,
  // Nothing may frame this site; the enforced twin is X-Frame-Options below.
  `frame-ancestors 'none'`,
  `object-src 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  isDev ? "" : `upgrade-insecure-requests`,
]
  .filter(Boolean)
  .join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Clickjacking. Unlike the CSP above this one is enforced, so a logged-in
  // user cannot be framed into clicking something they cannot see.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  { key: "Content-Security-Policy-Report-Only", value: csp },
];

if (!isDev) {
  // Two years, and only over HTTPS — a browser that has seen this once will not
  // be talked down to plain HTTP on untrusted Wi-Fi.
  securityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  });
}

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", ".prisma/client", "resend"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
