/**
 * src/data/certifications.ts
 *
 * Certificações e formação, extraídas de Certifications.tsx.
 */

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
  color: string;
  tag: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Técnico em Informática",
    issuer: "IFSP — Campus Caraguatatuba",
    date: "2019 – 2021",
    skills: ["Redes", "Banco de Dados", "Infraestrutura de TI", "Sistemas"],
    color: "#06B6D4",
    tag: "Técnico",
  },
  {
    title: "React Developer",
    issuer: "DIO",
    date: "2024",
    credentialUrl: "https://www.dio.me",
    skills: ["React", "Hooks", "State Management", "APIs"],
    color: "#0D9488",
    tag: "Frontend",
  },
  {
    title: "PRO Python Developer",
    issuer: "DIO",
    date: "2025",
    credentialUrl: "https://www.dio.me",
    skills: ["Python", "Flask", "Django", "Pandas", "PyMongo"],
    color: "#3B82F6",
    tag: "Backend",
  },
  {
    title: "Introdução aos Fundamentos de IA Generativa",
    issuer: "Universia / DIO",
    date: "Set. 2025",
    credentialUrl: "https://www.dio.me",
    skills: ["IA Generativa"],
    color: "#8B5CF6",
    tag: "IA",
  },
  {
    title: "Análise e Desenvolvimento de Sistemas",
    issuer: "Anhanguera",
    date: "2026 — Em andamento",
    skills: ["Análise de Sistemas", "Desenvolvimento", "Em andamento"],
    color: "#F59E0B",
    tag: "Graduação",
  },
];
