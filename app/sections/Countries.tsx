"use client";

import React from "react";
import CountryMap from "../components/CountryMap";

const Q1 = [
  { flag: "🇨🇭", code: "CH", name: "Switzerland" },
  { flag: "🇩🇪", code: "DE", name: "Germany" },
  { flag: "🇫🇷", code: "FR", name: "France" },
];
const Q2 = [
  { flag: "🇮🇹", code: "IT", name: "Italy" },
  { flag: "🇵🇹", code: "PT", name: "Portugal" },
];
const Q3 = [
  { flag: "🇳🇱", code: "NL", name: "Netherlands" },
  { flag: "🇦🇹", code: "AT", name: "Austria" },
];

export default function Countries() {
  return (
    <section id="countries" className="relative min-h-screen w-full bg-[#FFFFFF] overflow-hidden scroll-mt-28">

      {/* Full-section map background */}
      <div className="absolute inset-0 w-full h-full">
        <CountryMap />
      </div>

      {/* Left column fade */}
      <div className="absolute inset-y-0 left-0 w-[44%] bg-gradient-to-r from-[#FFFFFF] via-[#FFFFFF]/90 to-transparent pointer-events-none z-10" />
      {/* Right column fade */}
      <div className="absolute inset-y-0 right-0 w-[42%] bg-gradient-to-l from-[#FFFFFF] via-[#FFFFFF]/90 to-transparent pointer-events-none z-10" />
      {/* Top + bottom edge fades */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FFFFFF] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FFFFFF] to-transparent pointer-events-none z-10" />

      {/* 3-column content layout */}
      <div className="relative z-20 flex min-h-screen max-w-[1440px] w-full mx-auto px-6 md:px-12 lg:px-20">

        {/* LEFT — Title */}
        <div className="w-[38%] flex flex-col justify-center pr-8 py-20 select-none">
          <span className="font-mono text-xs font-bold text-black uppercase tracking-widest bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full w-fit">
            Geography
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold font-syne text-black mt-5 mb-5 leading-[1.05]">
            Starting in<br />Spain.<br />
            Growing<br />
            across Europe.
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed max-w-xs">
            Paprs resolves the local rules so you can focus on building your life — wherever that country is.
          </p>
        </div>

        {/* CENTER */}
        <div className="flex-1" />

        {/* RIGHT — Roadmap cards */}
        <div className="w-[34%] flex flex-col justify-center py-20 pl-4 gap-4 select-none">

          {/* Spain — Featured live card */}
          <div className="relative bg-white/85 border border-zinc-300 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-3xl leading-none">🇪🇸</span>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-black font-bold mb-0.5">Live Now</p>
                <h3 className="font-syne font-extrabold text-xl text-black leading-none">Spain</h3>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-black text-white rounded-full px-3 py-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse block" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider">Available</span>
            </div>
          </div>

          {/* Q1 2026 group */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="h-px flex-1 bg-zinc-200" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-black font-bold">Q1 2026</span>
              <div className="h-px flex-1 bg-zinc-200" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Q1.map((c) => (
                <div key={c.code} className="bg-white/80 backdrop-blur-sm border border-zinc-300 rounded-xl p-3 flex flex-col items-center gap-1.5 hover:border-black transition-colors duration-200">
                  <span className="text-2xl leading-none">{c.flag}</span>
                  <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-wider">{c.code}</span>
                  <span className="font-syne font-bold text-[11px] text-black text-center leading-tight">{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Q2 2026 group */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <div className="h-px flex-1 bg-zinc-200" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Q2 2026</span>
              <div className="h-px flex-1 bg-zinc-200" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Q2.map((c) => (
                <div key={c.code} className="bg-white/60 backdrop-blur-sm border border-zinc-200 rounded-xl p-3 flex flex-col items-center gap-1.5 opacity-80">
                  <span className="text-2xl leading-none">{c.flag}</span>
                  <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-wider">{c.code}</span>
                  <span className="font-syne font-bold text-[11px] text-zinc-700 text-center leading-tight">{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Q3 2026 group */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <div className="h-px flex-1 bg-zinc-200" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-bold">Q3 2026</span>
              <div className="h-px flex-1 bg-zinc-200" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Q3.map((c) => (
                <div key={c.code} className="bg-white/50 backdrop-blur-sm border border-zinc-200 rounded-xl p-3 flex flex-col items-center gap-1.5 opacity-60">
                  <span className="text-2xl leading-none">{c.flag}</span>
                  <span className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-wider">{c.code}</span>
                  <span className="font-syne font-bold text-[11px] text-zinc-600 text-center leading-tight">{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* More countries hint */}
          <p className="font-mono text-[9px] text-zinc-500 text-center uppercase tracking-widest pt-1 font-medium">
            + more countries in 2027
          </p>

        </div>
      </div>

    </section>
  );
}
