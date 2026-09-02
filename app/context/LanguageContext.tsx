"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Language, Translations } from "../i18n/language.types";
import { translations } from "../i18n/translations";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  dict: Translations;
}

const STORAGE_KEY = "paprs_landing_language";

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
  dict: translations.en,
});

function mapToSupported(raw: string | null | undefined): Language {
  const v = (raw || "").toLowerCase();
  if (v === "ca" || v.startsWith("ca") || v === "es" || v.startsWith("es")) return "es";
  if (v === "en" || v.startsWith("en")) return "en";
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const savedLang = window.localStorage.getItem(STORAGE_KEY);
      let next: Language = "en";
      if (savedLang === "en" || savedLang === "es" || savedLang === "ca") {
        next = savedLang === "ca" ? "es" : savedLang;
      } else {
        next = mapToSupported(navigator.language);
      }
      setLanguageState(next);
      document.documentElement.lang = next;
      if (savedLang === "ca") {
        window.localStorage.setItem(STORAGE_KEY, "es");
      }
    } catch {
      // Ignore localStorage errors (e.g. incognito)
    }
  }, []);

  const setLanguage = (lang: Language) => {
    const next: Language = lang === "ca" ? "es" : lang;
    setLanguageState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
    } catch {
      // Ignore storage errors
    }
  };

  const dict = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
