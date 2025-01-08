import express from 'express';
import Product from '../../models/Product.js';

const router = express.Router();

// Get all product statuses
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
      .select('name status lastUpdated')
      .sort('-lastUpdated');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product statuses' });
  }
});

// Update product status
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        lastUpdated: new Date()
      },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product status' });
  }
});

export default router;