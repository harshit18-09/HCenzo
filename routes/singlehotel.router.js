import express from 'express';
import Hotel from '../model/hotel.model.js';

const router = express.Router();

router.route("/:id")
    .get(async (req, res) => {
        try{
            const { id } = req.params;
            const hotel = await Hotel.findById(id);
            res.json(hotel);
        } catch (e) {
            console.log(e);
            res.status(404).json({ message: "Hotel not found" });
        }
    })

export default router;
