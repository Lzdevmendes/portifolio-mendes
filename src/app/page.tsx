import { MotionConfig } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main-content"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "8px",
          zIndex: 9999,
          padding: "8px 16px",
          background: "var(--color-teal)",
          color: "#fff",
          borderRadius: "8px",
          fontFamily: "var(--font-inter)",
          fontSize: "0.875rem",
          fontWeight: 500,
        }}
        onFocus={(e) => { e.currentTarget.style.left = "8px"; }}
        onBlur={(e) => { e.currentTarget.style.left = "-9999px"; }}
      >
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
    </MotionConfig>
  );
}
