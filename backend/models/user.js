const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnathorizedError = require('../errors/Unathorized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Имя',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Обо мне',
  },
  avatar: {
    type: String,
    default: 'https://www.svgrepo.com/show/524199/user-circle.svg',
    validate: {
      validator(v) {
        return /https?:\/\/(www\.)?[\w-]+\.\w+(\/.+)?/i.test(v);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnathorizedError('Неверная почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnathorizedError('Неверная почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
