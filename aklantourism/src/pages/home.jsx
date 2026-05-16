import SEO from "../components/SEO";
import Hero from "../components/home/hero";
import WhyVisit from "../components/home/whyvisit";
import FeaturedDestinations from "../components/home/featuredDestination";
import AklanFestival from "../components/home/festivalAklan";
import HistoricalBackground from "../components/home/historicalBackground";
import PageIntro from "../components/home/PageIntro";
import { motion } from "framer-motion";

function Home({ setIntroComplete }) {

  return (
    <>
      <SEO 
        title="Home"
        url="/"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <PageIntro onComplete={() => setIntroComplete(true)} />
        <main id="main-content">
          <Hero introComplete={true} />
          <WhyVisit />
          <FeaturedDestinations />
          <AklanFestival />
          <HistoricalBackground />
        </main>
      </motion.div>
    </>
  );
}

export default Home;