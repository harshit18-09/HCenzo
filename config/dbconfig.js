import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = () => {
  mongoose.connect(process.env.DATABASE_URI)
    .then(() => {})
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err);
      process.exit(1);
    });
};

export default connectDB;
