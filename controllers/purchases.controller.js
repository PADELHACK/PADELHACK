const Ticket = require('../models/Ticket.model');
const mailer = require('../config/nodemailer.config');
const Cart = require('../models/Cart.model');


//crear un ticket con la información del CART
module.exports.createTicket = (req, res, next) => {
    

    const { products, buyer,subTotals, total } = req.body;
    const ticket = new Ticket({
        products,
        buyer,
        subTotals,
        total,
    });
    console.log(ticket.products)
    console.log(ticket.buyer)
    console.log(ticket.subTotals)
    console.log(ticket.total)

    ticket
        .save()
        .then((ticket) => {
            //enviar ticket por mail
            //mailer.sendTicketEmail(ticket);
            //borrar productos del carrito
            Cart.findOneAndUpdate({ buyer: req.user._id }, { products: [] })
                .then(() => {
        res.status(201);
        res.redirect('/users/profile');
                })

        })
        .catch((error) => {
        next(error);
        });
};

module.exports.listTickets = (req, res, next) => {
    Ticket.find()
        .then((tickets) => {
        res.rennder('users/profile', { tickets });
        })
        .catch((error) => {
        next(error);
        });
};



