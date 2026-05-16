import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import AboutComponent from "../components/about/about";

function About() {
  return (
    <>
      <Helmet>
        <title>About — Aklan Tourism | Our Mission &amp; Story</title>
        <meta name="description" content="Learn about Aklan Tourism — our mission to showcase Aklan's natural beauty, cultural heritage, and vibrant festivals to travelers from around the world." />
        <meta property="og:title" content="About Aklan Tourism — Our Mission & Story" />
        <meta property="og:description" content="Dedicated to promoting authentic Aklan travel experiences, from pristine beaches to centuries-old cultural traditions." />
        <meta property="og:url" content="https://aklan-tourism.vercel.app/about" />
      </Helmet>

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
