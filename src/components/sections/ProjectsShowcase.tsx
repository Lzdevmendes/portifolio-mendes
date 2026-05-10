"use client";

import { motion, useScroll, useTransform } from "framer-motion";
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

/* ─── Full MacBook assembly — exact match to MacBook Pro 14" reference ─── */
function ScrollMacBook({ project }: { project: Project }) {
  const macbookRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: macbookRef,
    // 0 = MacBook top hits viewport bottom (starts entering)
    // 1 = MacBook bottom hits viewport bottom (100% visible)
    offset: ["start end", "end end"],
  });

  // MacBook slides up and fades in as it enters (first 40% of scroll)
  const translateY  = useTransform(scrollYProgress, [0, 0.40], [110, 0]);
  const opacity     = useTransform(scrollYProgress, [0, 0.18], [0, 1]);
  // Lid opens from when MacBook starts appearing → fully open at 100% visible
  const lidRotateX  = useTransform(scrollYProgress, [0.05, 1.0], [-102, -17]);
  // Glow grows alongside the lid
  const glowOpacity = useTransform(scrollYProgress, [0.12, 1.0], [0, 0.8]);

  return (
    <div ref={macbookRef} style={{ position: "relative" }}>
      {/* Accent glow behind screen */}
      <motion.div
        style={{
          position: "absolute",
          top: "-12%",
          left: "8%",
          right: "8%",
          height: "48%",
          background: `radial-gradient(ellipse at 50% 90%, ${project.accent}45 0%, transparent 65%)`,
          opacity: glowOpacity,
          filter: "blur(30px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <motion.div style={{ y: translateY, opacity, position: "relative", zIndex: 1 }}>
        {/* ── 3D Perspective container ── */}
        <div style={{ perspective: "1400px", perspectiveOrigin: "50% 56%" }}>

          {/* ════ LID ════ */}
          <motion.div
            style={{
              transformOrigin: "center bottom",
              rotateX: lidRotateX,
              willChange: "transform",
            }}
          >
            {/*
              Outer silver aluminum shell — matches the reference image exactly:
              - Silver gradient top-to-bottom
              - Thin rounded corners (14px top)
              - Minimal padding = thin aluminum frame visible around black bezel
            */}
            <div
              style={{
                background: "linear-gradient(175deg, #D8D8DA 0%, #C8C8CA 40%, #BEBEC0 100%)",
                borderRadius: "14px 14px 3px 3px",
                padding: "5px 5px 6px",
                boxShadow:
                  "inset 0 0 0 0.5px rgba(255,255,255,0.7), " +
                  "inset 0 2px 0 rgba(255,255,255,0.5), " +
                  "0 0 0 0.5px rgba(0,0,0,0.25)",
              }}
            >
              {/*
                Inner black bezel + screen
                overflow: hidden clips the content, position: relative for notch overlay
              */}
              <div
                style={{
                  background: "#0a0a0a",
                  borderRadius: "10px 10px 1px 1px",
                  overflow: "hidden",
                  position: "relative",
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

                {/*
                  Notch — MacBook Pro 14" style:
                  Pill-shaped cutout at top-center, overlaid on screen content
                */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "92px",
                    height: "22px",
                    background: "#0a0a0a",
                    borderRadius: "0 0 12px 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                  }}
                >
                  {/* Camera lens */}
                  <div
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "#1e1e20",
                      boxShadow:
                        "0 0 0 1.5px #2c2c2e, inset 0 0 3px rgba(0,0,0,0.8)",
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
          {/* ════ END LID ════ */}

          {/* ── Hinge line ── */}
          <div
            style={{
              height: "4px",
              background:
                "linear-gradient(90deg, #888 0%, #aaa 20%, #ccc 50%, #aaa 80%, #888 100%)",
            }}
          />

          {/* ════ BASE ════ */}
          <div
            style={{
              background:
                "linear-gradient(180deg, #CDCDCF 0%, #BEBEC0 55%, #B2B2B4 100%)",
              borderRadius: "0 0 10px 10px",
              padding: "12px 20px 16px",
              boxShadow:
                "0 34px 90px rgba(0,0,0,0.75), " +
                "0 12px 28px rgba(0,0,0,0.45), " +
                "inset 0 1px 0 rgba(255,255,255,0.5)",
            }}
          >
            {/* ── Keyboard ── */}
            <div style={{ marginBottom: "12px" }}>
              {/* Function row — shorter, 16 keys */}
              <div style={{ display: "flex", gap: "2.5px", marginBottom: "4px" }}>
                {Array.from({ length: 16 }).map((_, k) => (
                  <div
                    key={k}
                    style={{
                      flex: 1,
                      height: "6px",
                      background: "rgba(0,0,0,0.18)",
                      borderRadius: "2px",
                      boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.12)",
                    }}
                  />
                ))}
              </div>

              {/* Number row — 13 keys */}
              <div style={{ display: "flex", gap: "3px", marginBottom: "3px" }}>
                {Array.from({ length: 13 }).map((_, k) => (
                  <div
                    key={k}
                    style={{
                      flex: 1,
                      height: "9px",
                      background: "rgba(0,0,0,0.2)",
                      borderRadius: "2.5px",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.15)",
                    }}
                  />
                ))}
              </div>

              {/* QWERTY row — 13 keys */}
              <div style={{ display: "flex", gap: "3px", marginBottom: "3px" }}>
                {Array.from({ length: 13 }).map((_, k) => (
                  <div
                    key={k}
                    style={{
                      flex: 1,
                      height: "9px",
                      background: "rgba(0,0,0,0.2)",
                      borderRadius: "2.5px",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.15)",
                    }}
                  />
                ))}
              </div>

              {/* ASDF row — 12 keys + caps */}
              <div style={{ display: "flex", gap: "3px", marginBottom: "3px" }}>
                {/* Caps Lock — wider */}
                <div
                  style={{
                    flex: 1.6,
                    height: "9px",
                    background: "rgba(0,0,0,0.2)",
                    borderRadius: "2.5px",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.15)",
                  }}
                />
                {Array.from({ length: 11 }).map((_, k) => (
                  <div
                    key={k}
                    style={{
                      flex: 1,
                      height: "9px",
                      background: "rgba(0,0,0,0.2)",
                      borderRadius: "2.5px",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.15)",
                    }}
                  />
                ))}
                {/* Enter — wider */}
                <div
                  style={{
                    flex: 1.8,
                    height: "9px",
                    background: "rgba(0,0,0,0.2)",
                    borderRadius: "2.5px",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.15)",
                  }}
                />
              </div>

              {/* ZXCV row — 10 keys + shift */}
              <div style={{ display: "flex", gap: "3px" }}>
                {/* Shift — wider */}
                <div
                  style={{
                    flex: 2.2,
                    height: "9px",
                    background: "rgba(0,0,0,0.2)",
                    borderRadius: "2.5px",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.15)",
                  }}
                />
                {Array.from({ length: 10 }).map((_, k) => (
                  <div
                    key={k}
                    style={{
                      flex: 1,
                      height: "9px",
                      background: "rgba(0,0,0,0.2)",
                      borderRadius: "2.5px",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.15)",
                    }}
                  />
                ))}
                {/* Right Shift — wider */}
                <div
                  style={{
                    flex: 2.2,
                    height: "9px",
                    background: "rgba(0,0,0,0.2)",
                    borderRadius: "2.5px",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.15)",
                  }}
                />
              </div>
            </div>

            {/* ── Trackpad ── */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: "34%",
                  height: "18px",
                  background: "linear-gradient(180deg, #B4B4B6 0%, #A8A8AA 100%)",
                  borderRadius: "6px",
                  boxShadow:
                    "0 0 0 0.75px rgba(0,0,0,0.3), " +
                    "inset 0 1px 0 rgba(255,255,255,0.35), " +
                    "inset 0 -1px 0 rgba(0,0,0,0.1)",
                }}
              />
            </div>
          </div>
          {/* ════ END BASE ════ */}

          {/* Surface shadow */}
          <div
            style={{
              marginTop: "10px",
              height: "28px",
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.55) 0%, transparent 68%)",
              filter: "blur(8px)",
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
  const isLast = index === 4;

  return (
    <section
      style={{ position: "relative", paddingBottom: isLast ? "80px" : "0" }}
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
        {/* ── Info block ── 64px topo, 48px até o MacBook */}
        <div style={{ paddingTop: "64px", paddingBottom: "48px" }}>
          <ProjectInfoPanel project={project} lang={lang} />
        </div>

        {/* ── MacBook block ── */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "min(960px, 100%)" }}>
            <ScrollMacBook project={project} />
          </div>
        </div>
      </div>

      {/* Separator — 64px acima da linha, 64px abaixo (próx. projeto paddingTop) */}
      {!isLast && (
        <div
          style={{
            maxWidth: "1280px",
            margin: "64px auto 0",
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
          padding: "80px 40px 0px",
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
