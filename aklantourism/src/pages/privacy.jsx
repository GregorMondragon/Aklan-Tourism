import { motion } from "framer-motion";
import { LuShieldCheck, LuLock, LuEyeOff, LuFileText } from "react-icons/lu";
import "../styles/privacy.css";

function Privacy() {
  const easeOut = [0.16, 1, 0.3, 1];

  return (
    <motion.div
      className="privacy-page-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: easeOut }}
    >
      <div className="privacy-container">
        <motion.div
          className="privacy-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: easeOut }}
        >
          <header className="privacy-header">
            <div className="badge">Official Policy</div>
            <h2>Privacy & Security</h2>
            <p>Our commitment to protecting your digital footprint is absolute. Explore how we manage your data with transparency and military-grade security standards.</p>
          </header>

          <div className="privacy-sections">
            <motion.section
              className="privacy-card"
              whileHover={{ y: -10, transition: { duration: 0.4, ease: easeOut } }}
            >
              <div className="icon-box">
                <LuShieldCheck className="privacy-icon" />
              </div>
              <h3>Data Protection</h3>
              <p>We utilize advanced AES-256 bit encryption to ensure that any personal information shared on this platform is shielded from unauthorized access. Our systems undergo regular security audits to maintain the highest levels of integrity.</p>
            </motion.section>

            <motion.section
              className="privacy-card"
              whileHover={{ y: -10, transition: { duration: 0.4, ease: easeOut } }}
            >
              <div className="icon-box">
                <LuLock className="privacy-icon" />
              </div>
              <h3>Secure Access</h3>
              <p>All authentication processes are managed via Firebase and Google OAuth 2.0 protocols. This means we never store, see, or have access to your personal passwords. Your session data is tokenized and stored securely in your browser.</p>
            </motion.section>

            <motion.section
              className="privacy-card"
              whileHover={{ y: -10, transition: { duration: 0.4, ease: easeOut } }}
            >
              <div className="icon-box">
                <LuEyeOff className="privacy-icon" />
              </div>
              <h3>Privacy Controls</h3>
              <p>We follow a "Privacy by Design" philosophy. We only collect the minimal data required for your account (name and email). You retain full rights to your data, including the right to request deletion at any time.</p>
            </motion.section>
          </div>

          <div className="privacy-footer">
            <p className="footer-main">© Wonders of Aklan • Privacy & Security Standards</p>

          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Privacy;
