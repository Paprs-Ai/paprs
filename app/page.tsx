"use client";

import React from "react";

import HeroAndPain from "./sections/HeroAndPain";
import HowItWorks from "./sections/HowItWorks";
import AutonomoEngine from "./sections/AutonomoEngine";
import PaprsQRAndVault from "./sections/PaprsQRAndVault";
import SyntheticBenchmark from "./sections/SyntheticBenchmark";
import AILearns from "./sections/AILearns";
import Countries from "./sections/Countries";
import FinalCTA from "./sections/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFFFF] text-black font-sans selection:bg-black selection:text-white">
      
      {/* Sticky Top Header */}
      <header 
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50 flex justify-between items-center px-6 py-3.5 rounded-full border border-black/15 bg-white/80 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.08)] select-none text-black transition-all"
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-syne font-extrabold text-lg tracking-tight text-black">
          <span className="text-black font-black">p.</span>aprs
        </a>

        {/* Navigation Links */}
        <nav className="hidden lg:flex gap-6 text-[10px] font-mono uppercase tracking-widest text-black/75">
          <a href="#pain" className="transition-colors hover:text-black font-bold">Reality</a>
          <a href="#how-it-works" className="transition-colors hover:text-black font-bold">Product</a>
          <a href="#autonomo-engine" className="transition-colors hover:text-black font-bold">Autónomo</a>
          <a href="#qr-vault" className="transition-colors hover:text-black font-bold">QR & Vault</a>
          <a href="#benchmark" className="transition-colors hover:text-black font-bold">AI vs Human</a>
          <a href="#ai-learns" className="transition-colors hover:text-black font-bold">Intelligence</a>
          <a href="#countries" className="transition-colors hover:text-black font-bold">Europe</a>
        </nav>

        {/* Nav CTA */}
        <div>
          <a 
            href="#cta" 
            className="px-4 py-1.5 rounded-full border border-black text-white bg-black hover:bg-zinc-800 transition-all duration-300 font-mono text-[9px] font-bold uppercase tracking-wider shadow-sm"
          >
            Get Started
          </a>
        </div>
      </header>

      {/* Main Sections Storyline */}
      <main className="flex-1">
        <HeroAndPain />
        <HowItWorks />
        <AutonomoEngine />
        <PaprsQRAndVault />
        <SyntheticBenchmark />
        <AILearns />
        <Countries />
        {/* Testimonials disabled for now */}
        {/* <SocialProof /> */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <footer className="bg-[#FFFFFF] border-t border-zinc-200 py-12 px-6 text-center select-none font-mono text-[10px] text-zinc-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Paprs. All rights reserved. Built in Spain.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black transition-colors font-medium">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors font-medium">Terms of Service</a>
            <a href="#" className="hover:text-black transition-colors font-medium">Cookies</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
