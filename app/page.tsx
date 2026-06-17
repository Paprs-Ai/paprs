"use client";
 
import React from "react";

import HeroAndPain from "./sections/HeroAndPain";
import HowItWorks from "./sections/HowItWorks";
import DashboardDemo from "./sections/DashboardDemo";
import Countries from "./sections/Countries";
import V1vsV2 from "./sections/V1vsV2";
import AILearns from "./sections/AILearns";
import SocialProof from "./sections/SocialProof";
import FinalCTA from "./sections/FinalCTA";
 
export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#16A34A]/25 selection:text-[#16A34A]">
      
      <header 
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl z-50 flex justify-between items-center px-6 py-3.5 rounded-full border border-slate-200/50 bg-[#F8FAFC]/75 backdrop-blur-md shadow-[0_12px_40px_rgba(26,24,20,0.04)] select-none text-[#1A1814]"
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-syne font-extrabold text-lg tracking-tight">
          <span className="text-[#16A34A]">p.</span>aprs
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-8 text-[10px] font-mono uppercase tracking-widest text-[#1A1814]/70">
          <a href="#pain" className="transition-colors hover:text-[#16A34A]">Reality</a>
          <a href="#how-it-works" className="transition-colors hover:text-[#16A34A]">Method</a>
          <a href="#dashboard-demo" className="transition-colors hover:text-[#16A34A]">Product</a>
          <a href="#features-v1-v2" className="transition-colors hover:text-[#16A34A]">Roadmap</a>
          <a href="#ai-learns" className="transition-colors hover:text-[#16A34A]">Intelligence</a>
        </nav>

        {/* Nav CTA */}
        <div>
          <a 
            href="#cta" 
            className="px-3.5 py-1.5 rounded-full border border-[#16A34A] text-[#16A34A] bg-[#16A34A]/10 hover:bg-[#16A34A] hover:text-white transition-all duration-300 font-mono text-[9px] font-bold uppercase tracking-wider"
          >
            Get Started
          </a>
        </div>
      </header>

      {/* Main Sections */}
      <main className="flex-1">
        <HeroAndPain />
        <HowItWorks />
        <DashboardDemo />
        <Countries />
        <V1vsV2 />
        <AILearns />
        <SocialProof />
        <FinalCTA />
      </main>

      {/* FOOTER */}
      <footer className="bg-[#F7F4EE] border-t border-[#C4B9A8]/50 py-12 px-6 text-center select-none font-mono text-[10px] text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Paprs. All rights reserved. Built in Spain.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#16A34A] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#16A34A] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#16A34A] transition-colors">Cookies</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
