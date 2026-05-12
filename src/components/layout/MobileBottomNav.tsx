"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Briefcase, Code2, Home, Layers, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/language";

const NAV_ITEMS = [
  { id: "about",      icon: Home,     pt: "Sobre",    en: "About" },
  { id: "projects",   icon: Code2,    pt: "Projetos", en: "Projects" },
  { id: "experience", icon: Briefcase,pt: "Exp.",     en: "Exp." },
  { id: "skills",     icon: Layers,   pt: "Skills",   en: "Skills" },
  { id: "contact",    icon: Mail,     pt: "Contato",  en: "Contact" },
];

export default function MobileBottomNav() {
  const { lang } = useLanguage();
  const [active, setActive] = useState("about");
  const [mounted, setMounted] = useState(false);

  // Monta apenas no cliente — evita SSR mismatch e garante que matchMedia existe
  useEffect(() => {
    setMounted(true);
  }, []);

  // IntersectionObserver para marcar seção ativa
  useEffect(() => {
    if (!mounted) return;

    const sections = NAV_ITEMS
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pega a seção com maior área visível
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { threshold: [0.2, 0.5], rootMargin: "0px 0px -20% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [mounted]);

  // Não renderiza nada no servidor — só monta no client após hidratação
  if (!mounted) return null;

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    const offset = 80; // altura da top navbar
    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
    setActive(id);
  }

  return (
    <AnimatePresence>
      <motion.nav
        key="mobile-bottom-nav"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.6 }}
        aria-label={lang === "pt" ? "Navegação inferior" : "Bottom navigation"}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          background: "rgba(10,10,10,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid var(--color-border)",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          paddingBottom: "env(safe-area-inset-bottom, 8px)",
          paddingTop: "6px",
        }}
        className="mobile-bottom-nav"
      >
        {NAV_ITEMS.map(({ id, icon: Icon, pt, en }) => {
          const isActive = active === id;
          const label = lang === "pt" ? pt : en;

          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "3px",
                padding: "8px 14px 6px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: isActive ? "var(--color-teal-light)" : "var(--color-muted)",
                transition: "color 0.2s ease",
                minWidth: "52px",
                minHeight: "48px",
                WebkitTapHighlightColor: "transparent",
                outline: "none",
                userSelect: "none",
                touchAction: "manipulation",
              }}
            >
              {/* Ícone com indicador de ativo */}
              <span style={{ position: "relative", display: "flex" }}>
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-pill"
                    style={{
                      position: "absolute",
                      inset: "-7px -10px",
                      borderRadius: "12px",
                      background: "rgba(13,148,136,0.14)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.2 : 1.6}
                  style={{ position: "relative", zIndex: 1 }}
                />
              </span>

              {/* Label */}
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.58rem",
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                }}
              >
                {label}
              </span>
            </button>
          );
        })}

        {/* Esconde em desktop */}
        <style>{`
          @media (min-width: 769px) and (pointer: fine) {
            .mobile-bottom-nav { display: none !important; }
          }
        `}</style>
      </motion.nav>
    </AnimatePresence>
  );
}
