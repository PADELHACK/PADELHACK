const mongoose = require('mongoose');
const Product = require('../models/Product.model');

module.exports.list =(req, res, next) => {
    Product.find()
    .then((products) => {
        res.render('products/list', {products})
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
}

module.exports.create = (req, res, rext) => {
    res.render ('products/form')
}


module.exports.doCreate = (req, res, next) => {
    Product.create(req.body)
    .then(() => {
        console.log('product created')
        res.redirect('/products/list')
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
}

