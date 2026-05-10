"use client";

import { motion } from "framer-motion";
import { Mail, FileText } from "lucide-react";
import { memo } from "react";

const ease = [0.4, 0, 0.2, 1] as [number, number, number, number];

function IconLinkedin() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconGithub() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const CHANNELS = [
  {
    id: "email",
    Icon: Mail,
    label: "Email",
    handle: "lzmendestechdev@gmail.com",
    href: "mailto:lzmendestechdev@gmail.com",
    color: "#0D9488",
    external: false,
  },
  {
    id: "linkedin",
    Icon: IconLinkedin,
    label: "LinkedIn",
    handle: "lzmendess",
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
    color: "#E2E8F0",
    external: true,
  },
] as const;

export default function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contato"
      style={{ padding: "80px 24px", position: "relative" }}
    >
      <style>{`
        .contact-channels { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 640px) {
          .contact-channels { grid-template-columns: 1fr !important; }
          #contact { padding: 60px 20px !important; }
        }
        @media (max-width: 480px) {
          #contact { padding: 48px 16px !important; }
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

      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          style={{ marginBottom: "40px" }}
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
              marginBottom: "12px",
            }}
          >
            Contato
          </span>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--color-text)",
            }}
          >
            Vamos conversar?
          </h2>
        </motion.div>

        {/* Channel cards */}
        <motion.div
          className="contact-channels"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          style={{ display: "grid", gap: "12px", marginBottom: "16px" }}
        >
          {CHANNELS.map((ch) => (
            <ChannelCard key={ch.id} channel={ch} />
          ))}
        </motion.div>

        {/* CV download */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2, ease }}
        >
          <motion.a
            href="/cv_luizmendes.pdf"
            download
            whileHover={{ scale: 1.02, y: -1, borderColor: "rgba(13,148,136,0.5)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18, ease }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "9999px",
              border: "1px solid rgba(13,148,136,0.28)",
              background: "rgba(13,148,136,0.07)",
              color: "var(--color-teal-light)",
              fontFamily: "var(--font-inter)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            <FileText size={14} strokeWidth={2} />
            Baixar Currículo (PDF)
          </motion.a>
        </motion.div>
      </div>
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
      aria-label={`${label}: ${handle}`}
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
      }}
      whileHover={{ y: -3, borderColor: `${color}50` }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "18px 20px",
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "14px",
        textDecoration: "none",
        cursor: "pointer",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${color}18`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "9px",
          background: `${color}14`,
          border: `1px solid ${color}25`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
          flexShrink: 0,
        }}
      >
        <Icon size={16} strokeWidth={1.8} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 700,
            fontSize: "0.875rem",
            color: "var(--color-text)",
            marginBottom: "2px",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.75rem",
            color: "var(--color-muted)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {handle}
        </div>
      </div>
    </motion.a>
  );
});
