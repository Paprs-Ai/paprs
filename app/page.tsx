"use client";


import AILearns from "./sections/AILearns";
import AutonomoEngine from "./sections/AutonomoEngine";
import Countries from "./sections/Countries";
import FinalCTA from "./sections/FinalCTA";
import HeroAndPain from "./sections/HeroAndPain";
import HowItWorks from "./sections/HowItWorks";
import { useLanguage } from "./context/LanguageContext";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

export default function Home() {
  const { dict } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-clip bg-[#FFFFFF] text-black font-sans selection:bg-black selection:text-white">
      
      {/* Sticky Top Header — Apple-Grade Translucent Material & Instant Response */}
      <header 
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50 flex justify-between items-center px-6 py-3.5 rounded-full border border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] select-none text-black transition-all"
        style={{
          backgroundColor: "transparent",
          backdropFilter: "blur(2px) saturate(150%)",
          WebkitBackdropFilter: "blur(2px) saturate(150%)",
        }}
      >
        {/* Brand */}
        <a href="#" className="flex items-center hover:opacity-85 apple-press">
          <span className="font-extrabold text-2xl tracking-tighter text-black">
            paprs
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden lg:flex gap-5 text-[10px] font-mono uppercase tracking-widest text-black/75">
          <a href="#pain" className="transition-colors hover:text-black font-bold apple-press">{dict.nav.reality}</a>
          <a href="#how-it-works" className="transition-colors hover:text-black font-bold apple-press">{dict.nav.howItWorks}</a>
          <a href="#autonomo-engine" className="transition-colors hover:text-black font-bold apple-press">{dict.nav.autonomoEngine}</a>
          <a href="#ai-learns" className="transition-colors hover:text-black font-bold apple-press">{dict.nav.intelligence}</a>
          <a href="#countries" className="transition-colors hover:text-black font-bold apple-press">{dict.nav.europe}</a>
          <a href="#waitlist" className="transition-colors hover:text-black font-bold apple-press">{dict.nav.waitlist}</a>
        </nav>

        {/* Nav Controls: Language Switcher & CTA */}
        <div className="flex items-center gap-2.5">
          <LanguageSwitcher />
          <a 
            href="#waitlist"
            className="px-4 py-1.5 rounded-full border border-black/20 text-white bg-black/85 backdrop-blur-md hover:bg-black font-mono text-[9px] font-bold uppercase tracking-wider shadow-xs apple-press flex items-center justify-center text-center leading-none"
          >
            {dict.nav.joinWaitlist}
          </a>
        </div>
      </header>

      {/* Main Sections Storyline */}
      <main className="flex-1">
        <HeroAndPain />
        <HowItWorks />
        <AutonomoEngine />
        <AILearns />
        <Countries />
        <FinalCTA />
      </main>

      {/* Footer */}
      <footer className="bg-[#FFFFFF] py-12 px-6 text-center select-none font-mono text-[10px] text-zinc-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>{dict.footer.copyright}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black transition-colors font-medium">{dict.footer.privacyPolicy}</a>
            <a href="#" className="hover:text-black transition-colors font-medium">{dict.footer.termsOfService}</a>
            <a href="#" className="hover:text-black transition-colors font-medium">{dict.footer.cookies}</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
