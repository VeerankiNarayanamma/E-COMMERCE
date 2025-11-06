import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from './AppContext'; // Import the context

const Wishlist = () => {
  const { 
    state: { wishlist }, 
    addToCart, 
    removeFromWishlist, 
    clearWishlist,
    moveWishlistToCart 
  } = useApp();

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

  // Use wishlist from context
  const displayWishlist = wishlist;

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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    Delete: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
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
    ),
    Star: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    )
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedColors, setSelectedColors] = useState({});

  // Handle size selection
  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  // Handle color selection
  const handleColorSelect = (productId, color) => {
    setSelectedColors(prev => ({
      ...prev,
      [productId]: color
    }));
  };

  // Handle add to cart from wishlist
  const handleAddToCart = (product) => {
    const productWithSelections = {
      ...product,
      selectedSize: selectedSizes[product.id] || (product.sizes && product.sizes[0]),
      selectedColor: selectedColors[product.id] || (product.colors && product.colors[0]),
      quantity: 1
    };
    
    addToCart(productWithSelections);
    alert(`${product.name} added to cart!`);
  };

  // Handle remove from wishlist
  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  // Handle move all to cart
  const handleMoveAllToCart = () => {
    moveWishlistToCart();
    alert('All items moved to cart!');
  };

  // Handle clear wishlist
  const handleClearWishlist = () => {
    clearWishlist();
  };

  // Calculate total value
  const totalValue = displayWishlist.reduce((total, item) => total + item.price, 0);
  const totalSavings = displayWishlist.reduce((total, item) => total + (item.originalPrice - item.price), 0);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>🛍️ E-CART</h1>
        
        {/* Desktop Navigation */}
        <nav style={{ ...styles.nav, ...(isMobile ? styles.navHidden : {}) }}>
          <button 
            style={styles.navButton}
            onClick={() => handleNavigate("/home")}
          >
            <Icons.Home />
            {!isMobile && "Home"}
          </button>

          <button 
            style={styles.navButton}
            onClick={() => handleNavigate("/category")}
          >
            <Icons.Categories />
            {!isMobile && "Categories"}
          </button>

          <button 
            style={{...styles.navButton, ...styles.activeNavButton}}
          >
            <Icons.Wishlist />
            {!isMobile && "Wishlist"}
            {displayWishlist.length > 0 && (
              <span style={styles.wishlistCount}>{displayWishlist.length}</span>
            )}
          </button>

          <button 
            style={styles.navButton}
            onClick={() => handleNavigate("/cart")}
          >
            <Icons.Cart />
            {!isMobile && "Cart"}
          </button>

          <button 
            style={styles.logoutButton}
            onClick={handleLogout}
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
            style={{...styles.mobileNavButton, ...styles.activeMobileNavButton}}
          >
            <Icons.Wishlist />
            Wishlist
            {displayWishlist.length > 0 && (
              <span style={styles.mobileWishlistCount}>{displayWishlist.length}</span>
            )}
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
        {/* Wishlist Header */}
        <div style={styles.wishlistHeader}>
          <div style={styles.headerContent}>
            <h1 style={styles.pageTitle}>
              <Icons.Wishlist /> My Wishlist
            </h1>
            <p style={styles.pageSubtitle}>
              {displayWishlist.length} {displayWishlist.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
          
          {displayWishlist.length > 0 && (
            <div style={styles.headerActions}>
              <button 
                style={styles.secondaryButton}
                onClick={handleMoveAllToCart}
              >
                Move All to Cart
              </button>
              <button 
                style={styles.dangerButton}
                onClick={handleClearWishlist}
              >
                Clear Wishlist
              </button>
            </div>
          )}
        </div>

        {/* Wishlist Summary */}
        {displayWishlist.length > 0 && (
          <div style={styles.summarySection}>
            <div style={styles.summaryCards}>
              <div style={styles.summaryCard}>
                <span style={styles.summaryNumber}>{displayWishlist.length}</span>
                <span style={styles.summaryLabel}>Items</span>
              </div>
              <div style={styles.summaryCard}>
                <span style={styles.summaryNumber}>₹{totalValue}</span>
                <span style={styles.summaryLabel}>Total Value</span>
              </div>
              <div style={styles.summaryCard}>
                <span style={styles.summaryNumber}>₹{totalSavings}</span>
                <span style={styles.summaryLabel}>Total Savings</span>
              </div>
              <div style={styles.summaryCard}>
                <span style={styles.summaryNumber}>
                  {new Set(displayWishlist.map(item => item.category)).size}
                </span>
                <span style={styles.summaryLabel}>Categories</span>
              </div>
            </div>
          </div>
        )}

        {/* Wishlist Items */}
        <div style={styles.wishlistContent}>
          {displayWishlist.length === 0 ? (
            // Empty Wishlist State
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>❤️</div>
              <h2 style={styles.emptyTitle}>Your wishlist is empty</h2>
              <p style={styles.emptyDescription}>
                Save your favorite items here to keep track of them and buy them later.
              </p>
              <button 
                style={styles.primaryButton}
                onClick={() => handleNavigate("/category")}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            // Wishlist Items Grid
            <div style={styles.wishlistGrid}>
              {displayWishlist.map((product) => (
                <div key={product.id} style={styles.wishlistCard}>
                  {/* Product Image */}
                  <div style={styles.imageSection}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={styles.productImage}
                    />
                    {!product.inStock && (
                      <div style={styles.outOfStockBadge}>Out of Stock</div>
                    )}
                    {product.discount && (
                      <div style={styles.discountBadge}>
                        {product.discount}% OFF
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div style={styles.detailsSection}>
                    <div style={styles.productHeader}>
                      <h3 style={styles.productName}>{product.name}</h3>
                      <button
                        style={styles.deleteButton}
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        title="Remove from wishlist"
                      >
                        <Icons.Delete />
                      </button>
                    </div>

                    <div style={styles.ratingSection}>
                      <span style={styles.starRating}>
                        <Icons.Star />
                        {product.rating || 4.0}
                      </span>
                      <span style={styles.reviewCount}>({product.reviews || 0} reviews)</span>
                    </div>

                    <p style={styles.productDescription}>{product.description}</p>

                    {/* Price Section */}
                    <div style={styles.priceSection}>
                      <span style={styles.currentPrice}>₹{product.price}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span style={styles.originalPrice}>₹{product.originalPrice}</span>
                      )}
                    </div>

                    {/* Size Selection */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div style={styles.optionSection}>
                        <label style={styles.optionLabel}>Size:</label>
                        <div style={styles.sizeOptions}>
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              style={{
                                ...styles.sizeOption,
                                ...(selectedSizes[product.id] === size ? styles.selectedSizeOption : {})
                              }}
                              onClick={() => handleSizeSelect(product.id, size)}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Color Selection */}
                    {product.colors && product.colors.length > 0 && (
                      <div style={styles.optionSection}>
                        <label style={styles.optionLabel}>Color:</label>
                        <div style={styles.colorOptions}>
                          {product.colors.map((color) => (
                            <button
                              key={color}
                              style={{
                                ...styles.colorOption,
                                ...(selectedColors[product.id] === color ? styles.selectedColorOption : {}),
                                backgroundColor: color.toLowerCase()
                              }}
                              onClick={() => handleColorSelect(product.id, color)}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Added Date */}
                    {product.addedDate && (
                      <div style={styles.addedDate}>
                        Added on {new Date(product.addedDate).toLocaleDateString()}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div style={styles.actionButtons}>
                      <button
                        style={{
                          ...styles.addToCartButton,
                          ...(!product.inStock ? styles.disabledButton : {})
                        }}
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                      >
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </button>
                      <button
                        style={styles.buyNowButton}
                        onClick={() => {
                          handleAddToCart(product);
                          handleNavigate("/cart");
                        }}
                        disabled={!product.inStock}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Continue Shopping Section */}
        {displayWishlist.length > 0 && (
          <div style={styles.continueShopping}>
            <h3 style={styles.continueTitle}>Find more items you'll love</h3>
            <button 
              style={styles.primaryButton}
              onClick={() => handleNavigate("/category")}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </main>

      <footer style={styles.footer}>
        <p>© 2025 E-CART. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Your existing styles object remains exactly the same
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
    position: "relative",
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
    position: "relative",
  },
  activeNavButton: {
    backgroundColor: "#667eea",
    color: "white",
    borderColor: "#667eea",
  },
  wishlistCount: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    backgroundColor: "#e53e3e",
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    fontSize: "0.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
  },
  mobileWishlistCount: {
    backgroundColor: "#e53e3e",
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    fontSize: "0.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    marginLeft: "auto",
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
  activeMobileNavButton: {
    backgroundColor: "#667eea",
    color: "white",
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
  // Wishlist Header
  wishlistHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  headerContent: {
    flex: 1,
  },
  pageTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#2d3748",
    margin: "0 0 0.5rem 0",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  pageSubtitle: {
    fontSize: "1.2rem",
    color: "#718096",
    margin: 0,
  },
  headerActions: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  primaryButton: {
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    color: "#667eea",
    border: "2px solid #667eea",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  dangerButton: {
    backgroundColor: "transparent",
    color: "#e53e3e",
    border: "2px solid #e53e3e",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  // Summary Section
  summarySection: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    marginBottom: "2rem",
  },
  summaryCards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "1.5rem",
  },
  summaryCard: {
    padding: "1.5rem",
    backgroundColor: "#f7fafc",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  summaryNumber: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#667eea",
    marginBottom: "0.5rem",
  },
  summaryLabel: {
    color: "#718096",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  // Wishlist Content
  wishlistContent: {
    minHeight: "400px",
  },
  emptyState: {
    textAlign: "center",
    padding: "4rem 2rem",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  },
  emptyIcon: {
    fontSize: "4rem",
    marginBottom: "1rem",
  },
  emptyTitle: {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#2d3748",
    margin: "0 0 1rem 0",
  },
  emptyDescription: {
    fontSize: "1.1rem",
    color: "#718096",
    margin: "0 0 2rem 0",
    maxWidth: "400px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  // Wishlist Grid
  wishlistGrid: {
    display: "grid",
    gap: "2rem",
  },
  wishlistCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: "0",
  },
  imageSection: {
    position: "relative",
    backgroundColor: "#f7fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  productImage: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
  },
  outOfStockBadge: {
    position: "absolute",
    top: "1rem",
    left: "1rem",
    backgroundColor: "#e53e3e",
    color: "white",
    padding: "0.25rem 0.5rem",
    borderRadius: "4px",
    fontSize: "0.8rem",
    fontWeight: "600",
  },
  discountBadge: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    backgroundColor: "#48bb78",
    color: "white",
    padding: "0.25rem 0.5rem",
    borderRadius: "4px",
    fontSize: "0.8rem",
    fontWeight: "600",
  },
  detailsSection: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  productHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "1rem",
  },
  productName: {
    fontSize: "1.4rem",
    fontWeight: "600",
    color: "#2d3748",
    margin: 0,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#e53e3e",
    cursor: "pointer",
    padding: "0.5rem",
    borderRadius: "4px",
    transition: "background-color 0.2s ease",
  },
  ratingSection: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  starRating: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    color: "#f6ad55",
    fontWeight: "600",
  },
  reviewCount: {
    color: "#718096",
    fontSize: "0.9rem",
  },
  productDescription: {
    color: "#718096",
    lineHeight: "1.5",
    margin: 0,
  },
  priceSection: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  currentPrice: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#2d3748",
  },
  originalPrice: {
    fontSize: "1.1rem",
    color: "#718096",
    textDecoration: "line-through",
  },
  optionSection: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  optionLabel: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#4a5568",
  },
  sizeOptions: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  sizeOption: {
    padding: "0.5rem 1rem",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    backgroundColor: "white",
    color: "#4a5568",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "all 0.2s ease",
  },
  selectedSizeOption: {
    backgroundColor: "#667eea",
    color: "white",
    borderColor: "#667eea",
  },
  colorOptions: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  colorOption: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "2px solid #e2e8f0",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  selectedColorOption: {
    borderColor: "#667eea",
    transform: "scale(1.1)",
  },
  addedDate: {
    color: "#a0aec0",
    fontSize: "0.9rem",
    fontStyle: "italic",
  },
  actionButtons: {
    display: "flex",
    gap: "1rem",
    marginTop: "auto",
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: "transparent",
    color: "#667eea",
    border: "2px solid #667eea",
    padding: "0.75rem 1.5rem",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  disabledButton: {
    backgroundColor: "#a0aec0",
    cursor: "not-allowed",
  },
  // Continue Shopping
  continueShopping: {
    textAlign: "center",
    padding: "3rem 2rem",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    marginTop: "3rem",
  },
  continueTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#2d3748",
    margin: "0 0 1.5rem 0",
  },
  footer: {
    backgroundColor: "#2d3748",
    color: "white",
    textAlign: "center",
    padding: "1.5rem 0",
    marginTop: "auto",
  },
};

export default Wishlist;