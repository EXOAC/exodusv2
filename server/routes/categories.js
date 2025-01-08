import express from 'express';
import Category from '../models/Category.js';
import { handleErrors } from '../utils/errorHandler.js';

const router = express.Router();

// Get all active categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort('order');
    res.json(categories);
  } catch (error) {
    handleErrors(res, error);
  }
});

export default router;