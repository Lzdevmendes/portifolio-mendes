"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, ArrowUpRight, ArrowUp } from "lucide-react";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Lzdevmendes",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/lzmendess",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:Lzmendestechdev@gmail.com",
    icon: <Mail size={16} />,
  },
];


export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      style={{
        position: "relative",
        borderTop: "1px solid var(--color-border)",
        background: "var(--color-bg-secondary)",
      }}
    >
      {/* CTA band */}
      <div
        style={{
          padding: "80px 24px",
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "32px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "var(--color-teal)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Contato
          </span>

          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(2.25rem, 6vw, 4rem)",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              color: "var(--color-text)",
              maxWidth: "640px",
            }}
          >
            Vamos construir algo{" "}
            <span style={{ color: "var(--color-teal)" }}>incrível</span>{" "}
            juntos?
          </h2>

          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1rem",
              color: "var(--color-muted)",
              lineHeight: 1.7,
              maxWidth: "440px",
            }}
          >
            Disponível para projetos freelance, consultoria técnica ou
            oportunidades full-time como Full Stack Developer.
          </p>
        </motion.div>

        {/* Contact buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          <a
            href="mailto:Lzmendestechdev@gmail.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 28px",
              borderRadius: "9999px",
              background: "var(--color-teal)",
              color: "#fff",
              fontFamily: "var(--font-inter)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "var(--color-teal-light)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "var(--color-teal)";
              el.style.transform = "translateY(0)";
            }}
          >
            <Mail size={15} />
            Enviar e-mail
          </a>

          <a
            href="https://linkedin.com/in/lzmendess"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 28px",
              borderRadius: "9999px",
              border: "1px solid var(--color-border)",
              color: "var(--color-muted)",
              fontFamily: "var(--font-inter)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              transition: "border-color 0.2s, color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--color-teal)";
              el.style.color = "var(--color-teal-light)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--color-border)";
              el.style.color = "var(--color-muted)";
              el.style.transform = "translateY(0)";
            }}
          >
            LinkedIn
            <ArrowUpRight size={14} />
          </a>
        </motion.div>

        {/* Social icons row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{ display: "flex", gap: "8px" }}
        >
          {socials.map((s) => (
            <SocialButton key={s.label} href={s.href} label={s.label}>
              {s.icon}
            </SocialButton>
          ))}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid var(--color-border)",
          padding: "20px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {/* Brand — esquerda */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: "1rem",
                color: "var(--color-teal)",
              }}
            >
              LM
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.8125rem",
                color: "var(--color-muted)",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <MapPin size={11} />
              Brasil
            </span>
          </div>

          {/* Back to top — centro */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "7px 16px",
              borderRadius: "9999px",
              border: "1px solid var(--color-border)",
              background: "transparent",
              color: "var(--color-muted)",
              fontFamily: "var(--font-inter)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--color-teal)";
              el.style.color = "var(--color-teal-light)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--color-border)";
              el.style.color = "var(--color-muted)";
            }}
          >
            <ArrowUp size={12} />
            Voltar ao topo
          </button>

          {/* Copyright — direita */}
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              color: "var(--color-muted)",
            }}
          >
            © {year} Luiz Mendes. Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        borderRadius: "10px",
        border: "1px solid var(--color-border)",
        color: "var(--color-muted)",
        transition: "border-color 0.2s, color 0.2s, background 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--color-teal)";
        el.style.color = "var(--color-teal-light)";
        el.style.background = "rgba(13,148,136,0.08)";
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--color-border)";
        el.style.color = "var(--color-muted)";
        el.style.background = "transparent";
        el.style.transform = "translateY(0)";
      }}
    >
      {children}
    </a>
  );
}
