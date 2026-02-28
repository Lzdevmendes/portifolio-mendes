import { getGithubRepos } from "@/lib/github";
import ProjectsGrid from "./ProjectsGrid";

export default async function Projects() {
  const repos = await getGithubRepos("Lzdevmendes");

  return (
    <section
      id="projects"
      style={{
        padding: "100px 24px",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: "64px",
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
          Portfólio
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
            Trabalhos{" "}
            <span style={{ color: "var(--color-teal)" }}>Recentes</span>
          </h2>

          <a
            href="https://github.com/Lzdevmendes?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
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
            Ver todos no GitHub →
          </a>
        </div>

        <p
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
        </p>
      </div>

      <ProjectsGrid repos={repos} />
    </section>
  );
}
