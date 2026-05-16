import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/navbar.css";
import { LuSearch, LuUser, LuX, LuMenu } from "react-icons/lu";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { destinations } from "../../data/destinations";
import { useAuth } from "../../context/AuthContext";

const easeOut = [0.16, 1, 0.3, 1];
const spring = { type: "spring", stiffness: 350, damping: 35 };

const navItems = ["Home", "Destinations", "About", "Contact Us"];

const navPaths = {
  "Home": "/",
  "Destinations": "/destinations",
  "About": "/about",
  "Contact Us": "/contact",
};

const homeSections = [
  { label: "Welcome", id: "hero" },
  { label: "Why Aklan", id: "why-visit" },
  { label: "Top Destinations", id: "featured-destinations" },
  { label: "Festivals", id: "festivals" },
  { label: "Our History", id: "history" },
];

function Navbar({ introComplete = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [logoRotation, setLogoRotation] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [isMobileHomeOpen, setIsMobileHomeOpen] = useState(false);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const profileRef = useRef(null);
  const homeDropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const navItemsRefs = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0, left: 0, top: 0, width: 0, height: 0 });
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();

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

  useEffect(() => {
    // Wait a brief moment to ensure DOM is fully updated
    const updateIndicator = () => {
      const activeIndex = navItems.indexOf(activeNav);
      if (activeIndex !== -1 && navItemsRefs.current[activeIndex]) {
        const el = navItemsRefs.current[activeIndex];
        setIndicatorStyle({
          left: el.offsetLeft,
          top: el.offsetTop,
          width: el.offsetWidth,
          height: el.offsetHeight,
          opacity: 1,
        });
      } else {
        setIndicatorStyle({ opacity: 0 });
      }
    };
    
    updateIndicator();
    // Re-run on resize just to be safe
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeNav, scrolled]);

  const handleNavClick = (item) => {
    navigate(navPaths[item]);
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
    setIsHomeDropdownOpen(false);
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsHomeDropdownOpen(false);
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
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (homeDropdownRef.current && !homeDropdownRef.current.contains(event.target)) {
        setIsHomeDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
        setIsProfileOpen(false);
        setIsHomeDropdownOpen(false);
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

  // Handle scroll to section from other pages
  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      // Small delay to ensure the page is rendered
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        // Clear state to avoid scrolling again on refresh
        window.history.replaceState({}, document.title);
      }, 300);
    }
  }, [location]);

  return (
    <motion.nav
      layoutRoot
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
        <ul className="nav-links" role="list" style={{ position: 'relative' }}>
          <motion.div
            className="nav-indicator"
            style={{ position: 'absolute', inset: 'auto', zIndex: 1 }}
            initial={{ opacity: 0 }}
            animate={indicatorStyle}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
          {navItems.map((item, i) => (
            <motion.li
              key={item}
              className={`nav-item ${activeNav === item ? "active-nav" : ""} ${item === "Home" ? "has-dropdown" : ""}`}
              ref={(el) => {
                navItemsRefs.current[i] = el;
                if (item === "Home") homeDropdownRef.current = el;
              }}
              onMouseEnter={() => {
                if (item === "Home") {
                  if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                  setIsHomeDropdownOpen(true);
                }
              }}
              onMouseLeave={() => {
                if (item === "Home") {
                  hoverTimeoutRef.current = setTimeout(() => {
                    setIsHomeDropdownOpen(false);
                  }, 500);
                }
              }}
              onClick={() => handleNavClick(item)}
              onKeyDown={(e) => e.key === "Enter" && handleNavClick(item)}
              tabIndex={0}
              role="button"
              aria-current={activeNav === item ? "page" : undefined}
              initial={{ opacity: 0, y: -5 }}
              animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
              transition={{ duration: 0.4, ease: easeOut, delay: 0.1 + i * 0.04 }}
            >
              <div className="nav-item-content">
                <span className="nav-item-text">{item}</span>
              </div>

              {item === "Home" && (
                <AnimatePresence>
                  {isHomeDropdownOpen && (
                    <motion.ul
                      className="home-dropdown-menu"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: easeOut }}
                    >
                      {homeSections.map((section) => (
                        <li
                          key={section.id}
                          className="dropdown-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollToSection(section.id);
                          }}
                        >
                          {section.label}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
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
            <div className="profile-wrapper" ref={profileRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="icon-wrapper"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {currentUser?.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    referrerPolicy="no-referrer"
                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  <LuUser
                    className="icon profile-trigger"
                    role="button"
                    tabIndex={0}
                    aria-label="User Profile"
                    onKeyDown={(e) => e.key === "Enter" && setIsProfileOpen(!isProfileOpen)}
                  />
                )}
              </motion.div>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    className="profile-dropdown"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{
                      position: 'absolute',
                      top: '140%',
                      right: 0,
                      background: '#ffffff',
                      backdropFilter: 'none',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      borderRadius: '12px',
                      padding: '0.5rem',
                      minWidth: '200px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                      zIndex: 100,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.2rem'
                    }}
                  >
                    {!currentUser ? (
                      <>
                        <div className="profile-dropdown-item" onClick={() => { navigate("/auth"); setIsProfileOpen(false); }} style={{ padding: '0.8rem 1rem', cursor: 'pointer', borderRadius: '8px', color: '#0f172a', transition: 'background 0.2s', fontWeight: 500 }}>
                          Sign In / Sign Up
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid #e2e8f0', marginBottom: '0.2rem' }}>
                          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Logged in as</span><br />
                          <span style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 600 }}>{currentUser.displayName || currentUser.email}</span>
                        </div>
                        <div className="profile-dropdown-item" onClick={() => { logout(); setIsProfileOpen(false); }} style={{ padding: '0.8rem 1rem', cursor: 'pointer', borderRadius: '8px', color: '#ef4444', transition: 'background 0.2s', fontWeight: 500 }}>
                          Log Out
                        </div>
                      </>
                    )}
                    <div className="profile-dropdown-item" onClick={() => { navigate("/privacy"); setIsProfileOpen(false); }} style={{ padding: '0.8rem 1rem', cursor: 'pointer', borderRadius: '8px', color: '#0f172a', transition: 'background 0.2s', fontWeight: 500 }}>
                      Privacy & Security
                    </div>
                    <div className="profile-dropdown-item" onClick={() => { navigate("/copyright"); setIsProfileOpen(false); }} style={{ padding: '0.8rem 1rem', cursor: 'pointer', borderRadius: '8px', color: '#0f172a', transition: 'background 0.2s', fontWeight: 500 }}>
                      Copyright Notice
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
                  className={`${activeNav === item ? "mobile-nav-item active" : "mobile-nav-item"} ${item === "Home" ? "has-mobile-dropdown" : ""}`}
                  tabIndex={0}
                  role="button"
                  aria-current={activeNav === item ? "page" : undefined}
                >
                  <div className="mobile-item-header" onClick={() => item === "Home" ? setIsMobileHomeOpen(!isMobileHomeOpen) : handleNavClick(item)}>
                    <span>{item}</span>
                    {item === "Home" && (
                      <motion.span
                        animate={{ rotate: isMobileHomeOpen ? 180 : 0 }}
                        className="mobile-dropdown-arrow"
                      >
                        ▾
                      </motion.span>
                    )}
                  </div>

                  {item === "Home" && (
                    <AnimatePresence>
                      {isMobileHomeOpen && (
                        <motion.ul
                          className="mobile-home-sections"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: easeOut }}
                        >
                          {homeSections.map((section) => (
                            <li
                              key={section.id}
                              className="mobile-section-link"
                              onClick={() => scrollToSection(section.id)}
                            >
                              {section.label}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  )}
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
