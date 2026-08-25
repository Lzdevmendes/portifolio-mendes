"use client";

import { useEffect, useState } from "react";

/** Reflete se a aba está visível — usado pra pausar timers decorativos em background. */
export function useIsPageVisible(): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onChange = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  return visible;
}
