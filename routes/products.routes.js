const express = require('express')
const router = express.Router()
const productsController = require('../controllers/product.controller')


router.get('/list', productsController.list)
    
router.get('/create', productsController.create)
router.post('/doCreate', productsController.doCreate)

module.exports = router