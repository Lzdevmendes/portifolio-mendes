"use client";

import { useEffect, useState } from "react";

type ObserverConfig = { rootMargin?: string; threshold?: number | number[] };

/**
 * Observa um conjunto de ids de elemento e mantém um Set com os que estão
 * atualmente intersectando, segundo o rootMargin/threshold dados.
 */
export function useIntersectingIds(ids: readonly string[], config: ObserverConfig): Set<string> {
  const [intersecting, setIntersecting] = useState<Set<string>>(new Set());
  const idsKey = ids.join(",");
  const thresholdKey = JSON.stringify(config.threshold);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setIntersecting((prev) => {
        const next = new Set(prev);
        entries.forEach((e) => {
          if (e.isIntersecting) next.add(e.target.id);
          else next.delete(e.target.id);
        });
        return next;
      });
    }, config);

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey, config.rootMargin, thresholdKey]);

  return intersecting;
}

/**
 * Retorna o id, dentre os observados, com maior intersectionRatio no
 * momento (ou `initial` se nada estiver intersectando ainda).
 */
export function useMostVisibleId(ids: readonly string[], initial: string, config: ObserverConfig): string {
  const [active, setActive] = useState(initial);
  const idsKey = ids.join(",");

  useEffect(() => {
    if (ids.length === 0) return;
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length > 0) setActive(visible[0].target.id);
    }, config);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  return active;
}
