const { findLastKey } = require('lodash')
const mongoose = require('mongoose')

const menuSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    taste: {
        type: String,
        enum: ["spicy", "sweet", "sour"],
        required: true
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
})

const MenuItem = mongoose.model("MenuItem", menuSchema, "MenuItem")

module.exports = MenuItem;