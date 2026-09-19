"use client";

import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Compass,
  CreditCard,
  FileText,
  FileWarning,
  Globe,
  Home,
  Landmark,
  Layers,
  Lock,
  MapPin,
  PhoneCall,
  Play,
  RefreshCw,
  Search,
  ServerCrash,
  ShieldAlert,
  Sparkles,
  WifiOff,
  X,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import DocumentCard from "../components/DocumentCard";
import {
  BrowserWindow,
  NieRouteView,
  PaprsDetailPhoneScreen,
  PaprsWebDashboard,
  PaprsWebDashboardCard,
  RelocationHubView,
} from "../components/BrowserWindow";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { useLanguage } from "../context/LanguageContext";

// ─── Visual 1: The Circular Trap (Proper Geometric Circle & Continuous Motion) ──────
function CircularTrapVisual({
  nodes,
  deadlock,
}: {
  nodes: {
    nie: { title: string; subtitle: string; blockReason: string; startTag: string; docCode: string; status: string };
    padron: { title: string; subtitle: string; blockReason: string; startTag: string; docCode: string; status: string };
    rental: { title: string; subtitle: string; blockReason: string; startTag: string; docCode: string; status: string };
    bank: { title: string; subtitle: string; blockReason: string; startTag: string; docCode: string; status: string };
  };
  deadlock: {
    question: string;
    sub: string;
    badge: string;
  };
}) {
  return (
    <div className="relative w-full max-w-[740px] mx-auto select-none">
      {/* ── DESKTOP & TABLET: Open Spatial Continuous Canvas (sm:block) ── */}
      <div className="hidden sm:block relative w-full h-[470px] lg:h-[490px]">
        {/* Faint spatial blueprint grid background without bounding box */}
        <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

        {/* Corner registration crosshairs */}
        <div className="absolute top-0 left-0 text-zinc-300 font-mono text-xs pointer-events-none">+</div>
        <div className="absolute top-0 right-0 text-zinc-300 font-mono text-xs pointer-events-none">+</div>
        <div className="absolute bottom-0 left-0 text-zinc-300 font-mono text-xs pointer-events-none">+</div>
        <div className="absolute bottom-0 right-0 text-zinc-300 font-mono text-xs pointer-events-none">+</div>


        {/* ── SVG DEPENDENCY LOOP (BEHIND CARDS: z-0) ── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 700 480" fill="none">
          {/* Inner subtle guide circle framing center hub */}
          <circle cx="350" cy="240" r="130" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="3 3" />
          
          {/* Outer faint boundary orbit */}
          <circle cx="350" cy="240" r="226" stroke="#f4f4f5" strokeWidth="1" strokeDasharray="4 4" />

          {/* THE EXPANDED CONTINUOUS DOTTED CIRCLE (Active animated motion) */}
          <circle
            cx="350"
            cy="240"
            r="210"
            stroke="#18181b"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="animate-line-dash"
          />

          {/* Traveling Pulse Indicators on the Orbit */}
          <circle cx="350" cy="30" r="4" fill="#000000" className="animate-ping opacity-60" />
          <circle cx="560" cy="240" r="4" fill="#000000" className="animate-ping opacity-60" />
          <circle cx="350" cy="450" r="4" fill="#000000" className="animate-ping opacity-60" />
          <circle cx="140" cy="240" r="4" fill="#000000" className="animate-ping opacity-60" />

          {/* 4 Clockwise Directional Arrowheads */}
          {/* 1. Touching Rental Card (x=432, y=48) */}
          <g transform="translate(432, 48) rotate(24)">
            <path d="M 0 0 L -9 -4.5 L -7 0 L -9 4.5 z" fill="#18181b" />
          </g>

          {/* 2. Touching Padrón Card (x=539, y=332) */}
          <g transform="translate(539, 332) rotate(116)">
            <path d="M 0 0 L -9 -4.5 L -7 0 L -9 4.5 z" fill="#18181b" />
          </g>

          {/* 3. Touching NIE Card (x=266, y=432) */}
          <g transform="translate(266, 432) rotate(204)">
            <path d="M 0 0 L -9 -4.5 L -7 0 L -9 4.5 z" fill="#18181b" />
          </g>

          {/* 4. Touching Bank Card (x=161, y=148) */}
          <g transform="translate(161, 148) rotate(296)">
            <path d="M 0 0 L -9 -4.5 L -7 0 L -9 4.5 z" fill="#18181b" />
          </g>
        </svg>

        {/* Midpoint Lock Badges along the 210px Expanded Circle (z-10) */}
        <div
          className="absolute z-10 pointer-events-none"
          style={{ top: "calc(50% - 210px)", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-zinc-300 text-zinc-900 text-[8.5px] font-mono font-semibold shadow-xs whitespace-nowrap">
            <Lock className="w-2.5 h-2.5 text-black" /> Locks Lease (Requires IBAN)
          </span>
        </div>
        <div
          className="absolute z-10 pointer-events-none"
          style={{ top: "50%", left: "calc(50% + 210px)", transform: "translate(-50%, -50%)" }}
        >
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-zinc-300 text-zinc-900 text-[8.5px] font-mono font-semibold shadow-xs whitespace-nowrap">
            <Lock className="w-2.5 h-2.5 text-black" /> Locks Padrón (Requires Lease)
          </span>
        </div>
        <div
          className="absolute z-10 pointer-events-none"
          style={{ top: "calc(50% + 210px)", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-zinc-300 text-zinc-900 text-[8.5px] font-mono font-semibold shadow-xs whitespace-nowrap">
            <Lock className="w-2.5 h-2.5 text-black" /> Locks NIE (Requires Padrón)
          </span>
        </div>
        <div
          className="absolute z-10 pointer-events-none"
          style={{ top: "50%", left: "calc(50% - 210px)", transform: "translate(-50%, -50%)" }}
        >
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-zinc-300 text-zinc-900 text-[8.5px] font-mono font-semibold shadow-xs whitespace-nowrap">
            <Lock className="w-2.5 h-2.5 text-black" /> Locks Account (Requires NIE)
          </span>
        </div>

        {/* ── CENTER DEADLOCK HUB: "Where Do I Start?" (z-20) ── */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center text-center pointer-events-none">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-white border-2 border-black shadow-xl flex flex-col items-center justify-center p-2 text-center">
              <span className="text-2xl font-black text-black font-syne leading-none">?</span>
              <span className="text-[8px] font-mono font-extrabold text-zinc-700 uppercase tracking-tight mt-1 leading-none">
                {deadlock.question}
              </span>
            </div>
            <div className="absolute -inset-2 rounded-full border border-zinc-300/80 animate-ping pointer-events-none" />
          </div>
          <div className="mt-2.5 bg-black text-white text-[9px] font-mono font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap">
            <RefreshCw className="w-2.5 h-2.5 text-zinc-400 animate-spin [animation-duration:8s]" />
            {deadlock.badge}
          </div>
        </div>

        {/* ── 4 FRAGMENTED CARDS WITH LIVE PAIN COMMENT ANNOTATIONS (z-10) ── */}
        {/* Card 1: Bank (Top Left) */}
        <div className="absolute top-2 left-2 w-[255px] lg:w-[270px] -rotate-1 transition-transform hover:rotate-0 z-10 hover:z-30">
          <div className="absolute -top-3 left-4 z-30 bg-zinc-950 text-white font-mono text-[8.5px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md border border-zinc-800">
            <span>{nodes.bank.startTag}</span>
            <span className="text-zinc-400 font-extrabold">✕ Blocked</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-zinc-200 shadow-md">
            <div className="flex items-start justify-between gap-1">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 flex-shrink-0 border border-zinc-200">
                  <Landmark className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[8px] font-mono text-zinc-500 font-bold block leading-none">{nodes.bank.docCode}</span>
                  <h4 className="text-xs font-bold text-black leading-tight font-syne truncate mt-0.5">{nodes.bank.title}</h4>
                </div>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-300 text-zinc-800 text-[8px] font-mono font-bold uppercase flex-shrink-0">
                Locked
              </span>
            </div>

            <div className="mt-2.5 bg-zinc-50 border border-zinc-200/80 rounded-lg p-2 font-mono text-[9px]">
              <div className="flex items-center justify-between text-zinc-500 text-[8px] mb-1">
                <span>IBAN DOMICILIACIÓN</span>
                <span className="text-[7.5px] bg-zinc-200 text-zinc-800 font-bold px-1 rounded">RECHAZADO</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-800 font-semibold tracking-wider text-[9.5px]">
                <span className="w-3 h-2 rounded bg-zinc-400 inline-block" />
                <span>ES91 •••• •••• •••• 4821</span>
              </div>
            </div>

            {/* Pain Callout Note */}
            <div className="mt-2 bg-zinc-100/90 border border-zinc-200 rounded-md p-1.5 font-mono text-[7.5px] text-zinc-700 italic">
              "Banco: 'Ley 10/2010 impide abrir cuenta a extranjeros sin NIE asignado.'"
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-[9px] text-zinc-700 font-mono">
              <Lock className="w-2.5 h-2.5 text-black flex-shrink-0" />
              <span className="truncate">{nodes.bank.blockReason}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Rental (Top Right) */}
        <div className="absolute top-2 right-2 w-[255px] lg:w-[270px] rotate-1 transition-transform hover:rotate-0 z-10 hover:z-30">
          <div className="absolute -top-3 right-4 z-30 bg-zinc-950 text-white font-mono text-[8.5px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md border border-zinc-800">
            <span>{nodes.rental.startTag}</span>
            <span className="text-zinc-400 font-extrabold">✕ Blocked</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-zinc-200 shadow-md">
            <div className="flex items-start justify-between gap-1">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 flex-shrink-0 border border-zinc-200">
                  <Home className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[8px] font-mono text-zinc-500 font-bold block leading-none">{nodes.rental.docCode}</span>
                  <h4 className="text-xs font-bold text-black leading-tight font-syne truncate mt-0.5">{nodes.rental.title}</h4>
                </div>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-300 text-zinc-800 text-[8px] font-mono font-bold uppercase flex-shrink-0">
                Locked
              </span>
            </div>

            <div className="mt-2.5 bg-zinc-50 border border-zinc-200/80 rounded-lg p-2 font-mono text-[9px]">
              <div className="flex items-center justify-between text-zinc-500 text-[8px] mb-1">
                <span>CONTRATO VIVIENDA</span>
                <span className="text-[7.5px] bg-zinc-200 text-zinc-800 font-bold px-1 rounded">PARALIZADO</span>
              </div>
              <div className="text-[9px] text-zinc-800 font-semibold leading-tight truncate">
                Fianza legal (LAU) · Exige SEPA ES
              </div>
            </div>

            {/* Pain Callout Note */}
            <div className="mt-2 bg-zinc-100/90 border border-zinc-200 rounded-md p-1.5 font-mono text-[7.5px] text-zinc-700 italic">
              "Propietario: 'El seguro de impagos rechaza IBAN extranjero sin NIE.'"
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-[9px] text-zinc-700 font-mono">
              <Lock className="w-2.5 h-2.5 text-black flex-shrink-0" />
              <span className="truncate">{nodes.rental.blockReason}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Padrón (Bottom Right) */}
        <div className="absolute bottom-2 right-2 w-[255px] lg:w-[270px] -rotate-1 transition-transform hover:rotate-0 z-10 hover:z-30">
          <div className="absolute -bottom-3 right-4 z-30 bg-zinc-950 text-white font-mono text-[8.5px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md border border-zinc-800">
            <span>{nodes.padron.startTag}</span>
            <span className="text-zinc-400 font-extrabold">✕ Blocked</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-zinc-200 shadow-md">
            <div className="flex items-start justify-between gap-1">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 flex-shrink-0 border border-zinc-200">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[8px] font-mono text-zinc-500 font-bold block leading-none">{nodes.padron.docCode}</span>
                  <h4 className="text-xs font-bold text-black leading-tight font-syne truncate mt-0.5">{nodes.padron.title}</h4>
                </div>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-300 text-zinc-800 text-[8px] font-mono font-bold uppercase flex-shrink-0">
                Locked
              </span>
            </div>

            <div className="mt-2.5 bg-zinc-50 border border-zinc-200/80 rounded-lg p-2 font-mono text-[9px]">
              <div className="flex items-center justify-between text-zinc-500 text-[8px] mb-1">
                <span>AYUNTAMIENTO REGISTRO</span>
                <span className="text-[7.5px] bg-zinc-200 text-zinc-800 font-bold px-1 rounded">DENEGADO</span>
              </div>
              <div className="text-[9px] text-zinc-800 font-semibold leading-tight truncate">
                Volante de Empadronamiento
              </div>
            </div>

            {/* Pain Callout Note */}
            <div className="mt-2 bg-zinc-100/90 border border-zinc-200 rounded-md p-1.5 font-mono text-[7.5px] text-zinc-700 italic">
              "Ayuntamiento: 'Sin contrato firmado de 6 meses y DNI del casero no hay padrón.'"
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-[9px] text-zinc-700 font-mono">
              <Lock className="w-2.5 h-2.5 text-black flex-shrink-0" />
              <span className="truncate">{nodes.padron.blockReason}</span>
            </div>
          </div>
        </div>

        {/* Card 4: NIE (Bottom Left) */}
        <div className="absolute bottom-2 left-2 w-[255px] lg:w-[270px] rotate-1.5 transition-transform hover:rotate-0 z-10 hover:z-30">
          <div className="absolute -bottom-3 left-4 z-30 bg-zinc-950 text-white font-mono text-[8.5px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md border border-zinc-800">
            <span>{nodes.nie.startTag}</span>
            <span className="text-zinc-400 font-extrabold">✕ Blocked</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-zinc-200 shadow-md">
            <div className="flex items-start justify-between gap-1">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 flex-shrink-0 border border-zinc-200">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[8px] font-mono text-zinc-500 font-bold block leading-none">{nodes.nie.docCode}</span>
                  <h4 className="text-xs font-bold text-black leading-tight font-syne truncate mt-0.5">{nodes.nie.title}</h4>
                </div>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-300 text-zinc-800 text-[8px] font-mono font-bold uppercase flex-shrink-0">
                Locked
              </span>
            </div>

            <div className="mt-2.5 bg-zinc-50 border border-zinc-200/80 rounded-lg p-2 font-mono text-[9px]">
              <div className="flex items-center justify-between text-zinc-500 text-[8px] mb-1">
                <span>POLICÍA NACIONAL</span>
                <span className="text-[7.5px] bg-zinc-200 text-zinc-800 font-bold px-1 rounded">INCOMPLETO</span>
              </div>
              <div className="text-[9px] text-zinc-800 font-semibold leading-tight truncate">
                Expediente T.I.E. / NIE
              </div>
            </div>

            {/* Pain Callout Note */}
            <div className="mt-2 bg-zinc-100/90 border border-zinc-200 rounded-md p-1.5 font-mono text-[7.5px] text-zinc-700 italic">
              "Policía: 'Sin padrón histórico municipal menor a 90 días no se tramita el NIE.'"
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-[9px] text-zinc-700 font-mono">
              <Lock className="w-2.5 h-2.5 text-black flex-shrink-0" />
              <span className="truncate">{nodes.nie.blockReason}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE: Responsive Staggered Fragment Stream (sm:hidden) ── */}
      <div className="sm:hidden space-y-2.5 py-2">
        <div className="p-3 rounded-2xl bg-zinc-100 border border-zinc-300 text-center">
          <div className="inline-flex items-center gap-1.5 text-zinc-900 text-[10px] font-mono font-bold uppercase">
            <RefreshCw className="w-3 h-3 animate-spin [animation-duration:8s]" />
            <span>{deadlock.question} · {deadlock.badge}</span>
          </div>
        </div>

        {[
          { key: "bank", data: nodes.bank, icon: Landmark, next: "Locks Long-Term Rental", quote: "Banco: Exige NIE para abrir cuenta española." },
          { key: "rental", data: nodes.rental, icon: Home, next: "Locks Padrón Municipal", quote: "Inmobiliaria: Rechaza cuenta extranjera para la fianza." },
          { key: "padron", data: nodes.padron, icon: Building2, next: "Locks NIE / TIE Card", quote: "Ayuntamiento: Exige contrato de alquiler registrado." },
          { key: "nie", data: nodes.nie, icon: FileText, next: "Locks Spanish Bank Account", quote: "Policía: Exige padrón reciente para expedir el NIE." },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.key} className="p-3 rounded-2xl bg-white border border-zinc-200 shadow-sm relative space-y-1.5">
              <div className="flex items-start justify-between gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 flex-shrink-0">
                    <Icon className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="text-[7.5px] font-mono text-zinc-500 block leading-none">{item.data.docCode}</span>
                    <h4 className="text-xs font-bold text-black font-syne leading-tight">{item.data.title}</h4>
                  </div>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-300 text-zinc-800 text-[7.5px] font-mono font-bold uppercase">
                  Locked
                </span>
              </div>
              <div className="bg-zinc-100/90 border border-zinc-200 rounded p-1.5 text-[7.5px] font-mono text-zinc-700 italic">
                {item.quote}
              </div>
              <div className="flex items-center justify-between text-[8.5px] font-mono text-zinc-600 bg-zinc-50 border border-zinc-200/80 rounded-md px-2 py-1">
                <span className="text-zinc-900 font-semibold flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5 text-black" />
                  {item.data.blockReason}
                </span>
                <span className="text-zinc-400">➔ {item.next}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Visual 2: The Sede Labyrinth & Appointment Blackout (Getting Lost in the Maze) ──
function SedeBlackoutVisual({
  path,
  sim,
  alertTitle,
  alertMessage,
}: {
  path?: any;
  sim?: any;
  alertTitle?: string;
  alertMessage?: string;
}) {
  return (
    <div className="relative w-full max-w-[740px] mx-auto select-none">
      {/* ── DESKTOP & TABLET: 3 Diverging Government Routes & Blackout (sm:block) ── */}
      <div className="hidden sm:block relative w-full space-y-3 py-1">
        {/* Subtle background blueprint dots */}
        <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none -z-10" />

        {/* ── TOP HEADER SEQUENCE RIBBON & CONTINUOUS CONNECTORS ── */}
        <div className="bg-white border border-zinc-300 rounded-2xl px-4 py-2.5 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-black bg-white" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-black">
              THE CITA PREVIA LABYRINTH
            </span>
            <span className="text-[8.5px] text-zinc-500 font-normal hidden md:inline">
              · 3 Conflicting Paths · 0 Available Slots
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[8px] font-bold">
            <span className="px-2.5 py-1 rounded-full bg-white border-2 border-black text-black font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
              <Compass className="w-3.5 h-3.5 text-black stroke-[2.5]" />
              <span>LOST IN THE MAZE</span>
            </span>
          </div>
        </div>

        {/* ── 3 CONFLICTING BUREAUCRATIC PATHWAYS (HORIZONTAL GRID) ── */}
        <div className="grid grid-cols-3 gap-3">
          {/* Path 1: Sede Electrónica (Web Portal) */}
          <div className="p-3.5 rounded-2xl bg-white border border-zinc-300 shadow-xs flex flex-col justify-between min-h-[265px] hover:border-black transition-all">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[8px] font-mono text-zinc-500 font-bold uppercase">PATH 01 · WEB PORTAL</span>
                <span className="px-2 py-0.5 rounded-full bg-white border-2 border-black text-black text-[7.5px] font-mono font-black uppercase flex items-center gap-1 shadow-2xs">
                  <ServerCrash className="w-2.5 h-2.5 stroke-[3] text-black" />
                  <span>Error 504</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Globe className="w-3.5 h-3.5 text-black flex-shrink-0" />
                <h5 className="text-[11.5px] font-bold text-black font-syne leading-tight">Sede Electrónica</h5>
              </div>

              {/* Simulated Portal Dropdown Box */}
              <div className="mt-2 bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 font-mono text-[8px] space-y-1.5">
                <div className="text-zinc-500 text-[7px] uppercase font-bold">Trámite Seleccionado</div>
                <div className="bg-white border border-zinc-300 px-2 py-1 rounded text-zinc-900 font-bold text-[7.5px] truncate">
                  POLICÍA - ASIGNACIÓN NIE
                </div>
                <div className="flex items-center gap-1.5 font-bold text-black text-[7.5px] pt-1 bg-zinc-100 p-1.5 rounded border border-zinc-200">
                  <X className="w-2.5 h-2.5 stroke-[3] text-black shrink-0" />
                  <span className="leading-tight">"En este momento no hay citas disponibles."</span>
                </div>
              </div>
            </div>

            {/* Pain Comment Callout */}
            <div className="mt-2 bg-zinc-100/90 border border-zinc-200 rounded-lg p-2 font-mono text-[7.5px] text-zinc-700 leading-snug">
              <span className="font-bold text-black block mb-0.5">Intento #184 · 00:00:01 AM</span>
              Página colapsada por bots. IP temporalmente bloqueada por exceso de peticiones.
            </div>
          </div>

          {/* Path 2: Teléfono 060 (Citizen Info Call Center) */}
          <div className="p-3.5 rounded-2xl bg-white border border-zinc-300 shadow-xs flex flex-col justify-between min-h-[265px] hover:border-black transition-all">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[8px] font-mono text-zinc-500 font-bold uppercase">PATH 02 · CALL CENTER</span>
                <span className="px-2 py-0.5 rounded-full bg-white border-2 border-black text-black text-[7.5px] font-mono font-black uppercase flex items-center gap-1 shadow-2xs">
                  <PhoneCall className="w-2.5 h-2.5 stroke-[3] text-black" />
                  <span>Saturado</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-black flex-shrink-0" />
                <h5 className="text-[11.5px] font-bold text-black font-syne leading-tight">Teléfono Oficial 060</h5>
              </div>

              {/* Simulated Call Hold Box */}
              <div className="mt-2 bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 font-mono text-[8px] space-y-1.5">
                <div className="flex justify-between text-zinc-500 text-[7px] uppercase font-bold">
                  <span>Tiempo en Espera</span>
                  <span className="text-black font-bold">42 min 18s</span>
                </div>
                <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-black w-[88%] h-full rounded-full animate-pulse" />
                </div>
                <div className="flex items-center gap-1.5 font-bold text-black text-[7.5px] pt-1 bg-zinc-100 p-1.5 rounded border border-zinc-200">
                  <WifiOff className="w-2.5 h-2.5 stroke-[3] text-black shrink-0" />
                  <span className="leading-tight">"Línea saturada. Llamada cortada por el servidor."</span>
                </div>
              </div>
            </div>

            {/* Pain Comment Callout */}
            <div className="mt-2 bg-zinc-100/90 border border-zinc-200 rounded-lg p-2 font-mono text-[7.5px] text-zinc-700 leading-snug">
              <span className="font-bold text-black block mb-0.5">Pausa de comida perdida</span>
              14 menús interactivos automáticos. Cero agentes humanos disponibles.
            </div>
          </div>

          {/* Path 3: Black Market & Scalper Bots */}
          <div className="p-3.5 rounded-2xl bg-white border border-zinc-300 shadow-xs flex flex-col justify-between min-h-[265px] hover:border-black transition-all">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[8px] font-mono text-zinc-500 font-bold uppercase">PATH 03 · MAFIAS / BOTS</span>
                <span className="px-2 py-0.5 rounded-full bg-white border-2 border-black text-black text-[7.5px] font-mono font-black uppercase flex items-center gap-1 shadow-2xs">
                  <AlertTriangle className="w-2.5 h-2.5 stroke-[3] text-black" />
                  <span>150€ / Cita</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-black flex-shrink-0" />
                <h5 className="text-[11.5px] font-bold text-black font-syne leading-tight">Mercado Negro / Telegram</h5>
              </div>

              {/* Scalper Chat Box */}
              <div className="mt-2 bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 font-mono text-[8px] space-y-1.5">
                <div className="text-zinc-500 text-[7px] uppercase font-bold">Canal Citas Express</div>
                <div className="bg-white border border-zinc-300 p-1.5 rounded text-zinc-800 text-[7px] leading-tight">
                  "Cita NIE Barcelona asegurada en 48h. Pago por Bizum previo."
                </div>
                <div className="flex items-center gap-1.5 font-bold text-black text-[7.5px] pt-1 bg-zinc-100 p-1.5 rounded border border-zinc-200">
                  <X className="w-2.5 h-2.5 stroke-[3] text-black shrink-0" />
                  <span className="leading-tight">Ilegal · Alto riesgo de estafa o cita falsa.</span>
                </div>
              </div>
            </div>

            {/* Pain Comment Callout */}
            <div className="mt-2 bg-zinc-100/90 border border-zinc-200 rounded-lg p-2 font-mono text-[7.5px] text-zinc-700 leading-snug">
              <span className="font-bold text-black block mb-0.5">Captura en 250ms</span>
              Scripts automatizados acaparan las citas públicas gratuitas al instante.
            </div>
          </div>
        </div>

        {/* ── CENTRAL LABYRINTH STATUS & FRAGILE ESCAPE CONNECTOR ── */}
        <div className="bg-white border-2 border-black rounded-2xl p-3.5 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-50 border-2 border-black flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div className="font-mono">
              <span className="text-[9.5px] font-black uppercase text-black block leading-snug">
                STATUS: PERDIDO EN EL LABERINTO · 3 SEMANAS PERDIDAS
              </span>
              <span className="text-[8px] text-zinc-600 block leading-tight mt-0.5">
                Siguiendo decenas de foros y vídeos contradictorios sin conseguir cita oficial
              </span>
            </div>
          </div>

          {/* Fragile Escape Conduit */}
          <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-1.5 font-mono text-[8px] shrink-0">
            <div className="w-2 h-2 rounded-full bg-black animate-ping shrink-0" />
            <div>
              <span className="font-bold text-black block">Cita encontrada a las 03:14 AM (a 45 km)</span>
              <span className="text-zinc-500 block text-[7.5px]">Comisaría comarcal asignada</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE: Responsive Vertical Stack (sm:hidden) ── */}
      <div className="sm:hidden space-y-2.5 py-2 font-mono">
        <div className="p-3 rounded-2xl bg-white border-2 border-black text-black text-center text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs">
          <Compass className="w-4 h-4 text-black stroke-[2.5]" />
          <span>El Laberinto de la Cita Previa</span>
        </div>

        {[
          { title: "Sede Electrónica", tag: "Error 504", desc: "No hay citas disponibles · 184 intentos fallidos", icon: Globe },
          { title: "Teléfono 060", tag: "Línea Saturada", desc: "42 minutos en espera · Llamada cortada por servidor", icon: PhoneCall },
          { title: "Mercado Negro", tag: "Mafias 150€", desc: "Bots automáticos acaparan las citas gratuitas", icon: ShieldAlert },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-3.5 rounded-2xl bg-white border border-zinc-300 shadow-xs space-y-1.5 text-[8.5px]">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 font-bold text-black font-syne text-[11px]">
                  <Icon className="w-3.5 h-3.5 text-black" />
                  <span>{item.title}</span>
                </div>
                <span className="text-[7.5px] bg-white border-2 border-black px-2 py-0.5 rounded-full font-black uppercase flex items-center gap-1">
                  <X className="w-2.5 h-2.5 stroke-[3] text-black" />
                  <span>{item.tag}</span>
                </span>
              </div>
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-lg p-2 text-zinc-700 text-[8px] leading-snug">
                {item.desc}
              </div>
            </div>
          );
        })}

        <div className="p-3 rounded-xl bg-white border-2 border-black text-center text-[8.5px] font-black text-black shadow-xs flex items-center justify-center gap-2">
          <Compass className="w-3.5 h-3.5 text-black stroke-[2.5]" />
          <span>Perdido en el laberinto · 3 semanas sin cita</span>
        </div>
      </div>
    </div>
  );
}

// ─── Visual 3: The Window Ambush (In-Person Audit & Total Failure) ──────────
function WindowAmbushVisual({
  audit,
}: {
  audit: {
    windowLabel: string;
    dossierTitle: string;
    rejectionStamp: string;
    item1Title: string;
    item1Sub: string;
    item1Reason: string;
    item2Title: string;
    item2Sub: string;
    item2Reason: string;
    item3Title: string;
    item3Sub: string;
    item3Reason: string;
    resetWarning: string;
  };
}) {
  return (
    <div className="relative w-full max-w-[740px] mx-auto select-none">
      {/* ── DESKTOP & TABLET: Open Spatial Audit Conveyor & Rejection (sm:block) ── */}
      <div className="hidden sm:block relative w-full space-y-3 py-1">
        {/* Faint spatial blueprint grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none -z-10" />

        {/* Top Official Placard Header with Incoming Line */}
        <div className="bg-white border border-zinc-300 rounded-2xl px-4 py-2.5 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white border-2 border-black text-black flex items-center justify-center font-mono font-black text-xs shadow-xs">
              04
            </div>
            <div>
              <h4 className="text-xs font-bold text-black font-syne leading-tight">
                {audit.windowLabel}
              </h4>
              <span className="text-[8.5px] font-mono text-zinc-500 block leading-none mt-0.5">
                {audit.dossierTitle} · Auditoría Presencial de Expediente
              </span>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-white border-2 border-black font-mono text-[8.5px] font-black text-black uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
            <Clock className="w-3 h-3 text-black stroke-[2.5]" />
            <span>Revisión en 90 Segundos</span>
          </div>
        </div>

        {/* ── 3 CASCADING INSPECTION TRIPWIRE DOSSIERS (Horizontal Grid) ── */}
        <div className="grid grid-cols-3 gap-3">
          {/* Tripwire 1: Expired Padrón */}
          <div className="p-3.5 rounded-2xl bg-white border border-zinc-300 shadow-xs hover:border-black transition-all flex flex-col justify-between min-h-[265px]">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[8px] font-mono text-zinc-500 font-bold uppercase">DOC-01 · AYTO</span>
                <span className="px-2 py-0.5 rounded-full bg-white border-2 border-black text-black text-[7.5px] font-mono font-black uppercase flex items-center gap-1 shadow-2xs">
                  <X className="w-2.5 h-2.5 stroke-[3] text-black" />
                  <span>Caducado</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Building2 className="w-3.5 h-3.5 text-black flex-shrink-0" />
                <h5 className="text-[11.5px] font-bold text-black font-syne leading-tight">{audit.item1Title}</h5>
              </div>
              
              {/* Validity timeline gauge */}
              <div className="mt-2 bg-zinc-50 border border-zinc-200/80 rounded-xl p-2.5 font-mono text-[8px]">
                <div className="flex justify-between text-zinc-500 mb-1">
                  <span>{audit.item1Sub}</span>
                  <span className="font-bold text-black">Límite: 90 días</span>
                </div>
                {/* Visual timeline bar */}
                <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden mb-1.5 relative">
                  <div className="w-[100%] h-full bg-black rounded-full" />
                </div>
                <div className="flex items-center gap-1.5 font-bold text-black text-[7.5px] pt-1">
                  <div className="w-4 h-4 rounded-full bg-white border-2 border-black flex items-center justify-center shrink-0">
                    <X className="w-2.5 h-2.5 stroke-[3] text-black" />
                  </div>
                  <span>Excede por 4 días naturales</span>
                </div>
              </div>
            </div>

            <div className="mt-2 bg-zinc-100/80 border border-zinc-200/90 rounded-lg p-2 font-mono text-[7.5px] text-zinc-700 font-semibold leading-snug">
              {audit.item1Reason}
            </div>
          </div>

          {/* Tripwire 2: Fee 790-012 Missing Stamp */}
          <div className="p-3.5 rounded-2xl bg-white border border-zinc-300 shadow-xs hover:border-black transition-all flex flex-col justify-between min-h-[265px]">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[8px] font-mono text-zinc-500 font-bold uppercase">DOC-02 · HACIENDA</span>
                <span className="px-2 py-0.5 rounded-full bg-white border-2 border-black text-black text-[7.5px] font-mono font-black uppercase flex items-center gap-1 shadow-2xs">
                  <X className="w-2.5 h-2.5 stroke-[3] text-black" />
                  <span>Sin Sello</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <FileText className="w-3.5 h-3.5 text-black flex-shrink-0" />
                <h5 className="text-[11.5px] font-bold text-black font-syne leading-tight">{audit.item2Title}</h5>
              </div>

              {/* Receipt validation gauge */}
              <div className="mt-2 bg-zinc-50 border border-zinc-200/80 rounded-xl p-2.5 font-mono text-[8px]">
                <div className="flex justify-between text-zinc-500 mb-1">
                  <span>{audit.item2Sub}</span>
                  <span className="text-zinc-500 font-bold">NRC: OK</span>
                </div>
                <div className="border border-dashed border-zinc-300 bg-white rounded-lg p-1.5 text-center text-[7.5px] text-zinc-400 font-bold uppercase tracking-wider mb-1.5">
                  [ ESPACIO PARA SELLO BANCARIO ]
                </div>
                <div className="flex items-center gap-1.5 font-bold text-black text-[7.5px] pt-1">
                  <div className="w-4 h-4 rounded-full bg-white border-2 border-black flex items-center justify-center shrink-0">
                    <X className="w-2.5 h-2.5 stroke-[3] text-black" />
                  </div>
                  <span>Sin cuño mecánico de ventanilla</span>
                </div>
              </div>
            </div>

            <div className="mt-2 bg-zinc-100/80 border border-zinc-200/90 rounded-lg p-2 font-mono text-[7.5px] text-zinc-700 font-semibold leading-snug">
              {audit.item2Reason}
            </div>
          </div>

          {/* Tripwire 3: Health Insurance Copay */}
          <div className="p-3.5 rounded-2xl bg-white border border-zinc-300 shadow-xs hover:border-black transition-all flex flex-col justify-between min-h-[265px]">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[8px] font-mono text-zinc-500 font-bold uppercase">DOC-03 · SANIDAD</span>
                <span className="px-2 py-0.5 rounded-full bg-white border-2 border-black text-black text-[7.5px] font-mono font-black uppercase flex items-center gap-1 shadow-2xs">
                  <X className="w-2.5 h-2.5 stroke-[3] text-black" />
                  <span>Con Copago</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-black flex-shrink-0" />
                <h5 className="text-[11.5px] font-bold text-black font-syne leading-tight">{audit.item3Title}</h5>
              </div>

              {/* Policy clause gauge */}
              <div className="mt-2 bg-zinc-50 border border-zinc-200/80 rounded-xl p-2.5 font-mono text-[8px]">
                <div className="flex justify-between text-zinc-500 mb-1">
                  <span>{audit.item3Sub}</span>
                  <span className="font-bold text-black">Exige: Sin Copago</span>
                </div>
                <div className="border border-zinc-200 bg-white rounded-lg p-1.5 text-[7.5px] text-zinc-700 font-semibold mb-1.5">
                  Cláusula 4.1: Copago 5€/visita
                </div>
                <div className="flex items-center gap-1.5 font-bold text-black text-[7.5px] pt-1">
                  <div className="w-4 h-4 rounded-full bg-white border-2 border-black flex items-center justify-center shrink-0">
                    <X className="w-2.5 h-2.5 stroke-[3] text-black" />
                  </div>
                  <span>Invalida requisito de residencia</span>
                </div>
              </div>
            </div>

            <div className="mt-2 bg-zinc-100/80 border border-zinc-200/90 rounded-lg p-2 font-mono text-[7.5px] text-zinc-700 font-semibold leading-snug">
              {audit.item3Reason}
            </div>
          </div>
        </div>

        {/* ── THE CLIMACTIC REJECTION SLAM & LOOP BACK TO START (FAIL) ── */}
        <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 relative z-10">
            {/* Rejection Rubber Stamp */}
            <div className="flex items-center gap-3">
              <div className="rotate-[-2deg] border-3 border-black bg-white text-black px-4 py-2 rounded-xl font-mono font-black text-xs tracking-wider uppercase shadow-md flex items-center gap-2 shrink-0">
                <div className="w-5 h-5 rounded-md bg-zinc-100 border border-black flex items-center justify-center">
                  <X className="w-4 h-4 text-black stroke-[3.5]" />
                </div>
                <span>{audit.rejectionStamp}</span>
              </div>
              <div className="font-mono">
                <span className="text-[10px] font-black uppercase text-black block leading-snug">
                  1 Fallo Formal = Desestimación Inmediata
                </span>
                <span className="text-[8px] text-zinc-600 block leading-tight mt-0.5">
                  "No le puedo recoger el expediente. Pida nueva cita por internet."
                </span>
              </div>
            </div>

            {/* Loop Back to Day 0 (Complete Failure) */}
            <div className="flex items-center gap-2.5 bg-zinc-50 border-2 border-black rounded-xl px-3.5 py-2 font-mono text-[8.5px] shadow-xs shrink-0">
              <RefreshCw className="w-4 h-4 text-black animate-spin [animation-duration:8s] shrink-0" />
              <div>
                <span className="font-black text-black block leading-none">↺ RESET AL DÍA 0 (FAIL)</span>
                <span className="text-[7.5px] text-zinc-600 block leading-none mt-1">4–6 semanas perdidas · Vuelta a empezar</span>
              </div>
            </div>
          </div>

          {/* Retrograde Loop Dotted Path Graphic */}
          <div className="mt-3 pt-2 border-t border-dashed border-zinc-200 flex items-center justify-between font-mono text-[8px] text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              <span>Cero tolerancia en ventanilla · Sin subsanación presencial</span>
            </span>
            <span className="font-bold text-black uppercase tracking-wider">
              ARCHIVO DEFINITIVO
            </span>
          </div>
        </div>
      </div>

      {/* ── MOBILE: Responsive Stack (sm:hidden) ── */}
      <div className="sm:hidden space-y-2.5 py-2 font-mono">
        <div className="p-3 rounded-2xl bg-white border-2 border-black text-black text-center text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs">
          <div className="w-5 h-5 rounded-md bg-zinc-100 border border-black flex items-center justify-center">
            <X className="w-3.5 h-3.5 text-black stroke-[3.5]" />
          </div>
          <span>Ventanilla 04 · {audit.rejectionStamp}</span>
        </div>

        {[
          { doc: audit.item1Title, rule: audit.item1Reason, tag: "Caducado" },
          { doc: audit.item2Title, rule: audit.item2Reason, tag: "Sin Sello" },
          { doc: audit.item3Title, rule: audit.item3Reason, tag: "Con Copago" },
        ].map((item, idx) => (
          <div key={idx} className="p-3.5 rounded-2xl bg-white border border-zinc-300 shadow-xs space-y-2 text-[8.5px]">
            <div className="flex justify-between items-center">
              <span className="font-bold text-black font-syne text-[11px]">{item.doc}</span>
              <span className="text-[7.5px] bg-white border-2 border-black px-2 py-0.5 rounded-full font-black uppercase flex items-center gap-1">
                <X className="w-2.5 h-2.5 stroke-[3] text-black" />
                <span>{item.tag}</span>
              </span>
            </div>
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-lg p-2 text-zinc-700 text-[8px] leading-snug">
              {item.rule}
            </div>
          </div>
        ))}

        <div className="p-3 rounded-xl bg-white border-2 border-black text-center text-[8.5px] font-black text-black shadow-xs flex items-center justify-center gap-2">
          <RefreshCw className="w-3.5 h-3.5 text-black animate-spin [animation-duration:8s]" />
          <span>↺ RESET AL DÍA 0: 4–6 SEMANAS PERDIDAS</span>
        </div>
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
    if (!isActive) return;
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
      <div className="flex flex-col items-center p-2.5 sm:p-4 bg-zinc-100 rounded-xl sm:rounded-2xl border border-zinc-300 shadow-sm">
        <span className="font-mono text-2xl sm:text-3xl font-extrabold text-black leading-none">∞</span>
        <span className="font-mono text-[8.5px] sm:text-[10px] uppercase tracking-wider text-zinc-700 mt-1 sm:mt-1.5 text-center leading-snug font-bold">
          {label}
        </span>
        {sublabel && (
          <span className="font-mono text-[8px] sm:text-[9px] text-zinc-500 text-center leading-snug mt-0.5">{sublabel}</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-zinc-300 bg-zinc-100 shadow-sm">
      <span className="font-mono text-2xl sm:text-3xl font-extrabold leading-none text-black">
        {isActive ? value : 0}{suffix}
      </span>
      <span className="font-mono text-[8.5px] sm:text-[10px] uppercase tracking-wider mt-1 sm:mt-1.5 text-center leading-snug text-zinc-800 font-bold">
        {label}
      </span>
      {sublabel && (
        <span className="font-mono text-[8px] sm:text-[9px] text-center mt-0.5 leading-snug text-zinc-500">{sublabel}</span>
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

// ─── Exported Web Dashboard Mockups from Reusable BrowserWindow ───────────────
export {
  BrowserWindow,
  NieRouteView,
  PaprsDetailPhoneScreen,
  PaprsWebDashboard,
  PaprsWebDashboardCard,
  RelocationHubView,
};

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
  const { dict } = useLanguage();



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

  // Mobile & tablet scroll interpolation (continuous full-viewport motion from top-right scattered to bottom-center Slide 0 pile)
  const m1 = { x: interp(progress, 0, 0.18, 14, -2),  y: interp(progress, 0, 0.18, -28, 24),  r: interp(progress, 0, 0.18, -14, -4) };
  const m2 = { x: interp(progress, 0, 0.18, 36,  3),  y: interp(progress, 0, 0.18, -24, 28),  r: interp(progress, 0, 0.18,  12,  8) };
  const m3 = { x: interp(progress, 0, 0.18, 18, -3),  y: interp(progress, 0, 0.18, -18, 27),  r: interp(progress, 0, 0.18,  -8, -8) };
  const m4 = { x: interp(progress, 0, 0.18, 30,  2),  y: interp(progress, 0, 0.18, -34, 22),  r: interp(progress, 0, 0.18,   5,  4) };

  const SW = 100 / 5;

  const getStickyTranslate = (p: number): number => {
    if (p < 0.30) return 0;
    if (p < 0.34) return interp(p, 0.30, 0.34, 0, SW);
    if (p < 0.46) return SW;
    if (p < 0.50) return interp(p, 0.46, 0.50, SW, SW * 2);
    if (p < 0.62) return SW * 2;
    if (p < 0.66) return interp(p, 0.62, 0.66, SW * 2, SW * 3);
    if (p < 0.78) return SW * 3;
    if (p < 0.82) return interp(p, 0.78, 0.82, SW * 3, SW * 4);
    return SW * 4;
  };

  const translatePercent = progress >= 0.18 ? getStickyTranslate(progress) : 0;
  const activeSlide = Math.min(4, Math.round(translatePercent / SW));
  const sliderOpacity = interp(progress, 0.97, 1.0, 1, 0);

  const headlineLeft = dict.hero.headlineLeft;
  const headlineRight = dict.hero.headlineRight;

  return (
    <div ref={ref} id="pain" className="story-section story-section--hero relative h-[500svh] w-full z-30">
      <div className="story-viewport sticky top-0 flex h-[100svh] w-full flex-col lg:flex-row z-30">

        {/* ── BACKGROUNDS ── */}
        {progress < 0.18 && (
          <>
            <div
              className="absolute top-0 left-0 z-0 hidden h-full transition-all duration-100 lg:block"
              style={{ width: `${leftWidth}%`, backgroundColor: leftBgColor }}
            />
            <div
              className="absolute top-0 right-0 z-0 hidden h-full bg-[#FFFFFF] transition-all duration-100 lg:block"
              style={{ width: `${rightWidth}%` }}
            />
            <div className="absolute inset-0 z-0 bg-[#FFFFFF] lg:hidden" />
          </>
        )}

        {/* ── HERO (progress < 0.18) ── */}
        {progress < 0.18 && (
          <>
            {/* Responsive gradient divider: vertical on desktop, horizontal when stacked. */}
            <div
              className="pointer-events-none absolute inset-0 z-30"
              style={{ opacity: heroTextOpacity }}
            >
              <div 
                className="hero-divider hero-divider--vertical absolute top-24 bottom-24 left-1/2 hidden w-[1.5px] -translate-x-1/2 bg-gradient-to-b from-transparent via-black/25 to-transparent lg:block"
              />
              <div
                className="hero-divider hero-divider--horizontal absolute top-1/2 right-5 left-5 h-[1.5px] -translate-y-1/2 bg-gradient-to-r from-transparent via-black/25 to-transparent sm:right-12 sm:left-12 lg:hidden"
              />
            </div>

            {/* Legacy combined mobile hero is replaced by the stacked split below. */}
            <div
              className="mobile-hero hidden"
              style={{ opacity: heroTextOpacity }}
            >
              <div className="inline-flex items-center gap-1.5 bg-zinc-100 border border-zinc-300/80 px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest text-black mb-4 shadow-2xs">
                <span className="text-zinc-500">{dict.hero.withoutPaprs}</span>
                <span className="text-zinc-400">→</span>
                <span className="text-black">{dict.hero.withPaprs}</span>
              </div>

              <div className="max-w-md w-full p-5 sm:p-7 rounded-3xl glass-card-subtle transition-all pointer-events-auto border border-zinc-200/80 shadow-xl bg-white/90 backdrop-blur-md">
                <h1 className="text-3xl sm:text-4xl font-black tracking-[-0.04em] font-syne leading-[1.05] mb-2.5 text-black">
                  {headlineLeft}
                  <span className="block text-zinc-500 font-semibold text-2xl sm:text-3xl mt-1">
                    {headlineRight}
                  </span>
                </h1>

                <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed font-medium mb-5 max-w-xs mx-auto">
                  {dict.hero.descRight}
                </p>

                <a
                  href="#pain"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black text-white border border-black hover:bg-zinc-800 transition-all font-syne font-bold text-xs tracking-wider uppercase shadow-md active:scale-95"
                >
                  {dict.hero.getStarted}
                  <ChevronRight className="w-3.5 h-3.5 text-white" />
                </a>
              </div>
            </div>

            {/* Problem / solution split: horizontal on desktop, vertical on narrow screens. */}
            <div
              className="hero-split pointer-events-none absolute inset-0 z-30 flex flex-col lg:flex-row"
              style={{ opacity: heroTextOpacity }}
            >
              <div className="hero-split-panel hero-problem-panel flex h-1/2 w-full flex-col justify-between p-5 pt-20 sm:p-8 sm:pt-24 lg:h-full lg:w-1/2 lg:p-16">
                <span className="hero-split-label font-mono text-[9px] font-extrabold tracking-[0.2em] text-black uppercase sm:text-xs lg:text-sm">{dict.hero.withoutPaprs}</span>
                <div
                  className="hero-split-card glass-card-subtle max-w-xl rounded-3xl p-4 transition-all sm:p-6 lg:p-8"
                >
                  <h1 className="hero-split-heading mb-2 font-syne text-2xl leading-[0.98] font-black tracking-[-0.04em] text-black sm:mb-3 sm:text-4xl lg:mb-5 lg:text-[4rem] xl:text-[4.75rem]">
                    {headlineLeft.split(" ").map((word, wi) => (
                      <span key={wi} className="inline-block whitespace-nowrap mr-[0.16em]">
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
                  <p className="hero-split-description max-w-md font-sans text-[11px] leading-relaxed font-medium text-zinc-600 sm:text-sm lg:text-base">
                    {dict.hero.descLeft}
                  </p>
                </div>
                <div className="h-4" />
              </div>

              <div className="hero-split-panel hero-solution-panel pointer-events-none z-30 flex h-1/2 w-full flex-col justify-between p-5 sm:p-8 lg:h-full lg:w-1/2 lg:p-16">
                <span className="hero-split-label self-start text-left font-mono text-[9px] font-extrabold tracking-[0.2em] text-black uppercase sm:text-xs lg:self-end lg:text-right lg:text-sm">{dict.hero.withPaprs}</span>
                <div
                  className="hero-split-card glass-card-subtle max-w-xl rounded-3xl p-4 transition-all sm:p-6 lg:p-8"
                >
                  <h1 className="hero-split-heading mb-2 font-syne text-2xl leading-[0.98] font-black tracking-[-0.04em] text-black sm:mb-3 sm:text-4xl lg:mb-5 lg:text-[4rem] xl:text-[4.75rem]">
                    {headlineRight.split(" ").map((word, wi) => (
                      <span key={wi} className="inline-block whitespace-nowrap mr-[0.16em]">
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
                  <p className="hero-split-description max-w-md font-sans text-[11px] leading-relaxed font-medium text-zinc-600 sm:text-sm lg:text-base">
                    {dict.hero.descRight}
                  </p>
                  <a
                    href="#pain"
                    className="ink-button pointer-events-auto mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-black px-4 py-2 font-syne text-[10px] font-bold tracking-wider text-white uppercase shadow-md lg:hidden"
                  >
                    {dict.hero.getStarted}
                    <ChevronRight className="h-3 w-3 text-white" />
                  </a>
                </div>
                <div className="h-4" />
              </div>
            </div>

            {/* Scattered documents stay visible at every breakpoint. */}
            <div className="hero-chaos-visual pointer-events-none absolute inset-0 z-10 lg:opacity-55">
              {[
                { d: d1, m: m1 },
                { d: d2, m: m2 },
                { d: d3, m: m3 },
                { d: d4, m: m4 },
              ].map(({ d, m }, i) => (
                <div
                  key={i}
                  className={`hero-chaos-card hero-chaos-card--${i} transition-all duration-100 ease-out`}
                  style={{
                    "--desktop-x": `${d.x}vw`,
                    "--desktop-y": `${d.y}vh`,
                    "--desktop-r": `${d.r}deg`,
                    "--mobile-x": `${m.x}vw`,
                    "--mobile-y": `${m.y}vh`,
                    "--mobile-r": `${m.r}deg`,
                    zIndex: i + 1,
                  } as React.CSSProperties}
                >
                  <div
                    className="hero-paper-drift"
                    style={{
                      "--paper-drift-delay": `${i * -1.15}s`,
                      "--paper-drift-distance": `${6 + i * 1.5}px`,
                    } as React.CSSProperties}
                  >
                    <DocumentCard
                      type={["nie","seg_social","padron","hacienda"][i] as "nie"|"seg_social"|"padron"|"hacienda"}
                      status="chaos"
                      shadow={i === 3 ? "shadow-2xl" : i === 2 ? "shadow-lg" : "shadow-md"}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Clean dashboard remains part of the solution story on every screen. */}
            <div className="hero-dashboard-visual pointer-events-none absolute inset-0 z-20 flex items-center justify-end overflow-hidden lg:pr-8 xl:pr-12">
              <div
                className="hero-dashboard-frame relative w-full max-w-[560px] transition-all duration-100 md:max-w-[580px] lg:max-w-[580px] xl:max-w-[620px]"
                style={{ transform: `translateX(${rightCardsX}%) translateY(var(--hero-dashboard-y, 0px)) scale(var(--hero-dashboard-scale, 1))` } as React.CSSProperties}
              >
                <div className="hero-dashboard-surface">
                  <PaprsWebDashboard
                    style={{
                      WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 20%, rgba(0,0,0,0.65) 48%, rgba(0,0,0,1) 70%, #000 100%)",
                      maskImage: "linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 20%, rgba(0,0,0,0.65) 48%, rgba(0,0,0,1) 70%, #000 100%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── PAIN SLIDES (progress >= 0.18) ── */}
        {progress >= 0.18 && (
          <div className="absolute inset-0 w-full h-full overflow-hidden z-30 flex items-center">
            <div
              className="flex h-full"
              style={{
                transform: `translateX(-${translatePercent}%)`,
                width: "500%",
              }}
            >

              {/* SLIDE 0 — The First Request / Document Pile */}
              <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none relative overflow-hidden">
                <div className="pain-slide-layout relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20">
                  {/* Faint spatial blueprint grid background matching subsequent slides */}
                  <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none -z-10" />
                  <div className="absolute top-12 left-6 text-zinc-300 font-mono text-xs pointer-events-none hidden sm:block">+</div>
                  <div className="absolute top-12 right-6 text-zinc-300 font-mono text-xs pointer-events-none hidden sm:block">+</div>
                  <div className="absolute bottom-12 left-6 text-zinc-300 font-mono text-xs pointer-events-none hidden sm:block">+</div>
                  <div className="absolute bottom-12 right-6 text-zinc-300 font-mono text-xs pointer-events-none hidden sm:block">+</div>

                  <div className="pain-slide-copy relative z-[2] flex w-full flex-col justify-center gap-3 pr-0 sm:gap-4 sm:pr-4 lg:w-5/12">
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-black font-extrabold">{dict.pain.mondayTime}</span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-black leading-[1.08] font-syne">
                      {dict.pain.moveDone}
                      <br />
                      <span className="text-zinc-500 font-normal text-lg sm:text-2xl md:text-3xl">{dict.pain.moveDoneSub}</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-sm">
                      {dict.pain.employerAsks}
                    </p>
                    <div className="flex items-start gap-2 sm:gap-2.5 bg-zinc-100 border border-zinc-300 rounded-xl px-3 sm:px-3.5 py-2.5 sm:py-3 max-w-sm">
                      <AlertTriangle className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-black flex-shrink-0 mt-0.5" />
                      <p className="text-[11px] sm:text-xs text-black leading-snug font-mono font-medium">
                        {dict.pain.alertOneQuestion}
                      </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-zinc-500 font-mono text-[9px] font-medium pt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                      <span>Scroll to start processing your NIE →</span>
                    </div>
                  </div>

                  <div className="pain-slide-visual pain-slide-pile-visual relative z-[1] flex w-full items-center justify-center lg:w-6/12 h-56 sm:h-64 md:h-72 lg:h-[380px]">
                    <div className="pain-document-visual relative w-full h-full flex items-center justify-center">
                      {/* Visual link pointing to top document in pile */}
                      <div className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap z-20">
                        <span>Target 01: NIE Card</span>
                        <span className="text-zinc-400">→</span>
                      </div>

                      <div className="absolute left-1/2 top-1/2 paper-float" style={{ "--paper-rotate": "-4deg" } as React.CSSProperties}>
                        <div style={{ transform: "translate(calc(-50% + var(--pile-x-1, -6px)), calc(-50% + var(--pile-y-1, -4px))) rotate(-4deg)" }}>
                          <DocumentCard type="nie" status="chaos" shadow="shadow-md" />
                        </div>
                      </div>
                      <div className="absolute left-1/2 top-1/2 paper-float [animation-delay:-1.4s]" style={{ "--paper-rotate": "8deg" } as React.CSSProperties}>
                        <div style={{ transform: "translate(calc(-50% + var(--pile-x-2, 10px)), calc(-50% + var(--pile-y-2, 8px))) rotate(8deg)" }}>
                          <DocumentCard type="seg_social" status="chaos" shadow="shadow-lg" />
                        </div>
                      </div>
                      <div className="absolute left-1/2 top-1/2 paper-float [animation-delay:-2.7s]" style={{ "--paper-rotate": "-8deg" } as React.CSSProperties}>
                        <div style={{ transform: "translate(calc(-50% + var(--pile-x-3, -8px)), calc(-50% + var(--pile-y-3, 6px))) rotate(-8deg)" }}>
                          <DocumentCard type="padron" status="chaos" shadow="shadow-xl" />
                        </div>
                      </div>
                      <div className="absolute left-1/2 top-1/2 paper-float [animation-delay:-3.6s]" style={{ "--paper-rotate": "4deg" } as React.CSSProperties}>
                        <div style={{ transform: "translate(calc(-50% + var(--pile-x-4, 8px)), calc(-50% + var(--pile-y-4, -6px))) rotate(4deg)" }}>
                          <DocumentCard type="hacienda" status="chaos" shadow="shadow-2xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SLIDE 1 — The Circular Trap (The Spanish Catch-22) */}
              <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none relative overflow-hidden">
                <div className="pain-slide-layout relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 gap-4 sm:gap-8">
                  <div className="pain-slide-copy relative z-[2] flex w-full flex-col justify-center gap-3 pr-0 sm:gap-4 sm:pr-2 lg:w-[38%]">
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-black font-extrabold">{dict.pain.circularTrapTag}</span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-black leading-[1.08] font-syne">
                      {dict.pain.circularTrapTitle}
                      <br />
                      <span className="text-zinc-500 font-normal text-lg sm:text-2xl md:text-3xl">{dict.pain.circularTrapSub}</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-sm">
                      {dict.pain.circularTrapDesc}
                    </p>
                    <div className="flex items-start gap-2 sm:gap-2.5 bg-zinc-100 border border-zinc-300 rounded-xl px-3 sm:px-3.5 py-2.5 sm:py-3 max-w-sm">
                      <AlertTriangle className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-black flex-shrink-0 mt-0.5" />
                      <p className="text-[11px] sm:text-xs text-black leading-snug font-mono font-medium">
                        {dict.pain.circularTrapAlert}
                      </p>
                    </div>
                  </div>

                  <div className="pain-slide-visual relative z-[1] flex w-full items-center justify-center lg:w-[62%]">
                    <CircularTrapVisual
                      nodes={dict.pain.circularNodes}
                      deadlock={dict.pain.deadlockCenter}
                    />
                  </div>
                </div>
              </div>

              {/* SLIDE 2 — Which Office, Which Website, Which Form */}
              <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none relative overflow-hidden">
                <div className="pain-slide-layout relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 gap-4 sm:gap-8">
                  <div className="pain-slide-copy relative z-[2] flex w-full flex-col justify-center gap-3 pr-0 sm:gap-4 sm:pr-2 lg:w-[38%]">
                    <div className="flex items-center gap-2">
                      <Search className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-black" />
                      <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-black font-extrabold">{dict.pain.citaBlackoutTag}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-black leading-tight font-syne whitespace-pre-line">
                      {dict.pain.citaBlackoutTitle}
                      <span className="block text-zinc-500 font-sans text-sm sm:text-base font-normal mt-1">{dict.pain.citaBlackoutSub}</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-sm">
                      {dict.pain.citaBlackoutDesc}
                    </p>
                    <div className="flex items-center gap-2 sm:gap-3 mt-1">
                      <div className="inline-flex items-center gap-1.5 h-7 sm:h-8 px-2.5 sm:px-3 rounded-lg border border-zinc-300 bg-zinc-100 font-mono text-[11px] sm:text-xs font-bold text-black leading-none select-none">
                        <Search className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-black flex-shrink-0" />
                        <span>{dict.pain.noSlotsStatus}</span>
                      </div>
                      <div className="inline-flex items-center justify-center h-7 sm:h-8 px-2.5 sm:px-3 rounded-lg border border-zinc-300 bg-zinc-100 font-mono text-[11px] sm:text-xs font-semibold text-black leading-none select-none">
                        <span>{dict.pain.alt060}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pain-slide-visual relative z-[3] flex w-full items-center justify-center lg:w-[62%]">
                    <SedeBlackoutVisual
                      path={dict.pain.painPath}
                      sim={dict.pain.sedeSim}
                      alertTitle={dict.pain.sedeAlertTitle}
                      alertMessage={dict.pain.sedeAlertMessage}
                    />
                  </div>
                </div>
              </div>

              {/* SLIDE 3 — The Window Ambush */}
              <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
                <div className="pain-slide-layout relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 gap-4 sm:gap-8">
                  <div className="pain-slide-copy flex w-full flex-col justify-center gap-3 pr-0 sm:gap-4 sm:pr-2 lg:w-[38%]">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-black" />
                      <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-black font-extrabold">{dict.pain.windowAmbushTag}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-black leading-tight font-syne">
                      {dict.pain.windowAmbushTitle}
                      <span className="block text-zinc-500 font-sans text-sm sm:text-base font-normal mt-1">{dict.pain.windowAmbushSub}</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-sm">
                      {dict.pain.windowAmbushDesc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[8.5px]">
                      <div className="bg-white border border-zinc-300 rounded-xl p-2.5 shadow-2xs flex items-start gap-2">
                        <div className="w-4 h-4 rounded bg-white border-2 border-black text-black flex items-center justify-center shrink-0 mt-0.5">
                          <Clock className="w-2.5 h-2.5 stroke-[2.5]" />
                        </div>
                        <div>
                          <span className="text-[7px] text-zinc-500 font-bold uppercase block">Official Speed</span>
                          <span className="text-zinc-900 font-bold leading-tight block">90-Sec Desk Verdict</span>
                        </div>
                      </div>
                      <div className="bg-white border border-zinc-300 rounded-xl p-2.5 shadow-2xs flex items-start gap-2">
                        <div className="w-4 h-4 rounded bg-white border-2 border-black text-black flex items-center justify-center shrink-0 mt-0.5">
                          <X className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <div>
                          <span className="text-[7px] text-zinc-500 font-bold uppercase block">Grace Period</span>
                          <span className="text-zinc-900 font-bold leading-tight block">0 Days (Dismissed)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pain-slide-visual w-full lg:w-[62%] flex items-center justify-center">
                    <WindowAmbushVisual audit={dict.pain.deskAudit} />
                  </div>
                </div>
              </div>

              {/* SLIDE 4 (FINAL SLIDE) — The real cost (KEPT AS IT IS) */}
              <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none relative overflow-hidden">
                <div className="pain-slide-layout relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20">
                  {/* Faint spatial blueprint grid background matching earlier slides */}
                  <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none -z-10" />
                  <div className="absolute top-12 left-6 text-zinc-300 font-mono text-xs pointer-events-none hidden sm:block">+</div>
                  <div className="absolute top-12 right-6 text-zinc-300 font-mono text-xs pointer-events-none hidden sm:block">+</div>
                  <div className="absolute bottom-12 left-6 text-zinc-300 font-mono text-xs pointer-events-none hidden sm:block">+</div>
                  <div className="absolute bottom-12 right-6 text-zinc-300 font-mono text-xs pointer-events-none hidden sm:block">+</div>
                  <div
                    className="pain-slide-copy pain-cost-copy glass-card-subtle relative z-30 flex w-full flex-col justify-center gap-3 rounded-2xl p-4 transition-all sm:gap-4 sm:rounded-3xl sm:p-6 md:p-8 lg:w-5/12"
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-black" />
                      <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-black font-extrabold">{dict.pain.hiddenWorkloadTag}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-black leading-tight font-syne">
                      {dict.pain.hardPartTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-xs">
                      {dict.pain.hardPartDesc}
                    </p>
                    <div className="flex flex-col gap-2 sm:gap-2.5 mt-1">
                      <div className="flex items-center gap-2 text-[11px] sm:text-xs text-zinc-700 font-mono font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                        {dict.pain.repeatedDetailsBullet}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] sm:text-xs text-zinc-700 font-mono font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                        {dict.pain.similarAcronymsBullet}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] sm:text-xs text-black font-mono font-bold">
                        <div className="w-1.5 h-1.5 rounded-full bg-black" />
                        {dict.pain.unavailableSlotBullet}
                      </div>
                    </div>
                  </div>

                  <div className="pain-slide-visual pain-cost-visual relative z-10 flex w-full flex-col gap-2.5 lg:w-6/12">
                    <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                      <StatCounter
                        target={6}
                        label={dict.pain.stats.officialSystems.label}
                        sublabel={dict.pain.stats.officialSystems.sublabel}
                        isActive={activeSlide === 4}
                      />
                      <StatCounter
                        target={3}
                        label={dict.pain.stats.similarForms.label}
                        sublabel={dict.pain.stats.similarForms.sublabel}
                        isActive={activeSlide === 4}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                      <StatCounter
                        target={2}
                        label={dict.pain.stats.bookingPortals.label}
                        sublabel={dict.pain.stats.bookingPortals.sublabel}
                        isActive={activeSlide === 4}
                      />
                      <StatCounter
                        target={1}
                        label={dict.pain.stats.missingSignature.label}
                        sublabel={dict.pain.stats.missingSignature.sublabel}
                        isActive={activeSlide === 4}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                      <StatCounter
                        target={5}
                        label={dict.pain.stats.repeatedDetails.label}
                        sublabel={dict.pain.stats.repeatedDetails.sublabel}
                        isActive={activeSlide === 4}
                      />
                      <StatCounter
                        target={0}
                        label={dict.pain.stats.openTabs.label}
                        isActive={activeSlide === 4}
                        variant="infinity"
                      />
                    </div>
                    <p className="text-center font-mono text-[9px] sm:text-[10px] text-zinc-500 pt-1 italic font-medium">
                      {dict.pain.noSingleStep}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}



        {/* ── SLIDE DOTS ── */}
        {progress >= 0.18 && (
          <div
            className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 transition-opacity duration-300"
            style={{ opacity: sliderOpacity }}
          >
            <SlideDots total={5} active={activeSlide} />
          </div>
        )}

        {/* ── SCROLL HINT ── */}
        {progress >= 0.18 && progress < 0.92 && (
          <div
            className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-40 flex items-center gap-2 transition-opacity duration-500"
            style={{ opacity: interp(progress, 0.18, 0.26, 0, 0.55) }}
          >
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-zinc-500 font-bold">{dict.hero.scrollToContinue}</span>
            <Globe className="scroll-cue-motion h-3 w-3 text-black" />
          </div>
        )}

        {/* ── HERO CTA BUTTON (Desktop) ── */}
        {progress < 0.13 && (
          <div
            className="pointer-events-auto absolute top-[80%] left-1/2 z-40 hidden transition-all duration-300 lg:block"
            style={{
              opacity: heroTextOpacity,
              transform: `translate(-50%, -50%) scale(${interp(progress, 0, 0.10, 1, 0.8)})`,
            }}
          >
            <a
              href="#pain"
              className="ink-button flex items-center justify-center gap-3 rounded-full border border-black bg-black px-8 py-4 font-syne text-xs font-bold tracking-wider whitespace-nowrap text-white uppercase shadow-xl"
            >
              {dict.hero.getStarted}
              <ChevronRight className="w-4 h-4 text-white" />
            </a>
          </div>
        )}

        {/* ── SCROLL INDICATOR ── */}
        {progress < 0.08 && (
          <div className="scroll-cue-motion absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 lg:block">
            <a href="#pain" className="flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-600 mb-1 font-bold">{dict.hero.scroll}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </a>
          </div>
        )}



      </div>
    </div>
  );
}
