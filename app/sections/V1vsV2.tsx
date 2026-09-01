"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, Sparkles } from "lucide-react";

export default function V1vsV2() {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const v1Items = [
    "Step-by-step guides",
    "Automated situation analysis",
    "Document reader",
    "Deadline tracking",
    "Call scripts",
    "Document vault",
    "Chat support",
  ];

  const v2Items = [
    "Direct filing for you",
    "Auto-fill forms",
    "Book appointments",
    "Submit applications",
    "Track responses",
    "Official submissions",
    "Full legal automation",
  ];

  return (
    <section
      ref={containerRef}
      id="features-v1-v2"
      className="min-h-screen w-full bg-[#FFFFFF] text-black flex flex-col justify-center items-center py-20 px-8 relative overflow-hidden scroll-mt-28"
    >
      
      {/* Title / Copy */}
      <div className="max-w-3xl text-center mb-16 select-none">
        <span className="font-mono text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full">
          Roadmap
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-syne text-black mt-4 mb-4">
          V1: Your guide through the maze.<br />
          V2: Direct execution for every step.
        </h2>
        <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-xl mx-auto">
          Right now, Paprs knows exactly what you need to do and tells you how to do it. Next, Paprs handles the paperwork and filings for you directly.
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl select-none">
        
        {/* V1 COLUMN (Fully Lit) */}
        <div className="bg-white border-2 border-black p-8 rounded-lg shadow-md flex flex-col gap-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-zinc-100 rounded-bl-full pointer-events-none"></div>
          <div>
            <h4 className="font-syne font-extrabold text-xl text-black">V1 — Available Now</h4>
            <p className="text-xs text-zinc-600 mt-1">Everything you need to successfully register and report.</p>
          </div>
          <hr className="border-zinc-200" />
          
          <ul className="flex flex-col gap-4 font-sans text-sm">
            {v1Items.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <span
                  className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white transition-all duration-500"
                  style={{
                    transform: inView ? "scale(1)" : "scale(0)",
                    opacity: inView ? 1 : 0,
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <Check className="w-3 h-3 text-white" />
                </span>
                <span className="text-black font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* V2 COLUMN */}
        <div className="bg-white border border-zinc-300 p-8 rounded-lg shadow-sm flex flex-col gap-6 relative overflow-hidden group cursor-help opacity-75 hover:opacity-100 transition-all duration-300">
          <div>
            <h4 className="font-syne font-extrabold text-xl text-black">V2 — Coming Next</h4>
            <p className="text-xs text-zinc-600 mt-1">Automated filing and direct execution on your behalf.</p>
          </div>
          <hr className="border-zinc-200" />
          
          <ul className="flex flex-col gap-4 font-sans text-sm opacity-60">
            {v2Items.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-black text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
                </span>
                <span className="text-black font-medium">{item}</span>
              </li>
            ))}
          </ul>

          {/* Hover Tooltip Overlay */}
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
            <Sparkles className="w-8 h-8 text-black mb-2" />
            <p className="font-syne font-bold text-sm text-black">Automated Filing Delegation</p>
            <p className="font-sans text-xs text-zinc-600 mt-1.5 max-w-[240px] leading-relaxed">
              These are coming in V2 — Paprs will submit forms, book appointments, and handle official filings for you directly.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}
