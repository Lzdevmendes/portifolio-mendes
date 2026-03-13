"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Award } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
  color: string;
  tag: string;
}

const certifications: Certification[] = [
  {
    title: "Formação Full-Stack",
    issuer: "Rocketseat",
    date: "2024",
    credentialUrl: "https://app.rocketseat.com.br",
    skills: ["Node.js", "React", "TypeScript", "REST API"],
    color: "#7C3AED",
    tag: "Full-Stack",
  },
  {
    title: "React Developer",
    issuer: "Rocketseat",
    date: "2024",
    credentialUrl: "https://app.rocketseat.com.br",
    skills: ["React", "Next.js", "Hooks", "Context API"],
    color: "#06B6D4",
    tag: "Frontend",
  },
  {
    title: "Node.js Developer",
    issuer: "Rocketseat",
    date: "2023",
    credentialUrl: "https://app.rocketseat.com.br",
    skills: ["Node.js", "NestJS", "PostgreSQL", "Prisma"],
    color: "#0D9488",
    tag: "Backend",
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialUrl: "https://aws.amazon.com/certification",
    skills: ["AWS", "Cloud", "EC2", "S3", "Lambda"],
    color: "#F59E0B",
    tag: "Cloud",
  },
  {
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    date: "2023",
    credentialUrl: "https://www.freecodecamp.org",
    skills: ["JavaScript", "Algorithms", "ES6+"],
    color: "#3B82F6",
    tag: "Fundamentos",
  },
  {
    title: "TypeScript Avançado",
    issuer: "DIO",
    date: "2023",
    credentialUrl: "https://www.dio.me",
    skills: ["TypeScript", "Generics", "Decorators", "OOP"],
    color: "#EC4899",
    tag: "Linguagem",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
};

export default function Certifications() {
  return (
    <section
      id="certifications"
      style={{ padding: "100px 24px", position: "relative" }}
    >
      <style>{`
        .certs-grid { grid-template-columns: 1fr; }
        @media (min-width: 600px) {
          .certs-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 960px) {
          .certs-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 480px) {
          #certifications { padding: 64px 16px !important; }
        }
      `}</style>

      {/* Separator */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(1280px, 100%)",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, var(--color-border), transparent)",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "72px" }}
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
            Formação
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "var(--color-text)",
              }}
            >
              Certificações &{" "}
              <span style={{ color: "var(--color-teal)" }}>Cursos</span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.875rem",
                color: "var(--color-muted)",
                maxWidth: "340px",
                lineHeight: 1.6,
                textAlign: "right",
              }}
            >
              {certifications.length} certificações em plataformas reconhecidas
              globalmente
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="certs-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gap: "16px",
          }}
        >
          {certifications.map((cert) => (
            <CertCard key={cert.title} cert={cert} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CertCard({ cert }: { cert: Certification }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--color-bg-card)",
        border: `1px solid ${hovered ? `${cert.color}40` : "var(--color-border)"}`,
        borderRadius: "16px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.25s",
        cursor: "default",
      }}
    >
      {/* Top accent bar */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${cert.color}, ${cert.color}44, transparent)`,
        }}
      />

      {/* Color orb */}
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${cert.color}22 0%, transparent 70%)`,
          pointerEvents: "none",
          transition: "opacity 0.3s",
          opacity: hovered ? 1 : 0.6,
        }}
      />

      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: `${cert.color}18`,
            border: `1px solid ${cert.color}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Award size={18} color={cert.color} strokeWidth={1.8} />
        </div>

        {/* Tag */}
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.6875rem",
            fontWeight: 500,
            color: cert.color,
            background: `${cert.color}15`,
            border: `1px solid ${cert.color}30`,
            borderRadius: "4px",
            padding: "2px 8px",
            letterSpacing: "0.04em",
            flexShrink: 0,
          }}
        >
          {cert.tag}
        </span>
      </div>

      {/* Title & Issuer */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <span
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 700,
            fontSize: "0.9375rem",
            color: "var(--color-text)",
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
          }}
        >
          {cert.title}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.8125rem",
              color: "var(--color-muted)",
            }}
          >
            {cert.issuer}
          </span>
          <span style={{ color: "var(--color-border)", fontSize: "0.75rem" }}>·</span>
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              color: "var(--color-muted)",
              opacity: 0.7,
            }}
          >
            {cert.date}
          </span>
        </div>
      </div>

      {/* Skills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {cert.skills.map((skill) => (
          <span
            key={skill}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.6875rem",
              fontWeight: 500,
              color: "var(--color-muted)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--color-border)",
              borderRadius: "4px",
              padding: "2px 8px",
              letterSpacing: "0.02em",
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Credential link */}
      {cert.credentialUrl && (
        <motion.a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          animate={{
            color: hovered ? cert.color : "var(--color-muted)",
          }}
          transition={{ duration: 0.2 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontFamily: "var(--font-inter)",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.02em",
            textDecoration: "none",
            marginTop: "auto",
            paddingTop: "4px",
          }}
        >
          Ver credencial
          <ExternalLink size={12} strokeWidth={2} />
        </motion.a>
      )}
    </motion.div>
  );
}
