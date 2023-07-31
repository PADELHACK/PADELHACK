const User = require('../models/User.model');
const mongoose = require('mongoose');
const passport = require('passport');

module.exports.register = (req, res, next) => {
    res.render('auth/register');
  };
  
  module.exports.doRegister = (req, res, next) => {
    const { email, password, repeatPassword } = req.body
  
    console.log(req.body)
  
    const renderWithErrors = (errors) => {
      res.render('auth/register', {
        user: req.body,
        errors
      })
    }
  
    if (password !== repeatPassword) {
      return renderWithErrors({
        repeatPassword: 'Passwords must match',
        password: 'Passwords must match',
      })
    }
  
    // Comprobar si ya hay alguno en la bbdd con ese email
  
    User.findOne({ email })
      .then(user => {
        if (user) {
          renderWithErrors({ email: 'Email already in use' });
        } else {
          const userData = {
            ...req.body,
            avatar: req.file ? req.file.path : undefined
          }
  
          return User.create(userData)
            .then(() => {
              res.redirect('/login')
            })
        }
      })
      .catch(err => {
        if (err instanceof mongoose.Error.ValidationError) {
          renderWithErrors(err.errors);
        } else {
          next(err)
        }
      })
  }

  module.exports.login = (req, res, next) => {
    res.render('auth/login');
  }
  
  const doLoginStrategy = (req, res, next, strategy = 'local-auth') => {
    const passportController = passport.authenticate(strategy, (error, user, validations) => {
      if (error) {
        next(error)
      } else if (!user) {
        res.render('auth/login', {
          user: req.body,
          errors: validations
        })
      } else {
        req.login(user, error => {
          if (error) {
            next(error);
          } else {
            res.redirect('/profile')
          }
        });
      }
    })
  
    passportController(req, res, next);
  }
  
  module.exports.doLogin = (req, res, next) => {
    doLoginStrategy(req, res, next);
  }

//   module.exports.loginGoogle = (req, res, next) => {
//     const passportController = passport.authenticate('google-auth', {
//       scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
//     });
  
//     passportController(req, res, next);
//   }

  module.exports.logout = (req, res, next) => {
    req.session.destroy();
    res.redirect('/login');
  }