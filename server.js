const express = require('express');

const mongoose = require('mongoose');

const hotelRouter = require('./routes/hotel.router');
const hotelDataAddedToDBRouter = require("./routes/dataimport.router");
const app = express();

const connectDB = require('./config/dbconfig');

app.use(express.json());
connectDB();

const PORT = 3500;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/api/hoteldata", hotelDataAddedToDBRouter);
app.use('/api/hotels', hotelRouter);

mongoose.connection.once("open", () => {
    console.log("Connected to database");
    app.listen(process.env.PORT || PORT, () => {
        console.log("Server started and running");
    });
});
