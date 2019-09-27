// eslint-disable-next-line new-cap
const router = require('express').Router();
const Actor = require('../models/actor');

router
  .post('/', (req, res, next) => {
    Actor.create(req.body)
      .then(actor => res.json(actor))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Actor.findById(req.params.id)
      .then(actor => res.json(actor))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Actor.find()
      .then(actors => res.json(actors))
      .catch(next);
  });

module.exports = router;
