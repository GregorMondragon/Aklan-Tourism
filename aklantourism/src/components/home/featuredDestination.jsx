import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/featuredDestination.css";

/* ── Destination data ─────────────────────────────────── */
const destinations = [
  {
    id: 4,
    name: "Jawili Beach",
    location: "Tangalan, Aklan",
    category: "Beach",
    tagline: "Seven Basins. One Shoreline.",
    description:
      "A rare coastal gem in Tangalan where a calm charcoal-sand beach meets the legendary seven-basin Jawili Falls — one of Aklan's most unique nature combinations.",
    stats: [
      { icon: "🌊", label: "Calm Waters" },
      { icon: "💧", label: "Jawili Falls Nearby" },
      { icon: "🐟", label: "Fresh Local Catch" },
    ],
    image: "/Images/aklantourismpictures/Jawili%20Beach/jawili1.webp",
  },
  {
    id: 1,
    name: "Boracay White Beach",
    location: "Malay, Aklan",
    category: "Beach",
    tagline: "The World's Finest White Sand.",
    description:
      "A world-class 4km stretch of powdery white sand and turquoise waters. Consistently ranked among the best beaches on the planet — the crown jewel of Philippine tourism.",
    stats: [
      { icon: "🏖️", label: "4km Shoreline" },
      { icon: "⛵", label: "Sunset Sailing" },
      { icon: "🤿", label: "Watersports" },
    ],
    image: "/Images/aklantourismpictures/Boracay%20White%20Beach/boracay6.webp",
  },
  {
    id: 8,
    name: "Bakhawan Eco-Park",
    location: "Kalibo, Aklan",
    category: "Nature",
    tagline: "Walk Among the Mangroves.",
    description:
      "A 10-hectare award-winning mangrove sanctuary with a scenic 1.3km bamboo boardwalk — a living testament to conservation success, minutes from Kalibo Airport.",
    stats: [
      { icon: "🎋", label: "1.3km Boardwalk" },
      { icon: "🦅", label: "Rich Birdlife" },
      { icon: "🌿", label: "Mangrove Forest" },
    ],
    image: "/Images/aklantourismpictures/BakhawanEcoPark/bakhawan3.jpg",
  },
  {
    id: 16,
    name: "Ati-Atihan Festival",
    location: "Kalibo, Aklan",
    category: "Cultural Heritage",
    tagline: "The Mother of All Philippine Festivals.",
    description:
      "Held every January, Ati-Atihan fills Kalibo's streets with tribal drumming, painted dancers, and a week-long spiritual celebration that has endured for centuries.",
    stats: [
      { icon: "🥁", label: "Tribal Drums" },
      { icon: "🎭", label: "Street Parades" },
      { icon: "🕯️", label: "Santo Niño Devotion" },
    ],
    image: "/Images/aklantourismpictures/Atiatihan/atiatihan1.jpg",
  },
];

/* ── Shared animation constants ───────────────────────── */
const easeOut = [0.16, 1, 0.3, 1];

const cardVariants = {
  offscreen: { opacity: 0, y: 50 },
  onscreen: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: easeOut, delay: i * 0.1 },
  }),
};

