"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const SKILL_URLS: Record<string, string> = {
  // Frontend
  React: "https://react.dev",
  "Next.js": "https://nextjs.org",
  TypeScript: "https://www.typescriptlang.org",
  JavaScript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  Flutter: "https://flutter.dev",
  "Tailwind CSS": "https://tailwindcss.com",
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
  Redis: "https://redis.io",
  "Prisma ORM": "https://www.prisma.io",
  TypeORM: "https://typeorm.io",
  Migrations: "https://www.prisma.io/docs/orm/prisma-migrate",
  // Testes
  Jest: "https://jestjs.io",
  Vitest: "https://vitest.dev",
  "React Testing Library": "https://testing-library.com/react",
  Cypress: "https://www.cypress.io",
  Supertest: "https://github.com/ladjs/supertest",
  // DevOps & Cloud
  Docker: "https://www.docker.com",
  AWS: "https://aws.amazon.com",
  Azure: "https://azure.microsoft.com",
  "CI/CD": "https://github.com/features/actions",
  "GitHub Actions": "https://github.com/features/actions",
  Linux: "https://www.linux.org",
  Nginx: "https://nginx.org",
  Git: "https://git-scm.com",
  "Automação & Bots": "https://github.com/Lzdevmendes",
  // Arquitetura
  Microsserviços: "https://microservices.io",
  "Clean Architecture":
    "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html",
  DDD: "https://martinfowler.com/tags/domain%20driven%20design.html",
  "Event-Driven": "https://aws.amazon.com/event-driven-architecture",
  SOLID: "https://en.wikipedia.org/wiki/SOLID",
  Monorepos: "https://nx.dev",
  "API Gateway": "https://www.nginx.com/resources/glossary/api-gateway",
  // Pagamentos
  Stripe: "https://stripe.com/docs",
  PIX: "https://www.bcb.gov.br/estabilidadefinanceira/pix",
  PagSeguro: "https://dev.pagseguro.uol.com.br",
  "Gateways de Pagamento": "https://stripe.com/docs",
  Webhooks: "https://stripe.com/docs/webhooks",
  Conciliação: "https://stripe.com/docs/reports",
  "+R$1.0M processados": "https://github.com/Lzdevmendes",
};

interface SkillCategory {
  label: string;
  tag: string;
  color: string;
  skills: string[];
}

