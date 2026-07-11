"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const CONTACTS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/lzmendess",
    Icon: Linkedin,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Lzdevmendes",
    Icon: Github,
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:lzmendestechdev@gmail.com",
    Icon: Mail,
  },
];

export default function Maintenance() {
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(1.5rem, 5vw, 4rem)",
        overflow: "hidden",
        backgroundColor: "var(--color-bg)",
      }}
    >
      {/* Dot grid background */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at center, rgba(115,115,115,0.14) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, #000 30%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, #000 30%, transparent 78%)",
          pointerEvents: "none",
        }}
      />
      {/* Ambient blobs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-10%",
          right: "-8%",
          width: "clamp(300px, 45vw, 620px)",
          height: "clamp(300px, 45vw, 620px)",
          background:
            "radial-gradient(circle, rgba(13,148,136,0.18), transparent 68%)",
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-12%",
          left: "-10%",
          width: "clamp(280px, 42vw, 560px)",
          height: "clamp(280px, 42vw, 560px)",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.10), transparent 70%)",
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "620px",
          textAlign: "center",
        }}
      >
        {/* Brand mark */}
        <div
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: "1.5rem",
            letterSpacing: "0.02em",
            color: "var(--color-teal-light)",
            marginBottom: "2rem",
          }}
        >
          LM
        </div>

        {/* Status badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.55rem",
            padding: "0.4rem 0.9rem",
            border: "1px solid var(--color-border)",
            borderRadius: "999px",
            background: "rgba(22,22,22,0.6)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            marginBottom: "1.75rem",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "var(--color-teal-light)",
              animation: "pulse-dot 1.5s ease-in-out infinite",
            }}
          />
          Em manutenção
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 700,
            lineHeight: 1.08,
            fontSize: "clamp(2rem, 6vw, 3.4rem)",
            color: "var(--color-text)",
            marginBottom: "1.25rem",
          }}
        >
          Deixando tudo{" "}
          <span style={{ color: "var(--color-teal-light)" }}>ainda melhor.</span>
        </h1>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(1rem, 2.2vw, 1.125rem)",
            lineHeight: 1.65,
            color: "var(--color-muted)",
            maxWidth: "46ch",
            margin: "0 auto 0.5rem",
          }}
        >
          Estou trabalhando em uma nova versão do meu portfólio. Em breve ele
          estará no ar, com novos projetos e uma experiência renovada.
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--color-border)",
            letterSpacing: "0.03em",
            marginBottom: "2.5rem",
            filter: "brightness(1.7)",
          }}
        >
          Working on a fresh new version. Back soon.
        </p>

        {/* Contact links */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.75rem",
          }}
        >
          {CONTACTS.map(({ id, label, href, Icon }) => (
            <a
              key={id}
              href={href}
              target={id === "email" ? undefined : "_blank"}
              rel={id === "email" ? undefined : "noopener noreferrer"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                padding: "0.7rem 1.15rem",
                border: "1px solid var(--color-border)",
                borderRadius: "12px",
                background: "var(--color-bg-card)",
                color: "var(--color-text)",
                fontFamily: "var(--font-inter)",
                fontSize: "0.9rem",
                fontWeight: 500,
                transition: "border-color 0.25s var(--ease-smooth), color 0.25s",
              }}
            >
              <Icon size={17} strokeWidth={1.8} />
              {label}
            </a>
          ))}
        </div>

        {/* Footer */}
        <p
          style={{
            marginTop: "3rem",
            fontFamily: "var(--font-inter)",
            fontSize: "0.8rem",
            color: "var(--color-muted)",
            opacity: 0.7,
          }}
        >
          © {new Date().getFullYear()} Luiz Mendes · Brasil
        </p>
      </motion.div>
    </main>
  );
}
