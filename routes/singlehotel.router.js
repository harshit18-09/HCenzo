import express from 'express';
import Hotel from '../model/hotel.model.js';

const router = express.Router();

router.route("/:id")
    .get(async (req, res) => {
        try {
            const { id } = req.params;
            const hotel = await Hotel.findById(id);
            if (!hotel) {
                return res.status(404).json({ message: "Hotel not found" });
            }
            res.json(hotel);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Error fetching hotel", error: e.message });
        }
    });

export default router;
