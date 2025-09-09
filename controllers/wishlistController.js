const Wishlist = require("../model/wishlist.model");

const createWishlistHandler = async (req, res) => {
    try {
        const newWishlist = new Wishlist({
            ...req.body,
            userId: req.user.username // Add the authenticated user's username
        });
        const savedWishlist = await newWishlist.save();
        res.status(201).json(savedWishlist);
    } catch(err) {
        console.error("Create wishlist error:", err);
        res.status(500).json({ message: "Failed to create wishlist" });
    }
}

const deleteWishlistHandler = async (req, res) => {
    try {
        const wishlist = await Wishlist.findById(req.params.id);
        
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist item not found" });
        }

        if (wishlist.userId !== req.user.username) {
            return res.status(403).json({ message: "You can only delete your own wishlist items" });
        }

        await Wishlist.findByIdAndDelete(req.params.id);
        res.json({ message: "Hotel deleted from wishlist" });
    } catch(err) {
        console.error("Delete wishlist error:", err);
        res.status(500).json({ message: "Could not delete hotel from wishlist" });
    }
}

const getWishlistHandler = async (req, res) => {
    try {
        const wishlist = await Wishlist.find({ userId: req.user.username });
        if (!wishlist || wishlist.length === 0) {
            return res.json({ message: "No items found in the wishlist" });
        }
        res.json(wishlist);
    } catch(err) {
        console.error("Get wishlist error:", err);
        res.status(500).json({ message: "Failed to fetch wishlist" });
    }
}

module.exports = { createWishlistHandler, deleteWishlistHandler, getWishlistHandler };