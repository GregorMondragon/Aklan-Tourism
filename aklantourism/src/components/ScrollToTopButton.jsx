import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Floating scroll-to-top button that appears after scrolling 400px.
 * Distinct from the router-level ScrollToTop component in /components/ScrollToTop.jsx
 */
export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0b1f45, #1a3a7c)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1rem',
            boxShadow: '0 8px 24px rgba(11,31,69,0.35)',
            zIndex: 1050,
            backdropFilter: 'blur(8px)',
          }}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          whileHover={{ scale: 1.12, boxShadow: '0 12px 32px rgba(11,31,69,0.5)' }}
          whileTap={{ scale: 0.92 }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
