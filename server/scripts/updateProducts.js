import mongoose from 'mongoose';
import Product from '../models/Product.js';  // Путь к вашей модели

// Генерация slug для продукта
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')  // Заменяет неалфавитно-цифровые символы на дефисы
    .replace(/^[-]+|[-]+$/g, '');  // Убирает ведущие/концевые дефисы
};

async function updateProducts() {
  try {
    await mongoose.connect('mongodb+srv://exoac:iaTbUYq3GePts0Ek@alexlovemoms.sfkmz.mongodb.net/?retryWrites=true&w=majority&appName=alexlovemoms');  // Укажите вашу базу данных

    const products = await Product.find();
    if (products.length === 0) {
      console.log('No products found');
      return;
    }

    for (let product of products) {
      // Если slug не установлен, генерируем и обновляем его
      if (!product.productUrl) {
        product.productUrl = generateSlug(product.name);
        await product.save();
        console.log(`Updated product: ${product.name} with slug: ${product.productUrl}`);
      }
    }

    console.log('Finished updating products');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error updating products:', error);
  }
}

updateProducts();
