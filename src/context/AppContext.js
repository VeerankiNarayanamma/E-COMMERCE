import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  cart: [],
  wishlist: [],
  products: [
    {
      id: 1,
      name: "Men's T-Shirt",
      price: 25.99,
      category: "mens",
      image: "https://via.placeholder.com/200x200?text=Men's+T-Shirt",
      description: "Comfortable cotton t-shirt for men"
    },
    {
      id: 2,
      name: "Women's Dress",
      price: 45.99,
      category: "womens",
      image: "https://via.placeholder.com/200x200?text=Women's+Dress",
      description: "Elegant dress for women"
    },
    {
      id: 3,
      name: "Kids Jacket",
      price: 35.99,
      category: "kids",
      image: "https://via.placeholder.com/200x200?text=Kids+Jacket",
      description: "Warm jacket for kids"
    },
    {
      id: 4,
      name: "Men's Jeans",
      price: 49.99,
      category: "mens",
      image: "https://via.placeholder.com/200x200?text=Men's+Jeans",
      description: "Classic denim jeans for men"
    },
    {
      id: 5,
      name: "Women's Blouse",
      price: 32.99,
      category: "womens",
      image: "https://via.placeholder.com/200x200?text=Women's+Blouse",
      description: "Stylish blouse for women"
    },
    {
      id: 6,
      name: "Kids T-Shirt",
      price: 15.99,
      category: "kids",
      image: "https://via.placeholder.com/200x200?text=Kids+T-Shirt",
      description: "Colorful t-shirt for kids"
    }
  ]
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    
    // Cart Actions
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }]
        };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    // Wishlist Actions
    case 'ADD_TO_WISHLIST':
      const existingWishlistItem = state.wishlist.find(item => item.id === action.payload.id);
      if (existingWishlistItem) {
        return state; // Item already in wishlist
      } else {
        return {
          ...state,
          wishlist: [...state.wishlist, { 
            ...action.payload, 
            addedDate: new Date().toISOString().split('T')[0] 
          }]
        };
      }
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload)
      };
    case 'MOVE_WISHLIST_TO_CART':
      const wishlistItems = state.wishlist.filter(item => 
        !state.cart.find(cartItem => cartItem.id === item.id)
      );
      
      const cartItemsWithQuantity = wishlistItems.map(item => ({
        ...item,
        quantity: 1
      }));
      
      return {
        ...state,
        cart: [...state.cart, ...cartItemsWithQuantity],
        wishlist: [] // Clear wishlist after moving to cart
      };
    case 'CLEAR_WISHLIST':
      return { ...state, wishlist: [] };
    
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action creators for easier usage
  const actions = {
    login: (user) => dispatch({ type: 'LOGIN', payload: user }),
    logout: () => dispatch({ type: 'LOGOUT' }),
    
    // Cart actions
    addToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
    removeFromCart: (productId) => dispatch({ type: 'REMOVE_FROM_CART', payload: productId }),
    updateQuantity: (productId, quantity) => dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { id: productId, quantity } 
    }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    
    // Wishlist actions
    addToWishlist: (product) => dispatch({ type: 'ADD_TO_WISHLIST', payload: product }),
    removeFromWishlist: (productId) => dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId }),
    moveWishlistToCart: () => dispatch({ type: 'MOVE_WISHLIST_TO_CART' }),
    clearWishlist: () => dispatch({ type: 'CLEAR_WISHLIST' }),
    
    // Helper functions
    isInWishlist: (productId) => state.wishlist.some(item => item.id === productId),
    isInCart: (productId) => state.cart.some(item => item.id === productId),
    getCartItemCount: () => state.cart.reduce((total, item) => total + item.quantity, 0),
    getWishlistItemCount: () => state.wishlist.length,
    getCartTotal: () => state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  };

  return (
    <AppContext.Provider value={{ state, ...actions }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}