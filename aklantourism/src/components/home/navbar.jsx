import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/navbar.css";
import { LuSearch, LuUser, LuX, LuMenu } from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import { destinations } from "../../data/destinations";

const easeOut = [0.16, 1, 0.3, 1];
const spring = { type: "spring", stiffness: 350, damping: 35 };

const navItems = ["Home", "Destinations", "About", "Contact Us"];

const navPaths = {
  "Home": "/",
  "Destinations": "/destinations",
  "About": "/about",
  "Contact Us": "/contact",
};

function Navbar({ introComplete = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [logoRotation, setLogoRotation] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveNav = () => {
    switch (location.pathname) {
      case "/": return "Home";
      case "/destinations": return "Destinations";
      case "/about": return "About";
      case "/contact": return "Contact Us";
      default: return "";
    }
  };

  const activeNav = getActiveNav();

  const handleNavClick = (item) => {
    navigate(navPaths[item]);
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  const filteredDestinations = destinations
    .filter(
      (dest) =>
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5);

  const handleResultClick = (dest) => {
    navigate("/destinations", { state: { selectedDestId: dest.id } });
    setIsSearchOpen(false);
    setSearchQuery("");
    setIsMobileMenuOpen(false);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.98,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const resultItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      className={scrolled ? "navbar scrolled" : "navbar"}
      initial={{ opacity: 0, y: -10 }}
      animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: easeOut }}
      aria-label="Main navigation"
    >
      <div className="nav-container">
        {/* Left — Logo */}
        <div
          className={`logo ${isSearchOpen ? "search-active" : ""}`}
          onClick={() => { setLogoRotation(logoRotation + 360); navigate("/"); }}
          style={{ cursor: "pointer" }}
        >
          <motion.img
            src="/Images/finallogo1.png"
            alt="Aklan Tourism — Home"
            className="nav-logo-img"
            animate={{ rotate: logoRotation }}
            whileHover={{ scale: 1.1 }}
            transition={{
              rotate: { duration: 0.6, ease: "easeInOut" },
              scale: { duration: 0.2, ease: "easeOut" }
            }}
          />
          <span className="logo-text">Wonders of Aklan</span>
        </div>

        {/* Center — Navigation Links (Desktop) */}
        <ul className="nav-links" role="list">
          {navItems.map((item, i) => (
            <motion.li
              key={item}
              className={`nav-item ${activeNav === item ? "active-nav" : ""}`}
              onClick={() => handleNavClick(item)}
              onKeyDown={(e) => e.key === "Enter" && handleNavClick(item)}
              tabIndex={0}
              role="button"
              aria-current={activeNav === item ? "page" : undefined}
              initial={{ opacity: 0, y: -5 }}
              animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
              transition={{ duration: 0.4, ease: easeOut, delay: 0.1 + i * 0.04 }}
            >
              <span className="nav-item-text">{item}</span>
              {activeNav === item && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="nav-indicator"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </motion.li>
          ))}
        </ul>

        {/* Right — Icons & Search */}
        <div className="nav-right-section" ref={searchRef}>
          {/* Search Component */}
          <div className="search-wrapper">
            <AnimatePresence mode="wait">
              {!isSearchOpen ? (
                <motion.div
                  key="search-trigger"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="icon-wrapper"
                    onClick={() => setIsSearchOpen(true)}
                  >
                    <LuSearch
                      className="icon search-trigger"
                      role="button"
                      tabIndex={0}
                      aria-label="Open destination search"
                      onKeyDown={(e) => e.key === "Enter" && setIsSearchOpen(true)}
                    />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="search-bar"
                  className="search-bar-container"
                  initial={{ width: 0, opacity: 0, originX: 1 }}
                  animate={{
                    width: isFocused || searchQuery 
                      ? "min(380px, 45vw)" 
                      : "min(280px, 35vw)",
                    opacity: 1,
                  }}
                  exit={{ width: 0, opacity: 0, originX: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                    opacity: { duration: 0.2 }
                  }}
                >
                  <div
                    className={`search-input-field ${isFocused || searchQuery ? "focused" : ""}`}
                    role="search"
                  >
                    <LuSearch className="search-field-icon" aria-hidden="true" />
                    <input
                      ref={searchInputRef}
                      type="search"
                      placeholder="Search destinations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      autoFocus
                      aria-label="Search destinations"
                      aria-autocomplete="list"
                      aria-expanded={searchQuery.length > 0}
                    />
                    <LuX
                      className="search-close-btn"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label="Close search"
                      onKeyDown={(e) => e.key === "Enter" && (setIsSearchOpen(false), setSearchQuery(""))}
                    />
                  </div>

                  <AnimatePresence>
                    {searchQuery && (
                      <motion.div
                        className="search-dropdown"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        role="listbox"
                        aria-label="Search results"
                      >
                        {filteredDestinations.length > 0 ? (
                          filteredDestinations.map((dest) => (
                            <motion.div
                              key={dest.id}
                              className="search-dropdown-item"
                              variants={resultItemVariants}
                              onClick={() => handleResultClick(dest)}
                              onKeyDown={(e) => e.key === "Enter" && handleResultClick(dest)}
                              tabIndex={0}
                              role="option"
                              aria-selected="false"
                              whileHover={{
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                x: 5,
                              }}
                            >
                              <img src={dest.image} alt={dest.name} loading="lazy" />
                              <div className="search-item-info">
                                <span className="search-item-name">{dest.name}</span>
                                <span className="search-item-loc">📍 {dest.location}</span>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <div className="search-no-results" role="status">No destinations found</div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="stable-actions">
            {/* User Profile */}
            <motion.div
              whileHover={{ scale: 1.15 }}
              className="icon-wrapper"
              onClick={() => navigate("/auth")}
            >
              <LuUser
                className="icon profile-trigger"
                role="button"
                tabIndex={0}
                aria-label="Sign in or create account"
                onKeyDown={(e) => e.key === "Enter" && navigate("/auth")}
              />
            </motion.div>

            {/* Hamburger Button (mobile only) */}
            <button
              className="hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LuX />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LuMenu />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)", y: -10 }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, scale: 0.85, filter: "blur(10px)", y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            style={{ transformOrigin: "top right" }}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <ul role="list">
              {navItems.map((item) => (
                <li
                  key={item}
                  className={activeNav === item ? "mobile-nav-item active" : "mobile-nav-item"}
                  onClick={() => handleNavClick(item)}
                  onKeyDown={(e) => e.key === "Enter" && handleNavClick(item)}
                  tabIndex={0}
                  role="button"
                  aria-current={activeNav === item ? "page" : undefined}
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
