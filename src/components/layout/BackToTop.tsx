"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .back-to-top { bottom: 28px; }
        @media (pointer: coarse), (max-width: 768px) {
          .back-to-top { bottom: 88px; }
        }
      `}</style>

      <AnimatePresence>
        {visible && (
          <motion.button
            key="btt"
            className="back-to-top"
            initial={{ opacity: 0, scale: 0.75, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 12 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.1, y: -3, boxShadow: "0 12px 32px rgba(13,148,136,0.3)" }}
            whileTap={{ scale: 0.92 }}
            aria-label="Voltar ao topo da página"
            style={{
              position: "fixed",
              right: "20px",
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "rgba(13,17,23,0.92)",
              border: "1px solid rgba(13,148,136,0.35)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              color: "#14B8A6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 500,
              boxShadow: "0 8px 24px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)",
              outline: "none",
            }}
          >
            <ArrowUp size={17} strokeWidth={2.2} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
