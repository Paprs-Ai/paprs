"use client";

import React, { useState } from "react";
import { ChevronDown, BookOpen } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function BureaucracyFAQ() {
  const { dict } = useLanguage();
  // All closed by default
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    // Opening one automatically closes any other open item
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="w-full bg-[#FFFFFF] py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 text-black border-t border-zinc-200 scroll-mt-20"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Header — Compact & High-Impact */}
        <div className="flex flex-col items-center text-center gap-2.5 mb-8 md:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/10 bg-zinc-100 font-mono text-[9px] font-bold uppercase tracking-widest text-black">
            <BookOpen className="w-3 h-3" aria-hidden="true" />
            {dict.faq.badge}
          </div>

          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-syne tracking-tight leading-tight text-black whitespace-pre-line"
          >
            {dict.faq.title}
          </h2>

          <p className="font-sans text-xs sm:text-sm text-zinc-500 font-medium max-w-lg leading-relaxed">
            {dict.faq.subtitle}
          </p>
        </div>

        {/* FAQ Accordion List — Compact Stack */}
        <div className="flex flex-col gap-2 sm:gap-2.5">
          {dict.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <article
                key={idx}
                className={`rounded-xl border transition-all duration-150 overflow-hidden ${
                  isOpen
                    ? "border-black/30 bg-zinc-50/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
                    : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full px-4 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between gap-3 text-left cursor-pointer select-none"
                >
                  <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-zinc-600">
                      {item.tag}
                    </span>
                    <h3 className="font-syne font-bold text-xs sm:text-sm md:text-[15px] text-black leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  <div
                    className={`shrink-0 w-6 h-6 rounded-full border border-zinc-200 flex items-center justify-center transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-black text-white border-black" : "bg-white text-zinc-500"
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    className="px-4 pb-3.5 pt-2 sm:px-5 sm:pb-4 text-zinc-600 font-sans text-xs sm:text-[13px] leading-relaxed border-t border-zinc-200/60"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
