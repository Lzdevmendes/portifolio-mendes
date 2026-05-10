"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
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

/* ─── Screen content placeholder ─── */
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
      {/* macOS menu bar */}
      <div
        style={{
          height: "24px",
          background: "#1c1c1e",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          gap: "7px",
          flexShrink: 0,
        }}
      >
        {(["#FF5F57", "#FFBD2E", "#28C840"] as string[]).map((c) => (
          <div
            key={c}
            style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.9 }}
          />
        ))}
      </div>
      {/* Content */}
      <div
        style={{
          flex: 1,
          background: `linear-gradient(135deg, #0d1117 0%, ${accent}18 55%, #0d1117 100%)`,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            pointerEvents: "none",
          }}
        />
        <div style={{ width: "55%", height: "8px", background: `${accent}55`, borderRadius: "4px" }} />
        <div style={{ width: "38%", height: "6px", background: "rgba(255,255,255,0.07)", borderRadius: "4px" }} />
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          {([1, 2, 3] as number[]).map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: "62px",
                background: "rgba(255,255,255,0.04)",
                borderRadius: "8px",
                border: `1px solid ${accent}1a`,
              }}
            />
          ))}
        </div>
        <div style={{ width: "75%", height: "6px", background: "rgba(255,255,255,0.04)", borderRadius: "4px" }} />
        <div style={{ width: "52%", height: "6px", background: "rgba(255,255,255,0.04)", borderRadius: "4px" }} />
        <div style={{ width: "65%", height: "6px", background: "rgba(255,255,255,0.03)", borderRadius: "4px" }} />
      </div>
    </div>
  );
}

