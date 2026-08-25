"use client";

import React from "react";
import AIOrbit from "../components/AIOrbit";
import { Lock } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function AILearns() {
  const { dict } = useLanguage();

  return (
    <section
      id="ai-learns" 
      className="ai-learns-section mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col items-center justify-between gap-8 scroll-mt-28 bg-[#FFFFFF] px-4 py-16 text-black sm:px-6 sm:py-20 md:px-12 lg:flex-row lg:gap-12 lg:px-20"
    >
      
      {/* Left Column: Copy */}
      <div className="mb-4 w-full max-w-2xl select-none lg:mb-0 lg:w-5/12">
        <span className="font-mono text-[10px] sm:text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full">
          {dict.aiLearns.tag}
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-syne text-black mt-3 sm:mt-4 mb-4 sm:mb-6 leading-tight whitespace-pre-line">
          {dict.aiLearns.title}
        </h2>
        
        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
          <p>{dict.aiLearns.p1}</p>
          <p>{dict.aiLearns.p2}</p>
        </div>

        {/* Security disclaimer print */}
        <div className="mt-6 sm:mt-8 flex items-center gap-2 text-[9px] sm:text-[10px] text-zinc-500 font-mono uppercase tracking-wider font-medium">
          <Lock className="w-3.5 h-3.5 text-black" />
          <span>{dict.aiLearns.securityDisclaimer}</span>
        </div>
      </div>

      {/* Right Column: AI Orbit Simulator */}
      <div className="flex w-full max-w-2xl items-center justify-center overflow-hidden lg:w-6/12 lg:max-w-none">
        <AIOrbit />
      </div>

    </section>
  );
}
