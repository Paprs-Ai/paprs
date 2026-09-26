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
      className="w-full bg-[#FFFFFF] py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 text-black scroll-mt-20"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-0">
        {/* Left: heading + facts */}
        <div className="flex flex-col gap-6 lg:col-span-5 lg:sticky lg:top-28 lg:self-start lg:pr-12">
          <div className="flex flex-col items-start gap-2.5">
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

            <p className="font-sans text-xs sm:text-sm text-zinc-500 font-medium max-w-md leading-relaxed">
              {dict.faq.subtitle}
            </p>
          </div>

          <div>
            <p className="mb-2.5 font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-400">
              {dict.faq.factsTitle}
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {dict.faq.facts.map((fact) => (
                <div key={fact.value + fact.label} className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-4">
                  <p className="font-syne text-3xl font-extrabold leading-none tracking-tight text-black">{fact.value}</p>
                  <p className="mt-2 font-sans text-[11px] leading-snug text-zinc-500">{fact.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: accordion */}
        <div className="lg:col-span-7 lg:flex lg:flex-col lg:justify-center lg:border-l lg:border-zinc-200 lg:pl-12">
        <div className="flex flex-col gap-2 sm:gap-2.5">
          {dict.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <article
                key={idx}
                className={`faq-item overflow-hidden rounded-xl border ${
                  isOpen
                    ? "border-black/30 bg-zinc-50/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
                    : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  id={`faq-trigger-${idx}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  className="faq-trigger flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left select-none sm:px-5 sm:py-3.5"
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
                    className={`faq-toggle flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-200 ${
                      isOpen ? "rotate-180 bg-black text-white border-black" : "bg-white text-zinc-500"
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${idx}`}
                  aria-hidden={!isOpen}
                  className={`faq-answer-shell ${isOpen ? "is-open" : ""}`}
                >
                  <div
                    className="min-h-0 overflow-hidden"
                  >
                    <div className="border-t border-zinc-200/60 px-4 pt-2 pb-3.5 font-sans text-xs leading-relaxed text-zinc-600 sm:px-5 sm:pb-4 sm:text-[13px]">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
}
