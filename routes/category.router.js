import express from 'express';
import Category from '../model/category.model.js';

const router = express.Router();

router.route("/")
    .get(async (req, res) => {      // http://localhost:3500/api/categories
        try {
            const categories = await Category.find({});
            categories ? res.json(categories) : res.status(404).json({ message: "No categories found" });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Error fetching categories", error: e.message });
        }
    });

export default router;
