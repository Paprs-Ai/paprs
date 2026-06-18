"use client";

import React from "react";
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

  // ── Flying chaos cards — fly from pain-slide-5 positions into scanner ────
  const flyProgress = clamp01(s0p / 0.45);
  // Fade chaos cards to 0 as scanning completes (full visual handoff to clean cards)
  const cardOpacity = flyProgress < 1 ? 1 : interp(s0p, 0.45, 0.82, 0.95, 0.0);

  const getFlyingCardStyle = (
    start: { x: number; y: number; r: number },
    end: { x: number; y: number; r: number }
  ) => {
    const x = interp(flyProgress, 0, 1, start.x, end.x);
    const y = interp(flyProgress, 0, 1, start.y, end.y);
    const r = interp(flyProgress, 0, 1, start.r, end.r);
    // Start at full scale (matching bridge cards), shrink as absorbed by scanner
    const scale = interp(flyProgress, 0, 1, 1.0, 0.46);
    return {
      transform: `translate(calc(-50% + ${x}vw), calc(-50% + ${y}vh)) rotate(${r}deg) scale(${scale})`,
      opacity: cardOpacity,
      transition: "transform 0.1s ease-out, opacity 0.3s ease",
    };
  };

  // Start positions match HeroAndPain bridge card END positions (bc1-bc6 at bridgeGather=1)
  // so the documents are already ~50% gathered toward the scanner when this section begins
  const fc1 = getFlyingCardStyle({ x: -28, y: -11, r:  -8 }, { x: -26, y: -5, r: -8 });
  const fc2 = getFlyingCardStyle({ x: -24, y:   9, r:   6 }, { x: -23, y:  3, r:  5 });
  const fc3 = getFlyingCardStyle({ x: -11, y: -16, r:  -3 }, { x: -25, y: -8, r: -3 });
  const fc4 = getFlyingCardStyle({ x:  -8, y:  12, r:  10 }, { x: -22, y:  4, r:  9 });
  const fc5 = getFlyingCardStyle({ x:   5, y: -10, r:  -9 }, { x: -25, y: -3, r: -6 });
  const fc6 = getFlyingCardStyle({ x:   0, y:  15, r:   4 }, { x: -23, y:  5, r:  7 });

  // ── Scanner state ─────────────────────────────────────────────────────────
  const scanProgress   = Math.round(interp(s0p, 0.45, 0.85, 0, 100));
  const docsProcessed  = Math.round(interp(s0p, 0.45, 0.85, 0, 6));
  const scannerActive  = s0p >= 0.45;
  const scannerDone    = s0p >= 0.85;

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
          {/* SLIDE 0 — Scanner transition: chaos → organised               */}
          {/* Left: scanner machine absorbs flying docs                     */}
          {/* Right: organised clean cards materialise as output            */}
          {/* ────────────────────────────────────────────────────────────── */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 lg:px-28 select-none relative overflow-hidden">

            {/* ── 6 flying chaos cards (desktop only, z-[3]) ── */}
            <div className="hidden md:block absolute inset-0 pointer-events-none z-[3]">
              <div className="absolute left-1/2 top-1/2 paper-float"
                style={{ "--paper-rotate": `${interp(flyProgress, 0, 1, -15, -8)}deg`, ...fc1 } as React.CSSProperties}>
                <DocumentCard type="nie" status="chaos" />
              </div>
              <div className="absolute left-1/2 top-1/2 paper-float [animation-delay:-1.2s]"
                style={{ "--paper-rotate": `${interp(flyProgress, 0, 1, 12, 5)}deg`, ...fc2 } as React.CSSProperties}>
                <DocumentCard type="padron" status="chaos" />
              </div>
              <div className="absolute left-1/2 top-1/2 paper-float [animation-delay:-2.5s]"
                style={{ "--paper-rotate": `${interp(flyProgress, 0, 1, -5, -3)}deg`, ...fc3 } as React.CSSProperties}>
                <DocumentCard type="seg_social" status="chaos" />
              </div>
              <div className="absolute left-1/2 top-1/2 paper-float [animation-delay:-3.8s]"
                style={{ "--paper-rotate": `${interp(flyProgress, 0, 1, 20, 9)}deg`, ...fc4 } as React.CSSProperties}>
                <DocumentCard type="hacienda" status="chaos" />
              </div>
              <div className="absolute left-1/2 top-1/2 paper-float [animation-delay:-0.7s]"
                style={{ "--paper-rotate": `${interp(flyProgress, 0, 1, -18, -6)}deg`, ...fc5 } as React.CSSProperties}>
                <DocumentCard type="nie" status="chaos" />
              </div>
              <div className="absolute left-1/2 top-1/2 paper-float [animation-delay:-1.9s]"
                style={{ "--paper-rotate": `${interp(flyProgress, 0, 1, 8, 7)}deg`, ...fc6 } as React.CSSProperties}>
                <DocumentCard type="seg_social" status="chaos" />
              </div>
            </div>

            {/* ── Scanner machine — portrait box, left-centre of screen ── */}
            <div
              className="hidden md:flex absolute left-1/2 top-1/2 flex-col rounded-2xl overflow-hidden z-[10]"
              style={{
                width: "282px",
                height: "410px",
                transform: `translate(calc(-50% - 24vw), -50%) translateY(${interp(s0p, 0.05, 0.30, 18, 0)}px)`,
                opacity: interp(flyProgress, 0.06, 0.32, 0, 1),
                backgroundColor: scannerActive ? "rgba(22,163,74,0.035)" : "rgba(248,250,252,0.75)",
                border: `1.5px solid ${scannerActive ? "rgba(22,163,74,0.45)" : "rgba(203,213,225,0.7)"}`,
                boxShadow: scannerActive
                  ? "0 0 0 4px rgba(22,163,74,0.07), 0 12px 48px rgba(22,163,74,0.14), 0 4px 24px rgba(0,0,0,0.07)"
                  : "0 4px 20px rgba(0,0,0,0.06)",
                backdropFilter: "blur(10px)",
                transition: "border-color 0.6s ease, box-shadow 0.6s ease, background-color 0.6s ease",
              }}
            >
              {/* ── Header strip ── */}
              <div
                className="flex items-center justify-between px-4 py-2.5 flex-shrink-0"
                style={{ borderBottom: `1px solid ${scannerActive ? "rgba(22,163,74,0.18)" : "rgba(203,213,225,0.55)"}` }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: scannerActive ? "#16A34A" : "#94a3b8",
                      boxShadow: scannerActive ? "0 0 6px rgba(22,163,74,0.9)" : "none",
                    }}
                  />
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 font-semibold">Paprs Engine</span>
                </div>
                <span
                  className="font-mono text-[9px] font-bold transition-colors duration-500"
                  style={{ color: scannerDone ? "#16A34A" : scannerActive ? "#D4820A" : "#94a3b8" }}
                >
                  {scannerDone ? "Done ✓" : scannerActive ? "Scanning…" : "Ready"}
                </span>
              </div>

              {/* ── Scanner body — chaos cards pile up behind this via z-index ── */}
              <div className="relative flex-1 overflow-hidden">
                {/* Green background wash when active */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                  style={{ opacity: scannerActive ? 1 : 0, background: "rgba(22,163,74,0.04)" }}
                />
                {/* Laser sweep */}
                {scannerActive && (
                  <div className="scan-sweep absolute inset-0 pointer-events-none" />
                )}
                {/* Corner brackets */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#16A34A]/55 z-20" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#16A34A]/55 z-20" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#16A34A]/55 z-20" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#16A34A]/55 z-20" />
                {/* Centre status pill */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.18em] font-bold flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-500"
                    style={scannerActive
                      ? { color: "#16A34A", backgroundColor: "rgba(22,163,74,0.10)", border: "1px solid rgba(22,163,74,0.25)" }
                      : { color: "#94a3b8", backgroundColor: "rgba(248,250,252,0.8)", border: "1px solid rgba(203,213,225,0.6)" }
                    }
                  >
                    {scannerActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-ping flex-shrink-0" />
                    )}
                    {scannerDone ? "Organised ✓" : scannerActive ? "Organising…" : "Assembling…"}
                  </div>
                </div>
              </div>

              {/* ── Footer progress bar ── */}
              <div
                className="px-4 py-3 flex-shrink-0"
                style={{ borderTop: `1px solid ${scannerActive ? "rgba(22,163,74,0.18)" : "rgba(203,213,225,0.55)"}` }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${scanProgress}%`, backgroundColor: "#16A34A" }}
                    />
                  </div>
                  <span className="font-mono text-[9px] text-slate-400 w-7 text-right">{scanProgress}%</span>
                </div>
                <div className="font-mono text-[8px] text-slate-400">
                  {scannerActive
                    ? `${docsProcessed} / 6 documents organised`
                    : "6 documents queued"}
                </div>
              </div>
            </div>

            {/* ── LEFT spacer — lets scanner float freely in this zone ── */}
            <div className="hidden md:block md:w-5/12 h-full flex-shrink-0" />

            {/* ── RIGHT — heading + staggered organised-doc output ── */}
            <div className="w-full md:w-7/12 h-full flex flex-col justify-center gap-8 relative z-20 md:pl-6">
              <div>
                <span className="font-mono text-xs font-bold text-[#16A34A] uppercase bg-[#16A34A]/10 px-3 py-1 rounded-full w-fit inline-block">
                  Paprs appears
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-slate-950 mt-6 mb-4 leading-tight">
                  There&apos;s a better way.
                </h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md">
                  The same pile becomes a roadmap: deadlines, dependencies, documents, and the next plain-language step.
                </p>
              </div>

              {/* Staggered clean cards — appear as scanner outputs them */}
              <div className="relative w-[400px] h-[360px] pointer-events-none">
                {/* Card 1 — NIE (back layer) */}
                <div
                  className="absolute"
                  style={{
                    opacity: c1Opacity,
                    transform: `translate(-52px, calc(-34px + ${c1Y}px)) rotate(-11deg) scale(0.88)`,
                  }}
                >
                  <DocumentCard type="nie" status="clean" progress={100} />
                </div>
                {/* Card 2 — Seg Social (middle) */}
                <div
                  className="absolute"
                  style={{
                    opacity: c2Opacity,
                    transform: `translate(42px, calc(-18px + ${c2Y}px)) rotate(8deg) scale(0.88)`,
                  }}
                >
                  <DocumentCard type="seg_social" status="clean" progress={40} />
                </div>
                {/* Card 3 — Padron (front) */}
                <div
                  className="absolute shadow-2xl"
                  style={{
                    opacity: c3Opacity,
                    transform: `translate(6px, calc(26px + ${c3Y}px)) rotate(-2deg) scale(0.94)`,
                  }}
                >
                  <DocumentCard type="padron" status="clean" progress={100} />
                </div>
                {/* "Everything organised" label */}
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
