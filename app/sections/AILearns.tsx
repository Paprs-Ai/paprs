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
      className="min-h-screen w-full bg-[#FFFFFF] text-black flex flex-col md:flex-row items-center justify-between py-20 px-8 md:px-16 scroll-mt-28"
    >
      
      {/* Left Column: Copy */}
      <div className="w-full md:w-5/12 mb-12 md:mb-0 select-none">
        <span className="font-mono text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full">
          {dict.aiLearns.tag}
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-syne text-black mt-4 mb-6 leading-tight whitespace-pre-line">
          {dict.aiLearns.title}
        </h2>
        
        <div className="space-y-4 text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
          <p>{dict.aiLearns.p1}</p>
          <p>{dict.aiLearns.p2}</p>
        </div>

        {/* Security disclaimer print */}
        <div className="mt-8 flex items-center gap-2 text-[10px] text-zinc-500 font-mono uppercase tracking-wider font-medium">
          <Lock className="w-3.5 h-3.5 text-black" />
          <span>{dict.aiLearns.securityDisclaimer}</span>
        </div>
      </div>

      {/* Right Column: AI Orbit Simulator */}
      <div className="w-full md:w-6/12 flex items-center justify-center overflow-hidden">
        <AIOrbit />
      </div>

    </section>
  );
}
