/**
 * src/data/experience.ts
 *
 * Experiências profissionais, extraídas de Experience.tsx.
 * Fonte de verdade: CV em /home/luiz/Documentos/cv_luizmendes.pdf (== public/cv_luizmendes.pdf).
 */

import type { Lang } from "@/contexts/language";

export interface Experience {
  period: string;
  current: boolean;
  role: string;
  company: string;
  client?: string;
  description: string;
  stack: string[];
  highlights: string[];
}

export const EXPERIENCES: Record<Lang, Experience[]> = {
  pt: [
    {
      period: "Fev. 2024 — Mai. 2024",
      current: false,
      role: "Desenvolvedor Backend Jr",
      company: "GCB Manutenção",
      client: "Petrobras",
      description: "Desenvolvimento e manutenção de serviços backend para apoio a sistemas internos, com APIs RESTful multi-stack e integração com dados geográficos (GIS).",
      stack: ["C#", ".NET", "Java (Spring Boot)", "Python (FastAPI)", "PostgreSQL", "Docker"],
      highlights: [
        "APIs RESTful com .NET (C#), Spring Boot (Java) e FastAPI (Python)",
        "Integração entre sistemas legados e novos, com módulo GIS para dados geográficos",
        "Deploy automatizado com Docker e versionamento via GitFlow",
      ],
    },
    {
      period: "Dez. 2024 — mudança de função",
      current: false,
      role: "Técnico de Suporte de TI",
      company: "Obracon Engenharia",
      client: "Sabesp",
      description: "Atendimento e suporte à infraestrutura de TI corporativa — redes, servidores Windows e gestão de chamados, antes da transição interna para a vaga de desenvolvimento.",
      stack: ["Windows Server", "Active Directory", "TCP/IP / VPN", "Zabbix", "GLPI"],
      highlights: [
        "Suporte a hardware, redes (TCP/IP, DHCP, DNS, VPN) e servidores Windows",
        "Monitoramento com Zabbix e gestão de chamados via GLPI",
        "Rotinas de backup (Veeam), Active Directory, Office 365 e suporte remoto",
      ],
    },
    {
      period: "Mar. 2025 — Mar. 2026",
      current: false,
      role: "Desenvolvedor Full Stack",
      company: "Obracon Engenharia",
      client: "Sabesp",
      description: "Liderança técnica do sistema web e mobile de gestão de checklists de veículos da Sabesp, com arquitetura de microsserviços e geolocalização em tempo real.",
      stack: ["React 18", "Node.js", "Golang", "Flutter", "MySQL", "Docker"],
      highlights: [
        "Liderança técnica do sistema web (React 18) e mobile (Flutter/Dart) de checklists, com GIS para geolocalização de veículos",
        "Microsserviços de alta performance em Golang e Node.js/Express com JWT",
        "20+ endpoints com validação (Zod), segurança (Helmet/CORS) e testes com cobertura superior a 70%",
      ],
    },
    {
      period: "Jul. 2025 — Presente",
      current: true,
      role: "Fundador & Desenvolvedor Full Stack",
      company: "Litoral na Palma",
      description: "Projeto pessoal: app mobile de informações em tempo real para o Litoral Norte de São Paulo (Caraguatatuba, Ubatuba, São Sebastião e Ilhabela), da concepção do produto à arquitetura técnica.",
      stack: ["React Native", "Expo", "TypeScript", "Supabase", "GIS"],
      highlights: [
        "Idealização e liderança do produto como fundador, da concepção ao roadmap técnico",
        "App mobile com React Native (Expo, New Architecture) e Supabase (Auth via OTP, Row Level Security, Edge Functions)",
        "GIS com geolocalização em tempo real, geofencing e mapas interativos, +90 pontos de interesse, suporte a 6 idiomas e 121 testes automatizados",
      ],
    },
  ],
  en: [
    {
      period: "Feb. 2024 — May 2024",
      current: false,
      role: "Backend Developer Jr",
      company: "GCB Manutenção",
      client: "Petrobras",
      description: "Development and maintenance of backend services supporting internal systems, with multi-stack RESTful APIs and geographic data (GIS) integration.",
      stack: ["C#", ".NET", "Java (Spring Boot)", "Python (FastAPI)", "PostgreSQL", "Docker"],
      highlights: [
        "RESTful APIs with .NET (C#), Spring Boot (Java) and FastAPI (Python)",
        "Integration between legacy and new systems, with a GIS module for geographic data",
        "Automated Docker deployment and version control via GitFlow",
      ],
    },
    {
      period: "Dec. 2024 — role change",
      current: false,
      role: "IT Support Technician",
      company: "Obracon Engenharia",
      client: "Sabesp",
      description: "Corporate IT infrastructure support — networking, Windows servers and ticket management, before an internal transition into the development role.",
      stack: ["Windows Server", "Active Directory", "TCP/IP / VPN", "Zabbix", "GLPI"],
      highlights: [
        "Hardware, network (TCP/IP, DHCP, DNS, VPN) and Windows server support",
        "Monitoring with Zabbix and ticket management via GLPI",
        "Backup routines (Veeam), Active Directory, Office 365 and remote support",
      ],
    },
    {
      period: "Mar. 2025 — Mar. 2026",
      current: false,
      role: "Full Stack Developer",
      company: "Obracon Engenharia",
      client: "Sabesp",
      description: "Technical lead for Sabesp's vehicle checklist web and mobile system, with a microservices architecture and real-time geolocation.",
      stack: ["React 18", "Node.js", "Golang", "Flutter", "MySQL", "Docker"],
      highlights: [
        "Technical lead for the web (React 18) and mobile (Flutter/Dart) checklist system, with GIS for vehicle geolocation",
        "High-performance microservices in Golang and Node.js/Express with JWT",
        "20+ endpoints with validation (Zod), security (Helmet/CORS) and test coverage above 70%",
      ],
    },
    {
      period: "Jul. 2025 — Present",
      current: true,
      role: "Founder & Full Stack Developer",
      company: "Litoral na Palma",
      description: "Personal project: real-time information mobile app for São Paulo's North Coast (Caraguatatuba, Ubatuba, São Sebastião and Ilhabela), from product concept to technical architecture.",
      stack: ["React Native", "Expo", "TypeScript", "Supabase", "GIS"],
      highlights: [
        "Product ideation and leadership as founder, from concept to technical roadmap",
        "Mobile app with React Native (Expo, New Architecture) and Supabase (OTP auth, Row Level Security, Edge Functions)",
        "GIS with real-time geolocation, geofencing and interactive maps, 90+ points of interest, 6-language support and 121 automated tests",
      ],
    },
  ],
};
