"use client";

import { motion } from "framer-motion";
import { useState } from "react";

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
      "+R$1.5M processados",
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

        {/* Frontend + Backend — destaque */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          {categories.slice(0, 2).map((cat) => (
            <CategoryCard key={cat.label} cat={cat} featured />
          ))}
        </motion.div>

        {/* Demais categorias */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {categories.slice(2).map((cat) => (
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
  return (
    <motion.span
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      animate={{
        borderColor: isHovered ? color : "var(--color-border)",
        color: isHovered ? color : "var(--color-muted)",
        backgroundColor: isHovered ? `${color}10` : "transparent",
      }}
      transition={{ duration: 0.18 }}
      style={{
        fontFamily: "var(--font-inter)",
        fontSize: "0.75rem",
        fontWeight: 500,
        border: "1px solid var(--color-border)",
        borderRadius: "6px",
        padding: "4px 10px",
        cursor: "default",
        userSelect: "none",
        letterSpacing: "0.01em",
      }}
    >
      {skill}
    </motion.span>
  );
}
