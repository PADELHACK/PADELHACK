const mongoose = require('mongoose');
const Product = require('../models/Product.model');


module.exports.list =(req, res, next) => {
    const { category, brand, level} = req.query;
    const query = {};
  
    if (category) {
      query.category = category;
    }
    if (brand) {
      query.brand = brand;
    }
    if (level) {
      query.level = level;
    }

  


    Product.find(query)

    .then((products) => {
        const viewQuery = {
            category,
            brand,
            level,
            hasFilter: category || brand || level,
            };

        res.render('products/list', {products, query:viewQuery})


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
    const data = {
        ...req.body,
        owner: req.user._id,
        image: req.file ? req.file.path : undefined,
      }

    Product.create(data)
    .then(() => {
        res.redirect('/products/list')
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
}

module.exports.detail = (req, res, next) => {
    Product.findById(req.params.id)
    .then((product) => {
        res.render('products/detail', {product})
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
}


