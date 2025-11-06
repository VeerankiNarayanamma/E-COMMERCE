import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaTshirt,
  FaFemale,
  FaClock,
  FaShoePrints,
  FaLaptop,
  FaMobileAlt,
  FaTv,
  FaHome,
  FaTimes,
  FaBars,
} from 'react-icons/fa';

const Sidebar = ({ handleLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
      
      // Auto-collapse sidebar on tablet for better space utilization
      if (width > 768 && width <= 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
      
      // Auto-close sidebar on mobile when resizing to larger screens
      if (width > 768) {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const colors = {
    primary: '#e6395f',
    secondary: '#64748b',
    background: '#f8fafc',
    sidebarBg: '#ffffff',
    border: '#e2e8f0',
    text: '#1e293b',
    textLight: '#64748b',
    hover: '#f1f5f9',
    active: '#dbeafe',
    overlay: 'rgba(0, 0, 0, 0.5)',
  };

  const categories = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/category/mens-wear', label: "Men's Wear", icon: <FaTshirt /> },
    { path: '/category/womens-wear', label: "Women's Wear", icon: <FaFemale /> },
    { path: '/category/watches', label: 'Watches', icon: <FaClock /> },
    { path: '/category/footwear', label: 'Footwear', icon: <FaShoePrints /> },
    { path: '/category/electronics', label: 'Electronics', icon: <FaTv /> },
    { path: '/category/mobiles', label: 'Mobiles', icon: <FaMobileAlt /> },
    { path: '/category/laptops', label: 'Laptops', icon: <FaLaptop /> },
  ];

  // Default logout function if handleLogout is not provided
  const defaultLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Use the provided handleLogout or the default one
  const logoutHandler = handleLogout || defaultLogout;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Close sidebar on overlay click
  const handleOverlayClick = () => {
    setIsSidebarOpen(false);
  };

  // Logout Button Component
  const LogoutButton = ({ onLogout, isCollapsed }) => {
    const Icons = {
      Logout: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16,17 21,12 16,7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      )
    };

    const styles = {
      logoutButton: {
        width: '100%',
        backgroundColor: '#e6395f',
        border: 'none',
        padding: isCollapsed ? '12px' : '12px 16px',
        color: 'white',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: isCollapsed ? '12px' : '14px',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'flex-start',
        gap: '8px',
        boxShadow: '0 2px 8px rgba(229, 62, 62, 0.2)',
        minHeight: '44px',
      },
      logoutButtonHover: {
        backgroundColor: '#c53030',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(229, 62, 62, 0.3)',
      }
    };

    return (
      <button 
        style={styles.logoutButton}
        onClick={onLogout}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = styles.logoutButtonHover.backgroundColor;
          e.target.style.transform = styles.logoutButtonHover.transform;
          e.target.style.boxShadow = styles.logoutButtonHover.boxShadow;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = styles.logoutButton.backgroundColor;
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 2px 8px rgba(229, 62, 62, 0.2)';
        }}
        onMouseDown={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 1px 4px rgba(229, 62, 62, 0.2)';
        }}
        onMouseUp={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 12px rgba(229, 62, 62, 0.3)';
        }}
      >
        <Icons.Logout />
        {!isCollapsed && <span>Logout</span>}
      </button>
    );
  };

  // Calculate sidebar width based on device and state
  const getSidebarWidth = () => {
    if (isMobile) {
      return isSidebarOpen ? '280px' : '0px';
    }
    if (isTablet) {
      return isCollapsed ? '80px' : '280px';
    }
    return isCollapsed ? '80px' : '280px';
  };

  // Sidebar styles
  const sidebarStyles = {
    // Mobile Hamburger Button
    mobileMenuButton: {
      position: 'fixed',
      top: isMobile ? '20px' : '30px',
      left: isMobile ? '20px' : '30px',
      zIndex: 1100,
      backgroundColor: colors.primary,
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      width: '44px',
      height: '44px',
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      fontSize: '18px',
    },

    // Tablet Toggle Button
    tabletToggleButton: {
      position: 'absolute',
      top: '20px',
      right: '-12px',
      backgroundColor: colors.primary,
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '24px',
      height: '24px',
      display: isTablet || (!isMobile && !isTablet) ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      fontSize: '12px',
      zIndex: 1001,
    },

    // Overlay for mobile
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.overlay,
      zIndex: 999,
      display: isMobile && isSidebarOpen ? 'block' : 'none',
    },

    // Main sidebar container
    container: {
      width: getSidebarWidth(),
      height: '100vh',
      backgroundColor: colors.sidebarBg,
      borderRight: `1px solid ${colors.border}`,
      boxShadow: '2px 0 12px rgba(0, 0, 0, 0.08)',
      position: isMobile ? 'fixed' : 'fixed',
      top: 0,
      left: 0,
      overflowY: 'auto',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      transform: isMobile && !isSidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
    },

    // Header section
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: isCollapsed && !isMobile ? 'center' : 'space-between',
      padding: isCollapsed && !isMobile ? '24px 12px' : '24px 20px',
      borderBottom: `1px solid ${colors.border}`,
      flexShrink: 0,
      minHeight: '80px',
      position: 'relative',
    },

    // Brand name
    brandName: {
      fontSize: isCollapsed && !isMobile ? '16px' : '24px',
      fontWeight: '700',
      color: colors.primary,
      margin: 0,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      display: isCollapsed && !isMobile ? 'none' : 'block',
    },

    // Collapsed brand name (small)
    brandNameCollapsed: {
      fontSize: '14px',
      fontWeight: '700',
      color: colors.primary,
      margin: 0,
      textAlign: 'center',
      display: isCollapsed && !isMobile ? 'block' : 'none',
    },

    // Close button for mobile
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: colors.textLight,
      cursor: 'pointer',
      fontSize: '18px',
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      borderRadius: '4px',
      transition: 'all 0.3s ease',
    },

    // Category links container
    categoriesContainer: {
      flex: 1,
      overflowY: 'auto',
      padding: isCollapsed && !isMobile ? '16px 8px' : '16px 0',
    },

    // Category list
    categoryList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },

    // Category item
    categoryItem: {
      margin: isCollapsed && !isMobile ? '4px 4px' : '4px 12px',
      borderRadius: '8px',
      transition: '0.2s ease',
    },

    // Category link
    categoryLink: (isActive, isCollapsed) => ({
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: isActive ? colors.primary : colors.text,
      fontWeight: isActive ? '600' : '500',
      fontSize: isCollapsed && !isMobile ? '12px' : '14px',
      padding: isCollapsed && !isMobile ? '12px 8px' : '12px 16px',
      borderRadius: '8px',
      background: isActive ? colors.active : 'transparent',
      border: isActive ? `1px solid ${colors.primary}20` : '1px solid transparent',
      justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start',
      minHeight: '44px',
      flexDirection: isCollapsed && !isMobile ? 'column' : 'row',
      gap: isCollapsed && !isMobile ? '4px' : '12px',
      textAlign: isCollapsed && !isMobile ? 'center' : 'left',
    }),

    // Category icon
    categoryIcon: (isActive, isCollapsed) => ({
      fontSize: isCollapsed && !isMobile ? '16px' : '18px',
      marginRight: isCollapsed && !isMobile ? '0' : '12px',
      color: isActive ? colors.primary : colors.textLight,
      minWidth: isCollapsed && !isMobile ? 'auto' : '24px',
      display: 'flex',
      justifyContent: 'center',
    }),

    // Category label
    categoryLabel: (isCollapsed) => ({
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      fontSize: isCollapsed && !isMobile ? '10px' : '14px',
      display: isCollapsed && !isMobile ? 'block' : 'block',
    }),

    // Footer section
    footer: {
      padding: isCollapsed && !isMobile ? '20px 12px' : '20px',
      borderTop: `1px solid ${colors.border}`,
      flexShrink: 0,
    },

    // Mobile info text
    mobileInfo: {
      marginTop: '12px',
      padding: isCollapsed && !isMobile ? '8px 6px' : '8px 12px',
      backgroundColor: colors.hover,
      borderRadius: '6px',
      fontSize: isCollapsed && !isMobile ? '10px' : '12px',
      color: colors.textLight,
      textAlign: 'center',
      display: isCollapsed && !isMobile ? 'none' : 'block',
    },
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button 
          style={sidebarStyles.mobileMenuButton}
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
      )}

      {/* Overlay for Mobile */}
      {isMobile && (
        <div 
          style={sidebarStyles.overlay}
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <div style={sidebarStyles.container}>
        {/* Header */}
        <div style={sidebarStyles.header}>
          {isCollapsed && !isMobile ? (
            <h2 style={sidebarStyles.brandNameCollapsed}>J</h2>
          ) : (
            <h2 style={sidebarStyles.brandName}>JAVI</h2>
          )}
          
          {/* Tablet/Laptop Toggle Button */}
          {!isMobile && (
            <button 
              style={sidebarStyles.tabletToggleButton}
              onClick={toggleCollapse}
            >
              {isCollapsed ? <FaBars /> : <FaTimes />}
            </button>
          )}
          
          {/* Mobile Close Button */}
          {isMobile && (
            <button 
              style={sidebarStyles.closeButton}
              onClick={toggleSidebar}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = colors.hover;
                e.target.style.color = colors.primary;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = colors.textLight;
              }}
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Category Links */}
        <div style={sidebarStyles.categoriesContainer}>
          <ul style={sidebarStyles.categoryList}>
            {categories.map((cat) => {
              const isActive = location.pathname === cat.path;
              return (
                <li
                  key={cat.path}
                  style={sidebarStyles.categoryItem}
                >
                  <Link
                    to={cat.path}
                    style={sidebarStyles.categoryLink(isActive, isCollapsed)}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = colors.hover;
                        e.target.style.color = colors.primary;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = colors.text;
                      }
                    }}
                  >
                    <span style={sidebarStyles.categoryIcon(isActive, isCollapsed)}>
                      {cat.icon}
                    </span>
                    <span style={sidebarStyles.categoryLabel(isCollapsed)}>
                      {cat.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Logout Button */}
        <div style={sidebarStyles.footer}>
          <LogoutButton onLogout={logoutHandler} isCollapsed={isCollapsed && !isMobile} />
          
          {/* Mobile-friendly logout info */}
          <div style={sidebarStyles.mobileInfo}>
            Secure logout from your account
          </div>
        </div>
      </div>

      {/* Global styles for responsive behavior */}
      <style>
        {`
          /* Smooth transitions for all interactive elements */
          * {
            transition: color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
          }

          /* Scrollbar styling */
          ::-webkit-scrollbar {
            width: 6px;
          }

          ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
          }

          ::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 3px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
          }

          /* Mobile-specific optimizations */
          @media (max-width: 768px) {
            /* Improve touch targets */
            button, a {
              min-height: 44px;
              min-width: 44px;
            }
          }

          /* Tablet-specific optimizations */
          @media (min-width: 769px) and (max-width: 1024px) {
            /* Optimize for tablet touch */
            .sidebar-item {
              padding: 10px 12px;
            }
          }

          /* Large screen optimizations */
          @media (min-width: 1025px) {
            /* Hover effects only for non-touch devices */
            @media (hover: hover) {
              .sidebar-item:hover {
                background-color: ${colors.hover};
                transform: translateX(4px);
              }
            }
          }

          /* Reduced motion for accessibility */
          @media (prefers-reduced-motion: reduce) {
            * {
              transition: none !important;
              animation: none !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default Sidebar;