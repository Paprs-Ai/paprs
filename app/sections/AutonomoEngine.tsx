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

const AUTONOMO_SLIDES = [
  {
    id: 0,
    tag: "Autónomo 01 · Tax Returns",
    title: "Official Spanish Tax Model Engine",
    subtitle: "Consolidates and prepares your quarterly filings (Modelo 130, 303, 115, 390) automatically without gestor delays.",
    highlight: "Compliant with Spanish Agencia Tributaria guidelines",
    details: [
      "Modelo 130: 20% advance tax calculated directly from net profit",
      "Modelo 303: 21% IVA balancing with automatic expense offset",
      "Modelo 390: Annual IVA recap reconciled from your document vault",
    ],
    type: "models"
  },
  {
    id: 1,
    tag: "Autónomo 02 · Tax Deductions",
    title: "AI Deductible Expense Scanner",
    subtitle: "Scans every utility bill, receipt, and invoice to extract every legally permitted tax deduction under Spanish law.",
    highlight: "+€2,840.50 average net tax savings identified per year",
    details: [
      "30% proportional write-off on home office water, gas & electricity",
      "100% full business deduction on software tools & SaaS subscriptions",
      "Direct VAT & IRPF recovery on client travel and business meals",
    ],
    type: "deductions"
  },
  {
    id: 2,
    tag: "Autónomo 03 · Freelance Invoicing",
    title: "Multi-Client Invoicing & Withholdings",
    subtitle: "Issue compliant Spanish invoices (Facturas Rectificativas & Simplificadas) with automatic IRPF withholding calculations.",
    highlight: "Auto-calculates IRPF 7% or 15% withholdings for local & global clients",
    details: [
      "Automatic tax withholding calculations based on your registration year",
      "Multi-currency support for digital nomads & remote international clients",
      "Direct reconciliation into your quarterly tax return models",
    ],
    type: "invoicing"
  },
  {
    id: 3,
    tag: "Autónomo 04 · Specialized Intelligence",
    title: "Spanish Bureaucracy AI Specialist",
    subtitle: "Internal AI model trained on Royal Decrees, BOE publications, and local hacienda regulations.",
    highlight: "Outperforms traditional gestor consultants in speed and precision",
    details: [
      "24/7 instant answers to complex Spanish tax & registration questions",
      "Zero phone calls or in-person gestor appointments needed",
      "Real-time updates when local municipal decrees or tax thresholds change",
    ],
    type: "intelligence"
  }
];

const TAX_MODELS = [
  { code: "Modelo 130", name: "IRPF Return", due: "April, July, Oct, Jan", desc: "20% net profit advance tax" },
  { code: "Modelo 303", name: "VAT / IVA Return", due: "April, July, Oct, Jan", desc: "21% IVA offset balancing" },
  { code: "Modelo 115", name: "Office Retention", due: "Quarterly", desc: "Co-working & lease withholding" },
  { code: "Modelo 390", name: "Annual IVA Summary", due: "30th January", desc: "Year-round vault reconciliation" },
];

const DEDUCTIONS_LIST = [
  { label: "Home Office & Utilities", pct: "30% write-off", icon: Building2 },
  { label: "Software & SaaS Gear", pct: "100% deduction", icon: Zap },
  { label: "Client Meals & Travel", pct: "Direct VAT recovery", icon: Receipt },
  { label: "Hardware & Computers", pct: "Depreciable credit", icon: Wallet },
];

