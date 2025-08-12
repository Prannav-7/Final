// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        if (response.data.success) {
          // Show first 8 products as featured
          setFeaturedProducts(response.data.data.slice(0, 8));
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
    
    // Add scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-reveal class after a short delay
    setTimeout(() => {
      const scrollElements = document.querySelectorAll('.scroll-reveal');
      scrollElements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      const scrollElements = document.querySelectorAll('.scroll-reveal');
      scrollElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const categories = [
    { 
      name: 'Electrical Goods', 
      icon: '⚡', 
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)', 
      path: `/products?category=${encodeURIComponent('Electrical Goods')}`,
      description: 'Quality electrical components'
    },
    { 
      name: 'Switches & Sockets', 
      icon: '🔌', 
      gradient: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)', 
      path: `/products?category=${encodeURIComponent('Switches & Sockets')}`,
      description: 'Modern switches & outlets'
    },
    { 
      name: 'Lighting Solutions', 
      icon: '💡', 
      gradient: 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)', 
      path: `/products?category=${encodeURIComponent('Lighting Solutions')}`,
      description: 'Bright & energy efficient'
    },
    { 
      name: 'Fans & Ventilation', 
      icon: '🌀', 
      gradient: 'linear-gradient(135deg, #48dbfb 0%, #0abde3 100%)', 
      path: `/products?category=${encodeURIComponent('Fans & Ventilation')}`,
      description: 'Cool & comfortable living'
    },
    { 
      name: 'Wiring & Cables', 
      icon: '🔗', 
      gradient: 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)', 
      path: `/products?category=${encodeURIComponent('Wiring & Cables')}`,
      description: 'Safe & reliable connections'
    },
    { 
      name: 'Hardware & Tools', 
      icon: '🔧', 
      gradient: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)', 
      path: `/products?category=${encodeURIComponent('Hardware & Tools')}`,
      description: 'Professional grade tools'
    },
    { 
      name: 'Power Tools', 
      icon: '⚒️', 
      gradient: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)', 
      path: `/products?category=${encodeURIComponent('Power Tools')}`,
      description: 'Heavy-duty power tools'
    },
    { 
      name: 'Safety Equipment', 
      icon: '🦺', 
      gradient: 'linear-gradient(135deg, #00b894 0%, #55a3ff 100%)', 
      path: `/products?category=${encodeURIComponent('Safety Equipment')}`,
      description: 'Workplace safety first'
    }
  ];

  const offers = [
    { text: "🎉 Grand Opening Sale - Up to 50% OFF", color: "#ff6b6b" },
    { text: "🚚 FREE Delivery on orders above ₹999", color: "#4ecdc4" },
    { text: "⚡ Same Day Delivery Available", color: "#feca57" },
    { text: "🏆 Trusted by 10,000+ Customers", color: "#667eea" }
  ];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f8f9fb', minHeight: '100vh' }}>
      <Header />

      {/* Hero Section - Meesho Style */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff6b6b 100%)',
        color: 'white',
        padding: '60px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div className="bg-element" style={{
          top: '20%',
          left: '10%',
          width: '100px',
          height: '100px'
        }}></div>
        <div className="bg-element" style={{
          top: '60%',
          right: '15%',
          width: '150px',
          height: '150px'
        }}></div>
        <div className="bg-element" style={{
          top: '40%',
          left: '70%',
          width: '80px',
          height: '80px'
        }}></div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            {/* Left Content */}
            <div>
              <h1 className="hero-title" style={{ 
                fontSize: '3.5rem', 
                margin: '0 0 20px 0', 
                fontWeight: '800',
                background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: '1.2'
              }}>
                <span className="animated-icon">⚡</span> JAI MARUTHI ELECTRICALS
              </h1>
              <p className="hero-subtitle" style={{ 
                fontSize: '1.4rem', 
                margin: '0 0 30px 0', 
                opacity: '0.9',
                lineHeight: '1.6',
                fontWeight: '400'
              }}>
                Discover premium electrical solutions at unbeatable prices. 
                Your one-stop shop for quality electrical goods!
              </p>

              {/* Offer Tags */}
              <div className="hero-buttons" style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '12px', 
                marginBottom: '40px' 
              }}>
                {offers.map((offer, index) => (
                  <span key={index} className="offer-tag stagger-item" style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    padding: '10px 16px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    {offer.text}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="hero-buttons" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link 
                  to="/products" 
                  className="modern-btn btn-primary"
                  style={{
                    backgroundColor: '#fff',
                    color: '#667eea',
                    padding: '16px 32px',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                    border: 'none'
                  }}
                >
                  🛒 Shop Now
                </Link>
                <Link 
                  to="/about" 
                  className="modern-btn"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    padding: '16px 32px',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    border: '2px solid rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  ℹ️ Learn More
                </Link>
              </div>
            </div>

            {/* Right Content - Stats */}
            <div className="hero-stats stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {[
                { number: '10K+', text: 'Happy Customers', icon: '😊' },
                { number: '5000+', text: 'Products', icon: '📦' },
                { number: '24/7', text: 'Support', icon: '🎧' },
                { number: '99%', text: 'Satisfaction', icon: '⭐' }
              ].map((stat, index) => (
                <div key={index} className="stat-card stagger-item" style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  padding: '30px 20px',
                  borderRadius: '20px',
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <div className="animated-icon" style={{ fontSize: '2rem', marginBottom: '10px' }}>{stat.icon}</div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '5px' }}>{stat.number}</div>
                  <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>{stat.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 20px' }}>
        {/* Categories Section - Meesho Style */}
        <section className="scroll-reveal" style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              color: '#2c3e50',
              fontWeight: '700',
              marginBottom: '16px'
            }}>
              Shop by Category
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              Explore our wide range of electrical products designed to meet all your needs
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '24px' 
          }}>
            {categories.map((category, index) => (
              <Link key={index} to={category.path} style={{ textDecoration: 'none' }}>
                <div className={`category-card hover-lift stagger-item`} style={{
                  background: category.gradient,
                  color: 'white',
                  padding: '32px 24px',
                  borderRadius: '24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  {/* Background Pattern */}
                  <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-20%',
                    width: '150px',
                    height: '150px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%'
                  }}></div>
                  
                  <div className="animated-icon" style={{ fontSize: '4rem', marginBottom: '16px', position: 'relative' }}>
                    {category.icon}
                  </div>
                  <h3 style={{ 
                    margin: '0 0 8px 0', 
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    position: 'relative'
                  }}>
                    {category.name}
                  </h3>
                  <p style={{ 
                    margin: '0', 
                    fontSize: '0.9rem', 
                    opacity: '0.9',
                    position: 'relative'
                  }}>
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products - Meesho Style */}
        <section className="scroll-reveal">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              color: '#2c3e50',
              fontWeight: '700',
              marginBottom: '16px'
            }}>
              🔥 Trending Products
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              Handpicked products that our customers love the most
            </p>
          </div>

          {loading ? (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '300px',
              flexDirection: 'column'
            }}>
              <div className="loading-spinner"></div>
              <p style={{ marginTop: '20px', color: '#666', fontSize: '1.1rem' }}>
                Loading amazing products...
              </p>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '32px' 
            }}>
              {featuredProducts.map((product, index) => (
                <div key={product._id} className={`modern-card hover-lift product-card stagger-item`} style={{
                  borderRadius: '24px',
                  padding: '0',
                  overflow: 'hidden',
                  position: 'relative',
                  background: 'white',
                  animationDelay: `${index * 0.1}s`
                }}>
                  {/* Product Image */}
                  <div style={{
                    width: '100%',
                    height: '240px',
                    background: `linear-gradient(45deg, #f8f9fa, #e9ecef)`,
                    backgroundImage: `url(${product.imageUrl ? `http://localhost:5000${product.imageUrl}` : '/images/default-product.jpg'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    borderRadius: '20px 20px 0 0'
                  }}>
                    {/* Discount Badge */}
                    {product.originalPrice && (
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '50%',
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      {product.category === 'Electrical Goods' && '⚡'}
                      {product.category === 'Switches & Sockets' && '🔌'}
                      {product.category === 'Lighting Solutions' && '💡'}
                      {product.category === 'Fans & Ventilation' && '🌀'}
                      {product.category === 'Wiring & Cables' && '🔗'}
                      {product.category === 'Hardware & Tools' && '🔧'}
                      {product.category === 'Power Tools' && '⚒️'}
                      {product.category === 'Electrical Motors' && '⚙️'}
                    </div>

                    {/* Wishlist Button */}
                    <button style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      background: 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(10px)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '1.2rem'
                    }}>
                      🤍
                    </button>
                  </div>

                  {/* Product Details */}
                  <div style={{ padding: '24px' }}>
                    <div style={{ 
                      display: 'inline-block',
                      backgroundColor: '#f8f9fa', 
                      color: '#666', 
                      padding: '4px 12px', 
                      borderRadius: '16px', 
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      marginBottom: '12px'
                    }}>
                      {product.category}
                    </div>
                    
                    <h4 style={{ 
                      margin: '0 0 12px 0', 
                      fontSize: '1.2rem', 
                      color: '#2c3e50',
                      fontWeight: '600',
                      lineHeight: '1.4'
                    }}>
                      {product.name}
                    </h4>
                    
                    <p style={{ 
                      color: '#666', 
                      fontSize: '0.9rem', 
                      margin: '0 0 20px 0', 
                      lineHeight: '1.5',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {product.description}
                    </p>
                    
                    {/* Price */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                      <span style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: '700', 
                        color: '#2c3e50'
                      }}>
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span style={{ 
                          fontSize: '1rem', 
                          color: '#999', 
                          textDecoration: 'line-through'
                        }}>
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <Link 
                        to={`/products/${product._id}`}
                        className="modern-btn"
                        style={{
                          flex: 1,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          textDecoration: 'none',
                          fontWeight: '600'
                        }}
                      >
                        View Details
                      </Link>
                      <button 
                        className="modern-btn btn-success"
                        style={{
                          background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                          color: 'white',
                          border: 'none',
                          fontWeight: '600'
                        }}
                      >
                        🛒
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="modern-card" style={{ 
              textAlign: 'center', 
              padding: '60px', 
              color: '#666' 
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📦</div>
              <h3 style={{ marginBottom: '12px', color: '#2c3e50' }}>No Products Yet</h3>
              <p>We're working hard to bring you amazing products. Check back soon!</p>
            </div>
          )}
        </section>
      </div>

      {/* Footer Call to Action */}
      <section style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '16px', fontWeight: '600' }}>
            Ready to Start Shopping?
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '30px', opacity: '0.9' }}>
            Join thousands of satisfied customers who trust us for their electrical needs
          </p>
          <Link 
            to="/products" 
            className="modern-btn"
            style={{
              backgroundColor: '#fff',
              color: '#2c3e50',
              padding: '16px 40px',
              fontSize: '1.1rem',
              fontWeight: '700',
              borderRadius: '50px',
              textDecoration: 'none'
            }}
          >
            🛒 Explore All Products
          </Link>
        </div>
      </section>

      {/* Enhanced Animation Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes rotateY {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); }
          50% { box-shadow: 0 0 40px rgba(102, 126, 234, 0.6), 0 0 60px rgba(102, 126, 234, 0.4); }
        }

        /* Loading Spinner */
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Modern Card Hover Effects */
        .modern-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          animation: fadeInUp 0.6s ease-out;
        }

        .modern-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }

        .modern-card:hover::before {
          left: 100%;
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .hover-lift:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          z-index: 10;
        }

        /* Modern Button Styles */
        .modern-btn {
          display: inline-block;
          padding: 12px 24px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          text-align: center;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }

        .modern-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .modern-btn:hover::before {
          left: 100%;
        }

        .modern-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .modern-btn:active {
          transform: translateY(-1px);
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-success {
          background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
          color: white;
        }

        /* Animated Background Elements */
        .bg-element {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float 6s ease-in-out infinite;
        }

        .bg-element:nth-child(2) {
          animation-delay: -2s;
          animation-duration: 8s;
        }

        .bg-element:nth-child(3) {
          animation-delay: -4s;
          animation-duration: 10s;
        }

        /* Category Card Animations */
        .category-card {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .category-card::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          transition: all 0.4s ease;
          transform: translate(-50%, -50%);
        }

        .category-card:hover::after {
          width: 300px;
          height: 300px;
        }

        .category-card:hover {
          transform: scale(1.05);
        }

        /* Product Card Animations */
        .product-card {
          transition: all 0.3s ease;
          animation: scaleIn 0.5s ease-out;
        }

        .product-card:hover {
          animation: pulse 2s infinite;
        }

        /* Staggered Animation for Lists */
        .stagger-item:nth-child(1) { animation-delay: 0.1s; }
        .stagger-item:nth-child(2) { animation-delay: 0.2s; }
        .stagger-item:nth-child(3) { animation-delay: 0.3s; }
        .stagger-item:nth-child(4) { animation-delay: 0.4s; }
        .stagger-item:nth-child(5) { animation-delay: 0.5s; }
        .stagger-item:nth-child(6) { animation-delay: 0.6s; }
        .stagger-item:nth-child(7) { animation-delay: 0.7s; }
        .stagger-item:nth-child(8) { animation-delay: 0.8s; }

        /* Offer Tags Animation */
        .offer-tag {
          animation: slideInLeft 0.5s ease-out;
          transition: all 0.3s ease;
        }

        .offer-tag:hover {
          transform: scale(1.1);
          animation: bounce 1s infinite;
        }

        /* Stats Animation */
        .stat-card {
          animation: fadeInUp 0.6s ease-out;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .stat-card:hover {
          animation: glow 2s infinite;
        }

        /* Icon Animations */
        .animated-icon {
          display: inline-block;
          transition: all 0.3s ease;
        }

        .animated-icon:hover {
          animation: rotateY 1s ease-in-out;
        }

        /* Scroll Reveal Animation */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.6s ease;
        }

        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* Hero Content Animation */
        .hero-title {
          animation: slideInLeft 1s ease-out;
        }

        .hero-subtitle {
          animation: slideInLeft 1s ease-out 0.2s both;
        }

        .hero-buttons {
          animation: slideInLeft 1s ease-out 0.4s both;
        }

        .hero-stats {
          animation: slideInRight 1s ease-out 0.6s both;
        }

        /* Responsive Animations */
        @media (max-width: 768px) {
          .hero-grid { 
            grid-template-columns: 1fr !important; 
            gap: 40px !important;
          }
          
          .stats-grid { 
            grid-template-columns: 1fr 1fr !important; 
          }
          
          .modern-card {
            margin: 0 10px;
          }
          
          .hover-lift:hover {
            transform: translateY(-8px) scale(1.01);
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .modern-card {
            background: #1a1a1a;
            color: white;
          }
        }

        /* Performance optimizations */
        * {
          will-change: auto;
        }

        .modern-card, .category-card, .product-card {
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}

export default Home;
