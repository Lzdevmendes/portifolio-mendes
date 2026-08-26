/**
 * src/data/certifications.ts
 *
 * Certificações e formação, extraídas de Certifications.tsx.
 */

import type { Lang } from "@/contexts/language";

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
  color: string;
  tag: string;
}

export const CERTIFICATIONS: Record<Lang, Certification[]> = {
  pt: [
    {
      id: "ifsp-tecnico",
      title: "Técnico em Informática",
      issuer: "IFSP — Campus Caraguatatuba",
      date: "2019 – 2021",
      skills: ["Redes", "Banco de Dados", "Infraestrutura de TI", "Sistemas"],
      color: "#06B6D4",
      tag: "Técnico",
    },
    {
      id: "dio-react",
      title: "React Developer",
      issuer: "DIO",
      date: "2024",
      credentialUrl: "https://www.dio.me",
      skills: ["React", "Hooks", "State Management", "APIs"],
      color: "#0D9488",
      tag: "Frontend",
    },
    {
      id: "dio-python",
      title: "PRO Python Developer",
      issuer: "DIO",
      date: "2025",
      credentialUrl: "https://www.dio.me",
      skills: ["Python", "Flask", "Django", "Pandas", "PyMongo"],
      color: "#3B82F6",
      tag: "Backend",
    },
    {
      id: "universia-ia",
      title: "Introdução aos Fundamentos de IA Generativa",
      issuer: "Universia / DIO",
      date: "Set. 2025",
      credentialUrl: "https://www.dio.me",
      skills: ["IA Generativa"],
      color: "#8B5CF6",
      tag: "IA",
    },
    {
      id: "anhanguera-ads",
      title: "Análise e Desenvolvimento de Sistemas",
      issuer: "Anhanguera",
      date: "2026 — Em andamento",
      skills: ["Análise de Sistemas", "Desenvolvimento", "Em andamento"],
      color: "#F59E0B",
      tag: "Graduação",
    },
  ],
  en: [
    {
      id: "ifsp-tecnico",
      title: "IT Technician",
      issuer: "IFSP — Caraguatatuba Campus",
      date: "2019 – 2021",
      skills: ["Networking", "Databases", "IT Infrastructure", "Systems"],
      color: "#06B6D4",
      tag: "Technical",
    },
    {
      id: "dio-react",
      title: "React Developer",
      issuer: "DIO",
      date: "2024",
      credentialUrl: "https://www.dio.me",
      skills: ["React", "Hooks", "State Management", "APIs"],
      color: "#0D9488",
      tag: "Frontend",
    },
    {
      id: "dio-python",
      title: "PRO Python Developer",
      issuer: "DIO",
      date: "2025",
      credentialUrl: "https://www.dio.me",
      skills: ["Python", "Flask", "Django", "Pandas", "PyMongo"],
      color: "#3B82F6",
      tag: "Backend",
    },
    {
      id: "universia-ia",
      title: "Introduction to Generative AI Fundamentals",
      issuer: "Universia / DIO",
      date: "Sep 2025",
      credentialUrl: "https://www.dio.me",
      skills: ["Generative AI"],
      color: "#8B5CF6",
      tag: "AI",
    },
    {
      id: "anhanguera-ads",
      title: "Systems Analysis and Development",
      issuer: "Anhanguera",
      date: "2026 — Ongoing",
      skills: ["Systems Analysis", "Development", "Ongoing"],
      color: "#F59E0B",
      tag: "Degree",
    },
  ],
};
