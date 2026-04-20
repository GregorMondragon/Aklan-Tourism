import { useState } from "react";
import { motion } from "framer-motion";
import "../styles/featuredDestination.css";



const destinations = [
  {
    name: "Jawili Beach",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description: "Experience the world-famous white sand beaches and crystal-clear waters of Boracay."
  },
  {
    name: "Boracay White Beach",
    image: "/Images/Boracay.jpg",
    description: "Discover the seven-tiered cascading waterfalls surrounded by lush greenery."
  },
  {
    name: "Bakhawan Eco-Park",
    image: "/Images/Bakhawan.jpg",
    description: "Challenge yourself with a hike to Panay Island’s highest peak."
  },
  {
    name: "Ati-Atihan Festival",
    image: "/Images/Ati-atihan.jpg",
    description: "Celebrate culture and heritage with vibrant costumes and street dancing."
  }
];


const FeaturedDestination = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const nextSlide = () => {
    triggerAnimation(() => setActiveIndex((prev) => (prev + 1) % destinations.length));
  };

  const prevSlide = () => {
    triggerAnimation(() =>
      setActiveIndex((prev) => (prev - 1 + destinations.length) % destinations.length)
    );
  };

  const triggerAnimation = (callback) => {
    setAnimate(true);
    setTimeout(() => {
      callback();
      setAnimate(false);
    }, 300);
  };

  const getIndex = (offset) => (activeIndex + offset + destinations.length) % destinations.length;


  const scrollFadeIn = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: {
      opacity: 1,
      y: 90,
      transition: { duration: 2, ease: "easeOut" }
    }
  };

  const scrollPopUp = {
    offscreen: { opacity: 0, scale: 0.8, y: 100 },
    onscreen: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.5, ease: "easeOut" }
    }
  };


  const fadeInRight = {
    hidden: { opacity: 0, x: -100 }, // Started further right for more "travel"
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 3, ease: [0.16, 1, 0.3, 1] } // Custom cubic-bezier for premium feel
    }
  };

  return (
    <motion.section
      className={`featured ${animate ? "fade-bg" : ""}`}
      style={{ backgroundImage: `url(${destinations[activeIndex].image})` }}
      // 3. Scroll Trigger Configuration
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0.3 }} // once: false allows it to animate again when scrolling back up
    >

      <div className="overlay"></div>
      <motion.h2
        className="section-header2"
        variants={scrollFadeIn}
      >
        TOP DESTINATIONS
      </motion.h2>

      <div className="featured-container">
        <motion.div
          className={`featured-content ${animate ? "fade-text" : ""}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeInRight}
        >
          <h2>{destinations[activeIndex].name}</h2>
          <p>{destinations[activeIndex].description}</p>
          <motion.button
            className="explore-btn"
            variants={scrollPopUp}
          >Explore More
          </motion.button>
        </motion.div>

        {/* RIGHT SIDE CARDS - Pops up on scroll */}
        <motion.div
          className="card-stack"
          variants={scrollPopUp}
        >
          {[0, 1, 2].map((offset, index) => {
            const item = destinations[getIndex(offset)];
            return (
              <div
                key={index}
                className={`card ${index === 0 ? "active" : "preview"} ${animate ? "slide-card" : ""}`}
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="card-name">{item.name}</div>
              </div>
            );
          })}

          <div className="arrows">
            <button onClick={prevSlide}>◀</button>
            <button onClick={nextSlide}>▶</button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturedDestination;
};

export default FeaturedDestination;