"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Character3D = dynamic(() => import("./Character3DScene"), {
  ssr: false,
  loading: () => null,
});

const contentVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
};

const stats = [
  { value: "1.5+", label: "Anos de experiência" },
  { value: "$1.0M+", label: "Em pagamentos processados" },
  { value: "3", label: "Principais clientes" },
];

export default function Hero() {
  const [active, setActive] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glowX = useSpring(rawX, { stiffness: 40, damping: 16, mass: 0.8 });
  const glowY = useSpring(rawY, { stiffness: 40, damping: 16, mass: 0.8 });
  const ringX = useSpring(rawX, { stiffness: 220, damping: 24 });
  const ringY = useSpring(rawY, { stiffness: 220, damping: 24 });
  const headX = useTransform(rawX, [0, 1440], [-10, 10]);
  const headY = useTransform(rawY, [0, 900], [-6, 6]);

  // Scroll relativo ao hero: 0 quando o hero está no topo, 1 quando sai da tela
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set(e.clientX - r.left);
    rawY.set(e.clientY - r.top);
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Apresentação — Luiz Mendes, Desenvolvedor Full Stack"
      onMouseMove={isTouch ? undefined : onMove}
      onMouseEnter={isTouch ? undefined : () => setActive(true)}
      onMouseLeave={isTouch ? undefined : () => setActive(false)}
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#080a0e" }}
    >
      <style>{`
        @media (max-width: 480px) {
          .hero-heading { font-size: clamp(3.8rem, 18vw, 5.5rem) !important; }
          .hero-bottom { padding: 0 20px 56px !important; }
          .hero-badges-wrap { padding: 84px 20px 0 !important; }
          .hero-stats { gap: 24px !important; flex-wrap: wrap !important; }
          .hero-ctas { flex-direction: column !important; align-items: stretch !important; }
          .hero-ctas a { justify-content: center !important; }
          .hero-scroll-hint { display: none !important; }
          .hero-side-label { display: none !important; }
        }
        @media (max-width: 768px) {
          .hero-scroll-hint { bottom: 90px !important; }
          .hero-side-label { display: none !important; }
        }
        @media (max-width: 1023px) {
          .hero-left-grad { opacity: 0 !important; }
          .hero-bottom-grad { opacity: 1 !important; }
        }
      `}</style>

      {/* ── LAYER 0: 3D CHARACTER FULLSCREEN ── */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, zIndex: 0, height: "100%" }}
      >
        <Character3D scrollProgress={scrollYProgress} />
      </div>

      {/* ── Grid texture ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          pointerEvents: "none",
        }}
      />

      {/* ── Left gradient: legibilidade do texto (desktop) ── */}
      <div
        className="hero-left-grad"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "linear-gradient(100deg, rgba(8,10,14,0.95) 0%, rgba(8,10,14,0.82) 28%, rgba(8,10,14,0.42) 52%, rgba(8,10,14,0.08) 70%, transparent 84%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Bottom gradient: sempre visível ── */}
      <div
        className="hero-bottom-grad"
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60%",
          zIndex: 2,
          background:
            "linear-gradient(to top, rgba(8,10,14,0.96) 0%, rgba(8,10,14,0.72) 35%, rgba(8,10,14,0.2) 65%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Teal glow orb ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "640px",
          height: "640px",
          background: "radial-gradient(circle, rgba(13,148,136,0.14) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(56px)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* ── Mouse spotlight ── */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: active && !isTouch ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute",
          left: glowX,
          top: glowY,
          translateX: "-50%",
          translateY: "-50%",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(13,148,136,0.11) 0%, rgba(13,148,136,0.03) 45%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 4,
        }}
      />

      {/* ── Cursor ring ── */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: active && !isTouch ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          left: ringX,
          top: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1.5px solid rgba(13,148,136,0.5)",
          pointerEvents: "none",
          zIndex: 55,
        }}
      />

      {/* ── Cursor dot ── */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: active && !isTouch ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        style={{
          position: "absolute",
          left: rawX,
          top: rawY,
          translateX: "-50%",
          translateY: "-50%",
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "var(--color-teal)",
          boxShadow: "0 0 8px rgba(13,148,136,0.9)",
          pointerEvents: "none",
          zIndex: 56,
        }}
      />

      {/* ── CONTEÚDO ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Topo: badges de disponibilidade */}
        <motion.div
          className="hero-badges-wrap"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{
            paddingTop: "108px",
            paddingLeft: "48px",
            paddingRight: "48px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "9999px",
              background: "rgba(13,148,136,0.13)",
              border: "1px solid rgba(13,148,136,0.38)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              color: "var(--color-teal-light)",
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 600,
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
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "var(--color-muted)",
            }}
          >
            <Briefcase size={11} />
            Disponível imediatamente
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              color: "var(--color-muted)",
              opacity: 0.7,
            }}
          >
            <MapPin size={11} />
            Brasil
          </span>
        </motion.div>

        {/* Espaço — 3D preenche essa área */}
        <div style={{ flex: 1 }} />

        {/* Rodapé: conteúdo editorial principal */}
        <motion.div
          className="hero-bottom"
          variants={contentVariants}
          initial="hidden"
          animate="show"
          style={{ padding: "0 48px 72px", maxWidth: "740px" }}
        >
          {/* Título principal */}
          <motion.h1
            className="hero-heading"
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              color: "var(--color-text)",
              fontSize: "clamp(4.5rem, 11vw, 9.5rem)",
              marginBottom: "24px",
              x: headX,
              y: headY,
            }}
          >
            Luiz
            <br />
            <span style={{ color: "var(--color-teal)" }}>Mendes</span>
          </motion.h1>

          {/* Linha de cargo */}
          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "14px",
              marginBottom: "14px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 600,
                fontSize: "clamp(0.9rem, 1.6vw, 1.2rem)",
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
                gap: "6px",
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
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(0.82rem, 1.2vw, 0.9375rem)",
              color: "var(--color-muted)",
              lineHeight: 1.7,
              maxWidth: "440px",
              marginBottom: "26px",
              opacity: 0.8,
            }}
          >
            React, Next.js, Flutter · Node.js, .NET, Go ·{" "}
            <span style={{ color: "var(--color-teal-light)", fontWeight: 600 }}>$1.0M+</span>
            {" "}em soluções de pagamento.
            <br />
            Obracon (Sabesp) · Multiclínica · GCB (Petrobras).
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="hero-ctas"
            variants={itemVariants}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "14px",
              marginBottom: "36px",
            }}
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
            className="hero-stats"
            variants={itemVariants}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "36px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {stats.map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 700,
                    fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)",
                    color: "var(--color-text)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.7rem",
                    color: "var(--color-muted)",
                    opacity: 0.7,
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Label lateral: "role para interagir" (vertical, desktop) ── */}
      <motion.div
        className="hero-side-label"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        style={{
          position: "absolute",
          right: "26px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          fontFamily: "var(--font-inter)",
          fontSize: "0.625rem",
          color: "var(--color-muted)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          writingMode: "vertical-rl",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      >
        <span style={{ width: "1px", height: "32px", background: "rgba(255,255,255,0.12)", display: "inline-block" }} />
        role para interagir
        <span style={{ width: "1px", height: "32px", background: "rgba(255,255,255,0.12)", display: "inline-block" }} />
      </motion.div>

      {/* ── Indicador de scroll ── */}
      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.625rem",
            color: "var(--color-muted)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.45,
          }}
        >
          rolar
        </span>
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "38px",
            background: "linear-gradient(to bottom, var(--color-teal), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}

/* ─── Sub-components ─────────────────────────────────── */

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
