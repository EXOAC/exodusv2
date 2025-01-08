import express from 'express';
import { auth } from '../middleware/auth.js';
import Order from '../models/Order.js';

const router = express.Router();

// Get user's orders
router.get('/my', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .sort('-createdAt')
      .populate('productId', 'name');
      
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Create order
router.post('/', auth, async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      userId: req.user.userId
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
});

export default router;