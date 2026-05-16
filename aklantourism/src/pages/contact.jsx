import { motion } from "framer-motion";
import SEO from "../components/SEO";
import ContactUs from "../components/contactus/contactus.jsx";

function ContactPage() {
  return (
    <>
      <SEO 
        title="Contact Us"
        description="Get in touch with Aklan Tourism. Have questions, travel suggestions, or just want to say hello? We'd love to hear from you."
        url="/contact"
      />

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
