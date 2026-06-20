"use client";

import React, { useState, useEffect } from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { Globe, MapPin, FileText, Target, Check, ArrowRight, Lock, Cpu, Loader2, Clock } from "lucide-react";
import DocumentCard from "../components/DocumentCard";
import { IPhoneMockup } from "react-device-mockup";

// ─── Microtask Checklist Card (HowItWorks Slide 0) ──────────────────────────
function MicrotaskCard({
  type,
  overview,
  badgeText,
  badgeType,
  tasks,
  doneCount,
  totalCount,
}: {
  type: "nie" | "seg_social" | "padron";
  overview: string;
  badgeText: string;
  badgeType: "done" | "progress" | "pending";
  tasks: Array<{ text: string; done: boolean; active?: boolean }>;
  doneCount: number;
  totalCount: number;
}) {
  const progressPercent = Math.round((doneCount / totalCount) * 100);

  // Document details from type to match DocumentCard exactly
  const getDocDetails = () => {
    switch (type) {
      case "nie":
        return {
          title: "Certificado de Registro",
          subtitle: "Registro de Ciudadanos de la Unión",
          code: "EXP: NIE-2026-X83",
          sealColor: "text-[#16A34A]",
        };
      case "seg_social":
        return {
          title: "Seguridad Social",
          subtitle: "Resolución de Afiliación",
          code: "NUSS: 08/12345678/90",
          sealColor: "text-[#16A34A]",
        };
      case "padron":
        return {
          title: "Empadronamiento",
          subtitle: "Volante de Residencia Habitual",
          code: "REG: 08019-2026",
          sealColor: "text-[#16A34A]",
        };
    }
  };

  const details = getDocDetails();

  const badgeStyles = {
    done: "text-emerald-700 bg-emerald-50 border-emerald-200/50",
    progress: "text-amber-700 bg-amber-50 border-amber-200/50 animate-pulse",
    pending: "text-slate-500 bg-slate-50 border-slate-200/50",
  }[badgeType];

  return (
    <div className="relative w-72 h-[340px] p-6 rounded-2xl border-2 border-slate-200 bg-white shadow-2xl flex flex-col justify-between font-sans select-none overflow-hidden text-slate-900 text-left transition-all duration-300">
      {/* Background Watermark/Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* Upper Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md flex items-center justify-center border border-slate-200 bg-slate-50 flex-shrink-0">
              <span className={`text-[10px] font-bold ${details.sealColor}`}>ES</span>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-wider opacity-60 font-mono">España</p>
              <h4 className="text-[11px] font-bold leading-tight font-syne truncate max-w-[130px]">
                {details.title}
              </h4>
            </div>
          </div>
          <span className={`text-[8px] font-mono border px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${badgeStyles}`}>
            {badgeText}
          </span>
        </div>

        <p className="mt-2.5 text-[9px] uppercase font-mono opacity-50">
          {details.code}
        </p>
        <p className="text-[10.5px] font-semibold opacity-85 mt-0.5">
          {details.subtitle}
        </p>

        {/* Separator */}
        <hr className="my-2.5 border-dashed border-slate-200" />

        {/* Overview text (plain, no background container) */}
        <p className="text-[10px] text-slate-500 leading-normal mb-3">
          {overview}
        </p>

        {/* Tasks */}
        <div className="flex flex-col gap-2">
          {tasks.map((t, idx) => (
            <div key={idx} className="flex items-start gap-2.5 min-w-0">
              {t.done ? (
                <div className="w-4 h-4 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5" />
                </div>
              ) : t.active ? (
                <div className="w-4 h-4 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center text-amber-600 flex-shrink-0 mt-0.5 relative">
                  <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping" />
                  <Clock className="w-2.5 h-2.5" />
                </div>
              ) : (
                <div className="w-4 h-4 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-300 flex-shrink-0 mt-0.5">
                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                </div>
              )}
              <span className={`text-[10.5px] leading-tight min-w-0 break-words ${
                t.done ? "text-slate-400 line-through decoration-slate-400" : "text-slate-700 font-medium"
              }`}>
                {t.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Progress Bar */}
      <div className="relative z-10 pt-2 border-t border-dashed border-slate-200">
        <div className="flex justify-between text-[8px] opacity-60 font-mono mb-1">
          <span>Action Progress</span>
          <span>{doneCount} / {totalCount} Done ({progressPercent}%)</span>
        </div>
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-700 ${
              badgeType === "done" ? "bg-emerald-500" : badgeType === "progress" ? "bg-amber-500" : "bg-slate-300"
            }`}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

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

const SLIDE_LABELS = [
  "Paprs appears", 
  "Step 01", 
  "Step 02", 
  "Step 03", 
  "Step 04", 
  "Step 05", 
  "Step 06", 
  "Step 07", 
  "Step 08"
];

export default function HowItWorks() {
  const { ref, progress } = useScrollProgress();

  const interp = (val: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    if (val <= inMin) return outMin;
    if (val >= inMax) return outMax;
    return outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);
  };
  const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

  // ── Sticky translate — 9 slides, 11.111% each ───────────────────
  const N = 9;
  const D = 0.08;
  const S = 0.035;
  const SW = 11.1111;

  const getStickyTranslate = (p: number): number => {
    for (let i = 0; i < N - 1; i++) {
      const startDwell = i * (D + S);
      const endDwell = startDwell + D;
      const endSnap = (i + 1) * (D + S);
      
      if (p < startDwell) return i * SW;
      if (p < endDwell) return i * SW;
      if (p < endSnap) return interp(p, endDwell, endSnap, i * SW, (i + 1) * SW);
    }
    return (N - 1) * SW;
  };

  const translatePercent = getStickyTranslate(progress);
  const activeSlide = Math.round(translatePercent / SW);

  // ── Per-slide local progress (0→1 within each slide's dwell zone) ─────────
  const getLocalProgress = (p: number, i: number): number => {
    const startDwell = i * (D + S);
    const endDwell = startDwell + D;
    return clamp01((p - startDwell) / D);
  };

  const s0p = getLocalProgress(progress, 0);
  const s1p = getLocalProgress(progress, 1);
  const s2p = getLocalProgress(progress, 2);
  const s3p = getLocalProgress(progress, 3);
  const s4p = getLocalProgress(progress, 4);
  const s5p = getLocalProgress(progress, 5);
  const s6p = getLocalProgress(progress, 6);
  const s7p = getLocalProgress(progress, 7);
  const s8p = getLocalProgress(progress, 8);

  // ── Chaos card pile — cards stay at gathered positions, no flying ────────
  const cardOpacity = 1.0;

  const getPileCardStyle = (pos: { x: number; y: number; r: number }) => ({
    transform: `translate(calc(-50% + ${pos.x}vw), calc(-50% + ${pos.y}vh)) rotate(${pos.r}deg)`,
    opacity: cardOpacity,
  });

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

  // ── Slide 2 (Step 02) — Mobile simulator animations & transitions ─────────
  const text1Opacity = 1 - clamp01((s2p - 0.20) / 0.05);
  const text2Opacity = clamp01((s2p - 0.20) / 0.05) - clamp01((s2p - 0.50) / 0.05);
  const text3Opacity = clamp01((s2p - 0.50) / 0.05) - clamp01((s2p - 0.75) / 0.05);
  const text4Opacity = clamp01((s2p - 0.75) / 0.05);

  const getPhoneTranslateX = (p: number, s2pVal: number) => {
    if (p < 0.23) return 0; // Screen 0: Onboarding Questions
    if (p < 0.31) {
      // Inside Slide 2
      if (s2pVal < 0.20) return -16.6667; // Screen 1: Onboarding Complete
      if (s2pVal < 0.25) return interp(s2pVal, 0.20, 0.25, -16.6667, -33.3333);
      if (s2pVal < 0.50) return -33.3333; // Screen 2: System Figuring
      if (s2pVal < 0.55) return interp(s2pVal, 0.50, 0.55, -33.3333, -50.0);
      if (s2pVal < 0.75) return -50.0; // Screen 3: Action List
      if (s2pVal < 0.80) return interp(s2pVal, 0.75, 0.80, -50.0, -66.6667);
      return -66.6667; // Screen 4: Action Detail
    }
    if (p < 0.345) {
      // Snap 2-3
      return interp(p, 0.31, 0.345, -66.6667, -83.3333);
    }
    return -83.3333; // Screen 5: Dashboard
  };

  // ── Sticky Phone visibility and transitions across slides 1-8 ───────────
  // Fades in as we transition from Slide 0 into Slide 1
  const phoneVisibilityOpacity = interp(progress, 0.085, 0.11, 0, 1);

  // Phone scale & hand opacity: zoom out and fade in hand at Slide 8
  const phoneScale = interp(s8p, 0, 0.8, 1.15, 1.0);
  const handOpacity = interp(s8p, 0, 0.8, 0, 1);

  // Dashboard components opacities inside Screen 5
  const stage2AlertOpacity = interp(s4p, 0, 0.5, 0, 1);
  const stage3CardsOpacity = interp(s5p, 0, 0.5, 0, 1);
  const stage4VaultOpacity = interp(s6p, 0, 0.5, 0, 1);
  const stage5SuggestOpacity = interp(s7p, 0, 0.5, 0, 1);
  const stage5SuggestTranslateX = interp(s7p, 0, 0.5, 120, 0);

  const sliderOpacity = 1;

  // Dynamic Phone Simulator theme detection (Screen 2 System Figuring is dark mode)
  const isPhoneDarkMode = (progress >= 0.23 && progress < 0.31 && s2p >= 0.25 && s2p < 0.55);
  const statusBarBg = isPhoneDarkMode ? "bg-slate-950" : "bg-slate-50";
  const statusBarText = isPhoneDarkMode ? "text-slate-500" : "text-slate-400";
  const batteryBorder = isPhoneDarkMode ? "border-slate-700" : "border-slate-300";
  const batteryBg = isPhoneDarkMode ? "bg-slate-600" : "bg-slate-400";
  const headerBg = isPhoneDarkMode ? "bg-slate-950" : "bg-white";
  const headerBorder = isPhoneDarkMode ? "border-slate-800" : "border-slate-100";
  const headerText = isPhoneDarkMode ? "text-white" : "text-slate-900";
  const headerSubtext = isPhoneDarkMode ? "text-slate-500" : "text-slate-400";
  const avatarBg = isPhoneDarkMode ? "bg-slate-900" : "bg-[#16A34A]/10";
  const avatarBorder = isPhoneDarkMode ? "border-slate-800" : "border-slate-200";
  const avatarText = isPhoneDarkMode ? "text-slate-500" : "text-[#16A34A]";
  const screenWrapperBg = isPhoneDarkMode ? "bg-slate-950" : "bg-slate-50";

  return (
    <div ref={ref} id="how-it-works" className="relative h-[600vh] w-full scroll-mt-28">
      <div
        className="sticky top-0 w-full h-screen flex items-center z-10"
      >
        {/* Green radial glow */}
        <div className="absolute right-[-15%] top-[8%] h-[520px] w-[520px] rounded-full bg-[#16A34A]/10 blur-3xl z-0 pointer-events-none" />

        {/* ── Slider track wrapper ── */}
        <div className="absolute inset-0 overflow-hidden z-10">
          <div
            className="flex h-full"
            style={{
              transform: `translateX(-${translatePercent}%)`,
              width: "900%",
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              opacity: sliderOpacity,
            }}
          >

          {/* ────────────────────────────────────────────────────────────── */}
          {/* SLIDE 0 — Paprs appears                                       */}
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
                    transform: `translate(-40px, calc(-34px + ${c1Y}px)) rotate(-11deg) scale(1)`,
                  }}
                >
                  <MicrotaskCard
                    type="nie"
                    overview="Foreigner identity & tax number. Essential for work contracts, bank accounts, SIM cards, and renting."
                    badgeText="In Progress"
                    badgeType="progress"
                    doneCount={2}
                    totalCount={4}
                    tasks={[
                      { text: "Generate Tax Model 790-012 PDF with fee info", done: true },
                      { text: "Pay €12.24 tax fee at ATM and save ticket", done: true },
                      { text: "Present EX-15 form in person at police station", done: false, active: true },
                      { text: "Pick up your physical paper NIE certificate", done: false },
                    ]}
                  />
                </div>
                <div
                  className="absolute"
                  style={{
                    opacity: 1,
                    transform: `translate(36px, calc(-18px + ${c2Y}px)) rotate(8deg) scale(1)`,
                  }}
                >
                  <MicrotaskCard
                    type="seg_social"
                    overview="Social security number. Required to sign a work contract, pay freelance taxes, or access public health."
                    badgeText="Next Up"
                    badgeType="pending"
                    doneCount={1}
                    totalCount={3}
                    tasks={[
                      { text: "Confirm your Spanish mobile phone number is active", done: true },
                      { text: "Request NUSS via Import@ss digital portal", done: false },
                      { text: "Download your official NUSS certificate PDF", done: false },
                    ]}
                  />
                </div>
                <div
                  className="absolute shadow-2xl"
                  style={{
                    opacity: 1,
                    transform: `translate(4px, calc(26px + ${c3Y}px)) rotate(-2deg) scale(1)`,
                  }}
                >
                  <MicrotaskCard
                    type="padron"
                    overview="Town hall address registration. Mandatory first step needed for healthcare cards and NIE booking."
                    badgeText="Done"
                    badgeType="done"
                    doneCount={4}
                    totalCount={4}
                    tasks={[
                      { text: "Collect lease contract signed by landlord & utility bill", done: true },
                      { text: "Download and fill out the town hall registration form", done: true },
                      { text: "Book an appointment slot online (Cita Previa)", done: true },
                      { text: "Attend appointment in person and obtain your Volante", done: true },
                    ]}
                  />
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

            {/* Right Column Spacer for Sticky Phone */}
            <div className="w-full md:w-6/12 h-[65vh] md:h-full flex-shrink-0" />
          </div>

          {/* ────────────────────────────────────────────────────────────── */}
          {/* SLIDE 2 — Your Roadmap & Action Steps                          */}
          {/* ────────────────────────────────────────────────────────────── */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 lg:px-28 select-none">
            
            {/* Left Column: Narrative text blocks matching the simulator phase */}
            <div className="w-full md:w-5/12 flex flex-col justify-center relative min-h-[220px]">
              <span className="font-mono text-xs font-bold text-[#16A34A] uppercase bg-[#16A34A]/10 px-3 py-1 rounded-full w-fit">
                Step 02
              </span>
              
              <div className="relative w-full mt-6 h-48">
                {/* Phase 1: Onboarding overview */}
                <div 
                  className="absolute inset-0 transition-all duration-300 flex flex-col justify-start"
                  style={{ 
                    opacity: text1Opacity, 
                    transform: `translateY(${text1Opacity > 0.5 ? 0 : 12}px)`,
                    pointerEvents: text1Opacity > 0.5 ? "auto" : "none" 
                  }}
                >
                  <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-slate-950 mb-4 leading-tight">
                    Your answers filtered.
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md">
                    Based on your target city, visa type, and origin, we map your onboarding data instantly. No complex legal terms, just plain facts.
                  </p>
                </div>

                {/* Phase 2: System Figuring */}
                <div 
                  className="absolute inset-0 transition-all duration-300 flex flex-col justify-start"
                  style={{ 
                    opacity: text2Opacity, 
                    transform: `translateY(${text2Opacity > 0.5 ? 0 : 12}px)`,
                    pointerEvents: text2Opacity > 0.5 ? "auto" : "none" 
                  }}
                >
                  <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-slate-950 mb-4 leading-tight">
                    Analyzing situation.
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md">
                    Our system parses Spanish immigration guidelines, computes task dependencies, and checks local townhall appointments in real time.
                  </p>
                </div>

                {/* Phase 3: List of Actions */}
                <div 
                  className="absolute inset-0 transition-all duration-300 flex flex-col justify-start"
                  style={{ 
                    opacity: text3Opacity, 
                    transform: `translateY(${text3Opacity > 0.5 ? 0 : 12}px)`,
                    pointerEvents: text3Opacity > 0.5 ? "auto" : "none" 
                  }}
                >
                  <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-slate-950 mb-4 leading-tight">
                    We build your roadmap.
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md">
                    You get a chronologically prioritized task list. You know exactly what is ready to process, what is urgent, and what is currently locked.
                  </p>
                </div>

                {/* Phase 4: Detailed Step Checklist */}
                <div 
                  className="absolute inset-0 transition-all duration-300 flex flex-col justify-start"
                  style={{ 
                    opacity: text4Opacity, 
                    transform: `translateY(${text4Opacity > 0.5 ? 0 : 12}px)`,
                    pointerEvents: text4Opacity > 0.5 ? "auto" : "none" 
                  }}
                >
                  <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-slate-950 mb-4 leading-tight">
                    Follow step-by-step.
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md">
                    No guessing. For every task, follow granular instructions with required forms, tax fee calculators, and office maps to hit 100% completion.
                  </p>
                </div>
              </div>
            </div>
            {/* Right Column Spacer */}
            <div className="hidden md:block md:w-6/12 h-full flex-shrink-0" />
          </div>

          {/* ────────────────────────────────────────────────────────────── */}
          {/* SLIDE 3 — Command Centre                                       */}
          {/* ────────────────────────────────────────────────────────────── */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 lg:px-28 select-none">
            <div className="w-full md:w-5/12 flex flex-col justify-center">
              <span className="font-mono text-xs font-bold text-[#16A34A] uppercase bg-[#16A34A]/10 px-3 py-1 rounded-full w-fit">
                Step 03
              </span>
              <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-slate-950 mt-6 mb-4 leading-tight">
                Your personal command centre
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md">
                One screen that summarizes your entire legal identity, tailored specifically to your student or worker profile.
              </p>
            </div>
            <div className="hidden md:block md:w-6/12 h-full flex-shrink-0" />
          </div>

          {/* ────────────────────────────────────────────────────────────── */}
          {/* SLIDE 4 — Urgent Alerts                                        */}
          {/* ────────────────────────────────────────────────────────────── */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 lg:px-28 select-none">
            <div className="w-full md:w-5/12 flex flex-col justify-center">
              <span className="font-mono text-xs font-bold text-[#16A34A] uppercase bg-[#16A34A]/10 px-3 py-1 rounded-full w-fit">
                Step 04
              </span>
              <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-slate-950 mt-6 mb-4 leading-tight">
                Always know what&apos;s urgent
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md">
                Critical deadlines, visa renewals, and tax reports are flagged automatically. No more surprise expiration dates.
              </p>
            </div>
            <div className="hidden md:block md:w-6/12 h-full flex-shrink-0" />
          </div>

          {/* ────────────────────────────────────────────────────────────── */}
          {/* SLIDE 5 — Live Process Tracking                                */}
          {/* ────────────────────────────────────────────────────────────── */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 lg:px-28 select-none">
            <div className="w-full md:w-5/12 flex flex-col justify-center">
              <span className="font-mono text-xs font-bold text-[#16A34A] uppercase bg-[#16A34A]/10 px-3 py-1 rounded-full w-fit">
                Step 05
              </span>
              <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-slate-950 mt-6 mb-4 leading-tight">
                Track every process in one place
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md">
                See real-time progress. Know exactly which step you are on, and what the administration is currently doing.
              </p>
            </div>
            <div className="hidden md:block md:w-6/12 h-full flex-shrink-0" />
          </div>

          {/* ────────────────────────────────────────────────────────────── */}
          {/* SLIDE 6 — Document Vault                                       */}
          {/* ────────────────────────────────────────────────────────────── */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 lg:px-28 select-none">
            <div className="w-full md:w-5/12 flex flex-col justify-center">
              <span className="font-mono text-xs font-bold text-[#16A34A] uppercase bg-[#16A34A]/10 px-3 py-1 rounded-full w-fit">
                Step 06
              </span>
              <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-slate-950 mt-6 mb-4 leading-tight">
                Your documents, safe and watched
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md">
                Paprs reads your certificates, extracts dates, and notifies you when registration or residency documents are expiring.
              </p>
            </div>
            <div className="hidden md:block md:w-6/12 h-full flex-shrink-0" />
          </div>

          {/* ────────────────────────────────────────────────────────────── */}
          {/* SLIDE 7 — Smart Recommendations                                */}
          {/* ────────────────────────────────────────────────────────────── */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 lg:px-28 select-none">
            <div className="w-full md:w-5/12 flex flex-col justify-center">
              <span className="font-mono text-xs font-bold text-[#16A34A] uppercase bg-[#16A34A]/10 px-3 py-1 rounded-full w-fit">
                Step 07
              </span>
              <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-slate-950 mt-6 mb-4 leading-tight">
                We spot things you&apos;d miss
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md">
                If an empadronamiento needs updates, or a fee changes, Paprs automatically triggers a recommendation to keep you safe.
              </p>
            </div>
            <div className="hidden md:block md:w-6/12 h-full flex-shrink-0" />
          </div>

          {/* ────────────────────────────────────────────────────────────── */}
          {/* SLIDE 8 — Pocket Agency (Final view & CTA)                     */}
          {/* ────────────────────────────────────────────────────────────── */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 lg:px-28 select-none">
            <div className="w-full md:w-5/12 flex flex-col justify-center">
              <span className="font-mono text-xs font-bold text-[#16A34A] uppercase bg-[#16A34A]/10 px-3 py-1 rounded-full w-fit">
                Step 08
              </span>
              <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-slate-950 mt-6 mb-4 leading-tight">
                Your pocket legal agency
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md">
                Your entire relocation, registration, and tax filings resolved inside a single interface. Ready whenever you are.
              </p>
            </div>
            <div className="hidden md:block md:w-6/12 h-full flex-shrink-0" />
          </div>

          </div>
        </div>

        {/* ── Chaos Card Pile Overlay (Slide 0) ── */}
        <div
          className="hidden md:block absolute inset-0 pointer-events-none z-[12]"
          style={{
            opacity: `clamp(0, (var(--doc-transition-progress, 0) - 0.45) * 10, 1)`,
            transform: `translateY(calc((var(--doc-transition-progress, 0) - 1) * 100vh))`,
          }}
        >
          {/* Inner wrapper that handles slider translateX transition */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: `translateX(-${translatePercent * 9}%)`,
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="absolute left-1/2 top-1/2" style={{ "--paper-rotate": "-8deg" } as React.CSSProperties}>
              <div style={fc1}><DocumentCard type="nie" status="chaos" /></div>
            </div>
            <div className="absolute left-1/2 top-1/2" style={{ "--paper-rotate": "6deg" } as React.CSSProperties}>
              <div style={fc2}><DocumentCard type="padron" status="chaos" /></div>
            </div>
            <div className="absolute left-1/2 top-1/2" style={{ "--paper-rotate": "-3deg" } as React.CSSProperties}>
              <div style={fc3}><DocumentCard type="seg_social" status="chaos" /></div>
            </div>
            <div className="absolute left-1/2 top-1/2" style={{ "--paper-rotate": "10deg" } as React.CSSProperties}>
              <div style={fc4}><DocumentCard type="hacienda" status="chaos" /></div>
            </div>
            <div className="absolute left-1/2 top-1/2" style={{ "--paper-rotate": "-9deg" } as React.CSSProperties}>
              <div style={fc5}><DocumentCard type="nie" status="chaos" /></div>
            </div>
            <div className="absolute left-1/2 top-1/2" style={{ "--paper-rotate": "4deg" } as React.CSSProperties}>
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

        {/* ── Sticky Phone Simulator Overlay (Slides 2-8) ── */}
        {phoneVisibilityOpacity > 0 && (
          <div 
            className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 lg:px-28 pointer-events-none z-30"
            style={{ 
              opacity: phoneVisibilityOpacity,
            }}
          >
            {/* Left Column Spacer matching the slide structure */}
            <div className="w-full md:w-5/12 h-[35vh] md:h-full flex-shrink-0" />

            {/* Right Column Phone Viewport Area */}
            <div className="w-full md:w-6/12 h-[65vh] md:h-full flex items-center justify-center relative">
              
              {/* Outer Zoom/Scale Wrapper */}
              <div 
                className="relative transition-all duration-300 flex items-center justify-center"
                style={{ transform: `scale(${phoneScale})` }}
              >
                
                {/* Phone Shell */}
                <IPhoneMockup
                  screenWidth={220}
                  screenType="island"
                  frameColor="#1e293b"
                  hideStatusBar={true}
                  transparentNavBar={true}
                  className="z-10 bg-transparent filter drop-shadow-[0_20px_35px_rgba(15,23,42,0.12)] drop-shadow-[0_0_20px_rgba(22,163,74,0.04)]"
                  containerStlye={{ backgroundColor: "transparent", boxShadow: "none" }}
                >
                  <div className={`w-full h-full flex flex-col relative overflow-hidden ${screenWrapperBg} transition-colors duration-300`}>
                    
                    {/* Status Bar */}
                    <div className={`h-8 ${statusBarBg} px-5 pt-4 flex justify-between items-center text-[8px] font-mono ${statusBarText} z-30 select-none transition-colors duration-300`}>
                      <span>9:41 BCN</span>
                      <span className="flex items-center gap-1">
                        <span>5G</span>
                        <span className={`w-3.5 h-1.5 rounded-sm border ${batteryBorder} flex items-center p-0.5 transition-colors duration-300`}><span className={`w-full h-full ${batteryBg} rounded-sm transition-colors duration-300`}></span></span>
                      </span>
                    </div>

                    {/* App Header */}
                    <div className={`px-4 py-2 ${headerBg} border-b ${headerBorder} flex justify-between items-center z-20 transition-colors duration-300`}>
                      <div>
                        <h5 className={`font-syne font-extrabold text-[10px] ${headerText} tracking-tight transition-colors duration-300`}>p.aprs</h5>
                        <p className={`text-[6.5px] font-mono ${headerSubtext} uppercase tracking-widest transition-colors duration-300`}>Relocation</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full ${avatarBg} border ${avatarBorder} flex items-center justify-center font-mono text-[7.5px] ${avatarText} font-bold transition-all duration-300`}>
                        JD
                      </div>
                    </div>

                  {/* Phone Screen Slider */}
                  <div 
                    className="flex-1 flex"
                    style={{
                      width: "600%",
                      transform: `translateX(${getPhoneTranslateX(progress, s2p)}%)`,
                      transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                  >
                    
                    {/* SCREEN 0: Onboarding Questions */}
                    <div className="w-1/6 h-full flex-shrink-0 flex flex-col p-4 bg-slate-50 justify-between select-none">
                      <div className="flex flex-col gap-3">
                        {/* Progress Bar */}
                        <div className="flex justify-between items-center">
                          <span className="text-[7px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                            Question {s1p < 0.35 ? "1" : s1p < 0.65 ? "2" : "3"} of 3
                          </span>
                          <div className="w-16 h-1 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#16A34A] transition-all duration-300"
                              style={{
                                width: s1p < 0.35 ? "33.3%" : s1p < 0.65 ? "66.6%" : "100%"
                              }}
                            />
                          </div>
                        </div>

                        {/* QUESTION 1: Nationality */}
                        {s1p <= 0.35 && (
                          <div className="flex flex-col gap-2.5 animate-fadeIn">
                            <h4 className="text-[10px] font-syne font-bold text-slate-800 leading-tight">
                              Where are you moving from?
                            </h4>
                            <div className="flex flex-col gap-1.5">
                              {/* Option 1: UK (Selected) */}
                              <div className={`p-2 border rounded-lg flex items-center justify-between transition-all duration-300 ${s1p > 0.20 ? "border-[#16A34A] bg-[#16A34A]/5" : "border-slate-200 bg-white"}`}>
                                <span className={`text-[8.5px] flex items-center gap-1.5 font-mono ${s1p > 0.20 ? "text-slate-800 font-medium" : "text-slate-500"}`}>
                                  🇬🇧 United Kingdom
                                </span>
                                {s1p > 0.20 ? (
                                  <div className="w-3 h-3 rounded-full bg-[#16A34A] flex items-center justify-center">
                                    <Check className="w-2 h-2 text-white" />
                                  </div>
                                ) : (
                                  <div className="w-3 h-3 rounded-full border border-slate-300" />
                                )}
                              </div>
                              {/* Option 2: US */}
                              <div className="p-2 border border-slate-200 bg-white rounded-lg flex items-center justify-between">
                                <span className="text-[8.5px] text-slate-500 flex items-center gap-1.5 font-mono">
                                  🇺🇸 United States
                                </span>
                                <div className="w-3 h-3 rounded-full border border-slate-300" />
                              </div>
                              {/* Option 3: Other */}
                              <div className="p-2 border border-slate-200 bg-white rounded-lg flex items-center justify-between">
                                <span className="text-[8.5px] text-slate-500 flex items-center gap-1.5 font-mono">
                                  🌍 Other (Non-EU)
                                </span>
                                <div className="w-3 h-3 rounded-full border border-slate-300" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* QUESTION 2: Destination */}
                        {s1p > 0.35 && s1p <= 0.65 && (
                          <div className="flex flex-col gap-2.5 animate-fadeIn">
                            <h4 className="text-[10px] font-syne font-bold text-slate-800 leading-tight">
                              Where in Spain are you going?
                            </h4>
                            <div className="flex flex-col gap-1.5">
                              {/* Option 1: Barcelona (Selected) */}
                              <div className={`p-2 border rounded-lg flex items-center justify-between transition-all duration-300 ${s1p > 0.45 ? "border-[#16A34A] bg-[#16A34A]/5" : "border-slate-200 bg-white"}`}>
                                <span className={`text-[8.5px] flex items-center gap-1.5 font-mono ${s1p > 0.45 ? "text-slate-800 font-medium" : "text-slate-500"}`}>
                                  📍 Barcelona
                                </span>
                                {s1p > 0.45 ? (
                                  <div className="w-3 h-3 rounded-full bg-[#16A34A] flex items-center justify-center">
                                    <Check className="w-2 h-2 text-white" />
                                  </div>
                                ) : (
                                  <div className="w-3 h-3 rounded-full border border-slate-300" />
                                )}
                              </div>
                              {/* Option 2: Madrid */}
                              <div className="p-2 border border-slate-200 bg-white rounded-lg flex items-center justify-between">
                                <span className="text-[8.5px] text-slate-500 flex items-center gap-1.5 font-mono">
                                  📍 Madrid
                                </span>
                                <div className="w-3 h-3 rounded-full border border-slate-300" />
                              </div>
                              {/* Option 3: Valencia */}
                              <div className="p-2 border border-slate-200 bg-white rounded-lg flex items-center justify-between">
                                <span className="text-[8.5px] text-slate-500 flex items-center gap-1.5 font-mono">
                                  📍 Valencia
                                </span>
                                <div className="w-3 h-3 rounded-full border border-slate-300" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* QUESTION 3: Visa Status */}
                        {s1p > 0.65 && (
                          <div className="flex flex-col gap-2.5 animate-fadeIn">
                            <h4 className="text-[10px] font-syne font-bold text-slate-800 leading-tight">
                              What is your visa / legal status?
                            </h4>
                            <div className="flex flex-col gap-1.5">
                              {/* Option 1: Student (Selected) */}
                              <div className={`p-2 border rounded-lg flex items-center justify-between transition-all duration-300 ${s1p > 0.70 ? "border-[#16A34A] bg-[#16A34A]/5" : "border-slate-200 bg-white"}`}>
                                <span className={`text-[8.5px] flex items-center gap-1.5 font-mono ${s1p > 0.70 ? "text-slate-800 font-medium" : "text-slate-500"}`}>
                                  🎓 Student (Non-EU)
                                </span>
                                {s1p > 0.70 ? (
                                  <div className="w-3 h-3 rounded-full bg-[#16A34A] flex items-center justify-center">
                                    <Check className="w-2 h-2 text-white" />
                                  </div>
                                ) : (
                                  <div className="w-3 h-3 rounded-full border border-slate-300" />
                                )}
                              </div>
                              {/* Option 2: Nomad */}
                              <div className="p-2 border border-slate-200 bg-white rounded-lg flex items-center justify-between">
                                <span className="text-[8.5px] text-slate-500 flex items-center gap-1.5 font-mono">
                                  💻 Digital Nomad
                                </span>
                                <div className="w-3 h-3 rounded-full border border-slate-300" />
                              </div>
                              {/* Option 3: Highly Skilled */}
                              <div className="p-2 border border-slate-200 bg-white rounded-lg flex items-center justify-between">
                                <span className="text-[8.5px] text-slate-500 flex items-center gap-1.5 font-mono">
                                  💼 Highly Skilled Professional
                                </span>
                                <div className="w-3 h-3 rounded-full border border-slate-300" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="w-full py-1.5 bg-slate-800 text-white rounded-lg text-[8px] font-bold font-mono flex items-center justify-center gap-1">
                        Next Question <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>

                    {/* SCREEN 1: Onboarding Overview */}
                    <div className="w-1/6 h-full flex-shrink-0 flex flex-col p-4 bg-slate-50 justify-between">
                      <div className="flex flex-col gap-3">
                        <div className="text-[8px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                          Onboarding Complete
                        </div>
                        
                        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex flex-col gap-2.5">
                          <div className="flex items-center justify-between border-b border-slate-50 pb-1.5">
                            <span className="text-[9px] text-slate-400">Destination</span>
                            <span className="text-[9px] font-bold text-slate-800">Barcelona, Spain</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-slate-50 pb-1.5">
                            <span className="text-[9px] text-slate-400">Visa Type</span>
                            <span className="text-[9px] font-bold text-[#16A34A]">Student (Non-EU)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] text-slate-400">Citizenship</span>
                            <span className="text-[9px] font-bold text-slate-800">United Kingdom</span>
                          </div>
                        </div>

                        <div className="bg-[#16A34A]/5 border border-[#16A34A]/20 rounded-lg p-2.5 flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                          <span className="text-[8.5px] text-[#16A34A] font-mono font-medium leading-tight">
                            Profile processed successfully!
                          </span>
                        </div>
                      </div>

                      <div className="w-full h-8 bg-slate-100 border border-slate-200 rounded-lg text-slate-400 text-[8.5px] font-bold font-mono flex items-center justify-center gap-1.5 animate-pulse">
                        <Cpu className="w-3.5 h-3.5" /> Analyzing situation...
                      </div>
                    </div>

                    {/* SCREEN 2: System Figuring */}
                    <div className="w-1/6 h-full flex-shrink-0 flex flex-col p-4 bg-slate-950 justify-between text-white relative">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,163,74,0.15),transparent_70%)] pointer-events-none" />

                      <div className="flex flex-col items-center gap-4 mt-2 relative z-10">
                        <div className="text-[8px] font-mono text-[#16A34A] uppercase tracking-widest font-bold">
                          Computing Roadmap
                        </div>

                        <div className="relative w-24 h-24 flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full border border-[#16A34A]/30 animate-ping" />
                          <div className="absolute w-20 h-20 rounded-full border border-[#16A34A]/50 border-dashed animate-spin [animation-duration:10s]" />
                          <div className="w-12 h-12 rounded-full bg-[#16A34A]/10 border border-[#16A34A] flex items-center justify-center shadow-[0_0_15px_rgba(22,163,74,0.3)]">
                            <Cpu className="w-6 h-6 text-[#16A34A]" />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 font-mono text-[7.5px] text-slate-400 bg-black/40 border border-slate-800 rounded-lg p-3 z-10">
                        <div className={`transition-opacity duration-300 ${s2p >= 0.28 ? "opacity-100 text-[#16A34A]" : "opacity-30"}`}>
                          {s2p >= 0.28 ? "✓" : "•"} Parsed 14 relocation decrees
                        </div>
                        <div className={`transition-opacity duration-300 ${s2p >= 0.36 ? "opacity-100 text-[#16A34A]" : "opacity-30"}`}>
                          {s2p >= 0.36 ? "✓" : "•"} Fetched BCN Townhall rules
                        </div>
                        <div className={`transition-opacity duration-300 ${s2p >= 0.44 ? "opacity-100 text-[#16A34A]" : "opacity-30"}`}>
                          {s2p >= 0.44 ? "✓" : "•"} Resolved step dependencies
                        </div>
                      </div>

                      <div className="w-full text-center text-[7.5px] font-mono text-slate-500 mb-1 z-10 flex items-center justify-center gap-1">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#16A34A]" /> Mapping timeline...
                      </div>
                    </div>

                    {/* SCREEN 3: Action List (Roadmap) */}
                    <div className="w-1/6 h-full flex-shrink-0 flex flex-col p-4 bg-slate-50 justify-between">
                      <div className="flex flex-col gap-2.5">
                        <div className="text-[8px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                          Your Tasks (3)
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="bg-white border border-slate-200 p-2.5 rounded-lg shadow-sm flex items-center justify-between">
                            <div>
                              <h6 className="font-syne font-extrabold text-[9.5px] text-slate-900 leading-tight">1. Register Empadronamiento</h6>
                              <p className="text-[7.5px] font-mono text-slate-400 mt-0.5">Required for NIE office</p>
                            </div>
                            <span className="text-[7px] font-mono text-[#16A34A] bg-[#16A34A]/10 border border-[#16A34A]/20 px-1.5 py-0.5 rounded uppercase font-bold shrink-0">Ready</span>
                          </div>

                          <div className="bg-white border-2 border-[#16A34A]/30 p-2.5 rounded-lg shadow-sm flex items-center justify-between">
                            <div>
                              <h6 className="font-syne font-extrabold text-[9.5px] text-slate-900 leading-tight">2. Get NIE Number</h6>
                              <p className="text-[7.5px] font-mono text-slate-400 mt-0.5">Due in 3 weeks · URGENT</p>
                            </div>
                            <span className="text-[7px] font-mono text-[#D4820A] bg-[#D4820A]/10 border border-[#D4820A]/20 px-1.5 py-0.5 rounded uppercase font-bold shrink-0">Active</span>
                          </div>

                          <div className="bg-white border border-slate-200 p-2.5 rounded-lg shadow-sm flex items-center justify-between opacity-60">
                            <div>
                              <h6 className="font-syne font-extrabold text-[9.5px] text-slate-900 leading-tight">3. Open Bank Account</h6>
                              <p className="text-[7.5px] font-mono text-slate-400 mt-0.5">Blocked · Needs NIE Number</p>
                            </div>
                            <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                          </div>
                        </div>
                      </div>

                      <div className="text-[8px] font-mono text-center text-slate-400 flex items-center justify-center gap-1 mt-2">
                        Scroll to view details →
                      </div>
                    </div>

                    {/* SCREEN 4: Detail Action Checklist */}
                    <div className="w-1/6 h-full flex-shrink-0 flex flex-col p-4 bg-[#F8FAFC] justify-between">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-start border-b border-slate-100 pb-2 mb-1">
                          <div>
                            <span className="font-mono text-[7px] uppercase text-[#16A34A] font-bold">Task 02</span>
                            <h4 className="font-syne font-extrabold text-[11px] text-slate-900 leading-tight mt-0.5">Get NIE Certificate</h4>
                          </div>
                          <span className="text-[6.5px] px-1.5 py-0.5 rounded bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/20 uppercase font-semibold">Active</span>
                        </div>

                        <div className="space-y-2.5 mt-1">
                          <div className="flex items-start gap-2 text-[9px]">
                            <Check className="w-3 h-3 text-[#16A34A] mt-0.5 shrink-0" />
                            <div>
                              <p className="font-bold text-slate-800 leading-tight">Assemble documents</p>
                              <p className="text-[7.5px] text-slate-400">Passport copy, EX-15 form</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2 text-[9px]">
                            <Check className="w-3 h-3 text-[#16A34A] mt-0.5 shrink-0" />
                            <div>
                              <p className="font-bold text-slate-800 leading-tight">Pay Modelo 790 tax</p>
                              <p className="text-[7.5px] text-slate-400">Code 012 (€9.84 government fee)</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2 text-[9px]">
                            {s2p >= 0.95 ? (
                              <Check className="w-3 h-3 text-[#16A34A] mt-0.5 shrink-0" />
                            ) : (
                              <ArrowRight className="w-3 h-3 text-[#D4820A] mt-0.5 shrink-0" />
                            )}
                            <div>
                              <p className="font-bold text-slate-800 leading-tight">Present at Extranjería</p>
                              <p className="text-[7.5px] text-slate-400">Carrer de Múrcia, Barcelona</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                        <div className="w-[55%]">
                          <span className="text-[7.5px] font-mono text-slate-400 block mb-0.5">Task Progress</span>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-[#16A34A] h-full transition-all duration-300" 
                              style={{ width: `${interp(s2p, 0.80, 0.95, 66, 100)}%` }} 
                            />
                          </div>
                        </div>

                        <div 
                          className="border-2 border-[#16A34A] rounded px-1.5 py-0.5 text-[#16A34A] font-extrabold text-[8.5px] tracking-wider uppercase rotate-[-8deg] shadow-[0_0_10px_rgba(34,197,94,0.2)] transition-all duration-300 flex items-center gap-0.5"
                          style={{
                            transform: `scale(${s2p >= 0.95 ? 1 : 1.3}) rotate(-8deg)`,
                            opacity: s2p >= 0.95 ? 1 : 0
                          }}
                        >
                          <Check className="w-3 h-3 text-[#16A34A]" /> DONE
                        </div>
                      </div>
                    </div>

                    {/* SCREEN 5: Dashboard View */}
                    <div className="w-1/6 h-full flex-shrink-0 flex flex-col p-3.5 gap-3.5 select-none pb-6 bg-slate-50 overflow-y-auto scrollbar-none">
                      {/* User Info Header */}
                      <div className="flex justify-between items-center mt-1">
                        <div>
                          <h5 className="font-syne font-extrabold text-[11px] text-slate-900 leading-tight">John Doe</h5>
                          <p className="text-[7.5px] font-mono text-slate-400 uppercase tracking-wider">Non-EU · Student · BCN</p>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/20 flex items-center justify-center font-mono text-[8px] text-[#16A34A] font-bold">
                          JD
                        </div>
                      </div>

                      {/* STAGE 2: Urgent Deadline Card */}
                      <div 
                        className="bg-white border border-red-200 p-3 rounded-xl shadow-md transition-all duration-300"
                        style={{ 
                          opacity: stage2AlertOpacity,
                          transform: `translateY(${stage2AlertOpacity > 0 ? 0 : 12}px)`,
                          boxShadow: "0 0 10px rgba(239, 68, 68, 0.03)"
                        }}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[7px] uppercase font-mono tracking-wider text-red-600 font-bold flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-500 rounded-full animate-ping"></span>
                            Urgent Action
                          </span>
                          <span className="text-[7px] font-mono text-red-600 font-bold bg-red-50 px-1 py-0.5 rounded">
                            52 Days Left
                          </span>
                        </div>
                        <h6 className="font-syne font-bold text-[9.5px] text-slate-900 leading-tight">Student Visa Renewal</h6>
                        <p className="text-[8px] text-slate-400 mt-1 leading-normal">
                          Next: Pay government fee Modelo 790 before booking appointment.
                        </p>
                        <div className="mt-2 w-full h-6 bg-red-500 text-white rounded-md text-[8.5px] font-bold flex items-center justify-center font-mono cursor-pointer transition-colors shadow-sm">
                          Continue Procedure →
                        </div>
                      </div>

                      {/* STAGE 3: Active Action Plans */}
                      <div 
                        className="flex flex-col gap-2 transition-all duration-300"
                        style={{ 
                          opacity: stage3CardsOpacity,
                          transform: `translateY(${stage3CardsOpacity > 0 ? 0 : 12}px)` 
                        }}
                      >
                        <div className="text-[7px] uppercase font-mono tracking-wider text-slate-400 font-bold">
                          Your Roadmaps
                        </div>

                        {/* NIE card */}
                        <div className="bg-white border border-slate-200 p-2.5 rounded-lg shadow-sm flex items-center justify-between">
                          <div>
                            <h6 className="font-syne font-bold text-[9px] text-slate-900 leading-tight">NIE Certificate</h6>
                            <p className="text-[7.5px] text-[#16A34A] font-mono mt-0.5">3 of 7 steps complete</p>
                          </div>
                          <div className="w-9 bg-slate-100 h-1 rounded-full overflow-hidden shrink-0 ml-2">
                            <div className="bg-[#16A34A] h-full w-[42%]"></div>
                          </div>
                        </div>

                        {/* Padrón card */}
                        <div className="bg-white border border-slate-200 p-2.5 rounded-lg shadow-sm flex items-center justify-between">
                          <div>
                            <h6 className="font-syne font-bold text-[9px] text-slate-900 leading-tight">Empadronamiento</h6>
                            <p className="text-[7.5px] text-[#D4820A] font-mono mt-0.5 flex items-center gap-0.5">
                              <span className="w-1 h-1 bg-[#D4820A] rounded-full animate-pulse"></span>
                              Waiting townhall
                            </p>
                          </div>
                          <div className="w-9 bg-slate-100 h-1 rounded-full overflow-hidden shrink-0 ml-2">
                            <div className="bg-[#D4820A] h-full w-[80%]"></div>
                          </div>
                        </div>
                      </div>

                      {/* STAGE 4: Document Vault List */}
                      <div 
                        className="flex flex-col gap-2 transition-all duration-300"
                        style={{ 
                          opacity: stage4VaultOpacity,
                          transform: `translateY(${stage4VaultOpacity > 0 ? 0 : 12}px)` 
                        }}
                      >
                        <div className="text-[7px] uppercase font-mono tracking-wider text-slate-400 font-bold">
                          Document Vault
                        </div>

                        <div className="bg-white border border-slate-200 p-2.5 rounded-lg shadow-sm flex flex-col gap-2">
                          <div className="flex justify-between items-center text-[8.5px]">
                            <span className="text-slate-800 flex items-center gap-1">
                              <FileText className="w-3 h-3 text-[#16A34A]" /> NIE Certificate
                            </span>
                            <span className="text-[7px] font-mono text-[#16A34A] bg-[#16A34A]/10 px-1 py-0.5 rounded">Verified</span>
                          </div>
                          <div className="flex justify-between items-center text-[8.5px]">
                            <span className="text-slate-800 flex items-center gap-1">
                              <FileText className="w-3 h-3 text-[#D4820A]" /> Padrón Volante
                            </span>
                            <span className="text-[7px] font-mono text-[#D4820A] bg-[#D4820A]/10 px-1 py-0.5 rounded">Expires soon</span>
                          </div>
                        </div>
                      </div>

                      {/* STAGE 5: Suggestion Recommendation Tooltip */}
                      <div 
                        className="bg-white border border-[#16A34A]/30 p-2.5 rounded-lg shadow-lg transition-all duration-300"
                        style={{ 
                          opacity: stage5SuggestOpacity,
                          transform: `translateX(${stage5SuggestTranslateX}px)` 
                        }}
                      >
                        <div className="flex gap-1.5 items-start">
                          <Globe className="w-3.5 h-3.5 text-[#16A34A] mt-0.5 shrink-0" />
                          <div>
                            <h6 className="font-syne font-bold text-[9px] text-[#16A34A] leading-tight font-extrabold">Empadronamiento expiring</h6>
                            <p className="text-[7.5px] text-slate-500 mt-1 leading-relaxed">
                              Many Spanish procedures require a volante dated within 90 days.Fresh copy?
                            </p>
                            <div className="flex gap-1.5 mt-2">
                              <button className="px-1.5 py-0.5 rounded bg-[#16A34A] text-white font-mono text-[7px] font-bold">
                                Order
                              </button>
                              <button className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-mono text-[7px] border border-slate-200">
                                Ignore
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </IPhoneMockup>

              </div>

            </div>
          </div>
        )}

        {/* ── Slide dots (green) ── */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 transition-opacity duration-300"
          style={{ opacity: sliderOpacity }}
        >
          <SlideDots total={9} active={activeSlide} />
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
