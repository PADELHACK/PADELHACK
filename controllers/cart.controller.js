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
        .then((cartItems) => {
            res.render ('cart/cart', { cartItems, user });
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
};

module.exports.addToCart = async (req, res, next) => {
    try {
        const productId = req.params.productId; // Supongo que estás pasando el ID del producto como parámetro en la URL
        const userId = req.user._id; // Supongo que la información del usuario está en req.user

        // Obtener el producto deseado de la base de datos
        const product = await Product.findById(productId);

        // Si el producto no existe, puedes manejar el error aquí

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


