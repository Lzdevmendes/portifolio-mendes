/**
 * src/data/scenes.ts
 *
 * Fonte única da experiência dirigida por scroll.
 * Ranges de scroll, keyframes de câmera e copy de HUD.
 *
 * Conteúdo de negócio (experiências, projetos, skills, certificações)
 * NÃO vive aqui — vem de src/data/experience.ts, projects.ts, etc.
 */

import type { Lang } from "@/contexts/language";

/* ────────────────────────── Tipos ────────────────────────── */

export type ActId =
  | "boot"
  | "orbit"
  | "coast"
  | "mesh"
  | "corridor"
  | "bench"
  | "chip"
  | "contact";

export interface CameraKeyframe {
  /** progresso global 0..1 em que este keyframe é atingido */
  at: number;
  position: [number, number, number];
  lookAt: [number, number, number];
  /** field of view em graus */
  fov: number;
}

export interface Act {
  id: ActId;
  /** faixa de progresso global [início, fim] — 0..1 */
  range: [number, number];
  /** altura da seção DOM correspondente, em vh */
  heightVh: number;
  /** coordenadas exibidas no HUD durante o ato */
  coords: string;
  /** label mono do canto inferior direito */
  hud: Record<Lang, string>;
  /** título do ato (Syne, com scramble na entrada) */
  title: Record<Lang, string> | null;
  /** de qual módulo de dados este ato puxa conteúdo */
  source: string | null;
}

/* ─────────────────── Configuração global ─────────────────── */

export const SCROLL_CONFIG = {
  /** altura total do documento */
  totalVh: 700,
  /** fator de suavização do Lenis */
  lerp: 0.09,
  /** damp usado no CameraRig (MathUtils.damp) */
  cameraDamp: 3.2,
  /** duração da aberração cromática nas fronteiras de ato, em ms */
  transitionMs: 400,
  /** offset máximo da aberração cromática */
  aberrationMax: 0.004,
} as const;

export const COORDS_HOME = "-23.6203 / -45.4130";

/* ──────────────────────── Os 8 atos ──────────────────────── */

export const ACTS: Act[] = [
  {
    id: "boot",
    range: [0, 0],
    heightVh: 0,
    coords: "-- .---- / -- .----",
    hud: { pt: "CARREGANDO ATIVOS", en: "LOADING ASSETS" },
    title: null,
    source: null,
  },
  {
    id: "orbit",
    range: [0.0, 0.12],
    heightVh: 100,
    coords: "ORB / 408 KM",
    hud: { pt: "ÓRBITA", en: "ORBIT" },
    title: null, // o hero usa o nome, não título de ato
    source: "profile",
  },
  {
    id: "coast",
    range: [0.12, 0.26],
    heightVh: 110,
    coords: `${COORDS_HOME} · CARAGUATATUBA/SP`,
    hud: { pt: "DESCIDA", en: "DESCENT" },
    title: { pt: "Quem constrói", en: "Who builds" },
    source: "profile",
  },
  {
    id: "mesh",
    range: [0.26, 0.44],
    heightVh: 140,
    coords: `${COORDS_HOME} · MALHA ATIVA`,
    hud: { pt: "MALHA", en: "MESH" },
    title: { pt: "Onde rodou em produção", en: "Where it ran in production" },
    source: "experience",
  },
  {
    id: "corridor",
    range: [0.44, 0.58],
    heightVh: 110,
    coords: "RACK 01–07 / ONLINE",
    hud: { pt: "CORREDOR", en: "CORRIDOR" },
    title: { pt: "O que está instalado", en: "What is installed" },
    source: "skills",
  },
  {
    id: "bench",
    range: [0.58, 0.84],
    heightVh: 180,
    coords: "BANCADA / LMBOOK-14",
    hud: { pt: "BANCADA", en: "BENCH" },
    title: { pt: "Projetos", en: "Projects" },
    source: "projects",
  },
  {
    id: "chip",
    range: [0.84, 0.96],
    heightVh: 90,
    coords: "LM-01 / REV. 2026",
    hud: { pt: "FICHA TÉCNICA", en: "DATASHEET" },
    title: { pt: "LM-01", en: "LM-01" },
    source: "certifications",
  },
  {
    id: "contact",
    range: [0.96, 1.0],
    heightVh: 70,
    coords: COORDS_HOME,
    hud: { pt: "CANAL ABERTO", en: "CHANNEL OPEN" },
    title: { pt: "Vamos conversar", en: "Let's talk" },
    source: "profile",
  },
];

