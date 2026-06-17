"use client";
 
import React from "react";
import { AlertTriangle, Check } from "lucide-react";


interface DocumentCardProps {
  type: "nie" | "seg_social" | "padron" | "hacienda";
  status?: "chaos" | "clean";
  progress?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function DocumentCard({
  type,
  status = "chaos",
  progress = 0,
  className = "",
  style,
}: DocumentCardProps) {
  const isChaos = status === "chaos";

  // Document details based on type
  const getDocDetails = () => {
    switch (type) {
      case "nie":
        return {
          title: "Certificado de Registro",
          subtitle: "Registro de Ciudadanos de la Unión",
          code: "EXP: NIE-2026-X83",
          bg: isChaos ? "bg-[#FAF8F5] text-[#1A1814]" : "bg-white text-slate-900",
          borderColor: isChaos ? "border-[#C4B9A8]" : "border-slate-200",
          sealColor: isChaos ? "text-[#D4820A]" : "text-[#16A34A]",
        };
      case "seg_social":
        return {
          title: "Seguridad Social",
          subtitle: "Resolución de Afiliación",
          code: "NUSS: 08/12345678/90",
          bg: isChaos ? "bg-[#FAF7F2] text-[#1A1814]" : "bg-white text-slate-900",
          borderColor: isChaos ? "border-[#C4B9A8]" : "border-slate-200",
          sealColor: isChaos ? "text-[#D4820A]" : "text-[#16A34A]",
        };
      case "padron":
        return {
          title: "Empadronamiento",
          subtitle: "Volante de Residencia Habitual",
          code: "REG: 08019-2026",
          bg: isChaos ? "bg-[#F5F2EC] text-[#1A1814]" : "bg-white text-slate-900",
          borderColor: isChaos ? "border-[#C4B9A8]" : "border-slate-200",
          sealColor: isChaos ? "text-[#D4820A]" : "text-[#16A34A]",
        };
      case "hacienda":
        return {
          title: "Agencia Tributaria",
          subtitle: "Modelo 303 - IVA Autoliquidación",
          code: "HAC: 2026-VAT-901",
          bg: isChaos ? "bg-[#F7F4EE] text-[#1A1814]" : "bg-white text-slate-900",
          borderColor: isChaos ? "border-[#C4B9A8]" : "border-slate-200",
          sealColor: isChaos ? "text-[#D4820A]" : "text-[#16A34A]",
        };
    }
  };

  const details = getDocDetails();
 
  if (!isChaos) {
    return (
      <div
        className={`relative w-72 h-[340px] p-6 rounded-2xl border border-slate-200/40 bg-white/55 backdrop-blur-md shadow-2xl flex flex-col justify-between font-sans select-none overflow-hidden text-slate-900 ${className}`}
        style={style}
      >
          {/* Background Watermark/Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
            <svg width="200" height="200" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
 
          {/* Header */}
          <div>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                {/* Simulated Coat of Arms / Logo */}
                <div className="w-8 h-8 rounded-md flex items-center justify-center border border-slate-200 bg-slate-50">
                  <span className={`text-[10px] font-bold ${details.sealColor}`}>ES</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider opacity-60 font-mono">
                    España
                  </p>
                  <h4 className="text-xs font-bold leading-tight font-syne">
                    {details.title}
                  </h4>
                </div>
              </div>
              {/* Status Badge */}
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider font-semibold border flex items-center gap-1 ${
                progress === 100 
                  ? "bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/20" 
                  : "bg-[#D4820A]/10 text-[#D4820A] border-[#D4820A]/20"
              }`}>
                {progress === 100 ? (
                  <>
                    <Check className="w-2.5 h-2.5" /> Complete
                  </>
                ) : (
                  "In Progress"
                )}
              </span>
            </div>
 
            <p className="mt-4 text-[10px] uppercase font-mono opacity-50">
              {details.code}
            </p>
            <p className="text-[11px] font-semibold opacity-85 mt-1">
              {details.subtitle}
            </p>
 
            {/* Separator */}
            <hr className="my-3 border-dashed border-slate-200" />
 
            {/* Body content placeholders */}
            <div className="space-y-2.5">
              <div className="flex justify-between">
                <span className="text-[9px] opacity-40 font-mono uppercase">Titular:</span>
                <span className="text-[9px] font-mono">JOHN DOE SMITH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[9px] opacity-40 font-mono uppercase">Nacionalidad:</span>
                <span className="text-[9px] font-mono">REINO UNIDO</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[9px] opacity-40 font-mono uppercase">Validez:</span>
                <span className="text-[9px] font-mono">17/06/2031</span>
              </div>
 
              <div className="pt-2 space-y-1">
                <div className="h-1.5 rounded-full bg-slate-100/50" style={{ width: "90%" }}></div>
                <div className="h-1.5 rounded-full bg-slate-100/50" style={{ width: "75%" }}></div>
                <div className="h-1.5 rounded-full bg-slate-100/50" style={{ width: "80%" }}></div>
              </div>
            </div>
          </div>
 
          {/* Footer / Progress Bar / Stamp */}
          <div>
            {progress > 0 && (
              <div className="mb-4">
                <div className="flex justify-between text-[9px] opacity-60 font-mono mb-1">
                  <span>Task Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#16A34A] transition-all duration-700" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
 
            <div className="flex justify-between items-end">
              {progress === 100 && (
                <div className="border-2 border-[#16A34A] rounded px-2 py-0.5 text-[#16A34A] font-bold text-[10px] tracking-wider uppercase rotate-[-6deg] font-mono animate-bounce flex items-center gap-1 bg-[#16A34A]/5">
                  <Check className="w-3.5 h-3.5 text-[#16A34A]" /> DONE
                </div>
              )}
 
              {/* Barcode */}
              <div className="flex flex-col items-end opacity-40">
                <div className="flex gap-0.5 items-end h-6">
                  <div className="w-[2px] h-full bg-slate-800"></div>
                  <div className="w-[1px] h-4 bg-slate-800"></div>
                  <div className="w-[3px] h-full bg-slate-800"></div>
                  <div className="w-[1px] h-5 bg-slate-800"></div>
                  <div className="w-[2px] h-full bg-slate-800"></div>
                  <div className="w-[1px] h-3 bg-slate-800"></div>
                  <div className="w-[4px] h-full bg-slate-800"></div>
                </div>
                <span className="text-[7px] font-mono tracking-widest mt-0.5">ES-08019-32</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
 
  return (
    <div
      className={`relative w-72 h-[340px] p-6 rounded-2xl border-2 shadow-2xl flex flex-col justify-between transition-colors duration-500 font-sans select-none overflow-hidden ${details.bg} ${details.borderColor} ${className}`}
      style={style}
    >
      {/* Background Watermark/Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
 
      {/* Header */}
      <div>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {/* Simulated Coat of Arms / Logo */}
            <div className={`w-8 h-8 rounded-md flex items-center justify-center border ${isChaos ? "border-[#C4B9A8] bg-[#F1EDE4]" : "border-slate-200 bg-slate-50"}`}>
              <span className={`text-[10px] font-bold ${details.sealColor}`}>ES</span>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider opacity-60 font-mono">
                España
              </p>
              <h4 className="text-xs font-bold leading-tight font-syne">
                {details.title}
              </h4>
            </div>
          </div>
          {/* Status Badge (for clean layout) */}
          {!isChaos && (
            <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider font-semibold border flex items-center gap-1 ${
              progress === 100 
                ? "bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/20" 
                : "bg-[#D4820A]/10 text-[#D4820A] border-[#D4820A]/20"
            }`}>
              {progress === 100 ? (
                <>
                  <Check className="w-2.5 h-2.5" /> Complete
                </>
              ) : (
                "In Progress"
              )}
            </span>
          )}
        </div>
 
