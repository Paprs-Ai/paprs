"use client";
 
import React from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { Globe, MapPin, FileText, Target, Check, ArrowRight } from "lucide-react";
import DocumentCard from "../components/DocumentCard";
 
export default function HowItWorks() {
  const { ref, progress } = useScrollProgress();
 
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
 
  // Horizontal translation percentage (4 slides = width 400%)
  const translatePercent = progress * (3 / 4) * 100;
 
  // Background styling transition: warm paper to pale product slate
  const bgRed = Math.round(interpolate(progress, 0, 1, 247, 241));
  const bgGreen = Math.round(interpolate(progress, 0, 1, 244, 245));
  const bgBlue = Math.round(interpolate(progress, 0, 1, 238, 249));
  const bgStyle = {
    backgroundColor: `rgb(${bgRed}, ${bgGreen}, ${bgBlue})`,
  };
 
  // Slide 1 (Intro) animations:
  // 1. Clean cards fly in from bottom (scrolling down: progress goes from 0 to 0.12)
  const cardsSlideY = interpolate(progress, 0, 0.12, 600, 0);
  const cardsOpacity = interpolate(progress, 0, 0.08, 0, 1);
 
  // Slide 2: Onboarding Visual (typing and profile lines)
  const textTyped1 = progress > 0.28 ? "Student" : "";
  const textTyped2 = progress > 0.33 ? "Barcelona" : "";
  const textTyped3 = progress > 0.38 ? "Non-EU" : "";
  
  const profileLine1Opacity = interpolate(progress, 0.30, 0.34, 0, 1);
  const profileLine2Opacity = interpolate(progress, 0.35, 0.39, 0, 1);
  const profileLine3Opacity = interpolate(progress, 0.40, 0.44, 0, 1);
  const profileLine4Opacity = interpolate(progress, 0.45, 0.49, 0, 1);
 
  // Slide 3: roadmap cards slide up (Slide 3 covers progress ~0.50 to 0.75)
  const roadmapCardsY = interpolate(progress, 0.50, 0.60, 100, 0);
  const roadmapCardsOpacity = interpolate(progress, 0.50, 0.56, 0, 1);
  const roadLineDraw = interpolate(progress, 0.58, 0.70, 100, 0); // strokeDashoffset
 
  // Slide 4: plan details & progress checklist (Slide 4 covers progress ~0.75 to 1.0)
  const step3CardScale = interpolate(progress, 0.75, 0.85, 0.9, 1);
  const step3Progress = interpolate(progress, 0.78, 0.92, 14, 100);
  const showDoneStamp = progress >= 0.90;
 
  return (
    <div ref={ref} id="how-it-works" className="relative h-[200vh] w-full scroll-mt-28">
      
      {/* Sticky Frame */}
      <div 
        className="sticky top-0 w-full h-screen overflow-hidden transition-colors duration-500 flex items-center z-10"
        style={bgStyle}
      >
        <div className="absolute right-[-15%] top-[8%] h-[520px] w-[520px] rounded-full bg-[#16A34A]/10 blur-3xl z-0 pointer-events-none"></div>
 
        {/* Horizontal Slider Track */}
        <div 
          className="flex h-full transition-transform duration-300 ease-out z-10"
          style={{ 
            transform: `translateX(-${translatePercent}%)`,
            width: "400%" 
          }}
        >
          
          {/* Slide 1: There's a better way */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between p-8 md:p-24 relative select-none">
            {/* Left Column: Text */}
            <div className="w-full md:w-5/12 flex flex-col justify-center">
              <span className="font-mono text-xs font-bold text-[#16A34A] uppercase bg-[#16A34A]/10 px-3 py-1 rounded-full w-fit">
                Paprs appears
              </span>
              <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-slate-950 mt-6 mb-4 leading-tight">
                There&apos;s a better way.
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md">
                The same pile becomes a roadmap: deadlines, dependencies, documents, and the next plain-language step.
              </p>
            </div>
 
            {/* Right Column: Visual Sandbox (Clean Card Stack with Scan Sweep) */}
            <div className="w-full md:w-6/12 h-full flex items-center justify-center relative">
              <div 
                className="relative w-[400px] h-[430px] flex items-center justify-center scan-sweep overflow-hidden rounded-lg transition-all duration-100 pointer-events-none scale-90 md:scale-95 lg:scale-105"
                style={{
                  transform: `translateY(${cardsSlideY}px)`,
                  opacity: cardsOpacity
                }}
              >
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
          
          {/* Slide 2: Tell us who you are */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between p-8 md:p-24 relative select-none">
            {/* Left Column: Text */}
            <div className="w-full md:w-5/12 flex flex-col justify-center">
              <span className="font-mono text-xs font-bold text-[#16A34A] uppercase bg-[#16A34A]/10 px-3 py-1 rounded-full w-fit">
                Step 01
              </span>
              <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-slate-950 mt-6 mb-4 leading-tight">
                Tell us who you are.
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md">
                Three minutes. No forms. No legal jargon. Just plain questions that filter your exact bureaucratic situation.
              </p>
            </div>
 
            {/* Right Column: Visual Sandbox */}
            <div className="w-full md:w-6/12 h-full flex items-center justify-center relative">
              
              {/* Form & Profile Cards */}
              <div 
                className="w-full max-w-lg flex flex-col md:flex-row gap-6 items-center justify-center transition-all duration-100"
              >
                {/* Form card */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl w-64 shadow-2xl flex flex-col gap-4 font-mono text-xs text-slate-800">
                  <div className="text-[10px] text-slate-400 border-b border-slate-100 pb-2 uppercase tracking-widest font-semibold">
                    Quick Onboarding
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Visa Type:</span>
                    <div className="h-8 bg-slate-50 rounded px-3 flex items-center text-[#16A34A] font-medium border border-slate-200">
                      {textTyped1}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Target City:</span>
                    <div className="h-8 bg-slate-50 rounded px-3 flex items-center text-[#16A34A] font-medium border border-slate-200">
                      {textTyped2}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Origin:</span>
                    <div className="h-8 bg-slate-50 rounded px-3 flex items-center text-[#16A34A] font-medium border border-slate-200">
                      {textTyped3}
                    </div>
                  </div>
                </div>
 
                {/* Profile Card Output */}
                <div className="bg-white border-2 border-[#16A34A]/40 p-6 rounded-lg w-64 shadow-2xl shadow-[#16A34A]/10 flex flex-col gap-3.5 font-mono text-xs text-slate-800 transition-all duration-300">
                  <div className="text-[10px] text-[#16A34A] border-b border-[#16A34A]/10 pb-2 uppercase tracking-widest font-bold">
                    Generated Profile
                  </div>
                  <div className="flex items-center gap-2 text-slate-800" style={{ opacity: profileLine1Opacity }}>
                    <Globe className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>Non-EU · Student</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-800" style={{ opacity: profileLine2Opacity }}>
                    <MapPin className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>Barcelona</span>
                  </div>
                  <div className="flex items-center gap-2 text-chaos-amber" style={{ opacity: profileLine3Opacity }}>
                    <FileText className="w-3.5 h-3.5 text-chaos-amber" />
                    <span>Visa expires: 8 weeks</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#16A34A] font-semibold" style={{ opacity: profileLine4Opacity }}>
                    <Target className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>3 immediate tasks</span>
                  </div>
                </div>
              </div>
 
            </div>
          </div>
 
          {/* Slide 2: We build your roadmap */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between p-8 md:p-24 relative select-none">
            {/* Left Column: Text */}
            <div className="w-full md:w-5/12 flex flex-col justify-center">
              <span className="font-mono text-xs font-bold text-[#16A34A] uppercase bg-[#16A34A]/10 px-3 py-1 rounded-full w-fit">
                Step 02
              </span>
              <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-slate-950 mt-6 mb-4 leading-tight">
                We build your roadmap.
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md">
                We map everything out. What&apos;s urgent. What comes first. What depends on what. You see the whole picture — clearly.
              </p>
            </div>
 
            {/* Right Column: Visual Sandbox */}
            <div className="w-full md:w-6/12 h-full flex items-center justify-center relative">
              <div 
                className="w-full max-w-md flex flex-col gap-6 relative"
                style={{
                  transform: `translateY(${roadmapCardsY}px)`,
                  opacity: roadmapCardsOpacity,
                }}
              >
                {/* Dependency SVG lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  <path
                    d="M 190 280 L 190 190 M 190 100 L 190 30"
                    fill="none"
                    stroke="#16A34A"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    strokeDashoffset={roadLineDraw}
                    className="transition-all duration-300"
                  />
                </svg>
 
                {/* Card 3 (Final Task) */}
                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-lg flex items-center justify-between z-10 w-full text-slate-800">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-slate-400">Task 03</div>
                    <div className="font-syne font-bold text-sm text-slate-900">Open Spanish Bank Account</div>
                    <div className="font-mono text-[10px] text-slate-400 mt-0.5">Depends on NIE certificate</div>
                  </div>
                  <div className="text-[10px] font-mono text-[#D4820A] bg-[#D4820A]/10 border border-[#D4820A]/20 px-2 py-0.5 rounded">
                    Locked
                  </div>
                </div>
 
                {/* Card 2 (In progress) */}
                <div className="bg-white border-2 border-[#16A34A]/40 p-4 rounded-xl shadow-lg flex items-center justify-between z-10 w-full text-slate-800">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-[#16A34A] font-bold">Task 02 · URGENT</div>
                    <div className="font-syne font-bold text-sm text-slate-900">Get your NIE Number</div>
                    <div className="font-mono text-[10px] text-[#16A34A]/70 mt-0.5">Step 1 of 7 · Due in 3 weeks</div>
                  </div>
                  <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#16A34A] h-full w-[14%]"></div>
                  </div>
                </div>
 
                {/* Card 1 (First dependency) */}
                <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-lg flex items-center justify-between z-10 w-full text-slate-800">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-slate-400">Task 01</div>
                    <div className="font-syne font-bold text-sm text-slate-900">Register on the Padrón</div>
                    <div className="font-mono text-[10px] text-[#16A34A] mt-0.5">Needed for NIE appointment</div>
                  </div>
                  <div className="text-[10px] font-mono text-[#16A34A] bg-[#16A34A]/10 border border-[#16A34A]/20 px-2 py-0.5 rounded">
                    Ready
                  </div>
                </div>
 
              </div>
            </div>
          </div>
 
          {/* Slide 3: Follow the steps */}
          <div className="w-screen h-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between p-8 md:p-24 relative select-none">
            {/* Left Column: Text */}
            <div className="w-full md:w-5/12 flex flex-col justify-center">
              <span className="font-mono text-xs font-bold text-[#16A34A] uppercase bg-[#16A34A]/10 px-3 py-1 rounded-full w-fit">
                Step 03
              </span>
              <h3 className="text-3xl md:text-5xl font-extrabold font-syne text-slate-950 mt-6 mb-4 leading-tight">
                Follow the steps.
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md">
                No confusion. No guessing. Just: do this, then this, then this. With every document, fee code, and translation ready.
              </p>
            </div>
 
            {/* Right Column: Visual Sandbox */}
            <div className="w-full md:w-6/12 h-full flex items-center justify-center relative">
              <div 
                className="bg-[#F8FAFC] border-2 rounded-lg w-full max-w-md shadow-2xl p-6 relative font-sans transition-all duration-300 text-slate-800"
                style={{
                  transform: `scale(${step3CardScale})`,
                  borderColor: showDoneStamp ? "#16A34A" : "#E2E8F0"
                }}
              >
                
                {/* Header */}
                <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
                  <div>
                    <span className="font-mono text-[9px] uppercase text-[#16A34A] font-bold">Plan 02 · NIE Registration</span>
                    <h4 className="font-syne font-bold text-lg text-slate-900 mt-1">Get your NIE Certificate</h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/20 uppercase font-semibold">
                    Active
                  </span>
                </div>
 
                {/* Step checklist */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 opacity-90 text-xs">
                    <Check className="w-3.5 h-3.5 text-[#16A34A] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900">Assemble documents</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Passport copy, EX-15 form, visa stamp</p>
                    </div>
                  </div>
 
                  <div className="flex items-start gap-3 opacity-90 text-xs">
                    <Check className="w-3.5 h-3.5 text-[#16A34A] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900">Pay government tax code</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Modelo 790 - Code 012 (€9.84 fee)</p>
                    </div>
                  </div>
 
                  <div className="flex items-start gap-3 text-xs">
                    {showDoneStamp ? (
                      <Check className="w-3.5 h-3.5 text-[#16A34A] mt-0.5 shrink-0" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-chaos-amber mt-0.5 shrink-0" />
                    )}
                    <div>
                      <p className="font-semibold text-slate-900">Present at Extranjería Office</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Carrer de Múrcia, Barcelona (Bring Cita confirmation)</p>
                    </div>
                  </div>
                </div>
 
                {/* Progress and Stamp */}
                <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                  <div className="w-1/2">
                    <span className="text-[10px] font-mono text-slate-500 block mb-1">NIE Progress</span>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#16A34A] h-full transition-all duration-300"
                        style={{ width: `${step3Progress}%` }}
                      ></div>
                    </div>
                  </div>
 
                  {/* Stamp */}
                  <div 
                    className={`border-4 border-[#16A34A] rounded px-3 py-1 text-[#16A34A] font-extrabold text-xs tracking-widest uppercase rotate-[-8deg] shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-500 flex items-center gap-1 ${
                      showDoneStamp ? "scale-100 opacity-100 animate-[bounce_0.5s_ease-out_1]" : "scale-150 opacity-0"
                    }`}
                  >
                    <Check className="w-4 h-4 text-[#16A34A]" /> DONE
                  </div>
                </div>
 
              </div>
            </div>
          </div>
 
        </div>
      </div>
    </div>
  );
}
