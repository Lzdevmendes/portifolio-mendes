"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, ExternalLink } from "lucide-react";

interface Experience {
  period: string;
  current: boolean;
  role: string;
  company: string;
  client?: string;
  clientUrl?: string;
  description: string;
  stack: string[];
  highlights: string[];
}

const experiences: Experience[] = [
  {
    period: "2023 — Mar. 2026",
    current: false,
    role: "Full Stack Developer Pleno",
    company: "Obracon",
    client: "Sabesp",
    description:
      "Desenvolvimento de sistemas de inspeção e gerenciamento de infraestrutura hídrica para a Sabesp. Atuação em features críticas de produção, integrações com APIs externas e manutenção de arquitetura escalável.",
    stack: ["Node.js", "React", ".NET", "PostgreSQL", "Docker", "Azure"],
    highlights: [
      "Implementação de módulos de checklist para inspeção em campo",
      "Integração com APIs de geolocalização e IoT",
      "Entrega de features end-to-end em ambiente de alta disponibilidade",
    ],
  },
  {
    period: "2022 — 2023",
    current: false,
    role: "Full Stack Developer",
    company: "Multiclínica",
    description:
      "Desenvolvimento de plataforma de gestão de pacientes, prontuários e faturamento. Implementação de soluções de pagamento que processaram mais de R$ 1,5 milhão em transações.",
    stack: ["React", "Node.js", "TypeScript", "PostgreSQL", "Stripe", "AWS"],
    highlights: [
      "Integração de gateway de pagamento com +R$1,0M processados",
      "Sistema de agendamento em tempo real com WebSockets",
      "Redução de 40% no tempo de atendimento via automação de prontuários",
    ],
  },
  {
    period: "2021 — 2022",
    current: false,
    role: "Full Stack Developer",
    company: "GCB",
    client: "Petrobras",
    description:
      "Desenvolvimento de sistemas internos de gestão operacional para a Petrobras via GCB. Foco em performance e confiabilidade de aplicações críticas de negócio.",
    stack: [".NET", "React", "SQL Server", "C#", "Azure DevOps"],
    highlights: [
      "Sistemas de relatórios operacionais para unidades offshore",
      "Otimização de queries SQL com redução de 60% no tempo de resposta",
      "Implementação de CI/CD com Azure DevOps",
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.3"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{
        padding: "100px 24px",
        position: "relative",
      }}
    >
      {/* Subtle separator */}
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
        {/* Section header */}
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
            Trajetória
          </span>
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
            Experiência{" "}
            <span style={{ color: "var(--color-teal)" }}>Profissional</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative", display: "flex", gap: "0" }}>
          {/* Vertical line track */}
          <div
            style={{
              position: "relative",
              width: "1px",
              flexShrink: 0,
              marginRight: "48px",
              marginLeft: "8px",
              background: "var(--color-border)",
              display: "none", // hidden on mobile, shown via inline media
            }}
            className="timeline-line-track"
          >
            {/* Animated fill */}
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: lineHeight,
                background:
                  "linear-gradient(to bottom, var(--color-teal), var(--color-teal-light))",
                boxShadow: "0 0 8px rgba(13,148,136,0.4)",
              }}
            />
          </div>

          {/* Entries */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
              flex: 1,
            }}
          >
            {experiences.map((exp, i) => (
              <ExperienceItem key={exp.company} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .timeline-line-track { display: block !important; }
        }
      `}</style>
    </section>
  );
}

function ExperienceItem({
  exp,
  index,
}: {
  exp: Experience;
  index: number;
}) {
  const isLast = index === experiences.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      }}
      style={{
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        gap: "32px",
        paddingBottom: isLast ? "0" : "56px",
        position: "relative",
      }}
      className="exp-item"
    >
      {/* Period column */}
      <div
        style={{
          paddingTop: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          alignItems: "flex-end",
        }}
        className="exp-period"
      >
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.75rem",
            color: "var(--color-muted)",
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          {exp.period}
        </span>
        {exp.current && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              fontFamily: "var(--font-inter)",
              fontSize: "0.6875rem",
              color: "var(--color-teal)",
              background: "rgba(13,148,136,0.1)",
              border: "1px solid rgba(13,148,136,0.25)",
              borderRadius: "4px",
              padding: "2px 7px",
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "var(--color-teal)",
              }}
            />
            atual
          </span>
        )}
      </div>

      {/* Content card */}
      <motion.div
        whileHover={{
          borderColor: "rgba(13,148,136,0.38)",
          boxShadow: "0 16px 48px rgba(13,148,136,0.07)",
          y: -3,
        }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
        className="exp-card"
        style={{
          background: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "16px",
          padding: "28px 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top teal accent bar */}
        {exp.current && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background:
                "linear-gradient(90deg, var(--color-teal), var(--color-teal-light), transparent)",
            }}
          />
        )}

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "8px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "6px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: "rgba(13,148,136,0.12)",
                  border: "1px solid rgba(13,148,136,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Briefcase size={13} color="var(--color-teal)" />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: 700,
                  fontSize: "1.0625rem",
                  color: "var(--color-text)",
                  letterSpacing: "-0.01em",
                }}
              >
                {exp.company}
              </span>
              {exp.client && (
                <>
                  <span
                    style={{
                      color: "var(--color-border)",
                      fontSize: "0.875rem",
                    }}
                  >
                    ×
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontWeight: 600,
                      fontSize: "1.0625rem",
                      color: "var(--color-teal)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {exp.client}
                  </span>
                </>
              )}
            </div>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.8125rem",
                color: "var(--color-muted)",
                fontWeight: 500,
                letterSpacing: "0.01em",
              }}
            >
              {exp.role}
            </p>
          </div>

          <ExternalLink
            size={14}
            color="var(--color-border)"
            style={{ flexShrink: 0, marginTop: "4px" }}
          />
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.875rem",
            color: "var(--color-muted)",
            lineHeight: 1.75,
            marginTop: "16px",
            marginBottom: "20px",
          }}
        >
          {exp.description}
        </p>

        {/* Highlights */}
        <ul
          className="exp-highlights"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "24px",
            paddingLeft: "0",
            listStyle: "none",
          }}
        >
          {exp.highlights.map((h, hi) => (
            <motion.li
              key={h}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: 0.4,
                delay: index * 0.08 + hi * 0.07,
                ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
              }}
              style={{
                display: "flex",
                gap: "10px",
                fontFamily: "var(--font-inter)",
                fontSize: "0.8125rem",
                color: "var(--color-muted)",
                lineHeight: 1.6,
              }}
            >
              <motion.span
                whileInView={{ color: "var(--color-teal)" }}
                style={{
                  color: "var(--color-teal)",
                  fontWeight: 700,
                  flexShrink: 0,
                  marginTop: "1px",
                }}
              >
                ↗
              </motion.span>
              {h}
            </motion.li>
          ))}
        </ul>

        {/* Stack tags */}
        <div className="exp-stack" style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {exp.stack.map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.6875rem",
                fontWeight: 500,
                color: "var(--color-muted)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--color-border)",
                borderRadius: "6px",
                padding: "3px 10px",
                letterSpacing: "0.02em",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 767px) {
          .exp-item { grid-template-columns: 1fr !important; gap: 12px !important; }
          .exp-period { align-items: flex-start !important; flex-direction: row !important; }
          .exp-card { padding: 20px 18px !important; }
          .exp-highlights { gap: 6px !important; }
          .exp-stack { gap: 4px !important; }
        }
        @media (max-width: 480px) {
          .exp-card { padding: 16px 14px !important; }
          #experience { padding: 64px 16px !important; }
        }
      `}</style>
    </motion.div>
  );
}
