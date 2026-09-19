"use client";

import React, { useEffect, useState, useRef } from "react";
import DocumentCard from "./DocumentCard";

interface CardConfig {
  type: "nie" | "seg_social" | "padron" | "hacienda";
  baseX: number; // in vw
  baseY: number; // in vh
  baseR: number; // in deg
  stagger: number; // 0 to 0.1
  rotFlex: number; // temporary rotation during descent
  z: number;
}

const CARDS: CardConfig[] = [
  { type: "nie",        baseX: -28, baseY: -10, baseR: -8,  stagger: 0.00, rotFlex: -2.0, z: 6 },
  { type: "padron",     baseX: -22, baseY:   9, baseR:  6,  stagger: 0.05, rotFlex:  2.5, z: 5 },
  { type: "seg_social", baseX: -30, baseY:   1, baseR: -13, stagger: 0.09, rotFlex: -3.0, z: 4 },
  { type: "hacienda",   baseX: -18, baseY:  -7, baseR:  11, stagger: 0.04, rotFlex:  2.0, z: 3 },
  { type: "nie",        baseX: -25, baseY:  -4, baseR:  -5, stagger: 0.08, rotFlex: -1.5, z: 2 },
  { type: "seg_social", baseX: -21, baseY:   5, baseR:   3, stagger: 0.06, rotFlex:  1.5, z: 1 },
];

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function DocumentPileBridge() {
  const [mounted, setMounted] = useState(false);
  const [scrollState, setScrollState] = useState<{
    visible: boolean;
    gatherProgress: number; // 0 (scattered) -> 1 (gathered in Slide 3)
    transitionProgress: number; // 0 (Slide 3) -> 1 (HowItWorks Slide 0)
    exitProgress: number; // 0 (Slide 0) -> 1 (exited off-screen)
    isMobile: boolean;
  }>({
    visible: false,
    gatherProgress: 0,
    transitionProgress: 0,
    exitProgress: 0,
    isMobile: false,
  });

  const boundsRef = useRef({
    winH: 800,
    winW: 1440,
    painTop: 0,
    painHeight: 4000,
    howTop: 4000,
    howHeight: 7200,
  });

  useEffect(() => {
    setMounted(true);

    const updateBounds = () => {
      const pain = document.getElementById("pain");
      const how = document.getElementById("how-it-works");
      const winH = window.innerHeight || 800;
      const winW = window.innerWidth || 1440;

      boundsRef.current = {
        winH,
        winW,
        painTop: pain ? pain.offsetTop : 0,
        painHeight: pain ? pain.offsetHeight : winH * 5,
        howTop: how ? how.offsetTop : winH * 5,
        howHeight: how ? how.offsetHeight : winH * 9,
      };
    };

    updateBounds();
    window.addEventListener("resize", updateBounds, { passive: true });

    let ticking = false;
    const calculate = () => {
      const { winH, winW, painTop, painHeight, howTop, howHeight } = boundsRef.current;
      const scrollY = window.scrollY || 0;
      const isMobile = winW < 1024;
      if (isMobile) {
        setScrollState(prev => prev.visible ? { ...prev, visible: false } : prev);
        ticking = false;
        return;
      }

      // ─── 1. Pain section timeline ───
      const painScrollable = painHeight - winH;
      const painEnd = painTop + painScrollable;

      // Slide 3 is active during the last 28% of pain (progress >= 0.72)
      const slide3Start = painTop + painScrollable * 0.72;
      const gatherStart = painTop + painScrollable * 0.76;
      const gatherEnd   = painTop + painScrollable * 0.94;

      // ─── 2. Transition zone between pain and how-it-works ───
      const transStart = painEnd;
      const transEnd   = painEnd + winH;

      // ─── 3. HowItWorks timeline ───
      const howScrollable = howHeight - winH;
      const howSlide0End = howTop + (howScrollable / 9);

      // Active window: from when Slide 3 starts gathering until How Slide 0 exits
      const isVisible = scrollY >= slide3Start && scrollY <= (howSlide0End + winH * 0.5);

      if (!isVisible) {
        setScrollState(prev => prev.visible ? { ...prev, visible: false } : prev);
        ticking = false;
        return;
      }

      // Compute Gather Progress (0 -> 1 during Slide 3)
      let gatherP = 0;
      if (scrollY < gatherStart) {
        gatherP = 0;
      } else if (scrollY >= gatherEnd) {
        gatherP = 1;
      } else {
        gatherP = (scrollY - gatherStart) / (gatherEnd - gatherStart);
      }

      // Compute Transition Progress (0 -> 1 as we move from Slide 3 down to How Slide 0)
      let transP = 0;
      if (scrollY < transStart) {
        transP = 0;
      } else if (scrollY >= transEnd) {
        transP = 1;
      } else {
        transP = (scrollY - transStart) / (transEnd - transStart);
      }

      // Compute Exit Progress (0 -> 1 as How slides from Slide 0 to Slide 1)
      let exitP = 0;
      const exitStart = howTop + (howScrollable / 9) * 0.25;
      const exitEnd   = howTop + (howScrollable / 9) * 0.95;
      if (scrollY < exitStart) {
        exitP = 0;
      } else if (scrollY >= exitEnd) {
        exitP = 1;
      } else {
        exitP = (scrollY - exitStart) / (exitEnd - exitStart);
      }

      setScrollState({
        visible: true,
        gatherProgress: gatherP,
        transitionProgress: transP,
        exitProgress: exitP,
        isMobile,
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(calculate);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    calculate();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateBounds);
    };
  }, []);

  if (!mounted || !scrollState.visible) {
    return null;
  }

  const { gatherProgress, transitionProgress, exitProgress, isMobile } = scrollState;

  // Overall master opacity: fades in at start of gather, fades out at exit
  const masterOpacity = (gatherProgress < 0.2 ? gatherProgress / 0.2 : 1) * (1 - exitProgress);

  // Horizontal exit translation during Slide 0 -> 1 in HowItWorks
  const exitTranslateX = isMobile ? exitProgress * -70 : exitProgress * -45; // vw

  // Scale adjustment for mobile vs desktop
  const baseScale = isMobile ? 0.62 : 1;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden hidden lg:block"
      style={{
        opacity: masterOpacity,
        willChange: "opacity",
        transition: "opacity 0.15s ease-out",
      }}
      aria-hidden="true"
    >
      {CARDS.map((card, idx) => {
        // Individual staggered progress for downward descent:
        const t = transitionProgress;
        const cardT = Math.max(0, Math.min(1, (t - card.stagger) / (1 - 0.10)));
        const easedT = easeInOutCubic(cardT);

        // Fluid downward drift during transit that cushions into exact vertical center (0) in How It Works
        const floatY = Math.sin(Math.PI * easedT) * 4.5; // vh

        // Dynamic rotational tilt while in motion (creates fluid paper aerodynamics)
        const rotOffset = card.rotFlex * Math.sin(Math.PI * cardT);

        // In gather phase (Slide 3): cards interpolate from spread to gathered stack
        // When gatherProgress is 1, spread offset is 0.
        const spreadFactor = 1 - gatherProgress;
        const spreadX = (idx % 2 === 0 ? -12 : 12) * spreadFactor;
        const spreadY = (idx < 3 ? -14 : 14) * spreadFactor;
        const spreadR = (idx % 2 === 0 ? -8 : 8) * spreadFactor;

        // Position coordinates:
        const currentX = (isMobile ? (card.baseX * 0.35) : card.baseX) + spreadX + exitTranslateX;
        const currentY = card.baseY + spreadY + floatY;
        const currentR = card.baseR + spreadR + rotOffset;

        return (
          <div
            key={idx}
            className="absolute left-1/2 top-1/2"
            style={{
              zIndex: card.z,
              transform: `translate3d(calc(-50% + ${currentX}vw), calc(-50% + ${currentY}vh), 0) rotate(${currentR}deg) scale(${baseScale})`,
              transformOrigin: "center center",
              willChange: "transform",
            }}
          >
            <DocumentCard
              type={card.type}
              status="chaos"
              shadow={idx === 0 ? "shadow-2xl" : idx === 1 ? "shadow-xl" : "shadow-lg"}
            />
          </div>
        );
      })}
    </div>
  );
}
