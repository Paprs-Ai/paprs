"use client";
 
import React, { useEffect, useState } from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";
import DocumentCard from "../components/DocumentCard";
import { AlertTriangle, AlertCircle, Activity, Clock, ChevronRight, FileText } from "lucide-react";


export default function HeroAndPain() {
  const { ref, progress } = useScrollProgress();
  const [lettersAnimate, setLettersAnimate] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setLettersAnimate(true), 500);
    return () => {
      clearTimeout(textTimer);
    };
  }, []);

  // Interpolation helper
  const interpolate = (
    val: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ) => {
    if (val <= inMin) return outMin;
    if (val >= inMax) return outMax;
    return outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);
  };

  // --- BACKGROUND & BOUNDARY TRANSITIONS ---
  const leftWidth = interpolate(progress, 0.05, 0.20, 50, 100);
  const rightWidth = interpolate(progress, 0.05, 0.20, 50, 0);

  // Background color interpolation (chaos paper folds into a calm product surface)
  const bgRed = Math.round(interpolate(progress, 0.84, 0.96, 247, 248));
  const bgGreen = Math.round(interpolate(progress, 0.84, 0.96, 244, 250));
  const bgBlue = Math.round(interpolate(progress, 0.84, 0.96, 238, 252));
  const leftBgColor = `rgb(${bgRed}, ${bgGreen}, ${bgBlue})`;

  // --- TEXT LAYERS OPACITIES / SLIDE TRANSITIONS ---
  const heroTextOpacity = interpolate(progress, 0, 0.12, 1, 0);
  
  // Horizontal slider translation calculation:
  // progress goes from 0.20 to 0.95 for the Pain section.
  const pNorm = Math.max(0, Math.min(1, (progress - 0.20) / 0.75));
  const translatePercent = pNorm * (4 / 5) * 100;

  // --- DOCUMENT ANIMATIONS ---

  // Hero clean cards on the right (slide off-screen and fade)
  const rightCardsX = interpolate(progress, 0, 0.18, 0, 120);
  const rightCardsOpacity = interpolate(progress, 0, 0.15, 1, 0);

  // Left chaotic cards (NIE, SS, Padrón, Hacienda) in Slide 1
  // At progress = 0: Scattered widely all over the left half of the viewport
  // As scroll increases, they slowly move (drift) to the right half center stack
  const getDoc1Props = () => {
    const x = interpolate(progress, 0, 0.20, -24, 18);
    const y = interpolate(progress, 0, 0.20, -26, -6);
    const rot = interpolate(progress, 0, 0.20, -15, -4);
    return { x, y, rot };
  };

  const getDoc2Props = () => {
    const x = interpolate(progress, 0, 0.20, -12, 22);
    const y = interpolate(progress, 0, 0.20, 26, 6);
    const rot = interpolate(progress, 0, 0.20, 20, 8);
    return { x, y, rot };
  };

  const getDoc3Props = () => {
    const x = interpolate(progress, 0, 0.20, -32, 20);
    const y = interpolate(progress, 0, 0.20, 12, 2);
    const rot = interpolate(progress, 0, 0.20, -25, -8);
    return { x, y, rot };
  };

  const getDoc4Props = () => {
    const x = interpolate(progress, 0, 0.20, -16, 24);
    const y = interpolate(progress, 0, 0.20, -24, -2);
    const rot = interpolate(progress, 0, 0.20, 18, 4);
    return { x, y, rot };
  };

  const doc1 = getDoc1Props();
  const doc2 = getDoc2Props();
  const doc3 = getDoc3Props();
  const doc4 = getDoc4Props();

  // --- TELEMETRY STATS COUNTER ---
  const docCount = Math.round(interpolate(progress, 0.70, 0.78, 1, 4));
  const deadlineCount = Math.round(interpolate(progress, 0.70, 0.80, 0, 3));
  const officeCount = Math.round(interpolate(progress, 0.70, 0.82, 1, 5));
  const wordCount = Math.round(interpolate(progress, 0.70, 0.84, 0, 47));

  // --- REAPPEARING GREEN LINE ---
  // Line removed as requested

  // Cross-fade slider track opacity to prevent collision with final overlay logo text
  const sliderOpacity = interpolate(progress, 0.94, 0.99, 1, 0);

  const headlineLeft = "Drowning in paperwork?";
  const headlineRight = "Everything sorted. Step by step.";

  return (
    <div ref={ref} id="pain" className="relative h-[300vh] w-full">
      
      {/* Sticky Frame */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col md:flex-row z-10">
        
        {/* ================= BACKGROUNDS ================= */}
        
        {/* Left Side (Chaos/Reality background) */}
        <div 
          className="absolute left-0 top-0 h-full transition-all duration-100 z-0"
          style={{ 
            width: `${leftWidth}%`,
            backgroundColor: leftBgColor
          }}
        ></div>

        {/* Right Side (Clarity background) */}
        <div 
          className="absolute right-0 top-0 h-full bg-[#F8FAFC] transition-all duration-100 z-0"
          style={{ width: `${rightWidth}%` }}
        ></div>

        {/* ================= TEXT & CARD LAYERS: HERO (PROGRESS < 0.20) ================= */}
        {progress < 0.20 && (
          <>
            {/* Hero Text Layer */}
            <div 
              className="absolute inset-0 flex flex-col md:flex-row z-30 pointer-events-none transition-opacity duration-300"
              style={{ opacity: heroTextOpacity }}
            >
              {/* Left Hero Text Column */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-between p-8 md:p-16">
                <span className="font-mono text-sm md:text-base lg:text-lg font-extrabold tracking-[0.2em] text-[#D4820A] uppercase">
                  WITHOUT PAPRS
                </span>
                <div className="max-w-md pt-4">
                  <h1 className="text-3xl md:text-5xl lg:text-[3.45rem] font-extrabold tracking-tight font-syne leading-[0.92] mb-4 text-[#1A1814]">
                    {headlineLeft.split(" ").map((word, wordIndex) => (
                      <span
                        key={`${word}-${wordIndex}`}
                        className="inline-block whitespace-nowrap mr-[0.18em]"
                      >
                        {word.split("").map((char, charIndex) => (
                          <span
                            key={`${word}-${charIndex}`}
                            className="inline-block transition-all duration-700 ease-out"
                            style={{
                              transform: lettersAnimate ? "translateY(0)" : "translateY(20px)",
                              opacity: lettersAnimate ? 1 : 0,
                              transitionDelay: `${(wordIndex * 8 + charIndex) * 15}ms`,
                            }}
                          >
                            {char}
                          </span>
                        ))}
                      </span>
                    ))}
                  </h1>
                  <p className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed">
                    NIE. TIE. Padrón. Hacienda. Seguridad Social. Every office wants something different. Nobody tells you what to do first.
                  </p>
                </div>
                <div className="h-4"></div>
              </div>

              {/* Right Hero Text Column */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-between p-8 md:p-16">
                <span className="font-mono text-sm md:text-base lg:text-lg font-extrabold tracking-[0.2em] text-[#16A34A] uppercase hidden md:inline self-end text-right">
                  WITH PAPRS
                </span>
                <div className="max-w-md pt-4">
                  <h1 className="text-3xl md:text-5xl lg:text-[3.45rem] font-extrabold tracking-tight font-syne leading-[0.92] mb-4 text-slate-950">
                    {headlineRight.split(" ").map((word, wordIndex) => (
                      <span
                        key={`${word}-${wordIndex}`}
                        className="inline-block whitespace-nowrap mr-[0.18em]"
                      >
                        {word.split("").map((char, charIndex) => (
                          <span
                            key={`${word}-${charIndex}`}
                            className="inline-block transition-all duration-700 ease-out"
                            style={{
                              transform: lettersAnimate ? "translateY(0)" : "translateY(20px)",
                              opacity: lettersAnimate ? 1 : 0,
                              transitionDelay: `${(wordIndex * 8 + charIndex) * 12}ms`,
                            }}
                          >
                            {char}
                          </span>
                        ))}
                      </span>
                    ))}
                  </h1>
                  <p className="font-sans text-xs md:text-sm text-slate-600 leading-relaxed">
                    Paprs understands your situation, finds what&apos;s urgent, and tells you exactly what to do — in plain language.
                  </p>
                </div>
                <div className="h-4"></div>
              </div>
            </div>

            {/* Drifting Messy Cards (Chaos) */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-45 md:opacity-55">
              {/* NIE (Doc 1) */}
              <div
                className="absolute left-1/2 top-1/2 transition-all duration-100 ease-out"
                style={{
                  transform: `translate(calc(-50% + ${doc1.x}vw), calc(-50% + ${doc1.y}vh)) rotate(${doc1.rot}deg)`,
                }}
              >
                <DocumentCard type="nie" status="chaos" />
              </div>

              {/* Seguridad Social (Doc 2) */}
              <div
                className="absolute left-1/2 top-1/2 transition-all duration-100 ease-out"
                style={{
                  transform: `translate(calc(-50% + ${doc2.x}vw), calc(-50% + ${doc2.y}vh)) rotate(${doc2.rot}deg)`,
                }}
              >
                <DocumentCard type="seg_social" status="chaos" />
              </div>

              {/* Padrón (Doc 3) */}
              <div
                className="absolute left-1/2 top-1/2 transition-all duration-100 ease-out"
                style={{
                  transform: `translate(calc(-50% + ${doc3.x}vw), calc(-50% + ${doc3.y}vh)) rotate(${doc3.rot}deg)`,
                }}
              >
                <DocumentCard type="padron" status="chaos" />
              </div>

              {/* Hacienda (Doc 4) */}
              <div
                className="absolute left-1/2 top-1/2 transition-all duration-100 ease-out"
                style={{
                  transform: `translate(calc(-50% + ${doc4.x}vw), calc(-50% + ${doc4.y}vh)) rotate(${doc4.rot}deg)`,
                }}
              >
                <DocumentCard type="hacienda" status="chaos" />
              </div>
            </div>

            {/* Clean Cards (Right side) */}
            <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center md:justify-end md:pr-4 lg:pr-8 xl:pr-12">
              <div 
                className="transition-all duration-100 scale-90 md:scale-95 lg:scale-105"
                style={{
                  transform: `translateX(${rightCardsX}%)`,
                  opacity: rightCardsOpacity
                }}
              >
                <div className="relative w-[400px] h-[430px] flex items-center justify-center">
                  <div className="absolute translate-x-[-64px] translate-y-[-40px] rotate-[-12deg] opacity-95 scale-95">
                    <DocumentCard type="nie" status="clean" progress={100} />
                  </div>
                  <div className="absolute translate-x-[48px] translate-y-[-24px] rotate-[8deg] opacity-95 scale-95">
                    <DocumentCard type="seg_social" status="clean" progress={40} />
                  </div>
                  <div className="absolute translate-x-[8px] translate-y-[32px] rotate-[-2deg] scale-100 shadow-2xl">
                    <DocumentCard type="padron" status="clean" progress={100} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ================= SECTION 2: SLIDER TRACK (PROGRESS >= 0.20) ================= */}
        {progress >= 0.20 && (
          <div 
            className="absolute inset-0 w-full h-full z-20 flex items-center transition-opacity duration-300"
          >
            <div 
              className="flex h-full transition-transform duration-300 ease-out"
              style={{ 
                transform: `translateX(-${translatePercent}%)`,
                width: "500%" 
              }}
            >
              {/* Slide 1: Arrival & Static Messy Pile */}
              <div className="w-screen h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between p-8 md:p-24 relative select-none">
                <div className="w-full md:w-6/12 flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight font-syne">
                    You&apos;ve just arrived in Spain. <br />
                    <span className="text-slate-500 font-sans text-lg md:text-xl mt-3 block font-normal">
                      You have a job, an apartment, a life to build.
                    </span>
                  </h2>
                </div>
                <div className="w-full md:w-5/12 h-full"></div>

                {/* Statically positioned stacked messy cards inside Slide 1 */}
                <div className="absolute inset-0 pointer-events-none z-10">
                  {/* NIE (Doc 1) - Final drift position */}
                  <div
                    className="absolute left-1/2 top-1/2 paper-float"
                    style={{ "--paper-rotate": "-4deg" } as React.CSSProperties}
                  >
                    <div
                      style={{
                        transform: "translate(calc(-50% + 18vw), calc(-50% - 6vh)) rotate(-4deg)",
                      }}
                    >
                      <DocumentCard type="nie" status="chaos" />
                    </div>
                  </div>

                  {/* Seguridad Social (Doc 2) */}
                  <div
                    className="absolute left-1/2 top-1/2 paper-float [animation-delay:-1.4s]"
                    style={{ "--paper-rotate": "8deg" } as React.CSSProperties}
                  >
                    <div
                      style={{
                        transform: "translate(calc(-50% + 22vw), calc(-50% + 6vh)) rotate(8deg)",
                      }}
                    >
                      <DocumentCard type="seg_social" status="chaos" />
                    </div>
                  </div>

                  {/* Padrón (Doc 3) */}
                  <div
                    className="absolute left-1/2 top-1/2 paper-float [animation-delay:-2.7s]"
                    style={{ "--paper-rotate": "-8deg" } as React.CSSProperties}
                  >
                    <div
                      style={{
                        transform: "translate(calc(-50% + 20vw), calc(-50% + 2vh)) rotate(-8deg)",
                      }}
                    >
                      <DocumentCard type="padron" status="chaos" />
                    </div>
                  </div>

                  {/* Hacienda (Doc 4) */}
                  <div
                    className="absolute left-1/2 top-1/2 paper-float [animation-delay:-3.6s]"
                    style={{ "--paper-rotate": "4deg" } as React.CSSProperties}
                  >
                    <div
                      style={{
                        transform: "translate(calc(-50% + 24vw), calc(-50% - 2vh)) rotate(4deg)",
                      }}
                    >
                      <DocumentCard type="hacienda" status="chaos" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide 2: NIE Focus */}
              <div className="w-screen h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between p-8 md:p-24 relative select-none">
                <div className="w-full md:w-6/12 flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight font-syne">
                    &ldquo;You need an NIE number before you can do anything else.&rdquo;
                    <span className="text-red-600 font-mono text-xs md:text-sm tracking-widest uppercase font-bold mt-4 block flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      CARTA DE EXTRANJERÍA · TRADUCCIÓN REQUERIDA
                    </span>
                  </h2>
                </div>
                <div className="w-full md:w-5/12 relative h-full flex items-center justify-center">
                  <div className="scale-110 rotate-[-4deg] shadow-lg">
                    <DocumentCard type="nie" status="chaos" />
                  </div>
                </div>
              </div>

              {/* Slide 3: Seg Social Focus */}
              <div className="w-screen h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between p-8 md:p-24 relative select-none">
                <div className="w-full md:w-6/12 flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight font-syne">
                    &ldquo;You can&apos;t register for healthcare without a Seguridad Social number.&rdquo;
                    <span className="text-amber-600 font-mono text-xs md:text-sm tracking-widest uppercase font-bold mt-4 block flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      RESOLUCIÓN DE AFILIACIÓN · CITA PREVIA
                    </span>
                  </h2>
                </div>
                <div className="w-full md:w-5/12 relative h-full flex items-center justify-center">
                  <div className="scale-110 rotate-[6deg] shadow-lg">
                    <DocumentCard type="seg_social" status="chaos" />
                  </div>
                </div>
              </div>

              {/* Slide 4: Padrón Focus */}
              <div className="w-screen h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between p-8 md:p-24 relative select-none">
                <div className="w-full md:w-6/12 flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight font-syne">
                    &ldquo;You need an empadronamiento to open a bank account.&rdquo;
                    <span className="text-slate-500 font-sans text-lg md:text-xl mt-3 block font-normal">
                      No bank accepts foreign addresses. No office books without padrón.
                    </span>
                  </h2>
                </div>
                <div className="w-full md:w-5/12 relative h-full flex items-center justify-center">
                  <div className="scale-110 rotate-[-2deg] shadow-lg">
                    <DocumentCard type="padron" status="chaos" />
                  </div>
                </div>
              </div>

              {/* Slide 5: Hacienda & Stress Telemetry */}
              <div className="w-screen h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between p-8 md:p-24 relative select-none">
                <div 
                  className="w-full md:w-6/12 flex flex-col justify-center transition-opacity duration-300"
                  style={{ opacity: sliderOpacity }}
                >
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight font-syne">
                    Which one do you start with?
                    <span className="text-red-600 font-mono text-xs md:text-sm tracking-widest uppercase font-extrabold mt-2 block flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-red-600 animate-pulse" />
                      DEADLINES IMMINENT
                    </span>
                  </h2>

                  {/* Grid of individual stress cards */}
                  <div className="grid grid-cols-2 gap-3 mt-6 w-full max-w-sm pointer-events-auto">
                    {/* Card 1: Documents */}
                    <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-xs flex flex-col gap-1.5 transition-all hover:scale-[1.02] duration-300">
                      <div className="flex justify-between items-center text-slate-700">
                        <FileText className="w-4 h-4 text-[#16A34A]" />
                        <span className="font-mono font-bold text-base text-red-500">{docCount}</span>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 leading-none">
                        Documents Piled
                      </span>
                    </div>

                    {/* Card 2: Deadlines */}
                    <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-xs flex flex-col gap-1.5 transition-all hover:scale-[1.02] duration-300">
                      <div className="flex justify-between items-center text-slate-700">
                        <Clock className="w-4 h-4 text-[#16A34A]" />
                        <span className="font-mono font-bold text-base text-red-500">{deadlineCount}</span>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 leading-none">
                        Unknown Deadlines
                      </span>
                    </div>

                    {/* Card 3: Office Visits */}
                    <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-xs flex flex-col gap-1.5 transition-all hover:scale-[1.02] duration-300">
                      <div className="flex justify-between items-center text-slate-700">
                        <Activity className="w-4 h-4 text-[#16A34A]" />
                        <span className="font-mono font-bold text-base text-red-500">{officeCount}</span>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 leading-none">
                        Office Visits
                      </span>
                    </div>

                    {/* Card 4: Untranslated terms */}
                    <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-xs flex flex-col gap-1.5 transition-all hover:scale-[1.02] duration-300">
                      <div className="flex justify-between items-center text-slate-700">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        <span className="font-mono font-bold text-base text-amber-600 animate-pulse">{wordCount}</span>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 leading-none">
                        Untranslated Terms
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-5/12 relative h-full flex items-center justify-center">
                  <div className="scale-110 rotate-[4deg] shadow-lg">
                    <DocumentCard type="hacienda" status="chaos" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}


        {/* ================= INTERACTIVE DIVIDING LINES ================= */}
        
        {/* Lines removed as requested */}


        {/* ================= INTERACTIVE BUTTONS & CHEVRONS ================= */}
        
        {progress < 0.15 && (
          <div 
            className="absolute left-1/2 top-[80%] z-40 pointer-events-auto transition-all duration-300"
            style={{ 
              opacity: heroTextOpacity, 
              transform: `translate(-50%, -50%) scale(${interpolate(progress, 0, 0.12, 1, 0.8)})` 
            }}
          >
            <a
              href="#pain"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#F8FAFC]/55 backdrop-blur-md text-[#16A34A] border border-[#16A34A]/30 hover:bg-[#16A34A] hover:text-white hover:border-[#16A34A] transition-all duration-300 font-syne font-bold text-xs tracking-wider uppercase hover:scale-105 shadow-[0_8px_32px_rgba(22,163,74,0.08)]"
            >
              Get started
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Scroll Indicator */}
        {progress < 0.10 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden md:block">
            <a href="#pain" className="flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
              <span className="font-mono text-[9px] uppercase tracking-widest text-text-secondary mb-1">Scroll</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4 text-text-secondary"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </a>
          </div>
        )}

      </div>
    </div>
  );
}
