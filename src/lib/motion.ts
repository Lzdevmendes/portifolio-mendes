/**
 * Motion tokens compartilhados entre Framer Motion e GSAP.
 * Mesma curva, mesmo tempo, duas libs — é isso que cria assinatura visual
 * em vez de parecer "três libs coladas". Ver agent/CONTEXT.md §14.
 */

export const DURATION = {
  instant: 0.15,
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
  reveal: 1.2,
} as const;

/** Framer Motion consome como array [x1, y1, x2, y2] */
export const EASE = {
  out: [0.16, 1, 0.32, 1],
  inOut: [0.65, 0, 0.35, 1],
  spring: [0.34, 1.56, 0.64, 1],
} as const;

/** GSAP consome como string cubic-bezier */
export const GSAP_EASE = {
  out: "cubic-bezier(0.16, 1, 0.32, 1)",
  inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

export const STAGGER = {
  tight: 0.02,
  base: 0.06,
  loose: 0.12,
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
