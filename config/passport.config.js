const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/User.model');
const LocalStrategy = require('passport-local').Strategy;
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser((user, next) => {
  next(null, user._id);
});

passport.deserializeUser((id, next) => {
  User.findById(id)
    .populate('artworks') // Que req.user va a tener los artworks
    .then(user => next(null, user))
    .catch(err => next(err))
});

passport.use(
  'local-auth',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, next) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            next(null, null, { email: 'Invalid email or password' })
          } else {
            return user.checkPassword(password)
              .then(match => {
                if (!match) {
                  next(null, null, { email: 'Invalid email or password' })
                } else {
                  next(null, user);
                }
              })
          }
        })
        .catch(err => next(err))
    }
  )
)

// passport.use(
//   'google-auth',
//   new GoogleStrategy(
//     {
//       clientID: process.env.G_CLIENT_ID,
//       clientSecret: process.env.G_CLIENT_SECRET,
//       callbackURL: process.env.G_REDIRECT_URI || '/authenticate/google/cb',
//     },
//     (accessToken, refreshToken, profile, next) => {
//       const displayName = profile.displayName;
//       const googleID = profile.id;
//       const email = profile.emails[0] ? profile.emails[0].value : undefined;
//       const avatar = profile.photos[0] ? profile.photos[0].value : undefined;

//       if (displayName && googleID && email) {
//         User.findOne({ $or: [{ email }, { googleID }] })
//           .then(user => {
//             if (user) {
//               next(null, user);
//             } else {
//               const userData = {
//                 username: displayName,
//                 email,
//                 password: new mongoose.Types.ObjectId(),
//                 googleID,
//                 avatar,
//               }
//               return User.create(userData)
//                 .then(createdUser => next(null, createdUser))
//             }
//           })
//           .catch(err => next(err))
//       } else {
//         next(null, null, { email: 'Invalid google oauth response' });
//       }
//     }
//   )
// )