"use client";

import {
  AlertTriangle,
  Check,
  ChevronLeft, ChevronRight,
  Clock,
  CreditCard,
  FileText,
  Globe,
  MapPin,
  Home,
  Sparkles,
  Layers,
  ArrowLeft,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { AndroidMockup, IPhoneMockup } from "react-device-mockup";
import DocumentCard from "../components/DocumentCard";
import { useScrollProgress } from "../hooks/useScrollProgress";

// ─── Process Step ──────────────────────────────────────────────────────────────
function PainStep({
  num,
  label,
  sublabel,
  warning,
  cost,
  isLast = false,
  isPrereq = false,
}: {
  num: number | string;
  label: string;
  sublabel?: string;
  warning?: string;
  cost?: string;
  isLast?: boolean;
  isPrereq?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold font-mono border-2 flex-shrink-0 ${
            isPrereq
              ? "bg-emerald-50 border-emerald-400 text-emerald-700"
              : "bg-amber-50 border-[#D4820A]/60 text-[#D4820A]"
          }`}
        >
          {isPrereq ? <Check className="w-3 h-3" /> : num}
        </div>
        {!isLast && <div className="w-px flex-1 min-h-[14px] mt-1 bg-slate-200" />}
      </div>
      <div className={`${isLast ? "pb-0" : "pb-3.5"} min-w-0`}>
        <div className={`text-sm font-semibold leading-snug ${isPrereq ? "text-emerald-700" : "text-slate-800"}`}>
          {label}
        </div>
        {sublabel && (
          <div className="text-[11px] text-slate-400 mt-0.5 leading-snug font-mono">{sublabel}</div>
        )}
        {warning && (
          <div className="mt-1.5 bg-red-50 border border-red-200 rounded-lg px-2.5 py-1.5 text-[11px] text-red-700 flex items-start gap-1.5 leading-snug">
            <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5 text-red-500" />
            <span>{warning}</span>
          </div>
        )}
        {cost && (
          <span className="mt-1.5 font-mono text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-0.5 inline-block">
            {cost}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Stat counter (scary variant) ─────────────────────────────────────────────
function StatCounter({
  target,
  label,
  suffix = "",
  sublabel,
  isActive,
  variant = "danger",
}: {
  target: number;
  label: string;
  suffix?: string;
  sublabel?: string;
  isActive: boolean;
  variant?: "danger" | "warning" | "infinity";
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) { setValue(0); return; }
    const steps = 40;
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setValue(Math.round((current / steps) * target));
      if (current >= steps) clearInterval(timer);
    }, 700 / steps);
    return () => clearInterval(timer);
  }, [isActive, target]);

  if (variant === "infinity") {
    return (
      <div className="flex flex-col items-center p-4 bg-red-50 rounded-2xl border border-red-200 shadow-sm">
        <span className="font-mono text-3xl font-extrabold text-red-500 animate-pulse leading-none">∞</span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-red-400 mt-1.5 text-center leading-snug">
          {label}
        </span>
        {sublabel && (
          <span className="font-mono text-[9px] text-red-300 text-center leading-snug mt-0.5">{sublabel}</span>
        )}
      </div>
    );
  }

  const colors = {
    danger: { wrap: "bg-red-50 border-red-200", num: "text-red-600", lbl: "text-red-400", sub: "text-red-300" },
    warning: { wrap: "bg-amber-50 border-amber-200", num: "text-amber-600", lbl: "text-amber-400", sub: "text-amber-300" },
  };
  const c = colors[variant as "danger" | "warning"];

  return (
    <div className={`flex flex-col items-center p-4 rounded-2xl border shadow-sm ${c.wrap}`}>
      <span className={`font-mono text-3xl font-extrabold leading-none ${c.num}`}>
        {value}{suffix}
      </span>
      <span className={`font-mono text-[10px] uppercase tracking-wider mt-1.5 text-center leading-snug ${c.lbl}`}>
        {label}
      </span>
      {sublabel && (
        <span className={`font-mono text-[9px] text-center mt-0.5 leading-snug ${c.sub}`}>{sublabel}</span>
      )}
    </div>
  );
}

// ─── Microtask Checklist Card (Hero Right side) ──────────────────────────────
// ─── Microtask Checklist Card (Hero Right side) ──────────────────────────────
export function MicrotaskCard({
  type,
  overview,
  badgeText,
  badgeType,
  tasks,
  doneCount,
  totalCount,
  shadow = "shadow-2xl",
}: {
  type: "nie" | "seg_social" | "padron" | "hacienda";
  overview: string;
  badgeText: string;
  badgeType: "done" | "progress" | "pending";
  tasks: Array<{ text: string; done: boolean; active?: boolean }>;
  doneCount: number;
  totalCount: number;
  shadow?: string;
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
      case "hacienda":
        return {
          title: "Agencia Tributaria",
          subtitle: "Modelo 303 - IVA Autoliquidación",
          code: "HAC: 2026-VAT-901",
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
    <div className={`relative w-72 min-h-[340px] p-6 pb-4 rounded-3xl border-2 border-slate-200 bg-white ${shadow} flex flex-col justify-between font-sans select-none overflow-hidden text-slate-900 text-left transition-all duration-300`}>
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
      <div className="relative z-10 pt-2 mt-2 border-t border-dashed border-slate-200">
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

// ─── Phone app screen (Hero Right side, "With Paprs" mockup) ────────────────────
function PaprsPhoneScreen() {
  const docs: Array<{
    title: string;
    subtitle: string;
    badgeText: string;
    badgeType: "done" | "progress" | "pending";
    doneCount: number;
    totalCount: number;
    iconType: "nie" | "seg_social" | "padron" | "hacienda";
  }> = [
    { title: "NIE Certificate", subtitle: "EXP: NIE-2026-X83", badgeText: "Active", badgeType: "progress", doneCount: 2, totalCount: 4, iconType: "nie" },
    { title: "Social Security", subtitle: "NUSS: 08/12345678", badgeText: "Soon", badgeType: "pending", doneCount: 1, totalCount: 3, iconType: "seg_social" },
    { title: "Empadronamiento", subtitle: "REG: 08019-2026", badgeText: "Done", badgeType: "done", doneCount: 4, totalCount: 4, iconType: "padron" },
    { title: "Modelo 100 Tax Filing", subtitle: "HAC: 2026-TAX-100", badgeText: "Soon", badgeType: "pending", doneCount: 0, totalCount: 3, iconType: "hacienda" },
    { title: "Modelo 600 Filing", subtitle: "M600: Property Tax", badgeText: "Soon", badgeType: "pending", doneCount: 0, totalCount: 2, iconType: "hacienda" },
    { title: "Private Health Insurance", subtitle: "SAN: Sanitas Policy", badgeText: "Done", badgeType: "done", doneCount: 1, totalCount: 1, iconType: "nie" },
  ];

  const totalDone = docs.reduce((a, d) => a + d.doneCount, 0);
  const totalTasks = docs.reduce((a, d) => a + d.totalCount, 0);
  const overallPercent = Math.round((totalDone / totalTasks) * 100);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(t);
  }, []);

  const badgeStyles = {
    done: "text-emerald-700 bg-emerald-50 border-emerald-200/50",
    progress: "text-amber-700 bg-amber-50 border-amber-200/50",
    pending: "text-slate-500 bg-slate-50 border-slate-200/50",
  };

  const iconMap = {
    nie: <FileText className="w-3 h-3 text-emerald-600" />,
    seg_social: <Layers className="w-3 h-3 text-amber-600" />,
    padron: <MapPin className="w-3 h-3 text-blue-600" />,
    hacienda: <CreditCard className="w-3 h-3 text-purple-600" />,
  };

  const bgMap = {
    nie: "bg-emerald-50 border-emerald-100",
    seg_social: "bg-amber-50 border-amber-100",
    padron: "bg-blue-50 border-blue-100",
    hacienda: "bg-purple-50 border-purple-100",
  };

  return (
    <div className="w-full h-full bg-[#F8FAFC] flex flex-col font-sans select-none overflow-hidden justify-between relative">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Status Bar */}
        <div className="px-5 pt-3 pb-1 flex justify-between items-center text-[8.5px] font-mono text-slate-400 select-none bg-white">
          <span className="font-semibold text-slate-800">9:41</span>
          <div className="flex items-center gap-1.5">
            <svg className="w-2.5 h-2.5 text-slate-700" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L17.61 5.03C16.07 3.8 14.12 3 12 3zm0 18c4.97 0 9-4.03 9-9 0-2.12-.74-4.07-1.97-5.61L6.39 18.97C7.93 20.2 9.88 21 12 21z" />
            </svg>
            <svg className="w-2.5 h-2.5 text-slate-700" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21l-12-18h24z" />
            </svg>
            <div className="w-3.5 h-1.5 rounded-[2px] border border-slate-400 flex items-center p-[1px]">
              <div className="w-full h-full bg-slate-700 rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* App header */}
        <div className="px-5 pt-2 pb-3 bg-white border-b border-slate-100 relative z-10 flex items-center justify-between">
          <span className="font-syne font-extrabold text-base tracking-tight text-slate-900">
            <span className="text-[#16A34A]">p.</span>aprs
          </span>
          <div className="relative w-7 h-7 rounded-full bg-slate-50 border border-slate-150 flex items-center justify-center text-[10px] font-bold font-mono text-slate-400 shadow-sm">
            JD
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#16A34A] border-2 border-white" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-none py-3 pb-24 flex flex-col gap-2">

          {/* Document list */}
          <div className="px-3 flex flex-col gap-2">
            {docs.map((d, i) => {
              const pct = Math.round((d.doneCount / d.totalCount) * 100);
              const isActive = d.badgeType === "progress";
              return (
                <div
                  key={i}
                  className={`bg-white border rounded-xl px-2.5 py-2 transition-all ease-out ${
                    isActive ? "border-amber-200 shadow-[0_4px_12px_rgba(212,130,10,0.06)] scale-[1.01]" : "border-slate-100 shadow-[0_2px_6px_rgba(0,0,0,0.01)]"
                  }`}
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(10px) scale(0.98)",
                    transitionDuration: "500ms",
                    transitionDelay: `${i * 60}ms`,
                  }}
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className={`relative w-7 h-7 rounded-lg flex items-center justify-center border flex-shrink-0 ${bgMap[d.iconType]}`}>
                        {iconMap[d.iconType]}
                        {isActive && (
                          <span className="absolute inset-0 rounded-lg border border-amber-300 animate-ping opacity-45" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-extrabold font-syne leading-tight text-slate-900 whitespace-normal break-words">{d.title}</p>
                        <p className="text-[7.5px] font-mono text-slate-400 mt-0 truncate">{d.subtitle}</p>
                      </div>
                    </div>
                    <span className={`flex items-center gap-0.5 text-[6.5px] font-mono border px-1 py-0.5 rounded-[4px] font-bold uppercase tracking-wider whitespace-nowrap flex-shrink-0 ${badgeStyles[d.badgeType]}`}>
                      {isActive && <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />}
                      {d.badgeText}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ease-out rounded-full ${
                          d.badgeType === "done" ? "bg-emerald-500" : d.badgeType === "progress" ? "bg-amber-500" : "bg-slate-300"
                        }`}
                        style={{
                          width: `${mounted ? pct : 0}%`,
                          transitionProperty: "width",
                          transitionDuration: "900ms",
                          transitionDelay: `${100 + i * 60}ms`,
                        }}
                      />
                    </div>
                    <span className="text-[7.5px] font-mono text-slate-400 flex-shrink-0 font-bold tabular-nums">{d.doneCount}/{d.totalCount}</span>
                    <ChevronRight className="w-2.5 h-2.5 text-slate-300 flex-shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Bottom Nav Bars (Split Group Layout) */}
      <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center gap-2.5 z-20">
        <div className="bg-white border border-slate-100 px-6 py-3 flex-1 flex justify-between items-center rounded-2xl shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
          <div className="text-[#16A34A] cursor-pointer">
            <Home className="w-[18px] h-[18px]" />
          </div>
          <div className="text-slate-400 hover:text-slate-650 cursor-pointer transition-colors">
            <Layers className="w-[18px] h-[18px]" />
          </div>
          <div className="text-slate-400 hover:text-slate-650 cursor-pointer transition-colors">
            <FileText className="w-[18px] h-[18px]" />
          </div>
        </div>
        <div className="bg-white border border-slate-100 p-3 flex items-center justify-center rounded-2xl shadow-[0_8px_24px_rgba(15,23,42,0.12)] cursor-pointer text-slate-400 hover:text-slate-650 transition-colors">
          <Sparkles className="w-[18px] h-[18px]" />
        </div>
      </div>
    </div>
  );
}

