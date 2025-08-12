import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api';

const DebugPanel = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [logs, setLogs] = useState([]);
  const [showPanel, setShowPanel] = useState(false);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-20), `${timestamp}: ${message}`]);
  };

  useEffect(() => {
    addLog(`Auth state - isAuthenticated: ${isAuthenticated}, user: ${user?.email || 'null'}, loading: ${loading}`);
  }, [isAuthenticated, user, loading]);

  const testLogin = async () => {
    try {
      addLog('Starting login test...');
      const response = await api.post('/users/login', {
        email: 'test@test.com',
        password: 'test123'
      });
      addLog(`Login successful: ${response.data.user?.email}`);
    } catch (error) {
      addLog(`Login failed: ${error.message}`);
    }
  };

  const testCart = async () => {
    try {
      addLog('Testing cart API...');
      const response = await api.get('/cart');
      addLog(`Cart response: ${JSON.stringify(response.data)}`);
    } catch (error) {
      addLog(`Cart error: ${error.message}`);
    }
  };

  const checkStorage = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    addLog(`Storage - Token: ${token ? 'present' : 'null'}, User: ${user ? 'present' : 'null'}`);
  };

  if (!showPanel) {
    return (
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 9999,
        backgroundColor: 'blue',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '5px',
        cursor: 'pointer'
      }} onClick={() => setShowPanel(true)}>
        Debug
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      width: '400px',
      height: '300px',
      backgroundColor: 'rgba(0,0,0,0.9)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      zIndex: 9999,
      fontSize: '12px',
      overflow: 'auto'
    }}>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setShowPanel(false)} style={{ float: 'right' }}>X</button>
        <strong>Debug Panel</strong>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <button onClick={testLogin} style={{ marginRight: '5px' }}>Test Login</button>
        <button onClick={testCart} style={{ marginRight: '5px' }}>Test Cart</button>
        <button onClick={checkStorage}>Check Storage</button>
      </div>

      <div style={{ height: '200px', overflow: 'auto', backgroundColor: 'rgba(255,255,255,0.1)', padding: '5px' }}>
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default DebugPanel;
