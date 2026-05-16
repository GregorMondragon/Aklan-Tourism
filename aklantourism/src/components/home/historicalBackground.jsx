import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';
import "../../styles/historicalBackground.css";

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

const HistoricalBackground = () => {
  const sectionRef = useRef(null);
  const [showFullStory, setShowFullStory] = useState(false);
  const lenis = useLenis();

  // Handle scroll lock with Lenis
  useEffect(() => {
    if (!lenis) return;

    if (showFullStory) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [showFullStory, lenis]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax offsets for depth effect
  const yImage1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yText1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yImage2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yText2 = useTransform(scrollYProgress, [0, 1], [0, -160]);

  const premiumEase = [0.16, 1, 0.3, 1];

  const fadeUp = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: premiumEase }
    }
  };

  const clipReveal = {
    hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
    visible: (customDelay = 0.4) => ({
      clipPath: "inset(0 0% 0 0)",
      opacity: 1,
      transition: { duration: 1.2, ease: [0.45, 0, 0.55, 1], delay: customDelay }
    })
  };

  const slideLeft = {
    hidden: { x: -250, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 2.2, ease: premiumEase }
    }
  };

  const slideRight = {
    hidden: { x: 250, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 2.2, ease: premiumEase }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1
    }
  };

  const introBlockVariant = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: premiumEase
      }
    }
  };

  const itemFadeUp = {
    hidden: { y: 30, opacity: 0 },
    visible: (customDelay = 0) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: premiumEase,
        delay: customDelay,
        staggerChildren: 0.2,
        delayChildren: customDelay + 0.1
      }
    })
  };

  return (
    <section className="history-container" id="history" ref={sectionRef}>
      <div className="history-bg-accent"></div>
      <div className="history-bg-accent-2"></div>

      <motion.div
        className="history-content-wrapper"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >

        {/* Intro Block */}
        <motion.div
          className="history-intro-block"
          variants={introBlockVariant}
        >
          <motion.div
            className="history-badge"
            variants={{
              hidden: { opacity: 0, scale: 0.8, y: 20 },
              visible: {
                opacity: 1, scale: 1, y: 0,
                transition: { type: "spring", stiffness: 200, damping: 15, delay: 0.1 }
              }
            }}
          >
            Discover Our Roots
          </motion.div>
          <motion.h2
            className="history-title-main"
            variants={{
              hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
              visible: {
                clipPath: "inset(0 0% 0 0)",
                opacity: 1,
                transition: { duration: 1.2, ease: [0.45, 0, 0.55, 1], delay: 0.5 }
              }
            }}
          >
            The Historical Background of Aklan
          </motion.h2>
          <p className="history-intro-text">
            <SplitWord
              text="Aklan is situated in the Western Visayas region of the Philippines. It is divided into 327 Barangays grouped into 17 Municipalities of which Kalibo is considered the Capital Town."
              delay={2}
              wordDelay={0.03}
            />
          </p>
        </motion.div>

        {/* Row 1: The Oldest Province */}
        <motion.div className="history-row" variants={itemFadeUp} custom={2.5}>
          {/* Parallax Wrapper separated from Animation */}
          <motion.div style={{ y: yImage1, willChange: 'transform' }} className="history-image-col">
            <motion.div
              className="history-image-container"
              variants={slideLeft}
            >
              <img
                src="/Images/history_aklan.png"
                alt="Birth of the Province of Aklan"
                className="history-img-large"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </motion.div>

          {/* Parallax Wrapper */}
          <motion.div style={{ y: yText1, willChange: 'transform' }} className="history-text-col">
            <motion.div
              className="history-text-card"
              variants={slideRight}
            >
              <motion.div className="history-year" variants={fadeUp}>1956</motion.div>
              <motion.h3 className="history-subtitle-elegant" variants={fadeUp}>
                Fascinating Facts of Aklan
              </motion.h3>
              <motion.p className="history-body-text" variants={fadeUp}>
                Aklan stands as a land of remarkable heritage. It was officially established as an independent province on April 25, 1956, after separating from Capiz through Republic Act 1414. Known as the oldest province in the Philippines with roots dating back to 1213 AD, it is also the global capital for Piña weaving and the birthplace of the 'Mother of All Philippine Festivals.'
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Row 2: The Bornean Datus (Text Left, Map Right) */}
        <motion.div className="history-row reverse" variants={itemFadeUp} custom={2.8}>
          {/* Parallax Wrapper */}
          <motion.div style={{ y: yText2, willChange: 'transform' }} className="history-text-col">
            <motion.div
              className="history-text-card"
              variants={slideLeft}
            >
              <motion.div className="history-year" variants={fadeUp}>1250</motion.div>
              <motion.h3 className="history-subtitle-elegant" variants={fadeUp}>
                In Search for Freedom
              </motion.h3>
              <motion.p className="history-body-text" variants={fadeUp}>
                Regarded as to be the country’s oldest province, the written history of Aklan takes us back to the middle of the 13th century when ten Bornean datus, together with their families, fled the oppressive rule of the Bornean king, Sultan Makatunaw.
              </motion.p>
              <motion.button
                className="history-read-more-btn"
                variants={fadeUp}
                onClick={() => setShowFullStory(true)}
              >
                Read Full Story
                <span style={{ fontSize: '1.2rem' }}>→</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Parallax Wrapper */}
          <motion.div style={{ y: yImage2, willChange: 'transform' }} className="history-secondary-image-container">
            <motion.img
              src="/Images/atiold.jpg"
              alt="Historical photo of Ati ancestors"
              className="history-secondary-img"
              loading="lazy"
              decoding="async"
              variants={slideRight}
            />
          </motion.div>
        </motion.div>

      </motion.div>

      {/* Full Story Modal */}
      <AnimatePresence>
        {showFullStory && (
          <motion.div
            className="history-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFullStory(false)}
          >
            <motion.div
              className="history-modal-container"
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="history-modal-close" onClick={() => setShowFullStory(false)}>
                ✕
              </button>

              <div className="history-modal-content" data-lenis-prevent>
                <h2 className="history-modal-title">The Epic Journey of Aklan</h2>
                <div className="history-modal-text">
                  <p>Regarded as to be the country’s oldest province, the written history of Aklan takes us back to the middle of the 13th century when ten Bornean datus, together with their families, fled the oppressive rule of the Bornean king, Sultan Makatunaw.</p>

                  <p>In search for freedom, new lands and better fortunes, they left Borneo’s shore on a flotilla of balangays (ships) sailing northward. And one day, in 1250 (circa), they landed on the bank of the Sirwakan River near the present town of San Joaquin, Iloilo. Immediately after, Datu Puti, the leader of the expedition, came in contact with the Atis, the black-skinned, pygmy aborigines of Panay Island. The Ati king named Marikudo and his queen, Maniwang-tiwang, welcomed the newcomers. Datu Puti asked Marikudo if the latter’s people would be willing to move into the hinterlands and mountains in favor of the newcomers.</p>

                  <p>An agreement was reached. The price for the land was a gold saduk (wide-brimmed helmet), a chain of pure gold necklace, and some gifts consisting of colored clothes, decorated arms, and fanciful trinkets. The historic sale (Barter of Panay) was sealed by a sumptuous banquet attended by both the Atis and the Bornean peoples, and everybody had a joyous celebration – feasting, dancing and singing. The celebration is commemorated every year, during the blooming season of mangoes, or at about the same time of the year when the purchase was consummated.</p>

                  <p>In later years, when the Ati descendants of Marikudo withdrew to the mountains, the settlers chose to perpetuate the celebration. In the absence of the Atis, some of the settlers smeared themselves with soot to simulate the Atis. Thus, from then on, the celebration that has withstood the tests of centuries came to be known as the Ati-atihan Festival. The island of Panay was divided into three “sakups” (districts): Irong-Irong (now Iloilo) under Datu Paiburong; Hantik (now Antique) under Datu Sumakwel; and Aklan (what was then Aklan and Capiz combined) under Datu Bangkaya. These three “sakups” were united for mutual protection against enemy attacks into one confederation called “Confederation of Madyaas” under the overlordship of Datu Sumakwel who was the oldest and wisest of the ten Bornean datus.</p>

                  <p>Our historians have overlooked an interesting fact about Datu Bangkaya’s “sakup” of Aklan. It was originally (geographically and ethnologically also) the valley of Aklan, centering in the present town of Kalibo. Since the days of Datu Bangkaya, the people of this region have developed their own peculiar dialect, distinct customs and traditions, and local culture. Thus, it has come to pass that the present-day Aklanons posses a deep-rooted pride and loyalty to their own locality, setting them apart from the rest of the Capiceños. They fondly aspire to be an independent province, separate and independent from Capiz province. There is further historical validity to the Aklanons’ dream of a separate province. As early as 1433, according to Parayan historical records, there was already a well-organized government on Aklan soil under the rule of Kalantiaw, the third chief of Panay. This Aklan ruler wrote the famous “Kalantiaw Code” containing eighteen sugo (orders) which reveal the high degree of civilization which the people of Aklan had then.</p>

                  <p>Following that spirit of patriotic desire, after having developed their ideals of freedom and having progressed in education and culture, in commerce and industry, and in political maturity and experience, whenever occasions presented, the people of Aklan, through their chosen leaders, had taken the issue of separation and independence:</p>

                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', color: 'rgba(255,255,255,0.7)' }}>
                    <li><strong>April 14, 1901:</strong> Don Natalio B. Acevedo, Aklan delegation head, presented the first memorial for the separation of Aklan from Capiz to the Junta Magna headed by Commissioner Dean C. Worcester.</li>
                    <li><strong>1920:</strong> Representatives Jose Alba Urquiola and Eufrosino Alba of the second and third districts of Capiz, respectively, presented a Bill for Aklan’s formal separation from Capiz.</li>
                    <li><strong>1925 to 1930:</strong> Representatives Manuel Laserna and Teodulfo Suner from the third district of Capiz filed a similar Bill. Subsequently, Dr. Rafael S. Tumbokon of the same succeeded in securing the approval of the Committee on Provincial and Municipal Governments after the hearing, but was not able to push it through due to time constraints.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HistoricalBackground;
