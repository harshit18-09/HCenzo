import express from 'express';
import mongoose from 'mongoose';
import Hotel from '../model/hotel.model.js';
import hotels from '../data/hotels.js';

const router = express.Router();

router.route("/").post(async(req, res) => {
    try {
        await Hotel.deleteMany({});
        const hotelsinDB = await Hotel.insertMany(hotels.data);
        res.json(hotelsinDB);
    } catch(e) {
        console.error("Error importing hotels:", e);
        res.status(500).json({ error: e.message });
    }
});

export default router;