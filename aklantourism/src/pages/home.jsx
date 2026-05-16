import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>Aklan Tourism — Discover the Wonders of Aklan, Philippines</title>
        <meta name="description" content="Explore Aklan's world-class beaches, vibrant festivals, and breathtaking nature. Your guide to Boracay White Beach, Jawili Falls, Bakhawan Eco-Park, and the Ati-Atihan Festival." />
        <meta property="og:title" content="Aklan Tourism — Gateway to Paradise" />
        <meta property="og:description" content="Discover world-class beaches, the Ati-Atihan Festival, and breathtaking natural wonders across Aklan, Philippines." />
        <meta property="og:url" content="https://aklan-tourism.vercel.app/" />
      </Helmet>

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