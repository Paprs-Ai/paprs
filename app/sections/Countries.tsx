"use client";

import React from "react";
import CountryMap from "../components/CountryMap";
import { useLanguage } from "../context/LanguageContext";

const Q1 = [
  { flag: "🇨🇭", code: "CH" as const },
  { flag: "🇩🇪", code: "DE" as const },
  { flag: "🇫🇷", code: "FR" as const },
];
const Q2 = [
  { flag: "🇮🇹", code: "IT" as const },
  { flag: "🇵🇹", code: "PT" as const },
];
const Q3 = [
  { flag: "🇳🇱", code: "NL" as const },
  { flag: "🇦🇹", code: "AT" as const },
];

export default function Countries() {
  const { dict } = useLanguage();

  return (
    <section id="countries" className="relative min-h-[100svh] w-full overflow-hidden bg-[#FFFFFF] scroll-mt-28">

      {/* Full-section map background */}
      <div className="absolute inset-0 w-full h-full">
        <CountryMap />
      </div>

      {/* Left column fade */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-[44%] bg-gradient-to-r from-[#FFFFFF] via-[#FFFFFF]/90 to-transparent pointer-events-none z-10" />
      {/* Right column fade */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[42%] bg-gradient-to-l from-[#FFFFFF] via-[#FFFFFF]/90 to-transparent pointer-events-none z-10" />
      {/* Top + bottom edge fades */}
      <div className="absolute inset-x-0 top-0 h-24 sm:h-32 bg-gradient-to-b from-[#FFFFFF] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-[#FFFFFF] to-transparent pointer-events-none z-10" />

      {/* 3-column content layout */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col items-center justify-between gap-8 px-4 py-16 sm:px-6 sm:py-20 md:px-12 lg:flex-row lg:items-stretch lg:gap-0 lg:px-20 lg:py-0">

        {/* LEFT — Title */}
        <div className="w-full max-w-xl lg:w-[38%] flex flex-col justify-center text-center lg:text-left items-center lg:items-start lg:pr-8 py-4 sm:py-8 lg:py-20 select-none">
          <span className="font-mono text-[10px] sm:text-xs font-bold text-black uppercase tracking-widest bg-zinc-100 border border-zinc-300 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full w-fit">
            {dict.countries.tag}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold font-syne text-black mt-3 sm:mt-5 mb-3 sm:mb-5 leading-[1.05] whitespace-pre-line">
            {dict.countries.title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-sm">
            {dict.countries.desc}
          </p>
        </div>

        {/* CENTER */}
        <div className="hidden lg:block flex-1" />

        {/* RIGHT — Roadmap cards */}
        <div className="w-full max-w-xl lg:w-[36%] xl:w-[34%] flex flex-col justify-center py-4 sm:py-8 lg:py-20 lg:pl-4 gap-3 sm:gap-4 select-none">

          {/* Spain — Featured live card */}
          <div className="relative bg-white/85 border border-zinc-300 backdrop-blur-sm rounded-xl p-3.5 sm:p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="text-2xl sm:text-3xl leading-none">🇪🇸</span>
              <div>
                <p className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-widest text-black font-bold mb-0.5">{dict.countries.liveNow}</p>
                <h3 className="font-syne font-extrabold text-lg sm:text-xl text-black leading-none">{dict.countries.spain}</h3>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-black text-white rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse block" />
              <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">{dict.countries.available}</span>
            </div>
          </div>

          {/* Q1 2026 group */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-px flex-1 bg-zinc-200" />
              <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-widest text-black font-bold">{dict.countries.q1Label}</span>
              <div className="h-px flex-1 bg-zinc-200" />
            </div>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {Q1.map((c) => (
                <div key={c.code} className="bg-white/80 backdrop-blur-sm border border-zinc-300 rounded-xl p-2.5 sm:p-3 flex flex-col items-center gap-1 sm:gap-1.5 hover:border-black transition-colors duration-200">
                  <span className="text-xl sm:text-2xl leading-none">{c.flag}</span>
                  <span className="font-mono text-[8px] sm:text-[9px] font-bold text-zinc-500 uppercase tracking-wider">{c.code}</span>
                  <span className="font-syne font-bold text-[10px] sm:text-[11px] text-black text-center leading-tight">{dict.countries.countryNames[c.code]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Q2 2026 group */}
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
              <div className="h-px flex-1 bg-zinc-200" />
              <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-widest text-zinc-500 font-bold">{dict.countries.q2Label}</span>
              <div className="h-px flex-1 bg-zinc-200" />
            </div>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              {Q2.map((c) => (
                <div key={c.code} className="bg-white/60 backdrop-blur-sm border border-zinc-200 rounded-xl p-2.5 sm:p-3 flex flex-col items-center gap-1 sm:gap-1.5 opacity-80">
                  <span className="text-xl sm:text-2xl leading-none">{c.flag}</span>
                  <span className="font-mono text-[8px] sm:text-[9px] font-bold text-zinc-400 uppercase tracking-wider">{c.code}</span>
                  <span className="font-syne font-bold text-[10px] sm:text-[11px] text-zinc-700 text-center leading-tight">{dict.countries.countryNames[c.code]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Q3 2026 group */}
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
              <div className="h-px flex-1 bg-zinc-200" />
              <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-widest text-zinc-400 font-bold">{dict.countries.q3Label}</span>
              <div className="h-px flex-1 bg-zinc-200" />
            </div>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              {Q3.map((c) => (
                <div key={c.code} className="bg-white/50 backdrop-blur-sm border border-zinc-200 rounded-xl p-2.5 sm:p-3 flex flex-col items-center gap-1 sm:gap-1.5 opacity-60">
                  <span className="text-xl sm:text-2xl leading-none">{c.flag}</span>
                  <span className="font-mono text-[8px] sm:text-[9px] font-bold text-zinc-400 uppercase tracking-wider">{c.code}</span>
                  <span className="font-syne font-bold text-[10px] sm:text-[11px] text-zinc-600 text-center leading-tight">{dict.countries.countryNames[c.code]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* More countries hint */}
          <p className="font-mono text-[8.5px] sm:text-[9px] text-zinc-500 text-center uppercase tracking-widest pt-1 font-medium">
            {dict.countries.moreIn2027}
          </p>

        </div>
      </div>

    </section>
  );
}
