"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, FileText, ArrowUpRight } from "lucide-react";
import { memo } from "react";

const ease = [0.4, 0, 0.2, 1] as [number, number, number, number];

const CHANNELS = [
  {
    id: "email",
    Icon: Mail,
    label: "Email",
    handle: "lzmendestechdev@gmail.com",
    href: "mailto:lzmendestechdev@gmail.com",
    color: "#0D9488",
    bg: "rgba(13,148,136,0.1)",
    border: "rgba(13,148,136,0.25)",
  },
  {
    id: "linkedin",
    Icon: Linkedin,
    label: "LinkedIn",
    handle: "lzmendess",
    href: "https://linkedin.com/in/lzmendess",
    color: "#0A66C2",
    bg: "rgba(10,102,194,0.1)",
    border: "rgba(10,102,194,0.25)",
    external: true,
  },
  {
    id: "github",
    Icon: Github,
    label: "GitHub",
    handle: "Lzdevmendes",
    href: "https://github.com/Lzdevmendes",
    color: "#E2E8F0",
    bg: "rgba(255,255,255,0.05)",
    border: "rgba(255,255,255,0.1)",
    external: true,
  },
] as const;

export default function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contato"
      style={{ padding: "100px 24px", position: "relative" }}
    >
      <style>{`
        .contact-channels { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 700px) {
          .contact-channels { grid-template-columns: 1fr !important; }
          #contact { padding: 72px 20px !important; }
          .contact-main-card { padding: 32px 20px !important; }
        }
        @media (max-width: 480px) {
          #contact { padding: 56px 16px !important; }
        }
      `}</style>

      {/* Separator */}
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

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          style={{ textAlign: "center", marginBottom: "56px" }}
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
            Contato
          </span>

          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              color: "var(--color-text)",
              marginBottom: "20px",
            }}
          >
            Vamos construir algo{" "}
            <span style={{ color: "var(--color-teal)" }}>incrível</span> juntos?
          </h2>

          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1rem",
              color: "var(--color-muted)",
              maxWidth: "460px",
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            Disponível para CLT, PJ ou freelance. Respondo em menos de 24h.
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease }}
          className="contact-main-card"
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid rgba(13,148,136,0.18)",
            borderRadius: "24px",
            padding: "48px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Ambient glows */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-80px",
              right: "-80px",
              width: "360px",
              height: "360px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(13,148,136,0.09) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-60px",
              left: "-60px",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1, ease }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "9999px",
              background: "rgba(13,148,136,0.1)",
              border: "1px solid rgba(13,148,136,0.28)",
              marginBottom: "32px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--color-teal)",
                boxShadow: "0 0 8px rgba(13,148,136,0.9)",
                flexShrink: 0,
                animation: "pulse-dot 1.8s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--color-teal-light)",
                letterSpacing: "0.04em",
              }}
            >
              Disponível para novas oportunidades
            </span>
          </motion.div>

          {/* Channel cards */}
          <div
            className="contact-channels"
            style={{ display: "grid", gap: "14px", marginBottom: "32px" }}
          >
            {CHANNELS.map((ch, i) => (
              <ChannelCard key={ch.id} channel={ch} index={i} />
            ))}
          </div>

          {/* Divider */}
          <div
            aria-hidden="true"
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, var(--color-border), transparent)",
              marginBottom: "28px",
            }}
          />

          {/* CV download */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <motion.a
              href="/cv-luiz-mendes.pdf"
              download
              whileHover={{ scale: 1.04, y: -2, boxShadow: "0 16px 40px rgba(13,148,136,0.18)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                padding: "13px 28px",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, rgba(13,148,136,0.14), rgba(20,184,166,0.07))",
                border: "1px solid rgba(13,148,136,0.32)",
                color: "var(--color-teal-light)",
                fontFamily: "var(--font-inter)",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "none",
                boxShadow: "0 8px 20px rgba(13,148,136,0.08)",
                letterSpacing: "0.01em",
              }}
            >
              <FileText size={15} strokeWidth={2} />
              Baixar Currículo (PDF)
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const ChannelCard = memo(function ChannelCard({
  channel,
  index,
}: {
  channel: (typeof CHANNELS)[number];
  index: number;
}) {
  const { Icon, label, handle, href, color, bg, border } = channel;
  const external = "external" in channel && channel.external;

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={`${label}: ${handle}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease }}
      whileHover={{ y: -4, boxShadow: `0 12px 32px ${color}1A` }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        padding: "22px",
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: "14px",
        textDecoration: "none",
        cursor: "pointer",
        transition: "border-color 0.22s, box-shadow 0.22s",
        position: "relative",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${color}50`; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = border; }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            background: `${color}18`,
            border: `1px solid ${color}28`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color,
            flexShrink: 0,
          }}
        >
          <Icon size={17} strokeWidth={1.8} />
        </div>
        <ArrowUpRight size={13} style={{ color, opacity: 0.6 }} />
      </div>

      <div>
        <div
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 700,
            fontSize: "0.875rem",
            color: "var(--color-text)",
            marginBottom: "4px",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.75rem",
            color: "var(--color-muted)",
            lineHeight: 1.45,
            wordBreak: "break-all",
          }}
        >
          {handle}
        </div>
      </div>
    </motion.a>
  );
});
