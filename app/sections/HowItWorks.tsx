"use client";

import { BrowserPlaceholder, PaprsWebDashboardCard, WebFloatingNav } from "@/app/components/BrowserWindow";
import { OnboardingWebView } from "@/app/components/OnboardingWebView";
import Lottie from "lottie-react";
import { Check, ChevronRight, Clock, Cpu, FileText, Loader2, Lock, MapPin, Shield, Sparkles } from "lucide-react";
import React, { useEffect, useRef } from "react";
import aiGeneratingAnimation from "../../assets/animations/AI Generating Response.json";
import DocumentCard from "../components/DocumentCard";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { useLanguage } from "../context/LanguageContext";

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
  const { dict } = useLanguage();
  const rawItems = [
    { id: 1, text: dict.howItWorks.aiLogger.matchedRoute },
    { id: 2, text: dict.howItWorks.aiLogger.verifiedForms },
    { id: 3, text: dict.howItWorks.aiLogger.orderedTasks },
  ];
  const [order, setOrder] = React.useState([0, 1, 2]);
  const [status, setStatus] = React.useState<"loading" | "done">("loading");

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStatus((prev) => {
        if (prev === "loading") {
          return "done";
        } else {
          setOrder((prevOrder) => {
            const next = [...prevOrder];
            const first = next.shift();
            if (first !== undefined) {
              next.push(first);
            }
            return next;
          });
          return "loading";
        }
      });
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  const items = order.map((idx) => rawItems[idx]);

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

