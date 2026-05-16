import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import DestinationsList from "../components/destinations/DestinationsList";

function Destinations() {
  return (
    <>
      <Helmet>
        <title>Destinations — Aklan Tourism | Beaches, Nature &amp; Culture</title>
        <meta name="description" content="Explore all tourist destinations in Aklan — from Boracay White Beach and Puka Shell Beach to Jawili Falls, Bakhawan Eco-Park, Pangihan Cave, and the Ati-Atihan Festival." />
        <meta property="og:title" content="Aklan Destinations — Beaches, Nature & Cultural Heritage" />
        <meta property="og:description" content="Browse all tourist spots in Aklan, Philippines. Filter by Beach, Nature, and Cultural Heritage." />
        <meta property="og:url" content="https://aklan-tourism.vercel.app/destinations" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <main id="main-content">
          <DestinationsList />
        </main>
      </motion.div>
    </>
  );
}

export default Destinations;
