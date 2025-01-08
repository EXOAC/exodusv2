import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product.js';

const router = express.Router();

// Генерация slug для продукта
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')  // Заменяет неалфавитно-цифровые символы на дефисы
    .replace(/^[-]+|[-]+$/g, '');  // Убирает ведущие/концевые дефисы
};

// Получение всех продуктов
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }
    res.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Получение продукта по slug
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    const product = await Product.findOne({ productUrl: slug });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

// Обновление статуса продукта по slug
router.put('/:slug/status', async (req, res) => {
  const { slug } = req.params;
  const { status } = req.body;

  const validStatuses = ['undetected', 'detected', 'testing', 'updating', 'closed'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const product = await Product.findOneAndUpdate(
      { productUrl: slug },  // Ищем продукт по slug
      { status, lastUpdated: new Date() },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error updating product status:', error);
    res.status(500).json({ message: 'Failed to update product status' });
  }
});

// Обновление или создание нового продукта (с генерацией slug)
router.post('/', async (req, res) => {
  const { name, description, status } = req.body;

  if (!name || !description || !status) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const slug = generateSlug(name);

  try {
    const newProduct = new Product({
      name,
      description,
      status,
      productUrl: slug,  // Используем сгенерированный slug
      lastUpdated: new Date()
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Failed to create product' });
  }
});

export default router;
