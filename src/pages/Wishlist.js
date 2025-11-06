import React from "react";

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
      maxWidth: '150px', // Decreased size
      height: '150px', // Decreased size
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

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>💖 My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p style={styles.emptyMessage}>Your wishlist is empty.</p>
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
                  onClick={() => addToCart(item)}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#e6395f')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#e6395f')}
                >
                  Add to Cart
                </button>
                <button
                  style={styles.removeButton}
                  onClick={() => removeFromWishlist(item.id)}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#e6395f')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#e6395f')}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
