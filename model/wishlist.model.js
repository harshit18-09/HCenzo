import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    hotelId: { type: String, required: true },
    userId: { type: String, required: true }
}, {
    timestamps: true
})

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;