import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import {
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineLocationOn,
} from "react-icons/md";
import "../../styles/Footer.css";

/* ── Animation presets ── */
const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
  },
});

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const rowItem = {
  hidden:  { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

/* ── Top Destinations data ── */
const topDests = [
  { label: "Boracay White Beach",  id: 1  },
  { label: "Jawili Falls",         id: 9  },
  { label: "Bakhawan Eco-Park",    id: 8  },
  { label: "Ati-Atihan Festival",  id: 16 },
];

/* ── Social links ── */
const socials = [
  { Icon: FaFacebookF,  label: "Facebook",  href: "#" },
  { Icon: FaInstagram,  label: "Instagram", href: "#" },
  { Icon: FaTwitter,    label: "Twitter",   href: "#" },
  { Icon: FaYoutube,    label: "YouTube",   href: "#" },
];

/* ── Contact details ── */
const contacts = [
  { Icon: MdOutlineEmail,     text: "gregormondragon16@gmail.com" },
  { Icon: MdOutlinePhone,     text: "+63 907 109 2792"            },
  { Icon: MdOutlineLocationOn,text: "Aklan, Philippines"          },
];

function Footer() {
  const navigate = useNavigate();

  const goToDestination = (id) => {
    if (id) {
      navigate("/destinations", { state: { selectedDestId: id } });
    } else {
      navigate("/destinations");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">

      {/* ══ Main grid ══ */}
      <div className="footer-grid">

        {/* 1 — Brand */}
        <motion.div
          className="footer-brand"
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <img
            src="/Images/finallogo.png"
            alt="Aklan Tourism"
            className="footer-logo-img"
            loading="lazy"
          />
          <p className="footer-tagline">
            Discover the beauty of Aklan — world-class beaches, rich culture,
            and unforgettable adventures await you.
          </p>
        </motion.div>

        {/* 2 — Quick Links */}
        <motion.div
          className="footer-col"
          variants={fadeUp(0.10)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h4 className="footer-col-heading">Quick Links</h4>
          <motion.ul variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              { label: "Home",         to: "/"             },
              { label: "Destinations", to: "/destinations" },
              { label: "About",        to: "/about"        },
              { label: "Contact",      to: "/contact"      },
            ].map(({ label, to }) => (
              <motion.li key={label} variants={rowItem}>
                <Link to={to} className="footer-link">{label}</Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* 3 — Top Destinations */}
        <motion.div
          className="footer-col"
          variants={fadeUp(0.20)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h4 className="footer-col-heading">Top Destinations</h4>
          <motion.ul variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {topDests.map(({ label, id }) => (
              <motion.li key={label} variants={rowItem}>
                <button
                  className="footer-link footer-dest-btn"
                  onClick={() => goToDestination(id)}
                >
                  {label}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* 4 — Contact */}
        <motion.div
          className="footer-col"
          variants={fadeUp(0.30)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h4 className="footer-col-heading">Contact Us</h4>
          <ul className="footer-contact-list">
            {contacts.map(({ Icon, text }) => (
              <li key={text}>
                <Icon className="contact-icon" />
                <span>{text}</span>
              </li>
            ))}
          </ul>

          {/* Social icons — Now under contacts */}
          <div className="footer-socials contact-socials">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="social-icon"
                aria-label={label}
                target="_blank"
                rel="noreferrer"
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>

      </div>

      {/* ══ Bottom bar ══ */}
      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        <div className="footer-bottom-divider" />

        <p className="footer-copy">
          © 2026 Aklan Tourism. All rights reserved.
        </p>
      </motion.div>

    </footer>
  );
}

export default Footer;