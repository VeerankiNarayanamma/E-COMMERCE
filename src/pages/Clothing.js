import React from 'react';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import '../styles/Clothing.css'; // optional custom styling file

function Clothing() {
  const { state } = useApp();

  // Filter only clothing products (if categories exist)
  const clothingProducts = state.products.filter(
    (product) => product.category === 'clothing' || product.category === 'Clothing'
  );

  return (
    <div className="clothing-page container mt-4">
      <h1 className="text-center mb-3">👗 Explore Our Clothing Collection</h1>
      <p className="text-center text-muted mb-5">
        Discover the latest trends and fashion pieces designed to keep you stylish and comfortable.
      </p>

      {clothingProducts.length > 0 ? (
        <div className="products-grid">
          {clothingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-danger mt-5">
          <h4>No clothing products found.</h4>
          <p>Please check back later for new arrivals!</p>
        </div>
      )}
    </div>
  );
}

export default Clothing;
