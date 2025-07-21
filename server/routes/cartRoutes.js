const express = require('express');
const router = express.Router();
const { addToCart, getCart, updateCartItem, removeFromCart, clearCart } = require('../controllers/cartControllers');

// Add item to cart
router.post('/add', addToCart);

// Get cart items
router.get('/:userId', getCart);

// Update cart item quantity
router.put('/update/:userId/:productId', updateCartItem);

// Remove item from cart
router.delete('/remove/:userId/:productId', removeFromCart);

// Clear entire cart
router.delete('/clear/:userId', clearCart);

module.exports = router;
