"use client";

import React, { useState } from "react";
import { 
  Archive, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  FolderLock, 
  Lock, 
  QrCode, 
  ShieldCheck, 
  Sparkles, 
  Zap 
} from "lucide-react";
import { useScrollProgress } from "../hooks/useScrollProgress";

const QR_VAULT_SLIDES = [
  {
    id: 0,
    tag: "QR & Vault 01 · Digital Mailbox",
    title: "One QR Code Connects Your Life",
    subtitle: "Replace physical mailboxes with a direct digital pipeline to government offices, water, gas, and electricity companies.",
    highlight: "Zero physical paperwork lost in mailboxes ever again",
    details: [
      "Scan once at townhalls or utility providers to link your payload",
      "Official communications push straight into your Paprs app",
      "Eliminates stolen, delayed, or lost physical mail",
    ],
    type: "qr"
  },
  {
    id: 1,
    tag: "QR & Vault 02 · Provider Ingest",
    title: "Direct Utility & Government Connections",
    subtitle: "Direct ingest channels for Spanish Extranjería, Agencia Tributaria (Hacienda), Endesa, Iberdrola, and Agbar Water.",
    highlight: "Automated ingestion for official bills, certificates, and decrees",
    details: [
      "Extranjería & Policía Nacional: Direct resolution delivery",
      "Agencia Tributaria: Automatic tax notification ingestion",
      "Endesa & Agbar: Electricity & water utility auto-fetch",
    ],
    type: "providers"
  },
  {
    id: 2,
    tag: "QR & Vault 03 · Document Vault",
    title: "AES-256 Encrypted Permanent Storage",
    subtitle: "Every certificate, empadronamiento, and tax receipt is permanently indexed, searchable, and securely backed up.",
    highlight: "Never lose years of hardcopy papers again",
    details: [
      "Plain-language search across all historical certificates",
      "Automatic tax-readiness tags for expense deductions",
      "AES-256 military-grade encryption for total privacy",
    ],
    type: "vault"
  },
  {
    id: 3,
    tag: "QR & Vault 04 · Expiration Watchdog",
    title: "Proactive Renewal & Expiration Alerts",
    subtitle: "The AI watches your document expiration dates automatically and triggers renewal tasks before deadlines pass.",
    highlight: "Auto-flags 90-day Padrón rule for Spanish visa submissions",
    details: [
      "Tracks empadronamiento 90-day validity window",
      "Flags TIE / NIE card renewals 60 days ahead of time",
      "Automated task creation to request fresh certificates",
    ],
    type: "watchdog"
  }
];

const PROVIDERS_LIST = [
  { name: "Extranjería & Policía", category: "Govt Office", status: "Connected via QR" },
  { name: "Agencia Tributaria (Hacienda)", category: "Tax Agency", status: "Connected via QR" },
  { name: "Endesa / Iberdrola Electricity", category: "Utility Provider", status: "Auto-Ingest Active" },
  { name: "Agbar Water & Gas Company", category: "Utility Provider", status: "Auto-Ingest Active" },
];

const VAULT_DOCUMENTS = [
  { name: "Empadronamiento Volante", date: "Expires in 42 days", detail: "Auto-flagged for renewal", status: "Valid" },
  { name: "NIE Resolution & Certificate", date: "Permanent Record", detail: "Verified & Encrypted", status: "Verified" },
  { name: "Social Security (NUSS)", date: "Active Status", detail: "TGSS Reconciled", status: "Active" },
  { name: "Electricity Utility Bill", date: "Deduction Claimed", detail: "30% Tax Deductible", status: "Deducted" },
];

