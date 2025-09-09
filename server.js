const express = require('express');
const mongoose = require('mongoose');

const hotelDataAddedToDBRouter = require("./routes/dataimport.router");
const categoryDataAddedToDBRouter = require("./routes/categoryimport.router");
const dotenv = require('dotenv');
dotenv.config();
const hotelRouter = require('./routes/hotel.router');
const categoryRouter = require('./routes/category.router');
const singleHotelRouter = require('./routes/singlehotel.router');
const authRouter = require('./routes/auth.router');
const WishlistRouter = require('./routes/wishlist.router');

const app = express();

const connectDB = require('./config/dbconfig');

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
