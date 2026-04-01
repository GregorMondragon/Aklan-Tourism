import { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaPaperPlane } from "react-icons/fa";
import "../../styles/contactus.css";

const easeOut = [0.16, 1, 0.3, 1];
const scrollConfig = { once: false, amount: 0.1 };

export default function ContactUs() {
    const [formStatus, setFormStatus] = useState(""); // "", "sending", "success", "error"

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus("sending");
        const formData = new FormData(e.target);

        try {
            const res = await fetch("https://formsubmit.co/ajax/gregormondragon16@gmail.com", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (res.ok) {
                setFormStatus("success");
                e.target.reset();
                setTimeout(() => setFormStatus(""), 5000); // Clear success message after 5 seconds
            } else {
                setFormStatus("error");
                setTimeout(() => setFormStatus(""), 5000);
            }
        } catch (error) {
            setFormStatus("error");
            setTimeout(() => setFormStatus(""), 5000);
        }
    };

    return (
        <div className="contact-wrapper">
            {/* ── 1. Hero Section ── */}
            <section className="cu-hero">
                <div className="cu-hero-overlay" />
                <motion.div
                    className="cu-hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={scrollConfig}
                    transition={{ duration: 0.8, ease: easeOut }}
                >
                    <h1>Get in Touch</h1>
                    <p>
                        Have questions, suggestions, or just want to say hello?
                        We would love to connect with fellow travelers and enthusiasts.
                    </p>
                </motion.div>
            </section>

            {/* ── Content ── */}
            <div className="cu-content">

                {/* ── 2. Developer Profile ── */}
                <motion.div
                    className="cu-profile"
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={scrollConfig}
                    transition={{ duration: 0.8, ease: easeOut }}
                >
                    <img
                        src="/Images/Gregor DP.jpg"
                        alt="Gregor Allen B. Mondragon — Sole Developer of Aklan Tourism"
                        className="cu-profile-img"
                    />
                    <div className="cu-profile-info">
                        <h3>Meet the Creator</h3>
                        <div className="cu-roles">
                            <span className="cu-role-tag">Sole Developer</span>
                            <span className="cu-role-tag">UI/UX Designer</span>
                            <span className="cu-role-tag">Content Creator</span>
                            <span className="cu-role-tag">Platform Architect</span>
                        </div>
                        <p>
                            I am <strong>Gregor Allen B. Mondragon</strong>, a dedicated 3rd-year student at the <strong>College of Computer Studies, Aklan State University – Kalibo Campus</strong>, currently pursuing a <strong>Bachelor of Science in Information Technology, majoring in Software Engineering</strong>. 
                        </p>
                        <p>
                            As the sole developer and architect behind this platform, I have meticulously engineered every interaction—from the fluid animations and high-end UI design to the underlying software architecture. This project represents the intersection of my technical expertise and my deep-rooted passion for showcasing Aklan's unmatched beauty to the world through a premium, immersive digital experience.
                        </p>
                    </div>
                </motion.div>

                {/* ── 3. Contact Form & Info Stack ── */}
                <div className="cu-grid">

                    {/* Info Side */}
                    <div className="cu-info">
                        {[
                            {
                                icon: <FaMapMarkerAlt />,
                                title: "Explore Aklan",
                                text: "Based in Kalibo, Aklan, Philippines. Surrounded by the rich woven heritage and pristine rivers perfectly blending with our coastal treasures.",
                            },
                            {
                                icon: <FaEnvelope />,
                                title: "Direct Email",
                                text: "gregormondragon16@gmail.com\nDrop a line and I'll get back to you as soon as I dock at the port of my inbox.",
                            },
                            {
                                icon: <FaPhoneAlt />,
                                title: "Support & Inquiries",
                                text: "+63 (900) 123-4567\nAvailable whenever I am not out taking drone shots of our gorgeous coastlines.",
                            },
                        ].map((info, idx) => (
                            <motion.div
                                key={idx}
                                className="cu-info-card"
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={scrollConfig}
                                transition={{ duration: 0.6, delay: idx * 0.15, ease: easeOut }}
                            >
                                <div className="cu-icon">{info.icon}</div>
                                <div>
                                    <h4>{info.title}</h4>
                                    <p style={{ whiteSpace: "pre-line" }}>{info.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Form Side */}
                    <motion.div
                        className="cu-form-card"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={scrollConfig}
                        transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
                    >
                        <h2>Send a Message</h2>
                        <form onSubmit={handleSubmit}>
                            {/* Disabled Captcha completely seamlessly */}
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_template" value="table" />

                            <div className="cu-input-group">
                                <label>Your Name</label>
                                <input type="text" name="name" placeholder="Juan Dela Cruz" required />
                            </div>
                            <div className="cu-input-group">
                                <label>Email Address</label>
                                <input type="email" name="email" placeholder="juan@example.com" required />
                            </div>
                            <div className="cu-input-group">
                                <label>Subject</label>
                                <input type="text" name="_subject" placeholder="Saying Hello" required />
                            </div>
                            <div className="cu-input-group">
                                <label>Message</label>
                                <textarea name="message" rows="4" placeholder="How can I help you?" required></textarea>
                            </div>
                            <motion.button
                                className="cu-submit-btn"
                                type="submit"
                                disabled={formStatus === "sending"}
                                style={{
                                    opacity: formStatus === "sending" ? 0.7 : 1,
                                    cursor: formStatus === "sending" ? "not-allowed" : "pointer",
                                    backgroundColor: formStatus === "success" ? "#2ecc71" : formStatus === "error" ? "#e74c3c" : "#0b1f45"
                                }}
                                whileHover={{ scale: formStatus === "sending" ? 1 : 1.02 }}
                                whileTap={{ scale: formStatus === "sending" ? 1 : 0.98 }}
                            >
                                {formStatus === "sending" ? "Sending..." : formStatus === "success" ? "Message Sent!" : formStatus === "error" ? "Error Sending!" : "Send Message"}
                                {formStatus === "" && <FaPaperPlane />}
                            </motion.button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
