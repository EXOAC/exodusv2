import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin/index.js';
import productsRoutes from './routes/products.js';
import categoriesRoutes from './routes/categories.js';
import ordersRoutes from './routes/orders.js';


// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to MongoDB
try {
  await connectDB();
  console.log('Connected to MongoDB');
} catch (error) {
  console.error('MongoDB connection error:', error);
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());



// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Create uploads directories if they don't exist
import { mkdir } from 'fs/promises';
await mkdir(path.join(__dirname, '../uploads/products'), { recursive: true });
await mkdir(path.join(__dirname, '../uploads/categories'), { recursive: true });

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productsRoutes); // Добавляем префикс /api
app.use('/api/categories', categoriesRoutes);
app.use('/api/orders', ordersRoutes);


// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: err.message || 'Internal server error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});