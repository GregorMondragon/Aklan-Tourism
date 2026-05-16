import { motion } from "framer-motion";
import SEO from "../components/SEO";
import AboutComponent from "../components/about/about";

function About() {
  return (
    <>
      <SEO 
        title="About"
        description="Learn about Aklan Tourism — our mission to showcase Aklan's natural beauty, cultural heritage, and vibrant festivals to travelers from around the world."
        url="/about"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <main id="main-content">
          <AboutComponent />
        </main>
      </motion.div>
    </>
  );
}

export default About;
