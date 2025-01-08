import express from 'express';
import { adminAuth } from '../../middleware/auth.js';
import categoriesRouter from './categories.js';
import productsRouter from './products.js';
import statusRouter from './status.js';

const router = express.Router();

// Apply admin auth middleware to all admin routes
router.use(adminAuth);

router.use('/categories', categoriesRouter);
router.use('/products', productsRouter);
router.use('/status', statusRouter);

export default router;