import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "../../styles/whyvisit.css";

const REASONS = [
  {
    id: "beaches", num: "01", tag: "Coastal Wonder",
    title: "World-Class Beaches",
    subtitle: "Boracay & Beyond",
    desc: "From the powdery 4.5km white sands of Boracay — ranked among the world's finest — to the hidden serenity of Puka Shell Beach, Aklan's coastline is an unrivalled canvas of turquoise waters and powder-white shores that redefine the meaning of paradise.",
    stat: "4.5km", statLabel: "of Pristine White Sand",
    image: "/Images/Boracay.jpg",
  },
  {
    id: "culture", num: "02", tag: "Living Heritage",
    title: "Rich Culture & Festivals",
    subtitle: "Ati-Atihan & Ancient Traditions",
    desc: "Feel the earth shake with the Ati-Atihan Festival — the 'Mother of All Philippine Festivals.' Centuries of Aklanon spirit pour into the streets through thunderous drumbeats, elaborate tribal costumes, and a communal energy that has endured for over four hundred years.",
    stat: "400+", statLabel: "Years of Living Tradition",
    image: "/Images/Ati-atihan.jpg",
  },
  {
    id: "nature", num: "03", tag: "Eco Adventure",
    title: "Nature & Adventure",
    subtitle: "Mangroves to Mountains",
    desc: "Traverse the bamboo boardwalks of Bakhawan Eco-Park through 620 hectares of lush mangrove forest. Discover hidden waterfalls, limestone formations, and sea caves that reveal a side of Aklan few ever witness — raw, untouched, and breathtakingly alive.",
    stat: "620ha", statLabel: "of Protected Ecosystem",
    image: "/Images/aklantourismpictures/BakhawanEcoPark/bakhawan3.jpg",
  },
];

// Helper component for premium character-by-character typing effect
function SplitText({ text, className, delay = 0, charDelay = 0.03 }) {
  const words = text.split(" ");
  return (
    <span className={className} style={{ display: "inline-block" }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "pre" }}>
          {word.split("").map((char, charIndex) => {
            const previousCharsLength = words.slice(0, wordIndex).join(" ").length;
            const spaceCount = wordIndex > 0 ? 1 : 0;
            const globalIndex = previousCharsLength + spaceCount + charIndex;

            return (
              <motion.span
                key={charIndex}
                variants={{
                  hidden: { opacity: 0, y: 15, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring", damping: 15, stiffness: 350,
                      delay: delay + (globalIndex * charDelay)
                    },
                  },
                }}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 && <span> </span>}
        </span>
      ))}
    </span>
  );
}

// Helper component for word-by-word reveal effect
function SplitWord({ text, className, delay = 0, wordDelay = 0.05 }) {
  const words = text.split(" ");
  return (
    <span className={className} style={{ display: "inline-block" }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "pre" }}>
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring", damping: 15, stiffness: 250,
                  delay: delay + (wordIndex * wordDelay)
                },
              },
            }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
          {wordIndex < words.length - 1 && <span> </span>}
        </span>
      ))}
    </span>
  );
}

// 3D Tilt Card Component
function TiltCard({ children, variants, customDelay }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
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
      style={{ perspective: 1200, display: "flex", flexDirection: "column", height: "100%" }}
      variants={variants}
      custom={customDelay}
    >
      <motion.div
        className="why-card-container"
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
          willChange: "transform, rotate"
        }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
        whileTap={{
          scale: 0.98,
          transition: { duration: 0.2 }
        }}
      >
        <div style={{ transform: "translateZ(30px)", height: "100%", display: "flex", flexDirection: "column", willChange: "transform" }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

function WhyVisit() {
  const cardVariants = {
    hidden: { opacity: 0, y: 80, rotateX: 15, scale: 0.95 },
    visible: (customDelay) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        delay: customDelay
      }
    })
  };

  return (
    <section className="why" id="why-visit">
      <div className="why-inner">
        <motion.header
          className="why-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          <motion.div
            className="why-rule"
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              visible: {
                scaleX: 1, opacity: 1,
                transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
              }
            }}
          />
          <motion.p
            className="why-eyebrow"
            variants={{
              hidden: { opacity: 0, scale: 0.5, y: 30 },
              visible: {
                opacity: 1, scale: 1, y: 0,
                transition: { type: "spring", stiffness: 250, damping: 15, delay: 0.2 }
              }
            }}
          >
            Why Aklan
          </motion.p>
          <h2 className="why-title">
            <motion.em
              className="why-thin"
              variants={{
                hidden: { clipPath: "inset(0 100% 0 0)" },
                visible: {
                  clipPath: "inset(0 0% 0 0)",
                  transition: { duration: 0.6, ease: [0.45, 0, 0.55, 1], delay: 0.4 }
                }
              }}
            >
              More Than&nbsp;
            </motion.em>
            <motion.strong
              className="why-bold"
              variants={{
                hidden: { clipPath: "inset(0 100% 0 0)" },
                visible: {
                  clipPath: "inset(0 0% 0 0)",
                  transition: { duration: 0.6, ease: [0.45, 0, 0.55, 1], delay: 0.8 }
                }
              }}
            >
              a Destination
            </motion.strong>
          </h2>
          <p className="why-subtext">
            <SplitWord
              text="A province where every shoreline tells a story, every festival carries a legacy, and every trail leads to wonder."
              delay={1.2}
              wordDelay={0.04}
            />
          </p>
        </motion.header>

        <motion.div
          className="why-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {REASONS.map((r, i) => (
            <TiltCard key={r.id} variants={cardVariants} customDelay={1.5 + (i * 0.2)}>
              <div className="why-card">
                <div className="wc-img-wrap">
                  <img src={r.image} alt={r.title} className="wc-img" loading="lazy" />
                </div>
                <div className="wc-body">
                  <div className="wc-top-row">
                    <span className="wc-num">{r.num}</span>
                    <span className="wc-tag">{r.tag}</span>
                  </div>
                  <h3 className="wc-title">{r.title}</h3>
                  <p className="wc-subtitle">{r.subtitle}</p>
                  <p className="wc-desc">{r.desc}</p>
                  <div className="wc-stat-row">
                    <span className="wc-stat-num">{r.stat}</span>
                    <span className="wc-stat-label">{r.statLabel}</span>
                  </div>
                  <div className="wc-accent-line" />
                </div>
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default WhyVisit;