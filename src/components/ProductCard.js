// import React from "react";

// function ProductCard({ product, addToCart }) {
//   const styles = {
//     card: {
//       backgroundColor: "#fff",
//       borderRadius: "12px",
//       boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
//       padding: "1rem",
//       textAlign: "center",
//       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//     },
//     image: {
//       width: "100%",
//       height: "220px",
//       objectFit: "cover",
//       borderRadius: "8px",
//       marginBottom: "0.8rem",
//     },
//     name: {
//       fontSize: "1.1rem",
//       fontWeight: "600",
//       color: "#333",
//       marginBottom: "0.3rem",
//     },
//     description: {
//       fontSize: "0.9rem",
//       color: "#666",
//       marginBottom: "0.6rem",
//     },
//     price: {
//       fontSize: "1rem",
//       color: "#667eea",
//       fontWeight: "700",
//       marginBottom: "0.6rem",
//     },
//     button: {
//       background: "linear-gradient(135deg, #667eea, #764ba2)",
//       color: "#fff",
//       border: "none",
//       borderRadius: "6px",
//       padding: "0.5rem 1rem",
//       fontSize: "0.9rem",
//       fontWeight: "600",
//       cursor: "pointer",
//       transition: "all 0.3s ease",
//       width: "100%",
//       boxShadow: "0 3px 10px rgba(102, 126, 234, 0.3)",
//     },
//     buttonHover: {
//       background: "linear-gradient(135deg, #5a67d8, #6b46c1)",
//       transform: "scale(1.05)",
//       boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
//     },
//   };

//   const handleMouseEnter = (e) => {
//     Object.assign(e.currentTarget.style, styles.buttonHover);
//   };

//   const handleMouseLeave = (e) => {
//     Object.assign(e.currentTarget.style, styles.button);
//   };

//   return (
//     <div
//       style={styles.card}
//       onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
//       onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
//     >
//       {/* ✅ use from public folder */}
//       <img src="/pexels-pixabay-356170.jpg" alt={product.name} style={styles.image} />
//       <h3 style={styles.name}>{product.name}</h3>
//       <p style={styles.description}>{product.description}</p>
//       <p style={styles.price}>₹{product.price}</p>
//       <button
//         style={styles.button}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         onClick={() => addToCart(product)}
//       >
//         🛒 Add to Cart
//       </button>
//     </div>
//   );
// }

// export default ProductCard;
import React from "react";

function ProductCard({ product, addToCart }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const styles = {
    card: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
      padding: "1.2rem",
      textAlign: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      border: "1px solid #f0f0f0",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    image: {
      width: "100%",
      height: "220px",
      objectFit: "cover",
      borderRadius: "8px",
      marginBottom: "1rem",
    },
    name: {
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "#333",
      marginBottom: "0.5rem",
      minHeight: "50px",
    },
    description: {
      fontSize: "0.9rem",
      color: "#666",
      marginBottom: "0.8rem",
      flex: 1,
    },
    priceContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      marginBottom: "1rem",
    },
    price: {
      fontSize: "1.2rem",
      color: "#667eea",
      fontWeight: "700",
    },
    originalPrice: {
      fontSize: "1rem",
      color: "#999",
      textDecoration: "line-through",
    },
    discount: {
      fontSize: "0.8rem",
      color: "#e74c3c",
      fontWeight: "600",
      backgroundColor: "#ffeaea",
      padding: "2px 8px",
      borderRadius: "12px",
    },
    rating: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px",
      marginBottom: "1rem",
      color: "#666",
      fontSize: "0.9rem",
    },
    button: {
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "0.8rem 1rem",
      fontSize: "0.95rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      width: "100%",
      boxShadow: "0 3px 10px rgba(102, 126, 234, 0.3)",
    },
  };

  const calculateDiscount = () => {
    if (product.originalPrice) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.background = "linear-gradient(135deg, #5a67d8, #6b46c1)";
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.4)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 3px 10px rgba(102, 126, 234, 0.3)";
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.08)";
      }}
    >
      <img src={product.image} alt={product.name} style={styles.image} />
      <h3 style={styles.name}>{product.name}</h3>
      <p style={styles.description}>{product.description}</p>
      
      <div style={styles.rating}>
        ⭐ {product.rating} ({product.reviews} reviews)
      </div>
      
      <div style={styles.priceContainer}>
        <span style={styles.price}>{formatPrice(product.price)}</span>
        {product.originalPrice && product.originalPrice > product.price && (
          <>
            <span style={styles.originalPrice}>
              {formatPrice(product.originalPrice)}
            </span>
            <span style={styles.discount}>
              {calculateDiscount()}% OFF
            </span>
          </>
        )}
      </div>
      
      <button
        style={styles.button}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => addToCart(product)}
      >
        🛒 Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;