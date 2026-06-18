"use client";

import React, { useState, useEffect } from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { Globe, MapPin, FileText, Target, Check, ArrowRight } from "lucide-react";
import DocumentCard from "../components/DocumentCard";

// ─── Slide dot indicator (green variant for clarity section) ──────────────────
function SlideDots({ total, active }: { total: number; active: number }) {
  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-500 ${
            i === active
              ? "w-5 h-1.5 bg-[#16A34A]"
              : "w-1.5 h-1.5 bg-slate-300"
          }`}
        />
      ))}
    </div>
  );
}

const SLIDE_LABELS = ["Paprs appears", "Step 01", "Step 02", "Step 03"];

export default function HowItWorks() {
  const { ref, progress } = useScrollProgress();


  const interp = (val: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    if (val <= inMin) return outMin;
    if (val >= inMax) return outMax;
    return outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);
  };
  const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

  // ── Sticky translate — 4 slides, 25% each, 300vh total ───────────────────
  // Each slide: 0.18 dwell + 0.06 snap = 0.24 per slide × 4 = 0.96
  const SW = 25; // 100/4

  const getStickyTranslate = (p: number): number => {
    if (p < 0.18) return 0;
    if (p < 0.24) return interp(p, 0.18, 0.24, 0, SW);
    if (p < 0.42) return SW;
    if (p < 0.48) return interp(p, 0.42, 0.48, SW, SW * 2);
    if (p < 0.66) return SW * 2;
    if (p < 0.72) return interp(p, 0.66, 0.72, SW * 2, SW * 3);
    return SW * 3;
  };

  const translatePercent = getStickyTranslate(progress);
  const activeSlide = Math.round(translatePercent / SW);

  // ── Per-slide local progress (0→1 within each slide's dwell zone) ─────────
  const s0p = clamp01((progress - 0) / 0.18);
  const s1p = clamp01((progress - 0.24) / 0.18);
  const s2p = clamp01((progress - 0.48) / 0.18);
  const s3p = clamp01((progress - 0.72) / 0.25);

  // ── Background: starts at rgb(248,250,252) to match HeroAndPain end color ──
  const bgR = Math.round(interp(progress, 0, 1, 248, 241));
  const bgG = Math.round(interp(progress, 0, 1, 250, 245));
  const bgB = Math.round(interp(progress, 0, 1, 252, 249));

  // ── Chaos card pile — cards stay at gathered positions, no flying ────────
  // Pile stays solid throughout Slide 0, aligned with HeroAndPain bridge cards
  const cardOpacity = 1.0;

  const getPileCardStyle = (pos: { x: number; y: number; r: number }) => ({
    transform: `translate(calc(-50% + ${pos.x}vw), calc(-50% + ${pos.y}vh)) rotate(${pos.r}deg)`,
    opacity: cardOpacity,
  });

  // Positions match HeroAndPain bridge card END positions (bc1-bc6 at bridgeGather=1)
  const fc1 = getPileCardStyle({ x: -30, y: -10, r:  -8 });
  const fc2 = getPileCardStyle({ x: -26, y:   8, r:   6 });
  const fc3 = getPileCardStyle({ x: -28, y:  -4, r: -12 });
  const fc4 = getPileCardStyle({ x: -22, y:  12, r:  10 });
  const fc5 = getPileCardStyle({ x: -24, y:  -8, r:  -5 });
  const fc6 = getPileCardStyle({ x: -20, y:   4, r:   4 });

  // ── Scanner state ─────────────────────────────────────────────────────────
  const scannerActive  = s0p >= 0.45;
  const scannerDone    = s0p >= 0.82;

  // ── Staggered clean-card reveals (right side output) ──────────────────────
  const c1Opacity = interp(s0p, 0.45, 0.62, 0, 1);
  const c1Y       = interp(s0p, 0.45, 0.62, 52, 0);
  const c2Opacity = interp(s0p, 0.57, 0.74, 0, 1);
  const c2Y       = interp(s0p, 0.57, 0.74, 52, 0);
  const c3Opacity = interp(s0p, 0.69, 0.86, 0, 1);
  const c3Y       = interp(s0p, 0.69, 0.86, 52, 0);

  // ── Slide 1 — onboarding form fills in, profile builds ────────────────────
  const textTyped1 = s1p > 0.20 ? "Student" : "";
  const textTyped2 = s1p > 0.45 ? "Barcelona" : "";
  const textTyped3 = s1p > 0.70 ? "Non-EU" : "";
  const profileLine1Opacity = interp(s1p, 0.25, 0.40, 0, 1);
  const profileLine2Opacity = interp(s1p, 0.45, 0.60, 0, 1);
  const profileLine3Opacity = interp(s1p, 0.60, 0.75, 0, 1);
  const profileLine4Opacity = interp(s1p, 0.75, 0.90, 0, 1);

  // ── Slide 2 — roadmap cards slide up, lines draw ──────────────────────────
  const roadmapCardsY = interp(s2p, 0, 0.40, 100, 0);
  const roadmapCardsOpacity = interp(s2p, 0, 0.30, 0, 1);
  const roadLineDraw = interp(s2p, 0.30, 0.70, 100, 0);

  // ── Slide 3 — step detail card expands, progress fills, stamp appears ─────
  const step3CardScale = interp(s3p, 0, 0.20, 0.9, 1);
  const step3Progress = interp(s3p, 0.10, 0.70, 14, 100);
  const showDoneStamp = s3p >= 0.70;

  const sliderOpacity = 1;

  return (
    <div ref={ref} id="how-it-works" className="relative h-[300vh] w-full scroll-mt-28">
      <div
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center z-10 transition-colors duration-500"
        style={{ backgroundColor: `rgb(${bgR},${bgG},${bgB})` }}
      >
        {/* Green radial glow */}
        <div className="absolute right-[-15%] top-[8%] h-[520px] w-[520px] rounded-full bg-[#16A34A]/10 blur-3xl z-0 pointer-events-none" />

        {/* ── Slider track ── */}
        <div
          className="flex h-full z-10"
          style={{
            transform: `translateX(-${translatePercent}%)`,
            width: "400%",
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            opacity: sliderOpacity,
          }}
        >

          {/* ────────────────────────────────────────────────────────────── */}
          {/* SLIDE 0 — Paprs appears                                       */}
          {/* Left: chaos pile stays in place, laser scans it               */}
          {/* Right: text + organised clean cards rise out                  */}
          {/* ────────────────────────────────────────────────────────────── */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-between px-8 md:px-20 lg:px-28 select-none relative overflow-hidden">



            {/* ── LEFT spacer — pile occupies this zone ── */}
            <div className="hidden md:block md:w-5/12 h-full flex-shrink-0" />

            {/* ── RIGHT — heading + staggered organised-doc output ── */}
            <div className="w-full md:w-7/12 h-full flex items-center gap-6 relative z-20 md:pl-6">
              {/* Text */}
              <div className="flex-1 flex flex-col justify-center gap-4 relative z-10">
                <span className="font-mono text-xs font-bold text-[#16A34A] uppercase bg-[#16A34A]/10 px-3 py-1 rounded-full w-fit inline-block">
                  Paprs appears
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-slate-950 leading-tight">
                  There&apos;s a better way.
                </h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-sm">
                  The same pile becomes a roadmap: deadlines, dependencies, documents, and the next plain-language step.
                </p>
              </div>

              {/* Staggered clean cards — appear as scanner outputs them */}
              <div className="relative w-[340px] h-[360px] pointer-events-none flex-shrink-0">
                <div
                  className="absolute"
                  style={{
                    opacity: 1,
                    transform: `translate(-40px, calc(-34px + ${c1Y}px)) rotate(-11deg) scale(0.88)`,
                  }}
                >
                  <DocumentCard type="nie" status="clean" progress={100} />
                </div>
                <div
                  className="absolute"
                  style={{
                    opacity: 1,
                    transform: `translate(36px, calc(-18px + ${c2Y}px)) rotate(8deg) scale(0.88)`,
                  }}
                >
                  <DocumentCard type="seg_social" status="clean" progress={40} />
                </div>
                <div
                  className="absolute shadow-2xl"
                  style={{
                    opacity: 1,
                    transform: `translate(4px, calc(26px + ${c3Y}px)) rotate(-2deg) scale(0.94)`,
                  }}
                >
                  <DocumentCard type="padron" status="clean" progress={100} />
                </div>
                <div
                  className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#16A34A] font-bold whitespace-nowrap transition-opacity duration-500"
                  style={{ opacity: interp(s0p, 0.82, 0.92, 0, 1) }}
                >
                  <Check className="w-3.5 h-3.5" />
                  Everything organised
                </div>
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────────────────────── */}
          {/* SLIDE 1 — Tell us who you are                                 */}
          {/* ────────────────────────────────────────────────────────────── */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 lg:px-28 select-none">
            <div className="w-full md:w-5/12 flex flex-col justify-center">
              <span className="font-mono text-xs font-bold text-[#16A34A] uppercase bg-[#16A34A]/10 px-3 py-1 rounded-full w-fit">
                Step 01
              </span>
              <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-slate-950 mt-6 mb-4 leading-tight">
                Tell us who you are.
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md">
                Three minutes. No forms. No legal jargon. Just plain questions that filter your exact bureaucratic situation.
              </p>
            </div>

            <div className="w-full md:w-6/12 h-full flex items-center justify-center relative">
              <div className="w-full max-w-lg flex flex-col md:flex-row gap-6 items-center justify-center">
                {/* Form card */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl w-64 shadow-2xl flex flex-col gap-4 font-mono text-xs text-slate-800">
                  <div className="text-[10px] text-slate-400 border-b border-slate-100 pb-2 uppercase tracking-widest font-semibold">
                    Quick Onboarding
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Visa Type:</span>
                    <div className="h-8 bg-slate-50 rounded px-3 flex items-center text-[#16A34A] font-medium border border-slate-200">{textTyped1}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Target City:</span>
                    <div className="h-8 bg-slate-50 rounded px-3 flex items-center text-[#16A34A] font-medium border border-slate-200">{textTyped2}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Origin:</span>
                    <div className="h-8 bg-slate-50 rounded px-3 flex items-center text-[#16A34A] font-medium border border-slate-200">{textTyped3}</div>
                  </div>
                </div>

                {/* Profile card */}
                <div className="bg-white border-2 border-[#16A34A]/40 p-6 rounded-lg w-64 shadow-2xl shadow-[#16A34A]/10 flex flex-col gap-3.5 font-mono text-xs text-slate-800">
                  <div className="text-[10px] text-[#16A34A] border-b border-[#16A34A]/10 pb-2 uppercase tracking-widest font-bold">
                    Generated Profile
                  </div>
                  <div className="flex items-center gap-2 text-slate-800 transition-opacity duration-300" style={{ opacity: profileLine1Opacity }}>
                    <Globe className="w-3.5 h-3.5 text-[#16A34A]" /><span>Non-EU · Student</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-800 transition-opacity duration-300" style={{ opacity: profileLine2Opacity }}>
                    <MapPin className="w-3.5 h-3.5 text-[#16A34A]" /><span>Barcelona</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#D4820A] transition-opacity duration-300" style={{ opacity: profileLine3Opacity }}>
                    <FileText className="w-3.5 h-3.5 text-[#D4820A]" /><span>Visa expires: 8 weeks</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#16A34A] font-semibold transition-opacity duration-300" style={{ opacity: profileLine4Opacity }}>
                    <Target className="w-3.5 h-3.5 text-[#16A34A]" /><span>3 immediate tasks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────────────────────── */}
          {/* SLIDE 2 — We build your roadmap                               */}
          {/* ────────────────────────────────────────────────────────────── */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 lg:px-28 select-none">
            <div className="w-full md:w-5/12 flex flex-col justify-center">
              <span className="font-mono text-xs font-bold text-[#16A34A] uppercase bg-[#16A34A]/10 px-3 py-1 rounded-full w-fit">
                Step 02
              </span>
              <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-slate-950 mt-6 mb-4 leading-tight">
                We build your roadmap.
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md">
                We map everything out. What&apos;s urgent. What comes first. What depends on what. You see the whole picture — clearly.
              </p>
            </div>

            <div className="w-full md:w-6/12 h-full flex items-center justify-center relative">
              <div
                className="w-full max-w-md flex flex-col gap-6 relative"
                style={{ transform: `translateY(${roadmapCardsY}px)`, opacity: roadmapCardsOpacity }}
              >
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  <path
                    d="M 190 280 L 190 190 M 190 100 L 190 30"
                    fill="none" stroke="#16A34A" strokeWidth="2"
                    strokeDasharray="4,4" strokeDashoffset={roadLineDraw}
                    className="transition-all duration-300"
                  />
                </svg>

                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-lg flex items-center justify-between z-10 w-full text-slate-800">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-slate-400">Task 03</div>
                    <div className="font-syne font-bold text-sm text-slate-900">Open Spanish Bank Account</div>
                    <div className="font-mono text-[10px] text-slate-400 mt-0.5">Depends on NIE certificate</div>
                  </div>
                  <div className="text-[10px] font-mono text-[#D4820A] bg-[#D4820A]/10 border border-[#D4820A]/20 px-2 py-0.5 rounded">Locked</div>
                </div>

                <div className="bg-white border-2 border-[#16A34A]/40 p-4 rounded-xl shadow-lg flex items-center justify-between z-10 w-full text-slate-800">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-[#16A34A] font-bold">Task 02 · URGENT</div>
                    <div className="font-syne font-bold text-sm text-slate-900">Get your NIE Number</div>
                    <div className="font-mono text-[10px] text-[#16A34A]/70 mt-0.5">Step 1 of 7 · Due in 3 weeks</div>
                  </div>
                  <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#16A34A] h-full w-[14%]" />
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-lg flex items-center justify-between z-10 w-full text-slate-800">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-slate-400">Task 01</div>
                    <div className="font-syne font-bold text-sm text-slate-900">Register on the Padrón</div>
                    <div className="font-mono text-[10px] text-[#16A34A] mt-0.5">Needed for NIE appointment</div>
                  </div>
                  <div className="text-[10px] font-mono text-[#16A34A] bg-[#16A34A]/10 border border-[#16A34A]/20 px-2 py-0.5 rounded">Ready</div>
                </div>
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────────────────────── */}
          {/* SLIDE 3 — Follow the steps                                    */}
          {/* ────────────────────────────────────────────────────────────── */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 lg:px-28 select-none">
            <div className="w-full md:w-5/12 flex flex-col justify-center">
              <span className="font-mono text-xs font-bold text-[#16A34A] uppercase bg-[#16A34A]/10 px-3 py-1 rounded-full w-fit">
                Step 03
              </span>
              <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-slate-950 mt-6 mb-4 leading-tight">
                Follow the steps.
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md">
                No confusion. No guessing. Just: do this, then this, then this. With every document, fee code, and translation ready.
              </p>
            </div>

            <div className="w-full md:w-6/12 h-full flex items-center justify-center relative">
              <div
                className="bg-[#F8FAFC] border-2 rounded-lg w-full max-w-md shadow-2xl p-6 relative font-sans transition-all duration-300 text-slate-800"
                style={{
                  transform: `scale(${step3CardScale})`,
                  borderColor: showDoneStamp ? "#16A34A" : "#E2E8F0",
                }}
              >
                <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
                  <div>
                    <span className="font-mono text-[9px] uppercase text-[#16A34A] font-bold">Plan 02 · NIE Registration</span>
                    <h4 className="font-syne font-bold text-lg text-slate-900 mt-1">Get your NIE Certificate</h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/20 uppercase font-semibold">Active</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 opacity-90 text-xs">
                    <Check className="w-3.5 h-3.5 text-[#16A34A] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900">Assemble documents</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Passport copy, EX-15 form, visa stamp</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 opacity-90 text-xs">
                    <Check className="w-3.5 h-3.5 text-[#16A34A] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900">Pay government tax code</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Modelo 790 - Code 012 (€9.84 fee)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-xs">
                    {showDoneStamp
                      ? <Check className="w-3.5 h-3.5 text-[#16A34A] mt-0.5 shrink-0" />
                      : <ArrowRight className="w-3.5 h-3.5 text-[#D4820A] mt-0.5 shrink-0" />
                    }
                    <div>
                      <p className="font-semibold text-slate-900">Present at Extranjería Office</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Carrer de Múrcia, Barcelona (Bring Cita confirmation)</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                  <div className="w-1/2">
                    <span className="text-[10px] font-mono text-slate-500 block mb-1">NIE Progress</span>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#16A34A] h-full transition-all duration-300" style={{ width: `${step3Progress}%` }} />
                    </div>
                  </div>
                  <div className={`border-4 border-[#16A34A] rounded px-3 py-1 text-[#16A34A] font-extrabold text-xs tracking-widest uppercase rotate-[-8deg] shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-500 flex items-center gap-1 ${showDoneStamp ? "scale-100 opacity-100" : "scale-150 opacity-0"}`}>
                    <Check className="w-4 h-4 text-[#16A34A]" /> DONE
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Chaos cards wrapper (direct child of sticky container, relative to w-full) ── */}
        <div
          className="hidden md:block absolute inset-0 pointer-events-none z-[12]"
          style={{
            opacity: `var(--doc-transition-progress, 0)`,
            transform: `translateY(calc((var(--doc-transition-progress, 0) - 1) * 100vh))`,
          }}
        >
          {/* Inner wrapper that handles slider translateX transition */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: `translateX(-${translatePercent * 4}%)`,
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="absolute left-1/2 top-1/2 paper-float" style={{ "--paper-rotate": "-8deg" } as React.CSSProperties}>
              <div style={fc1}><DocumentCard type="nie" status="chaos" /></div>
            </div>
            <div className="absolute left-1/2 top-1/2 paper-float [animation-delay:-1.2s]" style={{ "--paper-rotate": "6deg" } as React.CSSProperties}>
              <div style={fc2}><DocumentCard type="padron" status="chaos" /></div>
            </div>
            <div className="absolute left-1/2 top-1/2 paper-float [animation-delay:-2.5s]" style={{ "--paper-rotate": "-3deg" } as React.CSSProperties}>
              <div style={fc3}><DocumentCard type="seg_social" status="chaos" /></div>
            </div>
            <div className="absolute left-1/2 top-1/2 paper-float [animation-delay:-3.8s]" style={{ "--paper-rotate": "10deg" } as React.CSSProperties}>
              <div style={fc4}><DocumentCard type="hacienda" status="chaos" /></div>
            </div>
            <div className="absolute left-1/2 top-1/2 paper-float [animation-delay:-0.7s]" style={{ "--paper-rotate": "-9deg" } as React.CSSProperties}>
              <div style={fc5}><DocumentCard type="nie" status="chaos" /></div>
            </div>
            <div className="absolute left-1/2 top-1/2 paper-float [animation-delay:-1.9s]" style={{ "--paper-rotate": "4deg" } as React.CSSProperties}>
              <div style={fc6}><DocumentCard type="seg_social" status="chaos" /></div>
            </div>

            {/* Laser sweep — visible only while scanning, covers the pile area on left */}
            {scannerActive && !scannerDone && (
              <div
                className="pile-scan absolute"
                style={{ left: "0%", right: "54%", top: "18%", bottom: "18%" }}
              />
            )}

            {/* Subtle green glow behind pile when scanning */}
            {scannerActive && (
              <div
                className="absolute rounded-full pointer-events-none transition-opacity duration-700"
                style={{
                  left: "10%", right: "44%", top: "20%", bottom: "20%",
                  background: "radial-gradient(ellipse at center, rgba(22,163,74,0.08) 0%, transparent 70%)",
                  opacity: scannerDone ? 0 : 1,
                }}
              />
            )}
          </div>
        </div>

        {/* ── Slide dots (green) ── */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 transition-opacity duration-300"
          style={{ opacity: sliderOpacity }}
        >
          <SlideDots total={4} active={activeSlide} />
        </div>

        {/* ── Scroll hint ── */}
        {progress < 0.94 && (
          <div
            className="absolute bottom-8 right-8 z-40 flex items-center gap-2"
            style={{ opacity: interp(progress, 0, 0.08, 0, 0.55) }}
          >
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">scroll to continue</span>
          </div>
        )}

        {/* ── Slide label (top left) ── */}
        <div
          className="absolute top-8 left-8 z-40 transition-opacity duration-500"
          style={{ opacity: interp(progress, 0, 0.08, 0, 1) * sliderOpacity }}
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-400">
              {SLIDE_LABELS[activeSlide] ?? ""}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
