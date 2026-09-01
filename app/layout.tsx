import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Paprs — Spanish Bureaucracy Navigator | NIE, TIE, Padrón & Autónomo",
    template: "%s | Paprs",
  },
  description:
    "Navigate Spanish bureaucracy with confidence. Get your NIE, TIE residency card, empadronamiento, autónomo taxes, and digital nomad visas sorted with verified, step-by-step interactive guidance.",
  applicationName: "Paprs",
  authors: [{ name: "Paprs Team", url: siteUrl }],
  creator: "Paprs",
  publisher: "Paprs",
  keywords: [
    "Spain bureaucracy",
    "NIE Spain application",
    "How to get NIE in Spain",
    "TIE card Spain requirements",
    "Empadronamiento guide Madrid Barcelona",
    "Autónomo taxes Spain calculator",
    "Digital Nomad Visa Spain",
    "Beckham Law Spain tax rate",
    "Cita previa extranjería",
    "Spanish residency step by step",
    "Expat relocation to Spain",
    "Gestoría online alternative Spain",
  ],
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": `${siteUrl}`,
      "es-ES": `${siteUrl}?lang=es`,
      "ca-ES": `${siteUrl}?lang=ca`,
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
    title: "Paprs — Spanish Bureaucracy Navigator | NIE, TIE, Padrón & Autónomo",
    description:
      "Eliminate Spanish paperwork chaos. Get your NIE, TIE, empadronamiento, digital nomad visa, and autónomo taxes sorted step by step.",
    siteName: "Paprs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paprs — Spanish Bureaucracy Navigator | NIE, TIE, Padrón & Autónomo",
    description:
      "Navigate Spanish bureaucracy with confidence. NIE, TIE, padrón, taxes and more — plain language, step by step.",
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
  category: "relocation",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Paprs",
      description:
        "Step-by-step guide to Spanish bureaucracy, residency, NIE, TIE, empadronamiento, and autónomo taxes.",
      inLanguage: ["en", "es", "ca"],
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "Paprs",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "184",
        reviewCount: "142",
        bestRating: "5",
        worstRating: "1",
      },
      description:
        "Step-by-step guidance platform for Spanish bureaucracy, NIE/TIE residency cards, empadronamiento, and autónomo taxes.",
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Paprs",
      url: siteUrl,
      logo: `${siteUrl}/icon.svg`,
      sameAs: [
        "https://twitter.com/paprsapp",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@paprs.app",
        availableLanguage: ["English", "Spanish", "Catalan"],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faqpage`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Paprs and how does it solve Spanish bureaucracy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Paprs is your step-by-step digital navigator for managing life and bureaucracy in Spain. Instead of getting lost in scattered government websites or conflicting forum advice, Paprs takes your passport, visa status, and destination to create a custom interactive roadmap—telling you exactly which documents you need, in what order, and how to complete them.",
          },
        },
        {
          "@type": "Question",
          name: "How does Paprs compare to hiring a traditional Gestoría?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Traditional gestorías can charge hundreds or thousands of euros and often take days to answer basic questions. Paprs gives you instant, 24/7 interactive clarity, pre-checks your paperwork for missing prerequisites, and guides you through appointments and taxes with complete transparency—at a fraction of the cost.",
          },
        },
        {
          "@type": "Question",
          name: "What Spanish procedures does Paprs guide me through?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Paprs supports the entire Spanish bureaucratic journey: NIE number applications (EX-15), TIE cards (EX-17), EU Citizen Registration (EX-18), Empadronamiento (Padrón) across all autonomous communities, Autónomo setup (Modelos 036/037 & RETA), quarterly tax filings (Modelos 303 & 130), Digital Nomad Visas, and Beckham Law tax applications.",
          },
        },
        {
          "@type": "Question",
          name: "How does the Paprs Document Vault protect my sensitive files?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Paprs Vault uses bank-grade AES-256 encryption at rest and TLS in transit. Your documents, certificates, and tax records are stored securely in EU-compliant infrastructure, organized automatically with expiration alerts, and are never shared or sold to third parties.",
          },
        },
        {
          "@type": "Question",
          name: "How does Paprs help me with Cita Previa appointments?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Paprs directs you to the exact office, province, and official procedure name, alerts you to province-specific appointment release patterns, and generates a pre-appointment checklist so your paperwork is 100% compliant on the day.",
          },
        },
        {
          "@type": "Question",
          name: "How do I get access to Paprs and is there a free plan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can secure your spot by joining the early access waitlist with your email on this page. Early waitlist members receive prioritized onboarding, direct access to our interactive Spanish roadmap builder, and exclusive launch privileges.",
          },
        },
      ],
    },
    {
      "@type": "HowTo",
      "@id": `${siteUrl}/#howto-nie`,
      name: "How to Obtain a Spanish NIE Number (Form EX-15)",
      description: "Step-by-step guide to applying for and receiving your official NIE tax identification number in Spain.",
      totalTime: "P14D",
      step: [
        {
          "@type": "HowToStep",
          name: "Identify Reason & Route",
          text: "Establish legal justification (employment, property purchase, bank opening, or university study).",
        },
        {
          "@type": "HowToStep",
          name: "Fill Form EX-15 and Pay Modelo 790-012",
          text: "Complete official application EX-15 and pay the ~€9.84 tax fee at any Spanish bank branch.",
        },
        {
          "@type": "HowToStep",
          name: "Book Cita Previa & Attend Appointment",
          text: "Book an appointment at the CNP / Extranjería office in your province and submit original documents + copies.",
        },
      ],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#000000] text-[#f4f4f5] font-sans selection:bg-white selection:text-black">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
