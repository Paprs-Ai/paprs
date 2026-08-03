"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { useScrollProgress } from "../hooks/useScrollProgress";

const testimonials = [
  {
    quote:
      "What my gestor couldn't explain in 3 months, Paprs clarified in 5 minutes. I finally knew the right order to do everything.",
    name: "James",
    sub: "British expat · Madrid",
    city: "Madrid",
    flag: "🇬🇧",
    role: "Self-employed",
  },
  {
    quote:
      "I received a letter from Hacienda that terrified me. Uploaded it to Paprs and understood it in 30 seconds.",
    name: "Camila",
    sub: "Brazilian student · Barcelona",
    city: "Barcelona",
    flag: "🇧🇷",
    role: "Student",
  },
  {
    quote:
      "The call script feature. I used it to call the extranjería. Went perfectly — I knew exactly what to say.",
    name: "Arjun",
    sub: "Indian professional · Valencia",
    city: "Valencia",
    flag: "🇮🇳",
    role: "Software Engineer",
  },
  {
    quote:
      "As a PhD researcher joining a Spanish university, the admin burden was overwhelming. Paprs mapped every single step — NIE, Social Security, everything. I actually focused on my research instead.",
    name: "Lena",
    sub: "German researcher · Seville",
    city: "Seville",
    flag: "🇩🇪",
    role: "PhD Researcher",
  },
  {
    quote:
      "Nobody tells you how many offices are involved just to open a bank account. Paprs showed every dependency before I took a single step.",
    name: "Marcus",
    sub: "American worker · Barcelona",
    city: "Barcelona",
    flag: "🇺🇸",
    role: "Product Manager",
  },
  {
    quote:
      "New immigrant, no Spanish, zero idea where to start. Paprs gave me a clear plan on day one.",
    name: "Yasmine",
    sub: "Moroccan newcomer · Bilbao",
    city: "Bilbao",
    flag: "🇲🇦",
    role: "New Immigrant",
  },
  {
    quote:
      "The tax implications were confusing, but Paprs broke it down perfectly. Saved me thousands in penalties.",
    name: "Sofia",
    sub: "Italian freelancer · Madrid",
    city: "Madrid",
    flag: "🇮🇹",
    role: "Freelancer",
  },
  {
    quote:
      "Navigating Spanish bureaucracy felt impossible until I found Paprs. It's like having a guide who understands every step.",
    name: "David",
    sub: "Portuguese entrepreneur · Lisbon",
    city: "Lisbon",
    flag: "🇵🇹",
    role: "Entrepreneur",
  },
  {
    quote:
      "I thought I'd need a lawyer for my visa extension. Paprs guided me through it myself in just 2 hours.",
    name: "Elena",
    sub: "Russian designer · Barcelona",
    city: "Barcelona",
    flag: "🇷🇺",
    role: "Designer",
  }
];

const N = testimonials.length;

export default function SocialProof() {
  const { ref, progress } = useScrollProgress();
  const [isScrolling, setIsScrolling] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolling(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setIsScrolling(false), 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timerRef.current);
    };
  }, []);

  const scrollActive = isScrolling ? Math.round(progress * (N - 1)) : null;
  const activeIndex = scrollActive ?? hovered;

  return (
    <div
      ref={ref}
      id="social-proof"
      className="relative scroll-mt-28"
      style={{ height: `${N * 62}vh` }}
    >
      <div className="sticky top-0 h-screen bg-[#FFFFFF] flex flex-col overflow-hidden justify-center">
       

        <div className="w-full flex flex-col items-center justify-center mb-16 select-none">
          <span className="font-mono text-xs font-bold text-black uppercase bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full">
            Testimonials
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold font-syne text-black leading-tight text-center">
            Real stories. Real relief.
          </h2>
        </div>
        {/* Grid — compact width, centered */}
        <div className="flex-1 flex items-center justify-center px-8 md:px-12 pb-8 overflow-hidden">
          <div className="grid grid-cols-3 gap-4 w-full max-w-[1200px]">
            {testimonials.map((t, i) => {
              const isActive = activeIndex === i;
              const isDimmed = activeIndex !== null && !isActive;
              const quoteLen = t.quote.length;
              const quoteFontSize =
                quoteLen < 80 ? "13px" : quoteLen < 150 ? "11.5px" : "10px";

              return (
                <div
                  key={t.name}
                  onMouseEnter={() => !isScrolling && setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative flex flex-col rounded-xl overflow-hidden cursor-default"
                  style={{
                    background: "#FFFFFF",
                    border: isActive
                      ? "1.5px solid #000000"
                      : "1px solid #E4E4E7",
                    transition:
                      "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, opacity 0.35s ease, filter 0.35s ease, border-color 0.35s ease",
                    transform: isActive
                      ? "scale(1.03)"
                      : isDimmed
                        ? "scale(0.975)"
                        : "scale(1)",
                    filter: isDimmed ? "blur(1px)" : "none",
                    opacity: isDimmed ? 0.45 : 1,
                    boxShadow: isActive
                      ? "0 12px 32px rgba(0,0,0,0.12)"
                      : "0 1px 4px rgba(0,0,0,0.03)",
                    zIndex: isActive ? 10 : 1,
                  }}
                >
                  <div className="flex flex-col p-3.5 gap-0">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[17px] leading-none">
                          {t.flag}
                        </span>
                        <span className="font-mono text-[8.5px] font-bold uppercase tracking-wider text-black">
                          {t.role}
                        </span>
                      </div>
                      <span className="font-mono text-[7.5px] uppercase tracking-wider text-zinc-500 font-medium">
                        {t.city}
                      </span>
                    </div>

                    <hr className="border-dashed border-zinc-200 my-2.5" />

                    {/* Quote */}
                    <div className="flex flex-col">
                      <p className="font-mono text-[7px] uppercase tracking-widest text-zinc-400 font-bold mb-1.5">
                        Declaración
                      </p>
                      <p
                        className="font-sans text-black leading-relaxed"
                        style={{ fontSize: quoteFontSize }}
                      >
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>

                    <hr className="border-dashed border-zinc-200 my-2.5" />

                    {/* Author */}
                    <div>
                      <p className="font-mono text-[7px] uppercase tracking-widest text-zinc-400 font-bold mb-0.5">
                        Titular
                      </p>
                      <p className="font-syne font-extrabold text-[11.5px] text-black leading-tight">
                        {t.name}
                      </p>
                      <p className="font-mono text-[7.5px] uppercase tracking-wide text-zinc-500 mt-0.5 font-medium">
                        {t.sub}
                      </p>
                    </div>
                  </div>

                  {/* VERIFIED stamp */}
                  <div
                    className="absolute bottom-3 right-2.5 border-2 border-black rounded px-1.5 py-0.5 text-white bg-black font-extrabold text-[7.5px] tracking-widest uppercase font-mono flex items-center gap-0.5 shadow-sm"
                    style={{
                      transform: `rotate(-7deg) scale(${isActive ? 1 : 0.5})`,
                      opacity: isActive ? 1 : 0,
                      transition:
                        "transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
                    }}
                  >
                    <Check className="w-2 h-2 text-white" /> VERIFIED
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
