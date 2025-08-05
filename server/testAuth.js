const mongoose = require('mongoose');
const axios = require('axios');

const testLogin = async () => {
  try {
    console.log('Testing login API...');
    
    const response = await axios.post('http://localhost:5000/api/users/login', {
      email: 'test@test.com',
      password: 'test123'
    });
    
    console.log('Login successful:', response.data);
    
    const token = response.data.token;
    console.log('Token received:', !!token);
    
    // Test cart add with token
    const cartResponse = await axios.post('http://localhost:5000/api/cart/add', {
      productId: '66b4bd0cf4a40b3b46d8f5dc', // Use a valid product ID from seeded data
      quantity: 1
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('Cart add response:', cartResponse.data);
    
  } catch (error) {
    console.error('Test failed:', error.response?.data || error.message);
  }
};

testLogin();
