"use client";

import React from "react";
import AIOrbit from "../components/AIOrbit";
import { Lock } from "lucide-react";

export default function AILearns() {
  return (
    <section
      id="ai-learns" 
      className="min-h-screen w-full bg-[#FFFFFF] text-black flex flex-col md:flex-row items-center justify-between py-20 px-8 md:px-16 scroll-mt-28"
    >
      
      {/* Left Column: Copy */}
      <div className="w-full md:w-5/12 mb-12 md:mb-0 select-none">
        <span className="font-mono text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full">
          Intelligence
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-syne text-black mt-4 mb-6 leading-tight">
          The more you use Paprs,<br />
          the better it knows you.
        </h2>
        
        <div className="space-y-4 text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
          <p>Every document you upload. Every step you complete. Every question you ask.</p>
          <p>Paprs learns your situation and gets better at anticipating what you need next — before you even think to ask.</p>
        </div>

        {/* Security disclaimer print */}
        <div className="mt-8 flex items-center gap-2 text-[10px] text-zinc-500 font-mono uppercase tracking-wider font-medium">
          <Lock className="w-3.5 h-3.5 text-black" />
          <span>Your data is encrypted & belongs to you. We never share it. Ever.</span>
        </div>
      </div>

      {/* Right Column: AI Orbit Simulator */}
      <div className="w-full md:w-6/12 flex items-center justify-center overflow-hidden">
        <AIOrbit />
      </div>

    </section>
  );
}