export default function AutonomoEngine() {
  const { ref, progress } = useScrollProgress();
  const [activeModelTab, setActiveModelTab] = useState(0);

  const N = AUTONOMO_SLIDES.length;
  const slideIndex = Math.min(N - 1, Math.floor(progress * N));
  const activeSlide = AUTONOMO_SLIDES[slideIndex] || AUTONOMO_SLIDES[0];

  return (
    <section
      ref={ref}
      id="autonomo-engine"
      className="relative h-[400vh] w-full bg-[#FFFFFF] text-black scroll-mt-28 select-none"
    >
      {/* Sticky Full-Viewport Container */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 overflow-hidden z-20">
        
        {/* Main Full-Width 2-Column Split: Topic Text (Left) vs Interactive Card (Right) */}
        <div className="max-w-[1440px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
          
          {/* LEFT SIDE: Topic Text & Dynamic Slide Narrative (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center pr-2">
            
            {/* Main Topic Header */}
            <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-300 px-4 py-1.5 rounded-full mb-4 shadow-xs w-fit">
              <FileSpreadsheet className="w-3.5 h-3.5 text-black" />
              <span className="font-mono text-xs font-bold text-black uppercase tracking-widest">
                Autónomo & Freelance Command Center
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-extrabold font-syne text-black tracking-tight leading-[1.08] mb-5">
              One System for Freelancing, Taxes & Deductions
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
              {AUTONOMO_SLIDES.map((s, idx) => (
                <div
                  key={s.id}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    slideIndex === idx ? "w-10 bg-black" : "w-2.5 bg-zinc-300"
                  }`}
                />
              ))}
            </div>

          </div>

          {/* RIGHT SIDE: Interactive Feature Card Visualizer (7 Cols) */}
          <div className="lg:col-span-7 bg-zinc-50 border border-zinc-300 rounded-3xl p-6 md:p-10 shadow-md flex flex-col justify-between min-h-[480px] relative overflow-hidden">
            
            {/* Header of Card */}
            <div className="flex justify-between items-center border-b border-zinc-200 pb-5 mb-5">
              <div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">
                  Autónomo Feature Module
                </span>
                <h4 className="font-syne font-extrabold text-xl text-black mt-0.5">
                  {activeSlide.title}
                </h4>
              </div>
              <span className="font-mono text-[9px] bg-black text-white px-3.5 py-1.5 rounded-full font-bold uppercase shadow-xs">
                Auto-Filed
              </span>
            </div>

            {/* DYNAMIC CARD SLIDE 01: Tax Returns */}
            {activeSlide.type === "models" && (
              <div className="space-y-4 my-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TAX_MODELS.map((m, idx) => (
                    <button
                      key={m.code}
                      onClick={() => setActiveModelTab(idx)}
                      className={`p-3 rounded-2xl text-left transition-all duration-300 border ${
                        activeModelTab === idx
                          ? "bg-black text-white border-black shadow-sm"
                          : "bg-white text-zinc-800 border-zinc-200 hover:border-zinc-400"
                      }`}
                    >
                      <span className="font-mono text-[10px] font-bold block uppercase">{m.code}</span>
                      <span className="text-[10px] font-syne font-extrabold block truncate mt-0.5">{m.name}</span>
                    </button>
                  ))}
                </div>

                <div className="bg-white border border-zinc-300 p-5 rounded-2xl shadow-xs">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-mono text-[9px] text-zinc-500 font-bold uppercase">Official Tax Return</span>
                      <h5 className="font-syne font-extrabold text-lg text-black mt-0.5">
                        {TAX_MODELS[activeModelTab].code} — {TAX_MODELS[activeModelTab].name}
                      </h5>
                    </div>
                    <span className="font-mono text-[9px] bg-zinc-100 border border-zinc-300 text-black px-2.5 py-1 rounded-full font-bold">
                      Due: {TAX_MODELS[activeModelTab].due}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                    {TAX_MODELS[activeModelTab].desc}
                  </p>
                </div>
              </div>
            )}

            {/* DYNAMIC CARD SLIDE 02: Expense Deductions */}
            {activeSlide.type === "deductions" && (
              <div className="space-y-4 my-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DEDUCTIONS_LIST.map((d, idx) => {
                    const IconComp = d.icon;
                    return (
                      <div key={idx} className="bg-white border border-zinc-300 p-4 rounded-2xl flex items-center gap-3.5 shadow-xs">
                        <div className="w-9 h-9 rounded-xl bg-zinc-100 border border-zinc-300 flex items-center justify-center text-black shrink-0">
                          <IconComp className="w-4.5 h-4.5 text-black" />
                        </div>
                        <div>
                          <h5 className="font-syne font-bold text-xs text-black leading-tight">{d.label}</h5>
                          <p className="font-mono text-[9px] text-zinc-500 mt-0.5 font-semibold">{d.pct}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-white border border-zinc-300 p-4 rounded-2xl flex justify-between items-center text-xs font-mono shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                    <span className="font-bold text-black">Q1 Tax Deduction Identified</span>
                  </div>
                  <span className="font-extrabold text-black bg-zinc-100 border border-zinc-300 px-3 py-1 rounded">
                    +€2,840.50 Net Savings
                  </span>
                </div>
              </div>
            )}

            {/* DYNAMIC CARD SLIDE 03: Invoicing */}
            {activeSlide.type === "invoicing" && (
              <div className="space-y-4 my-2">
                <div className="bg-white border border-zinc-300 p-5 rounded-2xl shadow-xs space-y-3">
                  <div className="flex justify-between items-center border-b border-zinc-100 pb-3">
                    <div>
                      <span className="font-mono text-[9px] text-zinc-500 uppercase font-bold">Issued Factura #ES-2026-089</span>
                      <h5 className="font-syne font-extrabold text-base text-black mt-0.5">Design Agency Client S.L.</h5>
                    </div>
                    <span className="font-mono text-[9px] bg-black text-white px-2.5 py-1 rounded font-bold uppercase">
                      IRPF 15% Deducted
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-600">Base Subtotal:</span>
                    <span className="font-bold text-black">€3,500.00</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-600">21% IVA Added:</span>
                    <span className="font-bold text-black">+€735.00</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono border-t border-zinc-100 pt-2">
                    <span className="font-extrabold text-black">Total Reconciled:</span>
                    <span className="font-extrabold text-black bg-zinc-100 px-2.5 py-1 rounded border border-zinc-300">
                      €3,710.00 Net
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* DYNAMIC CARD SLIDE 04: Intelligence */}
            {activeSlide.type === "intelligence" && (
              <div className="space-y-4 my-2">
                <div className="bg-black text-white p-6 rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-white animate-pulse" />
                    <span className="font-mono text-[10px] uppercase font-bold text-zinc-300">Agencia Tributaria Verified</span>
                  </div>
                  <h5 className="font-syne font-extrabold text-lg text-white">
                    Trained on Every Royal Decree & BOE Publication
                  </h5>
                  <p className="font-sans text-xs text-zinc-300 leading-relaxed">
                    Unlike human gestors who charge high fees and take days to reply, Paprs provides instant 24/7 precision for your exact autónomo setup.
                  </p>
                </div>
              </div>
            )}

            {/* Highlight Banner */}
            <div className="bg-white border border-zinc-300 p-4 rounded-2xl flex items-center gap-2.5 text-xs md:text-sm font-mono font-bold text-black shadow-xs mt-3">
              <Sparkles className="w-4 h-4 text-black shrink-0 animate-pulse" />
              <span>{activeSlide.highlight}</span>
            </div>

            {/* Footer Bar */}
            <div className="mt-5 pt-3.5 border-t border-zinc-200 flex items-center justify-between text-[10px] md:text-xs font-mono text-zinc-500">
              <span>Scroll down to advance Autónomo slides</span>
              <span className="font-bold text-black uppercase">100% Compliant</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
