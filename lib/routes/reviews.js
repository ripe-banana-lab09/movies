// eslint-disable-next-line new-cap
const router = require('express').Router();
const Review = require('../models/review');

router
  .post('/', (req, res, next) => {
    Review.create(req.body)
      .then(review => res.json(review))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Review.findById(req.params.id)
      .populate('film', 'reviewer')
      .then(review => res.json(review))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Review.find()
      .then(reviews => res.json(reviews))
      .catch(next);
  })
  .put('/:id', ({ params, body }, res, next) => {
    Review.updateById(params.id, body)
      .then(review => res.json(review))
      .catch(next);
  });
module.exports = router;