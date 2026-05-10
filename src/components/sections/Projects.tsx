import ProjectsShowcase from "./ProjectsShowcase";

export default function Projects() {
  return (
    <section id="projects" style={{ position: "relative" }}>
      <div
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
      <ProjectsShowcase />
    </section>
  );
}
