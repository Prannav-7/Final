// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    console.log('=== AUTH MIDDLEWARE DEBUG ===');
    console.log('Authorization header:', req.header('Authorization'));
    
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Extracted token:', token ? `${token.substring(0, 20)}...` : 'null');
    
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied'
      });
    }

    // Verify token
    console.log('Using JWT secret:', process.env.JWT_SECRET || 'fallback_secret');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    console.log('Token decoded successfully:', decoded);
    
    // Get user from token
    const user = await User.findById(decoded.id).select('-password');
    console.log('User found:', user ? user.email : 'null');
    
    if (!user) {
      console.log('User not found in database');
      return res.status(401).json({
        success: false,
        message: 'Token is not valid'
      });
    }

    req.user = user;
    console.log('Auth middleware successful for:', user.email);
    console.log('=== END AUTH MIDDLEWARE DEBUG ===');
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    console.log('Token verification failed');
    console.log('=== END AUTH MIDDLEWARE DEBUG ===');
    res.status(401).json({
      success: false,
      message: 'Token is not valid'
    });
  }
};

module.exports = authMiddleware;
