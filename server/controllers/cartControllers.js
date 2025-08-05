const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add item to cart
const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.user._id;
  
  try {
    let cart = await Cart.findOne({ userId });
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }
    
    if (product.stock < quantity) {
      return res.status(400).json({ 
        success: false,
        message: 'Insufficient stock' 
      });
    }

    if (!cart) {
      cart = new Cart({ 
        userId, 
        items: [{ productId, quantity, price: product.price }] 
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity, price: product.price });
      }
    }
    
    await cart.save();
    await cart.populate('items.productId');
    
    res.json({ 
      success: true,
      message: 'Item added to cart successfully', 
      cart 
    });
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Something went wrong' 
    });
  }
};

// Get cart items
const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    
    if (!cart) {
      return res.json({ 
        success: true,
        data: { userId, items: [], total: 0 }
      });
    }

    // Calculate total
    const total = cart.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    res.json({ 
      success: true,
      data: { ...cart.toObject(), total }
    });
  } catch (err) {
    console.error('Get cart error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Something went wrong' 
    });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;
    const { quantity } = req.body;
    
    if (quantity < 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Quantity cannot be negative' 
      });
    }
    
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ 
        success: false,
        message: 'Cart not found' 
      });
    }
    
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ 
        success: false,
        message: 'Item not found in cart' 
      });
    }
    
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
    
    await cart.save();
    await cart.populate('items.productId');
    
    res.json({ 
      success: true,
      message: 'Cart updated successfully', 
      data: cart 
    });
  } catch (err) {
    console.error('Update cart error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Something went wrong' 
    });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;
    
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ 
        success: false,
        message: 'Cart not found' 
      });
    }
    
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    await cart.populate('items.productId');
    
    res.json({ 
      success: true,
      message: 'Item removed from cart successfully', 
      data: cart 
    });
  } catch (err) {
    console.error('Remove from cart error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Something went wrong' 
    });
  }
};

// Clear entire cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ 
        success: false,
        message: 'Cart not found' 
      });
    }
    
    cart.items = [];
    await cart.save();
    
    res.json({ 
      success: true,
      message: 'Cart cleared successfully', 
      data: cart 
    });
  } catch (err) {
    console.error('Clear cart error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Something went wrong' 
    });
  }
};

module.exports = { 
  addToCart, 
  getCart, 
  updateCartItem, 
  removeFromCart, 
  clearCart 
};