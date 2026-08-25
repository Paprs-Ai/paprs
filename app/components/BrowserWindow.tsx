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
  QrCode,
  Sparkles,
} from "lucide-react";
import { OnboardingWebView } from "./OnboardingWebView";
import { useLanguage } from "../context/LanguageContext";

export function WebFloatingNav({
  activeTab = "dashboard",
  className = "",
}: {
  activeTab?: "dashboard" | "todo" | "vault" | "assistant";
  className?: string;
}) {
  const { dict } = useLanguage();
  const tabs = [
    { id: "dashboard", label: dict.nav.overview, icon: Home },
    { id: "todo", label: dict.nav.actionPlan, icon: Layers },
    { id: "vault", label: dict.nav.vault, icon: FileText },
    { id: "assistant", label: dict.nav.assistant, icon: Sparkles },
  ];

  return (
    <div className={`px-3.5 py-2 bg-white border-b border-zinc-100 flex items-center justify-between gap-2 shrink-0 select-none ${className}`}>
      {/* Brand */}
      <div className="flex items-center gap-1.5">
        <span className="font-syne font-black text-[13px] tracking-tight text-black">
          Paprs
        </span>
      </div>

      {/* Center Nav Pills */}
      <div className="flex items-center gap-0.5 bg-zinc-100/80 p-0.5 rounded-full border border-zinc-200/80">
        {tabs.map((t) => {
          const isActive = activeTab === t.id;
          const Icon = t.icon;
          return (
            <div
              key={t.id}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[7.5px] font-mono transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-black text-white font-bold shadow-xs"
                  : "text-zinc-500 hover:text-black font-medium"
              }`}
            >
              <Icon className="w-2.5 h-2.5" />
              <span>{t.label}</span>
            </div>
          );
        })}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-black transition-colors cursor-pointer">
          <QrCode className="w-2.5 h-2.5" />
        </div>
        <div className="w-5 h-5 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-black transition-colors cursor-pointer relative">
          <Bell className="w-2.5 h-2.5" />
          <span className="w-1 h-1 rounded-full bg-black absolute top-1 right-1" />
        </div>
        <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center font-mono text-[7px] font-bold shadow-xs">
          JD
        </div>
      </div>
    </div>
  );
}

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
      <div className="px-4 py-2 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 border border-red-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80 border border-amber-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 border border-emerald-500/20" />
        </div>

        {/* Address / URL Bar */}
        <div className="flex-1 max-w-xs mx-auto bg-white border border-zinc-200 rounded-lg px-3 py-0.5 flex items-center justify-center gap-1.5 shadow-xs">
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

export function HeroDashboardView() {
  const docs: Array<{
    title: string;
    subtitle: string;
    badgeText: string;
    badgeType: "done" | "progress" | "pending";
    doneCount: number;
    totalCount: number;
    iconType: "nie" | "seg_social" | "padron" | "hacienda" | "digital_cert";
  }> = [
    { title: "NIE Certificate", subtitle: "EXP: NIE-2026-X83", badgeText: "In Progress", badgeType: "progress", doneCount: 2, totalCount: 4, iconType: "nie" },
    { title: "Social Security (NUSS)", subtitle: "NUSS: 08/12345678", badgeText: "Next", badgeType: "pending", doneCount: 1, totalCount: 3, iconType: "seg_social" },
    { title: "Empadronamiento", subtitle: "REG: 08019-2026", badgeText: "Done", badgeType: "done", doneCount: 4, totalCount: 4, iconType: "padron" },
    { title: "Modelo 030 / Tax ID", subtitle: "HAC: 2026-TAX-030", badgeText: "Queued", badgeType: "pending", doneCount: 0, totalCount: 3, iconType: "hacienda" },
    { title: "Certificado Digital FNMT", subtitle: "FNMT: 2026-CER-DIG", badgeText: "Queued", badgeType: "pending", doneCount: 0, totalCount: 2, iconType: "digital_cert" },
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

  const iconMap: Record<string, React.ReactNode> = {
    nie: <FileText className="w-3.5 h-3.5 text-black" />,
    seg_social: <Layers className="w-3.5 h-3.5 text-black" />,
    padron: <MapPin className="w-3.5 h-3.5 text-black" />,
    hacienda: <CreditCard className="w-3.5 h-3.5 text-black" />,
    digital_cert: <Lock className="w-3.5 h-3.5 text-black" />,
  };

  return (
    <div className="flex-1 flex flex-col justify-between h-full bg-zinc-50/40">
      {/* Top Floating Nav Bar matching real Web App */}
      <WebFloatingNav activeTab="dashboard" />

      {/* Main Canvas */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between gap-3 flex-1 overflow-y-auto scrollbar-none">
        {/* Top 3-Metric Summary Row matching Web App DashboardScreen */}
        <div className="grid grid-cols-3 gap-2 shrink-0">
          {/* 1. Health Score */}
          <div className="bg-white border border-zinc-200/80 p-2 rounded-xl flex items-center gap-2 shadow-2xs">
            <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" className="stroke-zinc-200" strokeWidth="2.5" fill="transparent" />
                <circle cx="12" cy="12" r="9" className="stroke-black" strokeWidth="2.5" fill="transparent" strokeDasharray="56.54" strokeDashoffset="11.3" strokeLinecap="round" />
              </svg>
              <span className="absolute text-[6.5px] font-mono font-bold text-black">80%</span>
            </div>
            <div className="min-w-0">
              <span className="text-[6.5px] font-mono uppercase text-zinc-400 block font-bold leading-none">Health Score</span>
              <p className="text-[8.5px] font-syne font-bold text-black leading-tight mt-0.5">Spanish Route Active</p>
            </div>
          </div>

          {/* 2. Documents */}
          <div className="bg-white border border-zinc-200/80 p-2 rounded-xl flex items-center gap-2 shadow-2xs">
            <div className="w-6 h-6 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0 border border-zinc-200/60">
              <FileText className="w-3 h-3 text-black" />
            </div>
            <div className="min-w-0">
              <span className="text-[6.5px] font-mono uppercase text-zinc-400 block font-bold leading-none">Documents</span>
              <p className="text-[8.5px] font-syne font-bold text-black leading-tight mt-0.5">4 of 5 in Vault</p>
            </div>
          </div>

          {/* 3. Next Target */}
          <div className="bg-white border border-zinc-200/80 p-2 rounded-xl flex items-center gap-2 shadow-2xs">
            <div className="w-6 h-6 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0 border border-zinc-200/60">
              <Clock className="w-3 h-3 text-black" />
            </div>
            <div className="min-w-0">
              <span className="text-[6.5px] font-mono uppercase text-zinc-400 block font-bold leading-none">Next Target</span>
              <p className="text-[8.5px] font-syne font-bold text-black leading-tight mt-0.5 truncate">in 52d · Renewal</p>
            </div>
          </div>
        </div>

        {/* Case Reasoning & Verification Engine Banner */}
        <div className="bg-white border border-zinc-200/80 text-black p-2 sm:p-2.5 rounded-xl flex items-start gap-2 shadow-2xs shrink-0">
          <div className="w-5 h-5 rounded-lg bg-zinc-100 flex items-center justify-center text-black shrink-0 mt-0.5 border border-zinc-200">
            <Sparkles className="w-3 h-3 text-black animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[7.5px] uppercase tracking-wider text-zinc-700 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Case Reasoning &amp; Verification Engine
              </span>
              <span className="font-mono text-[6.5px] bg-zinc-100 text-zinc-700 border border-zinc-200 px-1.5 py-0.5 rounded font-semibold">
                99.8% BOE Match
              </span>
            </div>
            <p className="text-[8px] text-zinc-600 mt-0.5 leading-snug font-sans">
              &ldquo;Matched Spanish Student Route for Barcelona. Form EX-15 &amp; Model 790-012 pre-filled with calculated €12.24 fee. 4 dependencies verified.&rdquo;
            </p>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="how-dashboard-grid grid grid-cols-1 sm:grid-cols-12 gap-3 flex-1">
          {/* Left Column: Active Procedures Pipeline (7 cols) */}
          <div className="sm:col-span-7 flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-0.5 shrink-0">
              <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-400 font-bold">Active Procedures</span>
              <span className="font-mono text-[7.5px] text-zinc-400">5 Tracked</span>
            </div>

            <div className="flex flex-col gap-1.5">
              {docs.map((d, i) => {
                const pct = Math.round((d.doneCount / d.totalCount) * 100);
                const isActive = d.badgeType === "progress";
                return (
                  <div
                    key={i}
                    className={`bg-white border rounded-xl p-2 transition-all ease-out ${
                      isActive ? "border-black shadow-xs ring-1 ring-black/5" : "border-zinc-200/80 shadow-2xs"
                    }`}
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? "translateY(0)" : "translateY(8px)",
                      transitionDuration: "400ms",
                      transitionDelay: `${i * 50}ms`,
                    }}
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="w-5 h-5 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center flex-shrink-0">
                          {iconMap[d.iconType]}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[9px] font-extrabold font-syne leading-tight text-black truncate">{d.title}</p>
                          <p className="text-[7px] font-mono text-zinc-400 truncate">{d.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Process Circle Gauge */}
                        <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="9" className="stroke-zinc-200" strokeWidth="2.5" fill="transparent" />
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              className="stroke-black"
                              strokeWidth="2.5"
                              fill="transparent"
                              strokeDasharray="56.54"
                              strokeDashoffset={56.54 - (56.54 * (mounted ? pct : 0)) / 100}
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="absolute text-[5px] font-mono font-bold text-black">{pct}%</span>
                        </div>
                        <span className={`text-[6.5px] font-mono border px-1.5 py-0.5 rounded font-bold uppercase tracking-wider whitespace-nowrap flex-shrink-0 ${badgeStyles[d.badgeType]}`}>
                          {d.badgeText}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Hero "What You Should Do This Week" Card (5 cols) */}
          <div className="sm:col-span-5 flex flex-col justify-between gap-1.5">
            <div className="flex items-center justify-between px-0.5">
              <span className="font-mono text-[8px] uppercase tracking-wider text-black font-bold flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-black" /> Action Priority
              </span>
              <span className="font-mono text-[7.5px] bg-zinc-100 border border-zinc-200 text-black px-1.5 py-0.2 rounded font-bold">52d Left</span>
            </div>

            <div className="bg-white border border-black rounded-xl p-2.5 shadow-xs flex flex-col justify-between flex-1 gap-2">
              <div>
                <div className="flex items-center gap-1 text-[7px] font-mono text-zinc-400 uppercase tracking-wider font-bold">
                  <span>What You Should Do This Week</span>
                </div>
                <h4 className="font-syne font-extrabold text-[10.5px] text-black leading-tight mt-0.5">
                  Student Stay Renewal
                </h4>
                <p className="text-[7.5px] text-zinc-500 mt-1 leading-snug">
                  Official form EX-15 prepared with fee (€12.24) pre-calculated. Ready for submission.
                </p>
              </div>

              {/* Document chips */}
              <div className="flex flex-wrap gap-1 border-t border-zinc-100 pt-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 font-mono text-[6.5px] font-bold text-black">
                  <Check className="w-2 h-2 text-black" /> Valid Passport
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 font-mono text-[6.5px] font-bold text-black">
                  <Check className="w-2 h-2 text-black" /> Enrolment
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white border border-zinc-300 px-1.5 py-0.5 font-mono text-[6.5px] font-medium text-zinc-600">
                  Form EX-15
                </span>
              </div>

              <div className="w-full py-1.5 bg-black text-white rounded-lg font-mono font-bold text-[8px] uppercase tracking-wider flex items-center justify-center gap-1 shadow-xs cursor-pointer hover:bg-zinc-800 transition-colors">
                Review Action Packet <ChevronRight className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Command Bar Prompt Input */}
        <div className="bg-white border border-zinc-200 px-3 py-1.5 rounded-xl flex items-center justify-between gap-2 shadow-2xs shrink-0">
          <div className="flex items-center gap-2 min-w-0 flex-1 text-zinc-400">
            <Sparkles className="w-3 h-3 text-black shrink-0" />
            <span className="font-mono text-[7.5px] text-zinc-500 truncate">Ask Paprs anything or drop official PDFs to auto-index...</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 font-mono text-[7px] text-zinc-500 bg-zinc-100 border border-zinc-200 px-1.5 py-0.2 rounded">
            <span>⌘K</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const RelocationHubView = HeroDashboardView;

export function SeguridadSocialRouteView() {
  const tasks: Array<{ title: string; sublabel: string; status: "done" | "active" | "pending" }> = [
    { title: "Verify identity & padrón record", sublabel: "Valid passport/NIE & Barcelona residency certificate matched", status: "done" },
    { title: "Generate Modelo TA.1 application", sublabel: "Official TGSS affiliation form pre-filled with applicant details", status: "done" },
    { title: "Submit digital filing via Import@ss", sublabel: "Tesorería General (TGSS) portal via Cl@ve or selfie verification", status: "active" },
    { title: "Download official NUSS certificate", sublabel: "12-digit permanent social security identifier (NUSS/NAF) issued", status: "pending" },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between h-full bg-zinc-50/40">
      {/* Top Floating Nav Bar matching real Web App */}
      <WebFloatingNav activeTab="todo" />

      {/* Main Canvas */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between gap-3 flex-1 overflow-y-auto scrollbar-none">
        {/* Breadcrumb Header */}
        <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2">
          <div>
            <span className="font-mono text-[7px] text-zinc-400 uppercase tracking-wider font-bold">
              Action Plan · Social Security
            </span>
            <h3 className="font-syne font-extrabold text-[12px] text-black leading-tight mt-0.5">
              Seguridad Social (NUSS) Application
            </h3>
          </div>
          <span className="font-mono text-[7px] bg-zinc-100 border border-zinc-200 text-black px-2 py-0.5 rounded-full font-bold uppercase">
            Step 3 of 4 Ready
          </span>
        </div>

        {/* 2-Column Grid */}
        <div className="how-dashboard-grid grid grid-cols-1 sm:grid-cols-12 gap-3 flex-1">
          {/* Left: Sequential Task List (7 cols) */}
          <div className="how-dashboard-grid-primary sm:col-span-7 flex flex-col justify-between gap-1.5">
            <div className="flex items-center justify-between px-0.5">
              <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-400 font-bold">Action Pipeline</span>
              <span className="font-mono text-[7.5px] text-zinc-400">4 Steps</span>
            </div>

            <div className="bg-white border border-zinc-200/80 rounded-xl p-2.5 shadow-2xs flex flex-col justify-between flex-1 gap-1">
              {tasks.map((t, i) => (
                <div key={i} className="flex items-start gap-2.5 relative flex-1 min-h-[38px]">
                  {/* Left indicator track with continuous line */}
                  <div className="relative flex flex-col items-center flex-shrink-0 self-stretch">
                    {t.status === "done" ? (
                      <div className="w-3.5 h-3.5 rounded-full bg-black border border-black flex items-center justify-center text-white z-10 shadow-2xs mt-0.5">
                        <Check className="w-2 h-2 text-white stroke-[2.5]" />
                      </div>
                    ) : t.status === "active" ? (
                      <div className="w-3.5 h-3.5 rounded-full bg-zinc-100 border border-black flex items-center justify-center text-black z-10 shadow-2xs mt-0.5">
                        <Clock className="w-2 h-2 text-black" />
                      </div>
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full bg-zinc-50 border border-zinc-300 flex items-center justify-center text-zinc-400 z-10 shadow-2xs mt-0.5">
                        <div className="w-1 h-1 rounded-full bg-zinc-400" />
                      </div>
                    )}

                    {/* Continuous connector line down to next circle */}
                    {i < tasks.length - 1 && (
                      <div className="w-[1.5px] bg-zinc-200 flex-1 my-0.5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 pb-1">
                    <p className={`text-[9px] font-bold leading-tight ${t.status === "done" ? "text-zinc-400 line-through decoration-zinc-300" : "text-black"}`}>
                      {t.title}
                    </p>
                    <p className="text-[7px] text-zinc-500 font-mono mt-0.5 leading-tight">{t.sublabel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Active Priority Action (5 cols) */}
          <div className="how-dashboard-grid-secondary sm:col-span-5 flex flex-col justify-between gap-1.5">
            <div className="flex items-center justify-between px-0.5">
              <span className="font-mono text-[8px] uppercase tracking-wider text-black font-bold flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-black" /> Next Action
              </span>
              <span className="font-mono text-[7.5px] bg-zinc-100 border border-zinc-200 text-black px-1.5 py-0.2 rounded font-bold">Action Ready</span>
            </div>

            <div className="bg-white border border-black rounded-xl p-2.5 shadow-xs flex flex-col justify-between flex-1 gap-2">
              <div>
                <div className="flex items-center gap-1 text-[7px] font-mono text-zinc-400 uppercase tracking-wider font-bold">
                  <span>Step 3 Verification</span>
                </div>
                <h4 className="font-syne font-extrabold text-[10.5px] text-black leading-tight mt-0.5">
                  Submit NUSS Application
                </h4>
                <p className="text-[7.5px] text-zinc-500 mt-1 leading-snug">
                  Tesorería General (TGSS). Modelo TA.1 is generated and verified with your passport.
                </p>
              </div>

              <div className="flex flex-col gap-1 border-t border-zinc-100 pt-1.5 font-mono text-[7px]">
                <div className="flex items-center gap-1 text-black font-medium">
                  <Check className="w-2 h-2 text-black shrink-0" />
                  <span>Modelo TA.1 PDF completed</span>
                </div>
                <div className="flex items-center gap-1 text-black font-medium">
                  <Check className="w-2 h-2 text-black shrink-0" />
                  <span>Padrón certificate attached</span>
                </div>
              </div>

              <div className="w-full py-1.5 bg-black text-white rounded-lg font-mono font-bold text-[8px] uppercase tracking-wider flex items-center justify-center gap-1 shadow-xs cursor-pointer hover:bg-zinc-800 transition-colors">
                Submit via Import@ss <ChevronRight className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Command Bar */}
        <div className="bg-white border border-zinc-200 px-3 py-1.5 rounded-xl flex items-center justify-between gap-2 shadow-2xs shrink-0">
          <div className="flex items-center gap-2 min-w-0 flex-1 text-zinc-400">
            <Sparkles className="w-3 h-3 text-black shrink-0" />
            <span className="font-mono text-[7.5px] text-zinc-500 truncate">Ask Paprs anything or drop official PDFs to auto-index...</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 font-mono text-[7px] text-zinc-500 bg-zinc-100 border border-zinc-200 px-1.5 py-0.2 rounded">
            <span>⌘K</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NieCertificateRouteView() {
  const tasks: Array<{ title: string; sublabel: string; status: "done" | "active" | "pending" }> = [
    { title: "Generate Tax Model 790-012", sublabel: "Official PDF with pre-calculated fee (€12.24)", status: "done" },
    { title: "Pay €12.24 tax fee", sublabel: "At any ATM / Bank, payment proof verified", status: "done" },
    { title: "Present EX-15 form in person", sublabel: "Carrer de Múrcia 36, Barcelona (Confirmed)", status: "active" },
    { title: "Pick up your NIE certificate", sublabel: "After office processing, in-person collection", status: "pending" },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between h-full bg-zinc-50/40">
      {/* Top Floating Nav Bar matching real Web App */}
      <WebFloatingNav activeTab="todo" />

      {/* Main Canvas */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between gap-3 flex-1 overflow-y-auto scrollbar-none">
        {/* Breadcrumb Header */}
        <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2">
          <div>
            <span className="font-mono text-[7px] text-zinc-400 uppercase tracking-wider font-bold">
              Action Plan · NIE Number
            </span>
            <h3 className="font-syne font-extrabold text-[12px] text-black leading-tight mt-0.5">
              NIE Certificate Route (EX-15)
            </h3>
          </div>
          <span className="font-mono text-[7px] bg-zinc-100 border border-zinc-200 text-black px-2 py-0.5 rounded-full font-bold uppercase">
            Step 3 of 4 Ready
          </span>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 flex-1">
          {/* Left: Sequential Task List (7 cols) */}
          <div className="sm:col-span-7 flex flex-col justify-between gap-1.5">
            <div className="flex items-center justify-between px-0.5">
              <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-400 font-bold">Action Pipeline</span>
              <span className="font-mono text-[7.5px] text-zinc-400">4 Steps</span>
            </div>

            <div className="bg-white border border-zinc-200/80 rounded-xl p-2.5 shadow-2xs flex flex-col justify-between flex-1 gap-1">
              {tasks.map((t, i) => (
                <div key={i} className="flex items-start gap-2.5 relative flex-1 min-h-[38px]">
                  {/* Left indicator track with continuous line */}
                  <div className="relative flex flex-col items-center flex-shrink-0 self-stretch">
                    {t.status === "done" ? (
                      <div className="w-3.5 h-3.5 rounded-full bg-black border border-black flex items-center justify-center text-white z-10 shadow-2xs mt-0.5">
                        <Check className="w-2 h-2 text-white stroke-[2.5]" />
                      </div>
                    ) : t.status === "active" ? (
                      <div className="w-3.5 h-3.5 rounded-full bg-zinc-100 border border-black flex items-center justify-center text-black z-10 shadow-2xs mt-0.5">
                        <Clock className="w-2 h-2 text-black" />
                      </div>
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full bg-zinc-50 border border-zinc-300 flex items-center justify-center text-zinc-400 z-10 shadow-2xs mt-0.5">
                        <div className="w-1 h-1 rounded-full bg-zinc-400" />
                      </div>
                    )}

                    {/* Continuous connector line down to next circle */}
                    {i < tasks.length - 1 && (
                      <div className="w-[1.5px] bg-zinc-200 flex-1 my-0.5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 pb-1">
                    <p className={`text-[9px] font-bold leading-tight ${t.status === "done" ? "text-zinc-400 line-through decoration-zinc-300" : "text-black"}`}>
                      {t.title}
                    </p>
                    <p className="text-[7px] text-zinc-500 font-mono mt-0.5 leading-tight">{t.sublabel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Active Priority Action (5 cols) */}
          <div className="sm:col-span-5 flex flex-col justify-between gap-1.5">
            <div className="flex items-center justify-between px-0.5">
              <span className="font-mono text-[8px] uppercase tracking-wider text-black font-bold flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-black" /> Next Action
              </span>
              <span className="font-mono text-[7.5px] bg-zinc-100 border border-zinc-200 text-black px-1.5 py-0.2 rounded font-bold">Action Ready</span>
            </div>

            <div className="bg-white border border-black rounded-xl p-2.5 shadow-xs flex flex-col justify-between flex-1 gap-2">
              <div>
                <div className="flex items-center gap-1 text-[7px] font-mono text-zinc-400 uppercase tracking-wider font-bold">
                  <span>Step 3 Verification</span>
                </div>
                <h4 className="font-syne font-extrabold text-[10.5px] text-black leading-tight mt-0.5">
                  Present In-Person Application
                </h4>
                <p className="text-[7.5px] text-zinc-500 mt-1 leading-snug">
                  Carrer de Múrcia 36, Barcelona. Bring your original passport and fee receipt.
                </p>
              </div>

              <div className="flex flex-col gap-1 border-t border-zinc-100 pt-1.5 font-mono text-[7px]">
                <div className="flex items-center gap-1 text-black font-medium">
                  <Check className="w-2 h-2 text-black shrink-0" />
                  <span>EX-15 PDF downloaded</span>
                </div>
                <div className="flex items-center gap-1 text-black font-medium">
                  <Check className="w-2 h-2 text-black shrink-0" />
                  <span>Fee receipt stamped</span>
                </div>
              </div>

              <div className="w-full py-1.5 bg-black text-white rounded-lg font-mono font-bold text-[8px] uppercase tracking-wider flex items-center justify-center gap-1 shadow-xs cursor-pointer hover:bg-zinc-800 transition-colors">
                View Action Packet <ChevronRight className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Command Bar */}
        <div className="bg-white border border-zinc-200 px-3 py-1.5 rounded-xl flex items-center justify-between gap-2 shadow-2xs shrink-0">
          <div className="flex items-center gap-2 min-w-0 flex-1 text-zinc-400">
            <Sparkles className="w-3 h-3 text-black shrink-0" />
            <span className="font-mono text-[7.5px] text-zinc-500 truncate">Ask Paprs anything or drop official PDFs to auto-index...</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 font-mono text-[7px] text-zinc-500 bg-zinc-100 border border-zinc-200 px-1.5 py-0.2 rounded">
            <span>⌘K</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const NieRouteView = NieCertificateRouteView;

// Re-export Onboarding WebView
export { OnboardingWebView } from "./OnboardingWebView";

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

export function PaprsOnboardingCard({ className, style, s1p }: { className?: string; style?: React.CSSProperties; s1p?: number }) {
  return (
    <BrowserPlaceholder url="app.paprs.app/onboarding" className={className} style={style}>
      <OnboardingWebView s1p={s1p} />
    </BrowserPlaceholder>
  );
}

export const PaprsDetailPhoneScreen = PaprsWebDashboardCard;
