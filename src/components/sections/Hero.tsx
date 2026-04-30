"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { memo, useEffect, useState } from "react";

// ─── Syntax-highlighted code lines ───────────────────────────────────────────
type Token = { t: string; c: string };
type CodeLine = { n: number; tokens: Token[] };

const CODE: CodeLine[] = [
  { n: 1, tokens: [{ t: "const ", c: "#C678DD" }, { t: "dev", c: "#E5C07B" }, { t: " = {", c: "#ABB2BF" }] },
  { n: 2, tokens: [{ t: "  name", c: "#E06C75" }, { t: ": ", c: "#ABB2BF" }, { t: '"Luiz Mendes"', c: "#98C379" }, { t: ",", c: "#ABB2BF" }] },
  { n: 3, tokens: [{ t: "  role", c: "#E06C75" }, { t: ": ", c: "#ABB2BF" }, { t: '"Full Stack Dev"', c: "#98C379" }, { t: ",", c: "#ABB2BF" }] },
  { n: 4, tokens: [{ t: "  from", c: "#E06C75" }, { t: ": ", c: "#ABB2BF" }, { t: '"Brasil 🇧🇷"', c: "#98C379" }, { t: ",", c: "#ABB2BF" }] },
  { n: 5, tokens: [{ t: "  stack", c: "#E06C75" }, { t: ": [", c: "#ABB2BF" }] },
  { n: 6, tokens: [{ t: '    "React"', c: "#98C379" }, { t: ", ", c: "#ABB2BF" }, { t: '"Next.js"', c: "#98C379" }, { t: ",", c: "#ABB2BF" }] },
  { n: 7, tokens: [{ t: '    "Flutter"', c: "#98C379" }, { t: ", ", c: "#ABB2BF" }, { t: '"Node.js"', c: "#98C379" }, { t: ",", c: "#ABB2BF" }] },
  { n: 8, tokens: [{ t: '    ".NET"', c: "#98C379" }, { t: ", ", c: "#ABB2BF" }, { t: '"Go"', c: "#98C379" }] },
  { n: 9, tokens: [{ t: "  ],", c: "#ABB2BF" }] },
  { n: 10, tokens: [{ t: "  payments", c: "#E06C75" }, { t: ": ", c: "#ABB2BF" }, { t: '"$1.0M+"', c: "#14B8A6" }, { t: ",", c: "#ABB2BF" }] },
  { n: 11, tokens: [{ t: "  status", c: "#E06C75" }, { t: ": ", c: "#ABB2BF" }, { t: '"available"', c: "#14B8A6" }, { t: "  // 🟢", c: "#5C6370" }] },
  { n: 12, tokens: [{ t: "};", c: "#ABB2BF" }] },
];

const TECH_CHIPS = ["React", "Next.js", "TypeScript", "Flutter", "Node.js", ".NET", "Go", "AWS", "Docker", "PostgreSQL"];

const STATS = [
  { value: "1.5+", label: "Anos de experiência" },
  { value: "$1M+", label: "Em pagamentos" },
  { value: "3", label: "Grandes clientes" },
];

