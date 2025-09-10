import express from 'express';
import mongoose from 'mongoose';
import Hotel from '../model/hotel.model.js';
import hotels from '../data/hotels.js';

const router = express.Router();
router.route("/").post(async(req, res) => {
    try {
        await Hotel.removeAllListeners();
        const hotelsData = await hotels.data();
        const hotelsinDB = await Hotel.insertMany(hotelsData);
        res.json(hotelsinDB);
    } catch(e) {
        console.error("Error importing hotels:", e);
        res.status(500).json({ message: "Could not add hotels" });
    }
});

export default router;