/* ─────────────── Trilha de câmera (Ato 1 → 7) ─────────────── */
/* Unidades em metros. O CameraRig interpola entre keyframes    */
/* com MathUtils.damp lendo o progresso global do scrollStore.  */

export const CAMERA_PATH: CameraKeyframe[] = [
  // ÓRBITA — longe, olhando a curvatura da Terra
  { at: 0.00, position: [0, 1.2, 14], lookAt: [0, 0, 0], fov: 42 },
  { at: 0.12, position: [0, 0.4, 7.5], lookAt: [0, -0.6, 0], fov: 48 },

  // DESCIDA — mergulho na atmosfera até o mapa de relevo
  { at: 0.19, position: [0, 3.2, 4.0], lookAt: [0, 0, -1], fov: 55 },
  { at: 0.26, position: [0, 1.6, 2.2], lookAt: [0, 0, -1.5], fov: 50 },

  // MALHA — três nós, um por contrato
  { at: 0.31, position: [-2.4, 1.0, 3.2], lookAt: [-2.4, 0, 0], fov: 44 },
  { at: 0.37, position: [0.0, 1.0, 3.2], lookAt: [0.0, 0, 0], fov: 44 },
  { at: 0.44, position: [2.4, 1.0, 3.2], lookAt: [2.4, 0, 0], fov: 44 },

  // CORREDOR — dolly físico entre os racks
  { at: 0.48, position: [0, 1.5, 9.0], lookAt: [0, 1.4, 0], fov: 52 },
  { at: 0.58, position: [0, 1.5, -3.0], lookAt: [0, 1.4, -12], fov: 52 },

  // BANCADA — pouso no notebook, aproxima na tela
  { at: 0.62, position: [0, 1.1, 3.4], lookAt: [0, 0.35, 0], fov: 40 },
  { at: 0.70, position: [0, 0.75, 2.2], lookAt: [0, 0.40, 0], fov: 36 },
  { at: 0.84, position: [0, 0.62, 1.5], lookAt: [0, 0.42, 0], fov: 32 },

  // CHIP — macro no wafer
  { at: 0.90, position: [0, 0.15, 0.65], lookAt: [0, 0.05, 0], fov: 28 },
  { at: 0.96, position: [0, 0.10, 0.40], lookAt: [0, 0.05, 0], fov: 26 },

  // CONTATO — recuo para o void
  { at: 1.00, position: [0, 0.6, 6.0], lookAt: [0, 0, 0], fov: 45 },
];

/* ─────────────── Abertura da tampa do LMBook ─────────────── */
/* Mapeia progresso do ato "bench" (0..1) para o ângulo da     */
/* dobradiça em radianos. 0 = fechado, ~1.83 rad = 105°.       */

export const LID_CURVE: Array<{ t: number; rad: number }> = [
  { t: 0.00, rad: 0.00 },
  { t: 0.18, rad: 0.35 },
  { t: 0.34, rad: 1.45 },
  { t: 0.42, rad: 1.83 }, // 105° — travado a partir daqui
  { t: 1.00, rad: 1.83 },
];

/** progresso do ato "bench" em que a tela liga (flicker curto) */
export const SCREEN_POWER_ON_AT = 0.38;

/* ────────────────────── Copy do HUD ─────────────────────── */

