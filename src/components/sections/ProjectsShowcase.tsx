"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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

/* ─── Placeholder do conteúdo da tela ─── */
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
      {/* Barra de menu macOS */}
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
      {/* Conteúdo */}
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
        {/* Grade de pontos decorativa */}
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

/* ─── Montagem completa do MacBook — fiel ao MacBook Pro 14" ─── */
function ScrollMacBook({ project, isMobile }: { project: Project; isMobile: boolean }) {
  const macbookRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: macbookRef,
    // 0 = topo do MacBook atinge a base do viewport (começa a entrar)
    // 1 = base do MacBook atinge a base do viewport (100% visível)
    offset: ["start end", "end end"],
  });

  // MacBook sobe e aparece conforme entra na tela
  const translateY  = useTransform(scrollYProgress, [0, 0.40], [90, 0]);
  const opacity     = useTransform(scrollYProgress, [0, 0.20], [0, 1]);
  // Tampa abre progressivamente — totalmente aberta com 100% visível
  const lidRotateX  = useTransform(scrollYProgress, [0.05, 1.0], [-102, -17]);
  // Brilho cresce junto com a abertura da tampa (desativado no mobile)
  const glowOpacity = useTransform(scrollYProgress, [0.12, 1.0], [0, isMobile ? 0 : 0.7]);

  /* Versão mobile: apenas a tela sem 3D, sem teclado, sem animações pesadas */
  if (isMobile) {
    return (
      <motion.div
        ref={macbookRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{
          borderRadius: "14px",
          overflow: "hidden",
          border: `1px solid ${project.accent}30`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)`,
          aspectRatio: "16/10",
          position: "relative",
        }}
      >
        {project.video ? (
          <video src={project.video} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <MacOSPlaceholder accent={project.accent} />
        )}
      </motion.div>
    );
  }

  return (
    <div ref={macbookRef} style={{ position: "relative" }}>
      {/* Brilho accent atrás da tela — blur leve para melhor performance */}
      <motion.div
        style={{
          position: "absolute",
          top: "-10%",
          left: "10%",
          right: "10%",
          height: "45%",
          background: `radial-gradient(ellipse at 50% 90%, ${project.accent}40 0%, transparent 65%)`,
          opacity: glowOpacity,
          filter: "blur(20px)",
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
            {/* Teclado — CSS puro, sem divs por tecla (performance 10x melhor) */}
            <div style={{ marginBottom: "12px", display: "flex", flexDirection: "column", gap: "3px" }}>
              {/* Linha de funções */}
              <div style={{ height: "5px", borderRadius: "2px", backgroundImage: "repeating-linear-gradient(90deg,rgba(0,0,0,0.22) 0px,rgba(0,0,0,0.22) calc(5.8% - 2px),transparent calc(5.8% - 2px),transparent 5.8%)" }} />
              {/* 4 linhas principais — gradiente simula divisão entre teclas */}
              {[0,1,2,3].map((r) => (
                <div key={r} style={{ height: "8px", borderRadius: "2px", backgroundImage: "repeating-linear-gradient(90deg,rgba(0,0,0,0.22) 0px,rgba(0,0,0,0.22) calc(7% - 2.5px),transparent calc(7% - 2.5px),transparent 7%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)" }} />
              ))}
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

/* ─── Seção de um único projeto ─── */
function ProjectSection({
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
        className="projects-section-inner"
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
            <ScrollMacBook project={project} isMobile={isMobile} />
          </div>
        </div>
      </div>

      {!isLast && (
        <div
          className="project-separator"
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="projects-header"
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
        <ProjectSection key={project.num} project={project} index={i} lang={lang} isMobile={isMobile} />
      ))}

      {/* Responsive */}
      <style>{`
        @media (max-width: 700px) {
          .project-info-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
        /* Reduce padding on mobile so content doesn't get crushed */
        @media (max-width: 600px) {
          .projects-section-inner { padding: 0 20px !important; }
          .projects-header { padding: 60px 20px 0 !important; }
          .project-section { padding-bottom: 60px !important; }
          .project-separator { padding: 0 20px !important; margin-top: 48px !important; }
        }
        @media (max-width: 400px) {
          .projects-section-inner { padding: 0 16px !important; }
          .projects-header { padding: 48px 16px 0 !important; }
        }
      `}</style>
    </div>
  );
}
