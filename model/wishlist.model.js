const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    hotelId: { type: String, required: true },
    userId: { type: String, required: true }
}, {
    timestamps: true
})

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;