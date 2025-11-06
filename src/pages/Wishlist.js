import React from "react";

// Simple toast function (same as in Cart component)
const showToast = (message, type = "success") => {
  // Create a simple toast element
  const toast = document.createElement("div");
  toast.style.position = "fixed";
  toast.style.top = "20px";
  toast.style.right = "20px";
  toast.style.backgroundColor = type === "success" ? "#10B981" : "#3B82F6";
  toast.style.color = "white";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  toast.style.zIndex = "9999";
  toast.style.fontWeight = "500";
  toast.style.transition = "all 0.3s ease";
  toast.innerText = message;
  
  document.body.appendChild(toast);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 3000);
};

function Wishlist({ wishlist, removeFromWishlist, addToCart }) {
  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: "'Poppins', sans-serif",
    },
    title: {
      textAlign: 'center',
      fontSize: '2rem',
      marginBottom: '2rem',
      color: '#ff3f6c',
    },
    emptyMessage: {
      textAlign: 'center',
      fontSize: '1.2rem',
      color: '#696e79',
    },
    itemsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '1.5rem',
    },
    itemCard: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '1rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      textAlign: 'center',
      transition: 'transform 0.3s ease',
    },
    itemCardHover: {
      transform: 'translateY(-5px)',
    },
    image: {
      width: '100%',
      maxWidth: '150px',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginBottom: '1rem',
    },
    itemName: {
      fontSize: '1.1rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#282c3f',
    },
    itemPrice: {
      fontSize: '1rem',
      color: '#ff3f6c',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    buttons: {
      display: 'flex',
      gap: '0.5rem',
      justifyContent: 'center',
    },
    addToCartButton: {
      backgroundColor: '#ff3f6c',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      transition: 'background-color 0.3s ease',
    },
    removeButton: {
      backgroundColor: '#e53e3e',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      transition: 'background-color 0.3s ease',
    },
  };

  // Enhanced functions with toast notifications
  const handleAddToCart = (item) => {
    addToCart(item);
    showToast(`"${item.name}" added to cart!`, "success");
  };

  const handleRemoveFromWishlist = (itemId, itemName) => {
    removeFromWishlist(itemId);
    showToast(`"${itemName}" removed from wishlist!`, "success");
  };

  const handleMoveAllToCart = () => {
    if (wishlist.length === 0) return;
    
    wishlist.forEach(item => {
      addToCart(item);
    });
    showToast(`All ${wishlist.length} items moved to cart!`, "success");
  };

  const handleClearWishlist = () => {
    if (wishlist.length === 0) return;
    
    const itemCount = wishlist.length;
    wishlist.forEach(item => {
      removeFromWishlist(item.id);
    });
    showToast(`Wishlist cleared! ${itemCount} items removed.`, "info");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}> My Wishlist</h2>
      
      {/* Bulk Actions */}
      {wishlist.length > 0 && (
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleMoveAllToCart}
            style={{
              backgroundColor: '#10B981',
              color: 'white',
              border: 'none',
              padding: '0.7rem 1.5rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#059669')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#10B981')}
          >
             Move All to Cart
          </button>
          <button
            onClick={handleClearWishlist}
            style={{
              backgroundColor: '#6B7280',
              color: 'white',
              border: 'none',
              padding: '0.7rem 1.5rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#4B5563')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#6B7280')}
          >
             Clear Wishlist
          </button>
        </div>
      )}
      
      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <p style={styles.emptyMessage}>Your wishlist is empty. Start adding some items you love! 💫</p>
          <button
            onClick={() => showToast("Navigate to products page to add items!", "info")}
            style={{
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              marginTop: '1rem',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#5a67d8')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#667eea')}
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div style={styles.itemsGrid}>
          {wishlist.map((item) => (
            <div
              key={item.id}
              style={styles.itemCard}
              onMouseEnter={(e) => (e.currentTarget.style.transform = styles.itemCardHover.transform)}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <img src={item.image} alt={item.name} style={styles.image} />
              <h4 style={styles.itemName}>{item.name}</h4>
              <p style={styles.itemPrice}>₹{item.price}</p>
              <div style={styles.buttons}>
                <button
                  style={styles.addToCartButton}
                  onClick={() => handleAddToCart(item)}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#e6395f')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#ff3f6c')}
                >
                  Add to Cart
                </button>
                <button
                  style={styles.removeButton}
                  onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#c53030')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#e53e3e')}
                >
                   Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Wishlist Summary */}
      {wishlist.length > 0 && (
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <p style={{ margin: 0, color: '#4a5568', fontWeight: '600' }}>
            You have {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} in your wishlist
          </p>
        </div>
      )}
    </div>
  );
}

export default Wishlist;