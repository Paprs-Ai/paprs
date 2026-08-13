import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Paprs — Your step-by-step guide to life in Spain",
  description: "Navigate Spanish bureaucracy with confidence. NIE, TIE, padrón, taxes and more — Paprs tells you exactly what to do, in plain language, step by step.",
  icons: {
    icon: "/paprs-favicon.png",
    shortcut: "/favicon.ico",
    apple: "/paprs-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#000000] text-[#f4f4f5] font-sans selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
