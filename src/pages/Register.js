import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register({ setUser }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundImage: "url('https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      position: "relative",
    },
    registerBox: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      padding: "2.5rem",
      borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "450px",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      backdropFilter: "blur(10px)",
      position: "relative",
      zIndex: 1,
    },
    title: {
      textAlign: "center",
      color: "#2c3e50",
      marginBottom: "2rem",
      fontSize: "1.8rem",
      fontWeight: "700",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    formGroup: {
      marginBottom: "1.5rem",
      position: "relative",
    },
    label: {
      display: "block",
      marginBottom: "0.5rem",
      color: "#5d6d7e",
      fontWeight: "600",
      fontSize: "0.9rem",
    },
    input: {
      width: "100%",
      padding: "0.85rem 1rem",
      border: "2px solid #e8e8e8",
      borderRadius: "10px",
      fontSize: "1rem",
      boxSizing: "border-box",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      transition: "all 0.3s ease",
      color: "#2c3e50",
    },
    inputFocus: {
      borderColor: "#667eea",
      backgroundColor: "white",
      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
      outline: "none",
    },
    inputError: {
      borderColor: "#e74c3c",
      backgroundColor: "rgba(231, 76, 60, 0.02)",
    },
    eyeIcon: {
      position: "absolute",
      top: "45%",
      right: "15px",
      cursor: "pointer",
      color: "#95a5a6",
      transition: "color 0.3s ease",
      fontSize: "1.1rem",
    },
    eyeIconHover: {
      color: "#667eea",
    },
    button: {
      width: "100%",
      padding: "0.85rem",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginTop: "0.5rem",
      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
    },
    buttonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
    },
    buttonDisabled: {
      background: "linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)",
      cursor: "not-allowed",
      transform: "none",
      boxShadow: "none",
    },
    newUser: {
      textAlign: "center",
      marginTop: "1.5rem",
      color: "#7f8c8d",
      fontSize: "0.9rem",
    },
    link: {
      color: "#667eea",
      textDecoration: "none",
      fontWeight: "600",
      transition: "color 0.3s ease",
    },
    linkHover: {
      color: "#764ba2",
    },
    errorText: {
      color: "#e74c3c",
      fontSize: "0.8rem",
      marginTop: "0.4rem",
      fontWeight: "500",
    },
    loading: {
      display: "inline-block",
      width: "20px",
      height: "20px",
      border: "3px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "50%",
      borderTopColor: "white",
      animation: "spin 1s ease-in-out infinite",
    },
    successMessage: {
      textAlign: "center",
      color: "#27ae60",
      backgroundColor: "rgba(39, 174, 96, 0.1)",
      padding: "0.75rem",
      borderRadius: "8px",
      marginBottom: "1rem",
      fontWeight: "500",
    },
    logo: {
      textAlign: "center",
      marginBottom: "1rem",
    },
    logoText: {
      fontSize: "2rem",
      fontWeight: "800",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      margin: 0,
    },
    subtitle: {
      textAlign: "center",
      color: "#7f8c8d",
      marginBottom: "2rem",
      fontSize: "0.95rem",
    }
  };

  // Validation logic
  const validateForm = () => {
    const newErrors = {};
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!strongPassword.test(formData.password)) {
      newErrors.password =
        "Password must be 8+ characters with uppercase, lowercase, and number";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate registration success
      setUser({
        name: formData.username,
        email: formData.email,
      });

      // Show success message before redirect
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setErrors({ submit: "Registration failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // Event handlers for hover effects
  const handleEyeIconHover = (e) => {
    e.target.style.color = styles.eyeIconHover.color;
  };

  const handleEyeIconLeave = (e) => {
    e.target.style.color = styles.eyeIcon.color;
  };

  const handleButtonHover = (e) => {
    if (!isLoading) {
      e.target.style.transform = styles.buttonHover.transform;
      e.target.style.boxShadow = styles.buttonHover.boxShadow;
    }
  };

  const handleButtonLeave = (e) => {
    e.target.style.transform = "translateY(0)";
    e.target.style.boxShadow = styles.button.boxShadow;
  };

  const handleLinkHover = (e) => {
    e.target.style.color = styles.linkHover.color;
  };

  const handleLinkLeave = (e) => {
    e.target.style.color = styles.link.color;
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = styles.inputFocus.borderColor;
    e.target.style.backgroundColor = styles.inputFocus.backgroundColor;
    e.target.style.boxShadow = styles.inputFocus.boxShadow;
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = styles.input.borderColor;
    e.target.style.backgroundColor = styles.input.backgroundColor;
    e.target.style.boxShadow = "none";
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.registerBox}>
        <div style={styles.logo}>
          <h1 style={styles.logoText}>E-CART</h1>
        </div>
        <h2 style={styles.title}>Create Your Account</h2>
        <p style={styles.subtitle}>Join thousands of happy shoppers today</p>
        
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              style={{
                ...styles.input,
                ...(errors.username ? styles.inputError : {}),
              }}
              disabled={isLoading}
              placeholder="Enter your username"
            />
            {errors.username && (
              <div style={styles.errorText}>{errors.username}</div>
            )}
          </div>

          {/* Email */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {}),
              }}
              disabled={isLoading}
              placeholder="Enter your email"
            />
            {errors.email && (
              <div style={styles.errorText}>{errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              style={{
                ...styles.input,
                ...(errors.password ? styles.inputError : {}),
              }}
              disabled={isLoading}
              placeholder="Create a strong password"
            />
            <span
              style={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
              onMouseEnter={handleEyeIconHover}
              onMouseLeave={handleEyeIconLeave}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <div style={styles.errorText}>{errors.password}</div>
            )}
          </div>

          {/* Confirm Password */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              style={{
                ...styles.input,
                ...(errors.confirmPassword ? styles.inputError : {}),
              }}
              disabled={isLoading}
              placeholder="Confirm your password"
            />
            <span
              style={styles.eyeIcon}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              onMouseEnter={handleEyeIconHover}
              onMouseLeave={handleEyeIconLeave}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.confirmPassword && (
              <div style={styles.errorText}>{errors.confirmPassword}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isLoading ? styles.buttonDisabled : {}),
            }}
            disabled={isLoading}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            {isLoading ? <div style={styles.loading}></div> : "Create Account"}
          </button>

          {/* Success Message */}
          {isLoading && (
            <div style={styles.successMessage}>
              Creating your account...
            </div>
          )}

          {/* Already Have Account */}
          <div style={styles.newUser}>
            Already have an account?{" "}
            <Link 
              to="/login" 
              style={styles.link}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Sign in here
            </Link>
          </div>

          {errors.submit && (
            <div style={{ ...styles.errorText, textAlign: "center", marginTop: "1rem" }}>
              {errors.submit}
            </div>
          )}
        </form>
      </div>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          input::placeholder {
            color: #aab7b8;
            font-size: 0.9rem;
          }
        `}
      </style>
    </div>
  );
}

export default Register;