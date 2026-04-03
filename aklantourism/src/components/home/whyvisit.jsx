import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "../../styles/whyvisit.css";

// 3D Tilt Card Component
function TiltCard({ children, variants, transition }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

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
      style={{ perspective: 1200, display: "flex", flexDirection: "column" }}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      transition={transition}
    >
      <motion.div
        className="cardWhyContainer"
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
      >
        <div style={{ transform: "translateZ(40px)", height: "100%", display: "flex", flexDirection: "column", willChange: "transform" }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

function WhyVisit() {
  const headerVariants = {
    hidden: { opacity: 0, x: 80, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const paragraphVariants = {
    hidden: { opacity: 0, x: -80, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
    }
  };

  const leftCardVariants = {
    hidden: { opacity: 0, x: -120 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 2, ease: [0.25, 1, 0.5, 1] }
    }
  };

  const middleCardVariants = {
    hidden: { opacity: 0, y: 120 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 2, ease: [0.25, 1, 0.5, 1] }
    }
  };

  const rightCardVariants = {
    hidden: { opacity: 0, x: 120 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 2, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <section className="why">
      <motion.div
        className="line"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0.5 }}
      ></motion.div>

      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        variants={headerVariants}
      >
        Why Visit Aklan?
      </motion.h2>

      <motion.p
        className="intro"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        variants={paragraphVariants}
      >
        Aklan offers a perfect mix of natural beauty, culture, and exciting
        adventures for every traveler.
      </motion.p>

      <div className="grid">
        <TiltCard variants={leftCardVariants}>
          <div className="cardWhy">
            <div className="img-container" style={{ overflow: "hidden" }}>
              <img
                src="/Images/Boracay.jpg"
                alt="Boracay White Beach — stunning 4km white sand shoreline in Aklan"
                loading="lazy"
              />
            </div>
            <h3>World-Class Beaches</h3>
            <p className="Descp">
              Experience the famous white sand and crystal-clear waters that
              attract tourists worldwide.
            </p>
          </div>
        </TiltCard>

        <TiltCard variants={middleCardVariants} transition={{ delay: 0.3 }}>
          <div className="cardWhy">
            <div className="img-container" style={{ overflow: "hidden" }}>
              <img
                src="/Images/Ati-atihan.jpg"
                alt="Ati-Atihan Festival in Kalibo — colorful tribal traditions and street dancing"
                loading="lazy"
              />
            </div>
            <h3>Rich Culture & Festivals</h3>
            <p>
              Enjoy colorful traditions, music, and the vibrant Ati-Atihan
              Festival.
            </p>
          </div>
        </TiltCard>

        <TiltCard variants={rightCardVariants} transition={{ delay: 0.3 }}>
          <div className="cardWhy">
            <div className="img-container" style={{ overflow: "hidden" }}>
              <img
                src="/Images/aklantourismpictures/BakhawanEcoPark/bakhawan3.jpg"
                alt="Bakhawan Eco-Park in Kalibo — bamboo boardwalk through lush mangrove forest"
                loading="lazy"
              />
            </div>
            <h3>Nature & Adventure</h3>
            <p>
              Discover waterfalls, mountains, and eco-adventures across the
              province.
            </p>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}

export default WhyVisit;