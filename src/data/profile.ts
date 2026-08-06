/**
 * src/data/profile.ts
 *
 * Dados de perfil extraídos de Hero.tsx, About.tsx e Contact.tsx.
 * Copy de apresentação específica de layout (badges, bio, headings) continua
 * nos componentes — aqui só ficam os arrays/records que já existiam como tal.
 */

import type { Lang } from "@/contexts/language";

/* ────────────── Hero: terminal de código simulado ────────────── */

export interface CodeToken {
  t: string;
  c: string;
}

export interface CodeLine {
  n: number;
  tokens: CodeToken[];
}

export const HERO_CODE: CodeLine[] = [
  { n: 1, tokens: [{ t: "const ", c: "#C678DD" }, { t: "dev", c: "#E5C07B" }, { t: " = {", c: "#ABB2BF" }] },
  { n: 2, tokens: [{ t: "  name", c: "#E06C75" }, { t: ": ", c: "#ABB2BF" }, { t: '"Luiz Mendes"', c: "#98C379" }, { t: ",", c: "#ABB2BF" }] },
  { n: 3, tokens: [{ t: "  role", c: "#E06C75" }, { t: ": ", c: "#ABB2BF" }, { t: '"Full Stack Dev"', c: "#98C379" }, { t: ",", c: "#ABB2BF" }] },
  { n: 4, tokens: [{ t: "  from", c: "#E06C75" }, { t: ": ", c: "#ABB2BF" }, { t: '"Brasil 🇧🇷"', c: "#98C379" }, { t: ",", c: "#ABB2BF" }] },
  { n: 5, tokens: [{ t: "  stack", c: "#E06C75" }, { t: ": [", c: "#ABB2BF" }] },
  { n: 6, tokens: [{ t: '    "React"', c: "#98C379" }, { t: ", ", c: "#ABB2BF" }, { t: '"Next.js"', c: "#98C379" }, { t: ",", c: "#ABB2BF" }] },
  { n: 7, tokens: [{ t: '    "Flutter"', c: "#98C379" }, { t: ", ", c: "#ABB2BF" }, { t: '"Node.js"', c: "#98C379" }, { t: ",", c: "#ABB2BF" }] },
  { n: 8, tokens: [{ t: '    ".NET"', c: "#98C379" }, { t: ", ", c: "#ABB2BF" }, { t: '"Go"', c: "#98C379" }] },
  { n: 9, tokens: [{ t: "  ],", c: "#ABB2BF" }] },
  { n: 10, tokens: [{ t: "  status", c: "#E06C75" }, { t: ": ", c: "#ABB2BF" }, { t: '"available"', c: "#14B8A6" }, { t: "  // 🟢", c: "#5C6370" }] },
  { n: 11, tokens: [{ t: "};", c: "#ABB2BF" }] },
];

export const HERO_TECH_CHIPS: string[] = [
  "React", "Next.js", "TypeScript", "Flutter", "Node.js", ".NET", "Go", "AWS", "Docker", "PostgreSQL",
];

/* ────────────── Hero: stats animados ────────────── */

export interface HeroStat {
  end: number;
  decimals: number;
  prefix: string;
  suffix: string;
  label: string;
}

export const HERO_STATS: Record<Lang, HeroStat[]> = {
  pt: [
    { end: 2, decimals: 0, prefix: "", suffix: "+", label: "Anos de experiência" },
    { end: 90, decimals: 0, prefix: "", suffix: "+", label: "Pontos de interesse mapeados" },
    { end: 2, decimals: 0, prefix: "", suffix: "", label: "Grandes clientes" },
  ],
  en: [
    { end: 2, decimals: 0, prefix: "", suffix: "+", label: "Years of experience" },
    { end: 90, decimals: 0, prefix: "", suffix: "+", label: "Points of interest mapped" },
    { end: 2, decimals: 0, prefix: "", suffix: "", label: "Major clients" },
  ],
};

/* ────────────── About: mini stats ────────────── */

export interface AboutStat {
  n: string;
  l: string;
}

export const ABOUT_STATS: Record<Lang, AboutStat[]> = {
  pt: [
    { n: "10+", l: "projetos entregues" },
    { n: "2", l: "orgs no GitHub" },
    { n: "7+", l: "stacks dominadas" },
  ],
  en: [
    { n: "10+", l: "projects delivered" },
    { n: "2", l: "GitHub orgs" },
    { n: "7+", l: "stacks mastered" },
  ],
};

/* ────────────── Contato: canais ────────────── */

export interface ContactChannel {
  id: "email" | "linkedin" | "github";
  label: string;
  handle: string;
  href: string;
  color: string;
  external: boolean;
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: "email",
    label: "Email",
    handle: "lzmendestechdev\n@gmail.com",
    href: "mailto:lzmendestechdev@gmail.com",
    color: "#0D9488",
    external: false,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "/in/lzmendess",
    href: "https://linkedin.com/in/lzmendess",
    color: "#0A66C2",
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    handle: "Lzdevmendes",
    href: "https://github.com/Lzdevmendes",
    color: "#A8B3CF",
    external: true,
  },
];

export const CV_PATH = "/cv_luizmendes.pdf";
