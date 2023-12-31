const User = require("../models/User.model");
const mongoose = require("mongoose");
const passport = require("passport");
const Cart = require("../models/Cart.model");
const mailer = require("../config/nodemailer.config");

module.exports.register = (req, res, next) => {
  res.render("auth/register");
};

module.exports.doRegister = (req, res, next) => {
  const { email, password, repeatPassword } = req.body;

  const renderWithErrors = (errors) => {
    res.render("auth/register", {
      user: req.body,
      errors,
    });
  };

  if (password !== repeatPassword) {
    return renderWithErrors({
      repeatPassword: "Passwords must match",
      password: "Passwords must match",
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        renderWithErrors({ email: "Email already in use" });
      } else {
        const userData = {
          ...req.body,
          avatar: req.file ? req.file.path : undefined,
        };

        return User.create(req.body).then((user) => {
          mailer.sendValidationEmail(user);
          const buyerId = user._id;
                        const cart = new Cart({
                            buyer: buyerId,
                            products: []
                        });
                        cart.save();
          res.redirect("/login");
        });
      }
    })
    .catch((err) => {
      console.error(err);
      if (err instanceof mongoose.Error.ValidationError) {
        renderWithErrors(err.errors);
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  res.render("auth/login");
};

const doLoginStrategy = (req, res, next, strategy = "local-auth") => {
  const passportController = passport.authenticate(
    strategy,
    async (error, user, validations) => {
      if (error) {
        next(error);
      } else if (!user) {
        res.render("auth/login", {
          user: req.body,
          errors: validations,
        });
      } else {
        req.login(user, async (error) => {
          if (error) {
            next(error);
          } else {
            try {
              res.redirect("/");
            } catch (error) {
              next(error);
            }
          }
        });
      }
    }
  );

  passportController(req, res, next);
};

module.exports.doLogin = (req, res, next) => {
  doLoginStrategy(req, res, next);
};

module.exports.doLoginGoogle = (req, res, next) => {
  doLoginStrategy(req, res, next, "google-auth");
};

module.exports.loginGoogle = (req, res, next) => {
  const passportController = passport.authenticate("google-auth", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  });

  passportController(req, res, next);
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
};

module.exports.activate = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, { active: true })
    .then(() => {
      res.redirect("/login");
    })
    .catch(next);
};

module.exports.registerAdmin = (req, res, next) => {
  res.render("users/registerAdmin");
};

module.exports.doRegisterAdmin = (req, res, next) => {
  const { email, password, repeatPassword } = req.body;

  const renderWithErrors = (errors) => {
    res.render("users/registerAdmin", {
      user: req.body,
      errors,
    });
  };

  if (password !== repeatPassword) {
    return renderWithErrors({
      repeatPassword: "Passwords must match",
      password: "Passwords must match",
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        renderWithErrors({ email: "Email already in use" });
      } else {
        const userData = {
          ...req.body,
          avatar: req.file ? req.file.path : undefined,
        };

        return User.create(req.body).then((user) => {
          mailer.sendValidationEmail(user);
          res.redirect("/users");
        });
      }
    })
    .catch((err) => {
      console.error(err);
      if (err instanceof mongoose.Error.ValidationError) {
        renderWithErrors(err.errors);
      } else {
        next(err);
      }
    });
};

module.exports.usersList = (req, res, next) => {
  User.find()
    .then((users) => {
      res.render("users/list", { users });
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/users");
    })
    .catch(next);
};

module.exports.edit = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      res.render("users/edit", { user });
    })
    .catch(next);
};

module.exports.doEdit = (req, res, next) => {
  console.log("entrando en doEdit");
  const { username, email, role } = req.body;
  const userData = {
    username,
    email,
    role,
  };
  if (req.file) {
    userData.avatar = req.file.path;
  }
  User.findByIdAndUpdate(req.params.id, userData, { new: true })
    .then((user) => {
      if (user) {
        res.redirect("/users");
      } else {
        res.redirect("/users");
      }
    })
    .catch(next);
};

module.exports.detailUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      res.render("users/profile", { user });
    })
    .catch(next);
};
