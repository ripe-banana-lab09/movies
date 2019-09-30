const request = require('../../request');
const db = require('../../db');

describe('Reviews Route Test', () => {
  beforeEach(() => {
    return Promise.all([
      db.dropCollection('reviewers'),
      db.dropCollection('films'),
      db.dropCollection('reviews')
    ]);
  });
  const review = {
    rating: 5,
    reviewer: [],
    review: 'It was gud'
    // film:
  };

  const reviewer = {
    name: 'Roger Ebert',
    company: 'Chicago Sun'
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

  const film = {
    title: 'Spider-man',
    released: 2017,
    cast: [
      {
        role: 'Spider-man'
      }
    ]
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
    return Promise.all([
      request
        .post('/api/reviewers')
        .send(reviewer)
        .expect(200)
        .then(({ body }) => body),
      request
        .post('/api/films')
        .send(film)
        .expect(200)
        .then(({ body }) => body)
    ])
      .then(([reviewer, film]) => {
        review.reviewer = reviewer._id;
        review.film = film._id;
        return request
          .post('/api/reviews')
          .send(review)
          .expect(200);
      })
      .then(({ body }) => body);
  }
  it('posts a review', () => {
    return postFilm(film).then(newFilm => {
      newFilm._id = review.film;
      return postReview(review).then(review => {
        expect(review).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            __v: 0,
            reviewer: expect.any(String),
            film: expect.any(String),
            ...review
          },

          `
          Object {
            "__v": 0,
            "_id": "5d927a85ef5a5e7a2b8f258a",
            "film": "5d927a85ef5a5e7a2b8f2588",
            "rating": 5,
            "review": "It was gud",
            "reviewer": "5d927a85ef5a5e7a2b8f2587",
          }
        `
        );
      });
    });
  });
});
