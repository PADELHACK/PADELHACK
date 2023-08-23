const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart.controller')

router.get('/cart', cartController.getCart);
router.post('/cart/:id', cartController.addToCart);
router.post('/remove/:id', cartController.removeFromCart)
//router.post('/checkout', cartController.buy)

module.exports = router;
