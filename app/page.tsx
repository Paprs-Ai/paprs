"use client";


import AILearns from "./sections/AILearns";
import AutonomoEngine from "./sections/AutonomoEngine";
import Countries from "./sections/Countries";
import FinalCTA from "./sections/FinalCTA";
import HeroAndPain from "./sections/HeroAndPain";
import HowItWorks from "./sections/HowItWorks";

// Keep the complete pricing experience ready for a later launch without
// exposing it on the public landing page yet.

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-clip bg-[#FFFFFF] text-black font-sans selection:bg-black selection:text-white">
      
      {/* Sticky Top Header — Apple-Grade Translucent Material & Instant Response */}
      <header 
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50 flex justify-between items-center px-6 py-3.5 rounded-full apple-glass shadow-[0_8px_30px_rgba(0,0,0,0.04)] select-none text-black transition-all"
      >
        {/* Brand */}
        <a href="#" className="flex items-center hover:opacity-85 apple-press">
          <span className="font-syne font-extrabold text-2xl tracking-tighter text-black">
            paprs
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden lg:flex gap-5 text-[10px] font-mono uppercase tracking-widest text-black/75">
          <a href="#pain" className="transition-colors hover:text-black font-bold apple-press">Reality</a>
          <a href="#how-it-works" className="transition-colors hover:text-black font-bold apple-press">Product</a>
          <a href="#autonomo-engine" className="transition-colors hover:text-black font-bold apple-press">Autónomo</a>
          <a href="#qr-vault" className="transition-colors hover:text-black font-bold apple-press">QR & Vault</a>
          <a href="#benchmark" className="transition-colors hover:text-black font-bold apple-press">AI vs Human</a>
          <a href="#ai-learns" className="transition-colors hover:text-black font-bold apple-press">Intelligence</a>
          <a href="#countries" className="transition-colors hover:text-black font-bold apple-press">Europe</a>
          <a href="#waitlist" className="transition-colors hover:text-black font-bold apple-press">Waitlist</a>
        </nav>

        {/* Nav CTA */}
        <div>
          <a 
            href="#waitlist"
            className="px-4 py-1.5 rounded-full border border-black/20 text-white bg-black/85 backdrop-blur-md hover:bg-black font-mono text-[9px] font-bold uppercase tracking-wider shadow-xs apple-press block"
          >
            Join Waitlist
          </a>
        </div>
      </header>

      {/* Main Sections Storyline */}
      <main className="flex-1">
        <HeroAndPain />
        <HowItWorks />
        <AutonomoEngine />
        {/* <PaprsQRAndVault /> */}
        {/* <SyntheticBenchmark /> */}
        <AILearns />
        <Countries />
         {/* <Pricing /> */}
        {/* Testimonials disabled for now */}
        {/* <SocialProof /> */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <footer className="bg-[#FFFFFF] border-t border-zinc-200 py-12 px-6 text-center select-none font-mono text-[10px] text-zinc-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Paprs. All rights reserved. Built in Spain.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black transition-colors font-medium">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors font-medium">Terms of Service</a>
            <a href="#" className="hover:text-black transition-colors font-medium">Cookies</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
