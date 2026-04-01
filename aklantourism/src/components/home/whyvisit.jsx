import { motion } from "framer-motion"; // 1. Import motion
import "../../styles/whyvisit.css";

function WhyVisit() {

  const headerVariants = {
    hidden: { opacity: 0, x: 80, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const paragraphVariants = {
    hidden: { opacity: 0, x: -80, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (

    <section className="why">
      <motion.div
        className="line"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
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

      {/* Paragraph: Fades in from the Left */}
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

      {/* Cards: Pop up directly on scroll */}
      <div className="grid">
        <motion.div className="cardWhy"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          whileHover="hover">
          <motion.div className="img-container" style={{ overflow: "hidden" }}>
            <motion.img
              src="/Images/Boracay.jpg"
              alt="Boracay White Beach — stunning 4km white sand shoreline in Aklan"
              loading="lazy"
              variants={{
                hover: { scale: 1.1, transition: { duration: 0.6, ease: "easeOut" } }
              }}
            />
          </motion.div>
          <h3>World-Class Beaches</h3>
          <p className="Descp">
            Experience the famous white sand and crystal-clear waters that
            attract tourists worldwide.
          </p>
        </motion.div>

        <motion.div className="cardWhy"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.15 }}
          whileHover="hover">
          <motion.div className="img-container" style={{ overflow: "hidden" }}>
            <motion.img
              src="/Images/Ati-atihan.jpg"
              alt="Ati-Atihan Festival in Kalibo — colorful tribal traditions and street dancing"
              loading="lazy"
              variants={{
                hover: { scale: 1.1, transition: { duration: 0.6, ease: "easeOut" } }
              }}
            />
          </motion.div>
          <h3>Rich Culture & Festivals</h3>
          <p>
            Enjoy colorful traditions, music, and the vibrant Ati-Atihan
            Festival.
          </p>
        </motion.div>

        <motion.div className="cardWhy"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.3 }}
          whileHover="hover">
          <motion.div className="img-container" style={{ overflow: "hidden" }}>
            <motion.img
              src="/Images/Bakhawan.jpg"
              alt="Bakhawan Eco-Park in Kalibo — bamboo boardwalk through lush mangrove forest"
              loading="lazy"
              variants={{
                hover: { scale: 1.1, transition: { duration: 0.6, ease: "easeOut" } }
              }}
            />
          </motion.div>
          <h3>Nature & Adventure</h3>
          <p>
            Discover waterfalls, mountains, and eco-adventures across the
            province.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyVisit;