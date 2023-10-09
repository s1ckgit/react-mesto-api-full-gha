const jwt = require('jsonwebtoken');
const UnathorizedError = require('../errors/Unathorized');

module.exports = (req, res, next) => {
  const error = new UnathorizedError('Необходимо авторизоваться');

  if (!req.cookies.jwt) {
    next(error);
  }

  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (e) {
    next(error);
  }

  req.user = payload;

  next();
};
