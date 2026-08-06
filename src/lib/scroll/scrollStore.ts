/**
 * Progresso de scroll global, em ref (sem setState) — consumido dentro de
 * useFrame (cena 3D) e por HUD que escreve direto no DOM. Ver agent/CONTEXT.md
 * regra de performance: zero setState em loop de scroll/frame.
 */

export type ScrollListener = (progress: number) => void;

const store = { current: 0 };
const listeners = new Set<ScrollListener>();

/** Escrito pelo LenisProvider (ou pelo fallback de scroll nativo) a cada tick. */
export function setProgress(value: number): void {
  store.current = value;
  listeners.forEach((fn) => fn(value));
}

/** Progresso global 0..1. Ler dentro de useFrame/RAF, nunca guardar em state. */
export function getProgress(): number {
  return store.current;
}

/** Callback chamado a cada tick de scroll. Retorna a função de unsubscribe. */
export function subscribe(fn: ScrollListener): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