/* ═══════════════════════════════════════════════════════ */
const FeaturedDestination = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => setActiveIndex((p) => (p + 1) % destinations.length);
  const prevSlide = () => setActiveIndex((p) => (p - 1 + destinations.length) % destinations.length);
  const getIndex = (offset) => (activeIndex + offset + destinations.length) % destinations.length;

  const active = destinations[activeIndex];

  // ── Animation Variants ──
  // Transition variants specifically for the content swap
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };

  const eyebrowVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: easeOut }
    }
  };

  const taglineVariants = {
    hidden: { opacity: 0, x: 60, italic: true },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.0, ease: easeOut }
    }
  };

  const descVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.1, ease: easeOut }
    }
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easeOut }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.9, ease: easeOut }
    }
  };

  const statsContainerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  // Scroll variants for synchronized premium stagger
  const scrollReveal = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.25, delayChildren: 0.1 }
    }
  };

  const itemReveal = {
    hidden: { opacity: 0, y: 60, scale: 0.94, rotateX: "15deg" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: "0deg",
      transition: { duration: 2, ease: easeOut }
    }
  };

  const labelReveal = {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 2, ease: easeOut }
    }
  };

  const contentReveal = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 2, ease: easeOut }
    }
  };

  const cardsReveal = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 2, ease: easeOut }
    }
  };

  const bgReveal = {
    hidden: { opacity: 0, scale: 1.15 },
    visible: { opacity: 1, scale: 1, transition: { duration: 2, ease: easeOut } }
  };

  return (
    <motion.section
      className="featured"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={scrollReveal}
    >
      {/* ── Animated Background Wrapper ── */}
      <motion.div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }} variants={bgReveal}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${activeIndex}`}
            className="featured-bg"
            style={{ backgroundImage: `url(${active.image})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </motion.div>

      {/* ── Gradient Overlay ── */}
      <div className="featured-overlay" />

      {/* ═══ TOP LABEL ═══ */}
      <motion.div
        className="featured-label-row"
        variants={labelReveal}
      >
        <motion.span
          className="featured-label-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          style={{ originX: 0 }}
        />
        <motion.span className="featured-label-text">
          TOP DESTINATIONS
        </motion.span>
        <motion.span
          className="featured-label-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          style={{ originX: 1 }}
        />
      </motion.div>

      {/* ═══ MAIN LAYOUT ═══ */}
      <motion.div className="featured-container">

        {/* ── LEFT: Text content ── */}
        <motion.div className="featured-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${activeIndex}`}
              className="featured-text-block"
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.1 }}
            >
              <motion.div className="feat-eyebrow" variants={eyebrowVariants}>
                <span className="feat-category-tag">{active.category}</span>
                <span className="feat-sep">·</span>
                <span className="feat-location">📍 {active.location}</span>
              </motion.div>

              <motion.h2 className="feat-title" variants={titleVariants}>
                {active.name}
              </motion.h2>

              <motion.p className="feat-tagline" variants={taglineVariants}>
                "{active.tagline}"
              </motion.p>

              <motion.div
                className="feat-rule"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ originX: 0 }}
              />

              <motion.p className="feat-desc" variants={descVariants}>
                {active.description}
              </motion.p>

              <motion.div
                className="feat-stats"
                variants={statsContainerVariants}
              >
                {active.stats.map((s, i) => (
                  <motion.div
                    key={i}
                    className="feat-stat"
                    variants={statItemVariants}
                  >
                    <span className="feat-stat-icon">{s.icon}</span>
                    <span className="feat-stat-label">{s.label}</span>
                  </motion.div>
                ))}
              </motion.div>
              <motion.button
                className="feat-cta-btn"
                variants={ctaVariants}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() =>
                  navigate("/destinations", { state: { openDestinationId: active.id } })
                }
              >
                View Destination
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── RIGHT: Cards + Navigation ── */}
        <motion.div
          className="featured-right"
          variants={cardsReveal}
        >

          {/* Card stack */}
          <div className="card-stack">
            <AnimatePresence mode="popLayout" initial={false}>
              {[0, 1, 2].map((offset, index) => {
                const item = destinations[getIndex(offset)];
                const isActive = index === 0;

                return (
                  <motion.div
                    key={`card-${item.name}`}
                    layout
                    layoutId={`card-${item.name}`}
                    initial={{ opacity: 0, x: 40, scale: 0.9 }}
                    animate={{
                      opacity: isActive ? 1 : 0.65,
                      x: 0,
                      scale: isActive ? 1.08 : 1,
                      zIndex: 3 - index,
                    }}
                    exit={{
                      opacity: 0,
                      x: -40,
                      scale: 0.8,
                      transition: { duration: 0.4, ease: "easeInOut" }
                    }}
                    transition={{
                      layout: {
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                        delay: index * 0.04
                      },
                      opacity: { duration: 0.4, delay: index * 0.04 },
                      scale: {
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                        delay: index * 0.04
                      },
                    }}
                    className={`card ${isActive ? "card-active" : "card-preview"}`}
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="card-gradient" />
                    <div className="card-body">
                      <span className="card-tag">{item.category}</span>
                      <p className="card-name">{item.name}</p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation row — fixed at bottom, never moves */}
          <div className="feat-nav">
            <button
              className="feat-nav-btn"
              onClick={prevSlide}
              aria-label="Previous destination"
            >
              ←
            </button>

            {/* Progress dots */}
            <div className="feat-nav-dots">
              {destinations.map((_, i) => (
                <button
                  key={i}
                  className={`feat-dot ${i === activeIndex ? "feat-dot-active" : ""}`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to destination ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="feat-nav-btn"
              onClick={nextSlide}
              aria-label="Next destination"
            >
              →
            </button>
          </div>

        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default FeaturedDestination;
