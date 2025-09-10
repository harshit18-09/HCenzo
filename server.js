import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import hotelDataAddedToDBRouter from "./routes/dataimport.router.js";
import categoryDataAddedToDBRouter from "./routes/categoryimport.router.js";
import hotelRouter from './routes/hotel.router.js';
import categoryRouter from './routes/category.router.js';
import singleHotelRouter from './routes/singlehotel.router.js';
import authRouter from './routes/auth.router.js';
import WishlistRouter from './routes/wishlist.router.js';
import connectDB from './config/dbconfig.js';

const app = express();
dotenv.config();

app.use(express.json());
connectDB();

const PORT = 3500;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/api/hoteldata", hotelDataAddedToDBRouter);
app.use("/api/categorydata", categoryDataAddedToDBRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/category', categoryRouter);
app.use('/api/hotel', singleHotelRouter);
app.use('/api/auth', authRouter);
app.use('/api/wishlist', WishlistRouter);

mongoose.connection.once("open", () => {
    console.log("Connected to database");
    app.listen(process.env.PORT || PORT, () => {
        console.log("Server started and running");
    });
});
