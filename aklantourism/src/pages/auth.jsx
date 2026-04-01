import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import "../styles/auth.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const toggleMode = (isLoginMode) => {
    if (isLoading || isSuccess) return; // Prevent toggle during submit/success
    setIsLogin(isLoginMode);
    setErrors({}); 
    setFormData({ name: "", email: "", password: "" }); 
  };

  const validate = () => {
    const newErrors = {};
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = "Required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.password) {
      newErrors.password = "Required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Min 6 chars";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Navigate cleanly after showing success state briefly
      setTimeout(() => {
        navigate("/");
      }, 1200);
    }, 1500);
  };

  return (
    <div className="auth-container">
      <Link to="/" className="back-home">
        <FaArrowLeft /> Back to Home
      </Link>
      
      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="auth-header">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>{isLogin ? "Enter your details to access your account." : "Sign up to discover the best of Aklan."}</p>
        </div>

        <div className="auth-toggle">
          <div className={`toggle-slider ${!isLogin ? "signup" : ""}`}></div>
          <button 
            type="button"
            className={isLogin ? "active" : ""} 
            onClick={() => toggleMode(true)}
          >
            Log In
          </button>
          <button 
            type="button"
            className={!isLogin ? "active" : ""} 
            onClick={() => toggleMode(false)}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div 
                key="name"
                className="form-group"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="auth-name" className="sr-only">Full Name</label>
                <div className={`input-group ${errors.name ? 'has-error' : ''}`}>
                  <input 
                    id="auth-name"
                    type="text" 
                    name="name"
                    placeholder="Full Name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isLoading || isSuccess}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  <FaUser className="input-icon" aria-hidden="true" />
                </div>
                {errors.name && (
                  <motion.div id="name-error" className="minimal-error" role="alert" initial={{opacity:0}} animate={{opacity:1}}>
                    {errors.name}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="form-group">
            <label htmlFor="auth-email" className="sr-only">Email Address</label>
            <div className={`input-group ${errors.email ? 'has-error' : ''}`}>
              <input 
                id="auth-email"
                type="email" 
                name="email"
                placeholder="Email Address" 
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="email"
                disabled={isLoading || isSuccess}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              <FaEnvelope className="input-icon" aria-hidden="true" />
            </div>
            {errors.email && (
              <motion.div id="email-error" className="minimal-error" role="alert" initial={{opacity:0}} animate={{opacity:1}}>
                {errors.email}
              </motion.div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="auth-password" className="sr-only">Password</label>
            <div className={`input-group ${errors.password ? 'has-error' : ''}`}>
              <input 
                id="auth-password"
                type="password" 
                name="password"
                placeholder="Password" 
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="current-password"
                disabled={isLoading || isSuccess}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              <FaLock className="input-icon" aria-hidden="true" />
            </div>
            {errors.password && (
              <motion.div id="password-error" className="minimal-error" role="alert" initial={{opacity:0}} animate={{opacity:1}}>
                {errors.password}
              </motion.div>
            )}
          </div>

          <motion.button 
            type="submit"
            className={`submit-btn ${isLoading ? 'loading' : ''} ${isSuccess ? 'success' : ''}`}
            whileHover={(!isLoading && !isSuccess) ? { scale: 1.02 } : {}}
            whileTap={(!isLoading && !isSuccess) ? { scale: 0.98 } : {}}
            disabled={isLoading || isSuccess}
          >
            {isLoading ? "Processing..." : isSuccess ? (isLogin ? "Logged In Successfully" : "Account Created") : (isLogin ? "Sign In" : "Sign Up")}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Auth;