// ─── Animation presets ────────────────────────────────────────────────────────
const ease = [0.4, 0, 0.2, 1] as [number, number, number, number];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Apresentação — Luiz Mendes, Desenvolvedor Full Stack"
      style={{ position: "relative", minHeight: "100vh", background: "#080a0e", overflow: "hidden" }}
    >
      <HeroBackground />

      <div
        className="hero-layout"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 48px",
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "72px",
          alignItems: "center",
          position: "relative",
          zIndex: 5,
        }}
      >
        {/* ── Left: text content ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ display: "flex", flexDirection: "column", paddingTop: "96px", paddingBottom: "96px" }}
        >
          {/* Status badges */}
          <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "5px 13px",
                borderRadius: "9999px",
                background: "rgba(13,148,136,0.12)",
                border: "1px solid rgba(13,148,136,0.35)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                fontFamily: "var(--font-inter)",
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "var(--color-teal-light)",
                letterSpacing: "0.04em",
              }}
            >
              <PulseDot />
              Disponível para Trabalho
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "5px 11px",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.07)",
                fontFamily: "var(--font-inter)",
                fontSize: "0.72rem",
                fontWeight: 500,
                color: "var(--color-muted)",
              }}
            >
              <MapPin size={10} />
              Brasil
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(3.6rem, 7vw, 6.5rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              color: "var(--color-text)",
              marginBottom: "20px",
            }}
          >
            Luiz
            <br />
            <span style={{ color: "var(--color-teal)" }}>Mendes</span>
          </motion.h1>

          {/* Role + level */}
          <motion.div
            variants={fadeUp}
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "18px" }}
          >
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 600,
                fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
                color: "var(--color-muted)",
                letterSpacing: "-0.01em",
              }}
            >
              Desenvolvedor Full Stack
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "3px 10px",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.08)",
                fontFamily: "var(--font-inter)",
                fontSize: "0.7rem",
                fontWeight: 500,
                color: "var(--color-muted)",
                letterSpacing: "0.04em",
              }}
            >
              <span style={{ color: "var(--color-teal)", fontWeight: 700 }}>Júnior</span>
              <span style={{ opacity: 0.35 }}>→</span>
              <span style={{ color: "var(--color-teal-light)", fontWeight: 700 }}>Pleno</span>
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(0.83rem, 1.2vw, 0.9375rem)",
              color: "var(--color-muted)",
              lineHeight: 1.75,
              maxWidth: "430px",
              marginBottom: "30px",
              opacity: 0.85,
            }}
          >
            React, Next.js, Flutter · Node.js, .NET, Go ·{" "}
            <span style={{ color: "var(--color-teal-light)", fontWeight: 600 }}>$1.0M+</span>{" "}
            em soluções de pagamento.
            <br />
            Obracon (Sabesp) · Multiclínica · GCB (Petrobras).
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="hero-ctas"
            style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "40px" }}
          >
            <PrimaryButton href="#projects">
              Ver Projetos <ArrowRight size={13} />
            </PrimaryButton>
            <GhostButton href="https://github.com/Lzdevmendes">
              <GitHubIcon /> GitHub
            </GhostButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="hero-stats"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "32px",
              paddingTop: "28px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {STATS.map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 700,
                    fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                    color: "var(--color-text)",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.7rem",
                    color: "var(--color-muted)",
                    opacity: 0.65,
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: terminal + tech chips ── */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 36, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.5, ease }}
          style={{ display: "flex", flexDirection: "column", gap: "18px", paddingTop: "96px", paddingBottom: "96px" }}
        >
          <CodeTerminal />
          <TechChips />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.6rem",
            color: "var(--color-muted)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.4,
          }}
        >
          rolar
        </span>
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "36px",
            background: "linear-gradient(to bottom, var(--color-teal), transparent)",
          }}
        />
      </motion.div>

      <style>{`
        @media (max-width: 920px) {
          .hero-layout {
            grid-template-columns: 1fr !important;
            padding: 0 24px !important;
            gap: 0 !important;
          }
          .hero-right { display: none !important; }
          .hero-scroll { display: none !important; }
        }
        @media (max-width: 480px) {
          .hero-layout { padding: 0 20px !important; }
          .hero-ctas { flex-direction: column !important; }
          .hero-ctas a { justify-content: center !important; }
          .hero-stats { gap: 20px !important; }
        }
      `}</style>
    </section>
  );
}

