const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const sessionMaxAge = Number(process.env.SESSION_MAX_AGE || 7);

module.exports = expressSession({
  secret: process.env.SESSION_SECRET || 'super secret (change it)',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.SESSION_SECURE === 'true',
    maxAge: 24 * 3600 * 1000 * sessionMaxAge,
  },
  store: MongoStore.create({
    mongoUrl: mongoose.connection._connectionString,
    ttl: 24 * 3600 * sessionMaxAge,
  }),
});