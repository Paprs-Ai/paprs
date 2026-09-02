"use client";

import AILearns from "./sections/AILearns";
import AutonomoEngine from "./sections/AutonomoEngine";
import BureaucracyFAQ from "./sections/BureaucracyFAQ";
import Countries from "./sections/Countries";
import FinalCTA from "./sections/FinalCTA";
import HeroAndPain from "./sections/HeroAndPain";
import HowItWorks from "./sections/HowItWorks";
import { useLanguage } from "./context/LanguageContext";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

export default function Home() {
  const { dict } = useLanguage();

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-clip bg-[#FFFFFF] font-sans text-black selection:bg-black selection:text-white">
      <header
        className="fixed top-3 sm:top-4 left-1/2 z-50 flex w-[calc(100%-1.25rem)] max-w-5xl -translate-x-1/2 items-center justify-between rounded-full border border-black/10 px-3.5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.06)] sm:top-4 sm:w-[calc(100%-2rem)] sm:px-6 sm:py-3.5"
        style={{
          backgroundColor: "transparent",
          backdropFilter: "blur(2px) saturate(150%)",
          WebkitBackdropFilter: "blur(2px) saturate(150%)",
        }}
      >
        <a href="/" className="apple-press flex items-center hover:opacity-85">
          <span className="text-xl font-extrabold tracking-tighter text-black sm:text-2xl">paprs</span>
        </a>
        <nav className="hidden gap-5 font-mono text-[10px] font-bold tracking-widest text-black/75 uppercase lg:flex">
          <a href="#pain" className="apple-press transition-colors hover:text-black">{dict.nav.reality}</a>
          <a href="#how-it-works" className="apple-press transition-colors hover:text-black">{dict.nav.howItWorks}</a>
          <a href="#autonomo-engine" className="apple-press transition-colors hover:text-black">{dict.nav.autonomoEngine}</a>
          <a href="#ai-learns" className="apple-press transition-colors hover:text-black">{dict.nav.intelligence}</a>
          <a href="#countries" className="apple-press transition-colors hover:text-black">{dict.nav.europe}</a>
          <a href="#faq" className="apple-press transition-colors hover:text-black">{dict.nav.faq}</a>
        </nav>
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <LanguageSwitcher />
          <a
            href="#waitlist"
            className="apple-press flex items-center justify-center rounded-full border border-black/20 bg-black/85 px-3 py-1 font-mono text-[8px] font-bold tracking-wider text-white uppercase hover:bg-black sm:px-4 sm:py-1.5 sm:text-[9px]"
          >
            {dict.nav.joinWaitlist}
          </a>
        </div>
      </header>

      <main className="flex-1">
        <HeroAndPain />
        <HowItWorks />
        <AutonomoEngine />
        <AILearns />
        <Countries />
        <BureaucracyFAQ />
        <FinalCTA />
      </main>

      <footer className="site-footer border-t border-zinc-100 bg-[#FFFFFF] px-4 py-8 text-center font-mono text-[9px] text-zinc-500 select-none sm:px-6 sm:py-12 sm:text-[10px]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p>{dict.footer.copyright}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end sm:gap-6">
            <a href="/career" className="font-bold text-black/80 transition-colors hover:text-black">Careers (3 Open)</a>
            <a href="#" className="font-medium transition-colors hover:text-black">{dict.footer.privacyPolicy}</a>
            <a href="#" className="font-medium transition-colors hover:text-black">{dict.footer.termsOfService}</a>
            <a href="#" className="font-medium transition-colors hover:text-black">{dict.footer.cookies}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
