import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaShieldAlt, FaLock, FaUserSecret } from "react-icons/fa";
import "../styles/privacy.css";

function Privacy() {
  return (
    <div className="privacy-container">
      <Link to="/" className="back-home">
        <FaArrowLeft /> Back to Home
      </Link>

      <motion.div 
        className="privacy-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="privacy-header">
          <h2>Privacy & Security</h2>
          <p>Your trust is our top priority. Learn how we protect your data.</p>
        </div>

        <div className="privacy-sections">
          <section className="privacy-card">
            <FaShieldAlt className="privacy-icon" />
            <h3>Data Protection</h3>
            <p>We use industry-standard security measures, including Google Authentication, to ensure your personal information is protected from unauthorized access.</p>
          </section>

          <section className="privacy-card">
            <FaLock className="privacy-icon" />
            <h3>Secure Authentication</h3>
            <p>Your passwords and login credentials are not stored on our servers. We use Firebase Authentication to handle sign-ins securely via OAuth and encrypted methods.</p>
          </section>

          <section className="privacy-card">
            <FaUserSecret className="privacy-icon" />
            <h3>Data Collection</h3>
            <p>We only collect data that is necessary to improve your experience, such as your profile picture and email when you log in. We will never sell your personal data to third parties.</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}

export default Privacy;
