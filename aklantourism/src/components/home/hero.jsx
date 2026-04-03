import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useCallback } from "react";
import "../../styles/hero.css";

const easeOut = [0.16, 1, 0.3, 1];

// 3D Tilt Card Component optimized for Hero Cards
function TiltCard({ children, variants, className, wrapperClass }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    // Only apply tilt on desktop to optimize performance and prevent touch issues
    if (window.innerWidth <= 768) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={wrapperClass}
      style={{ perspective: 1200, display: "flex", flexDirection: "column", height: "100%", flexShrink: 0 }}
      variants={variants}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          willChange: "transform"
        }}
        whileHover={{
            scale: 1.05,
            transition: { duration: 0.4, ease: "easeOut" }
        }}
        whileTap={{
            scale: 0.98,
            transition: { duration: 0.2 }
        }}
        className="tilt-container"
      >
        <div style={{ transform: "translateZ(30px)", height: "100%", display: "flex", flexDirection: "column", willChange: "transform" }} className={className}>
            {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Hero({ introComplete }) {
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  const cards = [
    { icon: "🌊", title: "Exploration", desc: "Discover the rugged beauty of Puka Shell Beach, a peaceful retreat away from the main white sand corridors." },
    { icon: "🍃", title: "Nature", desc: "Wander Bakhawan Eco-Park's bamboo bridge to unveil a serene, hidden seascape often missed at the entrance." },
    { icon: "🥁", title: "Festival", desc: "Join the vibrant 'Sadsad' street dancing to truly feel the rhythm and heartbeat of Aklan's oldest tradition." },
    { icon: "🧶", title: "Culture", desc: "Witness the delicate art of hand-woven Piña cloth in Kalibo and connect with the true soul of Aklanon artistry." },
  ];

  const handleScroll = useCallback(() => {
    const el = gridRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / cards.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveDot(Math.min(index, cards.length - 1));
  }, [cards.length]);

  const fadeRight = {
    hidden: { opacity: 0, x: 60, filter: "blur(6px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: easeOut } },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -60, filter: "blur(6px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: easeOut, delay: 0.15 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut, delay: 0.3 } },
  };

  const cardUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.1 },
    },
  };

  return (
    <section className="hero">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="video-bg"
        poster="/Images/aklantourismpictures/Boracay%20White%20Beach/Boracay1.jpg"
        aria-hidden="true"
      >
        <source src="/Videos/homebg.mp4" type="video/mp4" />
      </video>

      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate={introComplete ? "visible" : "hidden"}
      >
        <motion.h1 variants={fadeRight}>
          DISCOVER THE WONDERS OF AKLAN
        </motion.h1>

        <motion.p variants={fadeLeft}>
          Beyond the world-famous shores lies a province of untold beauty. Experience the ultimate blend of island life, festive energy, and pristine nature. Your Aklan adventure begins now.
        </motion.p>

        <motion.button
          className="start-btn"
          variants={fadeUp}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onClick={() => navigate("/destinations")}
        >
          Start Your Journey
        </motion.button>
      </motion.div>

      {/* Hero Carousel Wrapper — cards + dots stacked */}
      <div className="hero-carousel-wrap">
        <motion.div
          ref={gridRef}
          className="hero-bottom-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          onScroll={handleScroll}
        >
          {cards.map((item, index) => (
             <TiltCard key={index} variants={cardUp} wrapperClass="hero-card-wrapper" className="grid-card">
              <div className="card-header">
                <span className="card-icon">{item.icon}</span>
                <h3>{item.title}</h3>
              </div>
              <p className="card-desc">{item.desc}</p>
            </TiltCard>
          ))}
        </motion.div>

        {/* Minimalist dot indicators — mobile only */}
        <div className="hero-carousel-dots">
          {cards.map((_, i) => (
            <span
              key={i}
              className={`hero-dot${i === activeDot ? " hero-dot-active" : ""}`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}

export default Hero;
