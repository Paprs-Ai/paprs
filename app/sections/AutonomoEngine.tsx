"use client";

import React, { useState } from "react";
import { 
  Building2, 
  CheckCircle2, 
  FileSpreadsheet, 
  Receipt, 
  Sparkles, 
  Wallet, 
  Zap 
} from "lucide-react";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { useLanguage } from "../context/LanguageContext";

const DEDUCTION_ICONS = [Building2, Zap, Receipt, Wallet];

// ─── Slide dot indicator (monochrome variant, matches Pain / How It Works) ─────
function SlideDots({ total, active }: { total: number; active: number }) {
  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-500 ${
            i === active ? "w-5 h-1.5 bg-black" : "w-1.5 h-1.5 bg-zinc-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function AutonomoEngine() {
  const { ref, progress } = useScrollProgress();
  const [activeModelTab, setActiveModelTab] = useState(0);
  const { dict } = useLanguage();

  const autonomoSlides = dict.autonomo.slides;
  const taxModels = dict.autonomo.taxModels;
  const deductionsList = dict.autonomo.deductions;

  const N = autonomoSlides.length;
  const slideIndex = Math.min(N - 1, Math.floor(progress * N));
  const activeSlide = autonomoSlides[slideIndex] || autonomoSlides[0];

  return (
    <section
      ref={ref}
      id="autonomo-engine"
      className="autonomo-story relative h-[400svh] w-full bg-[#FFFFFF] text-black scroll-mt-28 select-none"
    >
      {/* Sticky Full-Viewport Container */}
      <div className="autonomo-viewport sticky top-0 z-20 flex h-[100svh] w-full items-center justify-center overflow-hidden px-4 sm:px-6 md:px-12 lg:px-20">
        
        {/* Main Full-Width 2-Column Split: Topic Text (Left) vs Interactive Card (Right) */}
        <div className="autonomo-grid grid w-full max-w-[1440px] grid-cols-1 items-center gap-4 sm:gap-8 lg:grid-cols-12 lg:gap-16 xl:gap-24">
          
          {/* LEFT SIDE: Topic Text & Dynamic Slide Narrative (5 Cols) */}
          <div className="autonomo-copy flex flex-col justify-center pr-0 lg:col-span-5 lg:pr-2">
            
            {/* Main Topic Header */}
            <div className="autonomo-topic-tag mb-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-zinc-300 bg-zinc-100 px-3 py-1 shadow-xs sm:mb-4 sm:gap-2 sm:px-4 sm:py-1.5">
              <FileSpreadsheet className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-black" />
              <span className="font-mono text-[10px] sm:text-xs font-bold text-black uppercase tracking-widest">
                {dict.autonomo.tag}
              </span>
            </div>

            <h2 className="autonomo-heading mb-2 font-syne text-2xl leading-[1.08] font-extrabold tracking-tight text-black sm:mb-5 sm:text-3xl md:text-5xl lg:text-[3.25rem]">
              {dict.autonomo.title}
            </h2>

            {/* Slide Track Tag */}
            <div className="flex items-center gap-2 sm:gap-2.5 mb-1.5 sm:mb-3">
              <span className="font-mono text-[10px] sm:text-xs font-bold text-black uppercase tracking-widest bg-zinc-100 border border-zinc-300 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full w-fit">
                {activeSlide.tag}
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-zinc-500 font-bold">
                ({slideIndex + 1} / {N})
              </span>
            </div>

            {/* Dynamic Slide Title & Subtitle */}
            <h3 className="autonomo-slide-title mt-0.5 mb-1 font-syne text-lg leading-tight font-extrabold text-black sm:mt-1 sm:mb-2.5 sm:text-xl md:text-2xl">
              {activeSlide.title}
            </h3>
            <p className="autonomo-detail mb-3 hidden max-w-lg font-sans text-xs leading-relaxed text-zinc-600 sm:mb-5 sm:block md:text-sm">
              {activeSlide.subtitle}
            </p>

            {/* Bullet Details */}
            <div className="autonomo-bullets mb-3 hidden space-y-1.5 sm:mb-6 sm:block sm:space-y-2.5">
              {activeSlide.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-2 sm:gap-2.5 text-xs md:text-sm font-sans text-zinc-800">
                  <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-black shrink-0" />
                  <span className="font-medium">{detail}</span>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT SIDE: Interactive Feature Card Visualizer (7 Cols) */}
          <div className="autonomo-card relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl border border-zinc-300 bg-zinc-50 p-3.5 shadow-md sm:min-h-[380px] sm:rounded-3xl sm:p-6 md:p-10 lg:col-span-7 lg:min-h-[480px]">
            
            {/* Header of Card */}
            <div className="flex justify-between items-center border-b border-zinc-200 pb-2.5 sm:pb-5 mb-2.5 sm:mb-5">
              <div>
                <span className="font-mono text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">
                  {dict.autonomo.featureModuleTag}
                </span>
                <h4 className="font-syne font-extrabold text-base sm:text-xl text-black mt-0.5">
                  {activeSlide.title}
                </h4>
              </div>
              <span className="font-mono text-[8px] sm:text-[9px] bg-black text-white px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full font-bold uppercase shadow-xs">
                {dict.autonomo.autoFiledBadge}
              </span>
            </div>

            {/* DYNAMIC CARD SLIDE 01: Tax Returns */}
            {slideIndex === 0 && (
              <div className="space-y-2.5 sm:space-y-4 my-1 sm:my-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                  {taxModels.map((m, idx) => (
                    <button
                      key={m.code}
                      onClick={() => setActiveModelTab(idx)}
                  className={`rounded-xl border p-2 text-left transition-all duration-300 sm:rounded-2xl sm:p-3 ${
                        activeModelTab === idx
                          ? "border-black bg-white text-black shadow-[0_8px_20px_-16px_rgba(0,0,0,0.65)]"
                          : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400"
                      }`}
                    >
                      <span className="font-mono text-[9px] sm:text-[10px] font-bold block uppercase">{m.code}</span>
                      <span className="text-[9px] sm:text-[10px] font-syne font-extrabold block truncate mt-0.5">{m.name}</span>
                    </button>
                  ))}
                </div>

                <div className="bg-white border border-zinc-300 p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-xs">
                  <div className="flex justify-between items-start mb-1 sm:mb-2">
                    <div>
                      <span className="font-mono text-[8px] sm:text-[9px] text-zinc-500 font-bold uppercase">{dict.autonomo.taxModelsTitle}</span>
                      <h5 className="font-syne font-extrabold text-sm sm:text-lg text-black mt-0.5">
                        {taxModels[activeModelTab]?.code} — {taxModels[activeModelTab]?.name}
                      </h5>
                    </div>
                    <span className="font-mono text-[8px] sm:text-[9px] bg-zinc-100 border border-zinc-300 text-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-bold">
                      Due: {taxModels[activeModelTab]?.due}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-zinc-600 font-sans leading-relaxed">
                    {taxModels[activeModelTab]?.desc}
                  </p>
                </div>
              </div>
            )}

            {/* DYNAMIC CARD SLIDE 02: Expense Deductions */}
            {slideIndex === 1 && (
              <div className="space-y-2.5 sm:space-y-4 my-1 sm:my-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {deductionsList.map((d, idx) => {
                    const IconComp = DEDUCTION_ICONS[idx % DEDUCTION_ICONS.length];
                    return (
                      <div key={idx} className="bg-white border border-zinc-300 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl flex items-center gap-2.5 sm:gap-3.5 shadow-xs">
                        <div className="w-7 sm:w-9 h-7 sm:h-9 rounded-lg sm:rounded-xl bg-zinc-100 border border-zinc-300 flex items-center justify-center text-black shrink-0">
                          <IconComp className="w-3.5 sm:w-4.5 h-3.5 sm:h-4.5 text-black" />
                        </div>
                        <div>
                          <h5 className="font-syne font-bold text-[11px] sm:text-xs text-black leading-tight">{d.label}</h5>
                          <p className="font-mono text-[8.5px] sm:text-[9px] text-zinc-500 mt-0.5 font-semibold">{d.pct}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-white border border-zinc-300 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl flex justify-between items-center text-[10px] sm:text-xs font-mono shadow-xs">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-black animate-pulse" />
                    <span className="font-bold text-black">{dict.autonomo.deductionIdentified}</span>
                  </div>
                  <span className="font-extrabold text-black bg-zinc-100 border border-zinc-300 px-2 sm:px-3 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs">
                    +€2,840.50 {dict.autonomo.netSavings}
                  </span>
                </div>
              </div>
            )}

            {/* DYNAMIC CARD SLIDE 03: Invoicing */}
            {slideIndex === 2 && (
              <div className="space-y-2.5 sm:space-y-4 my-1 sm:my-2">
                <div className="bg-white border border-zinc-300 p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-xs space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center border-b border-zinc-100 pb-2 sm:pb-3">
                    <div>
                      <span className="font-mono text-[8px] sm:text-[9px] text-zinc-500 uppercase font-bold">{dict.autonomo.issuedFactura} #ES-2026-089</span>
                      <h5 className="font-syne font-extrabold text-xs sm:text-base text-black mt-0.5">Design Agency Client S.L.</h5>
                    </div>
                    <span className="font-mono text-[8px] sm:text-[9px] bg-black text-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded font-bold uppercase">
                      {dict.autonomo.irpfDeducted}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[11px] sm:text-xs font-mono">
                    <span className="text-zinc-600">{dict.autonomo.baseSubtotal}:</span>
                    <span className="font-bold text-black">€3,500.00</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] sm:text-xs font-mono">
                    <span className="text-zinc-600">{dict.autonomo.ivaAdded}:</span>
                    <span className="font-bold text-black">+€735.00</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] sm:text-xs font-mono border-t border-zinc-100 pt-1.5 sm:pt-2">
                    <span className="font-extrabold text-black">{dict.autonomo.totalReconciled}:</span>
                    <span className="font-extrabold text-black bg-zinc-100 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded border border-zinc-300">
                      €3,710.00 {dict.autonomo.netBadge}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* DYNAMIC CARD SLIDE 04: Intelligence */}
            {slideIndex === 3 && (
              <div className="space-y-2.5 sm:space-y-4 my-1 sm:my-2">
            <div className="space-y-2 rounded-xl border border-black bg-white p-3.5 text-black shadow-[0_10px_26px_-20px_rgba(0,0,0,0.7)] sm:space-y-3 sm:rounded-2xl sm:p-6">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-black animate-pulse sm:h-4 sm:w-4" />
                    <span className="font-mono text-[9px] font-bold text-zinc-600 uppercase sm:text-[10px]">{dict.autonomo.agenciaVerified}</span>
                  </div>
                  <h5 className="font-syne text-sm font-extrabold text-black sm:text-lg">
                    {dict.autonomo.trainedRoyalDecree}
                  </h5>
                  <p className="font-sans text-[11px] leading-relaxed text-zinc-600 sm:text-xs">
                    {dict.autonomo.gestorComparison}
                  </p>
                </div>
              </div>
            )}

            {/* Highlight Banner */}
            <div className="bg-white border border-zinc-300 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs md:text-sm font-mono font-bold text-black shadow-xs mt-1.5 sm:mt-3">
              <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-black shrink-0 animate-pulse" />
              <span>{activeSlide.highlight}</span>
            </div>

            {/* Footer Bar */}
            <div className="mt-2.5 sm:mt-5 pt-2 sm:pt-3.5 border-t border-zinc-200 flex items-center justify-between text-[9px] sm:text-[10px] md:text-xs font-mono text-zinc-500">
              <span>{dict.autonomo.scrollHint}</span>
              <span className="font-bold text-black uppercase">{dict.autonomo.compliantBadge}</span>
            </div>

          </div>

        </div>

        {/* Slide dots (bottom center, matches Pain / How It Works) */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-40">
          <SlideDots total={N} active={slideIndex} />
        </div>

      </div>
    </section>
  );
}
