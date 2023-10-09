const Card = require('../models/card');

const {
  SUCCES_CREATED_CODE,
} = require('../data/responseStatuses');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteAll = (req, res) => {
  Card.deleteMany({})
    .then((result) => {
      res.send({
        message: `Удалено ${result.deletedCount}`,
      });
    })
    .catch((e) => {
      res.send({
        message: 'хуйня какая-то опять',
      });
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.status(SUCCES_CREATED_CODE).send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId).orFail()
    .populate(['owner', 'likes'])
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: {
        likes: {
          _id: req.user._id,
        },
      },
    },
    { new: true },
  ).orFail()
    .populate(['owner', 'likes'])
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: {
        likes: {
          _id: req.user._id,
        },
      },
    },
    { new: true },
  ).orFail()
    .populate(['owner', 'likes'])
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};
