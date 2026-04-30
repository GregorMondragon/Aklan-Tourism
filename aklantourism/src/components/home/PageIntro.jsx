import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1];
const easeSplit = [0.76, 0, 0.24, 1]; // sharp cinematic ease for the reveal

export default function PageIntro({ onComplete }) {
  const [phase, setPhase] = useState("brand"); // brand → splitting → done

  useEffect(() => {
    if (sessionStorage.getItem("aklanIntroPlayed")) {
      setPhase("done");
      if (onComplete) onComplete();
      return;
    }

    const t1 = setTimeout(() => {
      setPhase("splitting");
      if (onComplete) onComplete();
    }, 1900);
    const t2 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("aklanIntroPlayed", "true");
    }, 3000);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  const isSplitting = phase === "splitting";

  const panelStyle = {
    position: "fixed",
    left: 0,
    right: 0,
    zIndex: 9998,
    background: "linear-gradient(135deg, #03082e 0%, #0a1f55 60%, #0d2d6e 100%)",
    pointerEvents: isSplitting ? "none" : "all",
  };

  return (
    <AnimatePresence>
      {/* ── Top Panel ── */}
      <motion.div
        key="panel-top"
        style={{ ...panelStyle, top: 0, height: "50dvh" }}
        initial={{ y: 0 }}
        animate={{ y: isSplitting ? "-100%" : 0 }}
        transition={{ duration: 1.1, ease: easeSplit }}
      >
        {/* Subtle animated grain overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }} />
        {/* Top edge light line */}
        <motion.div
          style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "rgba(100,160,255,0.25)" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: easeOut, delay: 0.15 }}
        />
      </motion.div>

      {/* ── Bottom Panel ── */}
      <motion.div
        key="panel-bottom"
        style={{ ...panelStyle, bottom: 0, top: "50dvh" }}
        initial={{ y: 0 }}
        animate={{ y: isSplitting ? "100%" : 0 }}
        transition={{ duration: 1.1, ease: easeSplit }}
      >
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }} />
        {/* Bottom edge light line */}
        <motion.div
          style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "rgba(100,160,255,0.25)" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: easeOut, delay: 0.15 }}
        />
      </motion.div>

      {/* ── Center Brand Overlay (above panels) ── */}
      <motion.div
        key="brand"
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 16, pointerEvents: "none",
        }}
        animate={{ opacity: isSplitting ? 0 : 1, y: isSplitting ? -24 : 0 }}
        transition={{ duration: 0.55, ease: "easeIn" }}
      >
        {/* Glow ring behind logo */}
        <motion.div
          style={{
            position: "absolute",
            width: 160, height: 160,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(80,140,255,0.18) 0%, transparent 70%)",
          }}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1.6, opacity: 1 }}
          transition={{ duration: 1.8, ease: easeOut, delay: 0.1 }}
        />

        {/* Logo */}
        <motion.img
          src="/Images/finallogo.png"
          alt="Aklan Tourism"
          style={{
            width: "clamp(120px, 40vw, 200px)",
            height: "auto",
            position: "relative",
            filter: "drop-shadow(0 0 18px rgba(0, 0, 0, 0.45))",
          }}
          initial={{ opacity: 0, scale: 0.72, filter: "blur(12px) drop-shadow(0 0 18px rgba(0, 0, 0, 0.3))" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px) drop-shadow(0 0 18px rgba(0, 0, 0, 0.45))" }}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.2 }}
        />

        {/* Brand name */}
        {/* New Header */}
        <motion.h1
          style={{
            fontSize: "clamp(1.2rem, 4vw, 2rem)",
            fontWeight: 800,
            color: "#e8f0ff",
            letterSpacing: "8px",
            fontFamily: "Ubuntu, sans-serif",
            textTransform: "uppercase",
            margin: "20px 0 0",
            textAlign: "center",
            lineHeight: 1.2,
            textShadow: "0 0 20px rgba(80,140,255,0.3)",
          }}
          initial={{ opacity: 0, y: 20, letterSpacing: "14px" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "8px" }}
          transition={{ duration: 1.2, ease: easeOut, delay: 0.6 }}
        >
          Wonder of Aklan
        </motion.h1>
      </motion.div>
    </AnimatePresence>
  );
}
