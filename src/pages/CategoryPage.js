import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productsData } from '../data/Products';

const CategoryPage = ({ addToCart }) => {
  const { categoryName } = useParams();

  const categoryProducts = productsData[categoryName];

  if (!categoryProducts) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#ff3e6c' }}>Category not found</h2>
        <p>Please select a valid category from the sidebar.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ 
        color: '#007bff', 
        fontWeight: 600, 
        marginBottom: '20px',
        textTransform: 'capitalize',
        fontSize: '2rem'
      }}>
        {categoryName.replace('-', ' ')}
      </h1>
      <p style={{ marginBottom: '30px', color: '#666', fontSize: '1.1rem' }}>
        Showing {categoryProducts.length} products
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '25px',
      }}>
        {categoryProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;