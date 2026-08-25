"use client";

import { useEffect, useState } from "react";

/**
 * Assina um media query via matchMedia (sem polling de resize). Retorna
 * `false` até o efeito rodar no client — evita mismatch de hidratação.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}
