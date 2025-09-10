import express from 'express';
import Category from "../model/category.model.js";
import categories from "../data/categories.js";

const router = express.Router();

router.route("/")
    .post(async (req, res) => {
        try {
            const { v4: uuid } = await import('uuid');
            const categoriesData = categories.data.map(cat => ({
                category: cat.category,
                id: uuid()
            }));
            const categoriesInDB = await Category.insertMany(categoriesData);
            res.json(categoriesInDB);
        } catch(err) {
            console.log(err);
            res.json({ message: "Could not add categories to DB"});
        }
    })

export default router;