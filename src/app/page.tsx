import Providers from "@/components/layout/Providers";
import Maintenance from "@/components/sections/Maintenance";
import Navbar from "@/components/layout/Navbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import BackToTop from "@/components/layout/BackToTop";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

/**
 * Produção fica em manutenção por padrão — só mostra o site completo quando
 * SHOW_FULL_SITE=true é definido em build-time. O GitHub Actions
 * (.github/workflows/deploy.yml) e `npm run build`/`deploy` não definem essa
 * var, então production é sempre segura por padrão. Pra pré-visualizar
 * localmente, `npm run dev` já lê SHOW_FULL_SITE=true de
 * .env.development.local (não versionado — Next.js só carrega esse arquivo
 * em `next dev`, nunca em `next build`, então não vaza pro deploy).
 */
const SHOW_FULL_SITE = process.env.SHOW_FULL_SITE === "true";

export default function Home() {
  if (!SHOW_FULL_SITE) {
    return (
      <Providers>
        <Maintenance />
      </Providers>
    );
  }

  return (
    <Providers>
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <MobileBottomNav />
      <BackToTop />
    </Providers>
  );
}