export const HUD_COPY: Record<Lang, Record<string, string>> = {
  pt: {
    bootBrand: "PORTFOLIO.LM",
    bootStatus: "CARREGANDO ATIVOS",
    bootAudio: "RECOMENDADO: FONES DE OUVIDO",
    heroBadge: "DISPONÍVEL PARA TRABALHO",
    heroRole: "DESENVOLVEDOR FULL STACK",
    heroCta: "INICIAR",
    scrollHint: "ROLE PARA NAVEGAR",
    audioOn: "ÁUDIO ON",
    audioOff: "ÁUDIO OFF",
    skipLink: "Pular para o conteúdo",
    cursorOpen: "ABRIR",
    cursorDrag: "ARRASTAR",
    cursorCopy: "COPIAR",
    cvDownload: "BAIXAR CV",
    prevProject: "ANTERIOR",
    nextProject: "PRÓXIMO",
  },
  en: {
    bootBrand: "PORTFOLIO.LM",
    bootStatus: "LOADING ASSETS",
    bootAudio: "RECOMMENDED: HEADPHONES",
    heroBadge: "OPEN TO WORK",
    heroRole: "FULL STACK DEVELOPER",
    heroCta: "START",
    scrollHint: "SCROLL TO NAVIGATE",
    audioOn: "AUDIO ON",
    audioOff: "AUDIO OFF",
    skipLink: "Skip to content",
    cursorOpen: "OPEN",
    cursorDrag: "DRAG",
    cursorCopy: "COPY",
    cvDownload: "DOWNLOAD CV",
    prevProject: "PREVIOUS",
    nextProject: "NEXT",
  },
};

/* ──────────── Ficha técnica LM-01 (Ato 6) ──────────── */
/* Preencher os valores a partir de src/data/skills.ts e     */
/* src/data/profile.ts — não duplicar strings de stack aqui. */

export interface DatasheetRow {
  key: Record<Lang, string>;
  /** id da categoria em skills.ts, ou valor literal para dados de perfil */
  from: { type: "skills"; category: string } | { type: "literal"; value: string };
}

export const DATASHEET: DatasheetRow[] = [
  { key: { pt: "ARQUITETURA", en: "ARCHITECTURE" }, from: { type: "skills", category: "architecture" } },
  { key: { pt: "RUNTIME", en: "RUNTIME" }, from: { type: "skills", category: "backend" } },
  { key: { pt: "INTERFACE", en: "INTERFACE" }, from: { type: "skills", category: "frontend" } },
  { key: { pt: "PERSISTÊNCIA", en: "PERSISTENCE" }, from: { type: "skills", category: "database" } },
  { key: { pt: "INFRAESTRUTURA", en: "INFRASTRUCTURE" }, from: { type: "skills", category: "devops" } },
  { key: { pt: "CLIENTES", en: "CLIENTS" }, from: { type: "literal", value: "SABESP · PETROBRAS" } },
  { key: { pt: "LOCALIZAÇÃO", en: "LOCATION" }, from: { type: "literal", value: COORDS_HOME } },
];

/* ───────────────────── Utilitários ───────────────────── */

/** progresso global → progresso local do ato (0..1, com clamp) */
export function actProgress(global: number, act: Act): number {
  const [start, end] = act.range;
  if (end === start) return 0;
  return Math.min(1, Math.max(0, (global - start) / (end - start)));
}

/** ato ativo para um dado progresso global */
export function activeAct(global: number): Act {
  return (
    ACTS.find((a) => global >= a.range[0] && global < a.range[1]) ??
    ACTS[ACTS.length - 1]
  );
}

/** true quando estamos dentro da janela de transição entre atos */
export function isTransitioning(global: number, windowSize = 0.012): boolean {
  return ACTS.some(
    (a) => Math.abs(global - a.range[0]) < windowSize && a.range[0] > 0,
  );
}
