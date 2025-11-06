import React from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

// Simple toast function
const showToast = (message, type = "success") => {
  // Create a simple toast element
  const toast = document.createElement("div");
  toast.style.position = "fixed";
  toast.style.top = "20px";
  toast.style.right = "20px";
  toast.style.backgroundColor = type === "success" ?  "#f9443bff" : "#10B981";
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

function Cart({ cart, removeFromCart, updateQuantity, updateSize, getCartTotal, addToCart }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  // Enhanced functions with toast notifications
  const handleRemoveFromCart = (itemId, itemName) => {
    removeFromCart(itemId);
    showToast(`"${itemName}" removed from cart`, "success");
  };

  const handleUpdateQuantity = (itemId, newQuantity, itemName, currentQuantity) => {
    if (newQuantity <= 0) return;
    
    updateQuantity(itemId, newQuantity);
    
    if (newQuantity > currentQuantity) {
      showToast(`Added "${itemName}"`, "info");
    } else {
      showToast(`Removed "${itemName}"`, "info");
    }
  };

  const handleUpdateSize = (itemId, newSize, itemName) => {
    updateSize(itemId, newSize);
    showToast(`Size updated to ${newSize} for "${itemName}"!`, "info");
  };

  const handleProceedToCheckout = () => {
    showToast("Redirecting to checkout...", "success");
  };

  // Function to demonstrate adding an item to cart (for testing purposes)
  const handleAddSampleItem = () => {
    const sampleItem = {
      id: Date.now(),
      name: "Sample Product",
      price: 1999,
      image: "https://via.placeholder.com/80",
      quantity: 1,
      size: "M"
    };
    
    if (addToCart) {
      addToCart(sampleItem);
      showToast(`"${sampleItem.name}" added to cart`, "success");
    } else {
      showToast("Add to cart function not available", "info");
    }
  };

  if (cart.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "4rem 2rem",
          color: "#555",
        }}
      >
        <h2>Your Cart is Empty</h2>
        <p style={{ marginBottom: "1.5rem" }}>
          Add some items to see them here!
        </p>
        
        {/* Demo button to add sample item */}
        <button
          onClick={handleAddSampleItem}
          style={{
            background: "linear-gradient(135deg, #10B981, #059669)",
            color: "#fff",
            border: "none",
            padding: "0.8rem 1.8rem",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
             marginTop: "1.5rem",
            marginRight: "1rem",
            transition: "0.3s",
          }}
          onMouseEnter={(e) =>
            (e.target.style.background = "linear-gradient(135deg, #059669, #047857)")
          }
          onMouseLeave={(e) =>
            (e.target.style.background = "linear-gradient(135deg, #10B981, #059669)")
          }
        >
          Add Sample Item 
        </button>
        
        <Link
          to="/"
          style={{
            display: "inline-block",
            marginTop: "1.5rem",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "#fff",
            padding: "0.8rem 1.8rem",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const sizes = ["S", "M", "L", "XL"];

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "2rem auto",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        padding: "2rem",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        🛒 Your Shopping Cart
      </h2>

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #eee",
            padding: "1.5rem 0",
            flexWrap: "wrap",
          }}
        >
          {/* Product Info */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            )}
            <div>
              <h3 style={{ margin: 0, color: "#333" }}>{item.name}</h3>
              <p style={{ margin: 0, color: "#667eea", fontWeight: "600" }}>
                {formatPrice(item.price)}
              </p>

              {/* Size Selector */}
              <div style={{ marginTop: "0.5rem" }}>
                <label
                  style={{
                    fontSize: "0.9rem",
                    marginRight: "8px",
                    color: "#555",
                    fontWeight: "500",
                  }}
                >
                  Size:
                </label>
                <select
                  value={item.size || ""}
                  onChange={(e) => handleUpdateSize(item.id, e.target.value, item.name)}
                  style={{
                    padding: "0.3rem 0.6rem",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  <option value="">Select</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Quantity Controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginTop: "0.5rem",
            }}
          >
            <button
              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.name, item.quantity)}
              disabled={item.quantity <= 1}
              style={{
                backgroundColor: "#e2e8f0",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                fontSize: "1.1rem",
                cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
                opacity: item.quantity <= 1 ? 0.5 : 1,
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                item.quantity > 1 && (e.target.style.backgroundColor = "#cbd5e0")
              }
              onMouseLeave={(e) =>
                item.quantity > 1 && (e.target.style.backgroundColor = "#e2e8f0")
              }
            >
              −
            </button>
            <span
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                width: "25px",
                textAlign: "center",
              }}
            >
              {item.quantity}
            </span>
            <button
              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.name, item.quantity)}
              style={{
                backgroundColor: "#667eea",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                fontSize: "1.1rem",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "#5a67d8")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#667eea")
              }
            >
              +
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => handleRemoveFromCart(item.id, item.name)}
            style={{
              background: "none",
              border: "none",
              color: "#e53e3e",
              cursor: "pointer",
              fontSize: "1.1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontWeight: "600",
              marginTop: "0.5rem",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#c53030")}
            onMouseLeave={(e) => (e.target.style.color = "#e53e3e")}
          >
            <FaTrashAlt /> Remove
          </button>
        </div>
      ))}

      {/* Total */}
      <div
        style={{
          marginTop: "2rem",
          textAlign: "right",
          fontSize: "1.2rem",
          fontWeight: "700",
          color: "#333",
        }}
      >
        Total: {formatPrice(getCartTotal())}
      </div>

      {/* Checkout */}
      <div style={{ textAlign: "right", marginTop: "1.5rem" }}>
        <Link
          to="/payment"
          onClick={handleProceedToCheckout}
          style={{
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "#fff",
            padding: "0.9rem 2rem",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            transition: "0.3s",
            display: "inline-block",
          }}
          onMouseEnter={(e) =>
            (e.target.style.background =
              "linear-gradient(135deg, #5a67d8, #6b46c1)")
          }
          onMouseLeave={(e) =>
            (e.target.style.background =
              "linear-gradient(135deg, #667eea, #764ba2)")
          }
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;