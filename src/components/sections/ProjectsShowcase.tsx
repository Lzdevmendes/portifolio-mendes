"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/language";
import type { Lang } from "@/contexts/language";

interface Project {
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

const PROJECTS: Record<Lang, Project[]> = {
  pt: [
    {
      num: "01",
      client: "Multiclínica",
      title: "Plataforma de Gestão de Saúde",
      description:
        "Plataforma completa de gestão de pacientes, prontuários e faturamento com $1.0M+ em transações processadas via Stripe. Sistema de agendamento em tempo real com WebSockets e automação de prontuários que reduziu 40% no tempo de atendimento.",
      stack: ["React", "Node.js", "TypeScript", "PostgreSQL", "Stripe", "AWS"],
      github: "https://github.com/Lzdevmendes",
      live: null,
      accent: "#0D9488",
      image: null,
      video: null,
    },
    {
      num: "02",
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
      num: "03",
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
    {
      num: "04",
      client: "A definir",
      title: "Projeto 04 — título a preencher",
      description: "Descrição a preencher pelo usuário após implementação.",
      stack: [],
      github: "https://github.com/Lzdevmendes",
      live: null,
      accent: "#EC4899",
      image: null,
      video: null,
    },
    {
      num: "05",
      client: "A definir",
      title: "Projeto 05 — título a preencher",
      description: "Descrição a preencher pelo usuário após implementação.",
      stack: [],
      github: "https://github.com/Lzdevmendes",
      live: null,
      accent: "#8B5CF6",
      image: null,
      video: null,
    },
  ],
  en: [
    {
      num: "01",
      client: "Multiclínica",
      title: "Healthcare Management Platform",
      description:
        "Complete patient management, medical records, and billing platform with $1.0M+ in transactions processed via Stripe. Real-time scheduling with WebSockets and automation that reduced service time by 40%.",
      stack: ["React", "Node.js", "TypeScript", "PostgreSQL", "Stripe", "AWS"],
      github: "https://github.com/Lzdevmendes",
      live: null,
      accent: "#0D9488",
      image: null,
      video: null,
    },
    {
      num: "02",
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
      num: "03",
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
    {
      num: "04",
      client: "TBD",
      title: "Project 04 — title to be filled",
      description: "Description to be provided by user after implementation.",
      stack: [],
      github: "https://github.com/Lzdevmendes",
      live: null,
      accent: "#EC4899",
      image: null,
      video: null,
    },
    {
      num: "05",
      client: "TBD",
      title: "Project 05 — title to be filled",
      description: "Description to be provided by user after implementation.",
      stack: [],
      github: "https://github.com/Lzdevmendes",
      live: null,
      accent: "#8B5CF6",
      image: null,
      video: null,
    },
  ],
};

function MacOSPlaceholder({ accent }: { accent: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0d1117",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: "22px",
          background: "#1c1c1e",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: "6px",
          flexShrink: 0,
        }}
      >
        {(["#FF5F57", "#FFBD2E", "#28C840"] as string[]).map((c) => (
          <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.85 }} />
        ))}
      </div>
      <div
        style={{
          flex: 1,
          background: `linear-gradient(135deg, #0d1117 0%, ${accent}18 60%, #0d1117 100%)`,
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            pointerEvents: "none",
          }}
        />
        <div style={{ width: "60%", height: "7px", background: `${accent}55`, borderRadius: "4px" }} />
        <div style={{ width: "40%", height: "5px", background: "rgba(255,255,255,0.08)", borderRadius: "4px" }} />
        <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
          {([1, 2, 3] as number[]).map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: "52px",
                background: "rgba(255,255,255,0.04)",
                borderRadius: "6px",
                border: `1px solid ${accent}20`,
              }}
            />
          ))}
        </div>
        <div style={{ width: "80%", height: "5px", background: "rgba(255,255,255,0.05)", borderRadius: "4px" }} />
        <div style={{ width: "55%", height: "5px", background: "rgba(255,255,255,0.05)", borderRadius: "4px" }} />
        <div style={{ width: "70%", height: "5px", background: "rgba(255,255,255,0.03)", borderRadius: "4px" }} />
      </div>
    </div>
  );
}

