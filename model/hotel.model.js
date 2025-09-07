const mongoose = require('mongoose');
const hotelSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: String, required: true},
    imageArr: {type: Array, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    country: {type: String, required: true},
    price: {type: Number, required: true},
    rating: {type: Number, default: 3.7},
    numberOfBathrooms: {type: Number, default: 2},
    numberOfBeds: {type: Number, default: 2},
    numberOfguest: {type: Number, default: 6},
    numberOfBedrooms: {type: Number, default: 2},
    numberOfStudies: {type: Number, default: 0},
    hostName: {type: String, required: true},
    hostJoinedOn: {type: String, required: true},
    ameneties: {type: Array, required: true},
    healthAndSafety: {type: Array, required: true},
    houseRules: {type: Array, required: true},
    propertyType: {type: String, required: true, default: "Hotel"},
    isCancelable: {type: Boolean, required: true, default: true},
})

const Hotel = mongoose.model('Hotel', hotelSchema);
module.exports = Hotel;