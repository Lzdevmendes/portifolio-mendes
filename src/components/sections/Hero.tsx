"use client";

import { m, animate, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/language";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { EASE, prefersReducedMotion } from "@/lib/motion";
import { HERO_CODE, HERO_TECH_CHIPS, HERO_STATS } from "@/data/profile";

gsap.registerPlugin(SplitText);

// ─── Animation presets ────────────────────────────────────────────────────────
const ease = EASE.out;

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
  const { lang } = useLanguage();
  const [isDesktop, setIsDesktop] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 920);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  /*
   * SplitText no headline — dono: GSAP (não Framer). Reveal caractere a
   * caractere, timed pra entrar junto com o resto do stagger do Framer
   * (badges → nome → cargo → bio → CTAs → stats). Ver agent/CONTEXT.md §14.
   */
  useGSAP(
    () => {
      if (!headlineRef.current) return;

      if (prefersReducedMotion()) {
        gsap.set(headlineRef.current, { opacity: 1 });
        return;
      }

      const split = SplitText.create(headlineRef.current, { type: "chars" });
      gsap.from(split.chars, {
        yPercent: 110,
        opacity: 0,
        duration: 0.8,
        delay: 0.32,
        ease: "power4.out",
        stagger: 0.02,
      });

      return () => split.revert();
    },
    { scope: headlineRef }
  );

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (!glowRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glowRef.current.style.background = `radial-gradient(600px circle at ${x}% ${y}%, rgba(13,148,136,0.10), transparent 70%)`;
  }

  function onMouseLeave() {
    if (!glowRef.current) return;
    glowRef.current.style.background = "transparent";
  }

  return (
    <section
      id="hero"
      aria-label="Apresentação — Luiz Mendes, Desenvolvedor Full Stack"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ position: "relative", minHeight: "100vh", background: "#080a0e", overflow: "hidden" }}
    >
      {/* Mouse-tracking glow overlay */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
          transition: "background 0.35s ease",
        }}
      />

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
        <m.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ display: "flex", flexDirection: "column", paddingTop: "96px", paddingBottom: "96px" }}
        >
          {/* Status badges */}
          <m.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "5px 13px",
                borderRadius: "9999px",
                background: "rgba(13,148,136,0.14)",
                border: "1px solid rgba(13,148,136,0.35)",
                fontFamily: "var(--font-inter)",
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "var(--color-teal-light)",
                letterSpacing: "0.04em",
              }}
            >
              <PulseDot />
              {lang === "pt" ? "Disponível para Trabalho" : "Open to Work"}
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
          </m.div>

          {/* Name — dono do reveal: GSAP SplitText, não Framer (data-anim="gsap") */}
          <h1
            ref={headlineRef}
            data-anim="gsap"
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(3.6rem, 7vw, 6.5rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              color: "var(--color-text)",
              marginBottom: "20px",
              opacity: 0,
            }}
          >
            Luiz
            <br />
            <span style={{ color: "var(--color-teal)" }}>Mendes</span>
          </h1>

          {/* Role + level */}
          <m.div
            variants={fadeUp}
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "18px" }}
          >
            <TitleBracket />
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
          </m.div>

          {/* Bio */}
          <m.p
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
            {lang === "pt"
              ? "apps web e mobile para infraestrutura, óleo & gás e saúde ·"
              : "web and mobile apps for infrastructure, oil & gas and healthcare ·"}{" "}
            <span style={{ color: "var(--color-teal-light)", fontWeight: 600 }}>+90 POIs</span>{" "}
            {lang === "pt" ? "mapeados no Litoral na Palma." : "mapped on Litoral na Palma."}{" "}
            UI/UX · Design Systems.
            <br />
            Obracon (Sabesp) · GCB (Petrobras) · Litoral na Palma.
          </m.p>

          {/* CTAs */}
          <m.div
            variants={fadeUp}
            className="hero-ctas"
            style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "40px" }}
          >
            <PrimaryButton href="#projects">
              {lang === "pt" ? "Ver Projetos" : "View Projects"} <ArrowRight size={13} />
            </PrimaryButton>
            <GhostButton href="https://github.com/Lzdevmendes">
              <GitHubIcon /> GitHub
            </GhostButton>
          </m.div>

          {/* Stats */}
          <m.div
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
            {HERO_STATS[lang].map((s) => (
              <AnimatedStat key={s.label} {...s} />
            ))}
          </m.div>
        </m.div>

        {/* ── Right: terminal + tech chips (desktop only — avoids JS timers on mobile) ── */}
        {isDesktop && (
          <m.div
            className="hero-right"
            initial={{ opacity: 0, x: 36, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.5, ease }}
            style={{ display: "flex", flexDirection: "column", gap: "18px", paddingTop: "96px", paddingBottom: "96px" }}
          >
            <CodeTerminal />
            <TechChips />
          </m.div>
        )}
      </div>

      {/* Scroll indicator */}
      <m.div
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
          {lang === "pt" ? "rolar" : "scroll"}
        </span>
        <m.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "36px",
            background: "linear-gradient(to bottom, var(--color-teal), transparent)",
          }}
        />
      </m.div>

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

