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
                    product: item.product._id,
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
                    products: cartWithSubtotals.map(item => ({ product: item.product, quantity: item.quantity })),
                    buyer: _id,
                    total: total,
                })
                    .then((ticket) => {
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


const formatDate = (date) => {
    const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('es-ES', options);
};

module.exports.listTickets = (req, res, next) => {
    const { _id } = req.user;
    Ticket.find({ buyer: _id })
        .populate('products.product')
        .then((tickets) => {

            const subtotal = tickets.forEach((ticket) => {
                ticket.products.forEach((product) => {
                    return product.subtotal = product.product.price * product.quantity;
                });
            })

            tickets.forEach((ticket) => {
                ticket.products.forEach((product) => {
                    product.date = formatDate(ticket.createdAt);
                });
            });
            res.render('users/profile', { user: req.user, tickets: tickets, subtotal: subtotal });
        })
        .catch((error) => {
            next(error);
        });
};



