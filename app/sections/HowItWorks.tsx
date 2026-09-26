"use client";

import { BrowserPlaceholder, SeguridadSocialRouteView, WebFloatingNav } from "@/app/components/BrowserWindow";
import { BuildingRouteView } from "@/app/components/BuildingRouteView";
import { OnboardingWebView } from "@/app/components/OnboardingWebView";
import { OverviewDashboardView } from "@/app/components/OverviewDashboardView";
import { VaultUploadDemo } from "@/app/components/VaultUploadDemo";
import { Bot, Calendar, FileText, FolderLock, Sparkles } from "lucide-react";
import React from "react";
import DocumentCard from "../components/DocumentCard";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { useLanguage } from "../context/LanguageContext";

// ─── Stepped slide translation ──────────────────────────────────────────────
// Holds each slide fully in view for most of its scroll band, then snaps
// quickly to the next one — mirroring the pain section's plateau-based
// getStickyTranslate so both storyline sections need "extra scroll" to
// advance instead of sliding continuously with every pixel of scroll.
const HOW_HOLD_FRACTION = 0.78;
function getSteppedTranslatePercent(progress: number, slideCount: number, holdFraction: number): number {
  const band = 1 / slideCount;
  const step = 100 / slideCount;
  const p = Math.max(0, Math.min(1, progress));
  const bandIndex = Math.min(slideCount - 1, Math.floor(p / band));
  if (bandIndex >= slideCount - 1) return bandIndex * step;

  const bandStart = bandIndex * band;
  const holdEnd = bandStart + holdFraction * band;
  const bandEnd = bandStart + band;

  if (p <= holdEnd) return bandIndex * step;
  const t = (p - holdEnd) / (bandEnd - holdEnd);
  return (bandIndex + Math.min(1, t)) * step;
}

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

