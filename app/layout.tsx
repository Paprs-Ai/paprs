import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./slides.css";
import { LanguageProvider } from "./context/LanguageContext";

const geistSans = Geist({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://paprs.app";

const TITLE = "Paprs — Your next official step in Spain";
const DESCRIPTION =
  "The trámite is not optional. Paprs prepares the next official step and the form. You review and submit. Madrid and Barcelona. English and Spanish.";
const OG_TITLE = "Paprs — next official step in Spain";
const OG_DESCRIPTION =
  "Situation-based plans for newcomers and residents. Madrid and Barcelona. You submit.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: TITLE,
    template: "%s | Paprs",
  },
  description: DESCRIPTION,
  applicationName: "Paprs",
  authors: [{ name: "Paprs Team", url: siteUrl }],
  creator: "Paprs",
  publisher: "Paprs",
  keywords: [
    "NIE",
    "TIE",
    "padrón Madrid",
    "padrón Barcelona",
    "EU registration",
    "first year in Spain",
    "next official step",
  ],
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": `${siteUrl}`,
      "es-ES": `${siteUrl}?lang=es`,
      "x-default": `${siteUrl}`,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google-site-verification-paprs",
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "bing-verification-paprs",
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    siteName: "Paprs",
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    creator: "@paprsapp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Paprs",
      description: DESCRIPTION,
      inLanguage: ["en", "es"],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "Paprs",
      applicationCategory: "BusinessApplication",
      description:
        "Paprs prepares the next official step in Spain and the form. NIE, TIE, padrón Madrid, padrón Barcelona, EU registration. You review and submit.",
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Paprs",
      url: siteUrl,
      logo: `${siteUrl}/icon.svg`,
      sameAs: ["https://twitter.com/paprsapp"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@paprs.app",
        availableLanguage: ["English", "Spanish"],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-black font-sans selection:bg-black selection:text-white">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
