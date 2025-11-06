import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ user, setUser, cartCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const location = useLocation();

  // Myntra-inspired color scheme
  const colors = {
    primary: '#ff3f6c', // Myntra pink
    secondary: '#282c3f', // Myntra dark
    background: '#ffffff',
    text: '#282c3f',
    textLight: '#696e79',
    border: '#d4d5d9',
    hover: '#f5f5f6',
    accent: '#ff3f6c'
  };

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() || selectedCategory) {
      console.log('Searching for:', searchQuery, 'in category:', selectedCategory);
      closeMenu();
    }
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const productCategories = [
    { value: '', label: 'All Categories' },
    { value: 'mens-wear', label: "Men's Wear" },
    { value: 'womens-wear', label: "Women's Wear" },
    { value: 'watches', label: 'Watches' },
    { value: 'footwear', label: 'Footwear' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'laptops', label: 'Laptops' }
  ];

  // Modern icon components with Myntra style
  const Icons = {
    Search: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.3-4.3"/>
      </svg>
    ),
    Menu: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    ),
    Home: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    User: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    Dashboard: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    Profile: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    Settings: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
    Cart: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
    Orders: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
    ChevronDown: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="6,9 12,15 18,9"/>
      </svg>
    ),
    Wishlist: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    )
  };

  // Responsive styles with media queries
  const styles = {
    // Main header styles - Myntra inspired
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: colors.background,
      borderBottom: `1px solid ${colors.border}`,
      transition: 'all 0.3s ease',
      boxShadow: isScrolled ? '0 2px 10px rgba(40, 44, 63, 0.1)' : 'none',
      height: isMobile ? '70px' : '80px',
      display: 'flex',
      alignItems: 'center'
    },

    // Navigation container
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
      height: '100%'
    },

    // Left section with logo and name
    leftSection: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '1rem' : isTablet ? '2rem' : '3rem',
      flex: isMobile ? 1 : 1
    },

    // Logo container
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      textDecoration: 'none',
      transition: 'transform 0.3s ease'
    },

    // Brand name styles - Myntra style
    brandName: {
      fontSize: isMobile ? '1.3rem' : isTablet ? '1.7rem' : '2rem',
      fontWeight: '800',
      color: colors.primary,
      margin: 0,
      fontFamily: "'Arial', sans-serif",
      letterSpacing: '-1px',
      textTransform: 'uppercase'
    },

    // Navigation links
    navLinks: {
      display: isMobile ? 'none' : isTablet ? 'none' : 'flex',
      alignItems: 'center',
      gap: isTablet ? '1.5rem' : '2rem',
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    navLink: {
      textDecoration: 'none',
      color: colors.text,
      fontWeight: '600',
      fontSize: isTablet ? '0.85rem' : '0.95rem',
      padding: '1rem 0',
      position: 'relative',
      transition: 'color 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.3px'
    },
    navLinkHover: {
      color: colors.primary
    },
    navLinkActive: {
      color: colors.primary,
      fontWeight: '700'
    },

    // Center section with search bar - Myntra style
    centerSection: {
      display: isMobile ? 'none' : 'flex',
      justifyContent: 'center',
      flex: isTablet ? 1.5 : 2,
      maxWidth: isTablet ? '400px' : '550px',
      margin: isTablet ? '0 1rem' : '0'
    },

    // Search bar styles - Myntra inspired
    searchForm: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: isTablet ? '38px' : '42px',
      position: 'relative',
      backgroundColor: colors.hover,
      borderRadius: '4px',
      overflow: 'hidden'
    },
    searchInputContainer: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      position: 'relative',
      height: '100%'
    },
    searchIcon: {
      position: 'absolute',
      left: isTablet ? '12px' : '16px',
      color: colors.textLight,
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    searchInput: {
      width: '100%',
      height: '100%',
      padding: isTablet ? '0 0.75rem 0 2.5rem' : '0 1rem 0 3rem',
      border: 'none',
      fontSize: isTablet ? '0.85rem' : '0.9rem',
      outline: 'none',
      backgroundColor: 'transparent',
      color: colors.text,
      fontWeight: '500'
    },
    searchInputFocus: {
      backgroundColor: colors.background,
      boxShadow: `0 0 0 2px ${colors.primary}20`
    },
    searchButton: {
      backgroundColor: colors.primary,
      color: 'white',
      border: 'none',
      padding: isTablet ? '0 1.5rem' : '0 2rem',
      fontSize: isTablet ? '0.85rem' : '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      height: '100%',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      minWidth: isTablet ? '80px' : 'auto'
    },
    searchButtonHover: {
      backgroundColor: '#e6395f'
    },

    // Right section with user profile and cart
    rightSection: {
      display: isMobile ? 'none' : 'flex',
      alignItems: 'center',
      gap: isTablet ? '1.5rem' : '2rem',
      justifyContent: 'flex-end',
      flex: 1
    },

    // Action items
    actionItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textDecoration: 'none',
      color: colors.text,
      fontSize: '0.8rem',
      fontWeight: '600',
      transition: 'color 0.3s ease',
      padding: isTablet ? '0.25rem' : '0.5rem',
      minWidth: isTablet ? '50px' : '60px'
    },
    actionItemHover: {
      color: colors.primary
    },
    actionIcon: {
      marginBottom: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    actionText: {
      fontSize: isTablet ? '0.65rem' : '0.7rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      display: isTablet ? 'block' : 'block'
    },

    // Cart styles
    cartContainer: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textDecoration: 'none',
      color: colors.text,
      fontSize: '0.8rem',
      fontWeight: '600',
      transition: 'color 0.3s ease',
      padding: isTablet ? '0.25rem' : '0.5rem',
      minWidth: isTablet ? '50px' : '60px'
    },
    cartCount: {
      position: 'absolute',
      top: '2px',
      right: isTablet ? '6px' : '8px',
      backgroundColor: colors.primary,
      color: 'white',
      borderRadius: '50%',
      width: isTablet ? '16px' : '18px',
      height: isTablet ? '16px' : '18px',
      fontSize: isTablet ? '0.6rem' : '0.7rem',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: cartCount > 0 ? 'bounce 0.5s ease' : 'none'
    },

    // User profile styles
    userProfile: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      padding: isTablet ? '0.25rem' : '0.5rem',
      minWidth: isTablet ? '50px' : '60px',
      position: 'relative'
    },
    profileIconContainer: {
      width: isTablet ? '20px' : '24px',
      height: isTablet ? '20px' : '24px',
      borderRadius: '50%',
      backgroundColor: colors.textLight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '4px',
      color: 'white',
      fontSize: isTablet ? '0.7rem' : '0.8rem',
      fontWeight: '600'
    },

    // Dropdown menu
    dropdownMenu: {
      position: 'absolute',
      top: '100%',
      right: 0,
      backgroundColor: 'white',
      border: `1px solid ${colors.border}`,
      borderRadius: '4px',
      boxShadow: '0 4px 12px rgba(40, 44, 63, 0.1)',
      padding: '0.5rem 0',
      minWidth: isTablet ? '160px' : '180px',
      marginTop: '0.5rem',
      display: 'none',
      zIndex: 1001
    },
    dropdownMenuOpen: {
      display: 'block'
    },
    dropdownItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      width: '100%',
      padding: isTablet ? '0.6rem 0.8rem' : '0.75rem 1rem',
      textDecoration: 'none',
      color: colors.text,
      fontSize: isTablet ? '0.8rem' : '0.85rem',
      fontWeight: '500',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'left'
    },
    dropdownItemHover: {
      backgroundColor: colors.hover,
      color: colors.primary
    },
    dropdownIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: isTablet ? '14px' : '16px',
      color: colors.textLight
    },

    // Mobile menu button
    menuButton: {
      display: isMobile ? 'flex' : 'none',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '24px',
      height: '24px',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '4px',
      alignItems: 'center'
    },
    menuBar: {
      width: '100%',
      height: '2px',
      backgroundColor: colors.text,
      borderRadius: '2px',
      transition: 'all 0.3s ease'
    },
    menuBar1Open: {
      transform: 'rotate(45deg) translate(6px, 6px)'
    },
    menuBar2Open: {
      opacity: 0
    },
    menuBar3Open: {
      transform: 'rotate(-45deg) translate(6px, -6px)'
    },

    // Mobile menu styles
    mobileMenu: {
      position: 'fixed',
      top: isMobile ? '70px' : '80px',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'white',
      borderTop: `1px solid ${colors.border}`,
      boxShadow: '0 4px 12px rgba(40, 44, 63, 0.1)',
      padding: '1rem',
      display: 'none',
      flexDirection: 'column',
      gap: '0.5rem',
      zIndex: 1001,
      overflowY: 'auto'
    },
    mobileMenuOpen: {
      display: 'flex'
    },
    mobileSearchContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    mobileSearchInput: {
      padding: '0.75rem 1rem 0.75rem 3rem',
      border: `1px solid ${colors.border}`,
      borderRadius: '4px',
      fontSize: '1rem',
      position: 'relative',
      backgroundColor: colors.hover,
      width: '100%',
      boxSizing: 'border-box'
    },
    mobileSearchIcon: {
      position: 'absolute',
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: colors.textLight,
      zIndex: 1
    },
    mobileNavLink: {
      textDecoration: 'none',
      color: colors.text,
      fontWeight: '600',
      fontSize: '1rem',
      padding: '1rem 0',
      borderBottom: `1px solid ${colors.border}`,
      transition: 'color 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      textTransform: 'uppercase'
    },
    mobileIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '20px',
      color: colors.textLight
    },

    // Mobile action buttons container (shown only on mobile)
    mobileActions: {
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      gap: '1rem'
    },

    // Mobile cart icon (shown in header on mobile)
    mobileCartIcon: {
      position: 'relative',
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.5rem',
      textDecoration: 'none',
      color: colors.text
    }
  };

  // Event handlers
  const handleActionHover = (e) => {
    e.currentTarget.style.color = styles.actionItemHover.color;
  };

  const handleActionLeave = (e) => {
    e.currentTarget.style.color = styles.actionItem.color;
  };

  const handleDropdownItemHover = (e) => {
    e.target.style.backgroundColor = styles.dropdownItemHover.backgroundColor;
    e.target.style.color = styles.dropdownItemHover.color;
  };

  const handleDropdownItemLeave = (e) => {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.color = styles.dropdownItem.color;
  };

  const handleSearchButtonHover = (e) => {
    e.target.style.backgroundColor = styles.searchButtonHover.backgroundColor;
  };

  const handleSearchButtonLeave = (e) => {
    e.target.style.backgroundColor = styles.searchButton.backgroundColor;
  };

  // Get user initial for profile icon
  const getUserInitial = () => {
    if (user && user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return <Icons.User />;
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        {/* Left Section - Logo and Navigation Links */}
        <div style={styles.leftSection}>
          <Link 
            to="/" 
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              gap: isMobile ? '8px' : '10px'
            }}
            onClick={closeMenu}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src="e-cart.jpg" 
                alt="ECART Logo" 
                style={{
                  width: isMobile ? '50px' : isTablet ? '60px' : '70px',
                  height: isMobile ? '50px' : isTablet ? '60px' : '70px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1px solid #e0e0e0'
                }}
              />
            </div>
            <h1 style={{
              margin: 0,
              fontSize: isMobile ? '16px' : isTablet ? '17px' : '18px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              ECART
            </h1>
          </Link>

          {/* Navigation Links */}
          <ul style={styles.navLinks}>
            <li>
              <Link
                to="/category/mens-wear"
                style={{
                  ...styles.navLink,
                  ...(isActiveLink('/category/mens-wear') ? styles.navLinkActive : {})
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = styles.navLinkHover.color;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = isActiveLink('/category/mens-wear') 
                    ? styles.navLinkActive.color 
                    : styles.navLink.color;
                }}
              >
                
              </Link>
            </li>
            <li>
              
            </li>
          </ul>
        </div>

        {/* Center Section - Search Bar */}
        <div style={styles.centerSection}>
          <form style={styles.searchForm} onSubmit={handleSearch}>
            <div style={styles.searchInputContainer}>
              <span style={styles.searchIcon}>
                <Icons.Search />
              </span>
              <input
                type="text"
                placeholder="Search for brands, products and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                style={{
                  ...styles.searchInput,
                  ...(isSearchFocused ? styles.searchInputFocus : {})
                }}
              />
            </div>
            
            <button
              type="submit"
              style={styles.searchButton}
              onMouseEnter={handleSearchButtonHover}
              onMouseLeave={handleSearchButtonLeave}
            >
              Search
            </button>
          </form>
        </div>

        {/* Right Section - Action Items */}
        <div style={styles.rightSection}>
          {/* Profile */}
          <div 
            style={styles.userProfile}
            onClick={handleProfileClick}
          >
            <div style={styles.profileIconContainer}>
              {getUserInitial()}
            </div>
            <span style={styles.actionText}>Profile</span>
            
            {/* Dropdown Menu */}
            <div style={{
              ...styles.dropdownMenu,
              ...(isDropdownOpen ? styles.dropdownMenuOpen : {})
            }}>
              <Link
                to="/profile"
                style={styles.dropdownItem}
                onMouseEnter={handleDropdownItemHover}
                onMouseLeave={handleDropdownItemLeave}
                onClick={() => setIsDropdownOpen(false)}
              >
                <span style={styles.dropdownIcon}><Icons.Profile /></span>
                Profile
              </Link>
              <Link
                to="/orders"
                style={styles.dropdownItem}
                onMouseEnter={handleDropdownItemHover}
                onMouseLeave={handleDropdownItemLeave}
                onClick={() => setIsDropdownOpen(false)}
              >
                <span style={styles.dropdownIcon}><Icons.Orders /></span>
                Orders
              </Link>
              <Link
                to="/wishlist"
                style={styles.dropdownItem}
                onMouseEnter={handleDropdownItemHover}
                onMouseLeave={handleDropdownItemLeave}
                onClick={() => setIsDropdownOpen(false)}
              >
                <span style={styles.dropdownIcon}><Icons.Wishlist /></span>
                Wishlist
              </Link>
            </div>
          </div>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            style={styles.actionItem}
            onMouseEnter={handleActionHover}
            onMouseLeave={handleActionLeave}
          >
            <div style={styles.actionIcon}>
              <Icons.Wishlist />
            </div>
            <span style={styles.actionText}>Wishlist</span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            style={styles.cartContainer}
            onMouseEnter={handleActionHover}
            onMouseLeave={handleActionLeave}
          >
            <div style={styles.actionIcon}>
              <Icons.Cart />
              {cartCount > 0 && (
                <span style={styles.cartCount}>{cartCount}</span>
              )}
            </div>
            <span style={styles.actionText}>Cart</span>
          </Link>
        </div>

        {/* Mobile Action Buttons */}
        <div style={styles.mobileActions}>
          {/* Mobile Cart Icon */}
          <Link
            to="/cart"
            style={styles.mobileCartIcon}
          >
            <Icons.Cart />
            {cartCount > 0 && (
              <span style={{
                ...styles.cartCount,
                top: '0px',
                right: '0px'
              }}>{cartCount}</span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button 
            style={styles.menuButton}
            onClick={toggleMenu}
          >
            <span style={{
              ...styles.menuBar,
              ...(isMenuOpen ? styles.menuBar1Open : {})
            }}></span>
            <span style={{
              ...styles.menuBar,
              ...(isMenuOpen ? styles.menuBar2Open : {})
            }}></span>
            <span style={{
              ...styles.menuBar,
              ...(isMenuOpen ? styles.menuBar3Open : {})
            }}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div style={{
          ...styles.mobileMenu,
          ...(isMenuOpen ? styles.mobileMenuOpen : {})
        }}>
          {/* Mobile Search */}
          <div style={styles.mobileSearchContainer}>
            <div style={{position: 'relative', width: '100%'}}>
              <span style={styles.mobileSearchIcon}>
                <Icons.Search />
              </span>
              <input
                type="text"
                placeholder="Search for brands, products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.mobileSearchInput}
              />
            </div>
            <button
              type="button"
              style={{
                ...styles.searchButton,
                height: '44px',
                fontSize: '1rem'
              }}
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          
          <Link
            to="/wishlist"
            style={styles.mobileNavLink}
            onClick={closeMenu}
          >
            <span style={styles.mobileIcon}><Icons.Wishlist /></span>
            Wishlist
          </Link>
          
          <Link
            to="/cart"
            style={styles.mobileNavLink}
            onClick={closeMenu}
          >
            <span style={styles.mobileIcon}><Icons.Cart /></span>
            Cart {cartCount > 0 && `(${cartCount})`}
          </Link>

          <Link
            to="/profile"
            style={styles.mobileNavLink}
            onClick={closeMenu}
          >
            <span style={styles.mobileIcon}><Icons.Profile /></span>
            Profile
          </Link>
          
          <Link
            to="/orders"
            style={styles.mobileNavLink}
            onClick={closeMenu}
          >
            <span style={styles.mobileIcon}><Icons.Orders /></span>
            Orders
          </Link>

          {/* Additional mobile-only links */}
          <Link
            to="/category/mens-wear"
            style={styles.mobileNavLink}
            onClick={closeMenu}
          >
            <span style={styles.mobileIcon}><Icons.User /></span>
            Men's Wear
          </Link>

          <Link
            to="/category/womens-wear"
            style={styles.mobileNavLink}
            onClick={closeMenu}
          >
            <span style={styles.mobileIcon}><Icons.User /></span>
            Women's Wear
          </Link>
        </div>
      </nav>

      {/* Animation styles */}
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 60%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-5px);
            }
            80% {
              transform: translateY(-2px);
            }
          }

          /* Tablet specific adjustments */
          @media (max-width: 1024px) and (min-width: 769px) {
            /* Additional tablet optimizations */
          }

          /* Mobile specific adjustments */
          @media (max-width: 768px) {
            /* Additional mobile optimizations */
          }

          /* Small mobile devices */
          @media (max-width: 480px) {
            /* Small screen optimizations */
          }
        `}
      </style>
    </header>
  );
}

export default Header;