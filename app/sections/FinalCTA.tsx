"use client";

import React from "react";
import { MapPin, Lock, Check } from "lucide-react";

export default function FinalCTA() {
  return (
    <section
      id="cta"
      className="min-h-[80vh] w-full flex flex-col justify-center items-center text-[#1A1814] px-8 relative overflow-hidden select-none bg-[#F8FAFC] scroll-mt-28"
    >
 
      {/* Decorative floating badge */}
      <div className="relative border border-[#1A1814]/10 bg-white/40 px-4 py-1.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest mb-6 flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5 text-[#1A1814]" /> Live in Spain
      </div>
 
      {/* Content */}
      <div className="relative max-w-3xl text-center flex flex-col items-center gap-6">
        <h2 className="text-5xl md:text-7xl font-extrabold font-syne tracking-tight leading-[0.95]">
          Your paperwork.<br />Sorted.
        </h2>
        
        <p className="font-sans text-base md:text-xl text-[#1A1814]/80 font-medium max-w-lg leading-relaxed">
          Start for free. No credit card required. No gestor fees. Just your personal roadmap in minutes.
        </p>
 
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto justify-center">
          <a
            href="#"
            className="px-8 py-4 rounded-full bg-white text-[#16A34A] hover:bg-[#F8FAFC] font-syne font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_10px_25px_rgba(26,24,20,0.06)] hover:scale-105 flex items-center justify-center text-center"
          >
            Get started — it&apos;s free
          </a>
          <a
            href="#pain"
            className="px-8 py-4 rounded-full bg-transparent border-2 border-[#1A1814] text-[#1A1814] hover:bg-white/20 font-syne font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 flex items-center justify-center text-center"
          >
            See how it works ↑
          </a>
        </div>
 
        {/* Trust signals */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] font-mono uppercase tracking-wider font-semibold opacity-75 items-center">
          <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-[#1A1814]" /> Your data is encrypted</span>
          <span>•</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#1A1814]" /> Built in Spain</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Check className="w-3 h-3 text-[#1A1814]" /> Free to start</span>
        </div>
      </div>
 
    </section>
  );
}
