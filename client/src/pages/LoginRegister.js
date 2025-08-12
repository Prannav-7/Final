// src/pages/LoginRegister.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginRegister = () => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('LoginRegister: Form submitted', { isLogin, email: formData.email });

    try {
      if (!isLogin && formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      let result;
      if (isLogin) {
        console.log('LoginRegister: Attempting login...');
        result = await login(formData.email, formData.password);
      } else {
        console.log('LoginRegister: Attempting registration...');
        result = await register(formData.name, formData.email, formData.password);
      }

      console.log('LoginRegister: Auth result:', result);

      if (result.success) {
        setSuccess(isLogin ? 'Login successful!' : 'Registration successful!');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '900px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '600px'
      }}>
        {/* Left Side - Branding */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '60px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '30px' }}>
            <div style={{ 
              fontSize: '4rem',
              marginBottom: '20px'
            }}>
              ⚡
            </div>
            <h2 style={{ 
              margin: '0 0 15px 0', 
              fontSize: '2rem',
              fontWeight: 'bold'
            }}>
              JAI MARUTHI ELECTRICALS
            </h2>
            <p style={{ 
              margin: '0 0 30px 0', 
              fontSize: '1.1rem',
              opacity: 0.9
            }}>
              Your Trusted Partner for All Electrical Needs
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '15px',
            padding: '30px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '1.3rem' }}>
              Why Choose Us?
            </h3>
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ marginRight: '10px', fontSize: '1.2rem' }}>✅</span>
                <span>Genuine Products Only</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ marginRight: '10px', fontSize: '1.2rem' }}>🚚</span>
                <span>Fast & Free Delivery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ marginRight: '10px', fontSize: '1.2rem' }}>🔧</span>
                <span>Expert Technical Support</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ marginRight: '10px', fontSize: '1.2rem' }}>💯</span>
                <span>14+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div style={{ padding: '60px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h3 style={{ 
              margin: '0 0 10px 0', 
              fontSize: '2rem',
              color: '#333'
            }}>
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </h3>
            <p style={{ 
              margin: '0', 
              color: '#666',
              fontSize: '1rem'
            }}>
              {isLogin 
                ? 'Sign in to your account to continue shopping'
                : 'Join us to access exclusive deals and faster checkout'
              }
            </p>
          </div>

          {error && (
            <div style={{
              backgroundColor: '#fee',
              color: '#c33',
              padding: '15px',
              borderRadius: '10px',
              marginBottom: '20px',
              border: '1px solid #fcc',
              textAlign: 'center'
            }}>
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div style={{
              backgroundColor: '#efe',
              color: '#363',
              padding: '15px',
              borderRadius: '10px',
              marginBottom: '20px',
              border: '1px solid #cfc',
              textAlign: 'center'
            }}>
              ✅ {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#333'
                }}>
                  👤 Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                  placeholder="Enter your full name"
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    fontSize: '16px',
                    transition: 'border-color 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                />
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333'
              }}>
                ✉️ Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
                style={{
                  width: '100%',
                  padding: '15px',
                  border: '2px solid #e9ecef',
                  borderRadius: '10px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333'
              }}>
                🔒 Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '15px',
                  border: '2px solid #e9ecef',
                  borderRadius: '10px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
            </div>

            {!isLogin && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#333'
                }}>
                  🔒 Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                  placeholder="Confirm your password"
                  style={{
                    width: '100%',
                    padding: '15px',
                    border: '2px solid #e9ecef',
                    borderRadius: '10px',
                    fontSize: '16px',
                    transition: 'border-color 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                marginBottom: '20px'
              }}
            >
              {loading 
                ? '⏳ Processing...' 
                : isLogin 
                  ? '🚪 Sign In' 
                  : '📝 Create Account'
              }
            </button>

            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: '0', color: '#666' }}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#667eea',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontWeight: '500'
                  }}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>

            <div style={{ 
              textAlign: 'center', 
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid #eee'
            }}>
              <Link 
                to="/" 
                style={{ 
                  color: '#667eea', 
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                ← Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
