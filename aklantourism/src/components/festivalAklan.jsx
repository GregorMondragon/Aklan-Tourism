import React from 'react';
import { motion } from 'framer-motion';
import "../styles/festivalAklan.css";

const AklanFestival = () => {
  // Animation variants for reusability
  const fadeInRight = {
    hidden: { opacity: 0, x: 100 }, // Started further right for more "travel"
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 2, ease: [0.16, 1, 0.3, 1] } // Custom cubic-bezier for premium feel
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 80, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  const scrollPopUp = {
    offscreen: { opacity: 0, scale: 0.8, y: 100 },
    onscreen: {
      opacity: 1,
      scale: 1,
      y: 30,
      transition: { type: "spring", bounce: 0.2, duration: 2 }
    }
  };
  return (
    <section className="festival-container">
      <motion.div
        className="grid-layout"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={staggerContainer}
      >

        {/* Left Column */}
        <div className="left-column">
          <motion.div className="image-wrapper large" variants={fadeInUp}>
            <img src="/Images/ati01.jpg" alt="Ati-Atihan" />
          </motion.div>
          <motion.div className="image-wrapper small-wide" variants={fadeInUp}>
            <img src="/Images/ati02.jpg" alt="Ati-atihan" />
          </motion.div>
        </div>

        {/* Middle Column */}
        <div className="middle-column">
          <motion.div className="image-wrapper medium" variants={fadeInUp}>
            <img src="/Images/vibrantkalibo.jpg" alt="Sto. Niño" />
          </motion.div>
          <motion.div className="image-wrapper medium-tall" variants={fadeInUp}>
            <img src="/Images/ati03.jpg" alt="Dancers" />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="content-column">
          <motion.h1 className="title" variants={fadeInRight}>Experience the Mother of All Philippine Festivals!</motion.h1>

          <motion.div
            className="underline"
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            // Sync with the scroll repeat
            viewport={{ once: false }}
            transition={{ delay: 0.4, duration: 1.2 }}
          />
          <motion.div variants={fadeInRight}>
            <h2 className="title2">Ati-atihan Festival</h2>

            <p className="description">
              From the rhythmic thumping of drums to the soot-covered dancers
              shouting "Hala Bira!", the Ati-Atihan Festival is a wild,
              soul-stirring celebration of faith and heritage.
            </p>
          </motion.div>
          <motion.button
            className="learn-btn"
            variants={scrollPopUp}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: false, amount: 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}

          >
            Join the Celebration
          </motion.button>
        </div>

      </motion.div>
    </section>
  );
};

export default AklanFestival;