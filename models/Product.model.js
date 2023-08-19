const mongoose = require("mongoose")
const { BRANDS, CATEGORY, LEVELS, REQUIRE_FIELDS } = require('../constants')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, REQUIRE_FIELDS],
    },
    brand: {
        type: String,
        enum: BRANDS,
        required: [true, REQUIRE_FIELDS],
    },
    price: {
        type: Number,
        required: [true, REQUIRE_FIELDS],
    },
    category: {
        type: String,
        enum: CATEGORY,
        required: [true, REQUIRE_FIELDS],
    },
    level: {
        type: String,
        enum: LEVELS,
        required: [true, REQUIRE_FIELDS],
    },
    shortDescription: {
        type: String,
        required: [true, REQUIRE_FIELDS],
    },
    longDescription: {
        type: String,
        required: [true, REQUIRE_FIELDS],
    },
    image: {
        type: String,
        required: [true, REQUIRE_FIELDS],
    },
    stock: {
        type: Number,
        required: [true, REQUIRE_FIELDS],
      },
})

const Products = mongoose.model('Product', productSchema)

module.exports = Products


