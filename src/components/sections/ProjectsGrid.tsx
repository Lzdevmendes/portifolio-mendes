"use client";

import { motion, useInView } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { useRef } from "react";
import type { GithubRepo } from "@/lib/github";

const ease = [0.4, 0, 0.2, 1] as [number, number, number, number];

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Java: "#ED8B00",
  Python: "#3572A5",
  Dockerfile: "#384D54",
  Go: "#00ADD8",
  Rust: "#CE422B",
  "C#": "#239120",
  CSS: "#563D7C",
  HTML: "#E44D26",
  Dart: "#00B4AB",
};

export default function ProjectsGrid({ repos }: { repos: GithubRepo[] }) {
  const featured = repos.slice(0, 6);

  if (repos.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "60px 24px",
          color: "var(--color-muted)",
          fontFamily: "var(--font-inter)",
          fontSize: "0.875rem",
          textAlign: "center",
          gap: "12px",
        }}
      >
        <p>Não foi possível carregar os repositórios no momento.</p>
        <a
          href="https://github.com/Lzdevmendes?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--color-teal-light)", textDecoration: "underline" }}
        >
          Ver no GitHub
        </a>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .macbook-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 48px 36px;
        }
        @media (max-width: 860px) {
          .macbook-grid { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (max-width: 480px) {
          .macbook-grid { gap: 36px; }
        }
      `}</style>

      <div className="macbook-grid">
        {featured.map((repo, i) => (
          <MacBookCard key={repo.id} repo={repo} index={i} />
        ))}
      </div>
    </>
  );
}

function MacBookCard({ repo, index }: { repo: GithubRepo; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const ogImage = `https://opengraph.githubassets.com/1/Lzdevmendes/${repo.name}`;
  const displayUrl = repo.homepage
    ? repo.homepage.replace(/^https?:\/\//, "")
    : `github.com/Lzdevmendes/${repo.name}`;
  const langColor = repo.language ? LANG_COLORS[repo.language] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease }}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      {/* ── MacBook 3D ── */}
      <div
        ref={ref}
        style={{ perspective: "1000px", perspectiveOrigin: "50% 60%" }}
      >
        {/* Lid — animates on inView */}
        <motion.div
          animate={{ rotateX: isInView ? -115 : -8 }}
          transition={{
            duration: 1.5,
            delay: index * 0.14 + 0.35,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{
            transformOrigin: "50% 100%",
            background: "linear-gradient(160deg, #2e2e30 0%, #1e1e20 100%)",
            borderRadius: "10px 10px 3px 3px",
            padding: "8px 8px 6px",
            boxShadow:
              "0 -1px 0 rgba(255,255,255,0.07) inset, 0 24px 60px rgba(0,0,0,0.6)",
            willChange: "transform",
          }}
        >
          {/* Camera */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "12px",
              alignItems: "center",
              marginBottom: "4px",
            }}
          >
            <div
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#2a2a2c",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />
          </div>

          {/* Screen bezel */}
          <div style={{ background: "#0a0a0a", borderRadius: "5px", overflow: "hidden" }}>
            {/* Fake browser bar */}
            <div
              style={{
                background: "#1c1c1e",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                padding: "5px 9px",
                display: "flex",
                alignItems: "center",
                gap: "7px",
              }}
            >
              <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                {(["#FF5F57", "#FFBD2E", "#28C840"] as const).map((c) => (
                  <div
                    key={c}
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: c,
                      opacity: 0.9,
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  flex: 1,
                  background: "#2a2a2c",
                  borderRadius: "3px",
                  padding: "2px 7px",
                  fontFamily: "Consolas, monospace",
                  fontSize: "0.575rem",
                  color: "rgba(255,255,255,0.28)",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {displayUrl}
              </div>
            </div>

            {/* Screenshot */}
            <div style={{ aspectRatio: "16/10", overflow: "hidden", background: "#111" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ogImage}
                alt={`Preview de ${repo.name}`}
                width={800}
                height={500}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* Hinge */}
        <div style={{ height: "3px", background: "linear-gradient(90deg, #161618, #2a2a2c, #161618)" }} />

        {/* Base */}
        <div
          style={{
            background: "linear-gradient(180deg, #252527 0%, #1d1d1f 100%)",
            borderRadius: "0 0 8px 8px",
            padding: "10px 16px 14px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {/* Keyboard rows (decorative) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3px", opacity: 0.18 }}>
            {[12, 11, 10].map((cols, row) => (
              <div key={row} style={{ display: "flex", gap: "3px" }}>
                {Array.from({ length: cols }).map((_, i) => (
                  <div
                    key={i}
                    style={{ flex: 1, height: "5px", background: "#555", borderRadius: "1.5px" }}
                  />
                ))}
              </div>
            ))}
          </div>
          {/* Trackpad */}
          <div
            style={{
              width: "34%",
              height: "13px",
              background: "#1a1a1c",
              borderRadius: "3px",
              border: "1px solid rgba(255,255,255,0.05)",
              margin: "2px auto 0",
            }}
          />
        </div>
      </div>

      {/* ── Project info ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
          <h3
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: "0.9375rem",
              color: "var(--color-text)",
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
            }}
          >
            {repo.name}
          </h3>
          {repo.stargazers_count > 0 && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                flexShrink: 0,
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                color: "var(--color-muted)",
              }}
            >
              <Star size={11} />
              {repo.stargazers_count}
            </div>
          )}
        </div>

        {repo.description && (
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.8125rem",
              color: "var(--color-muted)",
              lineHeight: 1.65,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {repo.description}
          </p>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "10px",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {langColor && (
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: langColor,
                  boxShadow: `0 0 5px ${langColor}80`,
                  flexShrink: 0,
                }}
              />
            )}
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "var(--color-muted)" }}>
              {repo.language ?? "—"}
            </span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <IconLink href={repo.html_url} label="Código no GitHub">
              <GitHubSvg />
            </IconLink>
            {repo.homepage && (
              <IconLink href={repo.homepage} label="Ver projeto">
                <ExternalLink size={12} />
              </IconLink>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "28px",
        height: "28px",
        borderRadius: "7px",
        border: "1px solid var(--color-border)",
        color: "var(--color-muted)",
        transition: "border-color 0.18s, color 0.18s, background 0.18s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--color-teal)";
        el.style.color = "var(--color-teal-light)";
        el.style.background = "rgba(13,148,136,0.08)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--color-border)";
        el.style.color = "var(--color-muted)";
        el.style.background = "transparent";
      }}
    >
      {children}
    </a>
  );
}

function GitHubSvg() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
