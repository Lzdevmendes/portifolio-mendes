"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import { LanguageProvider } from "@/contexts/language";

/**
 * `strict` faz o build quebrar se algum componente usar `motion.div` em vez de
 * `m.div` — força todo mundo a passar pelo bundle enxuto do LazyMotion
 * (~15kb gzipped em vez de ~34kb). Ver agent/CONTEXT.md §14 (Arquitetura de animação).
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <LanguageProvider>{children}</LanguageProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
