import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/destinationsList.css";
import DestinationDetails from "./details";
import { destinations } from "../../data/destinations";


const categories = ["All", "Beach", "Nature", "Cultural Heritage"];

// ── Easing curves
const easeOut  = [0.25, 0.46, 0.45, 0.94];   // silky easeOutQuad
const easeBack = [0.34, 1.36, 0.64, 1];       // slight overshoot on enter

// ── Grid: cinematic blur+scale swap (GPU-only — no layout cost)
const gridVariants = {
  hidden: {
    opacity: 0,
    scale: 0.97,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.38, ease: easeOut },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    filter: "blur(6px)",
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

// ── Cards: staggered blur-clearing reveal
//   Cap delay at card #8 so even 30 cards never feel sluggish
const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.42,
      ease: easeOut,
      delay: Math.min(i, 8) * 0.055,
    },
  }),
};

// ── Sidebar: glides in from left (first mount only)
const sidebarVariants = {
  hidden: { opacity: 0, x: -44 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.1, ease: easeOut, delay: 0.3 } },
};

export default function DestinationsList() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.selectedDestId) {
      const dest = destinations.find((d) => d.id === location.state.selectedDestId);
      if (dest) {
        setSelectedDestination(dest);
      }
    }
  }, [location.state]);

  // Scroll to top when switching between list and details view
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedDestination]);
  // Close map overlay on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMapExpanded(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ── Body Scroll Lock for Map ── 
  useEffect(() => {
    if (isMapExpanded) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isMapExpanded]);

  const [weatherData, setWeatherData] = useState({
    boracay: { temp: 29, condition: "Sunny", icon: "☀️", loading: true },
    kalibo: { temp: 28, condition: "Partly Cloudy", icon: "⛅", loading: true }
  });

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      try {
        // Try WeatherAPI format first
        const [boraRes, kaliboRes] = await Promise.all([
          fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=11.967,121.925`), // Coordinates for Boracay
          fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Kalibo`)
        ]);

        if (boraRes.ok && kaliboRes.ok) {
          const boraData = await boraRes.json();
          const kaliboData = await kaliboRes.json();

          const mapIcon = (condition) => {
            const lower = condition.toLowerCase();
            if (lower.includes("rain") || lower.includes("drizzle")) return "🌧️";
            if (lower.includes("cloud") || lower.includes("overcast")) return "⛅";
            return "☀️";
          };

          setWeatherData({
            boracay: {
              temp: Math.round(boraData.current.temp_c),
              condition: boraData.current.condition.text,
              icon: mapIcon(boraData.current.condition.text),
              loading: false
            },
            kalibo: {
              temp: Math.round(kaliboData.current.temp_c),
              condition: kaliboData.current.condition.text,
              icon: mapIcon(kaliboData.current.condition.text),
              loading: false
            }
          });
          return;
        }
      } catch (err) {
        console.warn("WeatherAPI failed. Trying fallback API...");
      }

      try {
        // Try OpenWeatherMap format fallback
        const [boraRes, kaliboRes] = await Promise.all([
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=Boracay,ph&appid=${apiKey}&units=metric`),
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=Kalibo,ph&appid=${apiKey}&units=metric`)
        ]);

        if (boraRes.ok && kaliboRes.ok) {
          const boraData = await boraRes.json();
          const kaliboData = await kaliboRes.json();

          const mapIcon = (id) => {
            if (id >= 200 && id < 600) return "🌧️";
            if (id >= 801 && id <= 804) return "⛅";
            return "☀️";
          };

          setWeatherData({
            boracay: {
              temp: Math.round(boraData.main.temp),
              condition: boraData.weather[0].main,
              icon: mapIcon(boraData.weather[0].id),
              loading: false
            },
            kalibo: {
              temp: Math.round(kaliboData.main.temp),
              condition: kaliboData.weather[0].main,
              icon: mapIcon(kaliboData.weather[0].id),
              loading: false
            }
          });
          return;
        }
      } catch (err) {
        console.warn("OpenWeatherMap failed.");
      }

      // If all APIs fail, gracefully use static data
      setWeatherData(prev => ({
        boracay: { ...prev.boracay, loading: false },
        kalibo: { ...prev.kalibo, loading: false }
      }));
    };

    fetchWeather();
  }, []);

  const filtered =
    activeCategory === "All"
      ? destinations
      : destinations.filter((d) => d.category === activeCategory);

  return (
    <div className="destinations-container-outer">
      <AnimatePresence mode="sync">
        {selectedDestination ? (
          <motion.div
            key="details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
            style={{ flex: 1 }}
          >
            <DestinationDetails
              destination={selectedDestination}
              onBack={() => setSelectedDestination(null)}
              onSelectDestination={setSelectedDestination}
            />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
            style={{ flex: 1 }}
          >
            <section className="dest-section">
              {/* Hero Banner */}
              <div className="dest-hero">
                <div className="dest-hero-overlay" />
                <motion.h1
                  className="dest-hero-title"
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.3, ease: easeOut, delay: 0.1 }}
                >
                  Aklan: <span>Explore the Undiscovered</span>
                </motion.h1>

                {/* Filter Tabs — spring sliding pill */}
                <motion.div
                  className="dest-filters"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.0, delay: 0.55, ease: easeOut }}
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`dest-filter-btn ${activeCategory === cat ? "active" : ""}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {/* Sliding active pill — only one layoutId, very cheap */}
                      {activeCategory === cat && (
                        <motion.span
                          className="filter-pill"
                          layoutId="filter-active-pill"
                          transition={{ type: "spring", stiffness: 420, damping: 32 }}
                        />
                      )}
                      <span className="filter-label">{cat}</span>
                    </button>
                  ))}
                </motion.div>
              </div>

              {/* Main Content */}
              <div className="dest-content">
                {/* Sidebar */}
                <motion.aside
                  className="dest-sidebar"
                  variants={sidebarVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="sidebar-logo-wrap">
                    <img src="/Images/finallogo.png" alt="Aklan Tourism" className="sidebar-logo" />

                  </div>

                  <div className="sidebar-weather">
                    <motion.div
                      className="weather-row"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="weather-icon">{weatherData.boracay.icon}</span>
                      <div>
                        <strong>BORACAY: {weatherData.boracay.loading ? "..." : `${weatherData.boracay.temp}°C`}</strong>
                        <p>{weatherData.boracay.loading ? "Loading..." : weatherData.boracay.condition}</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="weather-row"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <span className="weather-icon">{weatherData.kalibo.icon}</span>
                      <div>
                        <strong>KALIBO: {weatherData.kalibo.loading ? "..." : `${weatherData.kalibo.temp}°C`}</strong>
                        <p>{weatherData.kalibo.loading ? "Loading..." : weatherData.kalibo.condition}</p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="sidebar-map">
                    <p className="map-title">PROVINCE MAP</p>
                    <motion.div
                      className="map-container"
                      onClick={() => setIsMapExpanded(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      layoutId="aklan-map-small"
                    >
                      <img src="/Images/aklanmapfinal.png" alt="Map of Aklan" className="static-map" />
                      <div className="map-hover-hint">Expand Map</div>
                    </motion.div>
                  </div>

                  <div className="sidebar-status">
                    <strong>AKLAN STATUS:</strong>
                    <p>Fully Open for Tourism.</p>
                  </div>
                </motion.aside>

                {/* Cards Grid — keyed by category for clean swap */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeCategory}
                    className="dest-grid"
                    variants={gridVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {filtered.map((dest, i) => (
                      <motion.div
                        key={dest.id}
                        className="dest-card"
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{
                          y: -6,
                          boxShadow: "0 24px 48px rgba(11,31,69,0.16)",
                          transition: { duration: 0.28, ease: easeOut },
                        }}
                        whileTap={{ scale: 0.98, transition: { duration: 0.12 } }}
                        style={{ willChange: "transform, opacity" }}
                      >
                        <div className="dest-card-img-wrap">
                          <img src={dest.image} alt={`${dest.name} in ${dest.location}`} className="dest-card-img" loading="lazy" />
                          <span className="dest-card-tag">{dest.category}</span>
                        </div>
                        <div className="dest-card-body">
                          <h3>{dest.name}</h3>
                          {dest.location && (
                            <span className="dest-card-location">📍 {dest.location}</span>
                          )}
                          <p>{dest.description}</p>
                          <motion.button
                            className="dest-card-btn"
                            onClick={() => setSelectedDestination(dest)}
                            whileHover={{ scale: 1.05, backgroundColor: "#0b1f45", color: "#fff", borderColor: "#0b1f45" }}
                            whileTap={{ scale: 0.94 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                          >
                            View Details
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Expanded Map Overlay */}
              <AnimatePresence>
                {isMapExpanded && (
                  <motion.div
                    className="map-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: easeOut }}
                    onClick={() => setIsMapExpanded(false)}
                    data-lenis-prevent
                  >
                    <motion.div
                      className="expanded-map-wrap"
                      initial={{ scale: 0.9, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.9, opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="map-close-btn"
                        onClick={() => setIsMapExpanded(false)}
                        aria-label="Close province map"
                      >
                        ✕
                      </button>
                      <img
                        src="/Images/aklanmapfinal.png"
                        alt="Aklan Province Map"
                        className="expanded-map-img"
                      />
                      <div className="expanded-map-footer">
                        <h3>Province of Aklan</h3>
                        <p>Gateway to Paradise • 17 Municipalities</p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
