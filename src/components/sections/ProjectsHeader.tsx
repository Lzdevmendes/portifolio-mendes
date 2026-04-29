"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ProjectsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "64px" }}
    >
      <motion.span
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.75rem",
          fontWeight: 500,
          color: "var(--color-teal)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          display: "block",
        }}
      >
        Portfolio
      </motion.span>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "var(--color-text)",
          }}
        >
          Trabalhos{" "}
          <span style={{ color: "var(--color-teal)" }}>Recentes</span>
        </motion.h2>

        <motion.a
          href="https://github.com/Lzdevmendes?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ x: 4, color: "var(--color-teal-light)" }}
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.875rem",
            color: "var(--color-muted)",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            flexShrink: 0,
            transition: "color 0.2s",
          }}
        >
          Ver tudo no GitHub
          <ArrowUpRight size={14} />
        </motion.a>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "1rem",
          color: "var(--color-muted)",
          lineHeight: 1.7,
          maxWidth: "480px",
        }}
      >
        Projetos open source, experimentos e soluções construídas com as
        tecnologias mais modernas do mercado.
      </motion.p>
    </motion.div>
  );
}
