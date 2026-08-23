"use client";

import { BrowserPlaceholder, PaprsWebDashboardCard } from "@/app/components/BrowserWindow";
import Lottie from "lottie-react";
import { Bell, Check, ChevronRight, Cpu, FileText, Home, Layers, Loader2, Lock, MapPin, Sparkles } from "lucide-react";
import React, { useEffect, useRef } from "react";
import aiGeneratingAnimation from "../../assets/animations/AI Generating Response.json";
import DocumentCard from "../components/DocumentCard";
import { useScrollProgress } from "../hooks/useScrollProgress";

// ─── Slide dot indicator (monochrome variant) ──────────────────────────────────
function SlideDots({ total, active }: { total: number; active: number }) {
  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-500 ${
            i === active
              ? "w-5 h-1.5 bg-black"
              : "w-1.5 h-1.5 bg-zinc-300"
          }`}
        />
      ))}
    </div>
  );
}

function OutcomePills({ items }: { items: string[] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-zinc-100 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-black"
        >
          <Check className="h-3 w-3" aria-hidden="true" />
          {item}
        </span>
      ))}
    </div>
  );
}

function AIComputingLogger() {
  const [items, setItems] = React.useState([
    { id: 1, text: "Matched the correct residence route" },
    { id: 2, text: "Verified forms, evidence, and fees" },
    { id: 3, text: "Ordered tasks by dependency and deadline" },
  ]);
  const [status, setStatus] = React.useState<"loading" | "done">("loading");

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (status === "loading") {
        setStatus("done");
      } else {
        setItems(prevItems => {
          const next = [...prevItems];
          const first = next.shift();
          if (first) {
            next.push(first);
          }
          return next;
        });
        setStatus("loading");
      }
    }, 1200);

    return () => clearInterval(timer);
  }, [status]);

  return (
    <div className="flex flex-col gap-2 font-mono text-[7.5px] text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-2xl p-3.5 z-10 shadow-sm mb-4 w-full">
      {items.map((item, idx) => {
        const isTop = idx === 0;
        let icon = null;
        let textColor = "text-zinc-400";

        if (isTop) {
          if (status === "loading") {
            icon = <Loader2 className="w-3 h-3 text-black animate-spin shrink-0" />;
            textColor = "text-black font-bold";
          } else {
            icon = <Check className="w-3 h-3 text-black shrink-0" />;
            textColor = "text-black font-bold";
          }
        } else {
          icon = <div className="w-1 h-1 rounded-full bg-zinc-400 shrink-0 ml-1"></div>;
          textColor = "text-zinc-500";
        }

        return (
          <div
            key={item.id}
            className={`flex items-center gap-1.5 transition-all duration-300 ${textColor}`}
          >
            {icon}
            <span className="truncate">{item.text}</span>
          </div>
        );
      })}
    </div>
  );
}

const SLIDE_LABELS = [
  "Chaos, organised",
  "Understand your case",
  "Build your route",
  "Show the next action",
  "Protect every deadline",
  "Track every handoff",
  "Read your documents",
  "Adapt the plan",
  "Act with approval",
];

export default function HowItWorks() {
  const { ref, progress } = useScrollProgress();

  const interp = (val: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    if (val <= inMin) return outMin;
    if (val >= inMax) return outMax;
    return outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);
  };
  const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

  const N = 9;
  const D = 0.08;
  const S = 0.035;
  const SW = 11.1111;

  const getStickyTranslate = (p: number): number => {
    for (let i = 0; i < N - 1; i++) {
      const startDwell = i * (D + S);
      const endDwell = startDwell + D;
      const endSnap = (i + 1) * (D + S);
      
      if (p < startDwell) return i * SW;
      if (p < endDwell) return i * SW;
      if (p < endSnap) return interp(p, endDwell, endSnap, i * SW, (i + 1) * SW);
    }
    return (N - 1) * SW;
  };

  const translatePercent = getStickyTranslate(progress);
  const activeSlide = Math.round(translatePercent / SW);

  const getLocalProgress = (p: number, i: number): number => {
    const startDwell = i * (D + S);
    return clamp01((p - startDwell) / D);
  };

  const s0p = getLocalProgress(progress, 0);
  const s1p = getLocalProgress(progress, 1);
  const s2p = getLocalProgress(progress, 2);
  const s3p = getLocalProgress(progress, 3);
  const s4p = getLocalProgress(progress, 4);
  const s6p = getLocalProgress(progress, 6);
  const s7p = getLocalProgress(progress, 7);
  const s8p = getLocalProgress(progress, 8);

  const cardOpacity = 0.45;

  const getPileCardStyle = (pos: { x: number; y: number; r: number }) => ({
    transform: `translate(calc(-50% + ${pos.x}vw), calc(-50% + ${pos.y}vh)) rotate(${pos.r}deg)`,
    opacity: cardOpacity,
  });

  const fc1 = getPileCardStyle({ x: -28, y: -12, r:  -8 });
  const fc2 = getPileCardStyle({ x: -22, y:  10, r:   7 });
  const fc3 = getPileCardStyle({ x: -30, y:   4, r: -14 });
  const fc4 = getPileCardStyle({ x: -18, y:  -8, r:  12 });
  const fc5 = getPileCardStyle({ x: -26, y:  -4, r:  -5 });
  const fc6 = getPileCardStyle({ x: -21, y:   6, r:   3 });

  const text1Opacity = 1 - clamp01((s2p - 0.20) / 0.05);
  const text2Opacity = clamp01((s2p - 0.20) / 0.05) - clamp01((s2p - 0.50) / 0.05);
  const text3Opacity = clamp01((s2p - 0.50) / 0.05) - clamp01((s2p - 0.75) / 0.05);
  const text4Opacity = clamp01((s2p - 0.75) / 0.05);

  const getPhoneTranslateX = (p: number, s2pVal: number) => {
    if (p < 0.23) return 0;
    if (p < 0.31) {
      if (s2pVal < 0.20) return -16.6667;
      if (s2pVal < 0.25) return interp(s2pVal, 0.20, 0.25, -16.6667, -33.3333);
      if (s2pVal < 0.50) return -33.3333;
      if (s2pVal < 0.55) return interp(s2pVal, 0.50, 0.55, -33.3333, -50.0);
      if (s2pVal < 0.75) return -50.0;
      if (s2pVal < 0.80) return interp(s2pVal, 0.75, 0.80, -50.0, -66.6667);
      return -66.6667;
    }
    if (p < 0.345) {
      return interp(p, 0.31, 0.345, -66.6667, -83.3333);
    }
    return -83.3333;
  };

  const phoneVisibilityOpacity = interp(progress, 0.085, 0.11, 0, 1);

  const phoneScale = interp(s8p, 0, 0.8, 1.15, 1.0);

  const stage3CardsOpacity = interp(s3p, 0, 0.5, 0, 1);
  const stage2AlertOpacity = interp(s4p, 0, 0.5, 0, 1);
  const stage4VaultOpacity = interp(s6p, 0, 0.5, 0, 1);
  const stage5SuggestOpacity = interp(s7p, 0, 0.5, 0, 1);
  const stage5SuggestTranslateX = interp(s7p, 0, 0.5, 120, 0);

  const dashboardScrollRef = useRef<HTMLDivElement>(null);
  const dashboardScrollFraction = clamp01(s6p * 0.5 + s7p * 0.5);
  useEffect(() => {
    const el = dashboardScrollRef.current;
    if (!el) return;
    el.scrollTop = dashboardScrollFraction * (el.scrollHeight - el.clientHeight);
  }, [dashboardScrollFraction, progress]);

  const sliderOpacity = 1;

  const getActiveTab = () => {
    if (activeSlide <= 2) return 0;
    if (activeSlide === 3 || activeSlide === 4) return 1;
    if (activeSlide === 5) {
      if (stage4VaultOpacity > 0.5) return 2;
      return 0;
    }
    if (activeSlide >= 6) return 3;
    return 0;
  };
  const activeTab = getActiveTab();

  return (
    <div ref={ref} id="how-it-works" className="relative h-[600vh] w-full scroll-mt-28">
      <div
        className="sticky top-0 w-full h-screen flex items-center z-30"
      >
        {/* Subtle background glow */}
        <div className="absolute right-[-15%] top-[8%] h-[520px] w-[520px] rounded-full bg-black/5 blur-3xl z-0 pointer-events-none" />

        {/* ── Slider track wrapper ── */}
        <div className="absolute inset-0 overflow-hidden z-10">
          <div
            className="flex h-full"
            style={{
              transform: `translateX(-${translatePercent}%)`,
              width: "900%",
              opacity: sliderOpacity,
            }}
          >

          {/* SLIDE 0 — Paprs appears */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none relative overflow-hidden">
            <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-6 relative">
              
              {/* Left Column */}
              <div className="w-full md:w-5/12 flex flex-col justify-center relative z-20">
                <span className="font-mono text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full w-fit">
                  From confusion to action
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-black mt-6 mb-4 leading-tight">
                  Paprs turns the maze into your next move.
                </h3>
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                  Instead of opening ten tabs and translating legal language yourself, you get one personal plan showing what matters now, what can wait, and what Paprs can prepare for you.
                </p>
                <OutcomePills items={["One route", "One next action", "No wasted steps"]} />
              </div>

              {/* Right Column: Web Dashboard Card (Matching Hero Size) */}
              <div className="w-full md:w-6/12 flex items-center justify-center md:justify-end relative z-[45]">
                <div className="relative w-full max-w-[440px] sm:max-w-[480px] md:max-w-[520px] lg:max-w-[580px] xl:max-w-[620px] pointer-events-none scale-90 sm:scale-95 lg:scale-100">
                  <PaprsWebDashboardCard />
                  <div
                    className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-black font-bold whitespace-nowrap transition-opacity duration-500"
                    style={{ opacity: interp(s0p, 0.82, 0.92, 0, 1) }}
                  >
                    <Check className="w-3.5 h-3.5 text-black" />
                    Seguridad Social route ready
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* SLIDE 1 — Tell us who you are */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
            <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between relative">
              <div className="w-full md:w-5/12 flex flex-col justify-center">
                <span className="font-mono text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full w-fit">
                  Step 01
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-black mt-6 mb-4 leading-tight">
                  Tell Paprs once.
                </h3>
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                  Paprs asks only the questions that change your route—where you are from, why you are in Spain, where you live, and what is time-sensitive. Every answer removes irrelevant procedures.
                </p>
                <OutcomePills items={["Plain-language questions", "No generic checklist"]} />
              </div>

              <div className="w-full md:w-6/12 h-[65vh] md:h-full flex-shrink-0" />
            </div>
          </div>

          {/* SLIDE 2 — Your Roadmap & Action Steps */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
            <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between relative">
              <div className="w-full md:w-5/12 flex flex-col justify-center relative min-h-[220px]">
                <span className="font-mono text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full w-fit">
                  Step 02
                </span>
                
                <div className="relative mt-6 h-64 w-full md:h-72">
                  {/* Phase 1 */}
                  <div 
                    className="absolute inset-0 transition-all duration-300 flex flex-col justify-start"
                    style={{ 
                      opacity: text1Opacity, 
                      transform: `translateY(${text1Opacity > 0.5 ? 0 : 12}px)`,
                      pointerEvents: text1Opacity > 0.5 ? "auto" : "none" 
                    }}
                  >
                    <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-black mb-4 leading-tight">
                      First, Paprs understands the case.
                    </h3>
                    <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                      Your nationality, purpose of stay, city, housing, deadlines, and existing documents become one structured profile—so nothing important is lost between searches.
                    </p>
                  </div>

                  {/* Phase 2 */}
                  <div 
                    className="absolute inset-0 transition-all duration-300 flex flex-col justify-start"
                    style={{ 
                      opacity: text2Opacity, 
                      transform: `translateY(${text2Opacity > 0.5 ? 0 : 12}px)`,
                      pointerEvents: text2Opacity > 0.5 ? "auto" : "none" 
                    }}
                  >
                    <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-black mb-4 leading-tight">
                      Then, Paprs finds the right route.
                    </h3>
                    <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                      It matches your situation to the relevant official procedure, forms, evidence, fees, local rules, and known dependencies—without making you decode the acronyms.
                    </p>
                  </div>

                  {/* Phase 3 */}
                  <div 
                    className="absolute inset-0 transition-all duration-300 flex flex-col justify-start"
                    style={{ 
                      opacity: text3Opacity, 
                      transform: `translateY(${text3Opacity > 0.5 ? 0 : 12}px)`,
                      pointerEvents: text3Opacity > 0.5 ? "auto" : "none" 
                    }}
                  >
                    <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-black mb-4 leading-tight">
                      Every dependency falls into place.
                    </h3>
                    <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                      Paprs orders the work around deadlines and prerequisites. Ready tasks move forward. Blocked tasks explain exactly what is missing. Nothing starts in the wrong order.
                    </p>
                  </div>

                  {/* Phase 4 */}
                  <div 
                    className="absolute inset-0 transition-all duration-300 flex flex-col justify-start"
                    style={{ 
                      opacity: text4Opacity, 
                      transform: `translateY(${text4Opacity > 0.5 ? 0 : 12}px)`,
                      pointerEvents: text4Opacity > 0.5 ? "auto" : "none" 
                    }}
                  >
                    <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-black mb-4 leading-tight">
                      Hours of research become one action.
                    </h3>
                    <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                      For the next step, Paprs brings together the correct form, evidence checklist, fee, official link, office, and instructions—then prepares whatever can be safely prepared.
                    </p>
                  </div>
                </div>
                <OutcomePills items={["Verified requirements", "Dependencies ordered", "Next action prepared"]} />
              </div>
              <div className="hidden md:block md:w-6/12 h-full flex-shrink-0" />
            </div>
          </div>

          {/* SLIDE 3 — Command Centre */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
            <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between relative">
              <div className="w-full md:w-5/12 flex flex-col justify-center">
                <span className="font-mono text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full w-fit">
                  Step 03
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-black mt-6 mb-4 leading-tight">
                  One screen answers: “What do I do now?”
                </h3>
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                  See every procedure as ready, in progress, waiting on an office, or blocked by a missing document. Paprs always surfaces the next useful action—not another dashboard to manage.
                </p>
                <OutcomePills items={["Ready", "Waiting", "Blocked"]} />
              </div>
              <div className="hidden md:block md:w-6/12 h-full flex-shrink-0" />
            </div>
          </div>

          {/* SLIDE 4 — Urgent Alerts */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
            <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between relative">
              <div className="w-full md:w-5/12 flex flex-col justify-center">
                <span className="font-mono text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full w-fit">
                  Step 04
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-black mt-6 mb-4 leading-tight">
                  Deadlines stop living in your head.
                </h3>
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                  Paprs reads the dates that matter, counts backwards from the deadline, and tells you what must happen first—while there is still time to fix a missing document or unavailable appointment.
                </p>
                <OutcomePills items={["Deadline watch", "Early warning", "Recovery time"]} />
              </div>
              <div className="hidden md:block md:w-6/12 h-full flex-shrink-0" />
            </div>
          </div>

          {/* SLIDE 5 — Live Process Tracking */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
            <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between relative">
              <div className="w-full md:w-5/12 flex flex-col justify-center">
                <span className="font-mono text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full w-fit">
                  Step 05
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-black mt-6 mb-4 leading-tight">
                  Know who has the ball.
                </h3>
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                  Paprs separates what you have completed, what is waiting on an administration, and what needs your attention next—so you do not repeat work or wonder whether you missed something.
                </p>
                <OutcomePills items={["Done by you", "Waiting on office", "Next step"]} />
              </div>
              <div className="hidden md:block md:w-6/12 h-full flex-shrink-0" />
            </div>
          </div>

          {/* SLIDE 6 — Document Vault */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
            <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between relative">
              <div className="w-full md:w-5/12 flex flex-col justify-center">
                <span className="font-mono text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full w-fit">
                  Step 06
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-black mt-6 mb-4 leading-tight">
                  Your documents become working memory.
                </h3>
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                  Upload a certificate once. Paprs identifies the document, extracts useful dates and details, connects it to the right procedures, and reuses the evidence when the next checklist asks for it.
                </p>
                <OutcomePills items={["Details extracted", "Evidence organised", "Reuse instead of retype"]} />
              </div>
              <div className="hidden md:block md:w-6/12 h-full flex-shrink-0" />
            </div>
          </div>

          {/* SLIDE 7 — Smart Recommendations */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
            <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between relative">
              <div className="w-full md:w-5/12 flex flex-col justify-center">
                <span className="font-mono text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full w-fit">
                  Step 07
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-black mt-6 mb-4 leading-tight">
                  When life changes, the plan changes with it.
                </h3>
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                  A new address, job, family situation, document date, fee, or official requirement can change what comes next. Paprs detects the impact, re-orders the route, and explains the new action.
                </p>
                <OutcomePills items={["Change detected", "Impact explained", "Plan re-ordered"]} />
              </div>
              <div className="hidden md:block md:w-6/12 h-full flex-shrink-0" />
            </div>
          </div>

          {/* SLIDE 8 — Pocket Agency */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
            <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between relative">
              <div className="w-full md:w-5/12 flex flex-col justify-center">
                <span className="font-mono text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full w-fit">
                  Step 08
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-black mt-6 mb-4 leading-tight">
                  Paprs prepares. You approve. Paprs acts.
                </h3>
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                  Paprs can research the route, prepare forms and evidence, monitor changes, and carry out supported digital actions. Before anything consequential is submitted, you see exactly what will happen and stay in control.
                </p>
                <OutcomePills items={["Prepared for you", "Human approval", "Action tracked"]} />
              </div>
              <div className="hidden md:block md:w-6/12 h-full flex-shrink-0" />
            </div>
          </div>

          </div>
        </div>

        {/* ── Chaos Card Pile Overlay (Slide 0) ── */}
        <div
          className="hidden md:block absolute inset-0 pointer-events-none z-[5]"
          style={{
            opacity: `calc(clamp(0, (var(--doc-transition-progress, 0) - 0.1) * 1.25, 1) * 0.85)`,
            transform: `translateY(calc((var(--doc-transition-progress, 0) - 1) * var(--viewport-height-px, 100vh)))`,
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: `translateX(-${translatePercent * 9}%)`,
            }}
          >
            <div className="absolute left-1/2 top-1/2" style={{ "--paper-rotate": "-8deg" } as React.CSSProperties}>
              <div style={fc1}><DocumentCard type="nie" status="chaos" /></div>
            </div>
            <div className="absolute left-1/2 top-1/2" style={{ "--paper-rotate": "7deg" } as React.CSSProperties}>
              <div style={fc2}><DocumentCard type="padron" status="chaos" /></div>
            </div>
            <div className="absolute left-1/2 top-1/2" style={{ "--paper-rotate": "-14deg" } as React.CSSProperties}>
              <div style={fc3}><DocumentCard type="seg_social" status="chaos" /></div>
            </div>
            <div className="absolute left-1/2 top-1/2" style={{ "--paper-rotate": "12deg" } as React.CSSProperties}>
              <div style={fc4}><DocumentCard type="hacienda" status="chaos" /></div>
            </div>
            <div className="absolute left-1/2 top-1/2" style={{ "--paper-rotate": "-5deg" } as React.CSSProperties}>
              <div style={fc5}><DocumentCard type="nie" status="chaos" /></div>
            </div>
            <div className="absolute left-1/2 top-1/2" style={{ "--paper-rotate": "3deg" } as React.CSSProperties}>
              <div style={fc6}><DocumentCard type="seg_social" status="chaos" /></div>
            </div>
          </div>
        </div>

        {/* ── Sticky Phone Simulator Overlay (Slides 2-8) ── */}
        {phoneVisibilityOpacity > 0 && (
          <div 
            className="absolute inset-0 flex justify-center pointer-events-none z-30"
            style={{ 
              opacity: phoneVisibilityOpacity,
            }}
          >
            <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-5/12 h-[35vh] md:h-full flex-shrink-0" />

            <div className="w-full md:w-6/12 h-[65vh] md:h-full flex items-center justify-center relative">
              
              <div 
                className="relative transition-all duration-300 flex items-center justify-center w-full max-w-[440px] sm:max-w-[480px] md:max-w-[520px] lg:max-w-[580px] xl:max-w-[620px]"
                style={{ transform: `scale(${phoneScale})` }}
              >
                {/* Desktop Web Dashboard Window using Reusable BrowserPlaceholder */}
                <BrowserPlaceholder
                  badgeText="Live"
                  shadow="shadow-[0_24px_60px_-15px_rgba(0,0,0,0.14)]"
                  className="h-[520px] md:h-[540px]"
                  headerContent={
                    activeSlide !== 1 && activeSlide !== 2 ? (
                      <div className="px-4 py-2.5 bg-white border-b border-zinc-100 flex justify-between items-center z-20 shrink-0">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-black text-white flex items-center justify-center font-syne font-black text-[10px]">
                            p.
                          </div>
                          <div>
                            <h5 className="font-syne font-extrabold text-[11px] text-black tracking-tight leading-tight">Paprs Workspace</h5>
                            <p className="text-[7px] font-mono text-zinc-400 uppercase tracking-widest leading-none mt-0.5">Student Route · Barcelona</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bell className="w-3.5 h-3.5 text-zinc-400 hover:text-black cursor-pointer transition-colors" />
                          <div className="w-6 h-6 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center font-mono text-[8px] text-black font-bold shadow-xs">
                            JD
                          </div>
                        </div>
                      </div>
                    ) : null
                  }
                  footerContent={
                    activeSlide !== 1 && activeSlide !== 2 ? (
                      <div className="px-3 py-2 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between z-20 shrink-0">
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <div className={`px-2 py-1 rounded-lg font-mono text-[7.5px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer ${activeTab === 0 ? "bg-black text-white shadow-xs" : "text-zinc-500 hover:text-black hover:bg-zinc-100"}`}>
                            <Home className="w-2.5 h-2.5" />
                            <span>Overview</span>
                          </div>
                          <div className={`px-2 py-1 rounded-lg font-mono text-[7.5px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer ${activeTab === 1 ? "bg-black text-white shadow-xs" : "text-zinc-500 hover:text-black hover:bg-zinc-100"}`}>
                            <Layers className="w-2.5 h-2.5" />
                            <span>Roadmap</span>
                          </div>
                          <div className={`px-2 py-1 rounded-lg font-mono text-[7.5px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer ${activeTab === 2 ? "bg-black text-white shadow-xs" : "text-zinc-500 hover:text-black hover:bg-zinc-100"}`}>
                            <FileText className="w-2.5 h-2.5" />
                            <span>Vault</span>
                          </div>
                        </div>

                        <div className={`px-2 py-1 rounded-lg font-mono text-[7.5px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer ${activeTab === 3 ? "bg-black text-white shadow-xs" : "text-zinc-500 hover:text-black hover:bg-zinc-100"}`}>
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Assistant</span>
                        </div>
                      </div>
                    ) : null
                  }
                >
                  {/* Dashboard Screen Slider Container */}
                  <div className="flex-1 min-h-0 relative overflow-hidden">
                    <div
                      className="h-full flex transition-transform duration-300"
                      style={{
                        width: "600%",
                        transform: `translateX(${getPhoneTranslateX(progress, s2p)}%)`
                      }}
                    >
                        {/* SCREEN 0: Onboarding Questions */}
                        <div className="w-1/6 h-full flex-shrink-0 flex flex-col p-4 pb-4 bg-[#FFFFFF] justify-between relative overflow-hidden">
                          <style>{`
                            @keyframes selectTap {
                              0% { transform: scale(1); }
                              40% { transform: scale(0.96); }
                              100% { transform: scale(1); }
                            }
                            @keyframes checkPop {
                              0% { transform: scale(0.5); opacity: 0; }
                              60% { transform: scale(1.15); opacity: 0.85; }
                              100% { transform: scale(1); opacity: 1; }
                            }
                            .animate-tap { animation: selectTap 0.35s ease-in-out; }
                            .animate-pop { animation: checkPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
                          `}</style>
                          <div className="flex flex-col gap-3 min-h-0 flex-1 overflow-y-auto scrollbar-none">
                            {/* Circular progress ring */}
                            <div className="flex justify-between items-center bg-white p-2 rounded-xl border border-zinc-200 shadow-sm shrink-0">
                              <span className="text-[7.5px] font-mono text-zinc-700 uppercase tracking-wider font-extrabold transition-all duration-300">
                                {s1p < 0.35 
                                  ? "Identity & Legal Status" 
                                  : s1p < 0.65 
                                    ? "Purpose & Timing"
                                    : "Location & Housing"}
                              </span>
                              <div className="relative w-[18px] h-[18px] flex items-center justify-center shrink-0">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 20 20">
                                  <circle cx="10" cy="10" r="7.5" className="stroke-zinc-200" strokeWidth="2.5" fill="transparent" />
                                  <circle 
                                    cx="10" 
                                    cy="10" 
                                    r="7.5" 
                                    className="stroke-black transition-all duration-300" 
                                    strokeWidth="2.5" 
                                    fill="transparent" 
                                    strokeDasharray="47.12" 
                                    strokeDashoffset={
                                      s1p < 0.35 
                                        ? "31.4"
                                        : s1p < 0.65 
                                          ? "15.7"
                                          : "0"
                                    } 
                                    strokeLinecap="round" 
                                  />
                                </svg>
                              </div>
                            </div>

                            {/* STEP 1 */}
                            {s1p <= 0.35 && (
                              <div className="flex flex-col gap-4.5 animate-fadeIn">
                                <div className="flex flex-col gap-1.5">
                                  <h4 className="text-[8.5px] font-syne font-extrabold text-black leading-tight">
                                    Where are you moving from?
                                  </h4>
                                  <div className="flex flex-col gap-2">
                                    <div className={`py-2 px-3 border rounded-xl flex items-center justify-between transition-all duration-300 shadow-sm ${s1p > 0.16 ? "border-black bg-zinc-100 animate-tap" : "border-zinc-200 bg-white"}`}>
                                      <span className={`text-[7.5px] font-mono ${s1p > 0.16 ? "text-black font-extrabold" : "text-zinc-500 font-medium"}`}>
                                        United Kingdom
                                      </span>
                                      {s1p > 0.16 ? (
                                        <div className="w-3 h-3 rounded-full bg-black flex items-center justify-center shadow-md animate-pop">
                                          <Check className="w-2.5 h-2.5 text-white" />
                                        </div>
                                      ) : (
                                        <div className="w-3 h-3 rounded-full border border-zinc-300 bg-white" />
                                      )}
                                    </div>
                                    <div className="py-2 px-3 border border-zinc-200 bg-white rounded-xl flex items-center justify-between opacity-70">
                                      <span className="text-[7.5px] text-zinc-400 font-mono font-medium">United States</span>
                                      <div className="w-3 h-3 rounded-full border border-zinc-300 bg-white" />
                                    </div>
                                    <div className="py-2 px-3 border border-zinc-200 bg-white rounded-xl flex items-center justify-between opacity-70">
                                      <span className="text-[7.5px] text-zinc-400 font-mono font-medium">Other (Non-EU)</span>
                                      <div className="w-3 h-3 rounded-full border border-zinc-300 bg-white" />
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-col gap-1.5 border-t border-zinc-200 pt-2.5">
                                  <h4 className="text-[8.5px] font-syne font-extrabold text-black leading-tight">
                                    Is your passport valid?
                                  </h4>
                                  <div className="flex flex-col gap-2">
                                    <div className={`py-2 px-3 border rounded-xl flex items-center justify-between transition-all duration-300 shadow-sm ${s1p > 0.26 ? "border-black bg-zinc-100 animate-tap" : "border-zinc-200 bg-white"}`}>
                                      <span className={`text-[7.5px] font-mono ${s1p > 0.26 ? "text-black font-extrabold" : "text-zinc-500 font-medium"}`}>
                                        Yes, fully valid
                                      </span>
                                      {s1p > 0.26 ? (
                                        <div className="w-3 h-3 rounded-full bg-black flex items-center justify-center shadow-md animate-pop">
                                          <Check className="w-2.5 h-2.5 text-white" />
                                        </div>
                                      ) : (
                                        <div className="w-3 h-3 rounded-full border border-zinc-300 bg-white" />
                                      )}
                                    </div>
                                    <div className="py-2 px-3 border border-zinc-200 bg-white rounded-xl flex items-center justify-between opacity-70">
                                      <span className="text-[7.5px] text-zinc-400 font-mono font-medium">No, expired</span>
                                      <div className="w-3 h-3 rounded-full border border-zinc-300 bg-white" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* STEP 2 */}
                            {s1p > 0.35 && s1p <= 0.65 && (
                              <div className="flex flex-col gap-4.5 animate-fadeIn">
                                <div className="flex flex-col gap-1.5">
                                  <h4 className="text-[8.5px] font-syne font-extrabold text-black leading-tight">
                                    What brings you to Spain?
                                  </h4>
                                  <div className="flex flex-col gap-2">
                                    <div className={`py-2 px-3 border rounded-xl flex items-center justify-between transition-all duration-300 shadow-sm ${s1p > 0.46 ? "border-black bg-zinc-100 animate-tap" : "border-zinc-200 bg-white"}`}>
                                      <span className={`text-[7.5px] font-mono ${s1p > 0.46 ? "text-black font-extrabold" : "text-zinc-500 font-medium"}`}>
                                        Study at a Spanish university
                                      </span>
                                      {s1p > 0.46 ? (
                                        <div className="w-3 h-3 rounded-full bg-black flex items-center justify-center shadow-md animate-pop">
                                          <Check className="w-2.5 h-2.5 text-white" />
                                        </div>
                                      ) : (
                                        <div className="w-3 h-3 rounded-full border border-zinc-300 bg-white" />
                                      )}
                                    </div>
                                    <div className="py-2 px-3 border border-zinc-200 bg-white rounded-xl flex items-center justify-between opacity-70">
                                      <span className="text-[7.5px] text-zinc-400 font-mono font-medium">
                                        Work for a Spanish employer
                                      </span>
                                      <div className="w-3 h-3 rounded-full border border-zinc-300 bg-white" />
                                    </div>
                                    <div className="py-2 px-3 border border-zinc-200 bg-white rounded-xl flex items-center justify-between opacity-70">
                                      <span className="text-[7.5px] text-zinc-400 font-mono font-medium">Join a family member</span>
                                      <div className="w-3 h-3 rounded-full border border-zinc-300 bg-white" />
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-col gap-1.5 border-t border-zinc-200 pt-2.5">
                                  <h4 className="text-[8.5px] font-syne font-extrabold text-black leading-tight">
                                    When does your current permit expire?
                                  </h4>
                                  <div className="flex flex-col gap-2">
                                    <div className={`py-2 px-3 border rounded-xl flex items-center justify-between transition-all duration-300 shadow-sm ${s1p > 0.56 ? "border-black bg-zinc-100 animate-tap" : "border-zinc-200 bg-white"}`}>
                                      <span className={`text-[7.5px] font-mono ${s1p > 0.56 ? "text-black font-extrabold" : "text-zinc-500 font-medium"}`}>
                                        In 52 days
                                      </span>
                                      {s1p > 0.56 ? (
                                        <div className="w-3 h-3 rounded-full bg-black flex items-center justify-center shadow-md animate-pop">
                                          <Check className="w-2.5 h-2.5 text-white" />
                                        </div>
                                      ) : (
                                        <div className="w-3 h-3 rounded-full border border-zinc-300 bg-white" />
                                      )}
                                    </div>
                                    <div className="py-2 px-3 border border-zinc-200 bg-white rounded-xl flex items-center justify-between opacity-70">
                                      <span className="text-[7.5px] text-zinc-400 font-mono font-medium">More than 90 days</span>
                                      <div className="w-3 h-3 rounded-full border border-zinc-300 bg-white" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* STEP 3 */}
                            {s1p > 0.65 && (
                              <div className="flex flex-col gap-4.5 animate-fadeIn">
                                <div className="flex flex-col gap-1.5">
                                  <h4 className="text-[8.5px] font-syne font-extrabold text-black leading-tight">
                                    Where are you registering?
                                  </h4>
                                  <div className="flex flex-col gap-2">
                                    <div className={`py-2 px-3 border rounded-xl flex items-center justify-between transition-all duration-300 shadow-sm ${s1p > 0.76 ? "border-black bg-zinc-100 animate-tap" : "border-zinc-200 bg-white"}`}>
                                      <span className={`text-[7.5px] font-mono ${s1p > 0.76 ? "text-black font-extrabold" : "text-zinc-500 font-medium"}`}>
                                        Barcelona
                                      </span>
                                      {s1p > 0.76 ? (
                                        <div className="w-3 h-3 rounded-full bg-black flex items-center justify-center shadow-md animate-pop">
                                          <Check className="w-2.5 h-2.5 text-white" />
                                        </div>
                                      ) : (
                                        <div className="w-3 h-3 rounded-full border border-zinc-300 bg-white" />
                                      )}
                                    </div>
                                    <div className="py-2 px-3 border border-zinc-200 bg-white rounded-xl flex items-center justify-between opacity-70">
                                      <span className="text-[7.5px] text-zinc-400 font-mono font-medium">Madrid</span>
                                      <div className="w-3 h-3 rounded-full border border-zinc-300 bg-white" />
                                    </div>
                                    <div className="py-2 px-3 border border-zinc-200 bg-white rounded-xl flex items-center justify-between opacity-70">
                                      <span className="text-[7.5px] text-zinc-400 font-mono font-medium">Valencia</span>
                                      <div className="w-3 h-3 rounded-full border border-zinc-300 bg-white" />
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-col gap-1.5 border-t border-zinc-200 pt-2.5">
                                  <h4 className="text-[8.5px] font-syne font-extrabold text-black leading-tight">
                                    What is your housing setup?
                                  </h4>
                                  <div className="flex flex-col gap-2">
                                    <div className={`py-2 px-3 border rounded-xl flex items-center justify-between transition-all duration-300 shadow-sm ${s1p > 0.86 ? "border-black bg-zinc-100 animate-tap" : "border-zinc-200 bg-white"}`}>
                                      <span className={`text-[7.5px] font-mono ${s1p > 0.86 ? "text-black font-extrabold" : "text-zinc-500 font-medium"}`}>
                                        Room in a shared flat
                                      </span>
                                      {s1p > 0.86 ? (
                                        <div className="w-3 h-3 rounded-full bg-black flex items-center justify-center shadow-md animate-pop">
                                          <Check className="w-2.5 h-2.5 text-white" />
                                        </div>
                                      ) : (
                                        <div className="w-3 h-3 rounded-full border border-zinc-300 bg-white" />
                                      )}
                                    </div>
                                    <div className="py-2 px-3 border border-zinc-200 bg-white rounded-xl flex items-center justify-between opacity-70">
                                      <span className="text-[7.5px] text-zinc-400 font-mono font-medium">
                                        Lease in my name
                                      </span>
                                      <div className="w-3 h-3 rounded-full border border-zinc-300 bg-white" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="w-full py-2 bg-black text-white rounded-xl text-[8px] font-bold font-mono flex items-center justify-center gap-1.5 shadow-md cursor-pointer hover:bg-zinc-800 transition-colors">
                            Next Question <ChevronRight className="w-3 h-3 text-white" />
                          </div>
                        </div>

                        {/* SCREEN 1: Onboarding Complete */}
                        <div className="w-1/6 h-full flex-shrink-0 flex flex-col p-4 pb-4 bg-[#FFFFFF] justify-between">
                          <div className="flex flex-col gap-3.5">
                            <div className="flex flex-col items-center text-center gap-1.5 mt-2">
                              <div className="w-9 h-9 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-black shadow-md">
                                <Sparkles className="w-4 h-4 text-black animate-pulse" />
                              </div>
                              <h4 className="font-syne font-extrabold text-[11px] text-black leading-tight">
                                Your Route Is Ready
                              </h4>
                              <p className="text-[7.5px] text-zinc-500 max-w-[140px] leading-relaxed">
                                Paprs found the linked actions for your student renewal.
                              </p>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <span className="text-[7.5px] font-mono text-zinc-500 uppercase tracking-wider font-extrabold mb-0.5">Your first actions</span>
                              <div className="bg-white border border-zinc-200 p-2.5 rounded-2xl flex items-center gap-2 shadow-sm">
                                <div className="w-6 h-6 rounded-xl bg-zinc-100 border border-zinc-300 flex items-center justify-center text-black shrink-0">
                                  <MapPin className="w-3 h-3" />
                                </div>
                                <div className="min-w-0">
                                  <h6 className="text-[8.5px] font-bold text-black leading-none">Confirm renewal evidence</h6>
                                  <p className="text-[6.5px] text-zinc-500 font-mono mt-0.5">Passport · enrolment · insurance</p>
                                </div>
                              </div>
                              <div className="bg-white border border-zinc-200 p-2.5 rounded-2xl flex items-center gap-2 shadow-sm">
                                <div className="w-6 h-6 rounded-xl bg-zinc-100 border border-zinc-300 flex items-center justify-center text-black shrink-0">
                                  <FileText className="w-3 h-3" />
                                </div>
                                <div className="min-w-0">
                                  <h6 className="text-[8.5px] font-bold text-black leading-none">Prepare the application</h6>
                                  <p className="text-[6.5px] text-zinc-500 font-mono mt-0.5">Form · fee · submission route</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="w-full py-2 bg-black text-white rounded-xl text-[8px] font-bold font-mono flex items-center justify-center gap-1.5 shadow-md cursor-pointer hover:bg-zinc-800 transition-colors">
                            Build My Roadmap <Cpu className="w-3 h-3 text-white" />
                          </div>
                        </div>

                        {/* SCREEN 2: AI Roadmap Computing */}
                        <div className="w-1/6 h-full flex-shrink-0 flex flex-col p-4 pb-6 bg-white justify-between relative">
                          <div className="flex flex-col items-center gap-2 mt-4 relative z-10">
                            <div className="text-[8px] font-mono text-black uppercase tracking-widest font-extrabold flex items-center gap-1 bg-zinc-100 border border-zinc-300 px-2 py-0.5 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping"></span>
                              Building Your Route
                            </div>

                            <div className="w-28 h-28 flex items-center justify-center my-1 select-none pointer-events-none">
                              <Lottie
                                animationData={aiGeneratingAnimation}
                                loop={true}
                                className="w-full h-full scale-[1.1]"
                              />
                            </div>
                          </div>

                          <AIComputingLogger />
                        </div>

                        {/* SCREEN 3: Roadmap */}
                        <div className="w-1/6 h-full flex-shrink-0 flex flex-col p-4 pb-14 bg-[#FFFFFF] justify-between">
                          <div className="flex flex-col gap-3">
                            <div className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-extrabold">
                              Your Next Actions (3)
                            </div>

                            <div className="flex flex-col gap-2.5 relative">
                              <div className="absolute left-[13px] top-4 bottom-4 w-[1px] bg-zinc-200 z-0"></div>

                              <div className="bg-white border border-zinc-200 p-3 rounded-2xl shadow-sm flex items-center justify-between gap-2.5 relative z-10">
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className="w-2.5 h-2.5 rounded-full bg-black border-2 border-white flex-shrink-0 shadow-sm" />
                                  <div className="min-w-0">
                                    <h6 className="font-syne font-extrabold text-[9.5px] text-black leading-tight">1. Check your evidence</h6>
                                    <p className="text-[7px] font-mono text-zinc-400 mt-0.5">Paprs found 4 of 5 documents</p>
                                  </div>
                                </div>
                                <span className="text-[6.5px] font-mono text-white bg-black border border-black px-1.5 py-0.5 rounded-md font-bold uppercase shrink-0">Ready</span>
                              </div>

                              <div className="bg-white border-2 border-black p-3 rounded-2xl shadow-sm flex items-center justify-between gap-2.5 relative z-10">
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className="w-2.5 h-2.5 rounded-full bg-black border-2 border-white flex-shrink-0 shadow-sm relative">
                                    <div className="absolute inset-0 rounded-full bg-black/20 animate-ping" />
                                  </div>
                                  <div className="min-w-0">
                                    <h6 className="font-syne font-extrabold text-[9.5px] text-black leading-tight">2. Review prepared forms</h6>
                                    <p className="text-[7px] font-mono text-zinc-400 mt-0.5">Deadline protected · 52 days left</p>
                                  </div>
                                </div>
                                <span className="text-[6.5px] font-mono text-black bg-zinc-100 border border-zinc-300 px-1.5 py-0.5 rounded-md font-bold uppercase shrink-0">Active</span>
                              </div>

                              <div className="bg-white border border-zinc-200 p-3 rounded-2xl shadow-sm flex items-center justify-between gap-2.5 relative z-10 opacity-60">
                                <div className="flex items-center gap-2 min-w-0">
                                  <Lock className="w-2.5 h-2.5 text-zinc-400 flex-shrink-0" />
                                  <div className="min-w-0">
                                    <h6 className="font-syne font-extrabold text-[9.5px] text-black leading-tight">3. Approve submission</h6>
                                    <p className="text-[7px] font-mono text-zinc-400 mt-0.5">Unlocks when evidence is complete</p>
                                  </div>
                                </div>
                                <span className="text-[6.5px] font-mono text-zinc-400 bg-zinc-50 border border-zinc-200 px-1.5 py-0.5 rounded-md font-bold uppercase shrink-0">Locked</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-[7.5px] font-mono text-center text-zinc-500 flex items-center justify-center gap-1 mt-2 font-medium">
                            Scroll down to details →
                          </div>
                        </div>

                        {/* SCREEN 4: Detail Action Checklist */}
                        <div className="w-1/6 h-full flex-shrink-0 flex flex-col p-4 pb-14 bg-[#FFFFFF] justify-between">
                          <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-start border-b border-zinc-200 pb-2.5">
                              <div>
                                <span className="font-mono text-[7px] uppercase text-black font-bold">Next action</span>
                                <h4 className="font-syne font-extrabold text-[11px] text-black leading-tight mt-0.5">Student Stay Renewal</h4>
                              </div>
                              <span className="text-[6.5px] px-1.5 py-0.5 rounded-md bg-zinc-100 text-black border border-zinc-300 uppercase font-bold shrink-0">Active</span>
                            </div>

                            <div className="flex flex-col gap-3.5 mt-1.5 relative">
                              <div className="absolute left-[10px] top-3 bottom-3 w-[1px] bg-zinc-200 z-0"></div>

                              <div className="flex items-start gap-2.5 relative z-10 text-[9.5px]">
                                <div className="w-5 h-5 rounded-full bg-black border border-black flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                                  <Check className="w-3.5 h-3.5 text-white" />
                                </div>
                                <div className="mt-0.5">
                                  <p className="font-bold text-zinc-400 line-through decoration-zinc-300 leading-tight">Match the official route</p>
                                  <p className="text-[7.5px] text-zinc-400">Procedure and deadline verified</p>
                                </div>
                              </div>

                              <div className="flex items-start gap-2.5 relative z-10 text-[9.5px]">
                                <div className="w-5 h-5 rounded-full bg-black border border-black flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                                  <Check className="w-3.5 h-3.5 text-white" />
                                </div>
                                <div className="mt-0.5">
                                  <p className="font-bold text-zinc-400 line-through decoration-zinc-300 leading-tight">Prepare form and fee</p>
                                  <p className="text-[7.5px] text-zinc-400">Fields pre-filled from your profile</p>
                                </div>
                              </div>

                              <div className="flex items-start gap-2.5 relative z-10 text-[9.5px]">
                                {s2p >= 0.95 ? (
                                  <div className="w-5 h-5 rounded-full bg-black border border-black flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                                    <Check className="w-3.5 h-3.5 text-white" />
                                  </div>
                                ) : (
                                  <div className="w-5 h-5 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-black flex-shrink-0 shadow-sm">
                                    <ChevronRight className="w-3 h-3 text-black" />
                                  </div>
                                )}
                                <div className="mt-0.5">
                                  <p className={`font-bold leading-tight ${s2p >= 0.95 ? "text-zinc-400 line-through decoration-zinc-300" : "text-black"}`}>Review and approve</p>
                                  <p className="text-[7.5px] text-zinc-400">You see every document before submission</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center border-t border-zinc-200 pt-3">
                            <div className="w-[55%]">
                              <span className="text-[7.5px] font-mono text-zinc-400 block mb-0.5">Action readiness</span>
                              <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                                <div 
                                  className="bg-black h-full transition-all duration-300 rounded-full" 
                                  style={{ width: `${interp(s2p, 0.80, 0.95, 66, 100)}%` }} 
                                />
                              </div>
                            </div>

                            <div 
                              className="border-2 border-black bg-black text-white rounded-lg px-2 py-0.5 font-extrabold text-[8.5px] tracking-wider uppercase rotate-[-8deg] shadow-sm transition-all duration-300 flex items-center gap-0.5"
                              style={{
                                transform: `scale(${s2p >= 0.95 ? 1 : 1.3}) rotate(-8deg)`,
                                opacity: s2p >= 0.95 ? 1 : 0
                              }}
                            >
                              <Check className="w-3.5 h-3.5 text-white" /> DONE
                            </div>
                          </div>
                        </div>

                        {/* SCREEN 5: Dashboard View */}
                        <div
                          ref={dashboardScrollRef}
                          className="w-1/6 h-full min-h-0 flex-shrink-0 flex flex-col p-3.5 gap-3.5 select-none pb-14 bg-[#FFFFFF] overflow-y-auto scrollbar-none"
                        >
                          <div className="bg-white border border-zinc-200 p-3 rounded-2xl flex flex-col gap-0.5 relative overflow-hidden shadow-sm shrink-0 mt-1">
                            <h5 className="font-syne font-extrabold text-[10.5px] text-black leading-tight">John Doe</h5>
                            <p className="text-[7px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">Student · Barcelona</p>
                          </div>

                          {/* STAGE 2 */}
                          <div
                            className="grid transition-all duration-300 shrink-0"
                            style={{ gridTemplateRows: stage2AlertOpacity > 0.02 ? "1fr" : "0fr" }}
                          >
                            <div
                              className="overflow-hidden transition-all duration-300"
                              style={{
                                opacity: stage2AlertOpacity,
                                transform: `translateY(${stage2AlertOpacity > 0 ? 0 : 12}px)`,
                              }}
                            >
                              <div className="bg-white border border-zinc-300 p-3 rounded-2xl shadow-sm">
                                <div className="flex justify-between items-center mb-1.5">
                                  <span className="text-[7px] uppercase font-mono tracking-wider text-black font-extrabold flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full animate-ping"></span>
                                    Urgent Action
                                  </span>
                                  <span className="text-[7px] font-mono text-black font-extrabold bg-zinc-100 px-1.5 py-0.5 rounded-md border border-zinc-300 scale-[0.9]">
                                    52 Days Left
                                  </span>
                                </div>
                                <h6 className="font-syne font-extrabold text-[9.5px] text-black leading-tight">Student Visa Renewal</h6>
                                <p className="text-[7.5px] text-zinc-500 mt-1 leading-normal">
                                  Paprs prepared the form and fee. One insurance document is still missing.
                                </p>
                                <div className="mt-2.5 w-full h-6 bg-black text-white rounded-xl text-[8px] font-bold flex items-center justify-center font-mono cursor-pointer shadow-sm gap-1 hover:bg-zinc-800 transition-colors">
                                  Review Prepared Action <ChevronRight className="w-2.5 h-2.5 text-white" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* STAGE 5 */}
                          <div
                            className="grid transition-all duration-300 shrink-0"
                            style={{ gridTemplateRows: stage5SuggestOpacity > 0.02 ? "1fr" : "0fr" }}
                          >
                            <div
                              className="overflow-hidden transition-all duration-300"
                              style={{
                                opacity: stage5SuggestOpacity,
                                transform: `translateX(${stage5SuggestTranslateX}px)`,
                              }}
                            >
                              <div className="bg-white border border-zinc-300 p-3 rounded-2xl shadow-sm">
                                <div className="flex justify-between items-center mb-1.5">
                                  <span className="text-[7px] uppercase font-mono tracking-wider text-black font-extrabold flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></span>
                                    Suggestion
                                  </span>
                                  <span className="text-[7px] font-mono text-black font-extrabold bg-zinc-100 px-1.5 py-0.5 rounded-md border border-zinc-300 scale-[0.9]">
                                    15 Days Left
                                  </span>
                                </div>
                                <h6 className="font-syne font-extrabold text-[9.5px] text-black leading-tight">Fresh Address Proof Needed</h6>
                                <p className="text-[7.5px] text-zinc-500 mt-1 leading-normal">
                                  Your next procedure needs a recent certificate. Paprs found the municipal request route.
                                </p>
                                <div className="mt-2.5 w-full h-6 bg-black text-white rounded-xl text-[8px] font-bold flex items-center justify-center font-mono cursor-pointer shadow-sm gap-1 hover:bg-zinc-800 transition-colors">
                                  Prepare Fresh Copy <ChevronRight className="w-2.5 h-2.5 text-white" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* STAGE 3 */}
                          <div 
                            className="flex flex-col gap-2 transition-all duration-300 shrink-0"
                            style={{ 
                              opacity: stage3CardsOpacity,
                              transform: `translateY(${stage3CardsOpacity > 0 ? 0 : 12}px)` 
                            }}
                          >
                            <div className="text-[7px] uppercase font-mono tracking-wider text-zinc-400 font-bold px-0.5">
                              Your Roadmaps
                            </div>

                            <div className="bg-white border border-zinc-200 p-3 rounded-2xl shadow-sm flex items-center justify-between gap-2.5">
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-7 h-7 rounded-xl bg-zinc-100 flex items-center justify-center text-black border border-zinc-300 flex-shrink-0">
                                  <FileText className="w-3.5 h-3.5 text-black" />
                                </div>
                                <div className="min-w-0">
                                  <h6 className="font-syne font-bold text-[9px] text-black leading-tight truncate">Student Stay Renewal</h6>
                                  <p className="text-[7px] text-black font-mono mt-0.5 font-semibold">4 of 5 documents ready</p>
                                </div>
                              </div>
                              <div className="w-9 bg-zinc-100 h-1 rounded-full overflow-hidden shrink-0 ml-1">
                                <div className="bg-black h-full w-[80%] rounded-full"></div>
                              </div>
                            </div>

                            <div className="bg-white border border-zinc-200 p-3 rounded-2xl shadow-sm flex items-center justify-between gap-2.5">
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-7 h-7 rounded-xl bg-zinc-100 flex items-center justify-center text-black border border-zinc-300 flex-shrink-0">
                                  <MapPin className="w-3.5 h-3.5 text-black" />
                                </div>
                                <div className="min-w-0">
                                  <h6 className="font-syne font-bold text-[9px] text-black leading-tight truncate">Address Record</h6>
                                  <p className="text-[7px] text-black font-mono mt-0.5 flex items-center gap-0.5 font-semibold">
                                    <span className="w-1 h-1 bg-black rounded-full animate-pulse"></span>
                                    Waiting on city office
                                  </p>
                                </div>
                              </div>
                              <div className="w-9 bg-zinc-100 h-1 rounded-full overflow-hidden shrink-0 ml-1">
                                <div className="bg-black h-full w-[80%] rounded-full"></div>
                              </div>
                            </div>
                          </div>

                          {/* STAGE 4 */}
                          <div
                            className="grid transition-all duration-300 shrink-0"
                            style={{ gridTemplateRows: stage4VaultOpacity > 0.02 ? "1fr" : "0fr" }}
                          >
                            <div
                              className="overflow-hidden flex flex-col gap-2 transition-all duration-300"
                              style={{
                                opacity: stage4VaultOpacity,
                                transform: `translateY(${stage4VaultOpacity > 0 ? 0 : 12}px)`,
                              }}
                            >
                              <div className="text-[7px] uppercase font-mono tracking-wider text-zinc-400 font-bold px-0.5">
                                Document Vault
                              </div>

                              <div className="bg-white border border-zinc-200 p-3 rounded-2xl shadow-sm flex flex-col gap-2 border-b border-zinc-100 pb-2">
                                <div className="flex justify-between items-center text-[8.5px] border-b border-zinc-100 pb-2">
                                  <span className="text-black flex items-center gap-1.5 font-medium">
                                    <FileText className="w-3.5 h-3.5 text-black shrink-0" /> University Enrolment
                                  </span>
                                  <span className="text-[6.5px] font-mono text-white bg-black border border-black px-1.5 py-0.5 rounded-md font-bold scale-[0.95]">Verified</span>
                                </div>
                                <div className="flex justify-between items-center text-[8.5px]">
                                  <span className="text-black flex items-center gap-1.5 font-medium">
                                    <FileText className="w-3.5 h-3.5 text-black shrink-0" /> Address Certificate
                                  </span>
                                  <span className="text-[6.5px] font-mono text-black bg-zinc-100 border border-zinc-300 px-1.5 py-0.5 rounded-md font-bold scale-[0.95]">Soon</span>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                </BrowserPlaceholder>
              </div>

            </div>
          </div>
        </div>
      )}

        {/* ── Slide dots ── */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 transition-opacity duration-300"
          style={{ opacity: sliderOpacity }}
        >
          <SlideDots total={9} active={activeSlide} />
        </div>

        {/* ── Scroll hint ── */}
        {progress < 0.94 && (
          <div
            className="absolute bottom-8 right-8 z-40 flex items-center gap-2"
            style={{ opacity: interp(progress, 0, 0.08, 0, 0.55) }}
          >
            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold">scroll to continue</span>
          </div>
        )}

        {/* ── Slide label (top left) ── */}
        <div
          className="absolute top-8 left-0 right-0 z-40 pointer-events-none transition-opacity duration-500 flex justify-center"
          style={{ opacity: interp(progress, 0, 0.08, 0, 1) * sliderOpacity }}
        >
          <div className="max-w-[1440px] w-full px-6 md:px-12 lg:px-20">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-bold">
                {SLIDE_LABELS[activeSlide] ?? ""}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
