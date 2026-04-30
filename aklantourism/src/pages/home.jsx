import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/home/navbar";
import Hero from "../components/home/hero";
import WhyVisit from "../components/home/whyvisit";
import FeaturedDestinations from "../components/home/featuredDestination";
import Footer from "../components/home/footer";
import AklanFestival from "../components/home/festivalAklan";
import HistoricalBackground from "../components/home/historicalBackground";
import PageIntro from "../components/home/PageIntro";

function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <Helmet>
        <title>Aklan Tourism — Discover the Wonders of Aklan, Philippines</title>
        <meta name="description" content="Explore Aklan's world-class beaches, vibrant festivals, and breathtaking nature. Your guide to Boracay White Beach, Jawili Falls, Bakhawan Eco-Park, and the Ati-Atihan Festival." />
        <meta property="og:title" content="Aklan Tourism — Gateway to Paradise" />
        <meta property="og:description" content="Discover world-class beaches, the Ati-Atihan Festival, and breathtaking natural wonders across Aklan, Philippines." />
        <meta property="og:url" content="https://aklan-tourism.vercel.app/" />
      </Helmet>

      <PageIntro onComplete={() => setIntroComplete(true)} />
      <Navbar introComplete={introComplete} />
      <main id="main-content">
        <Hero introComplete={introComplete} />
        <WhyVisit />
        <FeaturedDestinations />
        <AklanFestival />
        <HistoricalBackground />
      </main>
      <Footer />
    </>
  );
}

export default Home;