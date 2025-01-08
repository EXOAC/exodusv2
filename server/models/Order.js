import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  amount: {
    type: Number,
    required: true
  },
  period: {
    type: String,
    required: true,
    enum: ['2h', 'day', 'week', 'month']
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['card', 'crypto', 'paypal']
  },
  transactionId: String,
  expiresAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate expiration date before saving
orderSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('period')) {
    const now = new Date();
    switch (this.period) {
      case '2h':
        this.expiresAt = new Date(now.getTime() + 2 * 60 * 60 * 1000);
        break;
      case 'day':
        this.expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        break;
      case 'week':
        this.expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        this.expiresAt = new Date(now.setMonth(now.getMonth() + 1));
        break;
    }
  }
  next();
});

export default mongoose.model('Order', orderSchema);