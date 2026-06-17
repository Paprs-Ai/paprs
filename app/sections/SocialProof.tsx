"use client";

import React, { useEffect, useRef, useState } from "react";
import { User } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  info: string;
  align: "left" | "right";
}

export default function SocialProof() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const testimonials: Testimonial[] = [
    {
      quote:
        "I had no idea I needed an empadronamiento before I could do anything else. Paprs showed me the right order in 5 minutes.",
      name: "James",
      info: "British expat · Madrid",
      align: "left",
    },
    {
      quote:
        "I received a letter from Hacienda that terrified me. I uploaded it to Paprs and understood it in 30 seconds.",
      name: "Camila",
      info: "Brazilian student · Barcelona",
      align: "right",
    },
    {
      quote:
        "The call script feature. I used it to call the extranjería. Went perfectly. I actually knew what to say for the first time.",
      name: "Arjun",
      info: "Indian professional · Valencia",
      align: "left",
    },
  ];

  return (
    <section
      ref={ref}
      id="social-proof"
      className="min-h-screen w-full bg-[#F8FAFC] text-slate-900 flex flex-col justify-center items-center py-20 px-8 border-t border-slate-200 overflow-hidden scroll-mt-28"
    >
      
      {/* Title */}
      <div className="max-w-3xl text-center mb-16 select-none animate-fadeIn">
        <span className="font-mono text-xs font-bold text-[#16A34A] uppercase tracking-widest bg-[#16A34A]/10 px-3 py-1 rounded-full">
          Testimonials
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-syne text-slate-950 mt-4 mb-4">
          Real stories. Real relief.
        </h2>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
          We asked our early users how they felt before and after using Paprs. Here&apos;s what they had to say.
        </p>
      </div>

      {/* Cards stack */}
      <div className="flex flex-col gap-6 w-full max-w-2xl select-none">
        {testimonials.map((t, idx) => {
          // Slide direction based on alignment
          const startX = t.align === "left" ? "-100px" : "100px";
          const transform = visible ? "translateX(0)" : `translateX(${startX})`;
          const opacity = visible ? 1 : 0;
          const delay = `${idx * 150}ms`;

          return (
            <div
              key={idx}
              className="bg-white border-2 border-[#16A34A]/10 hover:border-[#16A34A]/35 p-6 md:p-8 rounded-lg shadow-sm transition-all duration-700 ease-out hover:scale-[1.01]"
              style={{
                transform: transform,
                opacity: opacity,
                transitionDelay: delay,
              }}
            >
              <p className="font-sans text-base md:text-lg italic text-slate-800 leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="w-8 h-8 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/20 flex items-center justify-center text-[#16A34A]">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-syne font-bold text-sm text-slate-950">
                    {t.name}
                  </h5>
                  <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">
                    {t.info}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
