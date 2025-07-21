const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

// Get user's wishlist
router.get('/:userId', wishlistController.getWishlist);

// Add product to wishlist
router.post('/:userId', wishlistController.addToWishlist);

// Remove product from wishlist
router.delete('/:userId/:productId', wishlistController.removeFromWishlist);

// Clear entire wishlist
router.delete('/clear/:userId', wishlistController.clearWishlist);

module.exports = router;
