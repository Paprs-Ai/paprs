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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedLang = window.localStorage.getItem(STORAGE_KEY) as Language | null;
      if (savedLang && (savedLang === "en" || savedLang === "es" || savedLang === "ca")) {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
      } else {
        const browserLang = navigator.language?.toLowerCase() || "";
        if (browserLang.startsWith("ca")) {
          setLanguageState("ca");
          document.documentElement.lang = "ca";
        } else if (browserLang.startsWith("es")) {
          setLanguageState("es");
          document.documentElement.lang = "es";
        } else {
          setLanguageState("en");
          document.documentElement.lang = "en";
        }
      }
    } catch {
      // Ignore localStorage errors (e.g. incognito)
    }
    setMounted(true);
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
