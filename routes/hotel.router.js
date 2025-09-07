const express = require('express');
const router = express.Router();
const Hotels = require('../model/hotel.model');

router.route("/").get(async (req, res) => {      // http://localhost:3500/api/hotels
    try {
        const hotels = await Hotels.find({});
        hotels ? res.json(hotels) : res.status(404).json({message: "No hotels found"});
    } catch (e) {
        console.log("Error fetching hotels:", e);
    }
})

module.exports = router;
