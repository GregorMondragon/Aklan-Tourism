import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import "../../styles/festivalAklan.css";

const AklanFestival = () => {
  const navigate = useNavigate();

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
        // STICKY SCROLL SETTINGS
        viewport={{ once: false, amount: 0.2 }}
        variants={staggerContainer}
      >

        {/* Left Column */}
        <div className="left-column">
          <motion.div className="image-wrapper large" variants={fadeInUp}>
            <img src="/Images/ati01.jpg" alt="Colorful painted dancers at the Ati-Atihan Festival parade in Kalibo" loading="lazy" />
          </motion.div>
          <motion.div className="image-wrapper small-wide" variants={fadeInUp}>
            <img src="/Images/ati02.jpg" alt="Ati-Atihan Festival street celebration with tribal costumes" loading="lazy" />
          </motion.div>
        </div>

        {/* Middle Column */}
        <div className="middle-column">
          <motion.div className="image-wrapper medium" variants={fadeInUp}>
            <img src="/Images/vibrantkalibo.jpg" alt="Vibrant Kalibo street celebrations during Ati-Atihan Festival" loading="lazy" />
          </motion.div>
          <motion.div className="image-wrapper medium-tall" variants={fadeInUp}>
            <img src="/Images/ati03.jpg" alt="Tribal dancers in body paint performing at Ati-Atihan Festival" loading="lazy" />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="content-column">
          <motion.h2 className="title" variants={fadeInRight}>Experience the Mother of All Philippine Festivals!</motion.h2>

          <motion.div
            className="underline"
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            // Sync with the scroll repeat
            viewport={{ once: false }}
            transition={{ delay: 0.4, duration: 1.2 }}
          />
          <motion.div variants={fadeInRight}>
            <h3 className="title2">Ati-atihan Festival</h3>

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
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => navigate('/destinations', { state: { selectedDestId: 16 } })}
          >
            Join the Celebration
          </motion.button>
        </div>

      </motion.div>
    </section>
  );
};

export default AklanFestival;
