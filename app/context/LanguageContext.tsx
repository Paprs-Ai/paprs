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

function isLang(v: string | null | undefined): v is Language {
  return v === "en" || v === "es" || v === "ca";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search).get("lang");
      const saved = window.localStorage.getItem(STORAGE_KEY);
      let next: Language = "en";
      if (isLang(q)) {
        next = q;
      } else if (isLang(saved)) {
        next = saved;
      } else {
        const browserLang = navigator.language?.toLowerCase() || "";
        if (browserLang.startsWith("ca")) next = "ca";
        else if (browserLang.startsWith("es")) next = "es";
      }
      setLanguageState(next);
      document.documentElement.lang = next;
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore localStorage errors (e.g. incognito)
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
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
