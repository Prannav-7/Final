const Order = require('../models/Order');
const Product = require('../models/Product');
const { checkStockAvailability, reduceStock, restoreStock } = require('../utils/stockManager');

// Create new order
const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, customerDetails, orderSummary, paymentDetails } = req.body;

    // Check stock availability using utility function
    const stockCheck = await checkStockAvailability(items);
    if (!stockCheck.success) {
      return res.status(400).json({
        success: false,
        message: stockCheck.message,
        insufficientProducts: stockCheck.insufficientProducts
      });
    }

    // Create order
    const order = new Order({
      userId,
      items,
      customerDetails,
      orderSummary,
      paymentDetails: paymentDetails || {
        method: 'cod',
        status: 'pending'
      },
      status: 'confirmed',
      paymentStatus: paymentDetails?.method === 'cod' ? 'pending' : 'paid'
    });

    await order.save();

    // Reduce stock levels using utility function
    // For both paid orders and COD orders to prevent overselling
    if (paymentDetails?.status === 'completed' || 
        paymentDetails?.method === 'cod' || 
        paymentDetails?.method === 'upi' ||
        paymentDetails?.method === 'razorpay') {
      const stockReduction = await reduceStock(items);
      if (!stockReduction.success) {
        // If stock reduction fails, we should consider cancelling the order
        console.error('Stock reduction failed for order:', order._id);
        return res.status(500).json({
          success: false,
          message: 'Failed to update stock levels. Order may need manual review.',
          orderId: order._id
        });
      }
      console.log('Stock levels updated for order:', order._id, stockReduction.updatedProducts);
    }

    // Populate order with product details
    await order.populate('items.productId');

    res.status(201).json({
      success: true,
      message: 'Order placed successfully and stock updated',
      data: order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
};

// Get user's orders
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ userId })
      .populate('items.productId')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrders = await Order.countDocuments({ userId });

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalOrders / limit),
          totalOrders,
          hasNext: page < Math.ceil(totalOrders / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user._id;

    const order = await Order.findOne({ _id: orderId, userId })
      .populate('items.productId');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order'
    });
  }
};

// Cancel order
const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user._id;

    const order = await Order.findOne({ _id: orderId, userId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.status === 'shipped' || order.status === 'delivered') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel order that has been shipped or delivered'
      });
    }

    if (order.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Order is already cancelled'
      });
    }

    // Update order status
    order.status = 'cancelled';
    await order.save();

    // Restore product stock using utility function
    const stockRestoration = await restoreStock(order.items);
    if (stockRestoration.success) {
      console.log('Stock restored for cancelled order:', order._id, stockRestoration.updatedProducts);
    } else {
      console.error('Failed to restore stock for cancelled order:', order._id);
    }

    res.json({
      success: true,
      message: 'Order cancelled successfully and stock restored',
      data: order
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel order'
    });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder
};
