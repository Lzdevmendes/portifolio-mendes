"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Smartphone, GitPullRequest } from "lucide-react";

const focusAreas = [
  {
    icon: <Code2 size={16} />,
    title: "Frontend",
    color: "#6366F1",
    techs: "React · Next.js · Flutter",
    desc: "Interfaces rápidas, acessíveis e com foco em experiência do usuário.",
  },
  {
    icon: <Server size={16} />,
    title: "Backend",
    color: "#0D9488",
    techs: "Node.js · .NET · Go",
    desc: "APIs escaláveis, arquitetura limpa e integrações robustas.",
  },
  {
    icon: <Smartphone size={16} />,
    title: "Mobile",
    color: "#00B4AB",
    techs: "Flutter · Dart",
    desc: "Apps multiplataforma com experiência nativa e fluida.",
  },
  {
    icon: <GitPullRequest size={16} />,
    title: "Colaboração",
    color: "#F59E0B",
    techs: "Git · PR Review · Orgs",
    desc: "Membro de 2 GitHub Organizations. Experiência com PR review, code review e versionamento colaborativo em times.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Background "SOBRE" text parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  // Right column subtle upward drift
  const rightY = useTransform(
    scrollYProgress,
    [0.05, 0.85],
    ["32px", "-32px"]
  );
  const rightOpacity = useTransform(scrollYProgress, [0.08, 0.28], [0, 1]);

  // Left heading scale on entry
  const leftOpacity = useTransform(scrollYProgress, [0.05, 0.22], [0, 1]);
  const leftY = useTransform(scrollYProgress, [0.05, 0.22], ["24px", "0px"]);

  return (
    <section
      ref={sectionRef}
      id="about-section"
      style={{
        position: "relative",
        padding: "140px 24px",
        overflow: "hidden",
      }}
    >
      {/* Top separator */}
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

      {/* Parallax background text */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "-1%",
          translateY: "-50%",
          y: bgY,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(7rem, 22vw, 18rem)",
            fontWeight: 800,
            color: "rgba(255,255,255,0.022)",
            letterSpacing: "-0.05em",
            lineHeight: 1,
            whiteSpace: "nowrap",
            display: "block",
          }}
        >
          SOBRE
        </span>
      </motion.div>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* ── LEFT: sticky panel ── */}
        <motion.div
          style={{
            position: "sticky",
            top: "120px",
            opacity: leftOpacity,
            y: leftY,
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
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            Sobre mim
          </span>

          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
              letterSpacing: "-0.035em",
              lineHeight: 1.0,
              color: "var(--color-text)",
              marginBottom: "28px",
            }}
          >
            Construindo o{" "}
            <span style={{ color: "var(--color-teal)" }}>futuro</span>
            <br />
            com código.
          </h2>

          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.9375rem",
              color: "var(--color-muted)",
              lineHeight: 1.8,
              maxWidth: "400px",
            }}
          >
            Full Stack Developer apaixonado por código limpo, boas práticas e
            experiências de usuário memoráveis. Atuo do frontend ao backend,
            entregando produtos completos com qualidade e atenção aos detalhes.
          </p>

          {/* Open to work badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "36px",
              padding: "12px 20px",
              borderRadius: "12px",
              background: "rgba(13,148,136,0.08)",
              border: "1px solid rgba(13,148,136,0.3)",
              boxShadow: "0 0 24px rgba(13,148,136,0.08)",
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1], scale: [1, 0.85, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--color-teal)",
                boxShadow: "0 0 10px rgba(13,148,136,0.9)",
                flexShrink: 0,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span
                style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  color: "var(--color-teal-light)",
                  letterSpacing: "-0.01em",
                }}
              >
                Disponível para contratações
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.75rem",
                  color: "var(--color-muted)",
                  lineHeight: 1.4,
                }}
              >
                Aberto a oportunidades CLT, PJ ou freelance
              </span>
            </div>
          </motion.div>

          {/* Decorative divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "32px",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                background:
                  "linear-gradient(90deg, var(--color-teal), var(--color-border))",
              }}
            />
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--color-teal)",
                boxShadow: "0 0 8px rgba(13,148,136,0.6)",
              }}
            />
          </div>

          {/* Mini stats */}
          <div
            style={{
              display: "flex",
              gap: "32px",
              marginTop: "32px",
              flexWrap: "wrap",
            }}
          >
            {[
              { n: "1,5+", l: "anos de exp." },
              { n: "3", l: "clientes reais" },
              { n: "10+", l: "projetos" },
            ].map((s) => (
              <div
                key={s.l}
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 800,
                    fontSize: "1.5rem",
                    color: "var(--color-text)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.n}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.75rem",
                    color: "var(--color-muted)",
                  }}
                >
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: scroll-linked content ── */}
        <motion.div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            y: rightY,
            opacity: rightOpacity,
          }}
        >
          {focusAreas.map((area, i) => (
            <FocusCard key={area.title} area={area} index={i} />
          ))}

          {/* Quote block */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.35,
              ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
            }}
            style={{
              margin: "8px 0 0",
              padding: "24px 28px",
              borderLeft: "2px solid var(--color-teal)",
              background: "var(--color-bg-card)",
              borderRadius: "0 12px 12px 0",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--color-text)",
                lineHeight: 1.6,
                letterSpacing: "-0.01em",
              }}
            >
              "Código bom não é o que funciona — é o que qualquer pessoa
              consegue entender e manter."
            </p>
            <footer
              style={{
                marginTop: "12px",
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                color: "var(--color-muted)",
              }}
            >
              — Luiz Mendes
            </footer>
          </motion.blockquote>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}

function FocusCard({
  area,
  index,
}: {
  area: (typeof focusAreas)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      }}
      whileHover={{ x: 4 }}
      style={{
        display: "flex",
        gap: "20px",
        padding: "24px",
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "16px",
        alignItems: "flex-start",
        transition: "border-color 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${area.color}40`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "var(--color-border)";
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: `${area.color}15`,
          border: `1px solid ${area.color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: area.color,
          flexShrink: 0,
        }}
      >
        {area.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "10px",
            marginBottom: "6px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: "0.9375rem",
              color: "var(--color-text)",
            }}
          >
            {area.title}
          </span>
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.6875rem",
              color: area.color,
              letterSpacing: "0.04em",
              background: `${area.color}12`,
              border: `1px solid ${area.color}25`,
              borderRadius: "4px",
              padding: "1px 7px",
            }}
          >
            {area.techs}
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.8125rem",
            color: "var(--color-muted)",
            lineHeight: 1.65,
          }}
        >
          {area.desc}
        </p>
      </div>

      {/* Arrow indicator */}
      <span
        style={{
          color: area.color,
          fontSize: "0.875rem",
          flexShrink: 0,
          opacity: 0.6,
          marginTop: "2px",
        }}
      >
        ↗
      </span>
    </motion.div>
  );
}
