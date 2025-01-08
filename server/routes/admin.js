import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { adminAuth } from '../middleware/auth.js';
import Product from '../models/Product.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dir = path.join('public', 'uploads', file.fieldname === 'icon' ? 'icons' : 'products');
    await fs.mkdir(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed'));
  }
});

const uploadFields = upload.fields([
  { name: 'icon', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]);

// Create product with images
router.post('/products', adminAuth, uploadFields, async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);
    
    // Add image paths
    if (req.files.icon) {
      productData.icon = `/uploads/icons/${req.files.icon[0].filename}`;
    }
    if (req.files.images) {
      productData.images = req.files.images.map(file => 
        `/uploads/products/${file.filename}`
      );
    }

    // Create product page from template if it's a new product
    const templatePath = path.join('src', 'templates', 'product.tsx');
    const newPagePath = path.join('src', 'pages', 'products', `${productData.slug}.tsx`);
    
    await fs.copyFile(templatePath, newPagePath);
    
    // Replace template placeholders with actual data
    let template = await fs.readFile(newPagePath, 'utf8');
    template = template.replace(/\{\{productName\}\}/g, productData.name)
                      .replace(/\{\{productDescription\}\}/g, productData.description);
    await fs.writeFile(newPagePath, template);

    const product = new Product(productData);
    await product.save();
    
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
});

// Update product with images
router.patch('/products/:id', adminAuth, uploadFields, async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);
    
    // Add new image paths
    if (req.files.icon) {
      productData.icon = `/uploads/icons/${req.files.icon[0].filename}`;
    }
    if (req.files.images) {
      const newImages = req.files.images.map(file => 
        `/uploads/products/${file.filename}`
      );
      productData.images = [...(productData.images || []), ...newImages];
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

export default router;
