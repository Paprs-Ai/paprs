"use client";

import React from "react";
import { Check, ChevronRight, Clock, CreditCard, FileText, Layers, Lightbulb, Lock, MapPin, Sparkles, Upload, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// Overview page preview for the How it works browser: key metrics, one urgent
// action, a short action-plan list, a Paprs suggestion and the command bar.
export function OverviewDashboardView({
  urgentOpacity = 1,
  suggestionOpacity = 1,
}: {
  urgentOpacity?: number;
  suggestionOpacity?: number;
}) {
  const { dict } = useLanguage();
  const h = dict.howItWorks;

  const plans = [
    { title: "NIE Certificate", note: "Present EX-15 in person", pct: 50, icon: <FileText className="w-2.5 h-2.5 text-black" /> },
    { title: "Social Security (NUSS)", note: "Ready to submit", pct: 50, icon: <Layers className="w-2.5 h-2.5 text-black" /> },
    { title: "Empadronamiento", note: h.waitingOnCityOffice, pct: 100, icon: <MapPin className="w-2.5 h-2.5 text-black" /> },
    { title: "Modelo 030 / Tax ID", note: "Queued", pct: 0, icon: <CreditCard className="w-2.5 h-2.5 text-black" /> },
    { title: "Certificado Digital", note: "Queued", pct: 0, icon: <Lock className="w-2.5 h-2.5 text-black" /> },
  ];

  const suggestions = ["Review your tax residency", "Check your NIE expiry date", "Confirm your padrón address"];
  const reusableDocs = [
    { name: "Passport", uploaded: true },
    { name: "NIE", uploaded: false },
    { name: "Housing contract", uploaded: false },
  ];

  return (
    <div className="flex h-full w-full flex-col gap-2.5 overflow-hidden bg-zinc-50/40 p-3 select-none">
      {/* Metrics */}
      <div className="grid shrink-0 grid-cols-3 gap-1.5">
        <div className="flex items-center gap-1.5 rounded-xl border border-zinc-200/80 bg-white p-1.5 shadow-2xs">
          <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" className="stroke-zinc-200" strokeWidth="2.5" fill="transparent" />
              <circle cx="12" cy="12" r="9" className="stroke-black" strokeWidth="2.5" fill="transparent" strokeDasharray="56.54" strokeDashoffset="11.3" strokeLinecap="round" />
            </svg>
            <span className="absolute font-mono text-[6px] font-bold text-black">80%</span>
          </div>
          <div className="min-w-0">
            <span className="block font-mono text-[6px] font-bold uppercase leading-none text-zinc-400">{h.healthMetric}</span>
            <p className="mt-0.5 truncate font-syne text-[8.5px] font-extrabold leading-tight text-black">{h.active}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl border border-zinc-200/80 bg-white p-1.5 shadow-2xs">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border border-zinc-200/60 bg-zinc-100">
            <FileText className="h-2.5 w-2.5 text-black" />
          </div>
          <div className="min-w-0">
            <span className="block font-mono text-[6px] font-bold uppercase leading-none text-zinc-400">{h.docsMetric}</span>
            <p className="mt-0.5 truncate font-syne text-[8.5px] font-extrabold leading-tight text-black">4 of 5</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl border border-zinc-200/80 bg-white p-1.5 shadow-2xs">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border border-zinc-200/60 bg-zinc-100">
            <Clock className="h-2.5 w-2.5 text-black" />
          </div>
          <div className="min-w-0">
            <span className="block font-mono text-[6px] font-bold uppercase leading-none text-zinc-400">{h.targetMetric}</span>
            <p className="mt-0.5 truncate font-syne text-[8.5px] font-extrabold leading-tight text-black">in 52d</p>
          </div>
        </div>
      </div>

      {/* Urgent action */}
      <div
        className="shrink-0 rounded-xl border border-black bg-white p-2.5 shadow-xs transition-all duration-300"
        style={{ opacity: urgentOpacity, transform: `translateY(${(1 - urgentOpacity) * 8}px)` }}
      >
        <div className="mb-1 flex items-center justify-between">
          <span className="flex items-center gap-1 font-mono text-[7px] font-extrabold uppercase tracking-wider text-black">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-black" />
            {h.urgentActionAlert}
          </span>
          <span className="rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 font-mono text-[6px] font-bold text-black">
            {h.daysLeft}
          </span>
        </div>
        <h6 className="font-syne text-[8.5px] font-extrabold leading-tight text-black">{h.studentRenewal}</h6>
        <p className="mt-0.5 font-mono text-[6.5px] leading-snug text-zinc-500">{h.urgentRenewalDesc}</p>
        <div className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg border border-black bg-white py-1.5 font-mono text-[7px] font-bold uppercase tracking-wider text-black">
          {h.reviewPreparedAction} <ChevronRight className="h-2.5 w-2.5" />
        </div>
      </div>

      {/* Action plans + suggestion */}
      <div className="grid min-h-0 flex-1 grid-cols-12 gap-2">
        <div className="col-span-7 flex flex-col gap-1.5">
          <div className="flex items-center justify-between px-0.5">
            <span className="font-mono text-[7px] font-bold uppercase tracking-wider text-zinc-400">Action Plans</span>
            <span className="font-mono text-[7px] text-zinc-400">View all</span>
          </div>
          {plans.map((p) => (
            <div key={p.title} className="flex items-center gap-2 rounded-xl border border-zinc-200/80 bg-white px-2 py-1.5 shadow-2xs">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100">{p.icon}</div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-syne text-[8.5px] font-extrabold leading-tight text-black">{p.title}</p>
                <p className="truncate font-mono text-[6.5px] text-zinc-500">{p.note}</p>
              </div>
              <span className="shrink-0 font-mono text-[6.5px] font-bold text-black">{p.pct}%</span>
            </div>
          ))}
        </div>

        <div
          className="col-span-5 flex flex-col gap-1.5 transition-all duration-300"
          style={{ opacity: suggestionOpacity, transform: `translateX(${(1 - suggestionOpacity) * 16}px)` }}
        >
          <span className="flex items-center gap-1 px-0.5 font-mono text-[7px] font-bold uppercase tracking-wider text-black">
            <Lightbulb className="h-2.5 w-2.5" /> Suggested
          </span>
          <div className="flex flex-col divide-y divide-zinc-100 rounded-xl border border-zinc-200/80 bg-white px-2 shadow-2xs">
            {suggestions.map((t) => (
              <div key={t} className="flex items-center justify-between gap-1.5 py-1.5">
                <span className="truncate font-mono text-[6.5px] font-medium text-black">{t}</span>
                <X className="h-2.5 w-2.5 shrink-0 text-zinc-400" />
              </div>
            ))}
          </div>

          <span className="mt-0.5 px-0.5 font-mono text-[7px] font-bold uppercase tracking-wider text-zinc-400">Upload once, reuse always</span>
          <div className="flex flex-col divide-y divide-zinc-100 rounded-xl border border-zinc-200/80 bg-white px-2 shadow-2xs">
            {reusableDocs.map((d) => (
              <div key={d.name} className="flex items-center justify-between gap-1 py-1.5">
                <span className="flex min-w-0 items-center gap-1 font-mono text-[6.5px] font-medium text-black">
                  <FileText className="h-2.5 w-2.5 shrink-0" />
                  <span className="truncate">{d.name}</span>
                </span>
                {d.uploaded ? (
                  <span className="flex shrink-0 items-center gap-0.5 rounded border border-black bg-black px-1 py-px font-mono text-[6px] font-bold uppercase text-white">
                    <Check className="h-1.5 w-1.5" /> {h.verified}
                  </span>
                ) : (
                  <span className="flex shrink-0 items-center gap-0.5 rounded border border-black bg-white px-1 py-px font-mono text-[6px] font-bold uppercase text-black">
                    <Upload className="h-1.5 w-1.5" /> Upload
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Command bar */}
      <div className="flex shrink-0 items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 shadow-2xs">
        <div className="flex min-w-0 flex-1 items-center gap-2 text-zinc-400">
          <Sparkles className="h-3 w-3 shrink-0 text-black" />
          <span className="truncate font-mono text-[7px] text-zinc-500">Ask Paprs anything or drop official PDFs to auto-index...</span>
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[6.5px] text-zinc-500">
          <span>⌘K</span>
        </div>
      </div>
    </div>
  );
}
