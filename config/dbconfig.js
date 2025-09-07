const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI)
    }catch(error){
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectDB;
