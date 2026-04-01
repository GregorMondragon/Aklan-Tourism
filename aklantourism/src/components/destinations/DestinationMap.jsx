import { motion } from "framer-motion";
import "../../styles/details.css";

const easeOut = [0.16, 1, 0.3, 1];

export default function DestinationMap({ name, mapQuery }) {
    const encodedQuery = encodeURIComponent(mapQuery || `${name}, Aklan, Philippines`);
    const mapSrc = `https://www.google.com/maps?q=${encodedQuery}&output=embed`;
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;

    return (
        <motion.div
            className="dtl-map-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.65 }}
        >
            <div className="dtl-map-header">
                <h2 className="dtl-map-title">LOCATION & DIRECTIONS</h2>
                <a 
                    href={mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="dtl-directions-btn"
                >
                    <span className="dtl-dir-icon">🧭</span>
                    <span>Get Directions</span>
                </a>
            </div>
            
            <div className="dtl-map-wrapper">
                <iframe
                    title={`${name} Map`}
                    src={mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="dtl-map-iframe"
                ></iframe>
            </div>
        </motion.div>
    );
}
