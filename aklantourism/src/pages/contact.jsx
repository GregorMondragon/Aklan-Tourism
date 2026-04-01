import { Helmet } from "react-helmet-async";
import Navbar from "../components/home/navbar";
import Footer from "../components/home/footer";
import ContactUs from "../components/contactus/contactus.jsx";

function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us — Aklan Tourism</title>
        <meta name="description" content="Get in touch with Aklan Tourism. Have questions, travel suggestions, or just want to say hello? We'd love to hear from you." />
        <meta property="og:title" content="Contact Aklan Tourism" />
        <meta property="og:description" content="Reach out to Aklan Tourism for inquiries, travel tips, or collaboration opportunities." />
        <meta property="og:url" content="https://aklan-tourism.vercel.app/contact" />
      </Helmet>

      <Navbar introComplete={true} />
      <main id="main-content">
        <ContactUs />
      </main>
      <Footer />
    </>
  );
}

export default ContactPage;
