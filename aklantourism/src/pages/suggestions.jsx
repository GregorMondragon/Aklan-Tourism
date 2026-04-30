import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/suggestions.css";

function Suggestions() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle suggestion submission goes here
    alert("Thank you for your suggestion!");
  };

  return (
    <div className="suggestions-container">
      <Link to="/" className="back-home">
        <FaArrowLeft /> Back to Home
      </Link>
      
      <motion.div 
        className="suggestions-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="suggestions-header">
          <h2>We Value Your Feedback</h2>
          <p>Help us improve your Aklan Tourism experience. Share your suggestions, feature requests, or report issues below.</p>
        </div>

        <form className="suggestions-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="suggestion-title">Subject</label>
            <input 
              id="suggestion-title"
              type="text" 
              placeholder="E.g., Missing Destination, New Feature Request" 
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="suggestion-details">Your Suggestion</label>
            <textarea 
              id="suggestion-details"
              rows="5" 
              placeholder="Describe your suggestion in detail..." 
              required
            ></textarea>
          </div>

          <motion.button 
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Suggestion
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Suggestions;
