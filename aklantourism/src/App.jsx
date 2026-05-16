import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import CookieConsent from './components/CookieConsent';
import ErrorBoundary from './components/ErrorBoundary';
import PageLoader from './components/PageLoader';
import Navbar from './components/home/navbar';
import Footer from './components/home/footer';

const Home = lazy(() => import('./pages/home'));
const Destinations = lazy(() => import('./pages/destinations'));
const About = lazy(() => import('./pages/about'));
const Contact = lazy(() => import('./pages/contact'));
const Auth = lazy(() => import('./pages/auth'));
const NotFound = lazy(() => import('./pages/notfound'));
const Suggestions = lazy(() => import('./pages/suggestions'));
const Privacy = lazy(() => import('./pages/privacy'));
const Copyright = lazy(() => import('./pages/copyright'));

import { AuthProvider } from './context/AuthContext';

function NavigationProgress() {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 600);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          key="nav-progress"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(to right, #ffd700, #f8fafc, #ffd700)',
            zIndex: 10000,
            transformOrigin: 'left',
            boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
          }}
        />
      )}
    </AnimatePresence>
  );
}

function AnimatedRoutes({ setIntroComplete, introComplete }) {
  const location = useLocation();
  const noFooterRoutes = ["/auth", "/privacy", "/suggestions", "/copyright"];
  const noNavbarRoutes = ["/auth"];

  const showFooter = !noFooterRoutes.includes(location.pathname);
  const showNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar introComplete={introComplete} />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home setIntroComplete={setIntroComplete} />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/copyright" element={<Copyright />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      {showFooter && <Footer />}
    </>
  );
}

function App() {
  const [introComplete, setIntroComplete] = useState(() => {
    return window.location.pathname !== "/";
  });

  return (
    <AuthProvider>
      <ErrorBoundary>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#03082e' }}>
            <ScrollToTop />
            <NavigationProgress />
            <ScrollToTopButton />
            <CookieConsent />
            <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
              <Suspense fallback={<PageLoader />}>
                <AnimatedRoutes setIntroComplete={setIntroComplete} introComplete={introComplete} />
              </Suspense>
            </div>
          </div>
        </BrowserRouter>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App
