// src/components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useAdmin } from '../hooks/useAdmin';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const { isAdmin } = useAdmin();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const clearTokens = () => {
    console.log('Clearing all tokens and user data');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    logout();
    window.location.reload();
  };

  return (
    <>
      {/* Top Bar - Meesho Style */}
      <div style={{
        background: 'linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)',
        color: 'white',
        padding: '8px 0',
        fontSize: '13px',
        fontWeight: '500'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '16px' }}>📞</span> +91 98765 43210
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '16px' }}>✉️</span> info@jaimaruthielectricals.com
              </span>
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                background: 'rgba(255,255,255,0.1)',
                padding: '4px 12px',
                borderRadius: '12px'
              }}>
                <span style={{ fontSize: '16px' }}>🚚</span> Free Delivery on orders above ₹2000
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '16px' }}>⏰</span> Mon-Sun: 8:30 AM - 8:30 PM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Enhanced Meesho Style */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        color: '#2c3e50',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '16px 0'
          }}>
            {/* Logo - Enhanced */}
            <Link to="/" style={{ textDecoration: 'none', color: '#2c3e50' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  fontSize: '2.2rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: '16px',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
                }}>
                  ⚡
                </div>
                <div>
                  <h1 style={{ 
                    margin: 0, 
                    fontSize: '1.6rem', 
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: '1.2'
                  }}>
                    JAI MARUTHI ELECTRICALS
                  </h1>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '0.85rem', 
                    color: '#666',
                    fontWeight: '500'
                  }}>
                    Your Trusted Electrical Partner
                  </p>
                </div>
              </div>
            </Link>

            {/* Search Bar - Meesho Style */}
            <div style={{ 
              flex: 1, 
              maxWidth: '500px', 
              margin: '0 40px',
              position: 'relative'
            }}>
              <div style={{
                position: 'relative',
                background: '#f8f9fa',
                borderRadius: '50px',
                overflow: 'hidden',
                border: '2px solid transparent',
                transition: 'all 0.3s ease'
              }}>
                <input
                  type="text"
                  placeholder="Search for electrical products, switches, lights..."
                  style={{
                    width: '100%',
                    padding: '14px 60px 14px 24px',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '14px',
                    outline: 'none',
                    fontWeight: '500'
                  }}
                  onFocus={(e) => {
                    e.target.parentElement.style.borderColor = '#667eea';
                    e.target.parentElement.style.background = 'white';
                  }}
                  onBlur={(e) => {
                    e.target.parentElement.style.borderColor = 'transparent';
                    e.target.parentElement.style.background = '#f8f9fa';
                  }}
                />
                <button style={{
                  position: 'absolute',
                  right: '6px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-50%) scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(-50%) scale(1)'}
                >
                  🔍
                </button>
              </div>
            </div>

            {/* User Actions - Enhanced */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Cart */}
              <Link to="/cart" style={{ 
                color: '#2c3e50', 
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '12px 16px',
                borderRadius: '16px',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#2c3e50';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <span style={{ fontSize: '1.4rem' }}>🛒</span>
                <span style={{ fontSize: '11px', fontWeight: '600' }}>Cart</span>
                {/* Cart Badge */}
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '6px',
                    right: '10px',
                    background: '#ff6b6b',
                    color: 'white',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}>
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Wishlist */}
              <Link to="/wishlist" style={{ 
                color: '#2c3e50', 
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '12px 16px',
                borderRadius: '16px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#2c3e50';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <span style={{ fontSize: '1.4rem' }}>❤️</span>
                <span style={{ fontSize: '11px', fontWeight: '600' }}>Wishlist</span>
              </Link>

              {/* User Account - Enhanced */}
              <div style={{ position: 'relative', marginLeft: '8px' }}>
                {isAuthenticated ? (
                  <div>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        color: 'white',
                        padding: '12px 20px',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontWeight: '600',
                        fontSize: '14px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                      }}
                    >
                      <span style={{ 
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '50%',
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px'
                      }}>👤</span>
                      <span>{user?.name?.split(' ')[0] || 'Account'}</span>
                      <span style={{ fontSize: '12px', opacity: '0.8' }}>▼</span>
                    </button>
                    
                    {showUserMenu && (
                      <div style={{
                        position: 'absolute',
                        top: '110%',
                        right: 0,
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(20px)',
                        color: '#2c3e50',
                        borderRadius: '16px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                        minWidth: '220px',
                        zIndex: 1000,
                        border: '1px solid rgba(255,255,255,0.2)',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          padding: '20px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}>
                          Welcome, {user?.name}! 👋
                          {isAdmin && (
                            <div style={{
                              marginTop: '8px',
                              padding: '4px 8px',
                              background: 'rgba(255, 255, 255, 0.2)',
                              borderRadius: '12px',
                              fontSize: '12px',
                              textAlign: 'center'
                            }}>
                              🔑 Administrator Access
                            </div>
                          )}
                        </div>
                        
                        <Link to="/account" style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '16px 20px', 
                          textDecoration: 'none', 
                          color: '#2c3e50',
                          borderBottom: '1px solid #f0f0f0',
                          fontSize: '14px',
                          fontWeight: '500',
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => setShowUserMenu(false)}
                        onMouseOver={(e) => e.target.style.background = '#f8f9fa'}
                        onMouseOut={(e) => e.target.style.background = 'transparent'}
                        >
                          <span style={{ fontSize: '16px' }}>👤</span> My Account
                        </Link>

                        {/* Admin Dashboard Link - Only for Admin */}
                        {isAdmin && (
                          <Link to="/admin" style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '16px 20px', 
                            textDecoration: 'none', 
                            color: '#667eea',
                            borderBottom: '1px solid #f0f0f0',
                            fontSize: '14px',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            background: 'rgba(102, 126, 234, 0.05)'
                          }}
                          onClick={() => setShowUserMenu(false)}
                          onMouseOver={(e) => {
                            e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                            e.target.style.color = '#764ba2';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.background = 'rgba(102, 126, 234, 0.05)';
                            e.target.style.color = '#667eea';
                          }}
                          >
                            <span style={{ fontSize: '16px' }}>🔧</span> Admin Dashboard
                          </Link>
                        )}
                        
                        <Link to="/orders" style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '16px 20px', 
                          textDecoration: 'none', 
                          color: '#2c3e50',
                          borderBottom: '1px solid #f0f0f0',
                          fontSize: '14px',
                          fontWeight: '500',
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => setShowUserMenu(false)}
                        onMouseOver={(e) => e.target.style.background = '#f8f9fa'}
                        onMouseOut={(e) => e.target.style.background = 'transparent'}
                        >
                          <span style={{ fontSize: '16px' }}>📦</span> My Orders
                        </Link>
                        
                        <button
                          onClick={handleLogout}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '16px 20px',
                            border: 'none',
                            background: 'none',
                            textAlign: 'left',
                            cursor: 'pointer',
                            color: '#dc3545',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseOver={(e) => e.target.style.background = '#fff5f5'}
                          onMouseOut={(e) => e.target.style.background = 'transparent'}
                        >
                          <span style={{ fontSize: '16px' }}>🚪</span> Logout
                        </button>
                      </div>
                    )}
                  </div>
                  ) : (
                  <button
                    onClick={handleLogin}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      color: 'white',
                      padding: '12px 24px',
                      borderRadius: '50px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '14px',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                    }}
                  >
                    👤 Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Menu - Meesho Style */}
      <nav style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #f0f0f0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '0',
            padding: '0',
            flexWrap: 'wrap'
          }}>
            {[
              { path: '/', label: '🏠 Home', icon: '🏠', isPublic: true },
              { path: `/products?category=${encodeURIComponent('Electrical Goods')}`, label: '⚡ Electrical', icon: '⚡', isPublic: true },
              { path: `/products?category=${encodeURIComponent('Switches & Sockets')}`, label: '🔌 Switches', icon: '🔌', isPublic: true },
              { path: `/products?category=${encodeURIComponent('Lighting Solutions')}`, label: '💡 Lighting', icon: '💡', isPublic: true },
              { path: `/products?category=${encodeURIComponent('Hardware & Tools')}`, label: '🔧 Tools', icon: '🔧', isPublic: true },
              { path: '/admin', label: '🔧 Admin Panel', icon: '🔧', isPublic: false, adminOnly: true },
              { path: '/add-product', label: '➕ Add Product', icon: '➕', isPublic: false, adminOnly: true },
              { path: '/about', label: 'ℹ️ About', icon: 'ℹ️', isPublic: true }
            ].filter(item => {
              // Filter out admin-only items if user is not admin
              if (item.adminOnly) {
                return isAdmin;
              }
              return true;
            }).map((item, index) => (
              <Link key={index} to={item.path} style={{ 
                textDecoration: 'none', 
                color: '#2c3e50', 
                fontWeight: '600',
                padding: '16px 20px',
                borderRadius: '0',
                transition: 'all 0.3s ease',
                fontSize: '14px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#2c3e50';
                e.target.style.transform = 'translateY(0)';
              }}
              >
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                <span>{item.label.replace(item.icon + ' ', '')}</span>
                {/* Admin badge for admin-only items */}
                {item.adminOnly && (
                  <span style={{
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: '700',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    marginLeft: '4px'
                  }}>
                    ADMIN
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
