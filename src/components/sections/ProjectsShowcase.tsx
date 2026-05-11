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

/* ─── Placeholder macOS realista — simula interface de dashboard ─── */
function MacOSPlaceholder({ accent }: { accent: string }) {
  const bars = [40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 65];
  const menuItems = ["File", "Edit", "View", "Window"];
  const sideItems = ["Dashboard", "Analytics", "Users", "Payments", "Settings"];
  const stats = [
    { label: "Revenue", value: "$1.2M" },
    { label: "Users",   value: "8.4K" },
    { label: "Uptime",  value: "99.9%" },
  ];

  return (
    <div style={{ width: "100%", height: "100%", background: "#0e0e12", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* ── macOS Menu Bar ── */}
      <div style={{
        height: "22px",
        background: "rgba(22,22,26,0.97)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 10px",
        flexShrink: 0,
      }}>
        {/* Esquerda: apple + menus */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <svg viewBox="0 0 14 17" width="11" height="13" fill="rgba(255,255,255,0.55)" aria-hidden="true">
            <path d="M13.3 11.4c-.3.7-.6 1.3-1 1.9-.5.8-.9 1.3-1.3 1.6-.5.5-1.1.7-1.7.7-.4 0-.9-.1-1.5-.4-.6-.2-1.1-.4-1.6-.4s-1 .1-1.6.4c-.6.2-1.1.4-1.5.4-.6 0-1.2-.2-1.7-.7-.4-.3-.9-.9-1.3-1.6C.7 12.5.3 11.8.1 11 0 10.1 0 9.3 0 8.5c0-.9.2-1.7.6-2.4.3-.5.7-1 1.3-1.3.6-.4 1.2-.6 1.9-.6.4 0 1 .1 1.6.4.7.3 1.1.4 1.3.4.2 0 .7-.2 1.5-.5.8-.3 1.4-.4 1.9-.3 1.3.1 2.3.6 2.9 1.6-1.2.7-1.7 1.7-1.7 3 0 1 .4 1.9 1.1 2.6.3.3.7.6 1 .7l-.1.3zM9.8.9C9.8 1.7 9.5 2.4 9 3c-.6.6-1.2 1-1.9 1h-.1c0-.8.3-1.5.8-2.1C8.3 1.3 9 .8 9.8.7v.2z" />
          </svg>
          {menuItems.map((m) => (
            <span key={m} style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.45)", fontFamily: "system-ui,sans-serif" }}>{m}</span>
          ))}
        </div>
        {/* Direita: status */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "20px", height: "10px", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "3px", position: "relative" }}>
            <div style={{ position: "absolute", inset: "2px 4px 2px 2px", background: "#34C759", borderRadius: "1px" }} />
            <div style={{ position: "absolute", right: "-3px", top: "3px", width: "2px", height: "4px", background: "rgba(255,255,255,0.25)", borderRadius: "0 1px 1px 0" }} />
          </div>
          <span style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-mono)" }}>9:41</span>
        </div>
      </div>

      {/* ── Conteúdo principal ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Sidebar */}
        <div style={{
          width: "130px",
          background: "rgba(18,18,22,0.97)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          padding: "10px 6px",
          display: "flex",
          flexDirection: "column",
          gap: "3px",
          flexShrink: 0,
        }}>
          {sideItems.map((item, i) => (
            <div key={item} style={{
              padding: "5px 8px",
              borderRadius: "6px",
              background: i === 0 ? `${accent}22` : "transparent",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}>
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: i === 0 ? accent : "rgba(255,255,255,0.15)", flexShrink: 0 }} />
              <span style={{ fontSize: "0.55rem", color: i === 0 ? accent : "rgba(255,255,255,0.3)", fontFamily: "system-ui,sans-serif" }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Área principal */}
        <div style={{
          flex: 1,
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          background: `linear-gradient(145deg, #0e0e12 0%, ${accent}0e 100%)`,
          overflow: "hidden",
        }}>

          {/* Cards de stats */}
          <div style={{ display: "flex", gap: "6px" }}>
            {stats.map((s) => (
              <div key={s.label} style={{
                flex: 1,
                padding: "8px 10px",
                background: "rgba(255,255,255,0.03)",
                borderRadius: "8px",
                border: `1px solid ${accent}18`,
              }}>
                <div style={{ fontSize: "0.48rem", color: "rgba(255,255,255,0.3)", marginBottom: "3px", fontFamily: "system-ui,sans-serif" }}>{s.label}</div>
                <div style={{ fontSize: "0.72rem", color: accent, fontFamily: "var(--font-mono)", fontWeight: 700, letterSpacing: "-0.02em" }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Gráfico de barras */}
          <div style={{
            flex: 1,
            background: "rgba(255,255,255,0.02)",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.04)",
            padding: "8px 10px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}>
            <div style={{ fontSize: "0.48rem", color: "rgba(255,255,255,0.2)", marginBottom: "6px", fontFamily: "system-ui,sans-serif" }}>Activity — Last 12 weeks</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "2.5px", flex: 1 }}>
              {bars.map((h, i) => (
                <div key={i} style={{
                  flex: 1,
                  height: `${h}%`,
                  background: i === bars.length - 2
                    ? accent
                    : `${accent}${i > bars.length - 4 ? "60" : "30"}`,
                  borderRadius: "2px 2px 0 0",
                }} />
              ))}
            </div>
          </div>

          {/* Lista de itens */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {[80, 60, 45].map((w, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: `${accent}80`, flexShrink: 0 }} />
                <div style={{ height: "5px", width: `${w}%`, background: "rgba(255,255,255,0.06)", borderRadius: "3px" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Montagem completa do MacBook — fiel ao MacBook Pro 14" ─── */
function ScrollMacBook({ project }: { project: Project }) {
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
  // Brilho cresce junto com a abertura da tampa
  const glowOpacity = useTransform(scrollYProgress, [0.12, 1.0], [0, 0.7]);

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
        {/* ── Container de perspectiva 3D — ângulo levemente elevado para naturalidade ── */}
        <div style={{ perspective: "1400px", perspectiveOrigin: "50% 48%" }}>

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
                /* Tampa alumínio — gradiente com specular highlight para efeito metálico */
                background: "linear-gradient(158deg, #E4E4E6 0%, #D8D8DA 12%, #CACACA 42%, #BCBCBE 72%, #B4B4B6 100%)",
                borderRadius: "14px 14px 3px 3px",
                padding: "5px 5px 6px",
                boxShadow:
                  "inset 0 0 0 0.5px rgba(255,255,255,0.75), " +
                  "inset 0 2px 0 rgba(255,255,255,0.6), " +
                  "inset 0 -1px 0 rgba(0,0,0,0.08), " +
                  "0 0 0 0.5px rgba(0,0,0,0.28), " +
                  "0 -2px 8px rgba(0,0,0,0.15)",
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
                {/* Conteúdo da tela */}
                <div style={{ aspectRatio: "16/10", overflow: "hidden", display: "flex", position: "relative" }}>
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
                  {/* Reflexo de vidro diagonal — simula brilho da tela */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 35%, transparent 70%, rgba(255,255,255,0.03) 100%)",
                      pointerEvents: "none",
                      zIndex: 3,
                    }}
                  />
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

          {/* ── Dobradiça — estrutura em 3 camadas para profundidade real ── */}
          <div>
            {/* Borda inferior da tampa — pega luz vindo de cima */}
            <div style={{ height: "1px", background: "rgba(255,255,255,0.28)" }} />
            {/* Corpo da dobradiça — cilindros de alumínio escuro */}
            <div
              style={{
                height: "5px",
                background:
                  "linear-gradient(90deg, #686869 0%, #909092 12%, #B8B8BA 50%, #909092 88%, #686869 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.28)",
              }}
            />
            {/* Sombra de transição para a base */}
            <div style={{ height: "2px", background: "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, transparent 100%)" }} />
          </div>

          {/* ════ BASE ════ */}
          <div
            style={{
              background:
                "linear-gradient(180deg, #CDCDCF 0%, #C4C4C6 35%, #BCBCBE 70%, #B4B4B6 100%)",
              borderRadius: "0 0 10px 10px",
              padding: "10px 18px 14px",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.72), " +
                "0 10px 24px rgba(0,0,0,0.4), " +
                "inset 0 1px 0 rgba(255,255,255,0.55), " +
                "inset 0 -1px 0 rgba(0,0,0,0.08)",
            }}
          >
            {/* ── Área do teclado com grades de alto-falante nos lados ── */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "10px" }}>

              {/* Grade do alto-falante esquerdo */}
              <div style={{
                width: "12%",
                display: "flex",
                flexDirection: "column",
                gap: "2.5px",
                paddingTop: "6px",
                opacity: 0.55,
              }}>
                {[0,1,2,3].map((r) => (
                  <div key={r} style={{
                    height: "3px",
                    borderRadius: "1.5px",
                    backgroundImage: "repeating-linear-gradient(90deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1.5px, transparent 1.5px, transparent 3px)",
                  }} />
                ))}
              </div>

              {/* Teclado CSS — centro */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "3px" }}>
                {/* Linha de funções — teclas menores */}
                <div style={{
                  height: "4.5px",
                  borderRadius: "1.5px",
                  backgroundImage: "repeating-linear-gradient(90deg,rgba(0,0,0,0.24) 0px,rgba(0,0,0,0.24) calc(5.8% - 2px),transparent calc(5.8% - 2px),transparent 5.8%)",
                  marginBottom: "1px",
                }} />
                {/* 4 linhas principais */}
                {[0,1,2,3].map((r) => (
                  <div key={r} style={{
                    height: "9px",
                    borderRadius: "2px",
                    backgroundImage: "repeating-linear-gradient(90deg,rgba(0,0,0,0.24) 0px,rgba(0,0,0,0.24) calc(7% - 2.5px),transparent calc(7% - 2.5px),transparent 7%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.1)",
                  }} />
                ))}
              </div>

              {/* Grade do alto-falante direito */}
              <div style={{
                width: "12%",
                display: "flex",
                flexDirection: "column",
                gap: "2.5px",
                paddingTop: "6px",
                opacity: 0.55,
              }}>
                {[0,1,2,3].map((r) => (
                  <div key={r} style={{
                    height: "3px",
                    borderRadius: "1.5px",
                    backgroundImage: "repeating-linear-gradient(90deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1.5px, transparent 1.5px, transparent 3px)",
                  }} />
                ))}
              </div>
            </div>

            {/* ── Trackpad Force Touch — vidro fosco ── */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: "33%",
                  height: "20px",
                  background:
                    "linear-gradient(180deg, #AEAEB0 0%, #A4A4A6 50%, #9E9EA0 100%)",
                  borderRadius: "7px",
                  boxShadow:
                    "0 0 0 0.75px rgba(0,0,0,0.32), " +
                    "inset 0 1.5px 0 rgba(255,255,255,0.38), " +
                    "inset 0 -1px 0 rgba(0,0,0,0.12), " +
                    "inset 0 0 0 0.5px rgba(255,255,255,0.1)",
                }}
              />
            </div>
          </div>
          {/* ════ FIM DA BASE ════ */}


          {/* Sombra projetada na superfície — dupla camada para realismo */}
          <div
            style={{
              marginTop: "0px",
              height: "40px",
              background:
                "radial-gradient(ellipse 90% 100% at 50% 0%, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 50%, transparent 80%)",
              filter: "blur(10px)",
            }}
          />
          <div
            style={{
              marginTop: "-16px",
              height: "60px",
              background:
                "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(0,0,0,0.25) 0%, transparent 70%)",
              filter: "blur(18px)",
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
            <ScrollMacBook project={project} />
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
