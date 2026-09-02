"use client";

import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { useLanguage } from "./context/LanguageContext";
import { tR1 } from "./r1Copy";
import R1Slides from "./sections/R1Slides";

export default function Home() {
  const { language } = useLanguage();
  const c = tR1(language);

  return (
    <div className="h-svh w-full overflow-hidden bg-white font-sans text-black selection:bg-black selection:text-white">
      <header
        className="fixed top-3 left-1/2 z-50 flex w-[calc(100%-1.25rem)] max-w-5xl -translate-x-1/2 items-center justify-between rounded-full border border-black/10 px-3.5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.06)] sm:top-4 sm:w-[calc(100%-2rem)] sm:px-6 sm:py-3.5"
        style={{
          backgroundColor: "transparent",
          backdropFilter: "blur(2px) saturate(150%)",
          WebkitBackdropFilter: "blur(2px) saturate(150%)",
        }}
      >
        <a href="#maze" className="apple-press flex items-center hover:opacity-85">
          <span className="text-xl font-extrabold tracking-tighter text-black sm:text-2xl">paprs</span>
        </a>
        <nav className="hidden gap-5 font-mono text-[10px] font-bold tracking-widest text-black/75 uppercase lg:flex">
          <a href="#maze" className="apple-press transition-colors hover:text-black">{c.navMaze}</a>
          <a href="#paprs" className="apple-press transition-colors hover:text-black">{c.navPaprs}</a>
          <a href="#waitlist" className="apple-press transition-colors hover:text-black">{c.navWaitlist}</a>
        </nav>
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <LanguageSwitcher />
          <a
            href="#waitlist"
            className="apple-press flex items-center justify-center rounded-full border border-black/20 bg-black/85 px-3 py-1 font-mono text-[8px] font-bold tracking-wider text-white uppercase hover:bg-black sm:px-4 sm:py-1.5 sm:text-[9px]"
          >
            {c.joinWaitlist}
          </a>
        </div>
      </header>
      <R1Slides />
    </div>
  );
}