/* ─── MacBook 3D with scroll-driven lid ─── */
function MacBookLid({
  rotateX,
  project,
}: {
  rotateX: MotionValue<number>;
  project: Project;
}) {
  return (
    <motion.div
      style={{
        transformOrigin: "center bottom",
        rotateX,
        willChange: "transform",
      }}
    >
      {/* Outer lid shell — space gray, exactly like MacBook Pro 14" */}
      <div
        style={{
          background: "linear-gradient(170deg, #323234 0%, #1e1e20 40%, #161618 100%)",
          borderRadius: "14px 14px 2px 2px",
          /* Razor-thin bezels: 4px top/sides, 5px bottom */
          padding: "4px 4px 5px",
          boxShadow:
            "inset 0 0 0 0.5px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Screen area (black) with notch overlay */}
        <div
          style={{
            background: "#080808",
            borderRadius: "11px 11px 2px 2px",
            overflow: "hidden",
            position: "relative",
            boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.04)",
          }}
        >
          {/* Screen content */}
          <div style={{ aspectRatio: "16/10", overflow: "hidden", display: "flex" }}>
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

          {/* Notch — overlaid on top of screen content (MacBook Pro 14" style) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "88px",
              height: "20px",
              background: "#080808",
              borderRadius: "0 0 10px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            {/* Camera dot */}
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#1c1c1e",
                boxShadow: "0 0 0 1px #2a2a2c",
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Full MacBook assembly ─── */
function ScrollMacBook({ project }: { project: Project }) {
  const macbookRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: macbookRef,
    offset: ["start end", "start 15%"],
  });

  // Lid: from nearly closed → comfortably open
  const lidRotateX = useTransform(scrollYProgress, [0, 0.85], [-102, -17]);

  // MacBook slides up from below as it enters viewport
  const translateY = useTransform(scrollYProgress, [0, 0.6], [110, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.28], [0, 1]);

  // Glow intensifies as lid opens
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.85], [0, 0.85]);

  return (
    <div ref={macbookRef} style={{ position: "relative" }}>
      {/* Screen glow effect */}
      <motion.div
        style={{
          position: "absolute",
          top: "-15%",
          left: "5%",
          right: "5%",
          height: "50%",
          background: `radial-gradient(ellipse at 50% 85%, ${project.accent}40 0%, transparent 65%)`,
          opacity: glowOpacity,
          filter: "blur(28px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <motion.div
        style={{ y: translateY, opacity, position: "relative", zIndex: 1 }}
      >
        {/* 3D perspective wrapper */}
        <div
          style={{
            perspective: "1400px",
            perspectiveOrigin: "50% 58%",
          }}
        >
          {/* Lid */}
          <MacBookLid rotateX={lidRotateX} project={project} />

          {/* Hinge — ultra thin, like MacBook Pro 14" */}
          <div
            style={{
              height: "3px",
              background:
                "linear-gradient(90deg, #0d0d0e, #282828 15%, #3c3c3e 50%, #282828 85%, #0d0d0e)",
            }}
          />

          {/* Base / keyboard deck */}
          <div
            style={{
              background:
                "linear-gradient(180deg, #2a2a2c 0%, #222224 55%, #1e1e20 100%)",
              borderRadius: "0 0 10px 10px",
              padding: "10px 18px 14px",
              boxShadow:
                "0 36px 100px rgba(0,0,0,0.8), 0 14px 34px rgba(0,0,0,0.5)",
            }}
          >
            {/* Keyboard — 4 visible rows like MacBook Pro */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "3px",
                marginBottom: "9px",
                opacity: 0.14,
              }}
            >
              {/* Function row (shorter keys) */}
              <div style={{ display: "flex", gap: "2.5px" }}>
                {Array.from({ length: 16 }).map((_, k) => (
                  <div
                    key={k}
                    style={{
                      flex: 1,
                      height: "3.5px",
                      background: "#fff",
                      borderRadius: "1px",
                    }}
                  />
                ))}
              </div>
              {/* Regular key rows */}
              {[13, 13, 12].map((count, row) => (
                <div key={row} style={{ display: "flex", gap: "3px" }}>
                  {Array.from({ length: count }).map((_, k) => (
                    <div
                      key={k}
                      style={{
                        flex: k === 0 && row === 2 ? 2 : 1,
                        height: "5px",
                        background: "#fff",
                        borderRadius: "1.5px",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
            {/* Trackpad — centered, proportional */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: "30%",
                  height: "15px",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "5px",
                  boxShadow:
                    "inset 0 0 0 0.5px rgba(255,255,255,0.08), 0 0 0 0.5px rgba(0,0,0,0.3)",
                }}
              />
            </div>
          </div>

          {/* Bottom tapered edge — characteristic MacBook Pro 14" detail */}
          <div
            style={{
              height: "4px",
              background:
                "linear-gradient(180deg, #181818 0%, #111112 100%)",
              borderRadius: "0 0 6px 6px",
            }}
          />

          {/* Cast shadow on surface */}
          <div
            style={{
              marginTop: "8px",
              height: "24px",
              background:
                "radial-gradient(ellipse at 50% 10%, rgba(0,0,0,0.6) 0%, transparent 68%)",
              filter: "blur(6px)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Project info panel — same 960px width as MacBook ─── */
function ProjectInfoPanel({ project, lang }: { project: Project; lang: Lang }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
      style={{ width: "100%" }}
    >
      {/* Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 14px",
          borderRadius: "9999px",
          background: `linear-gradient(180deg, ${project.accent}22, ${project.accent}0c)`,
          border: `1px solid ${project.accent}32`,
          color: project.accent,
          fontFamily: "var(--font-inter)",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase" as const,
          marginBottom: "22px",
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: project.accent,
            boxShadow: `0 0 10px ${project.accent}`,
            display: "inline-block",
            flexShrink: 0,
          }}
        />
        {lang === "pt" ? `Projeto ${project.num}` : `Project ${project.num}`}
      </div>

      {/* Title — full width of the 960px block */}
      <h3
        style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 800,
          fontSize: "clamp(2rem, 3.8vw, 3.6rem)",
          letterSpacing: "-0.045em",
          lineHeight: 1.04,
          color: "var(--color-text)",
          marginBottom: "10px",
        }}
      >
        {project.title}
      </h3>

      {/* Client */}
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.78rem",
          color: project.accent,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase" as const,
          opacity: 0.85,
          marginBottom: "28px",
        }}
      >
        {project.client}
      </p>

      {/* 2-column lower block — description left, stack+CTAs right */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          alignItems: "start",
        }}
        className="project-info-grid"
      >
        {/* Left: description */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.9375rem",
            color: "var(--color-muted)",
            lineHeight: 1.9,
            margin: 0,
          }}
        >
          {project.description}
        </p>

        {/* Right: stack + CTAs */}
        <div>
          {project.stack.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "7px",
                marginBottom: "28px",
              }}
            >
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "6px",
                    border: `1px solid ${project.accent}28`,
                    background: `${project.accent}0c`,
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

          {/* CTAs */}
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
                padding: "10px 20px",
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
                  padding: "10px 20px",
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
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Single project section ─── */
function ProjectSection({
  project,
  index,
  lang,
}: {
  project: Project;
  index: number;
  lang: Lang;
}) {
  return (
    <section
      style={{ position: "relative", paddingBottom: "120px" }}
      aria-label={project.title}
    >
      {/* Ambient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 30% 30%, ${project.accent}07 0%, transparent 50%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 40px",
          position: "relative",
        }}
      >
        {/* ── Info block (top) ── */}
        <div style={{ paddingTop: "100px", paddingBottom: "56px" }}>
          <ProjectInfoPanel project={project} lang={lang} />
        </div>

        {/* ── MacBook block (below, centered, wide) ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "min(960px, 100%)" }}>
            <ScrollMacBook project={project} />
          </div>
        </div>
      </div>

      {/* Separator */}
      {index < 4 && (
        <div
          style={{
            maxWidth: "1280px",
            margin: "120px auto 0",
            padding: "0 40px",
          }}
        >
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, var(--color-border), transparent)",
            }}
          />
        </div>
      )}
    </section>
  );
}

/* ─── Root export ─── */
export default function ProjectsShowcase() {
  const { lang } = useLanguage();
  const projects = PROJECTS[lang];

  return (
    <div>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "80px 40px 0",
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
              Recent <span style={{ color: "var(--color-teal)" }}>Work</span>
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
        <ProjectSection key={project.num} project={project} index={i} lang={lang} />
      ))}

      {/* Responsive */}
      <style>{`
        @media (max-width: 700px) {
          .project-info-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
