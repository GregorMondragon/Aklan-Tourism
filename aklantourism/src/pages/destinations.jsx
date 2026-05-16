import { motion } from "framer-motion";
import SEO from "../components/SEO";
import DestinationsList from "../components/destinations/DestinationsList";

function Destinations() {
  return (
    <>
      <SEO 
        title="Destinations"
        description="Explore all tourist destinations in Aklan — from Boracay White Beach and Puka Shell Beach to Jawili Falls, Bakhawan Eco-Park, Pangihan Cave, and the Ati-Atihan Festival."
        url="/destinations"
      />

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
