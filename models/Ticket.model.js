const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
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
            default: 0,
          },
        },
      ],
    },
    buyer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: false,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Tickets = mongoose.model("Ticket", ticketSchema);

module.exports = Tickets;
