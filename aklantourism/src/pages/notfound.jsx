import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/home/navbar';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #03082e 0%, #0a1f55 60%, #0d2d6e 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 20px 60px',
        fontFamily: 'Montserrat, sans-serif',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 style={{
            fontSize: 'clamp(5rem, 15vw, 10rem)',
            fontWeight: 800,
            color: 'rgba(255,255,255,0.12)',
            lineHeight: 1,
            letterSpacing: '-4px',
            fontFamily: 'Palanquin Dark, sans-serif',
          }}>
            404
          </h1>

          <motion.img
            src="/Images/finallogo.png"
            alt="Aklan Tourism"
            style={{ width: 90, marginBottom: '24px' }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          <h2 style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            color: '#e8f0ff',
            marginBottom: '12px',
            fontFamily: 'Palanquin Dark, sans-serif',
          }}>
            Page Not Found
          </h2>

          <p style={{
            color: 'rgba(160, 200, 255, 0.7)',
            fontSize: '1rem',
            maxWidth: '420px',
            lineHeight: '1.7',
            marginBottom: '40px',
          }}>
            Looks like you've drifted off the map! This page doesn't exist, but
            Aklan has plenty of real wonders waiting for you.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: '#fff',
                color: '#0b1f45',
                border: 'none',
                borderRadius: '14px',
                padding: '14px 32px',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              🏠 Go Home
            </motion.button>

            <motion.button
              onClick={() => navigate('/destinations')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '14px',
                padding: '14px 32px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              🗺️ Explore Destinations
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
