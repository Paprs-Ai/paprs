"use client";

import React from "react";
import { Check, CheckCircle2, ChevronRight, FileText, Folder, MousePointer2, Upload, X } from "lucide-react";
import { ThinkingOrb, type OrbState } from "thinking-orbs";

// ─── Vault upload walkthrough ────────────────────────────────────────────────
// Scroll-driven like the other How it works slides: `progress` (0–1 across the
// slide) picks the stage, so each part plays as the user scrolls and rewinds
// when they scroll back. Cursor → dropzone → Finder-style picker → file chosen →
// upload → Paprs reads it → a new action plan appears.
//
// Stages: 0 idle · 1 cursor → dropzone · 2 dropzone clicked · 3 picker opens ·
// 4 cursor → file · 5 file selected · 6 cursor → Open · 7 Open pressed ·
// 8 uploading · 9–12 reading steps · 13 all checks done · 14 action plan created
// Progress at which each stage begins. The two clicks get their own room so the
// press is visible before the picker opens / closes.
const STAGE_STARTS = [0, 0.04, 0.12, 0.17, 0.24, 0.32, 0.38, 0.46, 0.5, 0.58, 0.65, 0.72, 0.79, 0.85, 0.9];

// Orb state while a file is being processed (stages 8–13)
const ORB_BY_STAGE: Partial<Record<number, OrbState>> = {
  8: "connecting",
  9: "listening",
  10: "searching",
  11: "solving",
  12: "weaving",
  13: "composing",
};

// Cursor position (% of the viewport) per stage
const CURSOR: Array<{ x: number; y: number }> = [
  { x: 62, y: 78 }, // 0
  { x: 50, y: 33 }, // 1 dropzone
  { x: 50, y: 33 }, // 2
  { x: 50, y: 33 }, // 3
  { x: 55, y: 47 }, // 4 file row
  { x: 55, y: 47 }, // 5
  { x: 77, y: 66 }, // 6 Open button
  { x: 77, y: 66 }, // 7
  { x: 60, y: 62 }, // 8+
];

const FILES = [
  { name: "Passport_scan.pdf", meta: "1.2 MB" },
  { name: "University_letter.pdf", meta: "340 KB" },
  { name: "Lease_Agreement_Gracia.pdf", meta: "2.1 MB" },
  { name: "Bank_statement_Aug.pdf", meta: "780 KB" },
];

const READING_STEPS = [
  "Reading document",
  "Detected: Lease agreement",
  "Extracted address, term & tenant",
  "Matched to your Spain route",
];

