const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb+srv://exoac:iaTbUYq3GePts0Ek@alexlovemoms.sfkmz.mongodb.net/?retryWrites=true&w=majority&appName=alexlovemoms';
const client = new MongoClient(uri);

let db;

async function connectDB() {
  if (db) return db;
  try {
    await client.connect();
    db = client.db('exoac'); // Укажите название базы данных
    console.log('Connected to MongoDB');
    return db;
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

module.exports = { connectDB };
