const express = require('express')
const router = express.Router()
const productsController = require('../controllers/product.controller')
const upload = require('../config/multer.config');
const adminVerification = require('../middlewares/role.middleware')


router.get('/list', productsController.list)
    
router.get('/create', adminVerification.isAdmin  ,productsController.create)
router.post('/doCreate', upload.single('image'), productsController.doCreate)

router.get('/detail/:id', productsController.detail)

module.exports = router