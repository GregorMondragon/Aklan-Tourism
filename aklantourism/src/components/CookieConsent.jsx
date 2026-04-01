import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Cookie consent banner for GDPR/privacy compliance.
 * Persists acceptance in localStorage.
 */
export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner only if user hasn't consented yet
    const consent = localStorage.getItem('aklan-cookie-consent');
    if (!consent) {
      // Short delay so it doesn't flash immediately on page load
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('aklan-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('aklan-cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Cookie consent"
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(600px, calc(100vw - 32px))',
            background: 'rgba(11, 20, 48, 0.97)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '18px',
            padding: '20px 24px',
            zIndex: 10000,
            boxShadow: '0 16px 60px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        >
          <div style={{ flex: 1, minWidth: '200px' }}>
            <p style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '0.88rem',
              lineHeight: '1.6',
              margin: 0,
              fontFamily: 'Montserrat, sans-serif',
            }}>
              🍪 We use cookies to improve your experience on Aklan Tourism.
              By continuing, you agree to our{' '}
              <span style={{ color: 'rgba(100,160,255,0.9)', cursor: 'pointer' }}>
                privacy policy
              </span>.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            <button
              onClick={handleDecline}
              style={{
                background: 'transparent',
                color: 'rgba(255,255,255,0.55)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '10px',
                padding: '9px 18px',
                fontSize: '0.83rem',
                cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                minHeight: '44px',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
            >
              Decline
            </button>
            <motion.button
              onClick={handleAccept}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'linear-gradient(135deg, #0b1f45, #1a3a7c)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '10px',
                padding: '9px 18px',
                fontSize: '0.83rem',
                cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: '600',
                minHeight: '44px',
              }}
            >
              Accept All
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
