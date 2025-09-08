const express = require('express');
const router = express.Router();

const Category = require('../model/category.model');

router.route("/")
    .get(async (req, res) => {      // http://localhost:3500/api/categories
        try {
            const categories = await Category.find({});
            categories ? res.json(categories) : res.status(404).json({ message: "No categories found" });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "No categories found" });
        }
    })

module.exports = router;
