import express from 'express';
import Category from "../model/category.model.js";
import categories from "../data/categories.js";

const router = express.Router();

router.route("/")
    .post(async (req, res) => {
        try{
            const categoriesInDB = await Category.insertMany(categories.data);
            res.json(categoriesInDB);
        }catch(err){
            console.error(err);
            res.status(500).json({ message: "Could not add categories to DB" });
        }
    });

export default router;