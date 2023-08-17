const mongoose = require("mongoose");
const { WELCOME_MESSAGE, CORPORATE_SIGNATURE } = require('../constants');

// const COMPANY_LOGO_DEFAULT = "/path/to/default/logo.png"

const ticketSchema = new mongoose.Schema({
    weolcomeMessage: {
        type: String,
        required: [true, REQUIRE_FIELDS],
        default: WELCOME_MESSAGE,
    },
    name: {
        type: String,
        required: [true, REQUIRE_FIELDS],
    },
    image: {
        type: String,
        required: [true, REQUIRE_FIELDS],
    },
    category: {
        type: String,
        required: [true, REQUIRE_FIELDS],
    },
    quantity: {
        type: Number,
        required: [true, REQUIRE_FIELDS],
    },
    price: {
        type: Number,
        required: [true, REQUIRE_FIELDS],
    },
    corporateSignature: {
        type: String,
        required: [true, REQUIRE_FIELDS],
        default: CORPORATE_SIGNATURE,
    }
    // companyLogo: {
    //     type: String,
    //     default: COMPANY_LOGO_DEFAULT,
    // },
});

const Tickets = mongoose.model('Ticket', ticketSchema);

module.exports = Tickets;
