const axios = require('axios');

const testAPI = async () => {
  try {
    console.log('Testing Profile Update API...');
    
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzFiYzA5YjRhYTljZjY1MmZkYTM5ZiIsImlhdCI6MTc1NzU4MzI0OSwiZXhwIjoxNzU3NjY5NjQ5fQ.sIILtX2RgrMk5JUeuFagC2gpJnSjkCRQtH7qeQj';
    
    // Test profile update
    const profileResponse = await axios.put('http://localhost:5000/api/users/profile', {
      name: 'Updated Test User',
      email: 'prannav@gmail.com'
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Profile Update Response:', profileResponse.data);
    
    // Test password update
    const passwordResponse = await axios.put('http://localhost:5000/api/users/password', {
      currentPassword: 'password123',
      newPassword: 'newpassword123'
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Password Update Response:', passwordResponse.data);
    
  } catch (error) {
    console.error('API Test Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
  }
};

testAPI();