/* ─── MacBook base shell (shared between scroll & static versions) ─── */
function MacBookShell({
  accent,
  screenshot,
  video,
  projectName,
  lidStyle,
}: {
  accent: string;
  screenshot?: string | null;
  video?: string | null;
  projectName: string;
  lidStyle?: React.CSSProperties;
}) {
  return (
    <div style={{ position: "relative" }}>
      {/* LID */}
      <div
        style={{
          transformOrigin: "center bottom",
          background: "linear-gradient(160deg, #2e2e30 0%, #1c1c1e 55%, #161618 100%)",
          borderRadius: "14px 14px 3px 3px",
          padding: "0 6px 6px",
          boxShadow:
            "inset 0 0 0 0.5px rgba(255,255,255,0.065), 0 -1px 0 rgba(0,0,0,0.6)",
          ...lidStyle,
        }}
      >
        {/* Notch M4/M5 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "14px",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "22px",
              background: "#0a0a0a",
              borderRadius: "0 0 10px 10px",
            }}
          />
        </div>
        {/* Screen */}
        <div
          style={{
            background: "#080808",
            borderRadius: "6px 6px 3px 3px",
            overflow: "hidden",
            boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.04)",
          }}
        >
          <div
            style={{ aspectRatio: "16/10", overflow: "hidden", display: "flex" }}
          >
            {video ? (
              <video
                src={video}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : screenshot ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={screenshot}
                alt={projectName}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <MacOSPlaceholder accent={accent} />
            )}
          </div>
        </div>
      </div>

      {/* HINGE */}
      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(90deg, #111112, #2c2c2e 25%, #3e3e40 50%, #2c2c2e 75%, #111112)",
        }}
      />

      {/* BASE */}
      <div
        style={{
          background: "linear-gradient(180deg, #252527 0%, #1e1e20 65%, #1c1c1e 100%)",
          borderRadius: "0 0 10px 10px",
          padding: "10px 16px 14px",
          boxShadow:
            "0 28px 80px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
        {/* Keyboard rows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            marginBottom: "8px",
            opacity: 0.13,
          }}
        >
          {[11, 12, 11].map((count, row) => (
            <div key={row} style={{ display: "flex", gap: "2px" }}>
              {Array.from({ length: count }).map((_, k) => (
                <div
                  key={k}
                  style={{
                    flex: 1,
                    height: "4px",
                    background: "#ffffff",
                    borderRadius: "1px",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        {/* Trackpad */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "34%",
              height: "14px",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "4px",
              boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.07)",
            }}
          />
        </div>
      </div>

      {/* BOTTOM EDGE */}
      <div
        style={{
          height: "4px",
          background: "#131315",
          borderRadius: "0 0 8px 8px",
        }}
      />
    </div>
  );
}

