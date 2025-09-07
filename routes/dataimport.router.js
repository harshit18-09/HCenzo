const express = require('express');
const mongoose = require('mongoose');

const Hotel = require('../model/hotel.model');
const hotels = require('../data/hotels');

const router = express.Router();
router.route("/").post(async(req, res) => {
    try{
        await Hotel.removeAllListeners();
        const hotelsinDB = await Hotel.insertMany(hotels.data)
        res.json(hotelsinDB);
    }catch(e){
        console.error("Error importing hotels:", e);
    }
});

module.exports = router;