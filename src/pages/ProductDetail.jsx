import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Mock data fetch - replace with actual API call
  useEffect(() => {
    // Simulate fetching product by ID (use your featuredProducts array or API)
    const featuredProducts = [
      // Paste your featuredProducts array here from Home.jsx
      {
        id: 1,
        name: "Men's Formal Shirt",
        description: "Premium cotton formal shirt for men with perfect fit and comfort",
        price: 1499,
        image: "https://images.pexels.com/photos/12437056/pexels-photo-12437056.jpeg?auto=compress&cs=tinysrgb&w=600",
        category: "mens-wear",
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      // ... add all other products
    ];
    const foundProduct = featuredProducts.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    if (foundProduct) {
      setSelectedSize(foundProduct.sizes[0]);
    }
  }, [id]);

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart({ ...product, size: selectedSize, quantity });
      // Optional: Show success message or navigate back
      alert('Added to cart!');
      navigate(-1); // Go back to previous page
    } else {
      alert('Please select a size');
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: "'Poppins', sans-serif" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}>
        ← Back
      </button>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', maxWidth: '400px', height: '400px', objectFit: 'cover', borderRadius: '8px' }} 
        />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{product.name}</h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#666' }}>{product.description}</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>₹{product.price}</p>
          
          {/* Size Selector */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Size:</label>
            <select 
              value={selectedSize} 
              onChange={(e) => setSelectedSize(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              {product.sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Quantity Selector */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Quantity:</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button 
                onClick={() => handleQuantityChange(-1)}
                style={{ width: '30px', height: '30px', border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}
              >
                -
              </button>
              <span style={{ fontSize: '1.2rem', minWidth: '20px', textAlign: 'center' }}>{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                style={{ width: '30px', height: '30px', border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}
              >
                +
              </button>
            </div>
          </div>

          <button 
            onClick={handleAddToCart} 
            style={{ 
              padding: '1rem 2rem', 
              background: '#667eea', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              fontSize: '1rem', 
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;