// ─── Phone app screen (Hero Right side, iOS — single document, task list) ───────
export function PaprsDetailPhoneScreen() {
  const tasks: Array<{ title: string; sublabel: string; status: "done" | "active" | "pending" }> = [
    { title: "Generate Tax Model 790-012", sublabel: "PDF with fee info", status: "done" },
    { title: "Pay €12.24 tax fee", sublabel: "At any ATM, keep the ticket", status: "done" },
    { title: "Present EX-15 form in person", sublabel: "Carrer de Múrcia 36, Barcelona", status: "active" },
    { title: "Pick up your NIE certificate", sublabel: "After processing, in person", status: "pending" },
  ];

  return (
    <div className="w-full h-full bg-[#F8FAFC] flex flex-col font-sans select-none justify-between overflow-hidden relative">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Status Bar */}
        <div className="px-5 pt-3 pb-1 flex justify-between items-center text-[8.5px] font-mono text-slate-400 select-none bg-white">
          <span className="font-semibold text-slate-800">9:41</span>
          <div className="flex items-center gap-1.5">
            <svg className="w-2.5 h-2.5 text-slate-700" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L17.61 5.03C16.07 3.8 14.12 3 12 3zm0 18c4.97 0 9-4.03 9-9 0-2.12-.74-4.07-1.97-5.61L6.39 18.97C7.93 20.2 9.88 21 12 21z" />
            </svg>
            <svg className="w-2.5 h-2.5 text-slate-700" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21l-12-18h24z" />
            </svg>
            <div className="w-3.5 h-1.5 rounded-[2px] border border-slate-400 flex items-center p-[1px]">
              <div className="w-full h-full bg-slate-700 rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Brand/Back Nav Header */}
        <div className="px-4 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4 text-slate-600 cursor-pointer hover:text-slate-900 transition-colors" />
            <span className="font-syne font-extrabold text-[10.5px] text-slate-900 tracking-tight leading-none">NIE Certificate</span>
          </div>
          <div className="relative w-[22px] h-[22px] flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 20 20">
              <circle
                cx="10"
                cy="10"
                r="7.5"
                className="stroke-slate-100"
                strokeWidth="2.5"
                fill="transparent"
              />
              <circle
                cx="10"
                cy="10"
                r="7.5"
                className="stroke-amber-500"
                strokeWidth="2.5"
                fill="transparent"
                strokeDasharray="47.12"
                strokeDashoffset="23.56"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-[6px] font-mono font-extrabold text-slate-500 tabular-nums">
              50%
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-none p-4 pb-4 flex flex-col gap-3">
          {/* Header Overview Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.015)] flex flex-col gap-2">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-syne font-extrabold text-[12.5px] text-slate-950 leading-tight">
                Foreigner Identity &amp; Tax Number
              </h3>
              <span className="text-[7.5px] px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200/50 uppercase font-bold shrink-0">
                In Progress
              </span>
            </div>
            <p className="text-[9.5px] text-slate-500 leading-relaxed">
              Essential for work contracts, bank accounts, SIM cards, and renting.
            </p>
          </div>

          {/* Checklist timeline */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.015)] flex flex-col gap-4 relative">
            {/* Timeline Connector Line */}
            <div className="absolute left-[24px] top-6 bottom-6 w-0.5 bg-slate-100 z-0"></div>

            {tasks.map((t, i) => (
              <div key={i} className="flex items-start gap-3.5 relative z-10">
                {t.status === "done" ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                ) : t.status === "active" ? (
                  <div className="w-5 h-5 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center text-amber-600 flex-shrink-0 shadow-sm relative">
                    <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping" />
                    <Clock className="w-3 h-3 text-amber-600" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-300 shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  </div>
                )}
                <div className="flex-1 min-w-0 mt-0.5">
                  <p className={`text-[10px] font-bold leading-tight ${t.status === "done" ? "text-slate-400 line-through decoration-slate-300" : "text-slate-900"}`}>
                    {t.title}
                  </p>
                  <p className="text-[8.5px] text-slate-400 leading-snug mt-0.5">{t.sublabel}</p>
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>


    </div>
  );
}

