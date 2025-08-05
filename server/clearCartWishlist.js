const mongoose = require('mongoose');
const Cart = require('./models/Cart');
const Wishlist = require('./models/Wishlist');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/electric_store')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const clearCartAndWishlist = async () => {
  try {
    await Cart.deleteMany({});
    await Wishlist.deleteMany({});
    console.log('All cart and wishlist data cleared successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error clearing data:', error);
    process.exit(1);
  }
};

clearCartAndWishlist();
