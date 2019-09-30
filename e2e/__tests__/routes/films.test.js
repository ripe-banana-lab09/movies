const request = require('../../request');
const db = require('../../db');

describe('Films Route Test', () => {
  beforeEach(() => {
    return Promise.all([
      db.dropCollection('films'),
      db.dropCollection('actors'),
      db.dropCollection('studios'),
      db.dropCollection('reviews')
    ]);
  });
  const film = {
    title: 'Spider-man',
    studio: [],
    released: 2017,
    cast: [
      {
        role: 'Spider-man',
        actor: []
      }
    ]
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

  const review = {
    rating: 5,
    review: 'It was gud',
    reviewer: []
  };

  const reviewer = {
    name: 'Roger Ebert',
    company: 'Sun'
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
        film.cast[0].actor = actor._id;
        film.studio = studio._id;
        return request
          .post('/api/films')
          .send(film)
          .expect(200);
      })
      .then(({ body }) => body);
  }
  function postReview(review) {
    return request
      .post('/api/reviewers')
      .send(reviewer)
      .expect(200)
      .then(reviewer => {
        review.reviewer = reviewer._id;
        return request
          .post('/api/reviews')
          .send(review)
          .expect(200);
      })
      .then(({ body }) => body);
  }
  it('posts a film', () => {
    return postFilm(film).then(film => {
      expect(film).toMatchInlineSnapshot(
        {
          _id: expect.any(String),
          __v: 0,
          cast: [expect.any(String)],
          studio: expect.any(String),
          ...film
        },
        `
        Object {
          "__v": 0,
          "_id": "5d92898acb3ca289620ccc7b",
          "cast": Array [
            Object {
              "_id": "5d92898acb3ca289620ccc7c",
              "actor": "5d92898acb3ca289620ccc79",
              "role": "Spider-man",
            },
          ],
          "released": 2017,
          "studio": "5d92898acb3ca289620ccc7a",
          "title": "Spider-man",
        }
      `
      );
    });
  });
  it('Gets a film by ID', () => {
    return postFilm(film).then(film => {
      review.film = film._id;
      return postReview(review)
        .then(review => {
          return request.get(`/api/films/${review.film}`).expect(200);
        })
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot({
            _id: expect.any(String),
            __v: 0,
            cast: [
              {
                _id: expect.any(String),
                ...film.cast
              }
            ],
            studio: {
              _id: expect.any(String),
              name: expect.any(String)
            },
            reviews: {
              _id: expect.any(String),
              rating: 5,
              review: 'It was gud'
            },
            ...film
          });
        });
    });
  });
  it('Deletes a Film', () => {
    return postFilm(film).then(film => {
      return request.delete(`/api/films/${film._id}`).expect(200);
    });
  });
});
