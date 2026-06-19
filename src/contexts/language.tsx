"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "pt" | "en";

interface LanguageCtx {
  lang: Lang;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageCtx>({ lang: "pt", toggle: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-lang") as Lang | null;
    // Lê a preferência salva só no cliente (evita mismatch de hidratação).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "en" || saved === "pt") setLang(saved);
  }, []);

  function toggle() {
    setLang((prev) => {
      const next: Lang = prev === "pt" ? "en" : "pt";
      localStorage.setItem("portfolio-lang", next);
      return next;
    });
  }

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
