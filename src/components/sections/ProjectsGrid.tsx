"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLink, Star } from "lucide-react";
import { useState } from "react";
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

function formatDate(iso: string) {
  return new Date(iso)
    .toLocaleDateString("pt-BR", { month: "short", year: "numeric" })
    .replace(".", "");
}

export default function ProjectsGrid({ repos }: { repos: GithubRepo[] }) {
  const [openId, setOpenId] = useState<number | null>(repos[0]?.id ?? null);

  return (
    <>
      <style>{`
        .pf-list { border-top: 1px solid var(--color-border); }
        .pf-row-header {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 26px 4px;
        }
        .pf-row-click {
          display: flex;
          align-items: baseline;
          gap: 20px;
          flex: 1;
          min-width: 0;
          background: transparent;
          border: none;
          text-align: left;
          cursor: pointer;
          padding: 0;
        }
        .pf-index {
          font-family: var(--font-inter);
          font-size: 0.75rem;
          color: var(--color-muted);
          flex-shrink: 0;
          width: 22px;
        }
        .pf-title {
          font-family: var(--font-syne);
          font-weight: 700;
          font-size: clamp(1.375rem, 3.4vw, 2.25rem);
          letter-spacing: -0.02em;
          color: var(--color-text);
          text-transform: capitalize;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.2s;
        }
        .pf-row-click:hover .pf-title { color: var(--color-teal-light); }
        .pf-meta {
          font-family: var(--font-inter);
          font-size: 0.75rem;
          color: var(--color-muted);
          flex-shrink: 0;
          display: none;
        }
        .pf-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
        .pf-live {
          font-family: var(--font-inter);
          font-size: 0.75rem;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 9999px;
          border: 1px solid var(--color-border);
          color: var(--color-muted);
          white-space: nowrap;
          transition: border-color 0.2s, color 0.2s;
          display: none;
        }
        .pf-live:hover { border-color: var(--color-teal); color: var(--color-teal-light); }
        .pf-expand-btn {
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          border: 1px solid var(--color-border);
          background: transparent;
          color: var(--color-muted);
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .pf-expand-btn:hover { border-color: var(--color-teal); color: var(--color-teal-light); }
        .pf-panel-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-top: 28px;
        }
        .pf-eyebrow {
          font-family: var(--font-inter);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-teal);
          margin-bottom: 10px;
        }
        .pf-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        @media (min-width: 640px) {
          .pf-meta { display: block; }
          .pf-live { display: inline-flex; align-items: center; gap: 6px; }
        }
        @media (min-width: 860px) {
          .pf-panel-grid { grid-template-columns: 1.4fr 1fr 1fr; gap: 40px; }
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
        <div className="pf-list">
          {repos.map((repo, i) => (
            <ProjectRow
              key={repo.id}
              repo={repo}
              index={i}
              isOpen={openId === repo.id}
              onToggle={() =>
                setOpenId((cur) => (cur === repo.id ? null : repo.id))
              }
            />
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
          marginTop: "40px",
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
          <ExternalLink size={14} />
        </a>
      </motion.div>
    </>
  );
}

function ProjectRow({
  repo,
  index,
  isOpen,
  onToggle,
}: {
  repo: GithubRepo;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const langColor = repo.language ? (LANG_COLORS[repo.language] ?? "#555") : null;
  const [imgError, setImgError] = useState(false);
  const ogImage = `https://opengraph.githubassets.com/1/${repo.full_name}`;
  const liveHref = repo.homepage || repo.html_url;
  const liveLabel = repo.homepage ? "Live site" : "Ver código";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.04 }}
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="pf-row-header">
        <div
          className="pf-row-click"
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggle();
            }
          }}
        >
          <span className="pf-index">{String(index + 1).padStart(2, "0")}</span>
          <span className="pf-title">{repo.name.replace(/-/g, " ")}</span>
          <span className="pf-meta">
            {repo.language ?? "—"} · atualizado {formatDate(repo.updated_at)}
          </span>
        </div>

        <div className="pf-actions">
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
          <a
            className="pf-live"
            href={liveHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {liveLabel}
          </a>
          <button
            type="button"
            className="pf-expand-btn"
            aria-label={isOpen ? "Recolher projeto" : "Expandir projeto"}
            aria-expanded={isOpen}
            onClick={onToggle}
          >
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: "inline-flex" }}
            >
              <ChevronDown size={16} />
            </motion.span>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "4px 4px 36px" }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 8",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid var(--color-border)",
                  background: langColor
                    ? `linear-gradient(135deg, ${langColor}22, var(--color-bg-card))`
                    : "var(--color-bg-card)",
                }}
              >
                {!imgError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={ogImage}
                    alt={`Preview de ${repo.name}`}
                    onError={() => setImgError(true)}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                      fontFamily: "var(--font-syne)",
                      fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                      fontWeight: 800,
                      color: langColor ?? "var(--color-teal)",
                      opacity: 0.4,
                      textTransform: "uppercase",
                    }}
                  >
                    {repo.name.slice(0, 2)}
                  </div>
                )}
              </div>

              <div className="pf-panel-grid">
                <div>
                  <h4 className="pf-eyebrow">Sobre</h4>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.9375rem",
                      lineHeight: 1.7,
                      color: "var(--color-text)",
                    }}
                  >
                    {repo.description ?? "Repositório sem descrição."}
                  </p>
                </div>

                <div>
                  <h4 className="pf-eyebrow">Stack</h4>
                  <div className="pf-tags">
                    {repo.language && (
                      <Tag>
                        {langColor && (
                          <span
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              background: langColor,
                              display: "inline-block",
                              marginRight: 6,
                            }}
                          />
                        )}
                        {repo.language}
                      </Tag>
                    )}
                    {repo.topics?.map((topic) => <Tag key={topic}>{topic}</Tag>)}
                  </div>
                </div>

                <div>
                  <h4 className="pf-eyebrow">Links</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <MetaLink href={repo.html_url}>
                      <GitHubSvg /> Código no GitHub
                    </MetaLink>
                    {repo.homepage && (
                      <MetaLink href={repo.homepage}>
                        <ExternalLink size={13} /> Ver site ao vivo
                      </MetaLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-inter)",
        fontSize: "0.6875rem",
        color: "var(--color-teal-light)",
        background: "rgba(13,148,136,0.08)",
        border: "1px solid rgba(13,148,136,0.2)",
        borderRadius: "4px",
        padding: "3px 9px",
        letterSpacing: "0.02em",
      }}
    >
      {children}
    </span>
  );
}

function MetaLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "var(--font-inter)",
        fontSize: "0.8125rem",
        color: "var(--color-muted)",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--color-teal-light)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--color-muted)";
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
