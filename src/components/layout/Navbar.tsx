"use client";

import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

type DotStrength = "none" | "dim" | "bright";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Certs", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Two independent sets: "nearby" (section visible anywhere) and "active" (center of viewport)
  const [nearby, setNearby] = useState<Set<string>>(new Set(["about"]));
  const [active, setActive] = useState<Set<string>>(new Set(["about"]));

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ids = ["about", "projects", "experience", "skills", "certifications", "contact"];

    // "Nearby" → section visible in the broad middle 90% of the viewport → dot dim
    const nearbyObs = new IntersectionObserver(
      (entries) => {
        setNearby((prev) => {
          const next = new Set(prev);
          entries.forEach((e) => {
            if (e.isIntersecting) next.add(e.target.id);
            else next.delete(e.target.id);
          });
          return next;
        });
      },
      { rootMargin: "-5% 0px -5% 0px" }
    );

    // "Active" → section reaches the center 20% of the viewport → dot bright
    const activeObs = new IntersectionObserver(
      (entries) => {
        setActive((prev) => {
          const next = new Set(prev);
          entries.forEach((e) => {
            if (e.isIntersecting) next.add(e.target.id);
            else next.delete(e.target.id);
          });
          return next;
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        nearbyObs.observe(el);
        activeObs.observe(el);
      }
    });

    return () => {
      nearbyObs.disconnect();
      activeObs.disconnect();
    };
  }, []);

  function getStrength(sectionId: string): DotStrength {
    if (active.has(sectionId)) return "bright";
    if (nearby.has(sectionId)) return "dim";
    return "none";
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? "12px 0" : "24px 0",
        background: scrolled ? "rgba(10, 10, 10, 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      {/* Scroll progress bar */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1.5px",
          background:
            "linear-gradient(90deg, var(--color-teal), var(--color-teal-light))",
          scaleX: progressScaleX,
          transformOrigin: "0%",
          opacity: scrolled ? 1 : 0,
          transition: "opacity 0.4s",
          zIndex: 1,
        }}
      />

      <nav
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <motion.span
            whileHover={{ scale: 1.05 }}
            style={{
              fontFamily: "var(--font-syne)",
              color: "var(--color-teal)",
              fontWeight: 800,
              fontSize: "1.25rem",
              display: "inline-block",
            }}
          >
            LM
          </motion.span>
          <span
            style={{
              fontFamily: "var(--font-syne)",
              color: "var(--color-muted)",
              fontWeight: 600,
              fontSize: "0.875rem",
              letterSpacing: "0.05em",
            }}
          >
            lzmendesdev
          </span>
        </Link>

        {/* Desktop Links */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            listStyle: "none",
          }}
          className="hidden-mobile"
        >
          {navLinks.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
            >
              <NavLink
                href={link.href}
                strength={getStrength(link.href.slice(1))}
              >
                {link.label}
              </NavLink>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.42 }}
          >
            <HireButton />
          </motion.li>
        </ul>

        {/* Mobile Toggle */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.92 }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-text)",
            padding: "8px",
            display: "none",
          }}
          className="show-mobile"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ display: "flex" }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: "rgba(10,10,10,0.96)",
              borderTop: "1px solid var(--color-border)",
              backdropFilter: "blur(16px)",
              overflow: "hidden",
            }}
          >
            <ul
              style={{
                maxWidth: "1280px",
                margin: "0 auto",
                padding: "16px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                listStyle: "none",
              }}
            >
              {navLinks.map((link, i) => {
                const s = getStrength(link.href.slice(1));
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      style={{
                        display: "block",
                        padding: "12px 0",
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.9375rem",
                        color: s === "bright" ? "var(--color-text)" : "var(--color-muted)",
                        borderBottom: "1px solid var(--color-border)",
                        transition: "color 0.3s",
                      }}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                );
              })}
              <li style={{ paddingTop: "16px" }}>
                <HireButton />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </motion.header>
  );
}

function NavLink({
  href,
  children,
  strength,
}: {
  href: string;
  children: React.ReactNode;
  strength: DotStrength;
}) {
  // Dot appearance mapped to strength level
  const dotAnimate =
    strength === "bright"
      ? { scale: 1, opacity: 1, boxShadow: "0 0 8px rgba(13,148,136,0.85)" }
      : strength === "dim"
      ? { scale: 0.55, opacity: 0.38, boxShadow: "0 0 0px rgba(0,0,0,0)" }
      : { scale: 0, opacity: 0, boxShadow: "0 0 0px rgba(0,0,0,0)" };

  return (
    <a
      href={href}
      style={{
        fontFamily: "var(--font-inter)",
        fontSize: "0.875rem",
        color: strength === "bright" ? "var(--color-text)" : "var(--color-muted)",
        letterSpacing: "0.02em",
        position: "relative",
        paddingBottom: "6px",
        transition: "color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--color-text)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color =
          strength === "bright" ? "var(--color-text)" : "var(--color-muted)";
      }}
    >
      {children}

      {/* Always rendered — animates between none/dim/bright without mount/unmount flicker */}
      <motion.span
        animate={dotAnimate}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        style={{
          position: "absolute",
          bottom: "-1px",
          left: "50%",
          translateX: "-50%",
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          background: "var(--color-teal)",
          display: "block",
          pointerEvents: "none",
        }}
      />
    </a>
  );
}

function HireButton() {
  return (
    <motion.a
      href="#contact"
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.96 }}
      style={{
        display: "inline-block",
        padding: "8px 20px",
        borderRadius: "9999px",
        background: "var(--color-teal)",
        color: "#fff",
        fontFamily: "var(--font-inter)",
        fontSize: "0.8125rem",
        fontWeight: 500,
      }}
    >
      Hire me
    </motion.a>
  );
}
