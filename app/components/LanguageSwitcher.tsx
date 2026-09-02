"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Language } from "../i18n/language.types";

const LANGUAGES: { code: Language; label: string; title: string }[] = [
  { code: "en", label: "EN", title: "English" },
  { code: "es", label: "ES", title: "Español" },
];

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full border border-black/15 bg-zinc-100/90 p-0.5 shadow-2xs ${className}`}
      role="group"
      aria-label="Language selection"
    >
      {LANGUAGES.map((lang) => {
        const isActive = language === lang.code || (lang.code === "es" && language === "ca");
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            aria-pressed={isActive}
            title={lang.title}
            className={`cursor-pointer rounded-full px-1.5 sm:px-2 py-0.5 font-mono text-[8px] sm:text-[9px] font-bold tracking-wider transition-all duration-200 apple-press select-none ${
              isActive
                ? "bg-black text-white shadow-xs"
                : "text-zinc-500 hover:text-black hover:bg-black/5"
            }`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
