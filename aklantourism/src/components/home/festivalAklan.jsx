import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import "../../styles/festivalAklan.css";

const AklanFestival = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  // Scroll tracking for parallax depth
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax offsets for different columns to create depth
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yMiddle = useTransform(scrollYProgress, [0, 1], [0, -220]); // Moves faster
  const yContent = useTransform(scrollYProgress, [0, 1], [0, -60]);

  // Premium cubic bezier
  const premiumEase = [0.16, 1, 0.3, 1];

  // Clean fade-up reveal for images
  const imageReveal = {
    hidden: {
      y: 60,
      scale: 1.1,
      opacity: 0
    },
    visible: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: { duration: 2, ease: premiumEase }
    }
  };

  // 3D-tilt masked reveal for main title
  const textReveal = {
    hidden: { y: 80, opacity: 0, rotateX: "20deg" },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: "0deg",
      transition: { duration: 2, ease: premiumEase }
    }
  };

  const slideLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 2, ease: premiumEase }
    }
  };

  const slideRight = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 2, ease: premiumEase }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1
      }
    }
  };

  const contentStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section className="festival-container" id="festivals" ref={sectionRef}>
      <motion.div
        className="grid-layout"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={staggerContainer}
      >

        {/* Left Column — Subtle Parallax */}
        <motion.div
          className="left-column"
          style={{ y: yLeft, willChange: 'transform' }}
        >
          <motion.div className="image-wrapper large" variants={imageReveal}>
            <img src="/Images/ati01.jpg" alt="Ati-Atihan Dancers" loading="eager" />
          </motion.div>
          <motion.div className="image-wrapper small-wide" variants={imageReveal}>
            <img src="/Images/ati02.jpg" alt="Ati-Atihan Celebration" loading="eager" />
          </motion.div>
        </motion.div>

        {/* Middle Column — Strong Parallax (Floating) */}
        <motion.div
          className="middle-column"
          style={{ y: yMiddle, willChange: 'transform' }}
        >
          <motion.div className="image-wrapper medium" variants={imageReveal}>
            <img src="/Images/vibrantkalibo.jpg" alt="Vibrant Kalibo" loading="eager" />
          </motion.div>
          <motion.div className="image-wrapper medium-tall" variants={imageReveal}>
            <img src="/Images/ati03.jpg" alt="Tribal Dancers" loading="eager" />
          </motion.div>
        </motion.div>

        {/* Right Column — Immersive Content Reveal */}
        <motion.div
          className="content-column"
          style={{ y: yContent, willChange: 'transform' }}
          variants={contentStagger}
        >
          <div style={{ overflow: 'hidden', perspective: '1000px' }}>
            <motion.h2 className="title" variants={textReveal}>
              Experience the Mother of All Philippine Festivals!
            </motion.h2>
          </div>

          <motion.div
            className="underline"
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 1.5, ease: premiumEase } }
            }}
            style={{ originX: 0 }}
          />

          <div style={{ overflow: 'hidden', perspective: '1000px' }}>
            <motion.h3 className="title2" variants={slideLeft}>
              Ati-atihan Festival
            </motion.h3>
          </div>

          <div style={{ overflow: 'hidden', perspective: '1000px' }}>
            <motion.p className="description" variants={slideRight}>
              From the rhythmic thumping of drums to the soot-covered dancers
              shouting "Hala Bira!", the Ati-Atihan Festival is a wild,
              soul-stirring celebration of faith and heritage.
            </motion.p>
          </div>

          <motion.button
            className="learn-btn"
            variants={textReveal}
            whileHover={{
              scale: 1.06,
              backgroundColor: "#eeb437",
              boxShadow: "0 10px 30px rgba(255, 187, 52, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/destinations', { state: { selectedDestId: 16 } })}
          >
            Join the Celebration
          </motion.button>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default AklanFestival;
