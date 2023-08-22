const mongoose = require("mongoose");

const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");

module.exports.getCart = (req, res, next) => {
  const userId = req.user._id;

  Cart.findOne({ buyer: userId })
    .populate("buyer")
    .populate("products.product")
    .then((cart) => {
      if (!cart) {
        // Si no existe un carrito, creamos uno nuevo
        const newCart = new Cart({
          buyer: userId,
          products: [{ product: product._id, quantity: quantity }], // Agregar el producto con cantidad 1
        });
        newCart.save();
      } else {
        // Si se encontró el carrito, renderizamos la vista con el carrito existente
        const cartWithSubtotals = cart.products.map((item) => ({
          product: item.product,
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

        res.render("cart/cart", {
          cart: {
            buyer: cart.buyer,
            products: cartWithSubtotals,
            total: total,
            totalProductsInCart: totalProductsInCart,
          },
        });
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

    // // Verificar si hay suficiente stock para el producto
    // if (product.stock < quantity) {
    //   return res
    //     .status(400)
    //     .json({ error: "No hay suficiente stock disponible." });
    // }

    // Restar la cantidad del stock del producto
    product.stock -= quantity;
    await product.save();

    if (!cart) {
      // Si no existe un carrito, creamos uno nuevo
      const newCart = new Cart({
        buyer: userId,
        products: [{ product: product._id, quantity: quantity }], // Agregar el producto con cantidad 1
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

    res.redirect("/cart/cart");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.removeFromCart = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;

    const cart = await Cart.findOne({ buyer: userId });

    if (!cart) {
      // Si no existe un carrito, no hacemos nada
      res.redirect("/cart/cart");
    } else {
      // Si el carrito ya existe, verificamos si el producto está en él
      const existingProduct = cart.products.find(
        (item) => item.product.toString() === productId.toString()
      );

      if (existingProduct) {
        // Si el producto ya está en el carrito, lo eliminamos
        cart.products = cart.products.filter(
          (item) => item.product.toString() !== productId.toString()
        );
      }

      await cart.save();
      res.redirect("/cart/cart");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//controlador de comprar

// module.exports.buy = async (req, res, next) => {
//   try {
//     const userId = req.user._id;
//     const productId = req.params.productId;

//     // Buscar el carrito del usuario
//     const cart = await Cart.findOne({ buyer: userId }).populate(
//       "products.product"
//     );

//     // Encontrar el producto en el carrito
//     const productInCart = cart.products.find(
//       (item) => item.product._id.toString() === productId
//     );

//     // Reducir la cantidad del producto en el carrito
//     if (productInCart) {
//       productInCart.quantity--;
//       if (productInCart.quantity <= 0) {
//         // Si la cantidad es cero o menos, eliminar el producto del carrito
//         cart.products = cart.products.filter(
//           (item) => item.product._id.toString() !== productId
//         );
//       }
//     }

//     // Guardar los cambios en el carrito
//     await cart.save();

//     // Restar la cantidad del producto en el modelo Product
//     const product = await Product.findById(productId);
//     if (product) {
//       product.stock -= 1; // Restamos 1 a la cantidad en stock
//       await product.save();
//     }

//     res.redirect("/cart/cart"); // Redirigir a la página del carrito
//   } catch (error) {
//     console.error("Error al agregar al carrito:", error);
//     next(error);
//   }
// };
