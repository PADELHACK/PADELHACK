require("dotenv").config();
require('./config/db.config')

const express = require("express");
const logger = require("morgan");
const path = require("path");
const createError = require('http-errors');
const passport = require('passport');

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
    next();
  });

//routes
const routes = require("./routes/index.routes");
app.use("/", routes);

const authRoutes = require("./routes/auth.routes.js");
app.use("/", authRoutes);

const port = Number(process.env.PORT || 3000);
const productsRoutes = require('./routes/products.routes')
app.use('/products', productsRoutes)

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
