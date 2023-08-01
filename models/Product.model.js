const mongoose = require("mongoose")
const { BRANDS, CATEGORY, LEVELS, REQUIRE_FILDS } = require('../constants')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, REQUIRE_FILDS],
    },
    brand: {
        type: String,
        enum: BRANDS,
        required: [true, REQUIRE_FILDS],
    },
    price: {
        type: Number,
        required: [true, REQUIRE_FILDS],
    },
    category: {
        type: String,
        enum: CATEGORY,
        required: [true, REQUIRE_FILDS],
    },
    level: {
        type: String,
        enum: LEVELS,
        required: [true, REQUIRE_FILDS],
    },
    shortDescription: {
        type: String,
        required: [true, REQUIRE_FILDS],
    },
    longDescription: {
        type: String,
        required: [true, REQUIRE_FILDS],
    },
    image: {
        type: String,
        required: [true, REQUIRE_FILDS],
    },
})

const Products = mongoose.model('Product', productSchema)

module.exports = Products


