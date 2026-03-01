"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        background: scrolled ? "rgba(10, 10, 10, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "none",
        transition: "all 0.3s ease",
      }}
    >
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
          <span
            style={{
              fontFamily: "var(--font-syne)",
              color: "var(--color-teal)",
              fontWeight: 800,
              fontSize: "1.25rem",
            }}
          >
            LM
          </span>
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
              <NavLink href={link.href}>{link.label}</NavLink>
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
        <button
          onClick={() => setIsOpen(!isOpen)}
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
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          style={{
            background: "rgba(10,10,10,0.95)",
            borderTop: "1px solid var(--color-border)",
            backdropFilter: "blur(12px)",
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
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "block",
                    padding: "12px 0",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.9375rem",
                    color: "var(--color-muted)",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li style={{ paddingTop: "16px" }}>
              <HireButton />
            </li>
          </ul>
        </motion.div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </motion.header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        fontFamily: "var(--font-inter)",
        fontSize: "0.875rem",
        color: "var(--color-muted)",
        letterSpacing: "0.02em",
        position: "relative",
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--color-text)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--color-muted)";
      }}
    >
      {children}
    </a>
  );
}

function HireButton() {
  return (
    <a
      href="#contact"
      style={{
        display: "inline-block",
        padding: "8px 20px",
        borderRadius: "9999px",
        background: "var(--color-teal)",
        color: "#fff",
        fontFamily: "var(--font-inter)",
        fontSize: "0.8125rem",
        fontWeight: 500,
        transition: "background 0.2s ease, transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "var(--color-teal-light)";
        el.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "var(--color-teal)";
        el.style.transform = "translateY(0)";
      }}
    >
      Hire me
    </a>
  );
}
