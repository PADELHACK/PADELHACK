const Ticket = require('../models/Ticket.model');
const mailer = require('../config/nodemailer.config');
const Cart = require('../models/Cart.model');
//crear un ticket con la información del CART
module.exports.createTicket = (req, res, next) => {
    const { _id } = req.user;
    Cart.findOne({ buyer: _id })
        .populate('products.product')
        .then((cart) => {
            if (!cart) {
                res.redirect('/logout')
            } else {
                const cartWithSubtotals = cart.products.map((item) => ({
                    product: item.product._id, // Use _id here
                    quantity: item.quantity,
                    subtotal: item.product.price * item.quantity,
                }));
                const total = cartWithSubtotals.reduce(
                    (acc, item) => acc + item.subtotal,
                    0
                );
                const totalProductsInCart = cart.products.reduce(
                    (total, item) => total + item.quantity,
                    0
                );
                Ticket.create({
                    products: cartWithSubtotals.map(item => ({ product: item.product, quantity: item.quantity })), // Use correct structure
                    buyer: _id,
                    total: total,
                })
                    .then((ticket) => {
                        //console.log(ticket);
                        //elimina los productos del carrito
                        Cart.findByIdAndUpdate(cart._id, { products: [] })
                            .then(() => {
                                //envia el email
                                const finalTicket = {
                                    ...ticket,
                                    products: cart.products,
                                    buyer: req.user,
                                }
                                mailer.sendTicketEmail(finalTicket);
                        res.redirect('/profile');
                            })
                            .catch((error) => {
                                next(error);
                            });
                    })
                    .catch((error) => {
                        next(error);
                    });
            }
        })
        .catch((error) => {
            next(error);
        });
};
module.exports.listTickets = (req, res, next) => {
    Ticket.find()
        .populate('products.product')
        .then((tickets) => {
            res.render('users/profile', { tickets });
        })
        .catch((error) => {
            next(error);
        });
};


