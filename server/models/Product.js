import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  status: {
    type: String,
    enum: ['undetected', 'detected', 'updating', 'testing', 'closed'],
    default: 'undetected'
  },
  features: [{
    type: String,
    trim: true
  }],
  requirements: [{
    type: String,
    trim: true
  }],
  pricing: [{
    period: {
      type: String,
      enum: ['2h', 'day', 'week', 'month'],
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    buttonId: String,
    digisellerUrl: String // Add this field
  }],
  images: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  link: {
    required: [true, 'Product link requiered'],
    type: String,
    unique: true
  },
  productUrl: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

// Функция для получения продуктов
export async function getProducts() {
  return await Product.find({});
}

// Функция для добавления нового продукта
export async function addProduct(productData) {
  const product = new Product(productData);
  return await product.save();
}

// Экспорт модели и функций
export default Product;
