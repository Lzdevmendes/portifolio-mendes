/**
 * src/data/skills.ts
 *
 * Categorias de skills, URLs de documentação e tech strip em destaque,
 * extraídos de Skills.tsx.
 */

import type { Lang } from "@/contexts/language";

export const SKILL_URLS: Record<string, string> = {
  // Frontend
  React: "https://react.dev",
  "Next.js": "https://nextjs.org",
  TypeScript: "https://www.typescriptlang.org",
  JavaScript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  Flutter: "https://flutter.dev",
  "React Native": "https://reactnative.dev",
  "Tailwind CSS": "https://tailwindcss.com",
  "shadcn/ui": "https://ui.shadcn.com",
  "Framer Motion": "https://www.framer.com/motion",
  "HTML & CSS": "https://developer.mozilla.org/en-US/docs/Web/HTML",
  Zustand: "https://zustand-demo.pmnd.rs",
  "Context API": "https://react.dev/reference/react/useContext",
  Zod: "https://zod.dev",
  // Backend
  "Node.js": "https://nodejs.org",
  NestJS: "https://nestjs.com",
  Express: "https://expressjs.com",
  ".NET / C#": "https://dotnet.microsoft.com",
  Go: "https://go.dev",
  "Java / Spring": "https://spring.io",
  Python: "https://www.python.org",
  "Flask / FastAPI": "https://fastapi.tiangolo.com",
  "REST & GraphQL": "https://graphql.org",
  JWT: "https://jwt.io",
  OAuth2: "https://oauth.net/2",
  // Banco de Dados
  PostgreSQL: "https://www.postgresql.org",
  "SQL Server": "https://www.microsoft.com/sql-server",
  MongoDB: "https://www.mongodb.com",
  SQLite: "https://www.sqlite.org",
  Redis: "https://redis.io",
  "Prisma ORM": "https://www.prisma.io",
  SQLAlchemy: "https://www.sqlalchemy.org",
  TypeORM: "https://typeorm.io",
  Firebase: "https://firebase.google.com",
  Supabase: "https://supabase.com",
  Migrations: "https://www.prisma.io/docs/orm/prisma-migrate",
  // Testes
  Jest: "https://jestjs.io",
  Vitest: "https://vitest.dev",
  Pytest: "https://docs.pytest.org",
  "React Testing Library": "https://testing-library.com/react",
  Cypress: "https://www.cypress.io",
  Supertest: "https://github.com/ladjs/supertest",
  // DevOps & Cloud
  Docker: "https://www.docker.com",
  AWS: "https://aws.amazon.com",
  Azure: "https://azure.microsoft.com",
  Vercel: "https://vercel.com",
  "CI/CD": "https://github.com/features/actions",
  "GitHub Actions": "https://github.com/features/actions",
  Linux: "https://www.linux.org",
  Nginx: "https://nginx.org",
  Git: "https://git-scm.com",
  GitFlow: "https://nvie.com/posts/a-successful-git-branching-model/",
  "Automation & Bots": "https://github.com/Lzdevmendes",
  // Architecture
  Microservices: "https://microservices.io",
  "Clean Architecture":
    "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html",
  DDD: "https://martinfowler.com/tags/domain%20driven%20design.html",
  "Event-Driven": "https://aws.amazon.com/event-driven-architecture",
  SOLID: "https://en.wikipedia.org/wiki/SOLID",
  Monorepos: "https://nx.dev",
  "API Gateway": "https://www.nginx.com/resources/glossary/api-gateway",
  "Scrum/Kanban": "https://www.atlassian.com/agile/scrum",
  // Design
  Figma: "https://www.figma.com",
  "Design Systems": "https://www.figma.com/design-systems/",
  Wireframing: "https://www.figma.com/wireframing/",
  Prototyping: "https://www.figma.com/prototyping/",
  "User Research": "https://www.nngroup.com",
  "Responsive Design": "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design",
};

export interface SkillCategory {
  key: string;
  label: string;
  tag: string;
  color: string;
  skills: readonly string[];
}

export const CATEGORIES_BASE = [
  { key: "frontend",  tag: "UI / UX",     color: "#6366F1", skills: ["React","Next.js","TypeScript","JavaScript","Flutter","React Native","Tailwind CSS","shadcn/ui","Framer Motion","HTML & CSS","Zustand","Context API","Zod"] },
  { key: "backend",   tag: "Server / API", color: "#0D9488", skills: ["Node.js","NestJS","Express",".NET / C#","Go","Java / Spring","Python","Flask / FastAPI","REST & GraphQL","JWT","OAuth2"] },
  { key: "testing",   tag: "QA",           color: "#F97316", skills: ["Jest","Vitest","Pytest","React Testing Library","Cypress","Supertest"] },
  { key: "design",    tag: "Design",       color: "#EC4899", skills: ["Figma","Design Systems","Wireframing","Prototyping","User Research","Visual Hierarchy","Responsive Design"] },
  { key: "database",  tag: "Data",         color: "#F59E0B", skills: ["PostgreSQL","SQL Server","MongoDB","SQLite","Redis","Prisma ORM","SQLAlchemy","TypeORM","Firebase","Supabase","Migrations"] },
  { key: "devops",    tag: "Infra",        color: "#EC4899", skills: ["Docker","AWS","Azure","Vercel","CI/CD","GitHub Actions","Linux","Nginx","Git","GitFlow","Automation & Bots"] },
  { key: "arch",      tag: "Design",       color: "#8B5CF6", skills: ["Microservices","Clean Architecture","DDD","Event-Driven","SOLID","Monorepos","API Gateway","Scrum/Kanban"] },
] as const;

export const CATEGORY_LABELS: Record<string, Record<Lang, string>> = {
  frontend: { pt: "Frontend",      en: "Frontend" },
  backend:  { pt: "Backend",       en: "Backend" },
  testing:  { pt: "Testes",        en: "Testing" },
  design:   { pt: "UI/UX Design",  en: "UI/UX Design" },
  database: { pt: "Banco de Dados",en: "Database" },
  devops:   { pt: "DevOps & Cloud",en: "DevOps & Cloud" },
  arch:     { pt: "Arquitetura",   en: "Architecture" },
};

export function getSkillCategories(lang: Lang): SkillCategory[] {
  return CATEGORIES_BASE.map((c) => ({ ...c, label: CATEGORY_LABELS[c.key][lang] }));
}

/* ────────────── Featured tech strip ────────────── */

export interface FeaturedTech {
  name: string;
  color: string;
  bg: string;
}

export const FEATURED_TECH: FeaturedTech[] = [
  { name: "React", color: "#61DAFB", bg: "#61DAFB18" },
  { name: "Next.js", color: "#FFFFFF", bg: "#ffffff12" },
  { name: "TypeScript", color: "#3178C6", bg: "#3178C618" },
  { name: "Node.js", color: "#8CC84B", bg: "#8CC84B18" },
  { name: "Flutter", color: "#00B4AB", bg: "#00B4AB18" },
  { name: ".NET / C#", color: "#9B4F96", bg: "#9B4F9618" },
  { name: "Go", color: "#00ADD8", bg: "#00ADD818" },
  { name: "Docker", color: "#2496ED", bg: "#2496ED18" },
];
