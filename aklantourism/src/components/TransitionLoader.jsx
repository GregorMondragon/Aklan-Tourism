import { motion, AnimatePresence } from 'framer-motion';

/**
 * TransitionLoader — covers the page during destination-switch / search transitions
 * so the footer never "jumps" into view while content is being swapped.
 */
export default function TransitionLoader({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="transition-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'linear-gradient(135deg, #03082e 0%, #0a1f55 60%, #0d2d6e 100%)',
            zIndex: 8000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '28px',
          }}
        >
          {/* Logo pulse */}
          <motion.img
            src="/Images/finallogo.png"
            alt="Loading…"
            style={{ width: 90, height: 'auto', filter: 'drop-shadow(0 0 18px rgba(255,187,52,0.35))' }}
            animate={{ opacity: [0.55, 1, 0.55], scale: [0.97, 1.03, 0.97] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Shimmer bar */}
          <div style={{
            width: 160,
            height: 3,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.12)',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '60%',
                borderRadius: 4,
                background: 'linear-gradient(90deg, transparent, #ffd700, #fff, #ffd700, transparent)',
              }}
              animate={{ x: ['-100%', '220%'] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Subtle label */}
          <motion.p
            style={{
              margin: 0,
              fontSize: '0.72rem',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              fontFamily: '"Ubuntu", sans-serif',
            }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          >
            Wonders of Aklan
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
