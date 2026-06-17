"use client";

import React from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { FileText, Lightbulb } from "lucide-react";

export default function DashboardDemo() {
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

  // Define stages opacities for the copy text
  const textStage1 = 1 - interpolate(progress, 0.18, 0.22, 0, 1);
  const textStage2 = interpolate(progress, 0.20, 0.35, 0, 1) - interpolate(progress, 0.38, 0.42, 0, 1);
  const textStage3 = interpolate(progress, 0.40, 0.55, 0, 1) - interpolate(progress, 0.58, 0.62, 0, 1);
  const textStage4 = interpolate(progress, 0.60, 0.72, 0, 1) - interpolate(progress, 0.72, 0.76, 0, 1);
  const textStage5 = interpolate(progress, 0.75, 0.88, 0, 1) - interpolate(progress, 0.88, 0.92, 0, 1);
  const textStage6 = interpolate(progress, 0.90, 1.0, 0, 1);

  // Phone scale: zooms out at the end
  const phoneScale = interpolate(progress, 0.88, 0.98, 1.15, 1.0);
  
  // Element visibilities/opacities inside the mockup
  const stage2AlertOpacity = interpolate(progress, 0.20, 0.28, 0, 1);
  const stage3CardsOpacity = interpolate(progress, 0.40, 0.48, 0, 1);
  const stage4VaultOpacity = interpolate(progress, 0.60, 0.68, 0, 1);
  const stage5SuggestOpacity = interpolate(progress, 0.75, 0.82, 0, 1);
  const stage5SuggestTranslateX = interpolate(progress, 0.75, 0.82, 120, 0);

  // Hand visual opacity (appears at stage 6)
  const handOpacity = interpolate(progress, 0.88, 0.96, 0, 1);

  return (
    <div ref={ref} id="dashboard-demo" className="relative h-[250vh] w-full bg-[#F8FAFC] scroll-mt-28">
      
      {/* Sticky layout container */}
      <div className="sticky top-0 w-full h-screen flex flex-col md:flex-row items-center justify-between p-8 md:p-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(22,163,74,0.12),transparent_34%),radial-gradient(circle_at_18%_20%,rgba(212,130,10,0.08),transparent_26%)]"></div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#16A34A]/50 to-transparent"></div>
        
        {/* Left Column: Sticky Narrative Copy */}
        <div className="w-full md:w-5/12 h-[30vh] md:h-fit relative z-20 flex items-center">
          
          <div className="relative w-full h-32 md:h-48">
            {/* Stage 1 Copy */}
            <div 
              className="absolute inset-0 transition-opacity duration-300 flex flex-col justify-center"
              style={{ opacity: textStage1, pointerEvents: textStage1 > 0.5 ? "auto" : "none" }}
            >
              <span className="font-mono text-xs font-bold text-[#16A34A] uppercase tracking-wider">Stage 01</span>
              <h3 className="text-2xl md:text-4xl font-extrabold font-syne text-slate-950 mt-2">
                Your personal command centre
              </h3>
              <p className="text-xs md:text-sm text-slate-600 mt-2 max-w-sm">
                One screen that summarizes your entire legal identity, tailored specifically to your student or worker profile.
              </p>
            </div>

            {/* Stage 2 Copy */}
            <div 
              className="absolute inset-0 transition-opacity duration-300 flex flex-col justify-center"
              style={{ opacity: textStage2, pointerEvents: textStage2 > 0.5 ? "auto" : "none" }}
            >
              <span className="font-mono text-xs font-bold text-[#16A34A] uppercase tracking-wider">Stage 02</span>
              <h3 className="text-2xl md:text-4xl font-extrabold font-syne text-slate-950 mt-2">
                Always know what&apos;s urgent
              </h3>
              <p className="text-xs md:text-sm text-slate-600 mt-2 max-w-sm">
                Critical deadlines, visa renewals, and tax reports are flagged automatically. No more surprise expiration dates.
              </p>
            </div>

            {/* Stage 3 Copy */}
            <div 
              className="absolute inset-0 transition-opacity duration-300 flex flex-col justify-center"
              style={{ opacity: textStage3, pointerEvents: textStage3 > 0.5 ? "auto" : "none" }}
            >
              <span className="font-mono text-xs font-bold text-[#16A34A] uppercase tracking-wider">Stage 03</span>
              <h3 className="text-2xl md:text-4xl font-extrabold font-syne text-slate-950 mt-2">
                Track every process in one place
              </h3>
              <p className="text-xs md:text-sm text-slate-600 mt-2 max-w-sm">
                See real-time progress. Know exactly which step you are on, and what the administration is currently doing.
              </p>
            </div>

            {/* Stage 4 Copy */}
            <div 
              className="absolute inset-0 transition-opacity duration-300 flex flex-col justify-center"
              style={{ opacity: textStage4, pointerEvents: textStage4 > 0.5 ? "auto" : "none" }}
            >
              <span className="font-mono text-xs font-bold text-[#16A34A] uppercase tracking-wider">Stage 04</span>
              <h3 className="text-2xl md:text-4xl font-extrabold font-syne text-slate-950 mt-2">
                Your documents, safe and watched
              </h3>
              <p className="text-xs md:text-sm text-slate-600 mt-2 max-w-sm">
                Paprs reads your certificates, extracts dates, and notifies you when registration or residency documents are expiring.
              </p>
            </div>

            {/* Stage 5 Copy */}
            <div 
              className="absolute inset-0 transition-opacity duration-300 flex flex-col justify-center"
              style={{ opacity: textStage5, pointerEvents: textStage5 > 0.5 ? "auto" : "none" }}
            >
              <span className="font-mono text-xs font-bold text-[#16A34A] uppercase tracking-wider">Stage 05</span>
              <h3 className="text-2xl md:text-4xl font-extrabold font-syne text-slate-950 mt-2">
                We spot things you&apos;d miss
              </h3>
              <p className="text-xs md:text-sm text-slate-600 mt-2 max-w-sm">
                If an empadronamiento needs updates, or a fee changes, Paprs automatically triggers a recommendation to keep you safe.
              </p>
            </div>

            {/* Stage 6 Copy */}
            <div 
              className="absolute inset-0 transition-opacity duration-300 flex flex-col justify-center"
              style={{ opacity: textStage6, pointerEvents: textStage6 > 0.5 ? "auto" : "none" }}
            >
              <span className="font-mono text-xs font-bold text-[#16A34A] uppercase tracking-wider">Stage 06</span>
              <h3 className="text-2xl md:text-4xl font-extrabold font-syne text-slate-950 mt-2">
                Your pocket legal agency
              </h3>
              <p className="text-xs md:text-sm text-slate-600 mt-2 max-w-sm">
                Your entire relocation, registration, and tax filings resolved inside a single interface. Ready whenever you are.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Mobile Simulator Viewport */}
        <div className="w-full md:w-6/12 h-[60vh] md:h-full flex items-center justify-center relative z-10">
          
          {/* Outer Zoom Wrapper */}
          <div 
            className="relative transition-all duration-300 flex items-center justify-center"
            style={{ transform: `scale(${phoneScale})` }}
          >
            
            {/* Illustrated Vector Hand Wrapper (fades in behind/around phone) */}
            <div 
              className="absolute -bottom-64 -right-32 w-[480px] h-[480px] pointer-events-none z-0 transition-opacity duration-500"
              style={{ opacity: handOpacity }}
            >
              {/* Stylized geometric vector representation of hand holding phone */}
              <svg viewBox="0 0 200 200" className="w-full h-full text-clarity-slate fill-current opacity-25">
                <path d="M 140 180 C 130 140, 110 130, 95 130 C 80 130, 70 145, 60 145 C 50 145, 45 130, 42 120 L 25 120 L 25 200 Z" />
                <path d="M 135 155 Q 120 130 95 110 Q 75 105 60 110 L 60 180 Z" />
              </svg>
            </div>

            {/* Phone Container */}
            <div className="w-72 h-[560px] rounded-[30px] border-[6px] border-slate-800 bg-slate-50 shadow-[0_35px_90px_rgba(15,23,42,0.18),0_0_80px_rgba(34,197,94,0.12)] overflow-hidden flex flex-col relative z-10">
              
              {/* Phone Speaker Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-800 rounded-full z-40 flex items-center justify-center">
                <div className="w-8 h-1 bg-slate-900 rounded-full"></div>
              </div>

              {/* Status Bar */}
              <div className="h-10 bg-slate-50 px-6 pt-5 flex justify-between items-center text-[9px] font-mono text-slate-500 z-30 select-none">
                <span>9:41 BCN</span>
                <span className="flex items-center gap-1.5">
                  <span>5G</span>
                  <span className="w-4 h-2 rounded-sm border border-slate-400 flex items-center p-0.5"><span className="w-full h-full bg-slate-500 rounded-sm"></span></span>
                </span>
              </div>

              {/* App Shell Dashboard Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4 select-none pb-8 scrollbar-none">
                
                {/* User Info Header */}
                <div className="flex justify-between items-center mt-1">
                  <div>
                    <h5 className="font-syne font-extrabold text-sm text-slate-900">John Doe</h5>
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Non-EU · Student · BCN</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/30 flex items-center justify-center font-mono text-[9px] text-[#16A34A] font-bold">
                    JD
                  </div>
                </div>

                {/* STAGE 2: Urgent Deadline Card */}
                <div 
                  className="bg-white border border-red-200 p-4 rounded-2xl shadow-lg transition-all duration-500"
                  style={{ 
                    opacity: stage2AlertOpacity,
                    transform: `translateY(${stage2AlertOpacity > 0 ? 0 : 20}px)`,
                    boxShadow: "0 0 15px rgba(239, 68, 68, 0.05)"
                  }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] uppercase font-mono tracking-wider text-red-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
                      Urgent Action
                    </span>
                    <span className="text-[9px] font-mono text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded">
                      52 Days Left
                    </span>
                  </div>
                  <h6 className="font-syne font-bold text-xs text-slate-900">Student Visa Renewal</h6>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Next: Pay government fee Modelo 790 before booking appointment.
                  </p>
                  <div className="mt-3 w-full h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg text-[10px] font-bold flex items-center justify-center font-mono cursor-pointer transition-colors shadow-sm">
                    Continue Procedure →
                  </div>
                </div>

                {/* STAGE 3: Active Action Plans */}
                <div 
                  className="flex flex-col gap-3 transition-all duration-500"
                  style={{ 
                    opacity: stage3CardsOpacity,
                    transform: `translateY(${stage3CardsOpacity > 0 ? 0 : 20}px)` 
                  }}
                >
                  <div className="text-[9px] uppercase font-mono tracking-wider text-slate-400 font-bold">
                    Your Roadmaps
                  </div>

                  {/* NIE card */}
                  <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-sm flex items-center justify-between">
                    <div>
                      <h6 className="font-syne font-bold text-xs text-slate-900">NIE Certificate</h6>
                      <p className="text-[9px] text-[#16A34A] font-mono mt-0.5">3 of 7 steps complete</p>
                    </div>
                    <div className="w-12 bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div className="bg-[#16A34A] h-full w-[42%]"></div>
                    </div>
                  </div>

                  {/* Padrón card */}
                  <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-sm flex items-center justify-between">
                    <div>
                      <h6 className="font-syne font-bold text-xs text-slate-900">Empadronamiento</h6>
                      <p className="text-[9px] text-[#D4820A] font-mono mt-0.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[#D4820A] rounded-full animate-pulse"></span>
                        Waiting for townhall
                      </p>
                    </div>
                    <div className="w-12 bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div className="bg-[#D4820A] h-full w-[80%]"></div>
                    </div>
                  </div>
                </div>

                {/* STAGE 4: Document Vault List */}
                <div 
                  className="flex flex-col gap-3 transition-all duration-500"
                  style={{ 
                    opacity: stage4VaultOpacity,
                    transform: `translateY(${stage4VaultOpacity > 0 ? 0 : 20}px)` 
                  }}
                >
                  <div className="text-[9px] uppercase font-mono tracking-wider text-slate-400 font-bold">
                    Document Vault
                  </div>

                  <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-sm flex flex-col gap-2">
                    {/* Doc 1 */}
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-800 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#16A34A]" /> NIE Certificate
                      </span>
                      <span className="text-[8px] font-mono text-[#16A34A] bg-[#16A34A]/10 px-1.5 py-0.5 rounded">Verified</span>
                    </div>
                    {/* Doc 2 */}
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-800 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#D4820A]" /> Padrón Volante
                      </span>
                      <span className="text-[8px] font-mono text-[#D4820A] bg-[#D4820A]/10 px-1.5 py-0.5 rounded">Expires soon</span>
                    </div>
                    {/* Doc 3 */}
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-800 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-slate-400" /> Passport Scan
                      </span>
                      <span className="text-[8px] font-mono text-slate-400">8m left</span>
                    </div>
                  </div>
                </div>

                {/* STAGE 5: Suggestion Recommendation Tooltip */}
                <div 
                  className="bg-white border-2 border-[#16A34A]/40 p-4 rounded-xl shadow-2xl transition-all duration-500"
                  style={{ 
                    opacity: stage5SuggestOpacity,
                    transform: `translateX(${stage5SuggestTranslateX}px)` 
                  }}
                >
                  <div className="flex gap-2 items-start">
                    <Lightbulb className="w-4 h-4 text-[#16A34A] mt-0.5 shrink-0" />
                    <div>
                      <h6 className="font-syne font-bold text-[11px] text-[#16A34A] leading-tight">Empadronamiento expiring</h6>
                      <p className="text-[9px] text-slate-500 mt-1 leading-relaxed">
                        Many Spanish procedures require a volante dated within 90 days. We suggest ordering a fresh copy now.
                      </p>
                      <div className="flex gap-2 mt-3.5">
                        <button className="px-2.5 py-1 rounded bg-[#16A34A] text-white font-mono text-[8px] font-bold cursor-pointer transition-colors hover:bg-[#118030]">
                          Add to Plan
                        </button>
                        <button className="px-2.5 py-1 rounded bg-slate-100 text-slate-600 font-mono text-[8px] border border-slate-200 cursor-pointer transition-colors hover:bg-slate-200">
                          Ignore
                        </button>
                      </div>
                    </div>
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
