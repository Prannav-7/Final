const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder
} = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// Create new order
router.post('/', authMiddleware, createOrder);

// Get user's orders
router.get('/', authMiddleware, getUserOrders);

// Get specific order
router.get('/:orderId', authMiddleware, getOrderById);

// Cancel order
router.put('/:orderId/cancel', authMiddleware, cancelOrder);

module.exports = router;