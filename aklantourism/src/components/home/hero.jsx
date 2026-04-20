import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../styles/hero.css";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  { n: "01", icon: "🌊", tag: "Coastal Wonder", title: "Exploration", desc: "Discover the rugged beauty of Puka Shell Beach — a peaceful retreat far from the world-famous white sand corridors." },
  { n: "02", icon: "🍃", tag: "Eco Heritage", title: "Nature", desc: "Cross the bamboo bridge of Bakhawan Eco-Park and unveil a hidden seascape rarely seen by the ordinary traveller." },
  { n: "03", icon: "🥁", tag: "Living Culture", title: "Festival", desc: "Feel the earth shake with the Sadsad street dance — the vibrant heartbeat of Aklan's oldest living tradition." },
  { n: "04", icon: "🧶", tag: "Local Heritage", title: "Artistry", desc: "Witness the delicate hand-woven Piña cloth in Kalibo and connect with the soul of Aklanon craftsmanship." },
];

export default function Hero({ introComplete }) {
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const overlayRef = useRef(null);
  const welcomeRef = useRef(null);

  // Individual content refs for targeted animations
  const mainRef = useRef(null);
  const eyebrowRowRef = useRef(null);
  const thinRef = useRef(null);
  const ofRef = useRef(null);
  const boldRef = useRef(null);
  const descRef = useRef(null);
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);
  const cardEls = useRef([]);

  const revealed = useRef(false);
  const stRef = useRef(null);

  // ── Content reveal: targeted per-element animations ──────────
  function revealContent() {
    if (revealed.current) return;
    revealed.current = true;

    gsap.timeline({ defaults: { ease: "power3.out" } })
      // Eyebrow: pop up
      .to(eyebrowRowRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(2.8)" })
      // Title words: typewriter reveal left→right (~1.8s total)
      .to([thinRef.current, ofRef.current, boldRef.current], {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.6, ease: "power2.inOut", stagger: 0.6,
      }, "+=0.04")
      // Description: typewriter clip-path reveal
      .to(descRef.current, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.4, ease: "power2.inOut",
      }, "-=0.5")
      // Buttons: slide from opposite sides to center
      .to(btn1Ref.current, { opacity: 1, x: 0, duration: 0.5 }, "-=0.35")
      .to(btn2Ref.current, { opacity: 1, x: 0, duration: 0.5 }, "<")
      // Cards: stagger pop
      .to(cardEls.current, {
        opacity: 1, y: 0, scale: 1,
        stagger: 0.1, ease: "back.out(1.6)", duration: 0.5,
      }, "-=0.2");
  }

  function hideContent() {
    if (!revealed.current) return;
    revealed.current = false;
    gsap.set(eyebrowRowRef.current, { opacity: 0, y: 20, scale: 0.92 });
    gsap.set([thinRef.current, ofRef.current, boldRef.current], { clipPath: "inset(0 100% 0 0)" });
    gsap.set(descRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
    gsap.set(btn1Ref.current, { opacity: 0, x: -28 });
    gsap.set(btn2Ref.current, { opacity: 0, x: 28 });
    gsap.set(cardEls.current, { opacity: 0, y: 60, scale: 0.92 });
  }

  useEffect(() => {
    if (!introComplete) return;

    // ── Set all initial hidden states ─────────────────────────
    gsap.set(bgRef.current, { scale: 1.5, transformOrigin: "center center" });
    gsap.set(eyebrowRowRef.current, { opacity: 0, y: 20, scale: 0.92 });
    gsap.set([thinRef.current, ofRef.current, boldRef.current], { clipPath: "inset(0 100% 0 0)" });
    gsap.set(descRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
    gsap.set(btn1Ref.current, { opacity: 0, x: -28 });
    gsap.set(btn2Ref.current, { opacity: 0, x: 28 });
    gsap.set(cardEls.current, { opacity: 0, y: 60, scale: 0.92 });

    // ── Welcome entrance ──────────────────────────────────────
    const intro = gsap.fromTo(
      welcomeRef.current,
      { opacity: 0, scale: 1.07, filter: "blur(14px)" },
      {
        opacity: 1, scale: 1, filter: "blur(0px)",
        duration: 1.7, ease: "power3.out",
        onComplete() {
          // ── Scrubbed timeline: bg zoom + welcome fade only ──
          const tl = gsap.timeline();
          tl.to(bgRef.current, { scale: 1.0, ease: "power1.inOut", duration: 5 }, 0)
            .to(overlayRef.current, { opacity: 0.70, ease: "none", duration: 5 }, 0)
            .to(welcomeRef.current, {
              opacity: 0,
              scale: 1.25,
              y: -80,
              filter: "blur(20px)",
              ease: "power2.inOut",
              duration: 4
            }, 0)
            .to({}, { duration: 1 }, 5.5); // short dwell before pin releases

          stRef.current = ScrollTrigger.create({
            trigger: heroRef.current,
            start: "top top",
            end: "+=230%",     // shorter — less time at full viewport
            pin: true,
            pinSpacing: true,
            scrub: 1.1,
            animation: tl,
            invalidateOnRefresh: true,
            onUpdate(self) {
              // Fire content at 42% progress, reset if user scrolls back
              if (self.progress >= 0.42) revealContent();
              else if (self.progress < 0.38) hideContent();
            },
          });
        },
      }
    );

    return () => {
      intro.kill();
      stRef.current?.kill();
    };
  }, [introComplete]);

  return (
    <section ref={heroRef} className="hero" id="hero">
      <img ref={bgRef} src="/Images/HeroBg.png" className="hero-bg" alt="" aria-hidden="true" draggable="false" />
      <div ref={overlayRef} className="hero-overlay" />
      <div className="hero-vignette" />

      {/* ── PHASE 1: Welcome ───────────────────────────────── */}
      <div ref={welcomeRef} className="hero-welcome">
        <p className="hero-welcome-sub">Philippines · Aklan</p>
        <h1 className="hero-welcome-title">Welcome<br />in Aklan</h1>
        <div className="hero-welcome-bar" />
        <p className="hero-welcome-hint">↓ Scroll to explore</p>
      </div>

      {/* ── PHASE 2: Main content (children animated individually) ── */}
      <div ref={mainRef} className="hero-main">
        <div ref={eyebrowRowRef} className="hero-eyebrow-row">
          <span className="hero-rule" />
          <p className="hero-eyebrow">Discover the Province</p>
          <span className="hero-rule" />
        </div>

        <p className="hero-main-title">
          <em ref={thinRef} className="hmt-thin">Wonders </em>
          <span ref={ofRef} className="hmt-of">of </span>
          <strong ref={boldRef} className="hmt-bold">Aklan</strong>
        </p>

        <p ref={descRef} className="hero-desc">
          Beyond the world-famous shores lies a province of untold beauty —
          pristine nature, festive energy, and timeless island soul.
        </p>

        <div className="hero-actions">
          <button ref={btn1Ref} id="hero-btn-explore" className="hero-btn-primary"
            onClick={() => navigate("/destinations")}>
            <span>Explore Now</span>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button ref={btn2Ref} id="hero-btn-story" className="hero-btn-ghost"
            onClick={() => navigate("/about")}>
            Our Story
          </button>
        </div>
      </div>

      {/* ── PHASE 3: Cards ─────────────────────────────────── */}
      <div className="hero-cards">
        {CARDS.map((c, i) => (
          <div key={c.n} className="hero-card" ref={el => (cardEls.current[i] = el)}>
            <div className="hc-top">
              <span className="hc-icon">{c.icon}</span>
              <span className="hc-tag">{c.tag}</span>
            </div>
            <h3 className="hc-title">{c.title}</h3>
            <p className="hc-desc">{c.desc}</p>
            <div className="hc-line" />
          </div>
        ))}
      </div>
    </section>
  );
}
