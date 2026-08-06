"use client";

import { useEffect, useRef } from "react";
import LenisProvider from "@/lib/scroll/LenisProvider";
import { subscribe, getProgress } from "@/lib/scroll/scrollStore";
import { SCROLL_CONFIG } from "@/data/scenes";

/**
 * Sandbox de desenvolvimento — não linkado em lugar nenhum. Cresce junto com
 * as Fases 1-7 do rebuild scroll-3D (ver agent/scroll-experience-spec/) e é
 * removido na Fase 8, quando page.tsx troca <Maintenance/> por <Experience/>.
 */
export default function DevExperiencePage() {
  const sections = Array.from({ length: 7 }, (_, i) => i);

  return (
    <LenisProvider>
      <ProgressHUD />
      <main>
        {sections.map((i) => (
          <section
            key={i}
            style={{
              height: `${SCROLL_CONFIG.totalVh / sections.length}vh`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "monospace",
              fontSize: 28,
              color: "#E6EDF0",
              background: i % 2 === 0 ? "#05070A" : "#0C1116",
              borderBottom: "1px solid #1B242C",
            }}
          >
            /dev-experience — bloco {i + 1}/{sections.length}
          </section>
        ))}
      </main>
    </LenisProvider>
  );
}

function ProgressHUD() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const write = (p: number) => {
      el.textContent = `${(p * 100).toFixed(1)}%`;
    };
    write(getProgress());
    return subscribe(write);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 9999,
        padding: "8px 14px",
        borderRadius: 8,
        background: "rgba(0,0,0,0.7)",
        color: "#5EEAD4",
        fontFamily: "monospace",
        fontSize: 14,
        letterSpacing: "0.05em",
        pointerEvents: "none",
      }}
    >
      0.0%
    </div>
  );
}
