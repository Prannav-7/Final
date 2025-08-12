import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

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
        setTotal(cart.total || 0);
        setItemCount(cart.items ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0);
      } else {
        setCartItems([]);
        setTotal(0);
        setItemCount(0);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to load cart items');
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 0) return;

    try {
      const response = await api.put(
        `/cart/update/${productId}`,
        { quantity: newQuantity }
      );

      if (response.data.success) {
        await fetchCartItems(); // Refresh cart data
      } else {
        alert(response.data.error || 'Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    }
  };

  const removeItem = async (productId, productName) => {
    if (window.confirm(`Remove "${productName}" from cart?`)) {
      try {
        const response = await api.delete(
          `/cart/remove/${productId}`
        );

        if (response.data.success) {
          await fetchCartItems(); // Refresh cart data
          alert('Item removed from cart');
        } else {
          alert(response.data.error || 'Failed to remove item');
        }
      } catch (error) {
        console.error('Error removing item:', error);
        alert('Failed to remove item');
      }
    }
  };

  const clearCart = async () => {
    if (window.confirm('Are you sure you want to clear all items from your cart?')) {
      try {
        const response = await api.delete('/cart/clear');

        if (response.data.success) {
          setCartItems([]);
          setTotal(0);
          setItemCount(0);
          alert('Cart cleared successfully');
        } else {
          alert(response.data.error || 'Failed to clear cart');
        }
      } catch (error) {
        console.error('Error clearing cart:', error);
        alert('Failed to clear cart');
      }
    }
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ color: '#666', fontSize: '18px' }}>Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Header />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {/* Cart Header */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ 
                margin: 0, 
                fontSize: '2.5rem', 
                color: '#333',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                🛒 Shopping Cart
              </h1>
              <p style={{ margin: '10px 0 0 0', color: '#666', fontSize: '16px' }}>
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Total Amount</div>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: '#667eea',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                ₹{total.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#ffe6e6',
            color: '#d63031',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>❌ {error}</span>
            <button 
              onClick={fetchCartItems}
              style={{
                backgroundColor: '#d63031',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </div>
        )}

        {cartItems.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            padding: '60px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🛒</div>
            <h2 style={{ color: '#333', marginBottom: '15px' }}>Your cart is empty</h2>
            <p style={{ color: '#666', marginBottom: '30px', fontSize: '16px' }}>
              Looks like you haven't added any products to your cart yet.
            </p>
            <button 
              onClick={() => navigate('/products')}
              style={{
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              🛍️ Start Shopping
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <button 
                onClick={() => navigate('/products')}
                style={{
                  backgroundColor: 'transparent',
                  color: '#667eea',
                  border: '2px solid #667eea',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                ← Continue Shopping
              </button>
              <button 
                onClick={clearCart}
                style={{
                  backgroundColor: '#ff4757',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                🗑️ Clear Cart
              </button>
            </div>

            {/* Cart Items */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
              {cartItems.map((item, index) => (
                <div key={item._id} style={{
                  padding: '25px',
                  borderBottom: index < cartItems.length - 1 ? '1px solid #eee' : 'none',
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr auto',
                  gap: '20px',
                  alignItems: 'center'
                }}>
                  {/* Product Image */}
                  <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#f8f9fa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img
                      src={item.productId?.imageUrl || '/images/products/default-product.png'}
                      alt={item.productId?.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.src = '/images/default-product.svg';
                      }}
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div>
                    <h3 style={{ 
                      margin: '0 0 8px 0', 
                      fontSize: '18px', 
                      color: '#333',
                      fontWeight: '600'
                    }}>
                      {item.productId?.name}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <span style={{ color: '#666', fontSize: '14px' }}>
                        📦 {item.productId?.category}
                      </span>
                      <span style={{ color: '#666', fontSize: '14px' }}>
                        🏢 {item.productId?.brand}
                      </span>
                      <div style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        backgroundColor: item.productId?.stock > 0 ? '#d4edda' : '#f8d7da',
                        color: item.productId?.stock > 0 ? '#155724' : '#721c24',
                        fontSize: '12px',
                        fontWeight: '500',
                        marginTop: '8px'
                      }}>
                        {item.productId?.stock > 0 ? `✅ ${item.productId.stock} in stock` : '❌ Out of stock'}
                      </div>
                    </div>
                  </div>

                  {/* Price and Quantity Controls */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      fontSize: '20px', 
                      fontWeight: 'bold', 
                      color: '#333',
                      marginBottom: '15px'
                    }}>
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      justifyContent: 'flex-end',
                      marginBottom: '15px'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                        style={{
                          backgroundColor: '#f8f9fa',
                          border: '1px solid #dee2e6',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '16px'
                        }}
                      >
                        −
                      </button>
                      
                      <span style={{
                        backgroundColor: '#f8f9fa',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        fontWeight: '500',
                        minWidth: '40px',
                        textAlign: 'center'
                      }}>
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                        style={{
                          backgroundColor: '#f8f9fa',
                          border: '1px solid #dee2e6',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '16px'
                        }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.productId._id)}
                      style={{
                        backgroundColor: 'transparent',
                        color: '#dc3545',
                        border: '1px solid #dc3545',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Section */}
            <div style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                borderTop: '2px solid #f8f9fa',
                paddingTop: '20px'
              }}>
                <div>
                  <div style={{ fontSize: '18px', color: '#666', marginBottom: '5px' }}>
                    Total ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#667eea' }}>
                    ₹{total.toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={proceedToCheckout}
                  style={{
                    backgroundColor: '#667eea',
                    color: 'white',
                    border: 'none',
                    padding: '15px 40px',
                    borderRadius: '25px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                  }}
                >
                  🛒 Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
                        <span className="in-stock">✅ In Stock ({item.productId.stock})</span>
                      ) : (
                        <span className="out-of-stock">❌ Out of Stock</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="item-price">
                    <span className="unit-price">₹{item.price?.toLocaleString()}</span>
                    <span className="price-unit">per {item.productId?.unit}</span>
                  </div>
                  
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                      className="quantity-btn"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                      className="quantity-btn"
                      disabled={item.quantity >= item.productId?.stock}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="item-total">
                    <span className="total-price">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="item-actions">
                    <button
                      onClick={() => removeItem(item.productId._id, item.productId.name)}
                      className="remove-btn"
                      title="Remove item"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <div className="total-breakdown">
                  <div className="subtotal">
                    <span>Subtotal ({itemCount} items):</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                  <div className="shipping">
                    <span>Shipping:</span>
                    <span>{total > 500 ? 'Free' : '₹50'}</span>
                  </div>
                  <div className="total">
                    <span>Total:</span>
                    <span>₹{(total + (total > 500 ? 0 : 50)).toLocaleString()}</span>
                  </div>
                </div>
                
                <button 
                  onClick={proceedToCheckout}
                  className="checkout-btn"
                >
                  Proceed to Checkout →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
