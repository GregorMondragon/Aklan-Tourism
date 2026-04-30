import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "", agreeToPrivacy: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { loginWithGoogle, signup, login, resetPassword } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Google sign in failed:", error);
      setErrors({ form: `Google Sign-In Error: ${error.message}` });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const toggleMode = (isLoginMode) => {
    if (isLoading || isSuccess) return; // Prevent toggle during submit/success
    setIsLogin(isLoginMode);
    setErrors({}); 
    setFormData({ name: "", email: "", password: "", confirmPassword: "", agreeToPrivacy: false }); 
    setShowPassword(false);
    setShowConfirmPassword(false);
    setResetSent(false);
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

    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Required";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (!isLogin && !formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = "You must agree to the Privacy Policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForgotPassword = async () => {
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ ...errors, email: "Please enter a valid email to reset password" });
      return;
    }
    try {
      setIsLoading(true);
      await resetPassword(formData.email);
      setResetSent(true);
      setErrors({ ...errors, form: null, email: null });
    } catch (error) {
      setErrors({ ...errors, form: "Failed to send password reset email." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({ ...errors, form: null });
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.password, formData.name);
      }
      
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      console.error("Auth error:", error);
      let errorMessage = `Failed: ${error.message}`;
      if (error.code === "auth/email-already-in-use") errorMessage = "Email is already in use.";
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") errorMessage = "Invalid email or password.";
      if (error.code === "auth/weak-password") errorMessage = "Password should be at least 6 characters.";
      
      setErrors({ form: errorMessage });
      setIsLoading(false);
    }
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
          {errors.form && (
            <motion.div 
              className="minimal-error form-main-error" 
              role="alert" 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: 'center', marginBottom: '1rem', padding: '0.8rem', background: 'rgba(255, 77, 77, 0.1)', border: '1px solid rgba(255, 77, 77, 0.3)', borderRadius: '8px' }}
            >
              {errors.form}
            </motion.div>
          )}

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
                type={showPassword ? "text" : "password"} 
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
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <motion.div id="password-error" className="minimal-error" role="alert" initial={{opacity:0}} animate={{opacity:1}}>
                {errors.password}
              </motion.div>
            )}
            
            {isLogin && (
              <div className="forgot-password-container">
                <button type="button" className="forgot-password-link" onClick={handleForgotPassword} disabled={isLoading}>
                  Forgot Password?
                </button>
                {resetSent && <span className="reset-sent-msg">Reset link sent!</span>}
              </div>
            )}
          </div>

          <AnimatePresence>
            {!isLogin && (
              <motion.div 
                className="form-group"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="auth-confirm-password" className="sr-only">Confirm Password</label>
                <div className={`input-group ${errors.confirmPassword ? 'has-error' : ''}`}>
                  <input 
                    id="auth-confirm-password"
                    type={showConfirmPassword ? "text" : "password"} 
                    name="confirmPassword"
                    placeholder="Confirm Password" 
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    disabled={isLoading || isSuccess}
                  />
                  <FaLock className="input-icon" aria-hidden="true" />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <motion.div className="minimal-error" role="alert" initial={{opacity:0}} animate={{opacity:1}}>
                    {errors.confirmPassword}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!isLogin && (
              <motion.div 
                className={`form-group privacy-checkbox ${errors.agreeToPrivacy ? 'has-error' : ''}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-color)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="agreeToPrivacy"
                    checked={formData.agreeToPrivacy}
                    onChange={handleInputChange}
                    disabled={isLoading || isSuccess}
                    style={{ width: 'auto', margin: 0, accentColor: 'var(--gold-primary)' }}
                  />
                  <span>I agree to the <Link to="/privacy" style={{ color: 'var(--gold-primary)' }}>Privacy & Security Policy</Link></span>
                </label>
                {errors.agreeToPrivacy && <div className="minimal-error" style={{ marginTop: '0.5rem' }}>{errors.agreeToPrivacy}</div>}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button 
            type="submit"
            className={`submit-btn ${isLoading ? 'loading' : ''} ${isSuccess ? 'success' : ''}`}
            whileHover={(!isLoading && !isSuccess) ? { scale: 1.02 } : {}}
            whileTap={(!isLoading && !isSuccess) ? { scale: 0.98 } : {}}
            disabled={isLoading || isSuccess}
          >
            {isLoading ? "Processing..." : isSuccess ? (isLogin ? "Logged In Successfully" : "Account Created") : (isLogin ? "Sign In" : "Sign Up")}
          </motion.button>

          <div className="auth-separator" style={{ textAlign: 'center', margin: '1rem 0', position: 'relative' }}>
            <span style={{ background: 'var(--bg-color)', padding: '0 10px', color: 'var(--text-muted)', fontSize: '0.9rem', position: 'relative', zIndex: 1 }}>or</span>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(255, 255, 255, 0.1)' }}></div>
          </div>

          <motion.button
            type="button"
            className="google-btn"
            onClick={handleGoogleSignIn}
            whileHover={(!isLoading && !isSuccess) ? { scale: 1.02 } : {}}
            whileTap={(!isLoading && !isSuccess) ? { scale: 0.98 } : {}}
            disabled={isLoading || isSuccess}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '1rem', background: 'white', color: '#333', borderRadius: '0.8rem', border: 'none', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            <FcGoogle size={20} /> Continue with Google
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Auth;
