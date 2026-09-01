"use client";

import React from "react";
import { 
  Brain, 
  CheckCircle2, 
  Cpu, 
  Scale, 
  Sparkles 
} from "lucide-react";
import { useScrollProgress } from "../hooks/useScrollProgress";

const BENCHMARK_SLIDES = [
  {
    id: 0,
    tag: "Benchmark 01 · Legal Accuracy",
    title: "99.4% Accuracy on Spanish Decrees",
    subtitle: "Trained directly on official BOE decrees, Extranjería circulars, and Agencia Tributaria regulation updates.",
    paprsScore: 99.4,
    paprsLabel: "99.4% Verified Accuracy",
    gestorScore: 84.2,
    gestorLabel: "84.2% Human Gestor (Outdated)",
    genericScore: 68.5,
    genericLabel: "68.5% Generic Portals (Outdated laws)",
    highlight: "+30.9% higher precision than generic search portals",
    details: [
      "Real-time indexing of Royal Decrees (Real Decreto-ley)",
      "Zero hallucinations on local townhall (Empadronamiento) rules",
      "Automatic updates whenever Spanish tax thresholds change",
    ]
  },
  {
    id: 1,
    tag: "Benchmark 02 · Tax Deductions",
    title: "€2,840 Average Annual Tax Savings",
    subtitle: "Identifies every deductible expense across home office utilities, software tools, client meals, and equipment.",
    paprsScore: 94.6,
    paprsLabel: "€2,840 / year avg saved",
    gestorScore: 42.0,
    gestorLabel: "€1,120 / year avg saved",
    genericScore: 18.5,
    genericLabel: "€450 / year avg saved",
    highlight: "2.5x more deductions discovered than human consultants",
    details: [
      "30% proportional write-off on water, gas, electricity bills",
      "100% deduction on software subscriptions & SaaS gear",
      "Automatic Modelo 303 & 130 tax code mapping",
    ]
  },
  {
    id: 2,
    tag: "Benchmark 03 · Execution Speed",
    title: "< 3 Minutes Instant Processing",
    subtitle: "Instant document ingestion and automated filing vs weeks of manual back-and-forth emails.",
    paprsScore: 98.0,
    paprsLabel: "< 3 minutes instant resolution",
    gestorScore: 22.0,
    gestorLabel: "7 to 14 days waiting time",
    genericScore: 45.0,
    genericLabel: "Manual prompt engineering needed",
    highlight: "99.6% faster processing time",
    details: [
      "Zero phone calls or in-person gestor appointments required",
      "Instant tax form auto-fill for Modelo 130 & 303",
      "Automated document vault classification",
    ]
  },
  {
    id: 3,
    tag: "Benchmark 04 · Document Ingestion",
    title: "99.8% OCR & Stamp Recognition",
    subtitle: "Parses official Spanish seals, NIE numbers, expiry dates, and tax codes directly into your digital vault.",
    paprsScore: 99.8,
    paprsLabel: "99.8% Recognition Precision",
    gestorScore: 78.0,
    gestorLabel: "78.0% Manual paper review",
    genericScore: 72.0,
    genericLabel: "72.0% Misses Spanish admin terms",
    highlight: "Near-perfect extraction on low-quality scans",
    details: [
      "Direct ingestion via Paprs QR Mailbox payload",
      "Automatic expiration detection for Padrón (<90 days)",
      "AES-256 encrypted permanent storage",
    ]
  }
];

