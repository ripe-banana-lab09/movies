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
      .populate('studio', 'name', 'reviews')
      .then(film => res.json(film))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Film.find()
      .then(films => res.json(films))
      .catch(next);
  })    
  .delete('/:id', (req, res, next) => {
    Film.findByIdAndRemove(req.params.id)
      .then(film => res.json(film))
      .catch(next);
  });

module.exports = router;
	