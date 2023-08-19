const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: false,
        },
        quantity: {
          type: Number,
          default: 0
        }
      
      },
    ]
  }
  ,
  buyer: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

const Carts = mongoose.model("Cart", cartSchema);

module.exports = Carts;
