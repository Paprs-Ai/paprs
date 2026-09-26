"use client";

import React from "react";
import { ThinkingOrb, type OrbState } from "thinking-orbs";

// "Building your route" screen: the app thinking through a case the way a
// consultant would, one aspect of the bureaucracy at a time. Scroll-driven —
// `progress` (0–1) rolls a wheel of thoughts past a large orb; the dots on the
// left are joined by a line, so the reasoning reads as one connected chain.
// There is no "done" state: the orb keeps working.
type Thought = { aspect: string; text: string; orb: OrbState };

const THOUGHTS: Thought[] = [
  { aspect: "Residency", text: "Which permit do you hold, and how many days does it have left?", orb: "listening" },
  { aspect: "Work & income", text: "Does your work plan change which route fits you?", orb: "searching" },
  { aspect: "Housing", text: "Is there a lease or address proof to support your padrón?", orb: "solving" },
  { aspect: "Tax", text: "Which tax ID steps only unlock after your NIE?", orb: "weaving" },
  { aspect: "Social Security", text: "What has to exist before an employer can register you?", orb: "searching" },
  { aspect: "Deadlines", text: "Counting back from the first date that cannot move.", orb: "composing" },
];

const ROW_H = 56;
const WHEEL_H = 230;

export function BuildingRouteView({ progress }: { progress: number }) {
  const last = THOUGHTS.length - 1;
  // Continuous position along the wheel (0 … last)
  const pos = Math.max(0, Math.min(1, progress)) * last;
  const active = Math.round(pos);
  const finished = progress >= 0.98;
  const orbState: OrbState = finished ? "working" : THOUGHTS[active].orb;

  // Put the row at `pos` in the vertical centre of the wheel
  const offset = WHEEL_H / 2 - ROW_H / 2 - pos * ROW_H;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-white px-6 select-none">
      {/* Large orb */}
      <div className="flex h-[150px] w-full shrink-0 items-center justify-center">
        <div style={{ transform: "scale(2.1)" }}>
          <ThinkingOrb state={orbState} size={64} theme="light" />
        </div>
      </div>

      {/* Wheel of thoughts */}
      <div
        className="relative w-full max-w-[400px] shrink-0 overflow-hidden"
        style={{
          height: WHEEL_H,
          maskImage: "linear-gradient(to bottom, transparent 0%, #000 28%, #000 72%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 28%, #000 72%, transparent 100%)",
        }}
      >
        {/* Connecting line behind the dots */}
        <div
          className="absolute left-[7px] w-px bg-zinc-300"
          style={{ top: offset + ROW_H / 2, height: last * ROW_H }}
          aria-hidden="true"
        />
        <div
          className="absolute left-[7px] w-px bg-black"
          style={{ top: offset + ROW_H / 2, height: pos * ROW_H }}
          aria-hidden="true"
        />

        <div className="relative" style={{ transform: `translateY(${offset}px)` }}>
          {THOUGHTS.map((t, i) => {
            const d = Math.abs(i - pos);
            const opacity = Math.max(0.18, 1 - d * 0.6);
            const reached = i <= pos + 0.5;
            return (
              <div key={t.aspect} className="flex items-center gap-3" style={{ height: ROW_H, opacity }}>
                <span
                  className={`relative z-10 h-[15px] w-[15px] shrink-0 rounded-full border-2 bg-white transition-all duration-300 ${
                    reached ? "border-black" : "border-zinc-300"
                  }`}
                >
                  {reached && <span className="absolute inset-[2px] rounded-full bg-black" />}
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[7.5px] font-bold uppercase tracking-widest text-zinc-500">{t.aspect}</p>
                  <p
                    className="font-syne font-extrabold leading-tight text-black"
                    style={{ fontSize: d < 0.5 ? 12 : 10 }}
                  >
                    {t.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
