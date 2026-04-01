import { Helmet } from "react-helmet-async";
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";
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

      <Navbar introComplete={true} />
      <main id="main-content">
        <AboutComponent />
      </main>
      <Footer />
    </>
  );
}

export default About;
