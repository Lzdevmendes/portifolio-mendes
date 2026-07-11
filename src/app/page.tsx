import Providers from "@/components/layout/Providers";
import Maintenance from "@/components/sections/Maintenance";

// ─────────────────────────────────────────────────────────────
// MODO MANUTENÇÃO ATIVO
// O portfólio completo está preservado abaixo (comentado).
// Para voltar ao ar: descomente o bloco do portfólio, remova o
// <Maintenance /> e apague este aviso.
// ─────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <Providers>
      <Maintenance />
    </Providers>
  );
}

/* ── PORTFÓLIO COMPLETO (restaurar quando terminar) ──────────────
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

export default function Home() {
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
──────────────────────────────────────────────────────────────── */