// ─── Title bracket animation ─────────────────────────────────────────────────
function TitleBracket() {
  const { lang } = useLanguage();
  const words = lang === "pt" ? ["Desenvolvedor", "Full Stack"] : ["Developer", "Full Stack"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap" }}>
      {words.map((word, i) => {
        const isActive = active === i;
        return (
          <div
            key={word}
            onClick={() => setActive(i)}
            style={{ position: "relative", padding: "6px 14px", cursor: "pointer" }}
          >
            <AnimatePresence>
              {isActive && (
                <m.div
                  layoutId="title-bracket"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75, ease: [0.77, 0, 0.175, 1] }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    border: "1.5px solid var(--color-teal)",
                    borderRadius: "6px",
                    boxShadow: "0 0 18px rgba(13,148,136,0.22)",
                    pointerEvents: "none",
                  }}
                />
              )}
            </AnimatePresence>
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 700,
                fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
                color: isActive ? "var(--color-teal-light)" : "var(--color-muted)",
                filter: isActive ? "blur(0px)" : "blur(4px)",
                transition: "filter 1.5s ease, color 0.5s ease",
                display: "block",
                position: "relative",
                zIndex: 1,
                userSelect: "none",
              }}
            >
              {word}
            </span>
          </div>
        );
      })}
    </div>
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
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(0);
  const [blink, setBlink] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setVisible(i);
      if (i >= HERO_CODE.length) {
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
        {HERO_CODE.map((line, i) => (
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
          <m.div
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
            <span style={{ color: "rgba(255,255,255,0.3)" }}>{lang === "pt" ? "Pronto para colaborar" : "Ready to collaborate"}</span>
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
          </m.div>
        )}
      </div>
    </div>
  );
}

// ─── Tech chips ───────────────────────────────────────────────────────────────
function TechChips() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
      {HERO_TECH_CHIPS.map((name, i) => (
        <m.span
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
        </m.span>
      ))}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
const PulseDot = memo(function PulseDot() {
  return (
    <span
      style={{
        display: "inline-block",
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: "var(--color-teal)",
        flexShrink: 0,
        animation: "pulse-dot 1.5s ease-in-out infinite",
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
    <m.a
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
    </m.a>
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
    <m.a
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
        textDecoration: "none",
      }}
    >
      {children}
    </m.a>
  );
});

function AnimatedStat({
  end,
  decimals,
  prefix,
  suffix,
  label,
}: {
  end: number;
  decimals: number;
  prefix: string;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, end, {
      duration: 1.6,
      ease: [0.25, 0, 0, 1],
      delay: 0.2,
      onUpdate(v) {
        setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`);
      },
    });
    return controls.stop;
  }, [isInView, end, decimals, prefix, suffix]);

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
          color: "var(--color-teal-light)",
          letterSpacing: "-0.02em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {display}
      </span>
      <span
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.7rem",
          color: "var(--color-muted)",
          opacity: 0.65,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