// ─── Background ───────────────────────────────────────────────────────────────
function HeroBackground() {
  return (
    <>
      {/* Dot grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Teal glow — right side */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "15%",
          right: "5%",
          width: "620px",
          height: "620px",
          background: "radial-gradient(circle, rgba(13,148,136,0.13) 0%, transparent 68%)",
          borderRadius: "50%",
          filter: "blur(48px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Subtle purple glow — bottom left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Bottom page-transition fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "25%",
          background: "linear-gradient(to top, #080a0e 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    </>
  );
}

// ─── Code terminal ────────────────────────────────────────────────────────────
function CodeTerminal() {
  const [visible, setVisible] = useState(0);
  const [blink, setBlink] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setVisible(i);
      if (i >= CODE.length) {
        clearInterval(iv);
        setDone(true);
      }
    }, 105);
    const blinkIv = setInterval(() => setBlink((b) => !b), 520);
    return () => {
      clearInterval(iv);
      clearInterval(blinkIv);
    };
  }, []);

  return (
    <div
      style={{
        background: "rgba(13,17,23,0.94)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "14px",
        overflow: "hidden",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04), 0 0 40px rgba(13,148,136,0.06)",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 14px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(255,255,255,0.02)",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          {(["#FF5F57", "#FFBD2E", "#28C840"] as string[]).map((color) => (
            <div key={color} style={{ width: "10px", height: "10px", borderRadius: "50%", background: color, opacity: 0.9 }} />
          ))}
        </div>
        <span
          style={{
            flex: 1,
            textAlign: "center",
            fontFamily: "var(--font-inter)",
            fontSize: "0.6875rem",
            color: "rgba(255,255,255,0.28)",
            letterSpacing: "0.02em",
          }}
        >
          developer.ts
        </span>
        <div style={{ width: "42px" }} />
      </div>

      {/* Code area */}
      <div style={{ padding: "14px 0 14px", minHeight: "256px" }}>
        {CODE.map((line, i) => (
          <div
            key={line.n}
            style={{
              display: "flex",
              padding: "1px 0",
              opacity: i < visible ? 1 : 0,
              transform: i < visible ? "none" : "translateY(3px)",
              transition: "opacity 0.22s, transform 0.22s",
            }}
          >
            {/* Line number */}
            <span
              style={{
                width: "38px",
                minWidth: "38px",
                textAlign: "right",
                paddingRight: "16px",
                fontFamily: "Consolas, 'Courier New', monospace",
                fontSize: "0.6875rem",
                color: "rgba(255,255,255,0.14)",
                userSelect: "none",
                lineHeight: "1.7",
                flexShrink: 0,
              }}
            >
              {line.n}
            </span>

            {/* Tokens */}
            <span style={{ fontFamily: "Consolas, 'Courier New', monospace", fontSize: "0.8rem", lineHeight: 1.7 }}>
              {line.tokens.map((tk, j) => (
                <span key={j} style={{ color: tk.c }}>{tk.t}</span>
              ))}
              {/* Cursor on last visible line */}
              {i === visible - 1 && !done && (
                <span
                  style={{
                    display: "inline-block",
                    width: "2px",
                    height: "13px",
                    background: "#14B8A6",
                    marginLeft: "1px",
                    verticalAlign: "text-bottom",
                    opacity: blink ? 1 : 0,
                    transition: "opacity 0.08s",
                  }}
                />
              )}
            </span>
          </div>
        ))}

        {/* Terminal prompt after done */}
        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 0 0 38px",
              fontFamily: "Consolas, 'Courier New', monospace",
              fontSize: "0.8rem",
            }}
          >
            <span style={{ color: "#14B8A6" }}>❯</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>Pronto para colaborar</span>
            <span
              style={{
                display: "inline-block",
                width: "7px",
                height: "14px",
                background: "#14B8A6",
                opacity: blink ? 0.9 : 0,
                transition: "opacity 0.08s",
              }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Tech chips ───────────────────────────────────────────────────────────────
function TechChips() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
      {TECH_CHIPS.map((name, i) => (
        <motion.span
          key={name}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4 + i * 0.055, duration: 0.35, ease }}
          whileHover={{ scale: 1.06, borderColor: "rgba(13,148,136,0.5)", color: "var(--color-teal-light)" }}
          style={{
            padding: "4px 11px",
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.08)",
            fontFamily: "var(--font-inter)",
            fontSize: "0.72rem",
            fontWeight: 500,
            color: "var(--color-muted)",
            cursor: "default",
            transition: "border-color 0.2s, color 0.2s",
          }}
        >
          {name}
        </motion.span>
      ))}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
const PulseDot = memo(function PulseDot() {
  return (
    <motion.span
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      style={{
        display: "inline-block",
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: "var(--color-teal)",
        flexShrink: 0,
      }}
    />
  );
});

const PrimaryButton = memo(function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "11px 22px",
        borderRadius: "9999px",
        background: "var(--color-teal)",
        color: "#fff",
        fontFamily: "var(--font-inter)",
        fontSize: "0.875rem",
        fontWeight: 500,
        cursor: "pointer",
        textDecoration: "none",
      }}
    >
      {children}
    </motion.a>
  );
});

const GhostButton = memo(function GhostButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03, y: -1, borderColor: "#0D9488", color: "#14B8A6" }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "11px 22px",
        borderRadius: "9999px",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "var(--color-muted)",
        fontFamily: "var(--font-inter)",
        fontSize: "0.875rem",
        fontWeight: 500,
        cursor: "pointer",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        textDecoration: "none",
      }}
    >
      {children}
    </motion.a>
  );
});

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
