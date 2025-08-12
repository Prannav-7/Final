// client/src/pages/WishlistPage.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchWishlist();
  }, [isAuthenticated, navigate]);

  const fetchWishlist = async () => {
    try {
      const response = await api.get('/wishlist');
      if (response.data.success) {
        setWishlist(response.data.data.products || []);
      }
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await api.delete(`/wishlist/remove/${productId}`);
      if (response.data.success) {
        setWishlist(prev => prev.filter(product => product._id !== productId));
        alert('Item removed from wishlist');
      }
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      alert('Failed to remove item from wishlist');
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await api.post('/cart/add', {
        productId,
        quantity: 1
      });
      
      if (response.data.success) {
        alert('Product added to cart successfully!');
      } else {
        alert('Failed to add product to cart');
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert('Error adding to cart');
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p>Loading wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: '#333' }}>
          ❤️ My Wishlist
        </h2>
        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>💔</div>
            <h3 style={{ marginBottom: '15px' }}>Your wishlist is empty</h3>
            <p style={{ marginBottom: '30px', color: '#666' }}>
              Start adding products you love to your wishlist!
            </p>
            <Link 
              to="/products" 
              style={{
                backgroundColor: '#667eea',
                color: 'white',
                padding: '12px 30px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: '500',
                display: 'inline-block'
              }}
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '20px' 
          }}>
            {wishlist.map((product) => (
              <div key={product._id} style={{
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                padding: '15px',
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                position: 'relative'
              }}>
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    color: '#ff4757',
                    zIndex: 1
                  }}
                  title="Remove from wishlist"
                >
                  ×
                </button>
                
                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img 
                    src={product.image || '/images/default-product.jpg'} 
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      marginBottom: '15px'
                    }}
                    onError={(e) => {
                      e.target.src = '/images/default-product.jpg';
                    }}
                  />
                  
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    marginBottom: '10px',
                    color: '#333',
                    lineHeight: '1.4'
                  }}>
                    {product.name}
                  </h3>
                  
                  <p style={{
                    color: '#666',
                    fontSize: '0.9rem',
                    marginBottom: '10px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {product.description}
                  </p>
                  
                  <div style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: '#667eea',
                    marginBottom: '15px'
                  }}>
                    ₹{product.price?.toLocaleString()}
                    {product.mrp && product.mrp > product.price && (
                      <span style={{
                        fontSize: '0.9rem',
                        fontWeight: '400',
                        color: '#999',
                        textDecoration: 'line-through',
                        marginLeft: '8px'
                      }}>
                        ₹{product.mrp.toLocaleString()}
                      </span>
                    )}
                  </div>
                </Link>
                
                <button
                  onClick={() => addToCart(product._id)}
                  style={{
                    width: '100%',
                    backgroundColor: '#667eea',
                    color: 'white',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#5a6fd8'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
