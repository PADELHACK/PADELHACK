require("dotenv").config();
require('./config/db.config')

const express = require("express");
const logger = require("morgan");
const path = require("path");
const createError = require('http-errors');
const passport = require('passport');
const {BRANDS, CATEGORY, LEVELS, ROLE_OF_USERS} = require('./constants')

const app = express()

//config
require("./config/db.config");
require("./config/hbs");
require('./config/passport.config');
const session = require("./config/session.config");

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");




/* Middlewares */
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;  
    res.locals.products = req.products;
    res.locals.brand = BRANDS;
    res.locals.category = CATEGORY;
    res.locals.level = LEVELS;
    res.locals.role = ROLE_OF_USERS;
    req.brand = BRANDS;
    req.category = CATEGORY;
    req.level = LEVELS;
    next();
});




//routes
const routes = require("./routes/index.routes");
app.use("/", routes);

const authRoutes = require("./routes/auth.routes.js");
app.use("/", authRoutes);

const productsRoutes = require('./routes/products.routes')
app.use('/products', productsRoutes)

const usersRoutes = require('./routes/users.routes')
app.use('/', usersRoutes)

const cartRoutes = require('./routes/cart.routes')
app.use('/cart', cartRoutes)

const purchaseRoutes = require('./routes/purchase.routes')
app.use('/', purchaseRoutes)


const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