const categories: SkillCategory[] = [
  {
    label: "Frontend",
    tag: "UI / UX",
    color: "#6366F1",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Flutter",
      "Tailwind CSS",
      "Framer Motion",
      "HTML & CSS",
      "Zustand",
      "Context API",
      "Zod",
    ],
  },
  {
    label: "Backend",
    tag: "Server / API",
    color: "#0D9488",
    skills: [
      "Node.js",
      "NestJS",
      "Express",
      ".NET / C#",
      "Go",
      "Java / Spring",
      "Python",
      "Flask / FastAPI",
      "REST & GraphQL",
      "JWT",
      "OAuth2",
    ],
  },
  {
    label: "Testes",
    tag: "QA",
    color: "#F97316",
    skills: [
      "Jest",
      "Vitest",
      "React Testing Library",
      "Cypress",
      "Supertest",
    ],
  },
  {
    label: "Banco de Dados",
    tag: "Data",
    color: "#F59E0B",
    skills: [
      "PostgreSQL",
      "SQL Server",
      "MongoDB",
      "Redis",
      "Prisma ORM",
      "TypeORM",
      "Migrations",
    ],
  },
  {
    label: "DevOps & Cloud",
    tag: "Infra",
    color: "#EC4899",
    skills: [
      "Docker",
      "AWS",
      "Azure",
      "CI/CD",
      "GitHub Actions",
      "Linux",
      "Nginx",
      "Git",
      "Automação & Bots",
    ],
  },
  {
    label: "Arquitetura",
    tag: "Design",
    color: "#8B5CF6",
    skills: [
      "Microsserviços",
      "Clean Architecture",
      "DDD",
      "Event-Driven",
      "SOLID",
      "Monorepos",
      "API Gateway",
    ],
  },
  {
    label: "Pagamentos",
    tag: "Fintech",
    color: "#10B981",
    skills: [
      "Stripe",
      "PIX",
      "PagSeguro",
      "Gateways de Pagamento",
      "Webhooks",
      "Conciliação",
      "+R$1.0M processados",
    ],
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      style={{ padding: "100px 24px", position: "relative" }}
    >
      <style>{`
        .skills-row-1 { grid-template-columns: 1fr; }
        .skills-row-2 { grid-template-columns: 1fr; }
        @media (min-width: 560px) {
          .skills-row-1 { grid-template-columns: repeat(2, 1fr); }
          .skills-row-2 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 900px) {
          .skills-row-1 { grid-template-columns: repeat(3, 1fr); }
          .skills-row-2 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1100px) {
          .skills-row-2 { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 480px) {
          #skills { padding: 64px 16px !important; }
          .skills-header-desc { text-align: left !important; }
        }
      `}</style>
      {/* Separator */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(1280px, 100%)",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, var(--color-border), transparent)",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "72px" }}
        >
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "var(--color-teal)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Competências
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "var(--color-text)",
              }}
            >
              Stack &{" "}
              <span style={{ color: "var(--color-teal)" }}>Skills</span>
            </h2>
            <p
              className="skills-header-desc"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.875rem",
                color: "var(--color-muted)",
                maxWidth: "340px",
                lineHeight: 1.6,
                textAlign: "right",
              }}
            >
              {categories.reduce((acc, c) => acc + c.skills.length, 0)}+ tecnologias e ferramentas
              organizadas por domínio
            </p>
          </div>
        </motion.div>

        {/* Linha 1 — Frontend, Backend, Testes */}
        <motion.div
          className="skills-row-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          {categories.slice(0, 3).map((cat) => (
            <CategoryCard key={cat.label} cat={cat} featured />
          ))}
        </motion.div>

        {/* Linha 2 — Banco de Dados, DevOps, Arquitetura, Pagamentos */}
        <motion.div
          className="skills-row-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gap: "16px",
          }}
        >
          {categories.slice(3).map((cat) => (
            <CategoryCard key={cat.label} cat={cat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CategoryCard({ cat, featured = false }: { cat: SkillCategory; featured?: boolean }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <motion.div
      variants={cardVariants}
      style={{
        background: "var(--color-bg-card)",
        border: `1px solid ${featured ? `${cat.color}30` : "var(--color-border)"}`,
        borderRadius: "16px",
        padding: featured ? "32px" : "28px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Featured top bar */}
      {featured && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, ${cat.color}, ${cat.color}44, transparent)`,
          }}
        />
      )}

      {/* Color orb in corner */}
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: featured ? "180px" : "120px",
          height: featured ? "180px" : "120px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${cat.color}${featured ? "28" : "18"} 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: cat.color,
              boxShadow: `0 0 8px ${cat.color}80`,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: "0.9375rem",
              color: "var(--color-text)",
              letterSpacing: "-0.01em",
            }}
          >
            {cat.label}
          </span>
        </div>

        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.6875rem",
            fontWeight: 500,
            color: cat.color,
            background: `${cat.color}15`,
            border: `1px solid ${cat.color}30`,
            borderRadius: "4px",
            padding: "2px 8px",
            letterSpacing: "0.04em",
          }}
        >
          {cat.tag}
        </span>
      </div>

      {/* Skills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {cat.skills.map((skill) => (
          <SkillPill
            key={skill}
            skill={skill}
            color={cat.color}
            isHovered={hovered === skill}
            onEnter={() => setHovered(skill)}
            onLeave={() => setHovered(null)}
          />
        ))}
      </div>
    </motion.div>
  );
}

function SkillPill({
  skill,
  color,
  isHovered,
  onEnter,
  onLeave,
}: {
  skill: string;
  color: string;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const url = SKILL_URLS[skill];

  const sharedAnimate = {
    borderColor: isHovered ? color : "var(--color-border)",
    color: isHovered ? color : "var(--color-muted)",
    backgroundColor: isHovered ? `${color}10` : "transparent",
  };

  const sharedStyle = {
    fontFamily: "var(--font-inter)",
    fontSize: "0.75rem",
    fontWeight: 500,
    border: "1px solid var(--color-border)",
    borderRadius: "6px",
    padding: "4px 10px",
    userSelect: "none" as const,
    letterSpacing: "0.01em",
    display: "inline-flex",
    alignItems: "center",
    gap: "3px",
  };

  if (url) {
    return (
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        animate={sharedAnimate}
        transition={{ duration: 0.18 }}
        style={{ ...sharedStyle, cursor: "pointer" }}
      >
        {skill}
        <motion.span
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -3 }}
          transition={{ duration: 0.15 }}
          style={{ fontSize: "0.65rem", lineHeight: 1 }}
        >
          ↗
        </motion.span>
      </motion.a>
    );
  }

  return (
    <motion.span
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      animate={sharedAnimate}
      transition={{ duration: 0.18 }}
      style={{ ...sharedStyle, cursor: "default" }}
    >
      {skill}
    </motion.span>
  );
}
