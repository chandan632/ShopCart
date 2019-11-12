const mongoose = require("mongoose")

const schema = mongoose.Schema({
    buyer_name: {
        type: String,
        required: true,
        trim: true
    },
    buyer_email: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    },
    totalprice: {
        type: Number,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: String,
        required: true,
        trim: true
    }
})

const Transaction = mongoose.model("Transaction", schema)

module.exports = Transaction