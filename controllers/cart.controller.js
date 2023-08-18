const mongoose = require('mongoose');

const Cart = require('../models/Cart.model');
const Product = require('../models/Product.model');

module.exports.getCart = (req, res, next) => {
    console.log(req.query);
    
    // Asegúrate de que req.user contenga la información del usuario autenticado
    const user = req.user; // Supongo que la información del usuario está en req.user

    Cart.find(req.query)
        .populate('buyer')
        .populate('products')
        .then((cart) => {
            // const cartRender = cart[0]
            res.render ('cart/cart', { cart });
            // console.log(cartRender.buyer.username)
        
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
};

module.exports.addToCart = async (req, res, next) => {
    try {
        const productId = req.params.id; 
        const userId = req.user._id;

        // Obtener el producto deseado de la base de datos
        const product = await Product.findById(productId);

        // Crear o actualizar el carrito del usuario
        const cart = await Cart.findOneAndUpdate(
            { buyer: userId },
            { $addToSet: { products: product._id } }, // Agregar el producto al array "products"
            { upsert: true, new: true }
        ).populate('products');

        res.redirect('/cart/cart'); // Redirigir a la página del carrito o donde prefieras
    } catch (error) {
        console.log(error);
        next(error);
    }
};


