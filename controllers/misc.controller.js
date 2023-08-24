const Product = require("../models/Product.model");
module.exports.goHome = (req, res, next) => {
  function divideIntoGroupsOfThree(arr) {
    const groups = [];
    for (let i = 0; i < arr.length; i += 3) {
      groups.push(arr.slice(i, i + 3));
    }
    return groups;
  }
  const inputArray = [1, 2, 3, 4, 5, 6];

  Product.find()
    .then((products) => {
      const slide = divideIntoGroupsOfThree(products);
      res.render("misc/home", {
        products,
        slide: slide,
      });
    })
    .catch(next);
};
