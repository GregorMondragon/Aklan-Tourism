import { Helmet } from "react-helmet-async";
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";
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

      <Navbar introComplete={true} />
      <main id="main-content">
        <DestinationsList />
      </main>
      <Footer />
    </>
  );
}

export default Destinations;