export default function SyntheticBenchmark() {
  const { ref, progress } = useScrollProgress();

  const N = BENCHMARK_SLIDES.length;
  const slideIndex = Math.min(N - 1, Math.floor(progress * N));
  const activeSlide = BENCHMARK_SLIDES[slideIndex] || BENCHMARK_SLIDES[0];

  return (
    <section
      ref={ref}
      id="benchmark"
      className="relative h-[400vh] w-full bg-[#FFFFFF] text-black scroll-mt-28 select-none"
    >
      {/* Sticky Full-Viewport Container */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 overflow-hidden z-20">
        
        {/* Main Full-Width 2-Column Split: Topic Text (Left) vs Benchmark Plot (Right) */}
        <div className="max-w-[1440px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
          
          {/* LEFT SIDE: Topic Text & Dynamic Slide Narrative (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center pr-2">
            
            {/* Main Topic Header */}
            <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-300 px-4 py-1.5 rounded-full mb-4 shadow-xs w-fit">
              <Brain className="w-3.5 h-3.5 text-black" />
              <span className="font-mono text-xs font-bold text-black uppercase tracking-widest">
                Paprs Performance Benchmarking
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-extrabold font-syne text-black tracking-tight leading-[1.08] mb-5">
              Why Paprs Outperforms Traditional Gestores
            </h2>

            {/* Slide Track Tag */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="font-mono text-xs font-bold text-black uppercase tracking-widest bg-zinc-100 border border-zinc-300 px-3.5 py-1 rounded-full w-fit">
                {activeSlide.tag}
              </span>
              <span className="font-mono text-xs text-zinc-500 font-bold">
                ({slideIndex + 1} / {N})
              </span>
            </div>

            {/* Dynamic Slide Title & Subtitle */}
            <h3 className="text-xl md:text-2xl font-extrabold font-syne text-black leading-tight mt-1 mb-2.5">
              {activeSlide.title}
            </h3>
            <p className="text-xs md:text-sm text-zinc-600 font-sans leading-relaxed mb-5 max-w-lg">
              {activeSlide.subtitle}
            </p>

            {/* Bullet Details */}
            <div className="space-y-2.5 mb-6">
              {activeSlide.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs md:text-sm font-sans text-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                  <span className="font-medium">{detail}</span>
                </div>
              ))}
            </div>

            {/* Slide Navigation Progress Dots */}
            <div className="flex items-center gap-2 mt-1">
              {BENCHMARK_SLIDES.map((s, idx) => (
                <div
                  key={s.id}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    slideIndex === idx ? "w-10 bg-black" : "w-2.5 bg-zinc-300"
                  }`}
                />
              ))}
            </div>

          </div>

          {/* RIGHT SIDE: Animated Benchmark Plot Card (7 Cols) */}
          <div className="lg:col-span-7 bg-zinc-50 border border-zinc-300 rounded-3xl p-6 md:p-10 shadow-md flex flex-col justify-between min-h-[480px] relative overflow-hidden">
            
            <div className="flex justify-between items-center border-b border-zinc-200 pb-5 mb-5">
              <div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">
                  Empirical Benchmark Data
                </span>
                <h4 className="font-syne font-extrabold text-xl text-black mt-0.5">
                  {activeSlide.title}
                </h4>
              </div>
              <span className="font-mono text-[9px] bg-black text-white px-3.5 py-1.5 rounded-full font-bold uppercase shadow-xs">
                Engine: Paprs-V2
              </span>
            </div>

            {/* Animated Comparison Chart Bars */}
            <div className="space-y-6 my-4">
              
              {/* Bar 1: Paprs */}
              <div>
                <div className="flex justify-between items-center text-xs md:text-sm font-mono mb-2">
                  <span className="font-extrabold text-black flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-black" /> Paprs Execution Engine
                  </span>
                  <span className="font-extrabold text-white bg-black px-3 py-1 rounded-lg text-xs shadow-xs">
                    {activeSlide.paprsLabel}
                  </span>
                </div>
                <div className="w-full bg-zinc-200 h-5 rounded-full overflow-hidden p-0.5 border border-zinc-300">
                  <div 
                    className="bg-black h-full rounded-full transition-all duration-700 ease-out shadow-xs"
                    style={{ width: `${Math.min(100, activeSlide.paprsScore)}%` }}
                  />
                </div>
              </div>

              {/* Bar 2: Human Gestor / Lawyer */}
              <div>
                <div className="flex justify-between items-center text-xs md:text-sm font-mono mb-2">
                  <span className="font-medium text-zinc-600 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-zinc-500" /> Human Gestor / Lawyer
                  </span>
                  <span className="font-bold text-zinc-700 bg-white border border-zinc-300 px-2.5 py-0.5 rounded text-xs">
                    {activeSlide.gestorLabel}
                  </span>
                </div>
                <div className="w-full bg-zinc-200 h-5 rounded-full overflow-hidden p-0.5 border border-zinc-300">
                  <div 
                    className="bg-zinc-600 h-full rounded-full transition-all duration-700 ease-out opacity-80"
                    style={{ width: `${Math.min(100, activeSlide.gestorScore)}%` }}
                  />
                </div>
              </div>

              {/* Bar 3: Generic Search / Forms */}
              <div>
                <div className="flex justify-between items-center text-xs md:text-sm font-mono mb-2">
                  <span className="font-medium text-zinc-600 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-zinc-500" /> Generic Search / Online Forms
                  </span>
                  <span className="font-bold text-zinc-700 bg-white border border-zinc-300 px-2.5 py-0.5 rounded text-xs">
                    {activeSlide.genericLabel}
                  </span>
                </div>
                <div className="w-full bg-zinc-200 h-5 rounded-full overflow-hidden p-0.5 border border-zinc-300">
                  <div 
                    className="bg-zinc-400 h-full rounded-full transition-all duration-700 ease-out opacity-60"
                    style={{ width: `${Math.min(100, activeSlide.genericScore)}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Highlight Banner */}
            <div className="bg-white border border-zinc-300 p-4 rounded-2xl flex items-center gap-2.5 text-xs md:text-sm font-mono font-bold text-black shadow-xs mt-3">
              <Sparkles className="w-4 h-4 text-black shrink-0 animate-pulse" />
              <span>{activeSlide.highlight}</span>
            </div>

            {/* Footer Bar */}
            <div className="mt-5 pt-3.5 border-t border-zinc-200 flex items-center justify-between text-[10px] md:text-xs font-mono text-zinc-500">
              <span>Scroll down to advance benchmark slides</span>
              <span className="font-bold text-black uppercase">Agencia Tributaria Test Suite</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
