// src/pages/Checkout.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import './Checkout.css';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // Customer details state
  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });

  // Order summary state
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 50,
    tax: 0,
    total: 0,
    itemCount: 0
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchCartItems();
  }, [isAuthenticated, navigate]);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await api.get('/cart');
      
      if (response.data.success) {
        const cart = response.data.data;
        setCartItems(cart.items || []);
        
        // Calculate order summary
        const subtotal = cart.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
        const shipping = 0; // Free shipping
        const tax = Math.round(subtotal * 0.18); // 18% GST
        const total = subtotal + shipping + tax;
        
        setOrderSummary({
          subtotal: Math.round(subtotal),
          shipping: shipping,
          tax: tax,
          total: Math.round(total),
          itemCount: cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
        });
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
    const missingFields = requiredFields.filter(field => !customerDetails[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    // Navigate to payment page with order data
    const orderData = {
      items: cartItems.map(item => ({
        productId: item.productId._id || item.productId,
        quantity: item.quantity,
        price: item.price,
        name: item.productId?.name || item.name,
        image: item.image
      })),
      customerDetails,
      orderSummary
    };

    console.log('Checkout: Order data being passed to payment:', orderData);
    console.log('Checkout: Order total:', orderSummary.total);

    navigate('/payment', { 
      state: { 
        orderData,
        orderTotal: orderSummary.total
      } 
    });
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p>Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && !orderConfirmed) {
    return (
      <div>
        <Header />
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart before checking out.</p>
          <button 
            onClick={() => navigate('/products')}
            style={{
              backgroundColor: '#667eea',
              color: 'white',
              padding: '12px 30px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="checkout-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {orderConfirmed ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
            <h2 style={{ color: '#28a745', marginBottom: '20px' }}>Order Confirmed!</h2>
            <p style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <p style={{ marginBottom: '30px', color: '#666' }}>
              You will receive an email confirmation shortly with your order details.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button 
                onClick={() => navigate('/products')}
                style={{
                  backgroundColor: '#667eea',
                  color: 'white',
                  padding: '12px 30px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                Continue Shopping
              </button>
              <button 
                onClick={() => navigate('/account')}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  padding: '12px 30px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                View Orders
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            {/* Customer Details Form */}
            <div>
              <h2 style={{ marginBottom: '20px', color: '#333' }}>Shipping Details</h2>
              <form onSubmit={handleOrderSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={customerDetails.firstName}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={customerDetails.lastName}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customerDetails.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerDetails.phone}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={customerDetails.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={customerDetails.city}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={customerDetails.state}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={customerDetails.pincode}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                      Landmark
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={customerDetails.landmark}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  style={{
                    width: '100%',
                    backgroundColor: processing ? '#ccc' : '#28a745',
                    color: 'white',
                    padding: '15px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    cursor: processing ? 'not-allowed' : 'pointer',
                    marginTop: '20px'
                  }}
                >
                  {processing ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <h2 style={{ marginBottom: '20px', color: '#333' }}>Order Summary</h2>
              <div style={{
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                padding: '20px',
                backgroundColor: '#f9f9f9'
              }}>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ marginBottom: '15px', color: '#333' }}>
                    Items ({orderSummary.itemCount})
                  </h3>
                  {cartItems.map((item) => (
                    <div key={item._id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 0',
                      borderBottom: '1px solid #eee'
                    }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '0.9rem', marginBottom: '5px' }}>
                          {item.productId.name}
                        </h4>
                        <p style={{ fontSize: '0.8rem', color: '#666', margin: '0' }}>
                          Qty: {item.quantity} × ₹{item.price.toLocaleString()}
                        </p>
                      </div>
                      <div style={{ fontWeight: '500' }}>
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '2px solid #ddd', paddingTop: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>Subtotal:</span>
                    <span>₹{orderSummary.subtotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>Shipping:</span>
                    <span>₹{orderSummary.shipping}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <span>Tax (GST 18%):</span>
                    <span>₹{orderSummary.tax.toLocaleString()}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    borderTop: '1px solid #ddd',
                    paddingTop: '15px'
                  }}>
                    <span>Total:</span>
                    <span style={{ color: '#28a745' }}>₹{orderSummary.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
