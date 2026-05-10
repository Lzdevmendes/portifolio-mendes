import { getGithubRepos } from "@/lib/github";
import ProjectsGrid from "./ProjectsGrid";
import ProjectsHeader from "./ProjectsHeader";

export default async function Projects() {
  const repos = await getGithubRepos("Lzdevmendes");

  return (
    <section
      id="projects"
      style={{
        padding: "80px 24px",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      <ProjectsHeader />
      <ProjectsGrid repos={repos} />
    </section>
  );
}