/* ─── Scroll-driven MacBook (desktop) ─── */
function ScrollMacBook({
  scrollYProgress,
  project,
}: {
  scrollYProgress: MotionValue<number>;
  project: Project;
}) {
  // Lid goes from nearly-closed (-88°) to comfortably open (-16°)
  const lidRotateX = useTransform(scrollYProgress, [0.04, 0.52], [-88, -16]);

  // Glow that grows as the screen is revealed — opacity only (static blur)
  const glowOpacity = useTransform(scrollYProgress, [0.12, 0.52], [0, 1]);

  return (
    <div
      style={{
        perspective: "1200px",
        perspectiveOrigin: "50% 62%",
        position: "relative",
      }}
    >
      {/* Screen glow leaking out */}
      <motion.div
        style={{
          position: "absolute",
          top: "-8%",
          left: "-12%",
          right: "-12%",
          height: "55%",
          background: `radial-gradient(ellipse at 50% 80%, ${project.accent}35 0%, transparent 68%)`,
          opacity: glowOpacity,
          filter: "blur(20px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Lid — rotates directly under perspective context (no intermediate wrapper) */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* The lid part only rotates */}
        <motion.div
          style={{
            transformOrigin: "center bottom",
            rotateX: lidRotateX,
            willChange: "transform",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(160deg, #2e2e30 0%, #1c1c1e 55%, #161618 100%)",
              borderRadius: "14px 14px 3px 3px",
              padding: "0 6px 6px",
              boxShadow:
                "inset 0 0 0 0.5px rgba(255,255,255,0.065), 0 -1px 0 rgba(0,0,0,0.6)",
            }}
          >
            {/* Notch M4/M5 */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "14px",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "22px",
                  background: "#0a0a0a",
                  borderRadius: "0 0 10px 10px",
                }}
              />
            </div>
            {/* Screen */}
            <div
              style={{
                background: "#080808",
                borderRadius: "6px 6px 3px 3px",
                overflow: "hidden",
                boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.04)",
              }}
            >
              <div
                style={{ aspectRatio: "16/10", overflow: "hidden", display: "flex" }}
              >
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : project.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <MacOSPlaceholder accent={project.accent} />
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* HINGE — stays fixed below the rotating lid */}
        <div
          style={{
            height: "3px",
            background:
              "linear-gradient(90deg, #111112, #2c2c2e 25%, #3e3e40 50%, #2c2c2e 75%, #111112)",
          }}
        />

        {/* BASE — fixed */}
        <div
          style={{
            background:
              "linear-gradient(180deg, #252527 0%, #1e1e20 65%, #1c1c1e 100%)",
            borderRadius: "0 0 10px 10px",
            padding: "10px 16px 14px",
            boxShadow:
              "0 28px 80px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3px",
              marginBottom: "8px",
              opacity: 0.13,
            }}
          >
            {[11, 12, 11].map((count, row) => (
              <div key={row} style={{ display: "flex", gap: "2px" }}>
                {Array.from({ length: count }).map((_, k) => (
                  <div
                    key={k}
                    style={{
                      flex: 1,
                      height: "4px",
                      background: "#ffffff",
                      borderRadius: "1px",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: "34%",
                height: "14px",
                background: "rgba(255,255,255,0.06)",
                borderRadius: "4px",
                boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.07)",
              }}
            />
          </div>
        </div>

        {/* BOTTOM EDGE */}
        <div
          style={{
            height: "4px",
            background: "#131315",
            borderRadius: "0 0 8px 8px",
          }}
        />
      </div>
    </div>
  );
}

/* ─── Info panel ─── */
function ProjectInfo({
  project,
  lang,
  badgeOpacity,
  badgeY,
  infoOpacity,
  infoY,
  accentScaleY,
  isStatic,
}: {
  project: Project;
  lang: Lang;
  badgeOpacity: MotionValue<number> | number;
  badgeY: MotionValue<number> | number;
  infoOpacity: MotionValue<number> | number;
  infoY: MotionValue<number> | number;
  accentScaleY: MotionValue<number> | number;
  isStatic?: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
      {/* Accent vertical line */}
      <div
        style={{
          position: "relative",
          width: "2px",
          flexShrink: 0,
          alignSelf: "stretch",
          minHeight: isStatic ? "120px" : undefined,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--color-border)",
            borderRadius: "2px",
          }}
        />
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(180deg, ${project.accent} 0%, ${project.accent}30 100%)`,
            borderRadius: "2px",
            scaleY: accentScaleY,
            transformOrigin: "top",
          }}
        />
      </div>

      <div style={{ flex: 1 }}>
        {/* Badge + Title + Client */}
        <motion.div style={{ opacity: badgeOpacity, y: badgeY }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "9999px",
              background: `linear-gradient(180deg, ${project.accent}20, ${project.accent}0a)`,
              border: `1px solid ${project.accent}30`,
              color: project.accent,
              fontFamily: "var(--font-inter)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase" as const,
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: project.accent,
                boxShadow: `0 0 8px ${project.accent}`,
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            {lang === "pt" ? `Projeto ${project.num}` : `Project ${project.num}`}
          </div>

          <h3
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(1.55rem, 2.6vw, 2.8rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "var(--color-text)",
              marginBottom: "8px",
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              color: project.accent,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
              opacity: 0.85,
            }}
          >
            {project.client}
          </p>
        </motion.div>

        {/* Description + stack + CTAs */}
        <motion.div style={{ opacity: infoOpacity, y: infoY }}>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.9375rem",
              color: "var(--color-muted)",
              lineHeight: 1.85,
              maxWidth: "480px",
              margin: "20px 0",
            }}
          >
            {project.description}
          </p>

          {project.stack.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginBottom: "28px",
              }}
            >
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: "3px 10px",
                    borderRadius: "6px",
                    border: `1px solid ${project.accent}25`,
                    background: `${project.accent}0a`,
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.72rem",
                    fontWeight: 500,
                    color: "var(--color-muted)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -1, borderColor: project.accent }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "9px 18px",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "var(--color-muted)",
                fontFamily: "var(--font-inter)",
                fontSize: "0.8125rem",
                fontWeight: 500,
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
            >
              <Github size={14} />
              GitHub
            </motion.a>
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "9px 18px",
                  borderRadius: "9999px",
                  background: "var(--color-teal)",
                  color: "#fff",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                <ExternalLink size={14} />
                {lang === "pt" ? "Ver Projeto" : "Live Demo"}
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Single project section (desktop: sticky scroll-driven) ─── */
function ProjectScrollSection({
  project,
  index,
  lang,
  isMobile,
}: {
  project: Project;
  index: number;
  lang: Lang;
  isMobile: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const isReversed = index % 2 !== 0;

  // Desktop scroll-driven values
  const accentScaleY = useTransform(scrollYProgress, [0.06, 0.50], [0, 1]);
  const badgeOpacity = useTransform(scrollYProgress, [0.26, 0.44], [0, 1]);
  const badgeY = useTransform(scrollYProgress, [0.26, 0.44], [20, 0]);
  const infoOpacity = useTransform(scrollYProgress, [0.40, 0.56], [0, 1]);
  const infoY = useTransform(scrollYProgress, [0.40, 0.56], [26, 0]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);

  /* ── MOBILE layout: flat cards with whileInView ── */
  if (isMobile) {
    return (
      <div style={{ padding: "0 20px 64px" }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          style={{ display: "flex", flexDirection: "column", gap: "28px" }}
        >
          {/* Static MacBook, open position */}
          <div
            style={{
              perspective: "900px",
              perspectiveOrigin: "50% 60%",
            }}
          >
            <MacBookShell
              accent={project.accent}
              screenshot={project.image}
              video={project.video}
              projectName={project.title}
              lidStyle={{ transform: "rotateX(-22deg)", transformOrigin: "center bottom" }}
            />
          </div>

          {/* Info always visible on mobile */}
          <ProjectInfo
            project={project}
            lang={lang}
            badgeOpacity={1}
            badgeY={0}
            infoOpacity={1}
            infoY={0}
            accentScaleY={1}
            isStatic
          />
        </motion.div>
        {index < 4 && (
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, var(--color-border), transparent)",
              margin: "64px 0 0",
            }}
          />
        )}
      </div>
    );
  }

  /* ── DESKTOP layout: sticky + scroll-driven ── */
  return (
    <section
      ref={sectionRef}
      style={{ height: "300vh", position: "relative" }}
      aria-label={project.title}
    >
      {/* Ambient background that fades in/out */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at ${isReversed ? "72%" : "28%"} 40%, ${project.accent}08 0%, transparent 55%)`,
          opacity: bgOpacity,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 40px",
            display: "grid",
            gridTemplateColumns: isReversed ? "42% 58%" : "58% 42%",
            gap: "64px",
            alignItems: "center",
          }}
        >
          {/* MacBook column */}
          <div style={{ order: isReversed ? 2 : 1 }}>
            <ScrollMacBook scrollYProgress={scrollYProgress} project={project} />
          </div>

          {/* Info column */}
          <div style={{ order: isReversed ? 1 : 2 }}>
            <ProjectInfo
              project={project}
              lang={lang}
              badgeOpacity={badgeOpacity}
              badgeY={badgeY}
              infoOpacity={infoOpacity}
              infoY={infoY}
              accentScaleY={accentScaleY}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Dot navigation ─── */
function ProjectDots({
  projects,
  activeIndex,
}: {
  projects: Project[];
  activeIndex: number;
}) {
  return (
    <div
      style={{
        position: "fixed",
        right: "24px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 10,
        pointerEvents: "none",
      }}
      className="project-dots"
    >
      {projects.map((p, i) => (
        <div
          key={p.num}
          style={{
            width: i === activeIndex ? "6px" : "4px",
            height: i === activeIndex ? "6px" : "4px",
            borderRadius: "50%",
            background: i === activeIndex ? p.accent : "rgba(255,255,255,0.2)",
            boxShadow: i === activeIndex ? `0 0 8px ${p.accent}` : "none",
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Root export ─── */
export default function ProjectsShowcase() {
  const { lang } = useLanguage();
  const projects = PROJECTS[lang];
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Mobile detection (defaults false = desktop, matches SSR)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Track which project is in the sticky viewport for the dots
  useEffect(() => {
    if (isMobile) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.findIndex((r) => r === entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.3 }
    );
    sectionRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, [isMobile, projects.length]);

  return (
    <div>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{
          padding: isMobile ? "60px 20px 48px" : "80px 40px 64px",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-inter)",
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "var(--color-teal)",
            letterSpacing: "0.18em",
            textTransform: "uppercase" as const,
            marginBottom: "16px",
          }}
        >
          {lang === "pt" ? "Projetos" : "Projects"}
        </span>
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "var(--color-text)",
            marginBottom: "16px",
          }}
        >
          {lang === "pt" ? (
            <>
              Trabalhos{" "}
              <span style={{ color: "var(--color-teal)" }}>Recentes</span>
            </>
          ) : (
            <>
              Recent{" "}
              <span style={{ color: "var(--color-teal)" }}>Work</span>
            </>
          )}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.9375rem",
            color: "var(--color-muted)",
            lineHeight: 1.6,
            maxWidth: "480px",
          }}
        >
          {lang === "pt"
            ? "Projetos que geraram impacto real em produção."
            : "Projects that generated real impact in production."}
        </p>
      </motion.div>

      {/* Projects */}
      {projects.map((project, i) => (
        <div
          key={project.num}
          ref={(el) => { sectionRefs.current[i] = el as HTMLElement | null; }}
        >
          <ProjectScrollSection
            project={project}
            index={i}
            lang={lang}
            isMobile={isMobile}
          />
        </div>
      ))}

      {/* Dot nav — desktop only */}
      {!isMobile && activeIndex >= 0 && (
        <ProjectDots projects={projects} activeIndex={activeIndex} />
      )}

      <style>{`
        @media (max-width: 768px) {
          .project-dots { display: none !important; }
        }
      `}</style>
    </div>
  );
}
