const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = () => {
  mongoose.connect(process.env.DATABASE_URI)
    .then(() => {})
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err);
      process.exit(1);
    });
};

module.exports = connectDB;