export default function HowItWorks() {
  const { dict } = useLanguage();
  const { ref, progress: rawProgress } = useScrollProgress();
  // Scroll is not shared evenly: "Tell Paprs once" (onboarding, then the thinking
  // wheel) and the vault walkthrough are scroll-driven and get the most room.
  // [raw scroll, slide progress] anchors, one slide per 0.25 of progress.
  const SCROLL_ANCHORS: Array<[number, number]> = [[0, 0], [0.11, 0.25], [0.45, 0.5], [0.58, 0.75], [1, 1]];
  let progress = 1;
  for (let i = 1; i < SCROLL_ANCHORS.length; i++) {
    const [r0, p0] = SCROLL_ANCHORS[i - 1];
    const [r1, p1] = SCROLL_ANCHORS[i];
    if (rawProgress <= r1) {
      progress = p0 + ((rawProgress - r0) / (r1 - r0)) * (p1 - p0);
      break;
    }
  }

  const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
  const interp = (p: number, inStart: number, inEnd: number, outStart: number, outEnd: number) => {
    if (p <= inStart) return outStart;
    if (p >= inEnd) return outEnd;
    const ratio = (p - inStart) / (inEnd - inStart);
    return outStart + ratio * (outEnd - outStart);
  };

  const SLIDE_COUNT = 4;
  const band = 1 / SLIDE_COUNT;
  const slideProgress = (n: number) => clamp01((progress - n * band) / band);
  const s1p = slideProgress(1);
  const s2p = slideProgress(2);
  const s3p = slideProgress(3);

  const activeSlide = Math.min(SLIDE_COUNT - 1, Math.floor(progress * SLIDE_COUNT));
  const translatePercent = getSteppedTranslatePercent(progress, SLIDE_COUNT, HOW_HOLD_FRACTION);

  // Onboarding questions finish in the first half of slide 1; the second half
  // shows the route being built.
  const onboardingP = clamp01(s1p / 0.36);
  const buildingRoute = s1p >= 0.4;

  // 5 browser screens, each a 1/5-wide step:
  // 0 route detail · 1 onboarding · 2 building route · 3 deadlines dashboard · 4 vault upload
  const SCREEN_COUNT = 5;
  const PHONE_STEP = 100 / SCREEN_COUNT;
  const getScreenPosition = (): number => {
    if (progress < band * 0.78) return 0;
    if (progress < band) return interp(progress, band * 0.78, band, 0, 1);
    if (activeSlide === 1) {
      if (s1p < 0.38) return 1;
      if (s1p < 0.42) return interp(s1p, 0.38, 0.42, 1, 2);
      if (s1p < 0.78) return 2;
      return interp(s1p, 0.78, 1, 2, 3);
    }
    if (activeSlide === 2) {
      if (s2p < 0.78) return 3;
      return interp(s2p, 0.78, 1, 3, 4);
    }
    return activeSlide >= 3 ? 4 : 1;
  };
  const getPhoneTranslateX = () => -getScreenPosition() * PHONE_STEP;

  const phoneVisibilityOpacity = interp(progress, 0, 0.02, 0, 1);

  const stage2AlertOpacity = interp(s2p, 0, 0.25, 0, 1);

  const sliderOpacity = 1;

  const getActiveNavTab = (): "dashboard" | "todo" | "vault" => {
    if (activeSlide >= 3) return "vault";
    return "dashboard";
  };

  const getBrowserUrl = (): string => {
    if (activeSlide === 1) return buildingRoute ? "app.paprs.app/building-route" : "app.paprs.app/onboarding";
    if (activeSlide >= 3) return "app.paprs.app/vault";
    return "app.paprs.app/dashboard";
  };

  return (
    <div
      id="how-it-works"
      ref={ref}
      className="story-section--how relative w-full h-[600vh] z-30"
    >
      {/* ── Sticky Fullscreen Viewport ── */}
      <div className="sticky top-0 w-full h-svh overflow-hidden flex flex-col justify-between font-sans select-none text-black z-30">

        {/* ── Slider track wrapper ── */}
        <div className="absolute inset-0 overflow-hidden z-30">
          <div
            className="flex h-full"
            style={{
              transform: `translateX(-${translatePercent}%)`,
              width: "400%",
            }}
          >
          {/* SLIDE 0 — Paprs appears */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none relative overflow-hidden">
            <div className="how-slide-layout relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20">
              
              {/* Left Column */}
              <div
                className="how-slide-copy flex w-full flex-col justify-center gap-2.5 sm:gap-4 md:w-5/12 relative z-20 transition-all"
              >
                <div className="glass-card-subtle flex flex-col gap-2.5 sm:gap-4 rounded-3xl p-4 transition-all sm:p-6 lg:p-8">
                  <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-zinc-300 bg-zinc-100 px-2.5 py-1">
                    <Sparkles className="w-3 h-3 text-black flex-shrink-0" />
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-black font-extrabold">
                      {dict.howItWorks.fromConfusionTag}
                    </span>
                  </div>
                  <div>
                  <h3 className="text-xl sm:text-3xl md:text-5xl font-extrabold font-syne text-black leading-tight">
                    {dict.howItWorks.turnsMazeTitle}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed w-full max-w-2xl lg:max-w-md">
                    {dict.howItWorks.turnsMazeDesc}
                  </p>
                  </div>
                </div>
              </div>

              {/* Right column stays empty here — the sticky browser overlay (below) already covers this slide's visual. */}
              <div className="how-slide-visual hidden md:flex md:w-6/12 h-full flex-shrink-0" />

            </div>
          </div>

          {/* SLIDE 1 — Tell us who you are */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
            <div className="how-slide-layout relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20">
              <div className="how-slide-copy flex w-full flex-col justify-center gap-2.5 sm:gap-4 md:w-5/12">
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-black flex-shrink-0" />
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-black font-extrabold">
                    {dict.howItWorks.step01Tag}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold font-syne text-black leading-tight">
                  {dict.howItWorks.tellOnceTitle}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed w-full max-w-2xl lg:max-w-md">
                  {dict.howItWorks.tellOnceDesc}
                </p>
              </div>
              <div className="how-slide-visual hidden md:flex md:w-6/12 h-full flex-shrink-0" />
            </div>
          </div>

          {/* SLIDE 2 — Urgent Alerts */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
            <div className="how-slide-layout relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20">
              <div className="how-slide-copy flex w-full flex-col justify-center gap-2.5 sm:gap-4 md:w-5/12">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-black flex-shrink-0" />
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-black font-extrabold">
                    {dict.howItWorks.step02Tag}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold font-syne text-black leading-tight">
                  {dict.howItWorks.deadlinesTitle}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed w-full max-w-2xl lg:max-w-md">
                  {dict.howItWorks.deadlinesDesc}
                </p>
              </div>
              <div className="how-slide-visual hidden md:flex md:w-6/12 h-full flex-shrink-0" />
            </div>
          </div>

          {/* SLIDE 3 — Document Vault */}
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center select-none">
            <div className="how-slide-layout relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20">
              <div className="how-slide-copy flex w-full flex-col justify-center gap-2.5 sm:gap-4 md:w-5/12">
                <div className="flex items-center gap-2">
                  <FolderLock className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-black flex-shrink-0" />
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-black font-extrabold">
                    {dict.howItWorks.step03Tag}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold font-syne text-black leading-tight">
                  {dict.howItWorks.workingMemoryTitle}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed w-full max-w-2xl lg:max-w-md">
                  {dict.howItWorks.workingMemoryDesc}
                </p>
              </div>
              <div className="how-slide-visual hidden md:flex md:w-6/12 h-full flex-shrink-0" />
            </div>
          </div>

          </div>
        </div>

        {/* ── Sticky Browser Overlay (Slides 1-4) ── */}
        {phoneVisibilityOpacity > 0 && (
          <div 
            className="absolute inset-0 flex justify-center pointer-events-none z-30"
            style={{ 
              opacity: phoneVisibilityOpacity,
            }}
          >
            <div className="how-slide-layout relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 pointer-events-none">
              <div className="how-slide-copy-spacer pointer-events-none invisible" />

              <div className="how-slide-visual pointer-events-auto flex w-full md:w-6/12 items-center justify-center relative">
                <div
                  className="how-dashboard-frame relative flex w-full max-w-[440px] items-center justify-center transition-all duration-300 md:max-w-[520px] lg:max-w-[580px] xl:max-w-[620px]"
                  style={{ transform: "scale(var(--how-dashboard-scale, 1))", transformOrigin: "center" }}
                >
                {/* Desktop Web Dashboard Window using Reusable BrowserPlaceholder */}
                <BrowserPlaceholder
                  url={getBrowserUrl()}
                  badgeText="Live"
                  shadow="shadow-[0_24px_60px_-15px_rgba(0,0,0,0.14)]"
                  headerContent={
                    activeSlide >= 2 ? (
                      <WebFloatingNav activeTab={getActiveNavTab()} />
                    ) : null
                  }
                >
                  {/* Dashboard Screen Slider Container */}
                  <div className="flex-1 min-h-0 relative overflow-hidden bg-white">
                    <div
                      className="h-full flex transition-transform duration-300"
                      style={{
                        width: "500%",
                        transform: `translateX(${getPhoneTranslateX()}%)`
                      }}
                    >
                        {/* SCREEN 0: Route detail view (mirrors slide 0's copy) */}
                        <div className="how-dashboard-canvas w-[20%] h-full flex-shrink-0 flex flex-col bg-white relative overflow-hidden">
                          <SeguridadSocialRouteView />
                        </div>

                        {/* SCREEN 1: Onboarding Questions (Authentic Web App Experience) */}
                        <div className="w-[20%] h-full flex-shrink-0 flex flex-col bg-[#FFFFFF] relative overflow-hidden">
                          <OnboardingWebView s1p={onboardingP} />
                        </div>

                        {/* SCREEN 2: Building your route — orb states follow the scroll */}
                        <div className="w-[20%] h-full flex-shrink-0 flex flex-col relative overflow-hidden">
                          <BuildingRouteView progress={clamp01((s1p - 0.42) / 0.34)} />
                        </div>

                        {/* SCREEN 3: Overview — urgent action, plans, suggestion, command bar */}
                        <div className="w-[20%] h-full min-h-0 flex-shrink-0 flex flex-col overflow-hidden">
                          <OverviewDashboardView urgentOpacity={stage2AlertOpacity} suggestionOpacity={interp(s2p, 0.25, 0.5, 0, 1)} />
                        </div>

                        {/* SCREEN 4: Vault — upload, read, new action plan */}
                        <div className="w-[20%] h-full flex-shrink-0 flex flex-col relative overflow-hidden">
                          <VaultUploadDemo progress={s3p} />
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
          className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 transition-opacity duration-300"
          style={{ opacity: sliderOpacity }}
        >
          <SlideDots total={SLIDE_COUNT} active={activeSlide} />
        </div>

        {/* ── Scroll hint ── */}
        {progress < 0.94 && (
          <div
            className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-40 flex items-center gap-2"
            style={{ opacity: interp(progress, 0, 0.08, 0, 0.55) }}
          >
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-zinc-500 font-bold">{dict.hero.scrollToContinue}</span>
          </div>
        )}

        {/* ── Slide label (top left on desktop) ── */}
        <div
          className="how-slide-label absolute left-0 right-0 z-40 pointer-events-none transition-opacity duration-500 hidden md:flex justify-center"
          style={{ opacity: interp(progress, 0, 0.08, 0, 1) * sliderOpacity }}
        >
          <div className="max-w-[1440px] w-full px-4 sm:px-6 md:px-12 lg:px-20">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-bold">
                {dict.howItWorks.slideLabels[activeSlide] ?? ""}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
