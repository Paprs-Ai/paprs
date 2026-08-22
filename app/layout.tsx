import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paprs — Your step-by-step guide to life in Spain",
  description: "Navigate Spanish bureaucracy with confidence. NIE, TIE, padrón, taxes and more — Paprs tells you exactly what to do, in plain language, step by step.",
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
      <body className="min-h-full flex flex-col bg-[#000000] text-[#f4f4f5] font-sans selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
