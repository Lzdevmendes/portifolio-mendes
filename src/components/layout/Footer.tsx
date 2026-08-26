"use client";

import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/language";

export default function Footer() {
  const { lang } = useLanguage();
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

        {/* Copyright */}
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.75rem",
            color: "var(--color-muted)",
          }}
        >
          © {year} Luiz Mendes. {lang === "pt" ? "Todos os direitos reservados." : "All rights reserved."}
        </span>
      </div>
    </footer>
  );
}
