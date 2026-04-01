import { motion } from "framer-motion";

import "../../styles/about.css";

const easeOut = [0.16, 1, 0.3, 1];

// Defining a reusable continuous animation viewport config
// amount: 0.1 means animate when 10% of the element is visible
const scrollConfig = { once: false, amount: 0.1 };

export default function About() {
    return (
        <div className="about-wrapper">
            {/* ── 1. Hero Section ── */}
            <section className="abt-hero">
                <div className="abt-hero-overlay" />
                <motion.div
                    className="abt-hero-content"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={scrollConfig}
                    transition={{ duration: 1.0, ease: easeOut }}
                >
                    <h1>Discover Aklan's Hidden Wonders</h1>
                    <p>
                        Welcome to Aklan Tourism. We are dedicated to exploring our province, guiding travelers to popular breathtaking spots, and showcasing our deeply vibrant cultural heritage.
                    </p>
                </motion.div>
            </section>

            {/* ── 2. Mission / Timeline Section ── */}
            <section className="abt-timeline-section">
                <motion.div
                    className="abt-section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={scrollConfig}
                    transition={{ duration: 0.8, ease: easeOut }}
                >
                    <h2>Our Mission & Purpose</h2>
                    <p>We exist to guide you through the raw natural beauty and colorful traditions of Aklan, step by step.</p>
                </motion.div>

                <div className="abt-timeline">

                    <div className="abt-timeline-item left">
                        <motion.div
                            className="abt-timeline-content"
                            initial={{ opacity: 0, x: -50, scale: 0.95 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: easeOut }}
                        >
                            <h3>1. Explore Nature's Best</h3>
                            <p>We highlight Aklan's exclusive, off-the-beaten-path natural wonders, from the powdery white sands of Boracay to the majestic cascading waters of Jawili.</p>
                        </motion.div>
                    </div>


                    <div className="abt-timeline-item right">
                        <motion.div
                            className="abt-timeline-content"
                            initial={{ opacity: 0, x: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
                        >
                            <h3>2. Guide & Inform</h3>
                            <p>We provide comprehensive guides, interactive details, and insider tips to help travelers navigate and fully experience every popular and undiscovered destination.</p>
                        </motion.div>
                    </div>


                    <div className="abt-timeline-item left">
                        <motion.div
                            className="abt-timeline-content"
                            initial={{ opacity: 0, x: -50, scale: 0.95 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
                        >
                            <h3>3. Celebrate Heritage</h3>
                            <p>We immerse you in Aklan's rich legacy. Discover the deeply rooted traditions of the rhythmic Ati-Atihan festival and the intricate artistry of Piña weaving.</p>
                        </motion.div>
                    </div>

                    <div className="abt-timeline-item right">
                        <motion.div
                            className="abt-timeline-content"
                            initial={{ opacity: 0, x: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
                        >
                            <h3>4. Inspire Wanderlust</h3>
                            <p>Our ultimate goal is to inspire your next great adventure by curating the most breathtaking stories, imagery, and information Aklan has to offer.</p>
                        </motion.div>
                    </div>
                </div>
            </section>


            <section className="abt-philosophy-section">
                <div className="abt-philosophy-bg" />
                <div className="abt-philosophy-content">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={scrollConfig}
                        transition={{ duration: 0.8, ease: easeOut }}
                    >
                        Our Philosophy
                    </motion.h2>

                    <div className="abt-cards">
                        {[
                            {
                                icon: "🧭",
                                title: "Authentic Storytelling",
                                desc: "We believe in authentic narratives that connect you deeply with the heart of Aklan and its people.",
                            },
                            {
                                icon: "🌿",
                                title: "Sustainable Promotion",
                                desc: "We promote local tourism while passionately advocating for the preservation of Aklan's environment.",
                            },
                            {
                                icon: "⛰️",
                                title: "Ultimate Local Guide",
                                desc: "From hidden beaches to ancient caves, we carefully curate information to be your premier digital companion.",
                            },
                        ].map((card, idx) => (
                            <motion.div
                                key={idx}
                                className="abt-card"
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={scrollConfig}
                                transition={{ duration: 0.7, delay: idx * 0.15, ease: easeOut }}
                                whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.15)" }}
                            >
                                <div className="abt-card-icon">{card.icon}</div>
                                <h3>{card.title}</h3>
                                <p>{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. Reviews / Community Stories ── */}
            <section className="abt-reviews-section">
                <motion.div
                    className="abt-section-header dark"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={scrollConfig}
                    transition={{ duration: 0.8, ease: easeOut }}
                >
                    <h2>Traveler Stories</h2>
                    <p>Read about the journeys of fellow explorers who used our platform as their guide to unlocking the best of Aklan.</p>
                </motion.div>

                <div className="abt-reviews-grid">
                    {[
                        {
                            text: "Aklan Tourism's recommendations helped us plan our DIY trip perfectly! We experienced the true beauty of local spots without relying on expensive agencies. Absolutely unforgettable.",
                            author: "Sarah Jenkins",
                            role: "Adventure Enthusiast",
                            rating: 5,
                        },
                        {
                            text: "Reading about the history of the Ati-Atihan festival on this site made our participation so much more meaningful. The cultural insights here are deeply enriching and accurate.",
                            author: "Mark & Lisa",
                            role: "Cultural Explorers",
                            rating: 5,
                        },
                        {
                            text: "From the untouched rivers in Libacao to the pristine sands of Buruanga, this site was our ultimate compass. Every detailed guide was tremendously helpful.",
                            author: "David Chen",
                            role: "Nature Photographer",
                            rating: 5,
                        },
                    ].map((review, idx) => (
                        <motion.div
                            key={idx}
                            className="abt-review-card"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={scrollConfig}
                            transition={{ duration: 0.6, delay: idx * 0.15, ease: easeOut }}
                            whileHover={{ y: -5, boxShadow: "0 15px 35px rgba(11,31,69,0.12)" }}
                        >
                            <div className="abt-stars">
                                {Array(review.rating).fill("★").join("")}
                            </div>
                            <p className="abt-review-text">"{review.text}"</p>
                            <div className="abt-review-author">
                                <h4>{review.author}</h4>
                                <span>{review.role}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}