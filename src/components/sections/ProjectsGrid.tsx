"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { Star, ExternalLink, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { GithubRepo } from "@/lib/github";

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
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  return (
    <>
      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr));
          gap: 16px;
        }
        @media (max-width: 480px) {
          .projects-grid { gap: 12px; }
        }
      `}</style>
      {repos.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            padding: "80px 24px",
            color: "var(--color-muted)",
            fontFamily: "var(--font-inter)",
            fontSize: "0.875rem",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>🔌</span>
          <p>Não foi possível carregar os repositórios no momento.</p>
          <a
            href="https://github.com/Lzdevmendes?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-teal)", textDecoration: "underline" }}
          >
            Ver repositórios no GitHub
          </a>
        </div>
      ) : (
        <div className="projects-grid">
          {repos.map((repo, i) => (
            <ProjectCard key={repo.id} repo={repo} index={i} isTouch={isTouch} />
          ))}
        </div>
      )}


      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          marginTop: "56px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <a
          href="https://github.com/Lzdevmendes?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 28px",
            borderRadius: "9999px",
            border: "1px solid var(--color-border)",
            color: "var(--color-muted)",
            fontFamily: "var(--font-inter)",
            fontSize: "0.875rem",
            fontWeight: 500,
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
          Ver todos os repositórios
          <ArrowUpRight size={14} />
        </a>
      </motion.div>
    </>
  );
}

function ProjectCard({ repo, index, isTouch }: { repo: GithubRepo; index: number; isTouch: boolean }) {
  const langColor = repo.language ? (LANG_COLORS[repo.language] ?? "#555") : null;
  const colDelay = (index % 3) * 0.08;

  // 3-D tilt
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springRotX = useSpring(rotX, { stiffness: 200, damping: 22 });
  const springRotY = useSpring(rotY, { stiffness: 200, damping: 22 });

  function onTiltMove(e: React.MouseEvent<HTMLElement>) {
    if (isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotX.set(((e.clientY - cy) / (rect.height / 2)) * -5);
    rotY.set(((e.clientX - cx) / (rect.width / 2)) * 5);
  }

  function onTiltEnd(e: React.MouseEvent<HTMLElement>) {
    rotX.set(0);
    rotY.set(0);
    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
  }

  return (
    <motion.article
      onMouseMove={isTouch ? undefined : onTiltMove}
      onMouseLeave={isTouch ? undefined : onTiltEnd}
      whileTap={isTouch ? { scale: 0.97, borderColor: "rgba(13,148,136,0.5)" } : undefined}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: colDelay,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      }}
      style={{
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.25s",
        cursor: "default",
        transformPerspective: 800,
        rotateX: springRotX,
        rotateY: springRotY,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(13,148,136,0.4)";
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 700,
            fontSize: "0.9375rem",
            color: "var(--color-text)",
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
            textTransform: "capitalize",
          }}
        >
          {repo.name.replace(/-/g, " ")}
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          {repo.stargazers_count > 0 && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                color: "var(--color-muted)",
              }}
            >
              <Star size={11} />
              {repo.stargazers_count}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.8125rem",
          color: "var(--color-muted)",
          lineHeight: 1.65,
          flex: 1,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {repo.description ?? "Repositório sem descrição."}
      </p>

      {/* Topics */}
      {repo.topics && repo.topics.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {repo.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.6875rem",
                color: "var(--color-teal)",
                background: "rgba(13,148,136,0.08)",
                border: "1px solid rgba(13,148,136,0.2)",
                borderRadius: "4px",
                padding: "2px 8px",
                letterSpacing: "0.02em",
              }}
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Footer row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "12px",
          borderTop: "1px solid var(--color-border)",
          marginTop: "4px",
        }}
      >
        {/* Language */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {langColor && (
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: langColor,
                flexShrink: 0,
                boxShadow: `0 0 6px ${langColor}80`,
              }}
            />
          )}
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              color: "var(--color-muted)",
            }}
          >
            {repo.language ?? "—"}
          </span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "8px" }}>
          <IconLink href={repo.html_url} label="Código no GitHub">
            <GitHubSvg />
          </IconLink>
          {repo.homepage && (
            <IconLink href={repo.homepage} label="Ver projeto">
              <ExternalLink size={13} />
            </IconLink>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function IconLink({
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
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "28px",
        height: "28px",
        borderRadius: "8px",
        border: "1px solid var(--color-border)",
        color: "var(--color-muted)",
        transition: "border-color 0.2s, color 0.2s, background 0.2s",
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

// Inline SVG to avoid deprecated Lucide icon
function GitHubSvg() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
