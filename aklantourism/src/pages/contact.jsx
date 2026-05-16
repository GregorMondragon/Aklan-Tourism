import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <main id="main-content">
          <ContactUs />
        </main>
      </motion.div>
    </>
  );
}

export default ContactPage;
