"use client";

import {
  AlertTriangle,
  CalendarX2,
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
              ? "bg-black border-black text-white"
              : "bg-zinc-100 border-zinc-400 text-black"
          }`}
        >
          {isPrereq ? <Check className="w-3 h-3 text-white" /> : num}
        </div>
        {!isLast && <div className="w-px flex-1 min-h-[14px] mt-1 bg-zinc-200" />}
      </div>
      <div className={`${isLast ? "pb-0" : "pb-3.5"} min-w-0`}>
        <div className={`text-sm font-semibold leading-snug ${isPrereq ? "text-black" : "text-zinc-800"}`}>
          {label}
        </div>
        {sublabel && (
          <div className="text-[11px] text-zinc-500 mt-0.5 leading-snug font-mono">{sublabel}</div>
        )}
        {warning && (
          <div className="mt-1.5 bg-zinc-100 border border-zinc-300 rounded-lg px-2.5 py-1.5 text-[11px] text-black flex items-start gap-1.5 leading-snug">
            <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5 text-black" />
            <span>{warning}</span>
          </div>
        )}
        {cost && (
          <span className="mt-1.5 font-mono text-[11px] text-black bg-zinc-100 border border-zinc-300 rounded px-2 py-0.5 inline-block font-semibold">
            {cost}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Stat counter (monochrome variant) ─────────────────────────────────────────────
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
      <div className="flex flex-col items-center p-4 bg-zinc-100 rounded-2xl border border-zinc-300 shadow-sm">
        <span className="font-mono text-3xl font-extrabold text-black leading-none">∞</span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-700 mt-1.5 text-center leading-snug font-bold">
          {label}
        </span>
        {sublabel && (
          <span className="font-mono text-[9px] text-zinc-500 text-center leading-snug mt-0.5">{sublabel}</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 rounded-2xl border border-zinc-300 bg-zinc-100 shadow-sm">
      <span className="font-mono text-3xl font-extrabold leading-none text-black">
        {value}{suffix}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-wider mt-1.5 text-center leading-snug text-zinc-800 font-bold">
        {label}
      </span>
      {sublabel && (
        <span className="font-mono text-[9px] text-center mt-0.5 leading-snug text-zinc-500">{sublabel}</span>
      )}
    </div>
  );
}

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

  const getDocDetails = () => {
    switch (type) {
      case "nie":
        return {
          title: "Certificado de Registro",
          subtitle: "Registro de Ciudadanos de la Unión",
          code: "EXP: NIE-2026-X83",
          sealColor: "text-black",
        };
      case "seg_social":
        return {
          title: "Seguridad Social",
          subtitle: "Resolución de Afiliación",
          code: "NUSS: 08/12345678/90",
          sealColor: "text-black",
        };
      case "padron":
        return {
          title: "Empadronamiento",
          subtitle: "Volante de Residencia Habitual",
          code: "REG: 08019-2026",
          sealColor: "text-black",
        };
      case "hacienda":
        return {
          title: "Agencia Tributaria",
          subtitle: "Modelo 303 - IVA Autoliquidación",
          code: "HAC: 2026-VAT-901",
          sealColor: "text-black",
        };
    }
  };

  const details = getDocDetails();

  const badgeStyles = {
    done: "text-white bg-black border-black",
    progress: "text-zinc-900 bg-zinc-100 border-zinc-300 font-bold",
    pending: "text-zinc-500 bg-zinc-50 border-zinc-200",
  }[badgeType];

  return (
    <div className={`relative w-72 min-h-[340px] p-6 pb-4 rounded-3xl border-2 border-zinc-200 bg-white ${shadow} flex flex-col justify-between font-sans select-none overflow-hidden text-black text-left transition-all duration-300`}>
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
            <div className="w-8 h-8 rounded-md flex items-center justify-center border border-zinc-200 bg-zinc-50 flex-shrink-0">
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
        <hr className="my-2.5 border-dashed border-zinc-200" />

        {/* Overview text */}
        <p className="text-[10px] text-zinc-500 leading-normal mb-3">
          {overview}
        </p>

        {/* Tasks */}
        <div className="flex flex-col gap-2">
          {tasks.map((t, idx) => (
            <div key={idx} className="flex items-start gap-2.5 min-w-0">
              {t.done ? (
                <div className="w-4 h-4 rounded-full bg-black border border-black flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
              ) : t.active ? (
                <div className="w-4 h-4 rounded-full bg-zinc-100 border border-zinc-400 flex items-center justify-center text-black flex-shrink-0 mt-0.5 relative">
                  <Clock className="w-2.5 h-2.5 text-black" />
                </div>
              ) : (
                <div className="w-4 h-4 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-300 flex-shrink-0 mt-0.5">
                  <div className="w-1 h-1 rounded-full bg-zinc-300" />
                </div>
              )}
              <span className={`text-[10.5px] leading-tight min-w-0 break-words ${
                t.done ? "text-zinc-400 line-through decoration-zinc-300" : "text-black font-medium"
              }`}>
                {t.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Progress Bar */}
      <div className="relative z-10 pt-2 mt-2 border-t border-dashed border-zinc-200">
        <div className="flex justify-between text-[8px] opacity-60 font-mono mb-1">
          <span>Action Progress</span>
          <span>{doneCount} / {totalCount} Done ({progressPercent}%)</span>
        </div>
        <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-700 ${
              badgeType === "done" ? "bg-black" : badgeType === "progress" ? "bg-zinc-800" : "bg-zinc-300"
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
    nie: <FileText className="w-3 h-3 text-black" />,
    seg_social: <Layers className="w-3 h-3 text-black" />,
    padron: <MapPin className="w-3 h-3 text-black" />,
    hacienda: <CreditCard className="w-3 h-3 text-black" />,
  };

  const bgMap = {
    nie: "bg-zinc-100 border-zinc-200",
    seg_social: "bg-zinc-100 border-zinc-200",
    padron: "bg-zinc-100 border-zinc-200",
    hacienda: "bg-zinc-100 border-zinc-200",
  };

  return (
    <div className="w-full h-full bg-[#FFFFFF] flex flex-col font-sans select-none overflow-hidden justify-between relative">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Status Bar */}
        <div className="px-5 pt-3 pb-1 flex justify-between items-center text-[8.5px] font-mono text-zinc-400 select-none bg-white">
          <span className="font-semibold text-black">9:41</span>
          <div className="flex items-center gap-1.5">
            <svg className="w-2.5 h-2.5 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L17.61 5.03C16.07 3.8 14.12 3 12 3zm0 18c4.97 0 9-4.03 9-9 0-2.12-.74-4.07-1.97-5.61L6.39 18.97C7.93 20.2 9.88 21 12 21z" />
            </svg>
            <svg className="w-2.5 h-2.5 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21l-12-18h24z" />
            </svg>
            <div className="w-3.5 h-1.5 rounded-[2px] border border-zinc-400 flex items-center p-[1px]">
              <div className="w-full h-full bg-black rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* App header */}
        <div className="px-5 pt-2 pb-3 bg-white border-b border-zinc-100 relative z-10 flex items-center justify-between">
          <span className="font-syne font-extrabold text-base tracking-tight text-black">
            <span className="text-black font-black">p.</span>aprs
          </span>
          <div className="relative w-7 h-7 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-[10px] font-bold font-mono text-black shadow-sm">
            JD
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-black border-2 border-white" />
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
                    isActive ? "border-black shadow-md scale-[1.01]" : "border-zinc-200 shadow-sm"
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
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-extrabold font-syne leading-tight text-black whitespace-normal break-words">{d.title}</p>
                        <p className="text-[7.5px] font-mono text-zinc-400 mt-0 truncate">{d.subtitle}</p>
                      </div>
                    </div>
                    <span className={`flex items-center gap-0.5 text-[6.5px] font-mono border px-1 py-0.5 rounded-[4px] font-bold uppercase tracking-wider whitespace-nowrap flex-shrink-0 ${badgeStyles[d.badgeType]}`}>
                      {d.badgeText}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1 bg-zinc-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ease-out rounded-full ${
                          d.badgeType === "done" ? "bg-black" : d.badgeType === "progress" ? "bg-zinc-800" : "bg-zinc-300"
                        }`}
                        style={{
                          width: `${mounted ? pct : 0}%`,
                          transitionProperty: "width",
                          transitionDuration: "900ms",
                          transitionDelay: `${100 + i * 60}ms`,
                        }}
                      />
                    </div>
                    <span className="text-[7.5px] font-mono text-zinc-400 flex-shrink-0 font-bold tabular-nums">{d.doneCount}/{d.totalCount}</span>
                    <ChevronRight className="w-2.5 h-2.5 text-zinc-400 flex-shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Bottom Nav Bars */}
      <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center gap-2.5 z-20">
        <div className="bg-white border border-zinc-200 px-6 py-3 flex-1 flex justify-between items-center rounded-2xl shadow-lg">
          <div className="text-black cursor-pointer font-bold">
            <Home className="w-[18px] h-[18px]" />
          </div>
          <div className="text-zinc-400 hover:text-black cursor-pointer transition-colors">
            <Layers className="w-[18px] h-[18px]" />
          </div>
          <div className="text-zinc-400 hover:text-black cursor-pointer transition-colors">
            <FileText className="w-[18px] h-[18px]" />
          </div>
        </div>
        <div className="bg-white border border-zinc-200 p-3 flex items-center justify-center rounded-2xl shadow-lg cursor-pointer text-zinc-400 hover:text-black transition-colors">
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
    <div className="w-full h-full bg-[#FFFFFF] flex flex-col font-sans select-none justify-between overflow-hidden relative">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Status Bar */}
        <div className="px-5 pt-3 pb-1 flex justify-between items-center text-[8.5px] font-mono text-zinc-400 select-none bg-white">
          <span className="font-semibold text-black">9:41</span>
          <div className="flex items-center gap-1.5">
            <svg className="w-2.5 h-2.5 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L17.61 5.03C16.07 3.8 14.12 3 12 3zm0 18c4.97 0 9-4.03 9-9 0-2.12-.74-4.07-1.97-5.61L6.39 18.97C7.93 20.2 9.88 21 12 21z" />
            </svg>
            <svg className="w-2.5 h-2.5 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21l-12-18h24z" />
            </svg>
            <div className="w-3.5 h-1.5 rounded-[2px] border border-zinc-400 flex items-center p-[1px]">
              <div className="w-full h-full bg-black rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Brand/Back Nav Header */}
        <div className="px-4 py-2.5 bg-white border-b border-zinc-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4 text-zinc-700 cursor-pointer hover:text-black transition-colors" />
            <span className="font-syne font-extrabold text-[10.5px] text-black tracking-tight leading-none">NIE Certificate</span>
          </div>
          <div className="relative w-[22px] h-[22px] flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 20 20">
              <circle
                cx="10"
                cy="10"
                r="7.5"
                className="stroke-zinc-200"
                strokeWidth="2.5"
                fill="transparent"
              />
              <circle
                cx="10"
                cy="10"
                r="7.5"
                className="stroke-black"
                strokeWidth="2.5"
                fill="transparent"
                strokeDasharray="47.12"
                strokeDashoffset="23.56"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-[6px] font-mono font-extrabold text-black tabular-nums">
              50%
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-none p-4 pb-4 flex flex-col gap-3">
          {/* Header Overview Card */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-syne font-extrabold text-[12.5px] text-black leading-tight">
                Foreigner Identity &amp; Tax Number
              </h3>
              <span className="text-[7.5px] px-1.5 py-0.5 rounded-md bg-zinc-100 text-black border border-zinc-300 uppercase font-bold shrink-0">
                In Progress
              </span>
            </div>
            <p className="text-[9.5px] text-zinc-500 leading-relaxed">
              Essential for work contracts, bank accounts, SIM cards, and renting.
            </p>
          </div>

          {/* Checklist timeline */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm flex flex-col gap-4 relative">
            {/* Timeline Connector Line */}
            <div className="absolute left-[24px] top-6 bottom-6 w-0.5 bg-zinc-200 z-0"></div>

            {tasks.map((t, i) => (
              <div key={i} className="flex items-start gap-3.5 relative z-10">
                {t.status === "done" ? (
                  <div className="w-5 h-5 rounded-full bg-black border border-black flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                ) : t.status === "active" ? (
                  <div className="w-5 h-5 rounded-full bg-zinc-200 border border-zinc-400 flex items-center justify-center text-black flex-shrink-0 shadow-sm relative">
                    <Clock className="w-3 h-3 text-black" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-zinc-50 border border-zinc-300 flex items-center justify-center flex-shrink-0 text-zinc-400 shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0 mt-0.5">
                  <p className={`text-[10px] font-bold leading-tight ${t.status === "done" ? "text-zinc-400 line-through decoration-zinc-300" : "text-black"}`}>
                    {t.title}
                  </p>
                  <p className="text-[8.5px] text-zinc-500 leading-snug mt-0.5">{t.sublabel}</p>
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
            i === active ? "w-5 h-1.5 bg-black" : "w-1.5 h-1.5 bg-zinc-300"
          }`}
        />
      ))}
    </div>
  );
}

// ─── Route discovery map ─────────────────────────────────────────────────────
const PROCEDURES = [
  { name: "Right to stay", hint: "EU or non-EU · under or over 3 months" },
  { name: "Correct document", hint: "NIE number · CUE certificate · TIE card" },
  { name: "Proof of situation", hint: "Work · study · resources · family" },
  { name: "Local registration", hint: "Padrón rules depend on city and home" },
  { name: "Access to services", hint: "Social Security · healthcare · Cl@ve" },
];

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

  const leftWidth = interp(progress, 0.05, 0.18, 50, 100);
  const rightWidth = interp(progress, 0.05, 0.18, 50, 0);
  const heroTextOpacity = interp(progress, 0, 0.10, 1, 0);
  const rightCardsX = interp(progress, 0, 0.15, 0, 120);

  const bgR = Math.round(interp(progress, 0.05, 0.18, 255, 255));
  const bgG = Math.round(interp(progress, 0.05, 0.18, 255, 255));
  const bgB = Math.round(interp(progress, 0.05, 0.18, 255, 255));
  const leftBgColor = `rgb(${bgR},${bgG},${bgB})`;

  const d1 = { x: interp(progress, 0, 0.18, -24, 18), y: interp(progress, 0, 0.18, -26, -6),  r: interp(progress, 0, 0.18, -15, -4) };
  const d2 = { x: interp(progress, 0, 0.18, -12, 22), y: interp(progress, 0, 0.18,  26,  6),  r: interp(progress, 0, 0.18,  20,  8) };
  const d3 = { x: interp(progress, 0, 0.18, -32, 20), y: interp(progress, 0, 0.18,  12,  2),  r: interp(progress, 0, 0.18, -25, -8) };
  const d4 = { x: interp(progress, 0, 0.18, -16, 24), y: interp(progress, 0, 0.18, -24, -2),  r: interp(progress, 0, 0.18,  18,  4) };

  const SW = 100 / 6;

  const getStickyTranslate = (p: number): number => {
    if (p < 0.28) return 0;
    if (p < 0.31) return interp(p, 0.28, 0.31, 0, SW);
    if (p < 0.41) return SW;
    if (p < 0.44) return interp(p, 0.41, 0.44, SW, SW * 2);
    if (p < 0.54) return SW * 2;
    if (p < 0.57) return interp(p, 0.54, 0.57, SW * 2, SW * 3);
    if (p < 0.67) return SW * 3;
    if (p < 0.70) return interp(p, 0.67, 0.70, SW * 3, SW * 4);
    if (p < 0.80) return SW * 4;
    if (p < 0.83) return interp(p, 0.80, 0.83, SW * 4, SW * 5);
    return SW * 5;
  };

  const translatePercent = progress >= 0.18 ? getStickyTranslate(progress) : 0;
  const activeSlide = Math.round((translatePercent / SW));
  const sliderOpacity = interp(progress, 0.97, 1.0, 1, 0);

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
          opacity: `calc(1 - clamp(0, (var(--doc-transition-progress, 0) - 0.1) * 1.25, 1))`,
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
              className="absolute right-0 top-0 h-full bg-[#FFFFFF] transition-all duration-100 z-0"
              style={{ width: `${rightWidth}%` }}
            />
          </>
        )}

        {/* ── HERO (progress < 0.18) ── */}
        {progress < 0.18 && (
          <>
            {/* Vertical dividing line between Problem (left) and Solution (right) on desktop, horizontal on mobile */}
            <div
              className="absolute inset-0 z-30 pointer-events-none"
              style={{ opacity: heroTextOpacity }}
            >
              {/* Desktop Vertical Line (Centered with top & bottom gradient fade) */}
              <div 
                className="hidden md:block absolute left-1/2 -translate-x-1/2 top-24 bottom-24 w-[1.5px] bg-gradient-to-b from-transparent via-black/25 to-transparent"
              />

              {/* Mobile Horizontal Line (Centered with left & right gradient fade) */}
              <div 
                className="md:hidden absolute inset-x-8 top-1/2 -translate-y-1/2 h-[1.5px] bg-gradient-to-r from-transparent via-black/25 to-transparent"
              />
            </div>

            <div
              className="absolute inset-0 flex flex-col md:flex-row z-30 pointer-events-none"
              style={{ opacity: heroTextOpacity }}
            >
              <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-between p-8 md:p-16">
                <span className="font-mono text-sm font-extrabold tracking-[0.2em] text-black uppercase">WITHOUT PAPRS</span>
                <div className="max-w-md pt-4">
                  <h1 className="text-3xl md:text-5xl lg:text-[3.45rem] font-extrabold tracking-tight font-syne leading-[0.92] mb-4 text-black">
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
                  <p className="font-sans text-xs md:text-sm text-zinc-600 leading-relaxed">
                    The answer changes with your passport, job, family, address, and length of stay. Every official page solves one piece. You have to connect them.
                  </p>
                </div>
                <div className="h-4" />
              </div>

              <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-between p-8 md:p-16">
                <span className="font-mono text-sm font-extrabold tracking-[0.2em] text-black uppercase self-end text-right">WITH PAPRS</span>
                <div className="max-w-md pt-4">
                  <h1 className="text-3xl md:text-5xl lg:text-[3.45rem] font-extrabold tracking-tight font-syne leading-[0.92] mb-4 text-black">
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
                  <p className="font-sans text-xs md:text-sm text-zinc-600 leading-relaxed">
                    Paprs identifies your route, checks the dependencies, and turns scattered official requirements into one clear sequence.
                  </p>
                </div>
                <div className="h-4" />
              </div>
            </div>

            {/* Chaos cards */}
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

            {/* Clean right-side device mockups */}
            <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center md:justify-end md:pr-4 lg:pr-8 xl:pr-12 overflow-hidden">
              <div
                className="relative w-[460px] h-[520px] transition-all duration-100 scale-90 md:scale-95 lg:scale-105"
                style={{ transform: `translateX(${rightCardsX}%)`, opacity: 1, perspective: "1400px" }}
              >
                <div className="absolute left-1/2 top-1/2 z-0" style={{ transform: "translate(calc(-50% - 180px), calc(-50% + 36px)) rotateY(-24deg) rotateX(2deg)" }}>
                  <AndroidMockup
                    screenWidth={208}
                    noRoundedScreen
                    frameColor="#000000"
                    statusbarColor="#FFFFFF"
                    navBarColor="#FFFFFF"
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
                    frameColor="#000000"
                    statusbarColor="#FFFFFF"
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

              {/* SLIDE 0 */}
              <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none relative overflow-hidden">
                <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between relative">
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

                  <div className="w-full md:w-1/2 flex flex-col justify-center gap-5 relative z-[2]">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-black font-extrabold">Monday · 08:43</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black leading-[1.05] font-syne">
                      The move is done.
                      <br />
                      <span className="text-zinc-500 font-normal text-2xl md:text-3xl">The admin is just starting.</span>
                    </h2>
                    <p className="text-sm text-zinc-600 leading-relaxed max-w-sm">
                      Your employer asks for a Social Security number. The bank asks for proof of address. The city asks how you occupy the home. Each request assumes another document already exists.
                    </p>
                    <div className="flex items-start gap-2.5 bg-zinc-100 border border-zinc-300 rounded-xl px-3.5 py-3 max-w-sm">
                      <AlertTriangle className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-black leading-snug font-mono font-medium">
                        One ordinary question becomes five searches: “Which document do I need first?”
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:block w-1/2 h-full" />
                </div>
              </div>

              {/* SLIDE 1 — What's waiting */}
              <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none relative overflow-hidden">
                <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between relative">
                  <div className="w-full md:w-5/12 flex flex-col justify-center gap-4 pr-4 relative z-[2]">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-black font-extrabold">Search 1 · Find your route</span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-black leading-tight font-syne">
                      Before the form,
                      <br />decode your status.
                      <br />
                      <span className="text-zinc-500 font-sans font-normal text-lg md:text-xl">There is no universal checklist.</span>
                    </h2>
                    <p className="text-sm text-zinc-600 leading-relaxed max-w-xs">
                      EU or non-EU. Worker, student, self-employed, or family member. Under or over three months. Every answer changes the route and the proof required.
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 rounded-full bg-black" />
                      <span className="font-mono text-xs text-zinc-600 font-medium">Same move. Different form. Different evidence.</span>
                    </div>
                  </div>

                  <div className="hidden md:flex w-6/12 flex-col justify-center relative z-[3]">
                    <div className="bg-white rounded-2xl border border-zinc-200 shadow-md p-5">
                      {PROCEDURES.map((proc, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div className="w-7 h-7 rounded-full border-2 border-zinc-400 bg-zinc-100 flex items-center justify-center text-black font-bold font-mono text-xs">?</div>
                            {i < PROCEDURES.length - 1 && <div className="w-px h-6 bg-zinc-200 my-0.5" />}
                          </div>
                          <div className={`${i < PROCEDURES.length - 1 ? "pb-1" : ""}`}>
                            <div className="text-sm font-semibold text-black leading-tight">{proc.name}</div>
                            <div className="text-[11px] text-zinc-500 font-mono">{proc.hint}</div>
                          </div>
                        </div>
                      ))}
                      <div className="pt-3 border-t border-zinc-200 mt-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-black flex-shrink-0" />
                          <span className="text-[11px] text-black font-mono font-bold">Choose the route before choosing the form</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SLIDE 2 — Appointment gate */}
              <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
                <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between relative">
                  <div className="w-full md:w-5/12 flex flex-col justify-center gap-4 pr-4">
                    <div className="flex items-center gap-2">
                      <CalendarX2 className="w-4 h-4 text-black" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-black font-extrabold">Search 2 · Cita previa</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-black leading-tight font-syne">
                      The appointment
                      <br />is the first gate.
                      <span className="block text-zinc-500 font-sans text-base font-normal mt-1">Before anyone checks a single document.</span>
                    </h2>
                    <p className="text-sm text-zinc-600 leading-relaxed max-w-xs">
                      The portal asks for province, office, and an exact procedure name. Pick the wrong one and the available slot may be useless. Pick the right one and there may be no slot at all.
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="bg-zinc-100 border border-zinc-300 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-black" />
                        <span className="font-mono text-xs text-black font-bold">Status: no slots</span>
                      </div>
                      <div className="bg-zinc-100 border border-zinc-300 rounded-lg px-3 py-1.5">
                        <span className="font-mono text-xs text-black font-semibold">Alternative: 060</span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block w-6/12">
                    <div className="bg-white rounded-2xl border border-zinc-200 shadow-md p-5">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-4 font-bold">What the booking loop feels like</div>
                      <PainStep num={1} label="Find the official appointment portal" sublabel="Different administrations use different booking systems" />
                      <PainStep num={2} label="Choose province, office, and procedure" sublabel="The labels must match the document you are requesting" />
                      <PainStep num={3} label="Submit your details" sublabel="Passport or NIE · name · contact information" />
                      <PainStep num={4} label="“No hay citas disponibles en este momento”" warning="The official help page directs you to 060 or the responsible office for non-technical questions. It cannot create an available slot." />
                      <PainStep num={5} label="Return, retry, and keep the confirmation" sublabel="The booking reference is needed to identify and manage the appointment" isLast />
                    </div>
                  </div>
                </div>
              </div>

              {/* SLIDE 3 — Forms and evidence */}
              <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
                <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between relative">
                  <div className="w-full md:w-5/12 flex flex-col justify-center gap-4 pr-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-black" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-black font-extrabold">Search 3 · Forms and proof</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-black leading-tight font-syne">
                      NIE, CUE, TIE.
                      <span className="block text-zinc-500 font-sans text-base font-normal mt-1">Similar language. Different legal documents.</span>
                    </h2>
                    <p className="text-sm text-zinc-600 leading-relaxed max-w-xs">
                      EX-15 requests a NIE or certificate. EU residence registration uses EX-18. A non-EU family member uses EX-19. The 790-012 fee must also match the selected procedure.
                    </p>
                    <div className="space-y-1.5 mt-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-bold">Easy to confuse:</div>
                      {["EX-15 · NIE", "EX-18 · EU registration", "EX-19 · EU family"].map((dep) => (
                        <div key={dep} className="inline-flex items-center gap-1 bg-zinc-100 border border-zinc-200 rounded-full px-2.5 py-0.5 text-[11px] font-mono text-black mr-1.5 mb-1 font-semibold">
                          <div className="w-1.5 h-1.5 rounded-full bg-black" />{dep}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="hidden md:block w-6/12">
                    <div className="bg-white rounded-2xl border border-zinc-200 shadow-md p-5">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-4 font-bold">The checklist behind one appointment</div>
                      <PainStep num={1} label="Confirm the procedure — not just the acronym" sublabel="A NIE number, residence certificate, and residence card are not interchangeable" />
                      <PainStep num={2} label="Download the matching official form" sublabel="EX-15 · EX-18 · EX-19 — depending on the route" />
                      <PainStep num={3} label="Prove why you qualify" sublabel="Employment · self-employment · study · resources and insurance · family relationship" />
                      <PainStep num={4} label="Generate and pay the correct 790-012 fee" cost="The payment receipt is part of the evidence" />
                      <PainStep num={5} label="Check identity, dates, signatures, and supporting records" warning="A correctly completed form for the wrong procedure is still the wrong application." isLast />
                    </div>
                  </div>
                </div>
              </div>

              {/* SLIDE 4 — Local rules */}
              <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
                <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between relative">
                  <div className="w-full md:w-5/12 flex flex-col justify-center gap-4 pr-4">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-black" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-black font-extrabold">Search 4 · Padrón municipal</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-black leading-tight font-syne">
                      Your address is real.
                      <br />Now prove it their way.
                      <span className="block text-zinc-500 font-sans text-base font-normal mt-1">The checklist changes with your housing situation.</span>
                    </h2>
                    <p className="text-sm text-zinc-600 leading-relaxed max-w-xs">
                      A lease in your name may be enough. Living with a partner, flatmate, relative, or in student housing can add authorisations, identity copies, payment receipts, or other proof.
                    </p>
                    <div className="bg-zinc-100 border border-zinc-300 rounded-xl p-3 mt-1 flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-black flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-black leading-snug font-mono">
                        The form can be complete while the evidence is still incomplete.
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:block w-6/12">
                    <div className="bg-white rounded-2xl border border-zinc-200 shadow-md p-5">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-4 font-bold">A realistic flat-share case</div>
                      <PainStep num={1} label="Find the city&apos;s own padrón procedure" sublabel="National guidance cannot replace the municipal checklist" />
                      <PainStep num={2} label="Book the municipal appointment" sublabel="A separate portal from immigration or Social Security" />
                      <PainStep num={3} label="Show identity and right to use the home" sublabel="Passport or ID · lease, title, or accepted housing evidence" />
                      <PainStep num={4} label="The lease is in your flatmate&apos;s name" warning="The city may require their signed authorisation and a copy of their identity document." />
                      <PainStep num={5} label="Get the missing signature and return" sublabel="One small dependency creates another message, another document, and another attempt" isLast />
                    </div>
                  </div>
                </div>
              </div>

              {/* SLIDE 5 — The real cost */}
              <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none relative overflow-hidden">
                <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between relative">
                  <div className="w-full md:w-5/12 flex flex-col justify-center gap-4 p-6 md:p-8 rounded-3xl border border-zinc-300 bg-white/90 backdrop-blur-md shadow-xl relative z-30 select-text">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-black" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-black font-extrabold">The hidden workload</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-black leading-tight font-syne">
                      The hard part is not one form.
                    </h2>
                    <p className="text-sm text-zinc-600 leading-relaxed max-w-xs">
                      It is stitching together EU guidance, national immigration rules, police forms, a municipal checklist, Social Security, and appointment systems that do not share one journey.
                    </p>
                    <div className="flex flex-col gap-2.5 mt-1">
                      <div className="flex items-center gap-2 text-xs text-zinc-700 font-mono font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                        The same identity details entered again and again
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-700 font-mono font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                        Similar acronyms hiding different procedures
                      </div>
                      <div className="flex items-center gap-2 text-xs text-black font-mono font-bold">
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                        One unavailable slot can pause the entire chain
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex w-6/12 flex-col gap-2.5 relative z-10">
                    <div className="grid grid-cols-2 gap-2.5">
                      <StatCounter
                        target={6}
                        label="Official systems"
                        sublabel="EU · state · police · city · Social Security · health"
                        isActive={activeSlide === 5}
                      />
                      <StatCounter
                        target={3}
                        label="Similar forms"
                        sublabel="EX-15 · EX-18 · EX-19"
                        isActive={activeSlide === 5}
                      />
                      <StatCounter
                        target={2}
                        label="Booking portals"
                        sublabel="immigration and municipal"
                        isActive={activeSlide === 5}
                      />
                      <StatCounter
                        target={1}
                        label="Missing signature"
                        sublabel="enough to stop the visit"
                      isActive={activeSlide === 5}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <StatCounter
                      target={5}
                      label="Repeated details"
                      sublabel="name · ID · address · phone · email"
                      isActive={activeSlide === 5}
                    />
                    <StatCounter
                      target={0}
                      label="Open browser tabs"
                      isActive={activeSlide === 5}
                      variant="infinity"
                    />
                  </div>
                  <p className="text-center font-mono text-[10px] text-zinc-500 pt-1 italic font-medium">
                    No single step is impossible. The handoffs are the problem.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

        {/* ── BRIDGE CHAOS CARDS ── */}
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
            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold">scroll to continue</span>
            <Globe className="w-3 h-3 text-black animate-bounce" />
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
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-black text-white border border-black hover:bg-zinc-800 transition-all duration-300 font-syne font-bold text-xs tracking-wider uppercase hover:scale-105 shadow-xl"
            >
              Get started
              <ChevronRight className="w-4 h-4 text-white" />
            </a>
          </div>
        )}

        {/* ── SCROLL INDICATOR ── */}
        {progress < 0.08 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden md:block">
            <a href="#pain" className="flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-600 mb-1 font-bold">Scroll</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </a>
          </div>
        )}

        {/* ── SLIDE LABEL (top left) ── */}
        {progress >= 0.18 && (
          <div
            className="absolute top-8 left-0 right-0 z-40 pointer-events-none transition-opacity duration-500 flex justify-center"
            style={{ opacity: interp(progress, 0.18, 0.26, 0, 1) * sliderOpacity }}
          >
            <div className="max-w-[1440px] w-full px-6 md:px-12 lg:px-20">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-600 font-bold">
                  {["The first request", "Find your route", "Find an appointment", "Choose the right form", "Prove your address", "The hidden workload"][activeSlide] ?? ""}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