        <p className="mt-4 text-[10px] uppercase font-mono opacity-50">
          {details.code}
        </p>
        <p className="text-[11px] font-semibold opacity-85 mt-1">
          {details.subtitle}
        </p>
 
        {/* Separator */}
        <hr className={`my-3 border-dashed ${isChaos ? "border-[#C4B9A8]" : "border-slate-200"}`} />
 
        {/* Body content placeholders (using skeleton lines for documents) */}
        <div className="space-y-2.5">
          <div className="flex justify-between">
            <span className="text-[9px] opacity-40 font-mono uppercase">Titular:</span>
            <span className="text-[9px] font-mono">JOHN DOE SMITH</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[9px] opacity-40 font-mono uppercase">Nacionalidad:</span>
            <span className="text-[9px] font-mono">REINO UNIDO</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[9px] opacity-40 font-mono uppercase">Validez:</span>
            <span className="text-[9px] font-mono">17/06/2031</span>
          </div>
 
          <div className="pt-2 space-y-1">
            <div className={`h-1.5 rounded-full ${isChaos ? "bg-[#1A1814]/10" : "bg-slate-100"}`} style={{ width: "90%" }}></div>
            <div className={`h-1.5 rounded-full ${isChaos ? "bg-[#1A1814]/10" : "bg-slate-100"}`} style={{ width: "75%" }}></div>
            <div className={`h-1.5 rounded-full ${isChaos ? "bg-[#1A1814]/10" : "bg-slate-100"}`} style={{ width: "80%" }}></div>
          </div>
        </div>
      </div>
 
