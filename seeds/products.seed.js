require("dotenv").config();
require("../config/db.config");

const mongoose = require("mongoose");
const Product = require("../models/Product.model");
const products = require("../products.json");

mongoose.connection.once("open", () => {
  mongoose.connection
    .dropCollection("products")
    .then(() => {
      console.log("DB cleared");

      return Product.create(products);
    })
    .then((productDB) => {
        productDB.forEach((product) => {
        console.log(`${product.name} has been created`);
      });

      console.log(`${productDB.length} products have been created`);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      mongoose.disconnect();
    });
});