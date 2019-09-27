// eslint-disable-next-line new-cap
const router = require('express').Router();
const Film = require('../models/film');

router
  .post('/', (req, res, next) => {
    Film.create(req.body)
      .then(film => res.json(film))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Film.findById(req.params.id)
      .populate('studios', 'name type')
      .then(film => res.json(film))
      .catch(next);
  });
module.exports = router;
	