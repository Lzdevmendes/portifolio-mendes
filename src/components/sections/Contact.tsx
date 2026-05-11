"use client";

import { motion } from "framer-motion";
import { Mail, FileText, ArrowUpRight } from "lucide-react";
import { memo } from "react";
import { useLanguage } from "@/contexts/language";
import type { Lang } from "@/contexts/language";

const ease = [0.4, 0, 0.2, 1] as [number, number, number, number];

const CONTACT_T: Record<Lang, {
  label: string;
  heading: string;
  headingAccent: string;
  tagline: string;
  download: string;
}> = {
  pt: {
    label: "Contato",
    heading: "Vamos",
    headingAccent: "conversar?",
    tagline: "Aberto a novos projetos, colaborações e oportunidades.",
    download: "Baixar Currículo (PDF)",
  },
  en: {
    label: "Contact",
    heading: "Let's",
    headingAccent: "talk?",
    tagline: "Open to new projects, collaborations and opportunities.",
    download: "Download Resume (PDF)",
  },
};

function IconLinkedin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconGithub() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const CHANNELS = [
  {
    id: "email",
    Icon: Mail,
    label: "Email",
    handle: "lzmendestechdev\n@gmail.com",
    href: "mailto:lzmendestechdev@gmail.com",
    color: "#0D9488",
    external: false,
  },
  {
    id: "linkedin",
    Icon: IconLinkedin,
    label: "LinkedIn",
    handle: "/in/lzmendess",
    href: "https://linkedin.com/in/lzmendess",
    color: "#0A66C2",
    external: true,
  },
  {
    id: "github",
    Icon: IconGithub,
    label: "GitHub",
    handle: "Lzdevmendes",
    href: "https://github.com/Lzdevmendes",
    color: "#A8B3CF",
    external: true,
  },
] as const;

export default function Contact() {
  const { lang } = useLanguage();
  const t = CONTACT_T[lang];

  return (
    <section
      id="contact"
      aria-label={t.label}
      style={{ padding: "100px 24px 120px", position: "relative", overflow: "hidden" }}
    >
      {/* Top separator */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(1280px, 100%)",
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--color-border), transparent)",
        }}
      />

      {/* Ambient radial glow — centered behind the heading */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(13,148,136,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── All content centered ── */}
      <div style={{ maxWidth: "720px", margin: "0 auto", position: "relative" }}>

        {/* Section label with flanking lines */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, var(--color-border))" }} />
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "var(--color-teal)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            {t.label}
          </span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, var(--color-border))" }} />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.08, ease }}
          className="contact-heading"
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
            color: "var(--color-text)",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          {t.heading}{" "}
          <span
            style={{
              color: "var(--color-teal)",
              display: "inline-block",
            }}
          >
            {t.headingAccent}
          </span>
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.16, ease }}
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.9375rem",
            color: "var(--color-muted)",
            lineHeight: 1.7,
            textAlign: "center",
            marginBottom: "56px",
          }}
        >
          {t.tagline}
        </motion.p>

        {/* ── Channel cards — centered row ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          {CHANNELS.map((ch) => (
            <ChannelCard key={ch.id} channel={ch} />
          ))}
        </motion.div>

        {/* ── CV download — centered ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.32, ease }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <motion.a
            href="/cv_luizmendes.pdf"
            download
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18, ease }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              padding: "12px 28px",
              borderRadius: "9999px",
              border: "1px solid rgba(13,148,136,0.3)",
              background: "rgba(13,148,136,0.06)",
              color: "var(--color-teal-light)",
              fontFamily: "var(--font-inter)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              cursor: "pointer",
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(13,148,136,0.55)";
              (e.currentTarget as HTMLElement).style.background = "rgba(13,148,136,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(13,148,136,0.3)";
              (e.currentTarget as HTMLElement).style.background = "rgba(13,148,136,0.06)";
            }}
          >
            <FileText size={14} strokeWidth={2} />
            {t.download}
            <ArrowUpRight size={13} style={{ opacity: 0.7 }} />
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 560px) {
          #contact { padding: 72px 20px 80px !important; }
          .contact-channel-card {
            width: 100% !important;
            flex-direction: row !important;
            text-align: left !important;
            padding: 16px 20px !important;
            gap: 16px !important;
            align-items: center !important;
          }
          .contact-channel-icon { margin: 0 !important; flex-shrink: 0; }
          .contact-channel-arrow { display: none !important; }
        }
        @media (max-width: 400px) {
          #contact { padding: 56px 16px 72px !important; }
          .contact-heading { font-size: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}

const ChannelCard = memo(function ChannelCard({
  channel,
}: {
  channel: (typeof CHANNELS)[number];
}) {
  const { Icon, label, handle, href, color, external } = channel;

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={`${label}: ${handle.replace("\n", "")}`}
      className="contact-channel-card"
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
        },
      }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.22, ease }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "12px",
        width: "200px",
        padding: "28px 20px 24px",
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "20px",
        textDecoration: "none",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${color}45`;
        el.style.boxShadow = `0 12px 40px ${color}14, 0 0 0 1px ${color}20`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--color-border)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Top accent bar — appears on hover via CSS */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          opacity: 0.6,
        }}
      />

      {/* Ícone do canal */}
      <div
        className="contact-channel-icon"
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "14px",
          background: `${color}12`,
          border: `1px solid ${color}28`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
          flexShrink: 0,
        }}
      >
        <Icon size={20} strokeWidth={1.6} />
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 700,
          fontSize: "0.9375rem",
          color: "var(--color-text)",
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </div>

      {/* Handle */}
      <div
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.72rem",
          color: "var(--color-muted)",
          lineHeight: 1.5,
          wordBreak: "break-word" as const,
        }}
      >
        {handle.replace("\n", "")}
      </div>

      {/* Arrow indicator */}
      {external && (
        <div className="contact-channel-arrow" style={{ color, opacity: 0.5, marginTop: "2px" }}>
          <ArrowUpRight size={13} />
        </div>
      )}
    </motion.a>
  );
});
