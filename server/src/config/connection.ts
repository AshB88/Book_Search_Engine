import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGODB_URI = process.env.NODE_ENV === 'production'
  ? process.env.MONGODB_URI // Use Atlas in Production
  : process.env.MONGODB_URI_LOCAL; // Use Local DB in Developmen

const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(MONGODB_URI || '');
    console.log('Connected to MongoDB: ${MONGODB_URI}');
    return mongoose.connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed.');
  }
};

export default db;