export default function HowItWorks() {
  const { ref, progress } = useScrollProgress();
  const { dict } = useLanguage();

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
  const activeSlide = Math.min(N - 1, Math.max(0, Math.round(translatePercent / SW)));

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

  const cardOpacity = 1;

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
    if (p < 0.195) return 0;
    if (p < 0.23) {
      return interp(p, 0.195, 0.23, 0, -16.6667);
    }
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

  const getActiveNavTab = (): "dashboard" | "todo" | "vault" | "assistant" => {
    if (activeSlide <= 0) return "dashboard";
    if (activeSlide === 1) return "todo";
    if (activeSlide === 2 || activeSlide === 3 || activeSlide === 5) return "todo";
    if (activeSlide === 4) return "dashboard";
    if (activeSlide === 6) return "vault";
    if (activeSlide >= 7) return "assistant";
    return "dashboard";
  };

  const getBrowserUrl = (): string => {
    if (activeSlide === 1) return "app.paprs.app/onboarding";
    if (activeSlide === 2) {
      if (s2p < 0.22) return "app.paprs.app/building-route";
      return "app.paprs.app/todos";
    }
    if (activeSlide === 3 || activeSlide === 5) return "app.paprs.app/todos";
    if (activeSlide === 6) return "app.paprs.app/vault";
    if (activeSlide >= 7) return "app.paprs.app/assistant";
    return "app.paprs.app/dashboard";
  };

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
              <div
                className="w-full md:w-5/12 flex flex-col justify-center p-6 sm:p-8 rounded-3xl glass-card-subtle relative z-20 transition-all"
              >
                <span className="font-mono text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full w-fit">
                  {dict.howItWorks.fromConfusionTag}
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-black mt-6 mb-4 leading-tight">
                  {dict.howItWorks.turnsMazeTitle}
                </h3>
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                  {dict.howItWorks.turnsMazeDesc}
                </p>
                <OutcomePills items={dict.howItWorks.pillsSlide0} />
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
                    {dict.howItWorks.segSocialRouteReady}
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
                  {dict.howItWorks.step01Tag}
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-black mt-6 mb-4 leading-tight">
                  {dict.howItWorks.tellOnceTitle}
                </h3>
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                  {dict.howItWorks.tellOnceDesc}
                </p>
                <OutcomePills items={dict.howItWorks.pillsSlide1} />
              </div>

              <div className="w-full md:w-6/12 h-[65vh] md:h-full flex-shrink-0" />
            </div>
          </div>

          {/* SLIDE 2 — Your Roadmap & Action Steps */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
            <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between relative">
              <div className="w-full md:w-5/12 flex flex-col justify-center relative min-h-[220px]">
                <span className="font-mono text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full w-fit">
                  {dict.howItWorks.step02Tag}
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
                      {dict.howItWorks.phase1Title}
                    </h3>
                    <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                      {dict.howItWorks.phase1Desc}
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
                      {dict.howItWorks.phase2Title}
                    </h3>
                    <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                      {dict.howItWorks.phase2Desc}
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
                      {dict.howItWorks.phase3Title}
                    </h3>
                    <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                      {dict.howItWorks.phase3Desc}
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
                      {dict.howItWorks.phase4Title}
                    </h3>
                    <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                      {dict.howItWorks.phase4Desc}
                    </p>
                  </div>
                </div>
                <OutcomePills items={dict.howItWorks.pillsSlide2} />
              </div>
              <div className="hidden md:block md:w-6/12 h-full flex-shrink-0" />
            </div>
          </div>

          {/* SLIDE 3 — Command Centre */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
            <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between relative">
              <div className="w-full md:w-5/12 flex flex-col justify-center">
                <span className="font-mono text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full w-fit">
                  {dict.howItWorks.step03Tag}
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-black mt-6 mb-4 leading-tight">
                  {dict.howItWorks.whatDoIDoTitle}
                </h3>
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                  {dict.howItWorks.whatDoIDoDesc}
                </p>
                <OutcomePills items={dict.howItWorks.pillsSlide3} />
              </div>
              <div className="hidden md:block md:w-6/12 h-full flex-shrink-0" />
            </div>
          </div>

          {/* SLIDE 4 — Urgent Alerts */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
            <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between relative">
              <div className="w-full md:w-5/12 flex flex-col justify-center">
                <span className="font-mono text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full w-fit">
                  {dict.howItWorks.step04Tag}
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-black mt-6 mb-4 leading-tight">
                  {dict.howItWorks.deadlinesTitle}
                </h3>
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                  {dict.howItWorks.deadlinesDesc}
                </p>
                <OutcomePills items={dict.howItWorks.pillsSlide4} />
              </div>
              <div className="hidden md:block md:w-6/12 h-full flex-shrink-0" />
            </div>
          </div>

          {/* SLIDE 5 — Live Process Tracking */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
            <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between relative">
              <div className="w-full md:w-5/12 flex flex-col justify-center">
                <span className="font-mono text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full w-fit">
                  {dict.howItWorks.step05Tag}
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-black mt-6 mb-4 leading-tight">
                  {dict.howItWorks.whoHasTheBallTitle}
                </h3>
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                  {dict.howItWorks.whoHasTheBallDesc}
                </p>
                <OutcomePills items={dict.howItWorks.pillsSlide5} />
              </div>
              <div className="hidden md:block md:w-6/12 h-full flex-shrink-0" />
            </div>
          </div>

          {/* SLIDE 6 — Document Vault */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
            <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between relative">
              <div className="w-full md:w-5/12 flex flex-col justify-center">
                <span className="font-mono text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full w-fit">
                  {dict.howItWorks.step06Tag}
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-black mt-6 mb-4 leading-tight">
                  {dict.howItWorks.workingMemoryTitle}
                </h3>
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                  {dict.howItWorks.workingMemoryDesc}
                </p>
                <OutcomePills items={dict.howItWorks.pillsSlide6} />
              </div>
              <div className="hidden md:block md:w-6/12 h-full flex-shrink-0" />
            </div>
          </div>

          {/* SLIDE 7 — Smart Recommendations */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
            <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between relative">
              <div className="w-full md:w-5/12 flex flex-col justify-center">
                <span className="font-mono text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full w-fit">
                  {dict.howItWorks.step07Tag}
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-black mt-6 mb-4 leading-tight">
                  {dict.howItWorks.whenLifeChangesTitle}
                </h3>
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                  {dict.howItWorks.whenLifeChangesDesc}
                </p>
                <OutcomePills items={dict.howItWorks.pillsSlide7} />
              </div>
              <div className="hidden md:block md:w-6/12 h-full flex-shrink-0" />
            </div>
          </div>

          {/* SLIDE 8 — Pocket Agency */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
            <div className="max-w-[1440px] w-full h-full mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between relative">
              <div className="w-full md:w-5/12 flex flex-col justify-center">
                <span className="font-mono text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full w-fit">
                  {dict.howItWorks.step08Tag}
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-black mt-6 mb-4 leading-tight">
                  {dict.howItWorks.pocketAgencyTitle}
                </h3>
                <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-md">
                  {dict.howItWorks.pocketAgencyDesc}
                </p>
                <OutcomePills items={dict.howItWorks.pillsSlide8} />
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
            opacity: `calc(clamp(0, (var(--doc-transition-progress, 0) - 0.1) * 1.25, 1))`,
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
                  url={getBrowserUrl()}
                  badgeText="Live"
                  shadow="shadow-[0_24px_60px_-15px_rgba(0,0,0,0.14)]"
                  className="h-[520px] md:h-[540px]"
                  headerContent={
                    (activeSlide > 2 || (activeSlide === 2 && s2p >= 0.22)) ? (
                      <WebFloatingNav activeTab={getActiveNavTab()} />
                    ) : null
                  }
                >
                  {/* Dashboard Screen Slider Container */}
                  <div className="flex-1 min-h-0 relative overflow-hidden bg-white">
                    <div
                      className="h-full flex transition-transform duration-300"
                      style={{
                        width: "600%",
                        transform: `translateX(${getPhoneTranslateX(progress, s2p)}%)`
                      }}
                    >
                        {/* SCREEN 0: Onboarding Questions (Authentic Web App Experience) */}
                        <div className="w-1/6 h-full flex-shrink-0 flex flex-col bg-[#FFFFFF] relative overflow-hidden">
                          <OnboardingWebView s1p={s1p} />
                        </div>

                        {/* SCREEN 1: AI Roadmap Computing */}
                        <div className="w-1/6 h-full flex-shrink-0 flex flex-col p-4 pb-6 bg-white justify-between relative">
                          <div className="flex flex-col items-center gap-2 mt-4 relative z-10">
                            <div className="text-[7.5px] font-mono text-black uppercase tracking-widest font-extrabold flex items-center gap-1.5 bg-zinc-100 border border-zinc-300 px-2.5 py-0.5 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                              {dict.howItWorks.buildingYourRoute}
                            </div>

                            <div className="w-24 h-24 flex items-center justify-center my-1 select-none pointer-events-none">
                              <Lottie
                                animationData={aiGeneratingAnimation}
                                loop={true}
                                className="w-full h-full scale-[1.1]"
                              />
                            </div>
                          </div>

                          <AIComputingLogger />
                        </div>

                        {/* SCREEN 2: Onboarding Complete / Route Assembled */}
                        <div className="w-1/6 h-full flex-shrink-0 flex flex-col p-4 pb-4 bg-zinc-50/40 justify-between">
                          <div className="flex flex-col gap-3">
                            <div className="flex flex-col items-center text-center gap-1 mt-1">
                              <div className="w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-black shadow-xs">
                                <Sparkles className="w-4 h-4 text-black animate-pulse" />
                              </div>
                              <span className="font-mono text-[7px] uppercase font-bold text-zinc-400 tracking-wider">{dict.howItWorks.analysisComplete}</span>
                              <h4 className="font-syne font-extrabold text-[11.5px] text-black leading-tight">
                                {dict.howItWorks.yourRouteIsReady}
                              </h4>
                              <p className="text-[7.5px] text-zinc-500 max-w-[190px] leading-relaxed">
                                {dict.howItWorks.matchedRouteDesc}
                              </p>
                            </div>

                            <div className="flex flex-col gap-1.5 mt-1">
                              <span className="text-[7px] font-mono text-zinc-400 uppercase tracking-wider font-bold px-0.5">{dict.howItWorks.assembledActionPlans}</span>
                              <div className="bg-white border border-zinc-200/80 p-2 rounded-xl flex items-center gap-2 shadow-2xs">
                                <div className="w-6 h-6 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-black shrink-0">
                                  <MapPin className="w-3 h-3" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h6 className="text-[8.5px] font-bold text-black leading-tight">1. {dict.howItWorks.studentRenewal}</h6>
                                  <p className="text-[6.5px] text-zinc-500 font-mono">{dict.howItWorks.studentRenewalDocs}</p>
                                </div>
                                <span className="font-mono text-[6.5px] bg-zinc-100 text-black px-1.5 py-0.5 rounded font-bold uppercase">{dict.howItWorks.ready}</span>
                              </div>
                              <div className="bg-white border border-zinc-200/80 p-2 rounded-xl flex items-center gap-2 shadow-2xs">
                                <div className="w-6 h-6 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-black shrink-0">
                                  <FileText className="w-3 h-3" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h6 className="text-[8.5px] font-bold text-black leading-tight">2. {dict.howItWorks.empadronamiento}</h6>
                                  <p className="text-[6.5px] text-zinc-500 font-mono">{dict.howItWorks.empadronamientoDesc}</p>
                                </div>
                                <span className="font-mono text-[6.5px] bg-zinc-100 text-black px-1.5 py-0.5 rounded font-bold uppercase">{dict.howItWorks.ready}</span>
                              </div>
                              <div className="bg-white border border-zinc-200/80 p-2 rounded-xl flex items-center gap-2 shadow-2xs">
                                <div className="w-6 h-6 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-black shrink-0">
                                  <Shield className="w-3 h-3" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h6 className="text-[8.5px] font-bold text-black leading-tight">3. {dict.howItWorks.socialSecurityNuss}</h6>
                                  <p className="text-[6.5px] text-zinc-500 font-mono">{dict.howItWorks.socialSecurityDesc}</p>
                                </div>
                                <span className="font-mono text-[6.5px] bg-zinc-50 text-zinc-400 px-1.5 py-0.5 rounded font-bold uppercase">{dict.howItWorks.locked}</span>
                              </div>
                            </div>
                          </div>

                          <div className="w-full py-2 bg-black text-white rounded-xl text-[8px] font-bold font-mono flex items-center justify-center gap-1.5 shadow-xs cursor-pointer hover:bg-zinc-800 transition-colors">
                            {dict.howItWorks.buildMyRoadmap} <Cpu className="w-3 h-3 text-white" />
                          </div>
                        </div>

                        {/* SCREEN 3: Action Plans / Roadmap */}
                        <div className="w-1/6 h-full flex-shrink-0 flex flex-col p-3.5 bg-zinc-50/40 justify-between">
                          <div className="flex flex-col gap-2.5">
                            {/* Filter Bar matching TodoScreen */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 font-mono text-[7px]">
                                <span className="bg-black text-white px-2 py-0.5 rounded-full font-bold">{dict.howItWorks.filterAll}</span>
                                <span className="text-zinc-500 hover:text-black px-1.5 py-0.5 rounded-full font-medium">{dict.howItWorks.filterPending}</span>
                                <span className="text-zinc-500 hover:text-black px-1.5 py-0.5 rounded-full font-medium">{dict.howItWorks.filterCompleted}</span>
                              </div>
                              <span className="font-mono text-[7px] text-zinc-400 font-bold">{dict.howItWorks.spainRoute}</span>
                            </div>

                            <div className="flex flex-col gap-2 relative">
                              <div className="absolute left-[13px] top-3.5 bottom-3.5 w-[1px] bg-zinc-200 z-0" />

                              {/* Card 1: Check evidence */}
                              <div className="bg-white border border-zinc-200/80 p-2.5 rounded-xl shadow-2xs flex items-center justify-between gap-2 relative z-10">
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className="w-2.5 h-2.5 rounded-full bg-black border-2 border-white flex-shrink-0 shadow-2xs" />
                                  <div className="min-w-0">
                                    <h6 className="font-syne font-extrabold text-[9px] text-black leading-tight">1. {dict.howItWorks.checkEvidenceTitle}</h6>
                                    <p className="text-[6.5px] font-mono text-zinc-400 mt-0.5">{dict.howItWorks.checkEvidenceDesc}</p>
                                  </div>
                                </div>
                                <span className="text-[6.5px] font-mono text-white bg-black border border-black px-1.5 py-0.5 rounded font-bold uppercase shrink-0">{dict.howItWorks.ready}</span>
                              </div>

                              {/* Card 2: Review prepared forms */}
                              <div className="bg-white border-2 border-black p-2.5 rounded-xl shadow-xs flex items-center justify-between gap-2 relative z-10">
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className="w-2.5 h-2.5 rounded-full bg-black border-2 border-white flex-shrink-0 shadow-2xs relative">
                                    <div className="absolute inset-0 rounded-full bg-black/20 animate-ping" />
                                  </div>
                                  <div className="min-w-0">
                                    <h6 className="font-syne font-extrabold text-[9px] text-black leading-tight">2. {dict.howItWorks.reviewFormsTitle}</h6>
                                    <p className="text-[6.5px] font-mono text-zinc-500 mt-0.5">{dict.howItWorks.reviewFormsDesc}</p>
                                  </div>
                                </div>
                                <span className="text-[6.5px] font-mono text-black bg-zinc-100 border border-zinc-300 px-1.5 py-0.5 rounded font-bold uppercase shrink-0">{dict.howItWorks.active}</span>
                              </div>

                              {/* Card 3: Approve digital submission */}
                              <div className="bg-white border border-zinc-200/80 p-2.5 rounded-xl shadow-2xs flex items-center justify-between gap-2 relative z-10 opacity-60">
                                <div className="flex items-center gap-2 min-w-0">
                                  <Lock className="w-2.5 h-2.5 text-zinc-400 flex-shrink-0" />
                                  <div className="min-w-0">
                                    <h6 className="font-syne font-extrabold text-[9px] text-black leading-tight">3. {dict.howItWorks.approveSubmissionTitle}</h6>
                                    <p className="text-[6.5px] font-mono text-zinc-400 mt-0.5">{dict.howItWorks.approveSubmissionDesc}</p>
                                  </div>
                                </div>
                                <span className="text-[6.5px] font-mono text-zinc-400 bg-zinc-50 border border-zinc-200 px-1.5 py-0.5 rounded font-bold uppercase shrink-0">{dict.howItWorks.locked}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-[7px] font-mono text-center text-zinc-400 flex items-center justify-center gap-1 font-medium">
                            Scroll down to explore procedure details →
                          </div>
                        </div>

                        {/* SCREEN 4: Detail Action Checklist */}
                        <div className="w-1/6 h-full flex-shrink-0 flex flex-col p-3.5 bg-zinc-50/40 justify-between">
                          <div className="flex flex-col gap-2.5">
                            {/* Breadcrumb Header */}
                            <div className="flex justify-between items-center border-b border-zinc-200/80 pb-2">
                              <div>
                                <span className="font-mono text-[6.5px] uppercase text-zinc-400 font-bold">{dict.howItWorks.actionPlansBreadcrumb}</span>
                                <h4 className="font-syne font-extrabold text-[11px] text-black leading-tight mt-0.5">{dict.howItWorks.studentRenewal}</h4>
                              </div>
                              <span className="text-[6.5px] px-1.5 py-0.5 rounded bg-zinc-100 text-black border border-zinc-200 uppercase font-bold shrink-0">{dict.howItWorks.active}</span>
                            </div>

                            {/* Sequential Steps */}
                            <div className="flex flex-col gap-2 relative mt-0.5">
                              <div className="absolute left-[9px] top-2.5 bottom-2.5 w-[1px] bg-zinc-200 z-0" />

                              <div className="flex items-start gap-2 relative z-10 text-[9px]">
                                <div className="w-4.5 h-4.5 rounded-full bg-black border border-black flex items-center justify-center text-white flex-shrink-0 shadow-2xs">
                                  <Check className="w-2.5 h-2.5 text-white stroke-[2.5]" />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-bold text-zinc-400 line-through decoration-zinc-300 leading-tight">{dict.howItWorks.matchOfficialRoute}</p>
                                  <p className="text-[6.5px] text-zinc-400 font-mono">{dict.howItWorks.matchOfficialRouteDesc}</p>
                                </div>
                              </div>

                              <div className="flex items-start gap-2 relative z-10 text-[9px]">
                                <div className="w-4.5 h-4.5 rounded-full bg-black border border-black flex items-center justify-center text-white flex-shrink-0 shadow-2xs">
                                  <Check className="w-2.5 h-2.5 text-white stroke-[2.5]" />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-bold text-zinc-400 line-through decoration-zinc-300 leading-tight">{dict.howItWorks.prepareFormFee}</p>
                                  <p className="text-[6.5px] text-zinc-400 font-mono">{dict.howItWorks.prepareFormFeeDesc}</p>
                                </div>
                              </div>

                              <div className="flex items-start gap-2 relative z-10 text-[9px]">
                                {s2p >= 0.95 ? (
                                  <div className="w-4.5 h-4.5 rounded-full bg-black border border-black flex items-center justify-center text-white flex-shrink-0 shadow-2xs">
                                    <Check className="w-2.5 h-2.5 text-white stroke-[2.5]" />
                                  </div>
                                ) : (
                                  <div className="w-4.5 h-4.5 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-black flex-shrink-0 shadow-2xs">
                                    <ChevronRight className="w-2.5 h-2.5 text-black" />
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <p className={`font-bold leading-tight ${s2p >= 0.95 ? "text-zinc-400 line-through decoration-zinc-300" : "text-black"}`}>{dict.howItWorks.reviewAndApprove}</p>
                                  <p className="text-[6.5px] text-zinc-500 font-mono">{dict.howItWorks.reviewAndApproveDesc}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center border-t border-zinc-200/80 pt-2.5">
                            <div className="w-[55%]">
                              <span className="text-[6.5px] font-mono text-zinc-400 block mb-0.5 font-bold uppercase">{dict.howItWorks.actionReadiness}</span>
                              <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                                <div 
                                  className="bg-black h-full transition-all duration-300 rounded-full" 
                                  style={{ width: `${interp(s2p, 0.80, 0.95, 66, 100)}%` }} 
                                />
                              </div>
                            </div>

                            <div 
                              className="border-2 border-black bg-black text-white rounded px-2 py-0.5 font-mono font-bold text-[7.5px] tracking-wider uppercase rotate-[-6deg] shadow-xs transition-all duration-300 flex items-center gap-0.5"
                              style={{
                                transform: `scale(${s2p >= 0.95 ? 1 : 1.25}) rotate(-6deg)`,
                                opacity: s2p >= 0.95 ? 1 : 0
                              }}
                            >
                              <Check className="w-2.5 h-2.5 text-white" /> {dict.howItWorks.doneBadge}
                            </div>
                          </div>
                        </div>

                        {/* SCREEN 5: Dashboard View with Metrics & Interactive Overlays */}
                        <div
                          ref={dashboardScrollRef}
                          className="w-1/6 h-full min-h-0 flex-shrink-0 flex flex-col p-3 gap-2.5 select-none bg-zinc-50/40 overflow-y-auto scrollbar-none"
                        >
                          {/* Top 3-Metric Summary Row */}
                          <div className="grid grid-cols-3 gap-1.5 shrink-0">
                            <div className="bg-white border border-zinc-200/80 p-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs">
                              <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 24 24">
                                  <circle cx="12" cy="12" r="9" className="stroke-zinc-200" strokeWidth="2.5" fill="transparent" />
                                  <circle cx="12" cy="12" r="9" className="stroke-black" strokeWidth="2.5" fill="transparent" strokeDasharray="56.54" strokeDashoffset="11.3" strokeLinecap="round" />
                                </svg>
                                <span className="absolute text-[5.5px] font-mono font-bold text-black">80%</span>
                              </div>
                              <div className="min-w-0">
                                <span className="text-[5.5px] font-mono uppercase text-zinc-400 block font-bold leading-none">{dict.howItWorks.healthMetric}</span>
                                <p className="text-[7.5px] font-syne font-bold text-black leading-tight mt-0.5 truncate">{dict.howItWorks.active}</p>
                              </div>
                            </div>

                            <div className="bg-white border border-zinc-200/80 p-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs">
                              <div className="w-5 h-5 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0 border border-zinc-200/60">
                                <FileText className="w-2.5 h-2.5 text-black" />
                              </div>
                              <div className="min-w-0">
                                <span className="text-[5.5px] font-mono uppercase text-zinc-400 block font-bold leading-none">{dict.howItWorks.docsMetric}</span>
                                <p className="text-[7.5px] font-syne font-bold text-black leading-tight mt-0.5 truncate">4 of 5</p>
                              </div>
                            </div>

                            <div className="bg-white border border-zinc-200/80 p-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs">
                              <div className="w-5 h-5 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0 border border-zinc-200/60">
                                <Clock className="w-2.5 h-2.5 text-black" />
                              </div>
                              <div className="min-w-0">
                                <span className="text-[5.5px] font-mono uppercase text-zinc-400 block font-bold leading-none">{dict.howItWorks.targetMetric}</span>
                                <p className="text-[7.5px] font-syne font-bold text-black leading-tight mt-0.5 truncate">in 52d</p>
                              </div>
                            </div>
                          </div>

                          {/* STAGE 2: Urgent Action Alert (Slide 4) */}
                          <div
                            className="grid transition-all duration-300 shrink-0"
                            style={{ gridTemplateRows: stage2AlertOpacity > 0.02 ? "1fr" : "0fr" }}
                          >
                            <div
                              className="overflow-hidden transition-all duration-300"
                              style={{
                                opacity: stage2AlertOpacity,
                                transform: `translateY(${stage2AlertOpacity > 0 ? 0 : 10}px)`,
                              }}
                            >
                              <div className="bg-white border-2 border-black p-2.5 rounded-xl shadow-xs">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-[6.5px] uppercase font-mono tracking-wider text-black font-extrabold flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full animate-ping" />
                                    {dict.howItWorks.urgentActionAlert}
                                  </span>
                                  <span className="text-[6.5px] font-mono text-white bg-black px-1.5 py-0.2 rounded font-bold">
                                    52 {dict.howItWorks.daysLeft}
                                  </span>
                                </div>
                                <h6 className="font-syne font-extrabold text-[9.5px] text-black leading-tight">{dict.howItWorks.studentRenewal}</h6>
                                <p className="text-[7px] text-zinc-500 mt-0.5 leading-snug">
                                  {dict.howItWorks.urgentRenewalDesc}
                                </p>
                                <div className="mt-2 w-full py-1.5 bg-black text-white rounded-lg text-[7.5px] font-bold flex items-center justify-center font-mono cursor-pointer shadow-xs gap-1 hover:bg-zinc-800 transition-colors">
                                  {dict.howItWorks.reviewPreparedAction} <ChevronRight className="w-2.5 h-2.5 text-white" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* STAGE 5: Smart AI Suggestion (Slide 7) */}
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
                              <div className="bg-white border-2 border-black p-2.5 rounded-xl shadow-xs">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-[6.5px] uppercase font-mono tracking-wider text-black font-extrabold flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                                    {dict.howItWorks.aiRecommendation}
                                  </span>
                                  <span className="text-[6.5px] font-mono text-black font-extrabold bg-zinc-100 px-1.5 py-0.2 rounded border border-zinc-300">
                                    15 {dict.howItWorks.daysLeft}
                                  </span>
                                </div>
                                <h6 className="font-syne font-extrabold text-[9.5px] text-black leading-tight">{dict.howItWorks.freshAddressProofNeeded}</h6>
                                <p className="text-[7px] text-zinc-500 mt-0.5 leading-snug">
                                  {dict.howItWorks.freshAddressProofDesc}
                                </p>
                                <div className="mt-2 w-full py-1.5 bg-black text-white rounded-lg text-[7.5px] font-bold flex items-center justify-center font-mono cursor-pointer shadow-xs gap-1 hover:bg-zinc-800 transition-colors">
                                  {dict.howItWorks.prepareFreshCopy} <ChevronRight className="w-2.5 h-2.5 text-white" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* STAGE 3: Active Procedures Pipeline (Slide 3 & 5) */}
                          <div 
                            className="flex flex-col gap-1.5 transition-all duration-300 shrink-0"
                            style={{ 
                              opacity: stage3CardsOpacity,
                              transform: `translateY(${stage3CardsOpacity > 0 ? 0 : 10}px)` 
                            }}
                          >
                            <div className="text-[6.5px] uppercase font-mono tracking-wider text-zinc-400 font-bold px-0.5">
                              {dict.howItWorks.activeProcedures}
                            </div>

                            <div className="bg-white border border-zinc-200/80 p-2 rounded-xl shadow-2xs flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-6 h-6 rounded-lg bg-zinc-100 flex items-center justify-center text-black border border-zinc-200 flex-shrink-0">
                                  <FileText className="w-3 h-3 text-black" />
                                </div>
                                <div className="min-w-0">
                                  <h6 className="font-syne font-bold text-[8.5px] text-black leading-tight truncate">{dict.howItWorks.studentRenewal}</h6>
                                  <p className="text-[6.5px] text-zinc-500 font-mono mt-0.5">4 of 5 documents ready</p>
                                </div>
                              </div>
                              <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 24 24">
                                  <circle cx="12" cy="12" r="9" className="stroke-zinc-200" strokeWidth="2.5" fill="transparent" />
                                  <circle cx="12" cy="12" r="9" className="stroke-black" strokeWidth="2.5" fill="transparent" strokeDasharray="56.54" strokeDashoffset="11.3" strokeLinecap="round" />
                                </svg>
                                <span className="absolute text-[5.5px] font-mono font-bold text-black">80%</span>
                              </div>
                            </div>

                            <div className="bg-white border border-zinc-200/80 p-2 rounded-xl shadow-2xs flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-6 h-6 rounded-lg bg-zinc-100 flex items-center justify-center text-black border border-zinc-200 flex-shrink-0">
                                  <MapPin className="w-3 h-3 text-black" />
                                </div>
                                <div className="min-w-0">
                                  <h6 className="font-syne font-bold text-[8.5px] text-black leading-tight truncate">{dict.howItWorks.empadronamiento}</h6>
                                  <p className="text-[6.5px] text-zinc-500 font-mono mt-0.5 flex items-center gap-0.5">
                                    <span className="w-1 h-1 bg-black rounded-full animate-pulse" />
                                    {dict.howItWorks.waitingOnCityOffice}
                                  </p>
                                </div>
                              </div>
                              <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 24 24">
                                  <circle cx="12" cy="12" r="9" className="stroke-zinc-200" strokeWidth="2.5" fill="transparent" />
                                  <circle cx="12" cy="12" r="9" className="stroke-black" strokeWidth="2.5" fill="transparent" strokeDasharray="56.54" strokeDashoffset="28.27" strokeLinecap="round" />
                                </svg>
                                <span className="absolute text-[5.5px] font-mono font-bold text-black">50%</span>
                              </div>
                            </div>
                          </div>

                          {/* STAGE 4: Document Vault Panel (Slide 6) */}
                          <div
                            className="grid transition-all duration-300 shrink-0"
                            style={{ gridTemplateRows: stage4VaultOpacity > 0.02 ? "1fr" : "0fr" }}
                          >
                            <div
                              className="overflow-hidden flex flex-col gap-1.5 transition-all duration-300"
                              style={{
                                opacity: stage4VaultOpacity,
                                transform: `translateY(${stage4VaultOpacity > 0 ? 0 : 10}px)`,
                              }}
                            >
                              <div className="text-[6.5px] uppercase font-mono tracking-wider text-zinc-400 font-bold px-0.5">
                                {dict.howItWorks.documentVault}
                              </div>

                              <div className="bg-white border border-zinc-200/80 p-2 rounded-xl shadow-2xs flex flex-col gap-1.5">
                                <div className="flex justify-between items-center text-[7.5px] border-b border-zinc-100 pb-1.5">
                                  <span className="text-black flex items-center gap-1.5 font-medium">
                                    <FileText className="w-3 h-3 text-black shrink-0" /> {dict.howItWorks.universityEnrolment}
                                  </span>
                                  <span className="text-[6px] font-mono text-white bg-black px-1.5 py-0.2 rounded font-bold">{dict.howItWorks.verified}</span>
                                </div>
                                <div className="flex justify-between items-center text-[7.5px]">
                                  <span className="text-black flex items-center gap-1.5 font-medium">
                                    <FileText className="w-3 h-3 text-black shrink-0" /> {dict.howItWorks.addressCertificate}
                                  </span>
                                  <span className="text-[6px] font-mono text-black bg-zinc-100 border border-zinc-200 px-1.5 py-0.2 rounded font-bold">{dict.howItWorks.extracted}</span>
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
            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 font-bold">{dict.hero.scrollToContinue}</span>
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
                {dict.howItWorks.slideLabels[activeSlide] ?? ""}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