export default function PaprsQRAndVault() {
  const { ref, progress } = useScrollProgress();

  const N = QR_VAULT_SLIDES.length;
  const slideIndex = Math.min(N - 1, Math.floor(progress * N));
  const activeSlide = QR_VAULT_SLIDES[slideIndex] || QR_VAULT_SLIDES[0];

  return (
    <section
      ref={ref}
      id="qr-vault"
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
              <QrCode className="w-3.5 h-3.5 text-black" />
              <span className="font-mono text-xs font-bold text-black uppercase tracking-widest">
                No More Paper Mailboxes · Paprs QR & Vault
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-extrabold font-syne text-black tracking-tight leading-[1.08] mb-5">
              One QR Code Connects Your Physical Life
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
              {QR_VAULT_SLIDES.map((s, idx) => (
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
            <div className="flex justify-between items-center border-b border-zinc-200 pb-5 mb-4">
              <div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">
                  Paprs QR & Vault Module
                </span>
                <h4 className="font-syne font-extrabold text-xl text-black mt-0.5">
                  {activeSlide.title}
                </h4>
              </div>
              <span className="font-mono text-[9px] bg-black text-white px-3.5 py-1.5 rounded-full font-bold uppercase shadow-xs">
                Encrypted Payload
              </span>
            </div>

            {/* DYNAMIC CARD SLIDE 01: QR Code Visualizer */}
            {activeSlide.type === "qr" && (
              <div className="flex flex-col sm:flex-row items-center gap-6 my-2 bg-white border border-zinc-300 p-6 rounded-2xl shadow-xs">
                <div className="w-36 h-36 bg-black rounded-2xl p-2.5 border-4 border-zinc-800 flex items-center justify-center shrink-0 shadow-md relative">
                  <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="5" y="5" width="25" height="25" fill="white" />
                    <rect x="9" y="9" width="17" height="17" fill="black" />
                    <rect x="13" y="13" width="9" height="9" fill="white" />

                    <rect x="70" y="5" width="25" height="25" fill="white" />
                    <rect x="74" y="9" width="17" height="17" fill="black" />
                    <rect x="78" y="13" width="9" height="9" fill="white" />

                    <rect x="5" y="70" width="25" height="25" fill="white" />
                    <rect x="9" y="74" width="17" height="17" fill="black" />
                    <rect x="13" y="78" width="9" height="9" fill="white" />

                    <rect x="35" y="10" width="8" height="8" />
                    <rect x="48" y="10" width="8" height="8" />
                    <rect x="35" y="35" width="12" height="12" />
                    <rect x="52" y="35" width="8" height="8" />
                    <rect x="70" y="35" width="15" height="8" />
                    <rect x="40" y="52" width="10" height="10" />
                    <rect x="60" y="52" width="15" height="8" />
                    <rect x="35" y="70" width="12" height="12" />
                    <rect x="55" y="70" width="8" height="8" />
                    <rect x="70" y="70" width="12" height="12" />
                  </svg>
                  <div className="absolute inset-0 m-auto w-8 h-8 bg-white rounded-md flex items-center justify-center text-black font-syne font-black text-xs border border-black">
                    p.
                  </div>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-zinc-500 font-bold uppercase">Digital Channel Token</span>
                  <h5 className="font-syne font-extrabold text-lg text-black mt-0.5">ID: PAPRS-QR-ES8921</h5>
                  <p className="text-xs text-zinc-600 font-sans leading-relaxed mt-2">
                    Scan once at townhalls, water, gas, electricity providers or extranjería to bypass physical mailbox delivery.
                  </p>
                </div>
              </div>
            )}

            {/* DYNAMIC CARD SLIDE 02: Provider Channels */}
            {activeSlide.type === "providers" && (
              <div className="space-y-3 my-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PROVIDERS_LIST.map((p, idx) => (
                    <div key={idx} className="bg-white border border-zinc-300 p-4 rounded-2xl flex items-center justify-between shadow-xs">
                      <div>
                        <h5 className="font-syne font-bold text-xs text-black leading-tight">{p.name}</h5>
                        <span className="font-mono text-[9px] text-zinc-500 block mt-0.5">{p.category}</span>
                      </div>
                      <span className="font-mono text-[8px] font-bold bg-black text-white px-2.5 py-1 rounded-full shrink-0">
                        Connected
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DYNAMIC CARD SLIDE 03: Encrypted Vault Storage */}
            {activeSlide.type === "vault" && (
              <div className="space-y-2.5 my-2">
                {VAULT_DOCUMENTS.map((doc, idx) => (
                  <div key={idx} className="bg-white border border-zinc-300 p-3.5 rounded-2xl flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-zinc-100 border border-zinc-300 flex items-center justify-center text-black shrink-0">
                        <FileText className="w-4 h-4 text-black" />
                      </div>
                      <div>
                        <h5 className="font-syne font-bold text-xs text-black leading-tight">{doc.name}</h5>
                        <p className="font-mono text-[9px] text-zinc-500 mt-0.5">{doc.detail}</p>
                      </div>
                    </div>
                    <span className="font-mono text-[8px] font-bold bg-zinc-100 border border-zinc-300 text-black px-2.5 py-1 rounded-md">
                      {doc.date}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* DYNAMIC CARD SLIDE 04: Expiration Watchdog */}
            {activeSlide.type === "watchdog" && (
              <div className="space-y-4 my-2">
                <div className="bg-black text-white p-6 rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <span className="font-mono text-[10px] text-zinc-300 font-bold uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> AI Watchdog Active
                    </span>
                    <span className="font-mono text-[9px] bg-zinc-800 text-zinc-200 border border-zinc-700 px-2.5 py-0.5 rounded font-bold">
                      42 Days Left
                    </span>
                  </div>
                  <h5 className="font-syne font-extrabold text-lg text-white">
                    Padrón Volante Expiration Alert
                  </h5>
                  <p className="font-sans text-xs text-zinc-300 leading-relaxed">
                    Spanish visa submissions require an empadronamiento issued &lt; 90 days. Paprs automatically triggered a fresh townhall request.
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
              <span>Scroll down to advance QR & Vault slides</span>
              <span className="font-bold text-black uppercase">AES-256 Encrypted</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
