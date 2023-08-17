const mongoose = require("mongoose");
const {
  WELCOME_MESSAGE,
  CORPORATE_SIGNATURE,
  REQUIRE_FIELDS,
} = require("../constants");

// const COMPANY_LOGO_DEFAULT = "/path/to/default/logo.png"

const ticketSchema = new mongoose.Schema({
  weolcomeMessage: {
    type: String,
    required: [true, REQUIRE_FIELDS],
    default: WELCOME_MESSAGE,
  },
  quantity: {
    type: Number,
    required: [true, REQUIRE_FIELDS],
  },
  corporateSignature: {
    type: String,
    required: [true, REQUIRE_FIELDS],
    default: CORPORATE_SIGNATURE,
  },
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  buyer: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: false,
  },
  // companyLogo: {
  //     type: String,
  //     default: COMPANY_LOGO_DEFAULT,
  // },
});

const Tickets = mongoose.model("Ticket", ticketSchema);

module.exports = Tickets;
