import express from 'express';
import multer from 'multer';
import path from 'path';
import Product from '../../models/Product.js';
import { handleErrors } from '../../utils/errorHandler.js';

// Конфигурация хранилища для multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products'); // Указываем папку для загрузки
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// Настройка multer для обработки изображений
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Ограничение на 5MB
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

const router = express.Router();

// Получение всех продуктов
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
      .sort('-createdAt')
      .populate('categoryId', 'name');
    res.json(products);
  } catch (error) {
    handleErrors(res, error);
  }
});

// Создание нового продукта
router.post('/', upload.array('images'), async (req, res) => {
  try {
    const productData = JSON.parse(req.body.data);

    // Добавление путей к загруженным изображениям
    if (req.files?.length) {
      const uploadedImages = req.files.map(file => `/uploads/products/${file.filename}`);
      productData.images = [...(productData.images || []), ...uploadedImages];
    }

    // Генерация slug для ссылки на продукт
    const slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$|[^a-z0-9]/g, '');
    productData.productUrl = slug; // Добавляем slug в productUrl

    // Если поле link обязательно, добавляем его
    productData.link = `/products/${slug}`; // Пример ссылки

    const product = new Product(productData);
    await product.save();
    
    res.status(201).json(product);
  } catch (error) {
    handleErrors(res, error);
  }
});

// Обновление продукта
router.patch('/:id', upload.array('images'), async (req, res) => {
  try {
    const productData = JSON.parse(req.body.data);

    // Добавление путей к загруженным изображениям
    if (req.files?.length) {
      const uploadedImages = req.files.map(file => `/uploads/products/${file.filename}`);
      productData.images = [...(productData.images || []), ...uploadedImages];
    }

    // Обновление данных продукта
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    handleErrors(res, error);
  }
});

// Удаление продукта
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    handleErrors(res, error);
  }
});

export default router;
