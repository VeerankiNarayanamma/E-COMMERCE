import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsiveness
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  // Icons for buttons
  const Icons = {
    Home: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    Categories: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    Cart: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
    Wishlist: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    Payment: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    Logout: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16,17 21,12 16,7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
    ),
    Menu: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    )
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}></h1>
        
        {/* Desktop Navigation */}
        <nav style={{ ...styles.nav, ...(isMobile ? styles.navHidden : {}) }}>
          <button 
            style={styles.navButton}
            onClick={() => handleNavigate("/home")}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = styles.navButtonHover.backgroundColor;
              e.target.style.transform = styles.navButtonHover.transform;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = styles.navButton.backgroundColor;
              e.target.style.transform = 'scale(1)';
            }}
          >
            <Icons.Home />
            {!isMobile && "Home"}
          </button>

          <button 
            style={styles.navButton}
            onClick={() => handleNavigate("/category")}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = styles.navButtonHover.backgroundColor;
              e.target.style.transform = styles.navButtonHover.transform;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = styles.navButton.backgroundColor;
              e.target.style.transform = 'scale(1)';
            }}
          >
            <Icons.Categories />
            {!isMobile && "Categories"}
          </button>

          <button 
            style={styles.navButton}
            onClick={() => handleNavigate("/wishlist")}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = styles.navButtonHover.backgroundColor;
              e.target.style.transform = styles.navButtonHover.transform;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = styles.navButton.backgroundColor;
              e.target.style.transform = 'scale(1)';
            }}
          >
            <Icons.Wishlist />
            {!isMobile && "Wishlist"}
          </button>

          <button 
            style={styles.navButton}
            onClick={() => handleNavigate("/cart")}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = styles.navButtonHover.backgroundColor;
              e.target.style.transform = styles.navButtonHover.transform;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = styles.navButton.backgroundColor;
              e.target.style.transform = 'scale(1)';
            }}
          >
            <Icons.Cart />
            {!isMobile && "Cart"}
          </button>

          <button 
            style={styles.logoutButton}
            onClick={handleLogout}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = styles.logoutButtonHover.backgroundColor;
              e.target.style.transform = styles.logoutButtonHover.transform;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = styles.logoutButton.backgroundColor;
              e.target.style.transform = 'scale(1)';
            }}
          >
            <Icons.Logout />
            {!isMobile && "Logout"}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        {isMobile && (
          <button 
            style={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icons.Menu />
          </button>
        )}
      </header>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div style={styles.mobileMenu}>
          <button 
            style={styles.mobileNavButton}
            onClick={() => {
              handleNavigate("/home");
              setIsMenuOpen(false);
            }}
          >
            <Icons.Home />
            Home
          </button>

          <button 
            style={styles.mobileNavButton}
            onClick={() => {
              handleNavigate("/category");
              setIsMenuOpen(false);
            }}
          >
            <Icons.Categories />
            Categories
          </button>

          <button 
            style={styles.mobileNavButton}
            onClick={() => {
              handleNavigate("/wishlist");
              setIsMenuOpen(false);
            }}
          >
            <Icons.Wishlist />
            Wishlist
          </button>

          <button 
            style={styles.mobileNavButton}
            onClick={() => {
              handleNavigate("/cart");
              setIsMenuOpen(false);
            }}
          >
            <Icons.Cart />
            Cart
          </button>

          <button 
            style={styles.mobileLogoutButton}
            onClick={handleLogout}
          >
            <Icons.Logout />
            Logout
          </button>
        </div>
      )}

      <main style={styles.main}>
        <div style={styles.welcomeSection}>
          <h2 style={styles.welcomeTitle}>Welcome to your Dashboard! 👋</h2>
          <p style={styles.welcomeSubtitle}>
            Explore products, check your cart, and manage your shopping account easily.
          </p>
        </div>

        <div style={styles.cardContainer}>
          <div 
            style={styles.card}
            onClick={() => handleNavigate("/category")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = styles.cardHover.transform;
              e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = styles.card.boxShadow;
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png"
              alt="Categories"
              style={styles.cardImage}
            />
            <h3 style={styles.cardTitle}>Shop by Category</h3>
            <p style={styles.cardDescription}>Browse through our wide range of product categories</p>
          </div>

          <div 
            style={styles.card}
            onClick={() => handleNavigate("/wishlist")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = styles.cardHover.transform;
              e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = styles.card.boxShadow;
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
              alt="Wishlist"
              style={styles.cardImage}
            />
            <h3 style={styles.cardTitle}>My Wishlist</h3>
            <p style={styles.cardDescription}>View and manage your saved favorite items</p>
          </div>

          <div 
            style={styles.card}
            onClick={() => handleNavigate("/cart")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = styles.cardHover.transform;
              e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = styles.card.boxShadow;
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2838/2838838.png"
              alt="Cart"
              style={styles.cardImage}
            />
            <h3 style={styles.cardTitle}>View Cart</h3>
            <p style={styles.cardDescription}>Check your shopping cart and proceed to checkout</p>
          </div>

          <div 
            style={styles.card}
            onClick={() => handleNavigate("/payment")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = styles.cardHover.transform;
              e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = styles.card.boxShadow;
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
              alt="Payment"
              style={styles.cardImage}
            />
            <h3 style={styles.cardTitle}>Make Payment</h3>
            <p style={styles.cardDescription}>Secure and easy payment options available</p>
          </div>
        </div>
      </main>

      <footer style={styles.footer}>
        <p>© 2025 E-CART. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "white",
    color: "#2d3748",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    borderBottom: "1px solid #e2e8f0",
    position: "relative",
  },
  logo: {
    margin: 0,
    fontSize: "1.8rem",
    fontWeight: "700",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  nav: {
    display: "flex",
    gap: "0.75rem",
    alignItems: "center",
  },
  navHidden: {
    display: "none",
  },
  navButton: {
    backgroundColor: "transparent",
    border: "1px solid #e2e8f0",
    padding: "0.6rem 1rem",
    color: "#4a5568",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "0.9rem",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  navButtonHover: {
    backgroundColor: "#667eea",
    color: "white",
    transform: "translateY(-2px)",
  },
  logoutButton: {
    backgroundColor: "#e53e3e",
    border: "none",
    padding: "0.6rem 1rem",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  logoutButtonHover: {
    backgroundColor: "#c53030",
    transform: "translateY(-2px)",
  },
  menuButton: {
    backgroundColor: "transparent",
    border: "1px solid #e2e8f0",
    padding: "0.5rem",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mobileMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderBottom: "1px solid #e2e8f0",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
  },
  mobileNavButton: {
    backgroundColor: "transparent",
    border: "none",
    padding: "1rem 1.5rem",
    color: "#4a5568",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    borderBottom: "1px solid #f7fafc",
    transition: "background-color 0.2s ease",
  },
  mobileLogoutButton: {
    backgroundColor: "#e53e3e",
    border: "none",
    padding: "1rem 1.5rem",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    transition: "background-color 0.2s ease",
  },
  main: {
    flex: 1,
    padding: "2rem 1rem",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  welcomeSection: {
    textAlign: "center",
    marginBottom: "3rem",
    padding: "2rem",
  },
  welcomeTitle: {
    color: "#2d3748",
    margin: "0 0 1rem 0",
    fontSize: "2.5rem",
    fontWeight: "700",
  },
  welcomeSubtitle: {
    color: "#718096",
    fontSize: "1.2rem",
    margin: 0,
    maxWidth: "600px",
    margin: "0 auto",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textAlign: "center",
    border: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardHover: {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
  },
  cardImage: {
    width: "80px",
    height: "80px",
    marginBottom: "1.5rem",
  },
  cardTitle: {
    color: "#2d3748",
    margin: "0 0 1rem 0",
    fontSize: "1.3rem",
    fontWeight: "600",
  },
  cardDescription: {
    color: "#718096",
    margin: 0,
    lineHeight: "1.5",
  },
  footer: {
    backgroundColor: "#2d3748",
    color: "white",
    textAlign: "center",
    padding: "1.5rem 0",
    marginTop: "auto",
  },

  // Responsive styles
  "@media (max-width: 768px)": {
    header: {
      padding: "1rem",
    },
    logo: {
      fontSize: "1.5rem",
    },
    main: {
      padding: "1rem",
    },
    welcomeTitle: {
      fontSize: "2rem",
    },
    welcomeSubtitle: {
      fontSize: "1.1rem",
    },
    cardContainer: {
      gridTemplateColumns: "1fr",
      gap: "1.5rem",
    },
    card: {
      padding: "1.5rem",
    },
  },
  "@media (max-width: 480px)": {
    welcomeTitle: {
      fontSize: "1.8rem",
    },
    card: {
      padding: "1.25rem",
    },
  },
};

export default Dashboard;