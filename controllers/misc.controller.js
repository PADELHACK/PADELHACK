const Product = require("../models/Product.model");
module.exports.goHome = (req, res, next) => {
  //   res.render("misc/home");

  Product.find()
    .limit(3)
    .then((products) => {
      res.render("misc/home", { products });
    })
    .catch(next);
};
