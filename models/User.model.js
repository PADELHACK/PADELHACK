const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { REQUIRED_FIELD, INVALID_FIELD } = require('../errors');
const {ROLE_OF_USERS} = require('../constants')

const EMAIL_PATTERN =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
    email: {
      type: String,
      required: [true, REQUIRED_FIELD],
      unique: true,
      match: [EMAIL_PATTERN, INVALID_FIELD]
    },
    avatar: {
      type: String,
      default: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg',
    },
    password: {
      type: String,
      required: [true, REQUIRED_FIELD],
      match: [PASSWORD_PATTERN, INVALID_FIELD]
    },
    active: {
      type: Boolean,
      default: false,
    },
    googleID: {
      type: String
    },
    role:{
      type: String,
      required: [true, REQUIRED_FIELD],
      enum: ROLE_OF_USERS,
      default: "User"
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt
      .hash(this.password, SALT_ROUNDS)
      .then(hash => {
        this.password = hash;
        next()
      })
      .catch(err => next(err))
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function(passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
