import express from 'express';
import Hotels from '../model/hotel.model.js';

const router = express.Router();

router.route("/")
    .get(async (req, res) => {      // http://localhost:3500/api/hotels
        const hotelCategory = req.query.category;    // http://localhost:3500/api/hotels?category=luxury
        try {
            let hotels;
            if(hotelCategory){
                hotels = await Hotels.find({category: hotelCategory});
            }else{
                hotels = await Hotels.find({});
            }
            hotels ? res.json(hotels) : res.status(404).json({message: "No hotels found"});
        }catch (e) {
            console.log("Error fetching hotels:", e);
        }
    })

export default router;
