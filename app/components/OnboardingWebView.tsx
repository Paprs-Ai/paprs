"use client";

import React from "react";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Globe,
  Sparkles,
  Shield,
  GraduationCap,
  MapPin,
  Clock,
  Home as HomeIcon,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface OnboardingWebViewProps {
  s1p?: number; // 0 to 1 progress inside Slide 1
  className?: string;
}

export function OnboardingWebView({ s1p = 0.5, className = "" }: OnboardingWebViewProps) {
  const { dict } = useLanguage();
  // Derive active stage and percentage based on s1p
  // s1p < 0.35 => Stage 0 (Identity & Legal Status, ~28%)
  // 0.35 <= s1p < 0.65 => Stage 1 (Purpose & Studies, ~64%)
  // s1p >= 0.65 => Stage 2 (Location & Housing, ~92% -> 100%)
  const currentStage = s1p < 0.35 ? 0 : s1p < 0.65 ? 1 : 2;

  const percentage = Math.min(
    100,
    Math.round(
      s1p < 0.35
        ? 15 + (s1p / 0.35) * 20
        : s1p < 0.65
        ? 35 + ((s1p - 0.35) / 0.3) * 35
        : 70 + ((s1p - 0.65) / 0.35) * 30
    )
  );

  const steps = dict.onboarding.steps;

  // Active step index mapping
  const activeStepIndex = currentStage === 0 ? 1 : currentStage === 1 ? 2 : 3;

  return (
    <div className={`flex h-full w-full bg-white select-none overflow-hidden ${className}`}>
      <style>{`
        @keyframes selectTap {
          0% { transform: scale(1); }
          40% { transform: scale(0.97); }
          100% { transform: scale(1); }
        }
        @keyframes checkPop {
          0% { transform: scale(0.4); opacity: 0; }
          60% { transform: scale(1.15); opacity: 0.9; }
          100% { transform: scale(1); opacity: 1; }
        }
        .anim-tap { animation: selectTap 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
        .anim-pop { animation: checkPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>

      {/* ── Left Column: Stepper Sidebar (Matching Web App) ── */}
      <aside className="w-[38%] border-r border-zinc-200 bg-zinc-50/40 p-3 sm:p-3.5 flex flex-col justify-between shrink-0">
        <div className="flex flex-col gap-3">
          {/* Header with Circular Progress Gauge */}
          <div className="flex items-center justify-between gap-1.5 pb-2 border-b border-zinc-200/80">
            <div>
              <h4 className="font-syne font-extrabold text-[11px] text-black tracking-tight leading-tight">
                {dict.onboarding.title}
              </h4>
              <p className="text-[6.5px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                {dict.onboarding.subtitle}
              </p>
            </div>

            {/* Circular Progress Gauge */}
            <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  className="stroke-zinc-200"
                  strokeWidth="3.2"
                  fill="transparent"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  className="stroke-black transition-all duration-500 ease-out"
                  strokeWidth="3.2"
                  strokeDasharray="87.96"
                  strokeDashoffset={87.96 - (percentage / 100) * 87.96}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <span className="absolute text-[7px] font-mono font-black text-black">
                {percentage}%
              </span>
            </div>
          </div>

          {/* Connected Vertical Stepper with continuous line */}
          <nav className="flex flex-col pt-0.5 relative">
            {steps.map((step: { title: string; subtitle: string }, idx: number) => {
              const isCompleted = idx < activeStepIndex;
              const isActive = idx === activeStepIndex;
              const isLast = idx === steps.length - 1;

              return (
                <div key={idx} className="relative flex items-start group">
                  {/* Connecting Vertical Line */}
                  {!isLast && (
                    <div
                      className={`absolute left-2.5 top-5 bottom-0 w-[1.5px] -translate-x-1/2 transition-colors duration-300 ${
                        isCompleted ? "bg-black" : "bg-zinc-200"
                      }`}
                    />
                  )}

                  {/* Step Item */}
                  <div
                    className={`flex items-start gap-2 pb-2.5 w-full transition-opacity duration-300 ${
                      isActive
                        ? "opacity-100"
                        : isCompleted
                        ? "opacity-85"
                        : "opacity-35"
                    }`}
                  >
                    {/* Node Badge */}
                    <div
                      className={`relative z-10 flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-mono font-bold shrink-0 transition-all ${
                        isCompleted
                          ? "bg-black text-white shadow-xs"
                          : isActive
                          ? "bg-black text-white ring-2 ring-zinc-200 shadow-xs"
                          : "bg-zinc-200 text-zinc-600"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 pt-0.5">
                      <p
                        className={`text-[8px] font-bold truncate leading-tight ${
                          isActive
                            ? "text-black"
                            : isCompleted
                            ? "text-zinc-900"
                            : "text-zinc-500"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-[6.5px] text-zinc-400 truncate leading-none mt-0.5">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Hint */}
        <div className="pt-2 border-t border-zinc-200/80 flex items-center justify-between text-[6.5px] font-mono text-zinc-400">
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            AI Logic Engine
          </span>
          <span>Spain Route</span>
        </div>
      </aside>

      {/* ── Right Column: Interactive Questionnaire Canvas ── */}
      <section className="flex-1 p-3.5 sm:p-4 bg-white flex flex-col justify-between overflow-y-auto scrollbar-none">
        {/* Step Header */}
        <div className="flex flex-col gap-0.5 pb-2.5 border-b border-zinc-100">
          <div className="flex items-center gap-1.5">
            <span className="rounded-full bg-zinc-100 border border-zinc-200 px-2 py-0.5 text-[7px] font-mono font-bold text-zinc-700 uppercase tracking-wider">
              {dict.onboarding.stepCount.replace("{step}", String(activeStepIndex + 1)).replace("{total}", String(steps.length))}
            </span>
            {percentage === 100 && (
              <span className="rounded-full bg-black text-white px-2 py-0.5 text-[7px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                <Check className="w-2 h-2 text-white" /> {dict.onboarding.complete}
              </span>
            )}
          </div>

          <h3 className="text-[12px] sm:text-[13px] font-syne font-extrabold text-black tracking-tight leading-tight mt-1">
            {currentStage === 0
              ? dict.onboarding.stage0.title
              : currentStage === 1
              ? dict.onboarding.stage1.title
              : dict.onboarding.stage2.title}
          </h3>
          <p className="text-[7.5px] text-zinc-500 leading-snug">
            {currentStage === 0
              ? dict.onboarding.stage0.desc
              : currentStage === 1
              ? dict.onboarding.stage1.desc
              : dict.onboarding.stage2.desc}
          </p>
        </div>

        {/* Questionnaire Body */}
        <div className="flex-1 flex flex-col justify-center py-2.5 gap-3">
          {/* ── STAGE 0: Identity & Passport ── */}
          {currentStage === 0 && (
            <div className="flex flex-col gap-3 animate-fadeIn">
              {/* Question 1: Country Picker */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[8px] font-mono uppercase tracking-wider font-extrabold text-black flex items-center gap-1">
                  <Globe className="w-2.5 h-2.5 text-zinc-600" />
                  {dict.onboarding.stage0.q1Label}
                </label>

                {/* Country Selector Dropdown Simulation */}
                <div
                  className={`py-1.5 px-2.5 border rounded-xl flex items-center justify-between transition-all duration-300 shadow-xs ${
                    s1p > 0.14
                      ? "border-black bg-zinc-100 anim-tap"
                      : "border-zinc-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] leading-none">🇬🇧</span>
                    <span
                      className={`text-[8px] font-mono ${
                        s1p > 0.14 ? "text-black font-bold" : "text-zinc-500 font-medium"
                      }`}
                    >
                      {dict.onboarding.stage0.q1Selected}
                    </span>
                  </div>
                  {s1p > 0.14 ? (
                    <div className="w-3.5 h-3.5 rounded-full bg-black flex items-center justify-center anim-pop shadow-xs">
                      <Check className="w-2 h-2 text-white stroke-[2.5]" />
                    </div>
                  ) : (
                    <ChevronDown className="w-3 h-3 text-zinc-400" />
                  )}
                </div>

                {/* Quick select chips */}
                <div className="flex gap-1.5 mt-0.5">
                  <span className="text-[7px] font-mono px-2 py-0.5 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-400">
                    🇺🇸 United States
                  </span>
                  <span className="text-[7px] font-mono px-2 py-0.5 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-400">
                    🇪🇺 EU Member
                  </span>
                </div>
              </div>

              {/* Question 2: Passport Validity */}
              <div className="flex flex-col gap-1.5 border-t border-zinc-100 pt-2">
                <label className="text-[8px] font-mono uppercase tracking-wider font-extrabold text-black flex items-center gap-1">
                  <Shield className="w-2.5 h-2.5 text-zinc-600" />
                  {dict.onboarding.stage0.q2Label}
                </label>

                <div className="flex flex-col gap-1.5">
                  <div
                    className={`py-1.5 px-2.5 border rounded-xl flex items-center justify-between transition-all duration-300 shadow-xs ${
                      s1p > 0.24
                        ? "border-black bg-zinc-100 anim-tap"
                        : "border-zinc-200 bg-white"
                    }`}
                  >
                    <span
                      className={`text-[8px] font-mono ${
                        s1p > 0.24 ? "text-black font-bold" : "text-zinc-500 font-medium"
                      }`}
                    >
                      {dict.onboarding.stage0.q2Option1}
                    </span>
                    {s1p > 0.24 ? (
                      <div className="w-3.5 h-3.5 rounded-full bg-black flex items-center justify-center anim-pop shadow-xs">
                        <Check className="w-2 h-2 text-white stroke-[2.5]" />
                      </div>
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-zinc-300 bg-white" />
                    )}
                  </div>

                  <div className="py-1.5 px-2.5 border border-zinc-200 bg-white rounded-xl flex items-center justify-between opacity-50">
                    <span className="text-[8px] text-zinc-400 font-mono">
                      {dict.onboarding.stage0.q2Option2}
                    </span>
                    <div className="w-3.5 h-3.5 rounded-full border border-zinc-300 bg-white" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STAGE 1: Studies & Visa Expiry ── */}
          {currentStage === 1 && (
            <div className="flex flex-col gap-3 animate-fadeIn">
              {/* Question 1: Purpose of Stay */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[8px] font-mono uppercase tracking-wider font-extrabold text-black flex items-center gap-1">
                  <GraduationCap className="w-2.5 h-2.5 text-zinc-600" />
                  {dict.onboarding.stage1.q1Label}
                </label>

                <div className="flex flex-col gap-1.5">
                  <div
                    className={`py-1.5 px-2.5 border rounded-xl flex items-center justify-between transition-all duration-300 shadow-xs ${
                      s1p > 0.44
                        ? "border-black bg-zinc-100 anim-tap"
                        : "border-zinc-200 bg-white"
                    }`}
                  >
                    <span
                      className={`text-[8px] font-mono ${
                        s1p > 0.44 ? "text-black font-bold" : "text-zinc-500 font-medium"
                      }`}
                    >
                      {dict.onboarding.stage1.q1Option1}
                    </span>
                    {s1p > 0.44 ? (
                      <div className="w-3.5 h-3.5 rounded-full bg-black flex items-center justify-center anim-pop shadow-xs">
                        <Check className="w-2 h-2 text-white stroke-[2.5]" />
                      </div>
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-zinc-300 bg-white" />
                    )}
                  </div>

                  <div className="py-1.5 px-2.5 border border-zinc-200 bg-white rounded-xl flex items-center justify-between opacity-50">
                    <span className="text-[8px] text-zinc-400 font-mono">
                      {dict.onboarding.stage1.q1Option2}
                    </span>
                    <div className="w-3.5 h-3.5 rounded-full border border-zinc-300 bg-white" />
                  </div>
                </div>
              </div>

              {/* Question 2: Current Permit Timeline */}
              <div className="flex flex-col gap-1.5 border-t border-zinc-100 pt-2">
                <label className="text-[8px] font-mono uppercase tracking-wider font-extrabold text-black flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 text-zinc-600" />
                  {dict.onboarding.stage1.q2Label}
                </label>

                <div className="flex flex-col gap-1.5">
                  <div
                    className={`py-1.5 px-2.5 border rounded-xl flex items-center justify-between transition-all duration-300 shadow-xs ${
                      s1p > 0.54
                        ? "border-black bg-zinc-100 anim-tap"
                        : "border-zinc-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[8px] font-mono ${
                          s1p > 0.54 ? "text-black font-bold" : "text-zinc-500 font-medium"
                        }`}
                      >
                        {dict.onboarding.stage1.q2Option1}
                      </span>
                      <span className="text-[6.5px] font-mono px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-bold">
                        {dict.onboarding.stage1.q2Tag}
                      </span>
                    </div>
                    {s1p > 0.54 ? (
                      <div className="w-3.5 h-3.5 rounded-full bg-black flex items-center justify-center anim-pop shadow-xs">
                        <Check className="w-2 h-2 text-white stroke-[2.5]" />
                      </div>
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-zinc-300 bg-white" />
                    )}
                  </div>

                  <div className="py-1.5 px-2.5 border border-zinc-200 bg-white rounded-xl flex items-center justify-between opacity-50">
                    <span className="text-[8px] text-zinc-400 font-mono">
                      {dict.onboarding.stage1.q2Option2}
                    </span>
                    <div className="w-3.5 h-3.5 rounded-full border border-zinc-300 bg-white" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STAGE 2: Location & Housing ── */}
          {currentStage === 2 && (
            <div className="flex flex-col gap-3 animate-fadeIn">
              {/* Question 1: Registration City */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[8px] font-mono uppercase tracking-wider font-extrabold text-black flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 text-zinc-600" />
                  {dict.onboarding.stage2.q1Label}
                </label>

                <div className="flex flex-col gap-1.5">
                  <div
                    className={`py-1.5 px-2.5 border rounded-xl flex items-center justify-between transition-all duration-300 shadow-xs ${
                      s1p > 0.74
                        ? "border-black bg-zinc-100 anim-tap"
                        : "border-zinc-200 bg-white"
                    }`}
                  >
                    <span
                      className={`text-[8px] font-mono ${
                        s1p > 0.74 ? "text-black font-bold" : "text-zinc-500 font-medium"
                      }`}
                    >
                      {dict.onboarding.stage2.q1Selected}
                    </span>
                    {s1p > 0.74 ? (
                      <div className="w-3.5 h-3.5 rounded-full bg-black flex items-center justify-center anim-pop shadow-xs">
                        <Check className="w-2 h-2 text-white stroke-[2.5]" />
                      </div>
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-zinc-300 bg-white" />
                    )}
                  </div>

                  <div className="flex gap-1.5">
                    <div className="py-1 px-2 border border-zinc-200 bg-white rounded-lg flex-1 text-center opacity-50">
                      <span className="text-[7.5px] text-zinc-400 font-mono">Madrid</span>
                    </div>
                    <div className="py-1 px-2 border border-zinc-200 bg-white rounded-lg flex-1 text-center opacity-50">
                      <span className="text-[7.5px] text-zinc-400 font-mono">Valencia</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Question 2: Housing Setup */}
              <div className="flex flex-col gap-1.5 border-t border-zinc-100 pt-2">
                <label className="text-[8px] font-mono uppercase tracking-wider font-extrabold text-black flex items-center gap-1">
                  <HomeIcon className="w-2.5 h-2.5 text-zinc-600" />
                  {dict.onboarding.stage2.q2Label}
                </label>

                <div className="flex flex-col gap-1.5">
                  <div
                    className={`py-1.5 px-2.5 border rounded-xl flex items-center justify-between transition-all duration-300 shadow-xs ${
                      s1p > 0.84
                        ? "border-black bg-zinc-100 anim-tap"
                        : "border-zinc-200 bg-white"
                    }`}
                  >
                    <span
                      className={`text-[8px] font-mono ${
                        s1p > 0.84 ? "text-black font-bold" : "text-zinc-500 font-medium"
                      }`}
                    >
                      {dict.onboarding.stage2.q2Option1}
                    </span>
                    {s1p > 0.84 ? (
                      <div className="w-3.5 h-3.5 rounded-full bg-black flex items-center justify-center anim-pop shadow-xs">
                        <Check className="w-2 h-2 text-white stroke-[2.5]" />
                      </div>
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-zinc-300 bg-white" />
                    )}
                  </div>

                  <div className="py-1.5 px-2.5 border border-zinc-200 bg-white rounded-xl flex items-center justify-between opacity-50">
                    <span className="text-[8px] text-zinc-400 font-mono">
                      {dict.onboarding.stage2.q2Option2}
                    </span>
                    <div className="w-3.5 h-3.5 rounded-full border border-zinc-300 bg-white" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Navigation Action Footer (Matching Web App) ── */}
        <div className="pt-2.5 border-t border-zinc-100 flex items-center justify-between gap-2">
          {currentStage > 0 ? (
            <div className="px-2.5 py-1.5 rounded-xl bg-zinc-100 text-[7.5px] font-mono font-bold text-zinc-700 flex items-center gap-1 cursor-pointer">
              {dict.onboarding.back}
            </div>
          ) : (
            <div className="text-[7px] font-mono text-zinc-400">
              Question 1 of 2
            </div>
          )}

          {percentage >= 95 ? (
            <div className="px-3 py-1.5 rounded-xl bg-black text-white text-[7.5px] font-mono font-bold shadow-xs flex items-center gap-1.5 cursor-pointer hover:bg-zinc-800 transition-colors">
              <Sparkles className="w-2.5 h-2.5 text-white animate-pulse" />
              {dict.onboarding.buildRoadmap}
            </div>
          ) : (
            <div className="px-3 py-1.5 rounded-xl bg-black text-white text-[7.5px] font-mono font-bold shadow-xs flex items-center gap-1 cursor-pointer hover:bg-zinc-800 transition-colors">
              <span>{dict.onboarding.continue}</span>
              <ChevronRight className="w-2.5 h-2.5 text-white" />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
