import { motion } from 'framer-motion';

/**
 * Full-page loader shown during lazy-loaded route transitions.
 */
export default function PageLoader() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(135deg, #03082e 0%, #0a1f55 60%, #0d2d6e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
      <motion.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.img
          src="/Images/finallogo.png"
          alt="Aklan Tourism"
          style={{ width: 80, height: 'auto' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{
            width: 48,
            height: 3,
            background: 'rgba(255,255,255,0.3)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{ height: '100%', background: '#fff', borderRadius: 2 }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
