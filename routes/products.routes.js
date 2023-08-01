const express = require('express')
const router = express.Router()
const productsController = require('../controllers/product.controller')
const upload = require('../config/multer.config');


router.get('/list', productsController.list)
    
router.get('/create', productsController.create)
router.post('/doCreate', upload.single('image'), productsController.doCreate)

module.exports = router