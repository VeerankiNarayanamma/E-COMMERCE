import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductCard from '../components/ProductCard';

function Home({ addToCart, addToWishlist, removeFromWishlist, isInWishlist }) {
  // Slide images for background banner
  const slides = [
    {
      image: 'https://www.aachho.com/cdn/shop/files/Shaadi-S-Sale-1_1944x.jpg?v=1761798976',
  
    },
    {
      image: 'https://www.aachho.com/cdn/shop/files/Shaadi-S-Sale-3_118e1505-a1c0-4b16-8cc2-e781d140a367_1944x.jpg?v=1761799048',
   
    },
    {
      image: 'https://www.aachho.com/cdn/shop/files/Shaadi-S-Sale-2_1944x.jpg?v=1761798991',
     
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Myntra color scheme
  const colors = {
    primary: '#ff3f6c', // Myntra pink
    secondary: '#282c3f', // Myntra dark
    background: '#ffffff',
    text: '#282c3f',
    textLight: '#696e79',
    border: '#d4d5d9',
    hover: '#f5f5f6'
  };

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Auto slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const featuredProducts = [
    {
      id: 1,
      name: "Men's Formal Shirt",
      description: "Premium cotton formal shirt for men with perfect fit and comfort.",
      detailedDescription: "This premium formal shirt is crafted from 100% high-quality cotton, offering exceptional comfort and durability. Features include reinforced stitching, classic collar design, and perfect fit for all body types.",
      price: 1499,
      originalPrice: 1999,
      discount: 25,
      image: "https://images.pexels.com/photos/12437056/pexels-photo-12437056.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "mens-wear",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["White", "Light Blue", "Navy Blue"],
      features: ["100% Cotton", "Premium Quality", "Easy Care", "Comfort Fit"],
      inStock: true,
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: "Women's Ethnic Dress",
      description: "Beautiful ethnic dress for women with elegant embroidery",
      detailedDescription: "Elegant ethnic dress featuring intricate embroidery and traditional patterns. Made from premium fabric that ensures comfort and style.",
      price: 2599,
      originalPrice: 3499,
      discount: 26,
      image: "https://www.aachho.com/cdn/shop/files/2_b80dcd0d-643d-4c30-9175-eed4b086b4cb_540x.jpg?v=1728651327",
      category: "womens-wear",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Red", "Blue", "Green", "Pink"],
      features: ["Hand Embroidery", "Premium Fabric", "Comfortable Fit"],
      inStock: true,
      rating: 4.3,
      reviews: 89
    },
    {
      id: 3,
      name: "Smart Watch",
      description: "Feature-rich smartwatch with health monitoring",
      detailedDescription: "Advanced smartwatch with comprehensive health monitoring features including heart rate tracking, sleep analysis, and activity tracking.",
      price: 3999,
      originalPrice: 4999,
      discount: 20,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "watches",
      sizes: ["Regular", "Large"],
      colors: ["Black", "Silver", "Rose Gold"],
      features: ["Heart Rate Monitor", "Sleep Tracking", "GPS", "Water Resistant"],
      inStock: true,
      rating: 4.7,
      reviews: 256
    },
    {
      id: 4,
      name: "Running Shoes",
      description: "Comfortable running shoes with advanced cushioning",
      detailedDescription: "High-performance running shoes designed with advanced cushioning technology for maximum comfort and shock absorption.",
      price: 2999,
      originalPrice: 3999,
      discount: 25,
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "footwear",
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["Black", "White", "Blue", "Red"],
      features: ["Advanced Cushioning", "Breathable Mesh", "Durable Sole"],
      inStock: true,
      rating: 4.4,
      reviews: 167
    },
    {
      id: 5,
      name: "Women's Dress",
      description: "Elegant and comfortable women's dress",
      detailedDescription: "Beautiful women's dress that combines elegance with comfort. Perfect for parties, dates, and special occasions.",
      price: 1499,
      originalPrice: 1999,
      discount: 25,
      image: "https://www.aachho.com/cdn/shop/products/1_8e541b52-3165-456d-8f99-618847b56dd2_540x.jpg?v=1684506256",
      category: "womens-wear",
      sizes: ["XS", "S", "M", "L"],
      colors: ["Black", "Navy", "Red", "Pink"],
      features: ["Flowing Fabric", "Comfortable Fit", "Elegant Design"],
      inStock: true,
      rating: 4.2,
      reviews: 94
    },
    {
      id: 6,
      name: "Crop Top",
      description: "Comfortable and stylish crop top",
      detailedDescription: "Trendy crop top perfect for casual outings and summer fashion. Made from soft, breathable fabric.",
      price: 799,
      originalPrice: 999,
      discount: 20,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6o9UPHVjVn3zQoHM7FiMrVOKBChQ6_uRH6g&s",
      category: "womens-wear",
      sizes: ["XS", "S", "M", "L"],
      colors: ["White", "Black", "Pink", "Yellow"],
      features: ["Soft Fabric", "Breathable", "Comfortable Fit"],
      inStock: true,
      rating: 4.1,
      reviews: 73
    },
    {
      id: 7,
      name: "Wireless Earbuds",
      description: "Premium wireless earbuds with noise cancellation",
      detailedDescription: "Experience crystal-clear audio with these premium wireless earbuds. Features active noise cancellation and long battery life.",
      price: 2499,
      originalPrice: 3499,
      discount: 29,
      image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "electronics",
      sizes: ["One Size"],
      colors: ["Black", "White", "Blue"],
      features: ["Noise Cancellation", "Long Battery", "Wireless Charging"],
      inStock: true,
      rating: 4.6,
      reviews: 189
    },
    {
      id: 8,
      name: "Gaming Laptop",
      description: "High-performance gaming laptop",
      detailedDescription: "Powerful gaming laptop equipped with latest processor and advanced graphics card. Perfect for gaming enthusiasts.",
      price: 89999,
      originalPrice: 109999,
      discount: 18,
      image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
      category: "electronics",
      sizes: ["15.6 inch", "17.3 inch"],
      colors: ["Black", "Gray"],
      features: ["Advanced Graphics", "High Performance", "Gaming Optimized"],
      inStock: true,
      rating: 4.8,
      reviews: 312
    }
  ];

  const categories = [
    {
      name: "Men's Wear",
      path: "/category/mens-wear",
      description: "Fashionable clothing for men",
      image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600",
      count: "125+ Products",
    },
    {
      name: "Women's Wear",
      path: "/category/womens-wear",
      description: "Trendy outfits for women",
      image: "https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=600",
      count: "180+ Products",
    },
    {
      name: "Watches",
      path: "/category/watches",
      description: "Elegant timepieces",
      image: "https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&w=600",
      count: "75+ Products",
    },
    {
      name: "Footwear",
      path: "/category/footwear",
      description: "Comfortable shoes for all occasions",
      image: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
      count: "90+ Products",
    },
    {
      name: "Electronics",
      path: "/category/electronics",
      description: "Latest gadgets & devices",
      image: "https://m.media-amazon.com/images/I/61FcXMhjr8L._AC_UY327_FMwebp_QL65_.jpg",
      count: "90+ Products",
    },
    {
      name: "Laptops",
      path: "/category/laptops",
      description: "High-performance laptops",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUywJPZOdD_NfnkXNcCOF7ZBIsczdg6UzLjQ&s",
      count: "90+ Products",
    },
  ];

  // Handle product click to open modal
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes?.[0] || '');
    setSelectedColor(product.colors?.[0] || '');
    setQuantity(1);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
    setSelectedSize('');
    setSelectedColor('');
    setQuantity(1);
  };

  // Handle quantity increment
  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  // Handle quantity decrement
  const handleDecrement = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  // Handle add to cart from modal
  const handleAddToCartFromModal = () => {
    if (selectedProduct) {
      const productToAdd = {
        ...selectedProduct,
        selectedSize,
        selectedColor,
        quantity
      };
      addToCart(productToAdd);
      toast.success(`${quantity} ${selectedProduct.name} added to cart successfully!`);
      handleCloseModal();
    }
  };
  const handleAddToWishlistFromModal = () => {
    if (selectedProduct) {
      const productToAdd = {
        ...selectedProduct,
        selectedSize,
        selectedColor,
        quantity
      };
      if (isInWishlist(selectedProduct.id)) {
        removeFromWishlist(selectedProduct.id);
        toast.info(`${selectedProduct.name} removed from wishlist!`);
      } else {
        addToWishlist(productToAdd);
        toast.success(`${selectedProduct.name} added to wishlist successfully!`);
      }
    }
  };
  // Get responsive grid columns
  const getGridColumns = () => {
    if (isMobile) return 'repeat(2, 1fr)';
    if (isTablet) return 'repeat(3, 1fr)';
    return 'repeat(4, 1fr)';
  };

  // Get category grid columns
  const getCategoryGridColumns = () => {
    if (isMobile) return 'repeat(2, 1fr)';
    if (isTablet) return 'repeat(2, 1fr)';
    return 'repeat(3, 1fr)';
  };

  // 🎨 Styles
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: "'Poppins', sans-serif",
      margin: 0,
      padding: 0,
      width: '100%',
      overflowX: 'hidden',
    },

    // 🔥 Hero Section - Full Screen
    hero: {
      position: 'relative',
      width: '100vw',
      height: '100vh',
      backgroundImage: `url(${slides[currentSlide].image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center',
      transition: 'background-image 1s ease-in-out',
      padding: isMobile ? '1rem' : '2rem',
      margin: 0,
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '',
    },
    heroContent: {
      zIndex: 2,
      maxWidth: isMobile ? '90%' : '800px',
      padding: isMobile ? '1rem' : '2rem',
    },
    heroTitle: {
      fontSize: isMobile ? '2.5rem' : isTablet ? '3.5rem' : '4.5rem',
      fontWeight: '700',
      marginBottom: '1rem',
      textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
      lineHeight: 1.2,
    },
    heroSubtitle: {
      fontSize: isMobile ? '1.1rem' : isTablet ? '1.3rem' : '1.5rem',
      fontWeight: '400',
      textShadow: '1px 1px 4px rgba(0,0,0,0.7)',
      marginBottom: '2rem',
    },
    dotContainer: {
      position: 'absolute',
      bottom: '30px',
      display: 'flex',
      gap: '12px',
      zIndex: 2,
    },
    dot: (isActive) => ({
      width: isActive ? '16px' : '12px',
      height: '12px',
      borderRadius: '6px',
      backgroundColor: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    }),

    // 📦 Sections Common
    section: {
      padding: isMobile ? '2rem 1rem' : isTablet ? '3rem 1.5rem' : '4rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box',
    },
    sectionTitle: {
      textAlign: 'center',
      fontSize: isMobile ? '1.8rem' : isTablet ? '2.2rem' : '2.5rem',
      fontWeight: '700',
      marginBottom: isMobile ? '2rem' : '3rem',
      color: colors.primary,
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },

    // 🛍️ Categories
    categoriesGrid: {
      display: 'grid',
      gridTemplateColumns: getCategoryGridColumns(),
      gap: isMobile ? '1rem' : isTablet ? '1.5rem' : '2rem',
      width: '100%',
    },
    categoryCard: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: isMobile ? '1.5rem 1rem' : isTablet ? '1.5rem' : '2rem',
      textAlign: 'center',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      textDecoration: 'none',
      color: '#2d3748',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '1px solid rgba(255,255,255,0.2)',
      backdropFilter: 'blur(10px)',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      boxSizing: 'border-box',
    },
    categoryCardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 40px rgba(255, 63, 108, 0.15)',
    },
    categoryImage: {
      width: isMobile ? '70px' : isTablet ? '80px' : '100px',
      height: isMobile ? '70px' : isTablet ? '80px' : '100px',
      borderRadius: '50%',
      margin: '0 auto 1rem',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: `3px solid ${colors.primary}`,
      boxShadow: `0 4px 12px ${colors.primary}30`,
    },
    categoryName: {
      fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.3rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: colors.text,
    },
    categoryDescription: {
      fontSize: isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem',
      color: colors.textLight,
      marginBottom: '1rem',
      lineHeight: 1.5,
    },
    categoryCount: {
      color: colors.primary,
      fontWeight: '700',
      fontSize: isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem',
    },

    // 🛒 Products Grid
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: getGridColumns(),
      gap: isMobile ? '1rem' : isTablet ? '1.25rem' : '1.5rem',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
    },

    // 📱 Modal Styles
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: isMobile ? '0.5rem' : '1rem',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: isMobile ? '1.5rem' : '2rem',
      maxWidth: isMobile ? '95vw' : isTablet ? '90vw' : '900px',
      width: '100%',
      maxHeight: isMobile ? '90vh' : '85vh',
      overflowY: 'auto',
      position: 'relative',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    },
    closeButton: {
      position: 'absolute',
      top: isMobile ? '0.5rem' : '1rem',
      right: isMobile ? '0.5rem' : '1rem',
      background: 'none',
      border: 'none',
      fontSize: isMobile ? '1.5rem' : '2rem',
      cursor: 'pointer',
      color: '#718096',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
    },
    closeButtonHover: {
      backgroundColor: '#f7fafc',
      color: '#e53e3e',
    },
    modalGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '1.5rem' : '2rem',
      alignItems: 'start',
    },
    productImage: {
      width: '100%',
      borderRadius: '12px',
      marginBottom: '1rem',
      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    },
    priceSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem',
      flexWrap: 'wrap',
    },
    currentPrice: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      fontWeight: 'bold',
      color: '#2d3748',
    },
    originalPrice: {
      fontSize: isMobile ? '1rem' : '1.2rem',
      color: '#718096',
      textDecoration: 'line-through',
    },
    discountBadge: {
      backgroundColor: colors.primary,
      color: 'white',
      padding: '0.4rem 0.8rem',
      borderRadius: '20px',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      fontWeight: '700',
    },
    optionSection: {
      marginBottom: isMobile ? '1rem' : '1.5rem',
    },
    optionTitle: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#2d3748',
    },
    sizeOptions: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
    },
    sizeOption: (isSelected) => ({
      padding: isMobile ? '0.6rem 1rem' : '0.8rem 1.2rem',
      border: `2px solid ${isSelected ? colors.primary : '#e2e8f0'}`,
      borderRadius: '8px',
      backgroundColor: isSelected ? colors.primary : 'white',
      color: isSelected ? 'white' : '#2d3748',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: isMobile ? '0.9rem' : '1rem',
      fontWeight: '500',
    }),
    colorOptions: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
    },
    colorOption: (isSelected, color) => ({
      width: isMobile ? '35px' : '40px',
      height: isMobile ? '35px' : '40px',
      borderRadius: '50%',
      border: `3px solid ${isSelected ? colors.primary : '#e2e8f0'}`,
      cursor: 'pointer',
      backgroundColor: color.toLowerCase(),
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }),
    quantitySection: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: isMobile ? '1rem' : '1.5rem',
    },
    quantityButton: {
      width: isMobile ? '35px' : '40px',
      height: isMobile ? '35px' : '40px',
      borderRadius: '50%',
      border: `2px solid ${colors.primary}`,
      backgroundColor: 'white',
      color: colors.primary,
      fontSize: isMobile ? '1rem' : '1.2rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
    },
    quantityButtonHover: {
      backgroundColor: colors.primary,
      color: 'white'
    },
    quantityDisplay: {
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      fontWeight: '600',
      minWidth: '50px',
      textAlign: 'center',
    },
    addToCartButton: {
      width: '100%',
      padding: isMobile ? '1rem' : '1.2rem',
      backgroundColor: colors.primary,
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: `10 40px 40px ${colors.primary}20`,
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    addToCartButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: `0 8px 25px ${colors.primary}60`,
      backgroundColor: '#e6395f'
    },
    featuresList: {
      listStyle: 'none',
      padding: 0,
      margin: '1rem 0',
    },
    featureItem: {
      padding: '0.5rem 0',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      fontSize: isMobile ? '0.9rem' : '1rem',
    },
    ratingSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem',
      flexWrap: 'wrap',
    },
    starRating: {
      color: '#f6ad55',
      fontSize: isMobile ? '1rem' : '1.1rem',
    },
  };

  return (
    <div style={styles.container}>
      {/* 🔥 Hero Section - Full Screen */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>{slides[currentSlide].title}</h1>
          <p style={styles.heroSubtitle}>{slides[currentSlide].subtitle}</p>
        </div>
        <div style={styles.dotContainer}>
          {slides.map((_, index) => (
            <div
              key={index}
              style={styles.dot(index === currentSlide)}
              onClick={() => setCurrentSlide(index)}
            ></div>
          ))}
        </div>
      </section>

      {/* 🛍️ Categories Section */}
      <section style={{ ...styles.section, backgroundColor: '#f8fafc' }}>
        <h2 style={styles.sectionTitle}>Shop by Category</h2>
        <div style={styles.categoriesGrid}>
          {categories.map((cat, i) => (
            <Link 
              key={i} 
              to={cat.path} 
              style={styles.categoryCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = styles.categoryCardHover.transform;
                e.currentTarget.style.boxShadow = styles.categoryCardHover.boxShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = styles.categoryCard.boxShadow;
              }}
            >
              <div
                style={{
                  ...styles.categoryImage,
                  backgroundImage: `url(${cat.image})`,
                }}
              ></div>
              <h3 style={styles.categoryName}>{cat.name}</h3>
              <p style={styles.categoryDescription}>{cat.description}</p>
              <span style={styles.categoryCount}>{cat.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 🛒 Featured Products Section */}
      <section style={{ ...styles.section, backgroundColor: '#ffffff' }}>
        <h2 style={styles.sectionTitle}>Featured Products</h2>
        <div style={styles.productsGrid}>
          {featuredProducts.map((p) => (
            <div key={p.id} onClick={() => handleProductClick(p)} style={{ cursor: 'pointer' }}>
              <ProductCard product={p} addToCart={addToCart} />
            </div>
          ))}
        </div>
      </section>

      {/* 📱 Product Details Modal */}
      {selectedProduct && (
        <div style={styles.modalOverlay} onClick={handleCloseModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              style={styles.closeButton}
              onClick={handleCloseModal}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = styles.closeButtonHover.backgroundColor;
                e.target.style.color = styles.closeButtonHover.color;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = styles.closeButton.color;
              }}
            >
              ×
            </button>
            
            <div style={styles.modalGrid}>
              {/* Product Image */}
              <div>
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  style={styles.productImage}
                />
                <div style={styles.ratingSection}>
                  <span style={styles.starRating}>
                    {'★'.repeat(Math.floor(selectedProduct.rating))}
                    {'☆'.repeat(5 - Math.floor(selectedProduct.rating))}
                  </span>
                  <span>({selectedProduct.rating})</span>
                  <span style={{ color: '#718096' }}>{selectedProduct.reviews} reviews</span>
                </div>
              </div>

              {/* Product Details */}
              <div>
                <h2 style={{ 
                  fontSize: isMobile ? '1.5rem' : '1.8rem', 
                  marginBottom: '1rem', 
                  color: '#2d3748',
                  lineHeight: 1.3 
                }}>
                  {selectedProduct.name}
                </h2>
                
                <div style={styles.priceSection}>
                  <span style={styles.currentPrice}>₹{selectedProduct.price}</span>
                  {selectedProduct.originalPrice && (
                    <span style={styles.originalPrice}>₹{selectedProduct.originalPrice}</span>
                  )}
                  {selectedProduct.discount && (
                    <span style={styles.discountBadge}>{selectedProduct.discount}% OFF</span>
                  )}
                </div>

                <p style={{ 
                  color: '#718096', 
                  marginBottom: '1.5rem', 
                  lineHeight: '1.6',
                  fontSize: isMobile ? '0.9rem' : '1rem'
                }}>
                  {selectedProduct.detailedDescription}
                </p>

                {/* Size Selection */}
                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                  <div style={styles.optionSection}>
                    <div style={styles.optionTitle}>Size</div>
                    <div style={styles.sizeOptions}>
                      {selectedProduct.sizes.map((size) => (
                        <div
                          key={size}
                          style={styles.sizeOption(selectedSize === size)}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Selection */}
                {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                  <div style={styles.optionSection}>
                    <div style={styles.optionTitle}>Color</div>
                    <div style={styles.colorOptions}>
                      {selectedProduct.colors.map((color) => (
                        <div
                          key={color}
                          style={styles.colorOption(selectedColor === color, color)}
                          onClick={() => setSelectedColor(color)}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div style={styles.optionSection}>
                  <div style={styles.optionTitle}>Quantity</div>
                  <div style={styles.quantitySection}>
                    <button 
                      style={styles.quantityButton}
                      onClick={handleDecrement}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = styles.quantityButtonHover.backgroundColor;
                        e.target.style.color = styles.quantityButtonHover.color;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = styles.quantityButton.backgroundColor;
                        e.target.style.color = styles.quantityButton.color;
                      }}
                    >
                      -
                    </button>
                    <span style={styles.quantityDisplay}>{quantity}</span>
                    <button 
                      style={styles.quantityButton}
                      onClick={handleIncrement}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = styles.quantityButtonHover.backgroundColor;
                        e.target.style.color = styles.quantityButtonHover.color;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = styles.quantityButton.backgroundColor;
                        e.target.style.color = styles.quantityButton.color;
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Features */}
                {selectedProduct.features && (
                  <div style={styles.optionSection}>
                    <div style={styles.optionTitle}>Features</div>
                    <ul style={styles.featuresList}>
                      {selectedProduct.features.map((feature, index) => (
                        <li key={index} style={styles.featureItem}>
                          ✓ {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Add to Cart Button */}
                <button 
                  style={styles.addToCartButton}
                  onClick={handleAddToCartFromModal}
                  onMouseEnter={(e) => {
                    e.target.style.transform = styles.addToCartButtonHover.transform;
                    e.target.style.boxShadow = styles.addToCartButtonHover.boxShadow;
                    e.target.style.backgroundColor = styles.addToCartButtonHover.backgroundColor;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = styles.addToCartButton.boxShadow;
                    e.target.style.backgroundColor = styles.addToCartButton.backgroundColor;
                  }}
                >
                  Add to Cart - ₹{selectedProduct.price * quantity}
                </button>
                <button
                  style={styles.addToCartButton}
                  onClick={handleAddToWishlistFromModal}
                  onMouseEnter={(e) => {
                    e.target.style.transform = styles.addToCartButtonHover.transform;
                    e.target.style.boxShadow = styles.addToCartButtonHover.boxShadow;
                    e.target.style.backgroundColor = styles.addToCartButtonHover.backgroundColor;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = styles.addToCartButton.boxShadow;
                    e.target.style.backgroundColor = styles.addToCartButton.backgroundColor;
                  }}
                >
                  {isInWishlist(selectedProduct.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;