import React, { useState, useEffect } from 'react';
import api from '../api';

const CartDebug = () => {
  const [cartInfo, setCartInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCartInfo = async () => {
    try {
      setLoading(true);
      const response = await api.get('/cart');
      const cartData = response.data.success ? response.data.data : response.data.cart || response.data;
      
      const items = cartData.items || [];
      const manualCount = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
      
      setCartInfo({
        backendCount: cartData.itemCount,
        manualCount,
        itemsLength: items.length,
        items: items.map(item => ({
          name: item.productId?.name || 'Unknown',
          quantity: item.quantity || 0
        }))
      });
    } catch (error) {
      console.error('Debug: Error fetching cart:', error);
      setCartInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartInfo();
    // Refresh every 3 seconds for debugging
    const interval = setInterval(fetchCartInfo, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div style={{padding: '10px', background: '#f0f0f0'}}>Loading cart info...</div>;

  if (!cartInfo) return <div style={{padding: '10px', background: '#ffebee'}}>No cart data</div>;

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <h4>🛒 Cart Debug Info</h4>
      <p><strong>Backend Count:</strong> {cartInfo.backendCount}</p>
      <p><strong>Manual Count:</strong> {cartInfo.manualCount}</p>
      <p><strong>Items Array Length:</strong> {cartInfo.itemsLength}</p>
      <p><strong>Match:</strong> {cartInfo.backendCount === cartInfo.manualCount ? '✅' : '❌'}</p>
      <hr />
      <p><strong>Items:</strong></p>
      {cartInfo.items.map((item, index) => (
        <div key={index}>• {item.name}: {item.quantity}</div>
      ))}
      <button 
        onClick={fetchCartInfo} 
        style={{marginTop: '5px', padding: '2px 8px', fontSize: '10px'}}
      >
        Refresh
      </button>
    </div>
  );
};

export default CartDebug;
