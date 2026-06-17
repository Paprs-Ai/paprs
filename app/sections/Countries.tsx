"use client";

import React from "react";
import CountryMap from "../components/CountryMap";

export default function Countries() {
  return (
    <section id="countries" className="min-h-screen w-full bg-[#F7F4EE] text-slate-900 flex flex-col justify-center items-center py-20 px-8 relative border-t border-[#C4B9A8]/50 overflow-hidden scroll-mt-28">
      
      {/* Title / Copy */}
      <div className="max-w-3xl text-center mb-12 select-none">
        <span className="font-mono text-xs font-bold text-[#16A34A] uppercase tracking-widest bg-[#16A34A]/10 px-3 py-1 rounded-full">
          Geography
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-syne text-slate-950 mt-4 mb-4">
          Starting in Spain.<br />
          Growing across Europe.
        </h2>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
          Paprs is built for anyone navigating a new country — wherever that country is. We resolve the local rules so you can focus on building your life.
        </p>
      </div>

      {/* SVG Interactive Map */}
      <div className="w-full max-w-3xl mb-12">
        <CountryMap />
      </div>

      {/* Country cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl select-none">
        
        {/* Spain */}
        <div className="bg-white border-2 border-[#16A34A]/40 p-5 rounded-lg flex flex-col items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02] duration-300">
          <div className="w-10 h-10 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/30 flex items-center justify-center font-mono text-xs font-bold text-[#16A34A]">
            ES
          </div>
          <h4 className="font-syne font-bold text-base mt-1 text-slate-950">Spain</h4>
          <span className="font-mono text-xs text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
            Available Now
          </span>
        </div>

        {/* Switzerland */}
        <div className="bg-white border border-slate-200 p-5 rounded-lg flex flex-col items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02] duration-300">
          <div className="w-10 h-10 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/30 flex items-center justify-center font-mono text-xs font-bold text-[#16A34A]">
            CH
          </div>
          <h4 className="font-syne font-bold text-base mt-1 text-slate-950">Switzerland</h4>
          <span className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
            Q1 2026
          </span>
        </div>

        {/* Germany */}
        <div className="bg-white border border-slate-200 p-5 rounded-lg flex flex-col items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02] duration-300">
          <div className="w-10 h-10 rounded-full bg-slate-500/10 border border-slate-500/30 flex items-center justify-center font-mono text-xs font-bold text-slate-500">
            DE
          </div>
          <h4 className="font-syne font-bold text-base mt-1 text-slate-950">Germany</h4>
          <span className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
            Q3 2026
          </span>
        </div>

      </div>

    </section>
  );
}
