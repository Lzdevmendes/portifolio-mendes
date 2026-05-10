"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowUp } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        background: "var(--color-bg-secondary)",
        padding: "20px 24px",
      }}
    >
      <style>{`
        @media (max-width: 480px) {
          .footer-bar { flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 14px !important; }
          .footer-back-top { display: none !important; }
        }
      `}</style>

      <div
        className="footer-bar"
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
        {/* Brand */}
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

        {/* Back to top */}
        <motion.button
          className="footer-back-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ borderColor: "var(--color-teal)", color: "var(--color-teal-light)", y: -2 }}
          whileTap={{ scale: 0.95 }}
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
          }}
        >
          <ArrowUp size={12} />
          Voltar ao topo
        </motion.button>

        {/* Copyright */}
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
    </footer>
  );
}
