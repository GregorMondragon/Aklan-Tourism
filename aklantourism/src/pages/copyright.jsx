import { motion } from "framer-motion";
import { LuCopyright, LuImage, LuGlobe, LuShieldAlert } from "react-icons/lu";
import "../styles/copyright.css";

function Copyright() {
  const easeOut = [0.16, 1, 0.3, 1];

  return (
    <motion.div
      className="copyright-page-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: easeOut }}
    >
      <div className="copyright-container">
        <motion.div
          className="copyright-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: easeOut }}
        >
          <header className="copyright-header">
            <div className="badge">Intellectual Property</div>
            <h2>Copyright Notice</h2>
            <p>Transparency and credit are fundamental to our platform. Learn about how we use media and content within the Wonders of Aklan experience.</p>
          </header>

          <div className="copyright-sections">
            <motion.section
              className="copyright-card"
              whileHover={{ y: -8, transition: { duration: 0.4, ease: easeOut } }}
            >
              <div className="icon-box">
                <LuImage className="copyright-icon" />
              </div>
              <h3>Image Usage</h3>
              <p>Many of the stunning visuals used to showcase Aklan's destinations are sourced from various public internet repositories and tourism contributors. These images are used solely for non-commercial, informational, and promotional purposes to highlight Aklan's beauty.</p>
            </motion.section>

            <motion.section
              className="copyright-card"
              whileHover={{ y: -8, transition: { duration: 0.4, ease: easeOut } }}
            >
              <div className="icon-box">
                <LuCopyright className="copyright-icon" />
              </div>
              <h3>Attribution</h3>
              <p>We respect the intellectual property rights of all photographers and content creators. If you are the owner of any media on this site and wish for it to be attributed or removed, please contact our support team immediately.</p>
            </motion.section>

            <motion.section
              className="copyright-card"
              whileHover={{ y: -8, transition: { duration: 0.4, ease: easeOut } }}
            >
              <div className="icon-box">
                <LuShieldAlert className="copyright-icon" />
              </div>
              <h3>Fair Use</h3>
              <p>This application operates under the principles of fair use for educational and tourism-promotion purposes. We do not claim ownership over third-party media and aim to support the growth of Aklan's tourism through shared digital appreciation.</p>
            </motion.section>
          </div>

          <div className="copyright-footer">
            <p className="footer-main">© Wonders of Aklan • Information Platform</p>

          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Copyright;
