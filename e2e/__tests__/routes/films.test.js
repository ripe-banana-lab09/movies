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
    return Promise.all([
      request
        .post('/api/actors')
        .send(actor)
        .expect(200)
        .then(({ body }) => body),
      request
        .post('/api/studios')
        .send(studio)
        .expect(200)
        .then(({ body }) => body)
    ])
      .then(([actor, studio]) => {
        film.cast = actor.id;
        film.studio = studio.id;
        return request
          .post('/api/films')
          .send(film)
          .expect(200);
      })
      .then(({ body }) => body);
  }
  it('posts a film', () => {
    return postFilm(film).then(film => {
      expect(film).toBe({
        _id: expect.any(Object),
        studio: expect.any(Object),
        actor: expect.any(Object)

      });
    });
  });
 

});