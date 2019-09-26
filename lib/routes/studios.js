const router = require('express').Router();
const Studio = require('../models/studio');

router
  .post('/', (req, res, next) => {
    Studio.create(req.body)
      .then(studio => res.json(studio))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Studio.find()
      .then(studios => res.json(studios))
      .catch(next);
  });
	



module.exports = router;