// ─── Slide dot indicator ───────────────────────────────────────────────────────
function SlideDots({ total, active }: { total: number; active: number }) {
  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-500 ${
            i === active ? "w-5 h-1.5 bg-[#D4820A]" : "w-1.5 h-1.5 bg-slate-300"
          }`}
        />
      ))}
    </div>
  );
}

// ─── Procedure dependency map (Slide 0 visual) ────────────────────────────────
const PROCEDURES = [
  { name: "Empadronamiento", hint: "Address registration — needed first" },
  { name: "NIE / TIE", hint: "Your identity number" },
  { name: "Healthcare", hint: "Tarjeta Sanitaria" },
  { name: "Seguridad Social", hint: "NUSS number" },
  { name: "Bank account", hint: "Spanish IBAN" },
];

// ══════════════════════════════════════════════════════════════════════════════
export default function HeroAndPain() {
  const { ref, progress } = useScrollProgress();
  const [lettersAnimate, setLettersAnimate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const totalScrollable = rect.height - viewHeight;
      const scrolledPast = -rect.top - totalScrollable;
      const progressValue = Math.max(0, Math.min(1, scrolledPast / viewHeight));
      document.documentElement.style.setProperty('--doc-transition-progress', `${progressValue}`);
      document.documentElement.style.setProperty('--viewport-height-px', `${viewHeight}px`);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ref]);

  useEffect(() => {
    const t = setTimeout(() => setLettersAnimate(true), 500);
    return () => clearTimeout(t);
  }, []);

  const interp = (val: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    if (val <= inMin) return outMin;
    if (val >= inMax) return outMax;
    return outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);
  };

  // ── hero layout ──────────────────────────────────────────────────────────
  const leftWidth = interp(progress, 0.05, 0.18, 50, 100);
  const rightWidth = interp(progress, 0.05, 0.18, 50, 0);
  const heroTextOpacity = interp(progress, 0, 0.10, 1, 0);
  const rightCardsX = interp(progress, 0, 0.15, 0, 120);
  const rightCardsOpacity = interp(progress, 0, 0.12, 1, 0);

  const bgR = Math.round(interp(progress, 0.05, 0.18, 247, 248));
  const bgG = Math.round(interp(progress, 0.05, 0.18, 244, 250));
  const bgB = Math.round(interp(progress, 0.05, 0.18, 238, 252));
  const leftBgColor = `rgb(${bgR},${bgG},${bgB})`;

  // ── chaotic hero floating cards — also used as slide 0 ghost background ───
  const d1 = { x: interp(progress, 0, 0.18, -24, 18), y: interp(progress, 0, 0.18, -26, -6),  r: interp(progress, 0, 0.18, -15, -4) };
  const d2 = { x: interp(progress, 0, 0.18, -12, 22), y: interp(progress, 0, 0.18,  26,  6),  r: interp(progress, 0, 0.18,  20,  8) };
  const d3 = { x: interp(progress, 0, 0.18, -32, 20), y: interp(progress, 0, 0.18,  12,  2),  r: interp(progress, 0, 0.18, -25, -8) };
  const d4 = { x: interp(progress, 0, 0.18, -16, 24), y: interp(progress, 0, 0.18, -24, -2),  r: interp(progress, 0, 0.18,  18,  4) };

  // ── sticky slide translate — 6 slides, each 100/6 % wide ─────────────────
  const SW = 100 / 6; // ≈ 16.667% per slide

  const getStickyTranslate = (p: number): number => {
    // Slide 0: dwell 0.18–0.28, snap 0.28–0.31
    if (p < 0.28) return 0;
    if (p < 0.31) return interp(p, 0.28, 0.31, 0, SW);
    // Slide 1: dwell 0.31–0.41, snap 0.41–0.44
    if (p < 0.41) return SW;
    if (p < 0.44) return interp(p, 0.41, 0.44, SW, SW * 2);
    // Slide 2: dwell 0.44–0.54, snap 0.54–0.57
    if (p < 0.54) return SW * 2;
    if (p < 0.57) return interp(p, 0.54, 0.57, SW * 2, SW * 3);
    // Slide 3: dwell 0.57–0.67, snap 0.67–0.70
    if (p < 0.67) return SW * 3;
    if (p < 0.70) return interp(p, 0.67, 0.70, SW * 3, SW * 4);
    // Slide 4: dwell 0.70–0.80, snap 0.80–0.83
    if (p < 0.80) return SW * 4;
    if (p < 0.83) return interp(p, 0.80, 0.83, SW * 4, SW * 5);
    // Slide 5: dwell 0.83–0.97
    return SW * 5;
  };

  const translatePercent = progress >= 0.18 ? getStickyTranslate(progress) : 0;
  const activeSlide = Math.round((translatePercent / SW));
  const sliderOpacity = interp(progress, 0.97, 1.0, 1, 0);

  // ── Bridge gather: starts when slide 5 enters (p=0.83) and completes by p=0.97
  //    Cards move ~50% toward the scanner centre (x≈-24vw, y≈0) — dramatically visible
  const bridgeGather = interp(progress, 0.83, 0.97, 0, 1);
  const bc1 = { x: interp(bridgeGather, 0, 1, -32, -30), y: interp(bridgeGather, 0, 1, -22, -10), r: interp(bridgeGather, 0, 1, -15, -8) };
  const bc2 = { x: interp(bridgeGather, 0, 1, -24, -26), y: interp(bridgeGather, 0, 1,  18,   8), r: interp(bridgeGather, 0, 1,  12,  6) };
  const bc3 = { x: interp(bridgeGather, 0, 1,   2, -28), y: interp(bridgeGather, 0, 1, -32,  -4), r: interp(bridgeGather, 0, 1,  -5, -12) };
  const bc4 = { x: interp(bridgeGather, 0, 1,   8, -22), y: interp(bridgeGather, 0, 1,  24,  12), r: interp(bridgeGather, 0, 1,  20, 10) };
  const bc5 = { x: interp(bridgeGather, 0, 1,  34, -24), y: interp(bridgeGather, 0, 1, -20,  -8), r: interp(bridgeGather, 0, 1, -18, -5) };
  const bc6 = { x: interp(bridgeGather, 0, 1,  24, -20), y: interp(bridgeGather, 0, 1,  30,   4), r: interp(bridgeGather, 0, 1,   8,  4) };

  const headlineLeft = "Drowning in paperwork?";
  const headlineRight = "Everything sorted. Step by step.";

  return (
    <div ref={ref} id="pain" className="relative h-[500vh] w-full">
      <div
        className="sticky top-0 w-full h-screen flex flex-col md:flex-row"
        style={{
          // Fade the whole section out in sync with the bridge-card crossfade
          // (0.10 → 0.90) so it dissolves into HowItWorks instead of popping
          // away the instant the z-index flips underneath it.
          opacity: `calc(1 - clamp(0, (var(--doc-transition-progress, 0) - 0.1) * 1.25, 1))`,
          // Only drop below HowItWorks once fully transparent (progress ≥ 0.50),
          // so the z-index swap happens while invisible — no visible jump.
          zIndex: `calc(35 - clamp(0, (var(--doc-transition-progress, 0) - 0.5) * 1000000, 10))`,
        } as React.CSSProperties}
      >

        {/* ── BACKGROUNDS ── */}
        {progress < 0.18 && (
          <>
            <div
              className="absolute left-0 top-0 h-full transition-all duration-100 z-0"
              style={{ width: `${leftWidth}%`, backgroundColor: leftBgColor }}
            />
            <div
              className="absolute right-0 top-0 h-full bg-[#F8FAFC] transition-all duration-100 z-0"
              style={{ width: `${rightWidth}%` }}
            />
          </>
        )}

        {/* ── HERO (progress < 0.18) ── */}
        {progress < 0.18 && (
          <>
            <div
              className="absolute inset-0 flex flex-col md:flex-row z-30 pointer-events-none"
              style={{ opacity: heroTextOpacity }}
            >
              <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-between p-8 md:p-16">
                <span className="font-mono text-sm font-extrabold tracking-[0.2em] text-[#D4820A] uppercase">WITHOUT PAPRS</span>
                <div className="max-w-md pt-4">
                  <h1 className="text-3xl md:text-5xl lg:text-[3.45rem] font-extrabold tracking-tight font-syne leading-[0.92] mb-4 text-[#1A1814]">
                    {headlineLeft.split(" ").map((word, wi) => (
                      <span key={wi} className="inline-block whitespace-nowrap mr-[0.18em]">
                        {word.split("").map((ch, ci) => (
                          <span
                            key={ci}
                            className="inline-block transition-all duration-700 ease-out"
                            style={{
                              transform: lettersAnimate ? "translateY(0)" : "translateY(20px)",
                              opacity: lettersAnimate ? 1 : 0,
                              transitionDelay: `${(wi * 8 + ci) * 15}ms`,
                            }}
                          >{ch}</span>
                        ))}
                      </span>
                    ))}
                  </h1>
                  <p className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed">
                    NIE. TIE. Padrón. Hacienda. Seguridad Social. Every office wants something different. Nobody tells you what to do first.
                  </p>
                </div>
                <div className="h-4" />
              </div>

              <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-between p-8 md:p-16">
                <span className="font-mono text-sm font-extrabold tracking-[0.2em] text-[#16A34A] uppercase hidden md:inline self-end text-right">WITH PAPRS</span>
                <div className="max-w-md pt-4">
                  <h1 className="text-3xl md:text-5xl lg:text-[3.45rem] font-extrabold tracking-tight font-syne leading-[0.92] mb-4 text-slate-950">
                    {headlineRight.split(" ").map((word, wi) => (
                      <span key={wi} className="inline-block whitespace-nowrap mr-[0.18em]">
                        {word.split("").map((ch, ci) => (
                          <span
                            key={ci}
                            className="inline-block transition-all duration-700 ease-out"
                            style={{
                              transform: lettersAnimate ? "translateY(0)" : "translateY(20px)",
                              opacity: lettersAnimate ? 1 : 0,
                              transitionDelay: `${(wi * 8 + ci) * 12}ms`,
                            }}
                          >{ch}</span>
                        ))}
                      </span>
                    ))}
                  </h1>
                  <p className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed">
                    Paprs understands your situation, finds what&apos;s urgent, and tells you exactly what to do — in plain language.
                  </p>
                </div>
                <div className="h-4" />
              </div>
            </div>

            {/* Chaos cards — animate toward slide 0 rest positions */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-45 md:opacity-55">
              {[d1, d2, d3, d4].map((d, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 transition-all duration-100 ease-out"
                  style={{ transform: `translate(calc(-50% + ${d.x}vw), calc(-50% + ${d.y}vh)) rotate(${d.r}deg)` }}
                >
                  <DocumentCard
                    type={["nie","seg_social","padron","hacienda"][i] as "nie"|"seg_social"|"padron"|"hacienda"}
                    status="chaos"
                    shadow={i === 3 ? "shadow-2xl" : i === 2 ? "shadow-lg" : "shadow-md"}
                  />
                </div>
              ))}
            </div>

            {/* Clean right-side device mockups — same screen, iOS & Android, fanned in 3D */}
            <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center md:justify-end md:pr-4 lg:pr-8 xl:pr-12 overflow-hidden">
              <div
                className="relative w-[460px] h-[520px] transition-all duration-100 scale-90 md:scale-95 lg:scale-105"
                style={{ transform: `translateX(${rightCardsX}%)`, opacity: 1, perspective: "1400px" }}
              >
                <div className="absolute left-1/2 top-1/2 z-0" style={{ transform: "translate(calc(-50% - 180px), calc(-50% + 36px)) rotateY(-24deg) rotateX(2deg)" }}>
                  <AndroidMockup
                    screenWidth={208}
                    noRoundedScreen
                    frameColor="#1A1814"
                    statusbarColor="#F8FAFC"
                    navBarColor="#F8FAFC"
                    transparentNavBar
                    hideStatusBar
                  >
                    <PaprsPhoneScreen />
                  </AndroidMockup>
                </div>
                <div className="absolute left-1/2 top-1/2 z-10" style={{ transform: "translate(calc(-50% + 75px), -50%) rotateY(18deg) rotateX(-2deg)" }}>
                  <IPhoneMockup
                    screenWidth={210}
                    screenType="island"
                    frameColor="#1A1814"
                    statusbarColor="#F8FAFC"
                    hideStatusBar
                    transparentNavBar
                    hideNavBar
                  >
                    <PaprsDetailPhoneScreen />
                  </IPhoneMockup>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── PAIN SLIDES (progress >= 0.18) ── */}
        {progress >= 0.18 && (
          <div className="absolute inset-0 w-full h-full overflow-hidden z-20 flex items-center" style={{ opacity: sliderOpacity }}>
            <div
              className="flex h-full"
              style={{
                transform: `translateX(-${translatePercent}%)`,
                width: "600%",
              }}
            >

              {/* ──────────────────────────────────────────────────────────── */}
              {/* SLIDE 0 — Arrival: emotional beat, chaos pile visible         */}
              {/* ──────────────────────────────────────────────────────────── */}
              <div className="w-screen h-full flex-shrink-0 flex items-center justify-between px-8 md:px-20 lg:px-28 select-none relative overflow-hidden">

                {/* Chaos cards at higher opacity — the same pile from the hero, now front and centre */}
                <div className="absolute inset-0 pointer-events-none z-[1] opacity-55">
                  <div className="absolute left-1/2 top-1/2 paper-float" style={{ "--paper-rotate": "-4deg" } as React.CSSProperties}>
                    <div style={{ transform: "translate(calc(-50% + 18vw), calc(-50% - 6vh)) rotate(-4deg)" }}>
                      <DocumentCard type="nie" status="chaos" />
                    </div>
                  </div>
                  <div className="absolute left-1/2 top-1/2 paper-float [animation-delay:-1.4s]" style={{ "--paper-rotate": "8deg" } as React.CSSProperties}>
                    <div style={{ transform: "translate(calc(-50% + 22vw), calc(-50% + 6vh)) rotate(8deg)" }}>
                      <DocumentCard type="seg_social" status="chaos" />
                    </div>
                  </div>
                  <div className="absolute left-1/2 top-1/2 paper-float [animation-delay:-2.7s]" style={{ "--paper-rotate": "-8deg" } as React.CSSProperties}>
                    <div style={{ transform: "translate(calc(-50% + 20vw), calc(-50% + 2vh)) rotate(-8deg)" }}>
                      <DocumentCard type="padron" status="chaos" />
                    </div>
                  </div>
                  <div className="absolute left-1/2 top-1/2 paper-float [animation-delay:-3.6s]" style={{ "--paper-rotate": "4deg" } as React.CSSProperties}>
                    <div style={{ transform: "translate(calc(-50% + 24vw), calc(-50% - 2vh)) rotate(4deg)" }}>
                      <DocumentCard type="hacienda" status="chaos" />
                    </div>
                  </div>
                </div>

                {/* Left — arrival text */}
                <div className="w-full md:w-1/2 flex flex-col justify-center gap-5 relative z-[2]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D4820A] font-bold">Day 1 in Spain</span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.05] font-syne">
                    You arrived.
                    <br />
                    <span className="text-slate-400 font-normal text-2xl md:text-3xl">Life is waiting.</span>
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                    You have a job, an apartment, plans. Then someone hands you a letter — in Spanish — and you realise: before any of this is real, Spain has paperwork that can&apos;t wait.
                  </p>
                  <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-3 max-w-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700 leading-snug font-mono">
                      Most people spend their first 3 months just figuring out where to start.
                    </p>
                  </div>
                </div>

                {/* Right intentionally empty — chaos cards fill this side */}
                <div className="hidden md:block w-1/2 h-full" />
              </div>

              {/* ──────────────────────────────────────────────────────────── */}
              {/* SLIDE 1 — What's waiting: the dependency map                 */}
              {/* ──────────────────────────────────────────────────────────── */}
              <div className="w-screen h-full flex-shrink-0 flex items-center justify-between px-8 md:px-20 lg:px-28 select-none relative overflow-hidden">

                {/* Left */}
                <div className="w-full md:w-5/12 flex flex-col justify-center gap-4 pr-4 relative z-[2]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D4820A] font-bold">What&apos;s waiting</span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight font-syne">
                    5 procedures.
                    <br />A specific order.
                    <br />
                    <span className="text-slate-400 font-sans font-normal text-lg md:text-xl">None of it obvious.</span>
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                    Each one unlocks the next. Get the order wrong and you&apos;re back to square one — sometimes weeks later.
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#D4820A] animate-pulse" />
                    <span className="font-mono text-xs text-slate-500">Most people don&apos;t know where to start</span>
                  </div>
                </div>

                {/* Right — Dependency map */}
                <div className="hidden md:flex w-6/12 flex-col justify-center relative z-[3]">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-md p-5">
                    {PROCEDURES.map((proc, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className="w-7 h-7 rounded-full border-2 border-slate-300 bg-slate-50 flex items-center justify-center text-slate-400 font-bold font-mono text-xs">?</div>
                          {i < PROCEDURES.length - 1 && <div className="w-px h-6 bg-slate-200 my-0.5" />}
                        </div>
                        <div className={`${i < PROCEDURES.length - 1 ? "pb-1" : ""}`}>
                          <div className="text-sm font-semibold text-slate-700 leading-tight">{proc.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{proc.hint}</div>
                        </div>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-slate-100 mt-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#D4820A] flex-shrink-0" />
                        <span className="text-[11px] text-[#D4820A] font-mono font-semibold">Wrong order = start over</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ──────────────────────────────────────────────────────────── */}
              {/* SLIDE 1 — NIE                                                */}
              {/* ──────────────────────────────────────────────────────────── */}
              <div className="w-screen h-full flex-shrink-0 flex items-center justify-between px-8 md:px-20 lg:px-28 select-none">
                <div className="w-full md:w-5/12 flex flex-col justify-center gap-4 pr-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#D4820A]" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D4820A] font-bold">Procedure 1 of 5</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight font-syne">
                    NIE
                    <span className="block text-slate-400 font-sans text-base font-normal mt-1">Número de Identidad de Extranjero</span>
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                    Without this, you can&apos;t work legally, sign a lease, or open a bank account. Getting it takes weeks.
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span className="font-mono text-xs text-amber-700 font-semibold">4–6 weeks</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
                      <span className="font-mono text-xs text-slate-600">€10.60 fee</span>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block w-6/12">
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-5">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-4">What you actually need to do</div>
                    <PainStep num={1} label="Book appointment on sie.extranjeros.es" sublabel="Cita previa — Comisaría de Policía" warning="Slots open Monday 8 AM. Gone by 8:02. Most people try for 2–3 weeks." />
                    <PainStep num={2} label="Fill form EX-15 — in Spanish, 4 pages" sublabel="Download, print, and complete by hand" />
                    <PainStep num={3} label="Pay Modelo 790 Código 012 at any bank" cost="€10.60 · Must pay before appointment" />
                    <PainStep num={4} label="Show up at Comisaría with 6 documents" sublabel="Passport · EX-15 · Justification · 1 photo · Fee receipt · Originals + copies" warning="Missing one document = rejected. New appointment from scratch." />
                    <PainStep num={5} label="Wait for processing" sublabel="4–6 weeks. No tracking. No email." isLast />
                  </div>
                </div>
              </div>

              {/* ──────────────────────────────────────────────────────────── */}
              {/* SLIDE 2 — Empadronamiento                                    */}
              {/* ──────────────────────────────────────────────────────────── */}
              <div className="w-screen h-full flex-shrink-0 flex items-center justify-between px-8 md:px-20 lg:px-28 select-none">
                <div className="w-full md:w-5/12 flex flex-col justify-center gap-4 pr-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#D4820A]" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D4820A] font-bold">Procedure 2 of 5</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight font-syne">
                    Empadronamiento
                    <span className="block text-slate-400 font-sans text-base font-normal mt-1">Padrón Municipal — proof of address</span>
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                    Needed before almost everything else. Without it: no bank, no healthcare, no NIE, no school.
                  </p>
                  <div className="space-y-1.5 mt-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">Required for:</div>
                    {["Bank account", "Healthcare", "NIE/TIE", "School enrollment"].map((dep) => (
                      <div key={dep} className="inline-flex items-center gap-1 bg-slate-100 rounded-full px-2.5 py-0.5 text-[11px] font-mono text-slate-600 mr-1.5 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4820A]" />{dep}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hidden md:block w-6/12">
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-5">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-4">What you actually need to do</div>
                    <PainStep num={1} label="Find your specific ayuntamiento" sublabel="Barcelona, Madrid — each district has its own office" />
                    <PainStep num={2} label="Book cita previa or queue in person" sublabel="Office hours: Mon–Fri 9:00–14:00 only" warning="No evenings. No weekends. If you work, plan a half-day off." />
                    <PainStep num={3} label="Bring originals — no copies accepted" sublabel="Passport (original) · Lease contract (signed, < 3 months old)" warning="Sublet agreements often rejected. Landlord must sign." />
                    <PainStep num={4} label="Fill and submit form at the office" sublabel="In person only — cannot be done online" />
                    <PainStep num={5} label="Collect volante de empadronamiento" sublabel="Expires in 3 months. You will need to renew it multiple times." isLast />
                  </div>
                </div>
              </div>

              {/* ──────────────────────────────────────────────────────────── */}
              {/* SLIDE 3 — Healthcare                                         */}
              {/* ──────────────────────────────────────────────────────────── */}
              <div className="w-screen h-full flex-shrink-0 flex items-center justify-between px-8 md:px-20 lg:px-28 select-none">
                <div className="w-full md:w-5/12 flex flex-col justify-center gap-4 pr-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#D4820A]" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D4820A] font-bold">Procedure 3 of 5</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight font-syne">
                    Healthcare
                    <span className="block text-slate-400 font-sans text-base font-normal mt-1">Tarjeta Sanitaria — not automatic</span>
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                    You&apos;re in Spain. You&apos;re not covered yet. This requires two offices, five documents, and weeks of waiting.
                  </p>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 mt-1 flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-700 leading-snug">
                      Emergency before card arrives? You pay upfront — and claim it back months later.
                    </p>
                  </div>
                </div>

                <div className="hidden md:block w-6/12">
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-5">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-4">What you actually need to do</div>
                    <PainStep num={1} label="NIE obtained" sublabel="Required before anything here" isPrereq />
                    <PainStep num={2} label="Empadronamiento obtained" sublabel="Required before anything here" isPrereq />
                    <PainStep num={3} label="Book appointment at INSS office" sublabel="Instituto Nacional de la Seguridad Social" warning="INSS and healthcare center are different offices. Two separate appointments." />
                    <PainStep num={4} label="Register — get NUSS number" sublabel="Bring: NIE · Passport · Empadronamiento · Work contract or proof of status" />
                    <PainStep num={5} label="Go to CAP (health center) — register with GP" sublabel="Book separately. Different office, different queue." />
                    <PainStep num={6} label="Tarjeta Sanitaria arrives by post" sublabel="2–4 weeks. No card = no scheduled appointments." isLast />
                  </div>
                </div>
              </div>

              {/* ──────────────────────────────────────────────────────────── */}
              {/* SLIDE 4 — The real cost (scary stats)                        */}
              {/* ──────────────────────────────────────────────────────────── */}
              <div className="w-screen h-full flex-shrink-0 flex items-center justify-between px-8 md:px-20 lg:px-28 select-none relative overflow-hidden">

                {/* Static chaos cards removed — bridge cards (z-[25], outside slider)
                     start at exactly the same positions and take over from slide 5 entry.
                     Having both rendered at identical coords caused the double-document issue. */}

                {/* Left */}
                <div className="w-full md:w-5/12 flex flex-col justify-center gap-4 p-6 md:p-8 rounded-3xl border border-white/50 bg-white/75 backdrop-blur-md shadow-xl relative z-30 select-text">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-red-600 font-bold">Average experience without help</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight font-syne">
                    The real cost of going it alone.
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                    This is before taxes, work permits, TIE renewal, or driving licence exchange. Most people make at least one expensive mistake.
                  </p>
                  <div className="flex flex-col gap-2.5 mt-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      NIE: avg 3 attempts just to get an appointment
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      Wrong step order = weeks of delay + repeat visits
                    </div>
                    <div className="flex items-center gap-2 text-xs text-red-500 font-mono">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      Most end up paying a gestor €500+ to fix their mistakes
                    </div>
                  </div>
                </div>

                {/* Right — Scary stat grid */}
                <div className="hidden md:flex w-6/12 flex-col gap-2.5 relative z-10">
                  <div className="grid grid-cols-2 gap-2.5">
                    <StatCounter
                      target={12} suffix="+"
                      label="Appointments"
                      sublabel="avg 3 tries for NIE alone"
                      isActive={activeSlide === 5}
                      variant="danger"
                    />
                    <StatCounter
                      target={14}
                      label="Documents"
                      sublabel="originals — copies rejected"
                      isActive={activeSlide === 5}
                      variant="danger"
                    />
                    <StatCounter
                      target={6}
                      label="Offices"
                      sublabel="different buildings, different hours"
                      isActive={activeSlide === 5}
                      variant="warning"
                    />
                    <StatCounter
                      target={60} suffix="+"
                      label="Days"
                      sublabel="minimum until fully legal & covered"
                      isActive={activeSlide === 5}
                      variant="danger"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <StatCounter
                      target={127} suffix="€"
                      label="Government fees"
                      sublabel="just the basic procedures"
                      isActive={activeSlide === 5}
                      variant="warning"
                    />
                    <StatCounter
                      target={0}
                      label="Hours of confusion"
                      isActive={activeSlide === 5}
                      variant="infinity"
                    />
                  </div>
                  <p className="text-center font-mono text-[10px] text-slate-400 pt-1 italic">
                    And this is just the beginning — taxes, TIE, and permits still ahead.
                  </p>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ── BRIDGE CHAOS CARDS ──────────────────────────────────────────────
             Live OUTSIDE sliderOpacity so they persist as pain fades out.
             From progress=0.88→1.0 they pre-gather 30% toward scanner center
             so HowItWorks fc cards pick up the motion already in progress.  */}
        {/* Bridge chaos cards appear as slide 5 enters (progress ≥ 0.80) and
             remain visible as the section exits — they scroll off naturally,
             and HowItWorks fc cards pick up from the same half-gathered positions. */}
        {progress >= 0.80 && (
          <div
            className="hidden md:block absolute inset-0 pointer-events-none"
            style={{
              opacity: interp(progress, 0.80, 0.86, 0, 1.0),
              transform: `translateY(calc(var(--doc-transition-progress, 0) * var(--viewport-height-px, 100vh)))`,
              zIndex: `calc(15 + clamp(0, var(--doc-transition-progress, 0) * 1000000, 25))` as any,
            }}
          >
            <div className="absolute left-1/2 top-1/2" style={{ "--paper-rotate": `${bc1.r}deg` } as React.CSSProperties}>
              <div style={{ transform: `translate(calc(-50% + ${bc1.x}vw), calc(-50% + ${bc1.y}vh)) rotate(${bc1.r}deg)` }}>
                <DocumentCard type="nie" status="chaos" />
              </div>
            </div>
            <div className="absolute left-1/2 top-1/2" style={{ "--paper-rotate": `${bc2.r}deg` } as React.CSSProperties}>
              <div style={{ transform: `translate(calc(-50% + ${bc2.x}vw), calc(-50% + ${bc2.y}vh)) rotate(${bc2.r}deg)` }}>
                <DocumentCard type="padron" status="chaos" />
              </div>
            </div>
            <div className="absolute left-1/2 top-1/2" style={{ "--paper-rotate": `${bc3.r}deg` } as React.CSSProperties}>
              <div style={{ transform: `translate(calc(-50% + ${bc3.x}vw), calc(-50% + ${bc3.y}vh)) rotate(${bc3.r}deg)` }}>
                <DocumentCard type="seg_social" status="chaos" />
              </div>
            </div>
            <div className="absolute left-1/2 top-1/2" style={{ "--paper-rotate": `${bc4.r}deg` } as React.CSSProperties}>
              <div style={{ transform: `translate(calc(-50% + ${bc4.x}vw), calc(-50% + ${bc4.y}vh)) rotate(${bc4.r}deg)` }}>
                <DocumentCard type="hacienda" status="chaos" />
              </div>
            </div>
            <div className="absolute left-1/2 top-1/2" style={{ "--paper-rotate": `${bc5.r}deg` } as React.CSSProperties}>
              <div style={{ transform: `translate(calc(-50% + ${bc5.x}vw), calc(-50% + ${bc5.y}vh)) rotate(${bc5.r}deg)` }}>
                <DocumentCard type="nie" status="chaos" />
              </div>
            </div>
            <div className="absolute left-1/2 top-1/2" style={{ "--paper-rotate": `${bc6.r}deg` } as React.CSSProperties}>
              <div style={{ transform: `translate(calc(-50% + ${bc6.x}vw), calc(-50% + ${bc6.y}vh)) rotate(${bc6.r}deg)` }}>
                <DocumentCard type="seg_social" status="chaos" />
              </div>
            </div>
          </div>
        )}

        {/* ── SLIDE DOTS ── */}
        {progress >= 0.18 && (
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 transition-opacity duration-300"
            style={{ opacity: sliderOpacity }}
          >
            <SlideDots total={6} active={activeSlide} />
          </div>
        )}

        {/* ── SCROLL HINT ── */}
        {progress >= 0.18 && progress < 0.92 && (
          <div
            className="absolute bottom-8 right-8 z-40 flex items-center gap-2 transition-opacity duration-500"
            style={{ opacity: interp(progress, 0.18, 0.26, 0, 0.55) }}
          >
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">scroll to continue</span>
            <Globe className="w-3 h-3 text-slate-400 animate-bounce" />
          </div>
        )}

        {/* ── HERO CTA BUTTON ── */}
        {progress < 0.13 && (
          <div
            className="absolute left-1/2 top-[80%] z-40 pointer-events-auto transition-all duration-300"
            style={{
              opacity: heroTextOpacity,
              transform: `translate(-50%, -50%) scale(${interp(progress, 0, 0.10, 1, 0.8)})`,
            }}
          >
            <a
              href="#pain"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#F8FAFC]/55 backdrop-blur-md text-[#16A34A] border border-[#16A34A]/30 hover:bg-[#16A34A] hover:text-white hover:border-[#16A34A] transition-all duration-300 font-syne font-bold text-xs tracking-wider uppercase hover:scale-105 shadow-[0_8px_32px_rgba(22,163,74,0.08)]"
            >
              Get started
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* ── SCROLL INDICATOR ── */}
        {progress < 0.08 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden md:block">
            <a href="#pain" className="flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 mb-1">Scroll</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-slate-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </a>
          </div>
        )}

        {/* ── SLIDE LABEL (top left) ── */}
        {progress >= 0.18 && (
          <div
            className="absolute top-8 left-8 z-40 transition-opacity duration-500"
            style={{ opacity: interp(progress, 0.18, 0.26, 0, 1) * sliderOpacity }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4820A] animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-400">
                {["Day 1", "What's waiting", "Getting NIE", "Empadronamiento", "Healthcare", "The real cost"][activeSlide] ?? ""}
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
