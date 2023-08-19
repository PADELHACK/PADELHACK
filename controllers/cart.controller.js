const mongoose = require("mongoose");

const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");

module.exports.getCart = (req, res, next) => {
    const userId = req.user._id; // Supongo que el ID del usuario está en req.user
  
    Cart.findOne({ buyer: userId })
      .populate("buyer")
      .populate("products.product")
      .then((cart) => {
        if (!cart) {
            // Si no existe un carrito, creamos uno nuevo
            const newCart = new Cart({
              buyer: userId,
              products: [{ product: product._id, quantity: quantity }] // Agregar el producto con cantidad 1
            });
         newCart.save();
        } else {
          // Si se encontró el carrito, renderizamos la vista con el carrito existente
          const cartWithSubtotals = cart.products.map(item => ({
            product: item.product,
            quantity: item.quantity,
            subtotal: item.product.price * item.quantity,
          }));
      
          res.render('cart/cart', { cart: { buyer: cart.buyer, products: cartWithSubtotals } });
        }
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
    const quantity = req.body.quantity;

    // Obtener el producto deseado de la base de datos
    const product = await Product.findById(productId);

    // Buscar el carrito del usuario
    const cart = await Cart.findOne({ buyer: userId });

    if (!cart) {
      // Si no existe un carrito, creamos uno nuevo
      const newCart = new Cart({
        buyer: userId,
        products: [{ product: product._id, quantity: quantity }] // Agregar el producto con cantidad 1
      });
      await newCart.save();
    } else {
      // Si el carrito ya existe, verificamos si el producto está en él
      const existingProduct = cart.products.find(
        (item) => item.product.toString() === product._id.toString()
      );

      if (existingProduct) {
        // Si el producto ya está en el carrito, incrementamos su cantidad
        existingProduct.quantity += Number(quantity);
      } else {
        // Si el producto no está en el carrito, lo agregamos con cantidad 1
        cart.products.push({ product: product._id, quantity: quantity });
      }

      await cart.save();
    }

    res.redirect("/cart/cart"); // Redirigir a la página del carrito o donde prefieras
  } catch (error) {
    console.log(error);
    next(error);
  }
};
