/**
 * src/data/projects.ts
 *
 * Projetos em destaque, extraídos de ProjectsShowcase.tsx.
 *
 * O projeto "Multiclínica" foi removido em 2026-08-04 (decisão do dono) — não
 * tinha correspondente em src/data/experience.ts (não consta no CV atual).
 */

import type { Lang } from "@/contexts/language";

export interface Project {
  num: string;
  client: string;
  title: string;
  description: string;
  stack: string[];
  github: string;
  live: string | null;
  accent: string;
  image?: string | null;
  video?: string | null;
}

export const PROJECTS: Record<Lang, Project[]> = {
  pt: [
    {
      num: "01",
      client: "Obracon × Sabesp",
      title: "Sistema de Inspeção de Infraestrutura",
      description:
        "Gestão de infraestrutura hídrica para a Sabesp com módulos de checklist para inspeção em campo, integração com APIs de geolocalização e IoT. Arquitetura escalável com entrega end-to-end em ambiente de alta disponibilidade.",
      stack: ["Node.js", "React", ".NET", "PostgreSQL", "Docker", "Azure"],
      github: "https://github.com/Lzdevmendes",
      live: null,
      accent: "#6366F1",
      image: null,
      video: null,
    },
    {
      num: "02",
      client: "GCB × Petrobras",
      title: "Gestão Operacional Offshore",
      description:
        "Sistemas internos de gestão operacional para unidades offshore da Petrobras. Relatórios de produção em tempo real, otimização de queries SQL com 60% de redução no tempo de resposta e pipeline CI/CD com Azure DevOps.",
      stack: [".NET", "React", "SQL Server", "C#", "Azure DevOps"],
      github: "https://github.com/Lzdevmendes",
      live: null,
      accent: "#F59E0B",
      image: null,
      video: null,
    },
  ],
  en: [
    {
      num: "01",
      client: "Obracon × Sabesp",
      title: "Water Infrastructure Inspection System",
      description:
        "Water infrastructure management system for Sabesp with field inspection checklists, geolocation and IoT API integrations. Scalable architecture with end-to-end feature delivery in high-availability environment.",
      stack: ["Node.js", "React", ".NET", "PostgreSQL", "Docker", "Azure"],
      github: "https://github.com/Lzdevmendes",
      live: null,
      accent: "#6366F1",
      image: null,
      video: null,
    },
    {
      num: "02",
      client: "GCB × Petrobras",
      title: "Offshore Operations Management",
      description:
        "Internal operational management systems for Petrobras offshore units. Real-time production reports, SQL query optimization with 60% reduction in response time, and complete CI/CD pipeline with Azure DevOps.",
      stack: [".NET", "React", "SQL Server", "C#", "Azure DevOps"],
      github: "https://github.com/Lzdevmendes",
      live: null,
      accent: "#F59E0B",
      image: null,
      video: null,
    },
  ],
};
