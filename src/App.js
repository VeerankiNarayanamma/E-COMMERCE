import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from "./pages/Register";
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import CategoryPage from './pages/CategoryPage';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Dashboard from "./pages/Dashboard";
import ProductDetail from './pages/ProductDetail';
import { AppProvider } from './context/AppContext';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // 🛒 Cart Management Functions
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // ❤️ Wishlist Management Functions
  const addToWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, { ...product, addedDate: new Date().toISOString() }];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <AppProvider>
      <AppContent 
        user={user}
        setUser={setUser}
        cart={cart}
        setCart={setCart}
        wishlist={wishlist}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        getCartTotal={getCartTotal}
        addToWishlist={addToWishlist}
        removeFromWishlist={removeFromWishlist}
        clearWishlist={clearWishlist}
        isInWishlist={isInWishlist}
      />
    </AppProvider>
  );
}

// Separate component to use useLocation hook
function AppContent({ 
  user, 
  setUser, 
  cart, 
  setCart,
  wishlist,
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  getCartTotal,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  isInWishlist
}) {
  const location = useLocation();

  // 🔒 Hide Sidebar & Header on Login/Register pages
  const hideLayout =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/create-account';

  return (
    <div className="App" style={{ display: 'flex' }}>
      {!hideLayout && <Sidebar />}

      <div
        style={{
          flex: 1,
          marginLeft: !hideLayout ? '240px' : '0',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {!hideLayout && (
          <Header 
            user={user} 
            setUser={setUser} 
            cartCount={cart.length} 
            wishlistCount={wishlist.length}
          />
        )}

        <div
          style={{
            padding: !hideLayout ? '100px 20px 20px 20px' : '0',
            minHeight: '100vh',
          }}
        >
          <Routes>
            {/* 🟦 Auth Routes */}
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/create-account" element={<Register setUser={setUser} />} />

            {/* 🏠 Main Route (Protected) */}
            <Route
              path="/"
              element={
                user ? (
                  <Home 
                    addToCart={addToCart}
                    addToWishlist={addToWishlist}
                    removeFromWishlist={removeFromWishlist}
                    isInWishlist={isInWishlist}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* 🏠 Home Route (Protected) */}
            <Route
              path="/home"
              element={
                user ? (
                  <Home 
                    addToCart={addToCart}
                    addToWishlist={addToWishlist}
                    removeFromWishlist={removeFromWishlist}
                    isInWishlist={isInWishlist}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* 🛍️ Product Detail Route (Protected) */}
            <Route
              path="/product/:id"
              element={
                user ? (
                  <ProductDetail 
                    addToCart={addToCart}
                    addToWishlist={addToWishlist}
                    removeFromWishlist={removeFromWishlist}
                    isInWishlist={isInWishlist}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* ❤️ Wishlist Route (Protected) */}
            <Route
              path="/wishlist"
              element={
                user ? (
                  <Wishlist 
                    wishlist={wishlist}
                    addToCart={addToCart}
                    removeFromWishlist={removeFromWishlist}
                    clearWishlist={clearWishlist}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* 📊 Dashboard Route (Protected) */}
            <Route
              path="/dashboard"
              element={
                user ? (
                  <Dashboard 
                    user={user} 
                    cart={cart}
                    wishlist={wishlist}
                    addToWishlist={addToWishlist}
                    removeFromWishlist={removeFromWishlist}
                    isInWishlist={isInWishlist}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* 🧭 Category Routes (Protected) */}
            <Route
              path="/category/:categoryName"
              element={
                user ? (
                  <CategoryPage 
                    addToCart={addToCart}
                    addToWishlist={addToWishlist}
                    removeFromWishlist={removeFromWishlist}
                    isInWishlist={isInWishlist}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* 🛒 Cart Route (Protected) */}
            <Route
              path="/cart"
              element={
                user ? (
                  <Cart
                    cart={cart}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                    getCartTotal={getCartTotal}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* 💳 Payment Route (Protected) */}
            <Route
              path="/payment"
              element={
                user ? (
                  <Payment
                    cart={cart}
                    getCartTotal={getCartTotal}
                    setCart={setCart}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* 🟥 Catch-All Redirect */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;