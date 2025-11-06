import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ setUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // 🎨 Pinterest-style palette with baby pink & warm neutrals
  const pinterestColors = {
    primary: "#ffff",      // Baby pink
    secondary: "#ffff",    // Soft peach
    background: "#fff5f7",   // Soft pastel pink background
    overlay: "rgba(255, 245, 247, 0.7)", // Light transparent pink overlay
    textDark: "#3B3B3B",     // Charcoal text
    textLight: "#9A9A9A",    // Subtle gray
    white: "#ffffff",
    error: "#f17e7e",        // Muted red for errors
  };

  // Responsive styles
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundImage: `url("https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
      fontFamily: "Poppins, sans-serif",
      overflow: "hidden",
      padding: "1rem",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: pinterestColors.overlay,
      zIndex: 0,
    },
    loginBox: {
      backgroundColor: pinterestColors.primary,
      padding: "clamp(1.5rem, 4vw, 2.5rem)",
      borderRadius: "20px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "420px",
      minWidth: "280px",
      position: "relative",
      animation: "fadeInUp 0.8s ease",
      zIndex: 1,
      backdropFilter: "blur(8px)",
    },
    title: {
      textAlign: "center",
      color: pinterestColors.textDark,
      marginBottom: "clamp(1rem, 3vw, 1.5rem)",
      fontSize: "clamp(1.5rem, 4vw, 2rem)",
      fontWeight: "bold",
      letterSpacing: "1px",
    },
    formGroup: { 
      marginBottom: "clamp(0.8rem, 2vw, 1rem)", 
      position: "relative" 
    },
    label: {
      display: "block",
      marginBottom: "0.5rem",
      color: pinterestColors.textDark,
      fontWeight: "500",
      fontSize: "clamp(0.9rem, 2vw, 1rem)",
    },
    input: {
      width: "100%",
      padding: "clamp(0.7rem, 2vw, 0.8rem) 0.75rem",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "clamp(0.9rem, 2vw, 1rem)",
      outline: "none",
      transition: "border 0.3s ease, box-shadow 0.3s ease",
      backgroundColor: pinterestColors.white,
      boxSizing: "border-box",
    },
    inputError: { borderColor: pinterestColors.error },
    eyeIcon: {
      position: "absolute",
      top: "50%",
      right: "12px",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: pinterestColors.textLight,
      fontSize: "clamp(0.9rem, 2vw, 1rem)",
    },
    errorText: {
      color: pinterestColors.error,
      fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)",
      marginTop: "0.25rem",
    },
    button: {
      width: "100%",
      padding: "clamp(0.7rem, 2vw, 0.8rem)",
      backgroundColor: pinterestColors.textDark,
      color: pinterestColors.white,
      border: "none",
      borderRadius: "8px",
      fontSize: "clamp(0.9rem, 2vw, 1rem)",
      fontWeight: "600",
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      marginTop: "clamp(0.6rem, 2vw, 0.8rem)",
      minHeight: "44px",
    },
    googleButton: {
      width: "100%",
      padding: "clamp(0.7rem, 2vw, 0.75rem)",
      backgroundColor: "#DB4437",
      color: pinterestColors.white,
      border: "none",
      borderRadius: "8px",
      fontSize: "clamp(0.9rem, 2vw, 1rem)",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "clamp(0.6rem, 2vw, 0.8rem)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      transition: "transform 0.2s ease",
      minHeight: "44px",
    },
    rememberForgot: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "clamp(0.4rem, 1.5vw, 0.5rem)",
      fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
      flexWrap: "wrap",
      gap: "0.5rem",
    },
    checkbox: { 
      marginRight: "5px",
      transform: "scale(0.9)",
    },
    link: {
      color: pinterestColors.textDark,
      textDecoration: "none",
      cursor: "pointer",
      fontWeight: "500",
      fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
    },
    newUser: {
      textAlign: "center",
      marginTop: "clamp(1rem, 2.5vw, 1.2rem)",
      color: pinterestColors.textDark,
      fontSize: "clamp(0.85rem, 1.8vw, 0.95rem)",
    },
    loading: {
      display: "inline-block",
      width: "20px",
      height: "20px",
      border: `3px solid ${pinterestColors.white}`,
      borderRadius: "50%",
      borderTopColor: "transparent",
      animation: "spin 1s ease-in-out infinite",
    },
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";

    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!formData.password) newErrors.password = "Password is required";
    else if (!strongPassword.test(formData.password))
      newErrors.password =
        "Password must be 6+ chars, include uppercase, lowercase, and a number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setUser({ name: formData.username });
      
      // Show success toast message
      toast.success('🛒 Successfully logged in!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      
      // Navigate after a short delay to show the toast
      setTimeout(() => {
        navigate("/");
      }, 1000);
      
    } catch {
      setErrors({ submit: "Login failed. Try again." });
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    toast.info('Google Sign-In feature coming soon!', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <div style={styles.loginBox}>
        <h2 style={styles.title}>Login to E-CART</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.username ? styles.inputError : {}),
              }}
              placeholder="Enter your username"
            />
            {errors.username && (
              <div style={styles.errorText}>{errors.username}</div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.password ? styles.inputError : {}),
              }}
              placeholder="Enter your password"
            />
            <span
              style={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <div style={styles.errorText}>{errors.password}</div>
            )}
          </div>

          <div style={styles.rememberForgot}>
            <label style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                style={styles.checkbox}
              />
              Remember me
            </label>
            <span style={styles.link}>Forgot password?</span>
          </div>

          <button 
            type="submit" 
            style={styles.button}
            disabled={isLoading}
          >
            {isLoading ? <div style={styles.loading}></div> : "Sign In"}
          </button>

          <button
            type="button"
            style={styles.googleButton}
            onClick={handleGoogleSignIn}
          >
            <FaGoogle /> Sign in with Google
          </button>

          <div style={styles.newUser}>
            New user?{" "}
            <Link to="/register" style={styles.link}>
              Register here
            </Link>
          </div>

          {errors.submit && (
            <div
              style={{
                ...styles.errorText,
                textAlign: "center",
                marginTop: "1rem",
              }}
            >
              {errors.submit}
            </div>
          )}
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <style>
        {`
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          button:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 15px rgba(247, 200, 208, 0.6);
          }
          
          /* Mobile-specific adjustments */
          @media (max-width: 480px) {
            .Toastify__toast-container {
              width: 90% !important;
              left: 5% !important;
              right: 5% !important;
            }
            
            .Toastify__toast {
              font-size: 14px;
            }
          }
          
          /* Tablet adjustments */
          @media (min-width: 481px) and (max-width: 768px) {
            .Toastify__toast-container {
              width: 80% !important;
              left: 10% !important;
              right: 10% !important;
            }
          }
          
          /* Touch device improvements */
          @media (hover: none) and (pointer: coarse) {
            button:hover {
              transform: none;
            }
            
            input, button {
              font-size: 16px; /* Prevents zoom on iOS */
            }
          }
        `}
      </style>
    </div>
  );
}

export default Login;