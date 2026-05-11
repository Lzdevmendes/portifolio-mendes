"use client";

import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "@/contexts/language";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>{children}</LanguageProvider>
    </MotionConfig>
  );
}
