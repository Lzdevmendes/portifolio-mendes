"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, LucideGithub, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.35,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
};

const stats = [
  { value: "1,5+", label: "Anos de experiência" },
  { value: "R$1.0M+", label: "Em pagamentos processados" },
  { value: "3", label: "Grandes clientes" },
];

export default function Hero() {
  const [active, setActive] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Raw mouse position (instantaneous)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spotlight: slow, dreamy lag
  const glowX = useSpring(rawX, { stiffness: 40, damping: 16, mass: 0.8 });
  const glowY = useSpring(rawY, { stiffness: 40, damping: 16, mass: 0.8 });

  // Cursor ring: snappy but still smooth
  const ringX = useSpring(rawX, { stiffness: 220, damping: 24 });
  const ringY = useSpring(rawY, { stiffness: 220, damping: 24 });

  // Subtle parallax on heading (±12px)
  const headX = useTransform(rawX, [0, 1440], [-12, 12]);
  const headY = useTransform(rawY, [0, 900], [-8, 8]);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set(e.clientX - r.left);
    rawY.set(e.clientY - r.top);
  }

  return (
    <section
      id="about"
      onMouseMove={isTouch ? undefined : onMove}
      onMouseEnter={isTouch ? undefined : () => setActive(true)}
      onMouseLeave={isTouch ? undefined : () => setActive(false)}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 24px",
        overflow: "hidden",
        cursor: isTouch ? "auto" : "none",
      }}
    >
      <style>{`
        @media (max-width: 480px) {
          .hero-content { padding-top: 80px !important; padding-bottom: 48px !important; }
          .hero-stats { gap: 24px !important; }
          .hero-ctas { flex-direction: column !important; align-items: flex-start !important; }
          .hero-ctas a { width: 100%; justify-content: center; }
        }
      `}</style>
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--color-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          opacity: 0.2,
          pointerEvents: "none",
        }}
      />

      {/* Teal orb — top right */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-8%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(13,148,136,0.18) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(48px)",
          pointerEvents: "none",
        }}
      />

      {/* Teal orb — bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: "-5%",
          left: "-5%",
          width: "380px",
          height: "380px",
          background:
            "radial-gradient(circle, rgba(13,148,136,0.09) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(64px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Mouse spotlight glow ── (hidden on touch) */}
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
          width: "750px",
          height: "750px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(13,148,136,0.14) 0%, rgba(13,148,136,0.04) 45%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Cursor ring ── (hidden on touch) */}
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
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          border: "1.5px solid rgba(13,148,136,0.65)",
          pointerEvents: "none",
          zIndex: 50,
        }}
      />

      {/* ── Cursor dot ── (hidden on touch) */}
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
          boxShadow: "0 0 8px rgba(13,148,136,0.8)",
          pointerEvents: "none",
          zIndex: 51,
        }}
      />

      {/* Content */}
      <div
        className="hero-content"
        style={{
          position: "relative",
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
          paddingTop: "96px",
          paddingBottom: "64px",
        }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ display: "flex", flexDirection: "column", gap: "28px" }}
        >
          {/* Availability badge */}
          <motion.div
            variants={item}
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "9999px",
                background: "rgba(13,148,136,0.1)",
                border: "1px solid rgba(13,148,136,0.3)",
                color: "var(--color-teal-light)",
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              <PulseDot />
              Disponível para projetos
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                color: "var(--color-muted)",
              }}
            >
              <MapPin size={11} />
              Brasil
            </span>
          </motion.div>

          {/* Main heading — parallax on mouse move */}
          <motion.h1
            variants={item}
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
              color: "var(--color-text)",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              x: headX,
              y: headY,
            }}
          >
            Luiz
            <br />
            <span style={{ color: "var(--color-teal)" }}>Mendes</span>
          </motion.h1>

          {/* Role pills */}
          <motion.div
            variants={item}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <RolePill>Full Stack Developer</RolePill>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "9999px",
                border: "1px solid var(--color-border)",
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "var(--color-muted)",
                letterSpacing: "0.04em",
              }}
            >
              <span style={{ color: "var(--color-teal)", fontWeight: 700 }}>Junior</span>
              <span style={{ opacity: 0.4 }}>→</span>
              <span style={{ color: "var(--color-teal-light)", fontWeight: 700 }}>Pleno</span>
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={item}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(0.9rem, 1.4vw, 1.0625rem)",
              color: "var(--color-muted)",
              lineHeight: 1.75,
              maxWidth: "520px",
            }}
          >
            Desenvolvedor Full Stack com foco em{" "}
            <Highlight>React, Next.js e Flutter</Highlight> no frontend e{" "}
            <Highlight>Node.js, .NET e Go</Highlight> no backend. Mais de{" "}
            <span
              style={{
                color: "var(--color-teal-light)",
                fontWeight: 600,
              }}
            >
              R$&nbsp;1,0 milhão
            </span>{" "}
            processados em soluções de pagamento. Obracon (Sabesp), Multiclínica, GCB (Petrobras).
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="hero-ctas"
            variants={item}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "16px",
              paddingTop: "4px",
            }}
          >
            <PrimaryButton href="#projects">
              Ver Projetos <ArrowRight size={14} />
            </PrimaryButton>
            <GhostButton href="https://github.com/Lzdevmendes">
              <LucideGithub size={14} /> GitHub
            </GhostButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="hero-stats"
            variants={item}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "40px",
              paddingTop: "32px",
              borderTop: "1px solid var(--color-border)",
              marginTop: "4px",
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 700,
                    fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
                    color: "var(--color-text)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.8125rem",
                    color: "var(--color-muted)",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.6875rem",
            color: "var(--color-muted)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "36px",
            background:
              "linear-gradient(to bottom, var(--color-teal), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}

function PulseDot() {
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
}

function RolePill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-syne)",
        fontWeight: 600,
        fontSize: "clamp(0.95rem, 2vw, 1.375rem)",
        color: "var(--color-muted)",
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </span>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ color: "var(--color-text)", fontWeight: 500 }}>
      {children}
    </span>
  );
}

function PrimaryButton({
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
        padding: "12px 24px",
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
}

function GhostButton({
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
        padding: "12px 24px",
        borderRadius: "9999px",
        border: "1px solid var(--color-border)",
        color: "var(--color-muted)",
        fontFamily: "var(--font-inter)",
        fontSize: "0.875rem",
        fontWeight: 500,
        cursor: "pointer",
      }}
    >
      {children}
    </motion.a>
  );
}
