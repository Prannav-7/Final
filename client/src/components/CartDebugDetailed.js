import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import api from '../api';

const CartDebugDetailed = () => {
  const [debugInfo, setDebugInfo] = useState({});
  const [logs, setLogs] = useState([]);
  const { user, isAuthenticated, loading: authLoading, login } = useAuth();
  const { cartItems, cartCount, addToCart, loading: cartLoading } = useCart();

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const testLoginAndCart = async () => {
    try {
      addLog('=== LOGIN AND CART TEST ===');
      
      // Test login first
      addLog('Testing login...');
      const loginResult = await login('test@example.com', 'password123');
      
      if (!loginResult.success) {
        // Try to register first
        addLog('Login failed, trying to register...');
        const userData = {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        };
        
        const registerResponse = await api.post('/users/register', userData);
        addLog(`Register response: ${JSON.stringify(registerResponse.data)}`);
        
        if (registerResponse.data.success) {
          // Try login again
          addLog('Registration successful, trying login again...');
          const secondLogin = await login('test@example.com', 'password123');
          addLog(`Second login result: ${secondLogin.success}`);
        }
      } else {
        addLog(`Login successful: ${loginResult.user.email}`);
      }
      
      // Wait a moment for auth state to update
      setTimeout(async () => {
        addLog('Auth state after login attempt:');
        addLog(`isAuthenticated: ${isAuthenticated}`);
        addLog(`user: ${JSON.stringify(user)}`);
        
        // Now try cart
        if (isAuthenticated) {
          addLog('User is authenticated, testing cart...');
          await testAddToCart();
        } else {
          addLog('User is not authenticated, cannot test cart');
        }
      }, 1000);
      
    } catch (error) {
      addLog(`ERROR in login and cart test: ${error.message}`);
    }
  };

  const testAuthStatus = () => {
    addLog('=== AUTH STATUS TEST ===');
    addLog(`isAuthenticated: ${isAuthenticated}`);
    addLog(`authLoading: ${authLoading}`);
    addLog(`user: ${JSON.stringify(user)}`);
    addLog(`token in localStorage: ${!!localStorage.getItem('token')}`);
    addLog(`user in localStorage: ${!!localStorage.getItem('user')}`);
    const token = localStorage.getItem('token');
    if (token) {
      addLog(`token preview: ${token.substring(0, 20)}...`);
    }
  };

  const testCartStatus = () => {
    addLog('=== CART STATUS TEST ===');
    addLog(`cartItems count: ${cartItems.length}`);
    addLog(`cartCount: ${cartCount}`);
    addLog(`cartLoading: ${cartLoading}`);
    addLog(`cartItems: ${JSON.stringify(cartItems)}`);
  };

  const testAddToCart = async () => {
    try {
      addLog('=== ADD TO CART TEST ===');
      
      // Get first product
      const products = await api.get('/products');
      const product = products.data.data[0];
      addLog(`Testing with product: ${product.name} (ID: ${product._id})`);
      
      // Test add to cart
      addLog('Calling addToCart...');
      const success = await addToCart(product._id, 1);
      addLog(`addToCart result: ${success}`);
      
      // Check cart after
      addLog(`Cart count after add: ${cartCount}`);
      addLog(`Cart items after add: ${cartItems.length}`);
      
    } catch (error) {
      addLog(`ERROR in test: ${error.message}`);
    }
  };

  const testDirectAPI = async () => {
    try {
      addLog('=== DIRECT API TEST ===');
      
      // Test direct API call
      const products = await api.get('/products');
      const product = products.data.data[0];
      addLog(`Testing direct API with product: ${product.name}`);
      
      const response = await api.post('/cart/add', {
        productId: product._id,
        quantity: 1
      });
      
      addLog(`Direct API response: ${JSON.stringify(response.data)}`);
      
      // Check cart via API
      const cartResponse = await api.get('/cart');
      addLog(`Cart via API: ${JSON.stringify(cartResponse.data)}`);
      
    } catch (error) {
      addLog(`ERROR in direct API test: ${error.message}`);
      addLog(`Error details: ${JSON.stringify(error.response?.data)}`);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', margin: '20px', borderRadius: '8px' }}>
      <h3>🔍 Cart Debug Tool</h3>
      
      <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#e1f5fe', borderRadius: '4px' }}>
        <strong>Current Status:</strong><br/>
        Auth: {isAuthenticated ? '✅ Logged in' : '❌ Not logged in'} | 
        Cart: {cartCount} items | 
        User: {user?.email || 'None'}
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={testAuthStatus} style={{ margin: '5px', padding: '10px' }}>
          Test Auth Status
        </button>
        <button onClick={testCartStatus} style={{ margin: '5px', padding: '10px' }}>
          Test Cart Status
        </button>
        <button onClick={testLoginAndCart} style={{ margin: '5px', padding: '10px', backgroundColor: '#4caf50', color: 'white' }}>
          Test Login + Cart
        </button>
        <button onClick={testAddToCart} style={{ margin: '5px', padding: '10px' }}>
          Test Add to Cart
        </button>
        <button onClick={testDirectAPI} style={{ margin: '5px', padding: '10px' }}>
          Test Direct API
        </button>
        <button onClick={() => setLogs([])} style={{ margin: '5px', padding: '10px', backgroundColor: '#ff6b6b', color: 'white' }}>
          Clear Logs
        </button>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '4px', maxHeight: '400px', overflowY: 'scroll' }}>
        <h4>Debug Logs:</h4>
        {logs.length === 0 ? (
          <p>No logs yet. Click a test button above.</p>
        ) : (
          logs.map((log, index) => (
            <div key={index} style={{ fontFamily: 'monospace', fontSize: '12px', margin: '2px 0', padding: '2px' }}>
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartDebugDetailed;
