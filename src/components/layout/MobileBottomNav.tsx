"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Briefcase, Code2, Home, Layers, Mail } from "lucide-react";

const NAV_ITEMS = [
  { id: "about", label: "Início", icon: Home },
  { id: "projects", label: "Projetos", icon: Code2 },
  { id: "experience", label: "Exp.", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Layers },
  { id: "contact", label: "Contato", icon: Mail },
];

export default function MobileBottomNav() {
  const [active, setActive] = useState("about");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on touch/mobile devices
    const mq = window.matchMedia("(pointer: coarse), (max-width: 768px)");
    setVisible(mq.matches);
    const handler = (e: MediaQueryListEvent) => setVisible(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the one with the highest intersection ratio
          const top = visible.reduce((a, b) =>
            a.intersectionRatio > b.intersectionRatio ? a : b
          );
          setActive(top.target.id);
        }
      },
      { threshold: [0.3], rootMargin: "0px 0px -40% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [visible]);

  if (!visible) return null;

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
        aria-label="Navegação mobile"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(10,10,10,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderTop: "1px solid var(--color-border)",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          paddingTop: "4px",
        }}
      >
        <style>{`
          @media (min-width: 769px) and (pointer: fine) {
            .mobile-bottom-nav { display: none !important; }
          }
        `}</style>

        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <motion.button
              key={id}
              onClick={() => scrollTo(id)}
              whileTap={{ scale: 0.88 }}
              aria-label={label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3px",
                padding: "8px 12px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: isActive ? "var(--color-teal-light)" : "var(--color-muted)",
                transition: "color 0.2s",
                minWidth: "52px",
              }}
            >
              <motion.span
                animate={{ scale: isActive ? 1.15 : 1 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex", position: "relative" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    style={{
                      position: "absolute",
                      inset: "-6px",
                      borderRadius: "10px",
                      background: "rgba(13,148,136,0.15)",
                    }}
                  />
                )}
                <Icon size={20} strokeWidth={isActive ? 2.2 : 1.7} />
              </motion.span>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.6rem",
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: "0.03em",
                  lineHeight: 1,
                }}
              >
                {label}
              </span>
            </motion.button>
          );
        })}
      </motion.nav>
    </AnimatePresence>
  );
}
