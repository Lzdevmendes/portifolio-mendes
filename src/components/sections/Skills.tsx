"use client";

import { m } from "framer-motion";
import { memo } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/language";
import type { Lang } from "@/contexts/language";
import { SKILL_URLS, getSkillCategories, FEATURED_TECH, type SkillCategory } from "@/data/skills";

const SKILLS_HEADER: Record<Lang, { label: string; desc: (n: number) => string }> = {
  pt: { label: "Competências", desc: (n) => `${n}+ tecnologias e ferramentas organizadas por domínio` },
  en: { label: "Competencies", desc: (n) => `${n}+ technologies and tools organized by domain` },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
};

export default function Skills() {
  const { lang } = useLanguage();
  const categories = getSkillCategories(lang);
  const sh = SKILLS_HEADER[lang];
  const totalSkills = categories.reduce((acc, c) => acc + c.skills.length, 0);

  return (
    <section
      id="skills"
      aria-label={sh.label}
      style={{ padding: "80px 24px", position: "relative" }}
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
          .skills-row-1 { grid-template-columns: repeat(4, 1fr); }
          .skills-row-2 { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 480px) {
          #skills { padding: 64px 16px !important; }
          .skills-header-desc { text-align: left !important; }
        }
        .skill-pill {
          transition: border-color 0.18s, color 0.18s, background-color 0.18s;
        }
        @media (max-width: 560px) {
          #skills { padding: 64px 16px !important; }
          .skills-header-desc { display: none !important; }
        }
        @media (max-width: 400px) {
          #skills { padding: 48px 12px !important; }
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
          background: "linear-gradient(90deg, transparent, var(--color-border), transparent)",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <m.div
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
            {sh.label}
          </span>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
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
              {sh.desc(totalSkills)}
            </p>
          </div>
        </m.div>

        {/* Featured tech strip */}
        <FeaturedTech />

        {/* Linha 1 — Frontend, Backend, Testes, UI/UX Design */}
        <m.div
          className="skills-row-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          style={{ display: "grid", gap: "16px", marginBottom: "16px" }}
        >
          {categories.slice(0, 4).map((cat) => (
            <CategoryCard key={cat.label} cat={cat} featured />
          ))}
        </m.div>

        {/* Linha 2 — Banco de Dados, DevOps, Arquitetura, Pagamentos */}
        <m.div
          className="skills-row-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          style={{ display: "grid", gap: "16px" }}
        >
          {categories.slice(4).map((cat) => (
            <CategoryCard key={cat.label} cat={cat} />
          ))}
        </m.div>
      </div>
    </section>
  );
}

const CategoryCard = memo(function CategoryCard({ cat, featured = false }: { cat: SkillCategory; featured?: boolean }) {
  return (
    <m.div
      variants={cardVariants}
      role="region"
      aria-label={`${cat.label} — ${cat.skills.length} tecnologias`}
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
          <SkillPill key={skill} skill={skill} color={cat.color} />
        ))}
      </div>
    </m.div>
  );
});

const SkillPill = memo(function SkillPill({ skill, color }: { skill: string; color: string }) {
  const url = SKILL_URLS[skill];

  const pillVariants = {
    rest: { borderColor: "var(--color-border)", color: "var(--color-muted)", backgroundColor: "transparent" },
    hover: { borderColor: color, color: color, backgroundColor: `${color}10` },
  };

  const arrowVariants = {
    rest: { opacity: 0, x: -3 },
    hover: { opacity: 1, x: 0 },
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
    cursor: url ? "pointer" : "default",
  };

  if (url) {
    return (
      <m.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${skill} (abre documentação em nova aba)`}
        initial="rest"
        whileHover="hover"
        variants={pillVariants}
        transition={{ duration: 0.18 }}
        className="skill-pill"
        style={sharedStyle}
      >
        {skill}
        <m.span
          variants={arrowVariants}
          transition={{ duration: 0.15 }}
          style={{ display: "flex", alignItems: "center" }}
        >
          <ArrowUpRight size={10} />
        </m.span>
      </m.a>
    );
  }

  return (
    <m.span
      initial="rest"
      whileHover="hover"
      variants={pillVariants}
      transition={{ duration: 0.18 }}
      className="skill-pill"
      style={sharedStyle}
    >
      {skill}
    </m.span>
  );
});

// ─── Featured tech strip ──────────────────────────────────────────────────────
function FeaturedTech() {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ marginBottom: "40px" }}
    >
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.7rem",
          color: "var(--color-muted)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: "14px",
          opacity: 0.6,
        }}
      >
        Core Stack
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {FEATURED_TECH.map((tech, i) => (
          <m.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ scale: 1.06, y: -2 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 14px",
              borderRadius: "8px",
              background: tech.bg,
              border: `1px solid ${tech.color}30`,
              cursor: "default",
              transition: "box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${tech.color}25`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: tech.color,
                boxShadow: `0 0 6px ${tech.color}80`,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: tech.color,
                letterSpacing: "0.01em",
              }}
            >
              {tech.name}
            </span>
          </m.div>
        ))}
      </div>
    </m.div>
  );
}
