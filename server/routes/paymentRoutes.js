const express = require('express');
const router = express.Router();
const {
  createPaymentOrder,
  verifyPayment,
  createUPIOrder,
  verifyUPIPayment,
  getPaymentMethods
} = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

// Get available payment methods
router.get('/methods', getPaymentMethods);

// Create Razorpay order
router.post('/create-order', authMiddleware, createPaymentOrder);

// Create UPI order
router.post('/create-upi-order', authMiddleware, createUPIOrder);

// Verify payment
router.post('/verify', authMiddleware, verifyPayment);

// Verify UPI payment
router.post('/verify-upi', authMiddleware, verifyUPIPayment);

module.exports = router;
