const request = require('../../request');
const db = require('../../db');

describe('Films Route Test', () => {
  beforeEach(() => {
    return Promise.all([
      db.dropCollection('films'),
      db.dropCollection('actors'),
      db.dropCollection('studios')
    ]);
  });
  const film = {
    title: 'Spider-man',
    studio: [],
    released: 2017,
    cast: [{
      role: 'Spider-man',
      actor: []
    }]
  };

  const actor = {
    name: 'Tom Holland',
    dob: '1996-06-01',
    pob: 'United Kingdom'
  };

  const studio = {
    name: 'Marvel',
    address: { 
      city: 'Burbank',
      state: 'California',
      country: 'USA'
    }
  };

  function postFilm(film) {
    return request
      .post('/api/actors')
      .send(actor, studio)
      .expect(200)
      .then(({ body }) => {
        film.actor[0] = body._id;
        film.studio[0] = body._id;
        return request
          .post('/api/films')
          .send(film)
          .expect(200)
      })
      .then(({ body }) => body);
  }
});