export function VaultUploadDemo({ progress }: { progress: number }) {
  let stage = 0;
  for (let i = 0; i < STAGE_STARTS.length; i++) if (progress >= STAGE_STARTS[i]) stage = i;

  const pickerOpen = stage >= 3 && stage <= 7;
  const fileSelected = stage >= 5;
  const uploading = stage >= 8 && stage < 14;
  const created = stage >= 14;
  const cursor = CURSOR[Math.min(stage, CURSOR.length - 1)];
  const currentStep = stage - 9; // -1 while uploading, 4 once every check is done

  const docs = [
    { name: "University_letter.pdf", type: "Enrolment certificate", when: "2 days ago" },
    { name: "Address_certificate.pdf", type: "Certificado de empadronamiento", when: "5 days ago" },
    { name: "Passport_scan.pdf", type: "Passport", when: "2 weeks ago" },
  ];
  const listCount = docs.length + (stage >= 8 ? 1 : 0);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-zinc-50/40 p-3.5 sm:p-4 select-none">
      {/* Page header */}
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-zinc-200/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100">
            <FileText className="h-4 w-4 text-black" />
          </div>
          <div>
            <h4 className="font-syne text-[12px] font-extrabold leading-tight text-black">Document Vault</h4>
            <p className="mt-0.5 font-mono text-[6.5px] text-zinc-500">Encrypted storage for passports, certificates, and tax filings</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center rounded-lg bg-zinc-100 p-0.5 font-mono text-[6.5px] font-bold">
          <span className="rounded-md bg-white px-2 py-1 text-black shadow-2xs">Documents ({listCount})</span>
          <span className="px-2 py-1 text-zinc-500">Connected Senders (0)</span>
        </div>
      </div>

      {/* Upload dropzone */}
      <div
        className={`mt-3 flex shrink-0 flex-col items-center justify-center rounded-2xl border-2 px-4 py-4 text-center transition-all duration-200 ${
          created ? "border-solid border-black" : uploading ? "border-dashed border-black" : "border-dashed border-zinc-200"
        } bg-white ${stage === 2 ? "scale-[0.985] bg-zinc-50" : ""}`}
        style={{ height: 150 }}
      >
        {created ? (
          <div className="flex w-full flex-col items-center gap-1.5" style={{ animation: "vaultRowIn 450ms cubic-bezier(0.16,1,0.3,1) both" }}>
            <span className="flex items-center gap-1 font-mono text-[6.5px] font-extrabold uppercase tracking-wider text-black">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-black" /> New action plan created
            </span>
            <h5 className="font-syne text-[9.5px] font-extrabold leading-tight text-black">Update Padrón address</h5>
            <p className="font-mono text-[6.5px] leading-snug text-zinc-500">
              New lease found: Carrer de Mallorca 214, Barcelona. Registration form pre-filled.
            </p>
            <div className="mt-0.5 flex items-center gap-1">
              {["Lease agreement", "Passport", "Padrón form"].map((c) => (
                <span key={c} className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[6px] font-bold text-black">
                  <Check className="h-2 w-2" /> {c}
                </span>
              ))}
            </div>
            <div className="mt-1 flex items-center justify-center gap-1 rounded-lg border border-black bg-white px-3 py-1 font-mono text-[7px] font-bold uppercase tracking-wider text-black">
              Review action packet <ChevronRight className="h-2.5 w-2.5" />
            </div>
          </div>
        ) : uploading ? (
          <div className="flex w-full flex-col items-center gap-1.5">
            <div style={{ transform: "scale(1.5)" }} className="my-1.5">
              <ThinkingOrb state={ORB_BY_STAGE[stage] ?? "working"} size={32} theme="light" />
            </div>
            <p className="font-syne text-[9.5px] font-extrabold text-black">Uploading &amp; Analysing Document…</p>
            <div className="flex flex-col gap-1">
              {READING_STEPS.map((label, i) => {
                const done = i < currentStep;
                const running = i === currentStep;
                const pending = i > currentStep;
                return (
                  <div
                    key={label}
                    className={`flex items-center gap-1.5 font-mono text-[6.5px] transition-opacity duration-300 ${pending ? "opacity-30" : "opacity-100"} ${
                      running ? "font-bold text-black" : "text-zinc-600"
                    }`}
                  >
                    {done ? (
                      <Check className="h-2.5 w-2.5 shrink-0 text-black" />
                    ) : running ? (
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                        <ThinkingOrb state="working" size={20} theme="light" />
                      </span>
                    ) : (
                      <span className="ml-0.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                    )}
                    <span>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100">
              <Upload className="h-4 w-4 text-black" />
            </div>
            <p className="font-syne text-[9.5px] font-extrabold text-black">Upload an Official Document</p>
            <p className="mt-1 max-w-[220px] font-mono text-[6.5px] leading-relaxed text-zinc-500">
              Drag and drop or click to upload PDF, image, or text. Paprs analyses it immediately and extracts the required steps.
            </p>
          </>
        )}
      </div>

      {/* Document list */}
      <div className="mt-3 flex min-h-0 flex-1 flex-col">
        <span className="mb-1 px-0.5 font-mono text-[7px] font-bold uppercase tracking-wider text-zinc-400">Your Documents ({listCount})</span>
        <div className="flex flex-col divide-y divide-zinc-100 rounded-xl border border-zinc-200/80 bg-white px-2 shadow-2xs">
          {stage >= 8 && (
            <div className="flex items-center justify-between py-2" style={{ animation: "vaultRowIn 350ms cubic-bezier(0.16,1,0.3,1) both" }}>
              <div className="flex min-w-0 items-center gap-2">
                {created ? (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-black" />
                ) : (
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                    <ThinkingOrb state="working" size={20} theme="light" />
                  </span>
                )}
                <div className="min-w-0">
                  <p className="truncate font-syne text-[8.5px] font-extrabold leading-tight text-black">Lease_Agreement_Gracia.pdf</p>
                  <p className="font-mono text-[6.5px] text-zinc-500">{created ? "Lease agreement · just now" : "Processing · just now"}</p>
                </div>
              </div>
              {created && <ChevronRight className="h-3 w-3 shrink-0 text-zinc-400" />}
            </div>
          )}
          {docs.map((d) => (
            <div key={d.name} className="flex items-center justify-between py-2">
              <div className="flex min-w-0 items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-black" />
                <div className="min-w-0">
                  <p className="truncate font-syne text-[8.5px] font-extrabold leading-tight text-black">{d.name}</p>
                  <p className="font-mono text-[6.5px] text-zinc-500">{d.type} · {d.when}</p>
                </div>
              </div>
              <ChevronRight className="h-3 w-3 shrink-0 text-zinc-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Finder-style file picker */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 w-[64%] overflow-hidden rounded-lg border border-zinc-300 bg-white shadow-[0_18px_45px_-10px_rgba(0,0,0,0.35)]"
        style={{
          opacity: pickerOpen ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${pickerOpen ? 1 : 0.94})`,
          transition: "opacity 200ms ease-out, transform 250ms cubic-bezier(0.16,1,0.3,1)",
        }}
        aria-hidden="true"
      >
        <div className="flex items-center gap-1.5 border-b border-zinc-200 bg-zinc-100 px-2.5 py-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-amber-400/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
          <span className="mx-auto font-mono text-[7px] font-bold text-zinc-600">Choose a file to upload</span>
        </div>
        <div className="flex h-[128px]">
          <div className="flex w-[32%] flex-col gap-1 border-r border-zinc-200 bg-zinc-50 p-2 font-mono text-[6.5px] text-zinc-500">
            <span className="font-bold uppercase tracking-wider text-zinc-400">Favourites</span>
            {["Recents", "Desktop", "Documents", "Downloads"].map((f) => (
              <span key={f} className={`flex items-center gap-1 ${f === "Documents" ? "font-bold text-black" : ""}`}>
                <Folder className="h-2.5 w-2.5" /> {f}
              </span>
            ))}
          </div>
          <div className="flex flex-1 flex-col p-1.5">
            {FILES.map((f, i) => {
              const selected = fileSelected && i === 2;
              return (
                <div
                  key={f.name}
                  className={`flex items-center justify-between gap-2 rounded px-1.5 py-1 font-mono text-[7px] ${
                    selected ? "bg-black text-white" : "text-zinc-700"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-1">
                    <FileText className="h-2.5 w-2.5 shrink-0" />
                    <span className="truncate">{f.name}</span>
                  </span>
                  <span className={selected ? "text-zinc-300" : "text-zinc-400"}>{f.meta}</span>
                </div>
              );
            })}
            <div className="mt-auto flex justify-end gap-1.5 border-t border-zinc-100 pt-1.5">
              <span className="flex items-center gap-0.5 rounded border border-zinc-300 px-2 py-0.5 font-mono text-[6.5px] font-bold text-zinc-600">
                <X className="h-2 w-2" /> Cancel
              </span>
              <span
                className={`rounded bg-black px-2.5 py-0.5 font-mono text-[6.5px] font-bold text-white transition-transform duration-150 ${
                  stage === 7 ? "scale-90" : ""
                }`}
              >
                Open
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cursor */}
      <div
        className="pointer-events-none absolute z-20"
        style={{
          left: `${cursor.x}%`,
          top: `${cursor.y}%`,
          opacity: stage >= 9 ? 0 : 1,
          transition: "left 350ms cubic-bezier(0.65,0,0.35,1), top 350ms cubic-bezier(0.65,0,0.35,1), opacity 250ms",
        }}
        aria-hidden="true"
      >
        {(stage === 2 || stage === 7) && (
          <span className="absolute -left-2 -top-2 h-5 w-5 animate-ping rounded-full border-2 border-black" />
        )}
        <MousePointer2 className="relative h-4 w-4 fill-black text-white drop-shadow-md" />
      </div>

      <style>{`
        @keyframes vaultRowIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