      {/* Footer / Progress Bar / Stamp */}
      <div>
        {/* Progress bar in Clean mode */}
        {!isChaos && progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-[9px] opacity-60 font-mono mb-1">
              <span>Task Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#16A34A] transition-all duration-700" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
 
        <div className="flex justify-between items-end">
          {/* Simulated Stamp */}
          {isChaos ? (
            type === "hacienda" || type === "nie" ? (
              <div className="border-2 border-[#D4820A] rounded px-2 py-0.5 text-[#D4820A] font-bold text-[10px] tracking-wider uppercase rotate-[-6deg] opacity-80 font-mono flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-[#D4820A]" /> URGENTE
              </div>
            ) : (
              <div className="border border-[#C4B9A8] rounded-full w-7 h-7 flex items-center justify-center text-[#C4B9A8] font-bold text-[11px] rotate-[12deg] font-mono">
                ?
              </div>
            )
          ) : (
            progress === 100 && (
              <div className="border-2 border-[#16A34A] rounded px-2 py-0.5 text-[#16A34A] font-bold text-[10px] tracking-wider uppercase rotate-[-6deg] font-mono animate-bounce flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-[#16A34A]" /> DONE
              </div>
            )
          )}
 
          {/* Barcode */}
          <div className="flex flex-col items-end opacity-40">
            <div className="flex gap-0.5 items-end h-6">
              <div className={`w-[2px] h-full ${isChaos ? "bg-[#1A1814]" : "bg-slate-800"}`}></div>
              <div className={`w-[1px] h-4 ${isChaos ? "bg-[#1A1814]" : "bg-slate-800"}`}></div>
              <div className={`w-[3px] h-full ${isChaos ? "bg-[#1A1814]" : "bg-slate-800"}`}></div>
              <div className={`w-[1px] h-5 ${isChaos ? "bg-[#1A1814]" : "bg-slate-800"}`}></div>
              <div className={`w-[2px] h-full ${isChaos ? "bg-[#1A1814]" : "bg-slate-800"}`}></div>
              <div className={`w-[1px] h-3 ${isChaos ? "bg-[#1A1814]" : "bg-slate-800"}`}></div>
              <div className={`w-[4px] h-full ${isChaos ? "bg-[#1A1814]" : "bg-slate-800"}`}></div>
            </div>
            <span className="text-[7px] font-mono tracking-widest mt-0.5">ES-08019-32</span>
          </div>
        </div>
      </div>
    </div>
  );
}
