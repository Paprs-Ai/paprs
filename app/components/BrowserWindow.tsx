"use client";

import React, { useEffect, useState } from "react";
import {
  Bell,
  Check,
  ChevronRight,
  Clock,
  CreditCard,
  FileText,
  Home,
  Layers,
  Lock,
  MapPin,
  Sparkles,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// 1. REUSABLE BROWSER PLACEHOLDER FRAME (Standardized Global Window Shell)
// ─────────────────────────────────────────────────────────────────────────────
export interface BrowserPlaceholderProps {
  children: React.ReactNode;
  url?: string;
  badgeText?: string;
  className?: string;
  shadow?: string;
  style?: React.CSSProperties;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
}

export function BrowserPlaceholder({
  children,
  url = "app.paprs.app",
  badgeText = "Live Sync",
  className = "",
  shadow = "shadow-[0_20px_50px_rgba(0,0,0,0.12)]",
  style,
  headerContent,
  footerContent,
}: BrowserPlaceholderProps) {
  return (
    <div
      className={`w-full h-[520px] md:h-[540px] bg-white rounded-2xl border-2 border-zinc-200 ${shadow} overflow-hidden flex flex-col font-sans select-none text-left transition-all duration-300 pointer-events-auto ${className}`}
      style={style}
    >
      {/* macOS / Web Browser Chrome Bar */}
      <div className="px-4 py-2.5 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 border border-red-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80 border border-amber-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 border border-emerald-500/20" />
        </div>

        {/* Address / URL Bar */}
        <div className="flex-1 max-w-xs mx-auto bg-white border border-zinc-200 rounded-lg px-3 py-1 flex items-center justify-center gap-1.5 shadow-xs">
          <Lock className="w-2.5 h-2.5 text-zinc-400" />
          <span className="font-mono text-[9px] text-zinc-600 font-medium">{url}</span>
        </div>

        {/* Live sync status badge */}
        {badgeText ? (
          <div className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-wider text-black font-extrabold bg-zinc-100 border border-zinc-300 px-2 py-0.5 rounded-full shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            {badgeText}
          </div>
        ) : (
          <div className="w-8" />
        )}
      </div>

      {/* Optional Top Workspace Header */}
      {headerContent}

      {/* Main Viewport Content Slot */}
      <div className="flex-1 flex flex-col min-h-0 bg-white overflow-hidden">
        {children}
      </div>

      {/* Optional Bottom Nav Footer */}
      {footerContent}
    </div>
  );
}

// Alias for convenience
export const BrowserWindow = BrowserPlaceholder;

// ─────────────────────────────────────────────────────────────────────────────
// 2. VIEW: HERO OVERVIEW / RELOCATION HUB VIEW
// ─────────────────────────────────────────────────────────────────────────────
export function HeroDashboardView() {
  const docs: Array<{
    title: string;
    subtitle: string;
    badgeText: string;
    badgeType: "done" | "progress" | "pending";
    doneCount: number;
    totalCount: number;
    iconType: "nie" | "seg_social" | "padron" | "hacienda";
  }> = [
    { title: "NIE Certificate", subtitle: "EXP: NIE-2026-X83", badgeText: "In Progress", badgeType: "progress", doneCount: 2, totalCount: 4, iconType: "nie" },
    { title: "Social Security (NUSS)", subtitle: "NUSS: 08/12345678", badgeText: "Next", badgeType: "pending", doneCount: 1, totalCount: 3, iconType: "seg_social" },
    { title: "Empadronamiento", subtitle: "REG: 08019-2026", badgeText: "Done", badgeType: "done", doneCount: 4, totalCount: 4, iconType: "padron" },
    { title: "Modelo 030 / Tax ID", subtitle: "HAC: 2026-TAX-030", badgeText: "Queued", badgeType: "pending", doneCount: 0, totalCount: 3, iconType: "hacienda" },
  ];

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(t);
  }, []);

  const badgeStyles = {
    done: "text-white bg-black border-black",
    progress: "text-zinc-900 bg-zinc-100 border-zinc-300 font-bold",
    pending: "text-zinc-500 bg-zinc-50 border-zinc-200",
  };

  const iconMap = {
    nie: <FileText className="w-3.5 h-3.5 text-black" />,
    seg_social: <Layers className="w-3.5 h-3.5 text-black" />,
    padron: <MapPin className="w-3.5 h-3.5 text-black" />,
    hacienda: <CreditCard className="w-3.5 h-3.5 text-black" />,
  };

  return (
    <div className="flex-1 flex flex-col justify-between h-full">
      {/* Workspace Header */}
      <div className="px-5 py-3 border-b border-zinc-100 bg-white flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center text-white font-syne font-black text-xs shadow-sm">
            p.
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-syne font-extrabold text-sm text-black leading-tight">Relocation Hub</h3>
              <span className="font-mono text-[8px] font-bold text-white bg-black px-1.5 py-0.5 rounded uppercase">Spain</span>
            </div>
            <p className="font-mono text-[8.5px] text-zinc-500 mt-0.5">Barcelona · Student Stay &amp; Work Route</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="text-right hidden sm:block">
            <span className="font-mono text-[8px] text-zinc-400 block uppercase tracking-wider">Status</span>
            <span className="font-mono text-[9.5px] font-bold text-black">65% Prepared</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-[10px] font-bold font-mono text-black shadow-sm">
            JD
          </div>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="p-4 sm:p-5 flex flex-col justify-between gap-3.5 bg-zinc-50/50 flex-1">
        {/* Live Case Reasoning Pill */}
        <div className="bg-white border border-zinc-200 text-black p-3 rounded-xl flex items-start gap-2.5 shadow-xs shrink-0">
          <div className="w-5 h-5 rounded-lg bg-zinc-100 flex items-center justify-center text-black shrink-0 mt-0.5 border border-zinc-200">
            <Sparkles className="w-3 h-3 text-black animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-700 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Case Reasoning &amp; Verification Engine
              </span>
              <span className="font-mono text-[7px] bg-zinc-100 text-zinc-700 border border-zinc-200 px-1.5 py-0.5 rounded font-semibold">
                99.8% BOE Match
              </span>
            </div>
            <p className="text-[8.5px] text-zinc-600 mt-1 leading-snug font-sans">
              &ldquo;Matched NIE Student Route for Barcelona. Form EX-15 and Model 790-012 pre-filled with calculated €12.24 fee. 4 dependencies verified.&rdquo;
            </p>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 flex-1">
          {/* Left Column: Active Procedures Pipeline (7 cols) */}
          <div className="sm:col-span-7 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Active Procedures</span>
              <span className="font-mono text-[8.5px] text-zinc-400">4 Tracked</span>
            </div>

            <div className="flex flex-col gap-2">
              {docs.map((d, i) => {
                const pct = Math.round((d.doneCount / d.totalCount) * 100);
                const isActive = d.badgeType === "progress";
                return (
                  <div
                    key={i}
                    className={`bg-white border rounded-xl p-2.5 transition-all ease-out ${
                      isActive ? "border-black shadow-sm ring-1 ring-black/5" : "border-zinc-200 shadow-xs"
                    }`}
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? "translateY(0)" : "translateY(8px)",
                      transitionDuration: "400ms",
                      transitionDelay: `${i * 50}ms`,
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="relative w-6 h-6 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center flex-shrink-0">
                          {iconMap[d.iconType]}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-extrabold font-syne leading-tight text-black truncate">{d.title}</p>
                          <p className="text-[7.5px] font-mono text-zinc-400 truncate">{d.subtitle}</p>
                        </div>
                      </div>
                      <span className={`text-[7px] font-mono border px-1.5 py-0.5 rounded font-bold uppercase tracking-wider whitespace-nowrap flex-shrink-0 ${badgeStyles[d.badgeType]}`}>
                        {d.badgeText}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-1 bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ease-out rounded-full ${
                            d.badgeType === "done" ? "bg-black" : d.badgeType === "progress" ? "bg-zinc-800" : "bg-zinc-300"
                          }`}
                          style={{
                            width: `${mounted ? pct : 0}%`,
                            transitionProperty: "width",
                            transitionDuration: "800ms",
                            transitionDelay: `${80 + i * 50}ms`,
                          }}
                        />
                      </div>
                      <span className="text-[7.5px] font-mono text-zinc-500 font-bold tabular-nums">{d.doneCount}/{d.totalCount}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Next Priority Action Spotlight (5 cols) */}
          <div className="sm:col-span-5 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="font-mono text-[9px] uppercase tracking-wider text-black font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-black" /> Next Action
              </span>
              <span className="font-mono text-[8px] bg-zinc-200 text-black px-1.5 py-0.2 rounded font-bold">52d Left</span>
            </div>

            <div className="bg-white border-2 border-black rounded-xl p-3 shadow-md flex flex-col justify-between flex-1 gap-2.5">
              <div>
                <div className="flex items-center gap-1 text-[7.5px] font-mono text-zinc-500 uppercase tracking-wider">
                  <span>Pre-filled Action Packet</span>
                </div>
                <h4 className="font-syne font-extrabold text-[11px] text-black leading-tight mt-0.5">
                  NIE Registration Appointment
                </h4>
                <p className="text-[8px] text-zinc-600 mt-1 leading-snug">
                  Official form prepared with fee (€12.24) pre-calculated. Ready for submission.
                </p>
              </div>

              {/* Checklist micro steps */}
              <div className="flex flex-col gap-1.5 border-t border-zinc-100 pt-2 font-mono text-[7.5px]">
                <div className="flex items-center gap-1.5 text-black font-medium">
                  <Check className="w-2.5 h-2.5 text-black shrink-0" />
                  <span>Form EX-15 auto-filled</span>
                </div>
                <div className="flex items-center gap-1.5 text-black font-medium">
                  <Check className="w-2.5 h-2.5 text-black shrink-0" />
                  <span>Fee Model 790-012 generated</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-500">
                  <Clock className="w-2.5 h-2.5 text-zinc-400 shrink-0" />
                  <span>Present at Carrer de Múrcia 36</span>
                </div>
              </div>

              <div className="w-full py-1.5 bg-black text-white rounded-lg font-syne font-bold text-[8.5px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm">
                Review Action Packet <ChevronRight className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Command Bar Prompt Input */}
        <div className="bg-white border border-zinc-200 px-3 py-2 rounded-xl flex items-center justify-between gap-2 shadow-xs shrink-0">
          <div className="flex items-center gap-2 min-w-0 flex-1 text-zinc-400">
            <Sparkles className="w-3.5 h-3.5 text-black shrink-0" />
            <span className="font-mono text-[8px] text-zinc-500 truncate">Ask Paprs anything or drop official PDFs to auto-index...</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 font-mono text-[7.5px] text-zinc-500 bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded">
            <span>⌘K</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const RelocationHubView = HeroDashboardView;

// ─────────────────────────────────────────────────────────────────────────────
// 3. VIEW: SEGURIDAD SOCIAL ROUTE VIEW (Slide 0 Detail View)
// ─────────────────────────────────────────────────────────────────────────────
export function SeguridadSocialRouteView() {
  const tasks: Array<{ title: string; sublabel: string; status: "done" | "active" | "pending" }> = [
    { title: "Verify identity & padrón record", sublabel: "Valid passport/NIE & Barcelona residency certificate matched", status: "done" },
    { title: "Generate Modelo TA.1 application", sublabel: "Official TGSS affiliation form pre-filled with applicant details", status: "done" },
    { title: "Submit digital filing via Import@ss", sublabel: "Tesorería General (TGSS) portal via Cl@ve or selfie verification", status: "active" },
    { title: "Download official NUSS certificate", sublabel: "12-digit permanent social security identifier (NUSS/NAF) issued", status: "pending" },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between h-full">
      {/* Workspace Header */}
      <div className="px-5 py-3 border-b border-zinc-100 bg-white flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center text-white font-syne font-black text-xs shadow-sm">
            p.
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-syne font-extrabold text-sm text-black leading-tight">Seguridad Social (NUSS)</h3>
              <span className="font-mono text-[8px] font-bold text-white bg-black px-1.5 py-0.5 rounded uppercase">Spain</span>
            </div>
            <p className="font-mono text-[8.5px] text-zinc-500 mt-0.5">Active Procedure · Modelo TA.1 &amp; Import@ss</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="text-right hidden sm:block">
            <span className="font-mono text-[8px] text-zinc-400 block uppercase tracking-wider">Progress</span>
            <span className="font-mono text-[9.5px] font-bold text-black">2 of 4 Steps Done</span>
          </div>
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="7.5" className="stroke-zinc-200" strokeWidth="2.5" fill="transparent" />
              <circle cx="10" cy="10" r="7.5" className="stroke-black" strokeWidth="2.5" fill="transparent" strokeDasharray="47.12" strokeDashoffset="23.56" strokeLinecap="round" />
            </svg>
            <span className="absolute text-[7px] font-mono font-extrabold text-black">50%</span>
          </div>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="p-4 sm:p-5 flex flex-col justify-between gap-3.5 bg-zinc-50/50 flex-1">
        {/* Procedure Dependency Reasoner Banner */}
        <div className="bg-white border border-zinc-200 text-black p-3 rounded-xl flex items-start gap-2.5 shadow-xs shrink-0">
          <div className="w-5 h-5 rounded-lg bg-zinc-100 flex items-center justify-center text-black shrink-0 mt-0.5 border border-zinc-200">
            <Sparkles className="w-3 h-3 text-black animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-700 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Procedure Dependency Checklist
              </span>
              <span className="font-mono text-[7px] bg-zinc-100 text-zinc-700 border border-zinc-200 px-1.5 py-0.5 rounded font-semibold">
                Step 3 of 4 Ready
              </span>
            </div>
            <p className="text-[8.5px] text-zinc-600 mt-1 leading-snug font-sans">
              &ldquo;Step 3 requires Form TA.1 pre-filled, verified passport/NIE, and empadronamiento. Ready for Import@ss digital submission.&rdquo;
            </p>
          </div>
        </div>

        {/* 2-Column Grid (Matching Structure) */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 flex-1">
          {/* Left: Sequential Task List (7 cols) */}
          <div className="sm:col-span-7 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Action Pipeline</span>
              <span className="font-mono text-[8.5px] text-zinc-400">4 Steps Tracked</span>
            </div>

            <div className="bg-white border border-zinc-200 rounded-xl p-3 shadow-xs flex flex-col justify-around flex-1 gap-2 relative">
              <div className="absolute left-[20px] top-4 bottom-4 w-0.5 bg-zinc-200 z-0" />

              {tasks.map((t, i) => (
                <div key={i} className="flex items-start gap-2.5 relative z-10">
                  {t.status === "done" ? (
                    <div className="w-4 h-4 rounded-full bg-black border border-black flex items-center justify-center text-white flex-shrink-0 shadow-xs mt-0.5">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                  ) : t.status === "active" ? (
                    <div className="w-4 h-4 rounded-full bg-zinc-100 border-2 border-black flex items-center justify-center text-black flex-shrink-0 shadow-xs mt-0.5">
                      <Clock className="w-2.5 h-2.5 text-black" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-zinc-50 border border-zinc-300 flex items-center justify-center flex-shrink-0 text-zinc-400 shadow-xs mt-0.5">
                      <div className="w-1 h-1 rounded-full bg-zinc-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-[10px] font-bold leading-tight ${t.status === "done" ? "text-zinc-400 line-through decoration-zinc-300" : "text-black"}`}>
                      {t.title}
                    </p>
                    <p className="text-[7.5px] text-zinc-500 font-mono mt-0.5 leading-tight">{t.sublabel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Active Priority Action (5 cols) */}
          <div className="sm:col-span-5 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="font-mono text-[9px] uppercase tracking-wider text-black font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-black" /> Current Step
              </span>
              <span className="font-mono text-[8px] bg-zinc-200 text-black px-1.5 py-0.2 rounded font-bold">Action Ready</span>
            </div>

            <div className="bg-white border-2 border-black rounded-xl p-3 shadow-md flex flex-col justify-between flex-1 gap-2.5">
              <div>
                <div className="flex items-center gap-1 text-[7.5px] font-mono text-zinc-500 uppercase tracking-wider">
                  <span>Step 3 Verification</span>
                </div>
                <h4 className="font-syne font-extrabold text-[11px] text-black leading-tight mt-0.5">
                  Submit NUSS Application
                </h4>
                <p className="text-[8px] text-zinc-600 mt-1 leading-snug">
                  Tesorería General (TGSS). Modelo TA.1 is generated and verified with your passport details.
                </p>
              </div>

              <div className="flex flex-col gap-1.5 border-t border-zinc-100 pt-2 font-mono text-[7.5px]">
                <div className="flex items-center gap-1.5 text-black font-medium">
                  <Check className="w-2.5 h-2.5 text-black shrink-0" />
                  <span>Modelo TA.1 PDF completed</span>
                </div>
                <div className="flex items-center gap-1.5 text-black font-medium">
                  <Check className="w-2.5 h-2.5 text-black shrink-0" />
                  <span>Padrón certificate attached</span>
                </div>
              </div>

              <div className="w-full py-1.5 bg-black text-white rounded-lg font-syne font-bold text-[8.5px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm">
                Submit via Import@ss <ChevronRight className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Command Bar Prompt Input */}
        <div className="bg-white border border-zinc-200 px-3 py-2 rounded-xl flex items-center justify-between gap-2 shadow-xs shrink-0">
          <div className="flex items-center gap-2 min-w-0 flex-1 text-zinc-400">
            <Sparkles className="w-3.5 h-3.5 text-black shrink-0" />
            <span className="font-mono text-[8px] text-zinc-500 truncate">Ask Paprs anything or drop official PDFs to auto-index...</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 font-mono text-[7.5px] text-zinc-500 bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded">
            <span>⌘K</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. VIEW: NIE CERTIFICATE ROUTE VIEW
// ─────────────────────────────────────────────────────────────────────────────
export function NieCertificateRouteView() {
  const tasks: Array<{ title: string; sublabel: string; status: "done" | "active" | "pending" }> = [
    { title: "Generate Tax Model 790-012", sublabel: "Official PDF with pre-calculated fee (€12.24)", status: "done" },
    { title: "Pay €12.24 tax fee", sublabel: "At any ATM / Bank, payment proof verified", status: "done" },
    { title: "Present EX-15 form in person", sublabel: "Carrer de Múrcia 36, Barcelona (Confirmed)", status: "active" },
    { title: "Pick up your NIE certificate", sublabel: "After office processing, in-person collection", status: "pending" },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between h-full">
      {/* Workspace Header */}
      <div className="px-5 py-3 border-b border-zinc-100 bg-white flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center text-white font-syne font-black text-xs shadow-sm">
            p.
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-syne font-extrabold text-sm text-black leading-tight">NIE Certificate Route</h3>
              <span className="font-mono text-[8px] font-bold text-white bg-black px-1.5 py-0.5 rounded uppercase">Spain</span>
            </div>
            <p className="font-mono text-[8.5px] text-zinc-500 mt-0.5">Active Procedure · EX-15 &amp; Model 790-012</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="text-right hidden sm:block">
            <span className="font-mono text-[8px] text-zinc-400 block uppercase tracking-wider">Progress</span>
            <span className="font-mono text-[9.5px] font-bold text-black">2 of 4 Steps Done</span>
          </div>
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="7.5" className="stroke-zinc-200" strokeWidth="2.5" fill="transparent" />
              <circle cx="10" cy="10" r="7.5" className="stroke-black" strokeWidth="2.5" fill="transparent" strokeDasharray="47.12" strokeDashoffset="23.56" strokeLinecap="round" />
            </svg>
            <span className="absolute text-[7px] font-mono font-extrabold text-black">50%</span>
          </div>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="p-4 sm:p-5 flex flex-col justify-between gap-3.5 bg-zinc-50/50 flex-1">
        {/* Procedure Dependency Reasoner Banner */}
        <div className="bg-white border border-zinc-200 text-black p-3 rounded-xl flex items-start gap-2.5 shadow-xs shrink-0">
          <div className="w-5 h-5 rounded-lg bg-zinc-100 flex items-center justify-center text-black shrink-0 mt-0.5 border border-zinc-200">
            <Sparkles className="w-3 h-3 text-black animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-700 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Procedure Dependency Checklist
              </span>
              <span className="font-mono text-[7px] bg-zinc-100 text-zinc-700 border border-zinc-200 px-1.5 py-0.5 rounded font-semibold">
                Step 3 of 4 Ready
              </span>
            </div>
            <p className="text-[8.5px] text-zinc-600 mt-1 leading-snug font-sans">
              &ldquo;Step 3 requires Form EX-15 original, valid passport, and paid fee stamp Model 790-012. Ready for presentation.&rdquo;
            </p>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 flex-1">
          {/* Left: Sequential Task List (7 cols) */}
          <div className="sm:col-span-7 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Action Pipeline</span>
              <span className="font-mono text-[8.5px] text-zinc-400">4 Steps Tracked</span>
            </div>

            <div className="bg-white border border-zinc-200 rounded-xl p-3 shadow-xs flex flex-col justify-around flex-1 gap-2 relative">
              <div className="absolute left-[20px] top-4 bottom-4 w-0.5 bg-zinc-200 z-0" />

              {tasks.map((t, i) => (
                <div key={i} className="flex items-start gap-2.5 relative z-10">
                  {t.status === "done" ? (
                    <div className="w-4 h-4 rounded-full bg-black border border-black flex items-center justify-center text-white flex-shrink-0 shadow-xs mt-0.5">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                  ) : t.status === "active" ? (
                    <div className="w-4 h-4 rounded-full bg-zinc-100 border-2 border-black flex items-center justify-center text-black flex-shrink-0 shadow-xs mt-0.5">
                      <Clock className="w-2.5 h-2.5 text-black" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-zinc-50 border border-zinc-300 flex items-center justify-center flex-shrink-0 text-zinc-400 shadow-xs mt-0.5">
                      <div className="w-1 h-1 rounded-full bg-zinc-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-[10px] font-bold leading-tight ${t.status === "done" ? "text-zinc-400 line-through decoration-zinc-300" : "text-black"}`}>
                      {t.title}
                    </p>
                    <p className="text-[7.5px] text-zinc-500 font-mono mt-0.5 leading-tight">{t.sublabel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Active Priority Action (5 cols) */}
          <div className="sm:col-span-5 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="font-mono text-[9px] uppercase tracking-wider text-black font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-black" /> Current Step
              </span>
              <span className="font-mono text-[8px] bg-zinc-200 text-black px-1.5 py-0.2 rounded font-bold">Action Ready</span>
            </div>

            <div className="bg-white border-2 border-black rounded-xl p-3 shadow-md flex flex-col justify-between flex-1 gap-2.5">
              <div>
                <div className="flex items-center gap-1 text-[7.5px] font-mono text-zinc-500 uppercase tracking-wider">
                  <span>Step 3 Verification</span>
                </div>
                <h4 className="font-syne font-extrabold text-[11px] text-black leading-tight mt-0.5">
                  Present In-Person Application
                </h4>
                <p className="text-[8px] text-zinc-600 mt-1 leading-snug">
                  Carrer de Múrcia 36, Barcelona. Bring your original passport and fee receipt.
                </p>
              </div>

              <div className="flex flex-col gap-1.5 border-t border-zinc-100 pt-2 font-mono text-[7.5px]">
                <div className="flex items-center gap-1.5 text-black font-medium">
                  <Check className="w-2.5 h-2.5 text-black shrink-0" />
                  <span>EX-15 PDF downloaded</span>
                </div>
                <div className="flex items-center gap-1.5 text-black font-medium">
                  <Check className="w-2.5 h-2.5 text-black shrink-0" />
                  <span>Fee receipt stamped</span>
                </div>
              </div>

              <div className="w-full py-1.5 bg-black text-white rounded-lg font-syne font-bold text-[8.5px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm">
                View Action Packet <ChevronRight className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Command Bar Prompt Input */}
        <div className="bg-white border border-zinc-200 px-3 py-2 rounded-xl flex items-center justify-between gap-2 shadow-xs shrink-0">
          <div className="flex items-center gap-2 min-w-0 flex-1 text-zinc-400">
            <Sparkles className="w-3.5 h-3.5 text-black shrink-0" />
            <span className="font-mono text-[8px] text-zinc-500 truncate">Ask Paprs anything or drop official PDFs to auto-index...</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 font-mono text-[7.5px] text-zinc-500 bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded">
            <span>⌘K</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const NieRouteView = NieCertificateRouteView;

// ─────────────────────────────────────────────────────────────────────────────
// 5. COMPOSITE READY-TO-USE WRAPPERS
// ─────────────────────────────────────────────────────────────────────────────
export function PaprsWebDashboard({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <BrowserPlaceholder className={className} style={style}>
      <HeroDashboardView />
    </BrowserPlaceholder>
  );
}

export function PaprsWebDashboardCard({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <BrowserPlaceholder className={className} style={style}>
      <SeguridadSocialRouteView />
    </BrowserPlaceholder>
  );
}

export const PaprsDetailPhoneScreen = PaprsWebDashboardCard;
