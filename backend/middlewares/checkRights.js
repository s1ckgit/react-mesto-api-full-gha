const Card = require('../models/card');
const UnathorizedError = require('../errors/Unathorized');
const { FORBIDDEN_CODE } = require('../data/responseStatuses');

module.exports = (req, res, next) => {
  Card.findById(req.params.cardId).orFail()
    .then((card) => {
      console.log(`owner ${card.owner}, user ${req.user._id}`);
      if (card.owner === req.user._id) {
        next();
      } else {
        next(new UnathorizedError('У вас недостаточно прав', FORBIDDEN_CODE));
      }
    })
    .catch(next);
};
