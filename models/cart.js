const mongoose = require("mongoose")

const schema = mongoose.Schema({
    buyer_email: {
        type: String,
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    quantity: {
        type: Number,
        trim: true,
        required: true
    },
    totalprice: {
        type: Number,
        trim: true,
        required: true
    },
    oldid: {
        type: String,
        trim: true,
        required: true
    }
})

const Cart = mongoose.model("Cart", schema)

module.exports = Cart