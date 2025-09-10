import express from 'express';
import mongoose from 'mongoose';
import Hotel from '../model/hotel.model.js';
import hotels from '../data/hotels.js';

const router = express.Router();
router.route("/").post(async(req, res) => {
    try {
        const { v4: uuid } = await import('uuid');
        await Hotel.removeAllListeners();
        const hotelsData = hotels.data.map(hotel => ({
            ...hotel,
            id: uuid()
        }));
        const hotelsinDB = await Hotel.insertMany(hotelsData);
        res.json(hotelsinDB);
    } catch(e) {
        console.error("Error importing hotels:", e);
    }
});

export default router;