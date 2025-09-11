import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import timeout from 'connect-timeout';

import hotelDataAddedToDBRouter from "./routes/dataimport.router.js";
import categoryDataAddedToDBRouter from "./routes/categoryimport.router.js";
import hotelRouter from './routes/hotel.router.js';
import categoryRouter from './routes/category.router.js';
import singleHotelRouter from './routes/singlehotel.router.js';
import authRouter from './routes/auth.router.js';
import WishlistRouter from './routes/wishlist.router.js';
import connectDB from './config/dbconfig.js';

dotenv.config();
const app = express();

// Global error handler
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error',
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message 
  });
};

// Request timeout middleware
app.use(timeout('15s'));

// Enable CORS with proper options
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3500;

// Connect to database
connectDB();

app.use("/api/hoteldata", hotelDataAddedToDBRouter);
app.use("/api/categorydata", categoryDataAddedToDBRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/category', categoryRouter);
app.use('/api/hotel', singleHotelRouter);
app.use('/api/auth', authRouter);
app.use('/api/wishlist', WishlistRouter);

// Apply error handler after all routes
app.use(errorHandler);

// Handle unhandled routes
app.use((req, res) => {
    res.status(404).json({ status: 'error', message: 'Route not found' });
});

let server;
mongoose.connection.once("open", () => {
    console.log("Connected to database");
    server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

// Graceful shutdown
const gracefulShutdown = () => {
    console.log('Received shutdown signal. Starting graceful shutdown...');
    server.close(() => {
        console.log('HTTP server closed.');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed.');
            process.exit(0);
        });
    });

    // Force close after 10 seconds
    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    gracefulShutdown();
});
