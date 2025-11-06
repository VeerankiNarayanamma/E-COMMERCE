import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaMobile, FaGoogle, FaPaypal, FaWallet } from 'react-icons/fa';

function Payment({ cart, getCartTotal, setCart }) {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    upiId: '',
    phoneNumber: '',
    walletPin: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  // Razorpay configuration - Test key
  const RAZORPAY_KEY_ID = 'rzp_test_RbDpubSCA8frnv'; // Your actual key

  const paymentMethods = [
     {
      id: 'razorpay',
      name: 'Razorpay',
      icon: <FaCreditCard />,
      description: 'Secure payment via Razorpay'
    }
    
   
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  // Check if Razorpay is available
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        console.log('Razorpay SDK loaded successfully');
        resolve(true);
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay SDK');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // Simple Razorpay payment function
  const handleRazorpayPayment = async () => {
    setIsProcessing(true);

    try {
      // Check if cart has items
      if (cart.length === 0) {
        alert('Your cart is empty!');
        setIsProcessing(false);
        return;
      }

      const totalAmount = getCartTotal();
      if (totalAmount <= 0) {
        alert('Invalid amount!');
        setIsProcessing(false);
        return;
      }

      console.log('Starting Razorpay payment...');
      
      // Load Razorpay SDK
      const razorpayLoaded = await loadRazorpay();
      
      if (!razorpayLoaded) {
        alert('Razorpay SDK failed to load. Please check your internet connection.');
        setIsProcessing(false);
        return;
      }

      if (!window.Razorpay) {
        alert('Razorpay not available. Please refresh the page.');
        setIsProcessing(false);
        return;
      }

      const orderAmount = Math.round(totalAmount * 100); // Convert to paise

      console.log('Payment amount:', orderAmount);

      const options = {
        key: RAZORPAY_KEY_ID, // Fixed: using the variable with quotes
        amount: orderAmount,
        currency: 'INR',
        name: 'E-Commerce Store',
        description: 'Payment for your order',
        image: 'https://cdn.razorpay.com/logos/FFATTsJeURNMxx_medium.png',
        handler: function (response) {
          console.log('Payment Success:', response);
          setIsProcessing(false);
          setIsSuccess(true);
          setCart([]);
          
          // Redirect after success
          setTimeout(() => {
            navigate('/');
          }, 3000);
        },
        prefill: {
          name: 'Test Customer',
          email: 'test@example.com',
          contact: '9999999999'
        },
        notes: {
          address: 'Test Address',
          order_items: cart.map(item => `${item.name} x ${item.quantity}`).join(', ')
        },
        theme: {
          color: '#667eea'
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal closed by user');
            setIsProcessing(false);
          }
        }
      };

      console.log('Razorpay options:', options);

      // Create and open Razorpay instance
      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', function (response) {
        console.error('Payment Failed:', response.error);
        alert(`Payment failed: ${response.error.description}`);
        setIsProcessing(false);
      });

      // Open Razorpay checkout
      razorpay.open();
      console.log('Razorpay checkout opened');

    } catch (error) {
      console.error('Razorpay error:', error);
      setIsProcessing(false);
      alert('Payment initialization failed. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedMethod === 'razorpay') {
      handleRazorpayPayment();
    } else {
      // Existing payment flow for other methods
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);
        setCart([]);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }, 2000);
    }
  };

  const handleUpiPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setCart([]);
    }, 2000);
  };

  const handleWalletPayment = (walletType) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setCart([]);
    }, 2000);
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#2c3e50',
    },
    methodsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem',
    },
    methodCard: {
      padding: '1.5rem',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: 'white',
    },
    methodCardSelected: {
      borderColor: '#667eea',
      backgroundColor: '#f8f9ff',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)',
    },
    methodIcon: {
      fontSize: '2rem',
      color: '#667eea',
      marginBottom: '0.5rem',
    },
    methodName: {
      fontSize: '1rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#333',
    },
    methodDescription: {
      fontSize: '0.8rem',
      color: '#666',
    },
    orderSummary: {
      backgroundColor: '#f8f9fa',
      padding: '1.5rem',
      borderRadius: '8px',
      marginBottom: '2rem',
    },
    orderItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.8rem',
      paddingBottom: '0.8rem',
      borderBottom: '1px solid #e9ecef',
    },
    paymentForm: {
      marginTop: '2rem',
    },
    formGroup: {
      marginBottom: '1.2rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '500',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
    },
    button: {
      width: '100%',
      padding: '1rem 2rem',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '1rem',
    },
    razorpayButton: {
      width: '100%',
      padding: '1rem 2rem',
      backgroundColor: '#2d87ff',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '1rem',
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none !important',
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)',
    },
    upiButton: {
      width: '100%',
      padding: '1rem',
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '1rem',
    },
    walletButton: {
      width: '100%',
      padding: '1rem',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '1rem',
    },
    successMessage: {
      textAlign: 'center',
      padding: '3rem',
      backgroundColor: '#d4edda',
      border: '1px solid #c3e6cb',
      borderRadius: '8px',
      color: '#155724',
    },
    loading: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      border: '3px solid #ffffff',
      borderRadius: '50%',
      borderTopColor: 'transparent',
      animation: 'spin 1s ease-in-out infinite',
    },
    razorpayInfo: {
      backgroundColor: '#f0f8ff',
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      border: '1px solid #2d87ff',
      textAlign: 'center',
    },
    testInfo: {
      backgroundColor: '#fff3cd',
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      border: '1px solid #ffeaa7',
      textAlign: 'center',
      fontSize: '0.9rem',
      color: '#856404',
    }
  };

  if (isSuccess) {
    return (
      <div style={styles.container}>
        <div style={styles.successMessage}>
          <h2>Payment Successful! 🎉</h2>
          <p>Thank you for your purchase. Your order has been confirmed.</p>
          <p>You will be redirected to the home page shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Complete Your Payment</h2>
        <p>Choose your preferred payment method</p>
      </div>

      {/* Order Summary */}
      <div style={styles.orderSummary}>
        <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Order Summary</h3>
        {cart.map(item => (
          <div key={item.id} style={styles.orderItem}>
            <span>{item.name} x {item.quantity}</span>
            <span>{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
        <div style={{ 
          ...styles.orderItem, 
          fontWeight: 'bold', 
          borderTop: '2px solid #ddd', 
          paddingTop: '1rem',
          fontSize: '1.2rem'
        }}>
          <span>Total Amount:</span>
          <span>{formatPrice(getCartTotal())}</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div style={styles.methodsGrid}>
        {paymentMethods.map(method => (
          <div
            key={method.id}
            style={{
              ...styles.methodCard,
              ...(selectedMethod === method.id ? styles.methodCardSelected : {})
            }}
            onClick={() => setSelectedMethod(method.id)}
          >
            <div style={styles.methodIcon}>{method.icon}</div>
            <div style={styles.methodName}>{method.name}</div>
            <div style={styles.methodDescription}>{method.description}</div>
          </div>
        ))}
      </div>

      {/* Razorpay Payment Section */}
      {selectedMethod === 'razorpay' && (
        <div style={styles.paymentForm}>
          <div style={styles.razorpayInfo}>
            <h3 style={{ color: '#2d87ff', marginBottom: '0.5rem' }}>Secure Payment via Razorpay</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              You'll be redirected to Razorpay's secure payment gateway
            </p>
          </div>

          <div style={styles.testInfo}>
            <strong>Test Mode:</strong> Use test card: <code>4111 1111 1111 1111</code>
            <br />
            Any future expiry date, any CVV
          </div>
          
          <button 
            onClick={handleRazorpayPayment}
            style={{
              ...styles.razorpayButton,
              ...(isProcessing ? styles.buttonDisabled : {})
            }}
            disabled={isProcessing}
            onMouseEnter={(e) => !isProcessing && (e.target.style.transform = styles.buttonHover.transform)}
            onMouseLeave={(e) => !isProcessing && (e.target.style.transform = 'translateY(0)')}
          >
            {isProcessing ? (
              <div style={styles.loading}></div>
            ) : (
              `Pay Securely with Razorpay - ${formatPrice(getCartTotal())}`
            )}
          </button>
          
          <div style={{ textAlign: 'center', marginTop: '1rem', color: '#666', fontSize: '0.8rem' }}>
            <p>✅ Secure & Encrypted</p>
            <p>✅ Multiple Payment Options</p>
            <p>✅ Instant Confirmation</p>
          </div>
        </div>
      )}

      {/* Other payment methods */}
      {selectedMethod === 'card' && (
        <form onSubmit={handleSubmit} style={styles.paymentForm}>
          <h3 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>Card Details</h3>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              required
              style={styles.input}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ ...styles.formGroup, flex: 1 }}>
              <label style={styles.label}>Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                value={paymentData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                required
                style={styles.input}
              />
            </div>
            
            <div style={{ ...styles.formGroup, flex: 1 }}>
              <label style={styles.label}>CVV</label>
              <input
                type="text"
                name="cvv"
                value={paymentData.cvv}
                onChange={handleChange}
                placeholder="123"
                required
                style={styles.input}
              />
            </div>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Cardholder Name</label>
            <input
              type="text"
              name="name"
              value={paymentData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              style={styles.input}
            />
          </div>

          <button 
            type="submit" 
            style={{
              ...styles.button,
              ...(isProcessing ? styles.buttonDisabled : {})
            }}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div style={styles.loading}></div>
            ) : (
              `Pay ${formatPrice(getCartTotal())}`
            )}
          </button>
        </form>
      )}

      {selectedMethod === 'upi' && (
        <div style={styles.paymentForm}>
          <h3 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>UPI Payment</h3>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>UPI ID</label>
            <input
              type="text"
              name="upiId"
              value={paymentData.upiId}
              onChange={handleChange}
              placeholder="yourname@upi"
              required
              style={styles.input}
            />
          </div>

          <button 
            onClick={handleUpiPayment}
            style={{
              ...styles.upiButton,
              ...(isProcessing ? styles.buttonDisabled : {})
            }}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay via UPI - ${formatPrice(getCartTotal())}`}
          </button>
        </div>
      )}

      {/* Add other payment methods as needed */}

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Payment;