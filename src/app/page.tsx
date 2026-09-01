import Providers from "@/components/layout/Providers";
import Maintenance from "@/components/sections/Maintenance";
import Navbar from "@/components/layout/Navbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import Footer from "@/components/layout/Footer";

/**
 * Produção fica em manutenção por padrão — só mostra o site completo quando
 * SHOW_FULL_SITE=true é definido em build-time. O GitHub Actions
 * (.github/workflows/deploy.yml) não define essa var, então production é
 * sempre segura por padrão.
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
      </main>
      <Footer />
      <MobileBottomNav />
    </Providers>
  );
}
