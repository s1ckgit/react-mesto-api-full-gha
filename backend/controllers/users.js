const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

// const {
//   SUCCES_CREATED_CODE,
// } = require('../data/responseStatuses');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => {
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });

          res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          })
            .status(200)
            .send({ message: 'Авторизация успешна!' });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId).orFail()
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const updateUserData = (req, res, next, data, options) => {
  User.findByIdAndUpdate(req.user._id, data, options)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  updateUserData(req, res, next, { name, about }, {
    new: true,
    runValidators: true,
  });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  updateUserData(req, res, next, { avatar }, {
    new: true,
    runValidators: true,
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
        .status(200)
        .send({ message: 'Авторизация успешна!' });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt')
    .status(200)
    .send({ message: 'Вы вышли из аккаунта' });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id).orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};
